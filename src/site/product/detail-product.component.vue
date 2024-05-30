<template>
  <v-container v-if="loading">
    <v-skeleton-loader
      class="mx-auto"
      max-width="100%"
      type="image, article, chip, chip, chip, chip, actions"
    ></v-skeleton-loader>
  </v-container>

  <v-container v-else>
    <v-row align="center">
      <v-col>
        <v-card elevation="0">
          <v-tabs
            v-model="tab"
            color="deep-purple-accent-4"
            align-tabs="center"
          >
            <v-tab v-for="(_, i) in product.images" :value="i">
              Imagen {{ i + 1 }}
            </v-tab>
          </v-tabs>
          <v-window v-model="tab">
            <v-window-item v-for="(_, i) in product.images" :value="i - 1">
              <v-container fluid>
                <v-row justify="center" align="center">
                  <v-col cols="12">
                    <v-img
                      :src="product.images[tab]"
                      :lazy-src="product.images[tab]"
                      contain
                      height="500px"
                    ></v-img>
                  </v-col>
                </v-row>
              </v-container>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>

      <v-col>
        <v-col>
          <h1>{{ reputation.name }}</h1>

          <v-row class="ma-1">
            <v-rating
              :model-value="reputation.rating / reputation.total_calification"
              color="amber"
              density="compact"
              half-increments
              readonly
            ></v-rating>

            <div class="text-grey ms-4">
              {{ reputation.rating / reputation.total_calification || 0 }} ({{
                reputation.total_calification
              }})
            </div>
          </v-row>
        </v-col>

        <v-card>
          <v-row>
            <v-col cols="10">
              <v-card-title>{{ product.name }}</v-card-title>
            </v-col>
            <v-col>
              <v-btn
                :loading="loadingFavorite"
                v-show="!showFavorite"
                variant="text"
                icon="mdi-cards-heart-outline"
                @click="createFavorite(product.uuid)"
              ></v-btn>
              <v-btn
                :loading="loadingFavorite"
                v-show="showFavorite"
                color="deep-purple"
                variant="text"
                icon="mdi-heart"
                @click="deleteFavorite(favorite.uuid)"
              ></v-btn>
            </v-col>
          </v-row>

          <v-card-subtitle>
            <span class="me-1">Categoría: {{ product.category }}</span>
            <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
          </v-card-subtitle>

          <v-card-subtitle class="mt-2">
            Nuevo: {{ product.isNew ? "Si" : "No" }}
          </v-card-subtitle>

          <v-card-subtitle class="mt-2"
            >Stock disponible : {{ product.stock }}</v-card-subtitle
          >

          <v-card-text>{{ product.description }}</v-card-text>

          <v-divider></v-divider>

          <v-card-title class="d-flex justify-center"
            >Características del producto
          </v-card-title>

          <v-chip-group class="mx-5 d-flex justify-center" variant="flat">
            <v-chip v-for="characteristic in product.characteristics">{{
              characteristic
            }}</v-chip>
          </v-chip-group>

          <v-card-actions class="mt-5">
            <v-spacer></v-spacer>
            <v-btn
              color="deep-purple"
              class="ma-3"
              variant="flat"
              @click="exchangeButton"
            >
              Intercambiar
              <v-dialog v-model="dialog" width="700">
                <DialogExchangeComponent
                  :dialog-actions="dialogActions"
                  :product="product"
                  :publishes="publishesOffer"
                />
              </v-dialog>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-sheet color="grey-lighten-5 mt-5" border rounded="shaped">
      <v-slide-group class="pa-4" selected-class="bg-primary" show-arrows>
        <v-slide-group-item v-for="(item, i) in publish" :key="i">
          <CardComponent
            :card="item"
            :height="'150'"
            :width="'250'"
            :class="'ma-4'"
            :show-actions="false"
            @click="goToOtherPublish(item.uuid_product)"
          />
        </v-slide-group-item>
      </v-slide-group>
    </v-sheet>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { productService } from "../../services/product.service";
import { favoriteService } from "../../services/favorite.service";
import { reputationService } from "../../services/reputation.service";
import { publishService } from "../../services/publish.service";
import type { ProductResponse } from "../../common/interfaces/product.response";
import { GetOneReputationResponse } from "../../common/response/reputation.response";
import { Publish } from "../../common/response/publish.response";
import type { Favorite } from "../../common/interfaces/favorite.interface";
import CardComponent from "../../components/shared/card.component.vue";
import keycloak from "../../security/keycloak-config";
import Swal from "sweetalert2";
import DialogExchangeComponent from "../exchange/dialog.component.vue";
import { VSkeletonLoader } from "vuetify/labs/VSkeletonLoader";

