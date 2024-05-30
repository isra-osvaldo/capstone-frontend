<template>
  <AlertComponent
    v-if="cardArray.length === 0"
    :title="'Lista de favoritos'"
    :text="'Lo sentimos, no tienes publicaciones favoritas'"
    :loading="loading"
  />

  <v-container v-else>
    <v-row>
      <v-col cols="12" md="6" lg="3" v-for="card in cardArray" :key="card._id">
        <CardComponent
          :card="card"
          :class="'animate__animated animate__backInUp'"
          :height="'250'"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Publish } from "../../common/response/publish.response";
import { favoriteService } from "../../services/favorite.service";
import { onMounted } from "vue";
import CardComponent from "../../components/shared/card.component.vue";
import AlertComponent from "../shared/alert.component.vue";

export default defineComponent({
  name: "FavoriteComponent",
  components: {
    CardComponent,
    AlertComponent,
  },
  props: {},
  setup() {
    const loading = ref(false);
    const cardArray = ref([] as Publish[]);

    const getFavorites = async () => {
      const favorites = await favoriteService.getAllFavorite();

      const publishes = favorites.map((favorite) => {
        return favorite.publish;
      });

      return publishes;
    };

    onMounted(async () => {
      loading.value = true;
      cardArray.value = await getFavorites();
      loading.value = false;

    });

    return {
      loading,
      cardArray,
    };
  },
});
</script>

<style scoped>
.min_height {
  min-height: 508px !important;
}
</style>
