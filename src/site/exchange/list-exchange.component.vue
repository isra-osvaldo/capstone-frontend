<template>
  <AlertComponent
    v-if="items.length === 0"
    :title="'Lista de intercambios'"
    :text="'Lo sentimos, no tienes intercambios'"
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
                v-model="uuid_product_publish.value.value"
                :items="publish"
                item-title="name"
                item-value="uuid_product"
                label="Filtrar por producto ofrecido"
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
    <h2 class="text-center">Intercambios que solicité</h2>
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
          <v-tooltip text="Cancelar" location="top">
            <template v-slot:activator="{ props }">
              <v-btn v-if="item.status === 'PENDIENTE'" v-bind="props"
                ><v-icon class="operation-icon" color="warning">
                  mdi mdi-cancel
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
import { ExchangeStatusShowEnum } from "../../common/enum/exchange.enum";
import { ExchangeStatusRequest } from "../../data/exchange-status.data";
import keycloak from "../../security/keycloak-config";
import { Publish } from "../../common/response/publish.response";
import { object, string } from "yup";
import { useField, useForm } from "vee-validate";
import AlertComponent from "../shared/alert.component.vue";

export default defineComponent({
  name: "ListExchangeComponent",
  components: {
    AlertComponent,
  },
  props: {},
  setup() {
    const loading = ref(true);
    const headers = ref([] as Header[]);
    const items = ref([] as Item[]);
    const publish = ref([] as Publish[]);

    const uuid_user = keycloak.idTokenParsed?.sub || "";

    const ExchangeFilters = object().shape({
      status: string().optional().default(""),
      uuid_product_publish: string().optional().default(""),
    });

    const { handleSubmit } = useForm({
      validationSchema: ExchangeFilters,
    });

    const status = useField("status", ExchangeFilters) as any;
    const uuid_product_publish = useField(
      "uuid_product_publish",
      ExchangeFilters
    ) as any;

    const onSubmit = handleSubmit(async (values) => {
      loading.value = true;
      items.value = await getExchangeWant(
        values.status,
        values.uuid_product_publish
      );
      loading.value = false;
    });

    const reset = async () => {
      loading.value = true;
      status.value.value = undefined;
      uuid_product_publish.value.value = undefined;
      items.value = await getExchangeWant();
      loading.value = false;
    };

    const getPublishByUser = async () => {
      const response = await publishService.getPublishByUser(uuid_user);
      return response?.docs || [];
    };

    const getExchangeWant = async (status = "", uuid_product_publish = "") => {
      const response = await exchangeService.getExchangeWant(
        status,
        uuid_product_publish
      );

      // establecer headers y items
      headers.value = [
        {
          text: "Producto que quiero",
          value: "productWant.name",
          sortable: true,
        },
        {
          text: "Producto que ofrezco",
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
          productWant: exchange.uuid_product_publish,
          productOffer: exchange.uuid_product_offer,
          status: formattedStatus(exchange.status as ExchangeStatusEnum),
          updated_at: formmttedDate(exchange.updated_at),
        };
      });

      return items;
    };

    const formmttedDate = (date: string) => {
      return new Date(date).toLocaleDateString();
    };

    const formattedStatus = (status: ExchangeStatusEnum) => {
      return ExchangeStatusShowEnum[status];
    };

    onMounted(async () => {
      loading.value = true;
      items.value = await getExchangeWant();
      publish.value = await getPublishByUser();
      loading.value = false;
    });

    return {
      getExchangeWant,
      headers,
      items,
      ExchangeStatusRequest,
      status,
      uuid_product_publish,
      publish,
      onSubmit,
      loading,
      reset,
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
