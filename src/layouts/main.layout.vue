<template>
  <v-app>
    <NavbarComponent />
    <router-view />
    <FooterComponent />
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavbarComponent from "../components/shared/navbar.component.vue";
import FooterComponent from "../components/shared/footer.component.vue";

export default defineComponent({
  name: "MainLayout",
  components: {
    NavbarComponent,
    FooterComponent
  },
});
</script>

<style scoped></style>
