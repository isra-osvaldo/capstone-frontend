<template>
  <AlertComponent
    v-if="items.length === 0"
    :title="'Lista de Intercambios aceptados'"
    :text="'Lo sentimos, no tienes intercambios aceptados'"
    :loading="loading"
  />

  <v-container fluid v-else>
    <!-- Filtros por estado -->
    <!-- <v-card class="mb-5" elevation="0">
        <v-container>
          <form autocomplete="off" @submit.prevent="onSubmit">
            <v-row>
              <v-col cols="12" md="6">
                <v-select
                  v-model="status.value.value"
                  :items="ExchangeStatus"
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
      </v-card> -->
    <h2 class="text-center">Intercambios Aceptados</h2>
    <v-spacer class="ma-5"></v-spacer>
    <!-- Obtener index -->
    <EasyDataTable
      :headers="headers"
      :items="items"
      table-class-name="customize-table"
      rows-per-page-message="Registros por página"
      empty-message="No hay datos disponibles"
      rows-of-page-separator-message="de"
      buttons-pagination
      theme-color="#6d42ba"
      header-text-direction="center"
      body-text-direction="center"
    >
      <template #item-actions="item" >
        <div class="operation-wrapper">
          <v-btn v-if="item.status !== 'RECHAZADO'" @click="createCalification(true, item.index)"
            >Calificar
            <v-dialog v-model="item.dialogOpen" width="700">
              <CalificationComponent
                :dialog-actions="createCalification"
                :exchange="item"
                :index="item.index"
              />
            </v-dialog>
          </v-btn>
        </div>
      </template>
    </EasyDataTable>
  </v-container>
</template>

<script lang="ts">
import { onMounted, ref, defineComponent } from "vue";
import { exchangeService } from "../../services/exchange.service";
import { ExchangeStatusEnum } from "../../common/enum/exchange.enum";
import type { Header, Item } from "vue3-easy-data-table";
import { ExchangeStatusShowEnum } from "../../common/enum/exchange.enum";
import { ExchangeStatus } from "../../data/exchange-status.data";
import { Publish } from "../../common/response/publish.response";
import AlertComponent from "../shared/alert.component.vue";
import keycloak from "../../security/keycloak-config";
import CalificationComponent from "../calification/create-calification.component.vue";

export default defineComponent({
  name: "MatchesComponent",
  components: {
    AlertComponent,
    CalificationComponent,
  },
  props: {},
  setup() {
    const loading = ref(false);
    const headers = ref([] as Header[]);
    const items = ref([] as Item[]);
    const publish = ref([] as Publish[]);
    const dialog = ref(false);
    const dialogCalificationActions = ref([] as any[]);

    const uuid_user = keycloak.idTokenParsed?.sub;

    const getMatches = async () => {
      const response = await exchangeService.getMatches();

      // establecer headers y items
      headers.value = [
        {
          text: "Mi producto",
          value: "product.name",
          sortable: true,
        },
        {
          text: "Producto de intercambio",
          value: "productOffer.name",
          sortable: true,
        },
        {
          text: "Correo del usuario",
          value: "email",
          sortable: true,
        },
        {
          text: "Estado",
          value: "status",
          sortable: true,
        },
        {
          text: "Fecha de intercambio aceptado",
          value: "updated_at",
          sortable: true,
        },
        {
          text: "Acciones",
          value: "actions",
        },
      ];

      const items = response.map((exchange, index) => {
        if (exchange.uuid_user_offer === uuid_user) {
          return {
            product: exchange.uuid_product_offer,
            productOffer: exchange.uuid_product_publish,
            status: formattedStatus(exchange.status as ExchangeStatusEnum),
            updated_at: formmttedDate(exchange.updated_at),
            email: exchange.uuid_product_publish.email,
            exchange_uuid: exchange.uuid,
            dialogOpen: false,
            index
          };
        }

        return {
          product: exchange.uuid_product_publish,
          productOffer: exchange.uuid_product_offer,
          status: formattedStatus(exchange.status as ExchangeStatusEnum),
          updated_at: formmttedDate(exchange.updated_at),
          email: exchange.uuid_product_offer.email,
          exchange_uuid: exchange.uuid,
          dialogOpen: false,
          index
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

    const createCalification =  (state: boolean, index: number) => {
      dialogCalificationActions.value[index].dialogOpen = state
    };

    onMounted(async () => {
      loading.value = true;
      items.value = await getMatches();
      dialogCalificationActions.value = items.value
      loading.value = false;
    });

    return {
      getMatches,
      headers,
      items,
      ExchangeStatus,
      publish,
      loading,
      createCalification,
      dialog,
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
