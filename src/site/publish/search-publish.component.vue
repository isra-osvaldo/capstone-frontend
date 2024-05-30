<template>
    <AlertComponent
    v-if="cardArray.length === 0"
    :title="'Lista de publicaciones'"
    :text="'Lo sentimos, no se encontraron publicaciones'"
    :loading="loading"
  />


  <v-container v-else>
    <v-row>
      <v-col cols="12" md="4" lg="4" v-for="card in cardArray" :key="card._id">
        <CardComponent
          :card="card"
          :class="'animate__animated animate__backInUp'"
          :height="'275'"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed, onMounted } from "vue";
import { Publish } from "../../common/response/publish.response";
import { publishService } from "../../services/publish.service";
import CardComponent from "../../components/shared/card.component.vue";
import { useRouter } from "vue-router";
import AlertComponent from "../shared/alert.component.vue";

export default defineComponent({
  name: "SearchPublishComponent",
  components: {
    CardComponent,
    AlertComponent,
  },
  props: {},
  setup() {
    const loading = ref(false);
    const cardArray = ref([] as Publish[]);
    const router = useRouter();

    const query = computed(() => router.currentRoute.value.query);

    watch(query, async () => {
      await getPublishes();
    });

    const getPublishes = async () => {
      loading.value = true;

      const { docs } = await publishService.getAllPublish({
        category: query.value.category as string,
        search: query.value.search as string,
      });

      const docsFormatted = docs.map((doc) => {
        const { reputationId } = doc;

        const rating = (reputationId.rating / reputationId.total_calification) || 0;

        reputationId.rating = rating;

        return {
          ...doc,
          reputationId
        };
      });

      cardArray.value = docsFormatted;
      loading.value = false;
    };

    onMounted(async () => {
      await getPublishes();
    });

    return {
      loading,
      cardArray,
    };
  },
});
</script>

<style scoped>
.background {
  background-color: #fbfbfb !important;
}
</style>