export default defineComponent({
  name: "ProductPublishComponent",
  components: { CardComponent, DialogExchangeComponent, VSkeletonLoader },
  setup() {
    const loading = ref(true);
    const loadingFavorite = ref(false);
    const router = useRouter();
    const tab = ref(0);
    const product = ref({} as ProductResponse);
    const reputation = ref({} as GetOneReputationResponse);
    const publish = ref([] as Publish[]);
    const publishesOffer = ref([] as Publish[]);
    const model = ref<number[]>([]);
    const dialog = ref(false);
    const favorite = ref({} as Favorite);
    const showFavorite = ref(false);

    const { uuid } = router.currentRoute.value.params as { uuid: string };

    const getProductlPublish = async (uuid_product?: string) => {
      const product = await productService.getProduct(uuid_product || uuid);

      if (keycloak.authenticated) {
        const favoriteResponse = await getFavorite(product.uuid);
        favorite.value = favoriteResponse;
        if (favoriteResponse) {
          showFavorite.value = true;
        } else {
          showFavorite.value = false;
        }
      }

      return product;
    };

    const getReputation = async (uuid_user: string) => {
      const reputation = await reputationService.getOne(uuid_user);
      return reputation;
    };

    const getPublishByUserRandom = async (uuid_user: string) => {
      const publish = await publishService.getRandomPublishByUser(uuid_user);
      return publish;
    };

    const getFavorite = async (uuid_publish: string) => {
      const favorite = await favoriteService.getFavorite(uuid_publish);
      return favorite;
    };

    const createFavorite = async (uuid_product: string) => {
      loadingFavorite.value = true;

      if (!keycloak.authenticated) {
        // swal
        Swal.fire({
          icon: "info",
          title: "Inicia sesión para agregar a favoritos",
          confirmButtonText: "Iniciar sesión",
          confirmButtonColor: "#7E57C2",
          toast: true,
          showCancelButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            keycloak.login();
          }
        });

        loadingFavorite.value = false;
        return;
      }

      const favoriteCreated = await favoriteService.createFavorite(
        uuid_product
      );
      favorite.value = favoriteCreated;
      showFavorite.value = true;
      loadingFavorite.value = false;
    };

    const deleteFavorite = async (uuid: string) => {
      Swal.fire({
        icon: "info",
        title: "¿Estás seguro de eliminar este producto de tus favoritos?",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        confirmButtonColor: "#7E57C2",
        toast: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          loadingFavorite.value = true;
          await favoriteService.deleteFavorite(uuid);
          const favoriteResponse = await getFavorite(product.value.uuid);
          favorite.value = favoriteResponse as Favorite;
          showFavorite.value = false;
          loadingFavorite.value = false;
        }
      });

      // await favoriteService.deleteFavorite(uuid);
    };

    const goToOtherPublish = async (uuid: string) => {
      router.push({ name: "detail-product", params: { uuid } });

      product.value = await getProductlPublish(uuid);
      tab.value = 0;
    };

    const dialogActions = (state: boolean) => {
      dialog.value = state;
    };

    const exchangeButton = async () => {
      // Verificar si el usuario esta logueado
      if (!keycloak.authenticated) {
        // swal
        Swal.fire({
          icon: "info",
          title: "Inicia sesión para intercambiar",
          confirmButtonText: "Iniciar sesión",
          confirmButtonColor: "#7E57C2",
          toast: true,
          showCancelButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            keycloak.login();
          }
        });

        return;
      }

      // Verificar si el usuario tiene publicaciones
      const uuid_user = keycloak.idTokenParsed?.sub || "";
      const response = await getPublishByUser(uuid_user);

      if (!response.docs.length) {
        showMessageRequiredPublish();
        return;
      }

      publishesOffer.value = response.docs as Publish[];

      dialogActions(true);
    };

    const getPublishByUser = async (uuid_user: string) => {
      return await publishService.getPublishByUser(uuid_user);
    };

    const showMessageRequiredPublish = () => {
      Swal.fire({
        icon: "info",
        title: "Necesitas publicar un producto para realizar un intercambio",
        showConfirmButton: false,
        timer: 3000,
        toast: true,
      });
    };

    onMounted(async () => {
      product.value = await getProductlPublish();
      loading.value = true;
      const promises = [
        getReputation(product.value.uuid_user),
        getPublishByUserRandom(product.value.uuid_user),
      ];

      const [reputationResponse, publishResponse] = await Promise.all(promises);

      reputation.value = reputationResponse as GetOneReputationResponse;
      publish.value = publishResponse as Publish[];
      loading.value = false;
    });

    return {
      loading,
      tab,
      product,
      reputation,
      publish,
      model,
      goToOtherPublish,
      exchangeButton,
      dialog,
      dialogActions,
      createFavorite,
      deleteFavorite,
      publishesOffer,
      favorite,
      loadingFavorite,
      showFavorite,
    };
  },
});
</script>
