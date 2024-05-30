<template>
  <v-container fluid>
    <v-carousel hide-delimiter-background cycle>
      <v-carousel-item
        src="https://capstone-bucket-s3.s3.amazonaws.com/imgs/slide_2.jpg"
      ></v-carousel-item>

      <v-carousel-item
        src="https://capstone-bucket-s3.s3.amazonaws.com/imgs/slide_1.jpg"
        cover
      ></v-carousel-item>

      <v-carousel-item
        src="https://capstone-bucket-s3.s3.amazonaws.com/imgs/slide_3.jpg"
      ></v-carousel-item>
    </v-carousel>
  </v-container>

  <v-container fluid class="background">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="6"
          lg="4"
          v-for="card in cardArray"
          :key="card._id"
        >
          <CardComponent
            :card="card"
            :class="'animate__animated animate__backInLeft'"
            :height="'250'"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import keycloak from "../../security/keycloak-config";
import CardComponent from "../shared/card.component.vue";
import { Cards } from "../../data/card.data";
import { publishService } from "../../services/publish.service";
import type { PublishWithObjectReputation } from "../../common/response/publish.response";

export default defineComponent({
  name: "HomeComponent",
  components: { CardComponent },
  setup() {
    const cardArray = ref([] as PublishWithObjectReputation[]);

    const login = async () => {
      await keycloak.login();
    };

    const logout = async () => {
      await keycloak.logout();
    };

    const getToken = () => {
      const token = keycloak.token;
      return token;
    };

    const getTopPublish = async () => {
      return await publishService.getTopPublish();

      
    };

    onMounted(async () => {
      cardArray.value = await getTopPublish();
    });

    return {
      login,
      logout,
      getToken,
      Cards,
      getTopPublish,
      cardArray,
    };
  },
});
</script>

<style scoped>
.min_height {
  min-height: 508px !important;
}

.background {
  background-color: #fbfbfb !important;
}
</style>
