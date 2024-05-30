<template>
  <AlertComponent
    v-if="cardArray.length === 0"
    :title="'Lista de publicaciones'"
    :text="'Lo sentimos, no tienes publicaciones disponibles'"
    :loading="loading"
  />

  <v-container v-else>
    <v-row>
      <v-col cols="12" md="6" lg="3" v-for="card in cardArray" :key="card._id">
        <CardComponent :card="card" 
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
import { publishService } from "../../services/publish.service";
import { onMounted } from "vue";
import keycloak from "../../security/keycloak-config";
import CardComponent from "../../components/shared/card.component.vue";
import AlertComponent from "../shared/alert.component.vue";

export default defineComponent({
  name: "MyPublishComponent",
  components: {
    CardComponent,
    AlertComponent
  },
  props: {},
  setup() {
    const loading = ref(false);
    const cardArray = ref([] as Publish[]);

    const uuid_user = keycloak.idTokenParsed?.sub || "";

    const getPublishByUserRandom = async () => {
      loading.value = true;
      const publish = await publishService.getRandomPublishByUser(uuid_user);
      loading.value = false;
      return publish;
    };

    onMounted(async () => {
      cardArray.value = await getPublishByUserRandom();
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
