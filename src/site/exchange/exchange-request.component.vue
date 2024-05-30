<template>
  <AlertComponent
    v-if="items.length === 0"
    :title="'Lista de solicitudes'"
    :text="'Lo sentimos, no tienes solicitudes de intercambio'"
    :loading="loading"
  />

  <v-container fluid v-else>
    <!-- Filtros por estado -->
    <v-card class="mb-5" elevation="0">
      <v-container>
        <form autocomplete="off" @submit.prevent="onSubmit">
          <v-row>
            <v-col cols="12" md="6">
              <v-select
                v-model="status.value.value"
                :items="ExchangeStatusRequest"
                item-title="text"
                item-value="value"
                label="Filtrar por estado"
                variant="underlined"
              ></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                v-model="uuid_product_offer.value.value"
                :items="publish"
                item-title="name"
                item-value="uuid_product"
                label="Filtrar por mi producto"
                variant="underlined"
              ></v-select>
            </v-col>
          </v-row>
          <v-card-actions>
            <v-btn class="btn-filter" type="submit">
              <v-icon>mdi mdi-filter</v-icon>
              Filtrar
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="reset">
              <v-icon>mdi mdi-filter-remove-outline</v-icon>
              Limpiar filtros
            </v-btn>
          </v-card-actions>
        </form>
      </v-container>
    </v-card>
    <h2 class="text-center">Solicitudes de Intercambios</h2>
    <v-spacer class="ma-5"></v-spacer>
    <EasyDataTable
      :headers="headers"
      :items="items"
      :loading="loading"
      table-class-name="customize-table"
      rows-per-page-message="Registros por página"
      empty-message="No hay datos disponibles"
      rows-of-page-separator-message="de"
      buttons-pagination
      theme-color="#6d42ba"
      header-text-direction="center"
      body-text-direction="center"
    >
      <template #item-actions="item">
        <div class="operation-wrapper">
          <v-tooltip text="Aceptar" location="top">
            <template v-slot:activator="{ props }">
              <v-btn @click="updateStatus(item.uuid_exchange, ExchangeStatusEnum.ACCEPTED )" v-if="!showItemByStatus(item.status)" v-bind="props"
                ><v-icon class="operation-icon" color="success">
                  mdi mdi-check-circle-outline
                </v-icon></v-btn
              >
            </template>
          </v-tooltip>
          <v-tooltip text="Rechazar" location="top">
            <template v-slot:activator="{ props }">
              <v-btn @click="updateStatus(item.uuid_exchange, ExchangeStatusEnum.REJECTED )" v-if="!showItemByStatus(item.status)" v-bind="props"
                ><v-icon class="operation-icon" color="warning">
                  mdi mdi-close
                </v-icon></v-btn
              >
            </template>
          </v-tooltip>
        </div>
      </template>
    </EasyDataTable>
  </v-container>
</template>

<script lang="ts">
import { onMounted, ref, defineComponent } from "vue";
import { exchangeService } from "../../services/exchange.service";
import { publishService } from "../../services/publish.service";
import { ExchangeStatusEnum } from "../../common/enum/exchange.enum";
import type { Header, Item } from "vue3-easy-data-table";
import { ExchangeStatusShowEnum, ExchangeStatusActionEnum } from "../../common/enum/exchange.enum";
import { ExchangeStatusRequest } from "../../data/exchange-status.data";
import keycloak from "../../security/keycloak-config";
import { Publish } from "../../common/response/publish.response";
import { object, string } from "yup";
import { useField, useForm } from "vee-validate";
import AlertComponent from "../shared/alert.component.vue";
import Swal from "sweetalert2";

