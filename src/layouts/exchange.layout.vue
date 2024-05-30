<template>
  <v-app>
    <NavbarComponent />
    <v-container fluid class="pa-2">
      <v-row justify="center">
        <v-col cols="12" sm="3" md="3" lg="2">
            <SidebarComponent />
        </v-col>

        <v-col cols="12" sm="9" md="9" lg="10" class="d-flex justify-center">
          <router-view />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavbarComponent from "../components/shared/navbar.component.vue";
import SidebarComponent from "../site/exchange/sidebar-exchange.component.vue";

export default defineComponent({
  name: "MainLayout",
  components: {
    NavbarComponent,
    SidebarComponent,
  },
});
</script>
