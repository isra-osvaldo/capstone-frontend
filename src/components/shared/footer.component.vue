<template>
  <v-container fluid>
    <v-footer class="text-center d-flex flex-column ma-5">
      <div>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4"
          :icon="icon"
          variant="text"
        ></v-btn>
      </div>

      <div class="pt-0"></div>

      <v-divider></v-divider>

      <div>{{ new Date().getFullYear() }} — <strong>NotBuy</strong></div>
    </v-footer>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FooterComponent",
  components: {},

  data() {
    return {
      icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
    };
  },
});
</script>

<style scoped></style>
