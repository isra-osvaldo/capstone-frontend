<template>
  <v-card class="text-center" :loading="loading">
    <v-card-title class="card-header">Intercambio de producto</v-card-title>
    <form autocomplete="off" @submit.prevent="onSubmit">
      <v-card-text>
        <v-row justify="center" align="center">
          <v-col cols="12" md="10" lg="10">
            <v-select
              v-model="uuid_product_offer.value.value"
              :error-messages="uuid_product_offer.errorMessage.value"
              label="Producto a ofrecer"
              placeholder="Producto a ofrecer"
              variant="underlined"
              :items="publishesOffer"
              item-title="name"
              item-value="uuid_product"
            ></v-select>
          </v-col>
        </v-row>

        <v-row justify="center" align="center">
          <v-col class="text-center">
            <v-icon class="size-up">mdi-arrow-down</v-icon>
            <v-icon class="rotate size-up">mdi-arrow-down</v-icon>
          </v-col>
        </v-row>

        <v-row justify="center" align="center">
          <!-- Producto que quiero -->
          <v-col>
            <v-card :title="product.name">
              <v-img>
                <v-card-text>
                  <v-carousel
                    hide-delimiter-background
                    cycle
                    :show-arrows="product.images.length > 1"
                  >
                    <v-carousel-item
                      v-for="image in product.images"
                      :key="image"
                      :src="image"
                      :alt="product.name"
                    ></v-carousel-item>
                  </v-carousel>
                </v-card-text>
              </v-img>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn color="deep-purple" class="ma-3" variant="flat" type="submit"
          >Realizar Intercambio</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="dialogActions(false)">Cancelar</v-btn>
      </v-card-actions>
    </form>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import type { ProductResponse } from "../../common/interfaces/product.response";
import { exchangeService } from "../../services/exchange.service";
import Swal from "sweetalert2";
import { useField, useForm } from "vee-validate";
import { Publish } from "../../common/response/publish.response";
import { object, string } from "yup";

export default defineComponent({
  name: "DialogExchangeComponent",
  props: {
    dialogActions: {
      type: Function as any,
      required: true,
    },
    product: {
      type: Object as () => ProductResponse,
      required: true,
    },
    publishes: {
      type: Object as () => Publish[],
      required: true,
    },
  },
  setup(props) {
    const loading = ref(false);
    const publishesOffer = ref(props.publishes);

    const ExchangeSchema = object().shape({
      uuid_product_offer: string().required().trim().max(50),
    });

    const { handleSubmit } = useForm({
      validationSchema: ExchangeSchema,
    });

    const uuid_product_offer = useField(
      "uuid_product_offer",
      ExchangeSchema
    ) as any;

    const onSubmit = handleSubmit(async (values) => {
      loading.value = true;
      props.dialogActions(false);

      Swal.fire({
        title: "Realizando intercambio",
        html: "Espere un momento por favor",
        timerProgressBar: true,
        toast: true,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      try {
        await exchangeService.createExchange({
          uuid_product_offer: values.uuid_product_offer,
          uuid_product_want: props.product.uuid,
        });

        Swal.fire({
          title: "Intercambio realizado",
          text: "Se ha realizado el intercambio con éxito",
          icon: "success",
          confirmButtonText: "Aceptar",
          toast: true,
        });
      } catch (error : any) {
        Swal.fire({
          title: "No se ha podido realizar el intercambio",
          text: error.response.data.message || "Ha ocurrido un error",
          icon: "error",
          confirmButtonText: "Aceptar",
          toast: true,
        });
      } finally {
        loading.value = false;
      }
    });

    return {
      loading,
      onSubmit,
      uuid_product_offer,
      publishesOffer,
    };
  },
});
</script>

<style scoped>
.rotate {
  transform: rotate(180deg);
}

.size-up {
  font-size: 50px;
}

.card-header {
  background-color: #6d42ba;
  color: white;
  text-transform: uppercase;
}
</style>