export default defineComponent({
  name: "ExchangeRequestComponent",
  components: {
    AlertComponent,
  },
  props: {},
  setup() {
    const loading = ref(false);
    const headers = ref([] as Header[]);
    const items = ref([] as Item[]);
    const publish = ref([] as Publish[]);

    const uuid_user = keycloak.idTokenParsed?.sub || "";

    const ExchangeFilters = object().shape({
      status: string().optional().default(""),
      uuid_product_offer: string().optional().default(""),
    });

    const { handleSubmit } = useForm({
      validationSchema: ExchangeFilters,
    });

    const status = useField("status", ExchangeFilters) as any;
    const uuid_product_offer = useField(
      "uuid_product_offer",
      ExchangeFilters
    ) as any;

    const onSubmit = handleSubmit(async (values) => {
      loading.value = true;
      items.value = await getExchangeRequest(
        values.status,
        values.uuid_product_offer
      );
      loading.value = false;
    });

    const reset = async () => {
      loading.value = true;
      status.value.value = undefined;
      uuid_product_offer.value.value = undefined;
      items.value = await getExchangeRequest();
      loading.value = false;
    };

    const showItemByStatus = (status: string) => {
      return status === "RECHAZADO" || status === "ACEPTADO" || status === "CANCELADO";
    };

    const getPublishByUser = async () => {
      const response = await publishService.getPublishByUser(uuid_user);
      return response?.docs || [];
    };

    const getExchangeRequest = async (
      status = "",
      uuid_product_publish = ""
    ) => {
      const response = await exchangeService.getExchangeRequest(
        status,
        uuid_product_publish
      );

      // establecer headers y items
      headers.value = [
        {
          text: "Mi producto",
          value: "product.name",
          sortable: true,
        },
        {
          text: "Producto que ofrecen",
          value: "productOffer.name",
          sortable: true,
        },
        {
          text: "Estado",
          value: "status",
          sortable: true,
        },
        {
          text: "Fecha de solicitud",
          value: "updated_at",
          sortable: true,
        },
        {
          text: "Acciones",
          value: "actions",
        },
      ];

      const items = response.map((exchange) => {
        return {
          product: exchange.uuid_product_publish,
          productOffer: exchange.uuid_product_offer,
          status: formattedStatus(exchange.status as ExchangeStatusEnum),
          updated_at: formmttedDate(exchange.updated_at),
          uuid_exchange: exchange.uuid,
        };
      });

      return items;
    };

    const updateStatus = async (uuid_exchange: string, status: keyof typeof ExchangeStatusActionEnum) => {
      loading.value = true;

      Swal.fire({
        icon: "info",
        title: `Estas seguro de ${ExchangeStatusActionEnum[status]} la solicitud de intercambio?`,
        showCancelButton: true,
        confirmButtonText: "Si",
        confirmButtonColor: "#7E57C2",
        toast: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await exchangeService.patchStatus(uuid_exchange, status);
          items.value = await getExchangeRequest();

          Swal.fire({
            title: "Solicitud de intercambio",
            text: `Se ha ${ExchangeStatusShowEnum[status]} la solicitud de intercambio`,
            icon: "success",
            confirmButtonText: "Aceptar",
            toast: true,
          });


        }
      }).finally(() => {
        loading.value = false;
      });
    };

    const formmttedDate = (date: string) => {
      return new Date(date).toLocaleDateString();
    };

    const formattedStatus = (status: ExchangeStatusEnum) => {
      return ExchangeStatusShowEnum[status];
    };

    onMounted(async () => {
      loading.value = true;
      items.value = await getExchangeRequest();
      publish.value = await getPublishByUser();
      loading.value = false;
    });

    return {
      getExchangeRequest,
      headers,
      items,
      ExchangeStatusRequest,
      status,
      uuid_product_offer,
      publish,
      onSubmit,
      reset,
      loading,
      updateStatus,
      ExchangeStatusEnum,
      showItemByStatus,
    };
  },
});
</script>

<style scoped>
.customize-table {
  --easy-table-border: 1px solid #ddd;
  --easy-table-row-border: 1px solid #ddd;

  --easy-table-header-font-size: 14px;
  --easy-table-header-height: 40px;
  --easy-table-header-font-color: #000;
  --easy-table-header-background-color: #fff;

  --easy-table-header-item-padding: 10px 15px;

  --easy-table-body-even-row-font-color: #fff;
  --easy-table-body-even-row-background-color: #fff;

  --easy-table-body-row-font-color: #363638;
  --easy-table-body-row-background-color: #fff;
  --easy-table-body-row-height: 40px;
  --easy-table-body-row-font-size: 15px;

  --easy-table-body-row-hover-font-color: #000;
  --easy-table-body-row-hover-background-color: #eee;

  --easy-table-body-item-padding: 10px 15px;

  --easy-table-footer-background-color: #fff;
  --easy-table-footer-font-color: #222;
  --easy-table-footer-font-size: 15px;
  --easy-table-footer-padding: 0px 10px;
  --easy-table-footer-height: 50px;

  --easy-table-rows-per-page-selector-width: 70px;
  --easy-table-rows-per-page-selector-option-padding: 10px;

  --easy-table-scrollbar-track-color: #2d3a4f;
  --easy-table-scrollbar-color: #2d3a4f;
  --easy-table-scrollbar-thumb-color: #4c5d7a;
  --easy-table-scrollbar-corner-color: #2d3a4f;

  --easy-table-loading-mask-background-color: transparent;
}

.operation-wrapper {
  display: flex;
  justify-content: center;
  gap: 10px;
}
.operation-wrapper .operation-icon {
  cursor: pointer;
}

.btn-filter {
  color: #fff;
  background: #4a148c;
  padding-top: 10px;
  padding-right: 20px;
  padding-bottom: 10px;
  padding-left: 20px;
  font-family: inherit;
  font-weight: inherit;
  font-size: 0.7rem;
  line-height: 1em;
  border-radius: 30px;
  border: 0;
}
</style>
