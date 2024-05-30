<template>
  <v-container fluid>
    <v-row justify="space-around" align="center">
      <v-col cols="2" sm="2" md="2" lg="2" class="d-flex justify-center">
        <v-toolbar-title class="d-flex justify-center">
          <img
            src="../../assets/logo.png"
            class="d-inline-block align-text-top logo"
          />
        </v-toolbar-title>
      </v-col>

      <v-col
        cols="6"
        sm="6"
        md="6"
        lg="8"
        class="d-flex justify-center align-center"
      >
        <v-text-field
          :loading="loading"
          v-model="search"
          density="compact"
          variant="solo"
          label="Buscar..."
          append-inner-icon="mdi-magnify"
          single-line
          hide-details
          clearable
          @keydown.enter="goToQuery('search-publish', { search: search })"
        ></v-text-field>
      </v-col>

      <v-col cols="1" sm="1" md="1" lg="1" class="d-flex justify-center">
        <v-menu location="bottom center">
          <template v-slot:activator="{ props }">
            <v-btn icon v-bind="props">
              <v-avatar color="purple-darken-4" size="large">
                <v-icon icon="mdi-account-circle"></v-icon>
              </v-avatar>
            </v-btn>
          </template>
          <v-card>
            <v-card-text>
              <div class="mx-auto text-center">
                <!-- <span  v-if="keycloak.authenticated">{{  keycloak.idTokenParsed!.name! }}</span> -->
                <v-btn
                  variant="plain"
                  rounded
                  v-if="keycloak.authenticated"
                  class="not-cursor"
                >
                  {{ nameFormmatted(keycloak.idTokenParsed!.name!) }}
                </v-btn>
                <v-divider
                  v-if="keycloak.authenticated"
                  class="my-3"
                ></v-divider>

                <v-btn
                  prepend-icon="mdi mdi-list-box-outline"
                  rounded
                  variant="text"
                  @click="goToWithAuth('my-publications')"
                >
                  Mis Publicaciones
                </v-btn>
                <v-divider class="my-3"></v-divider>
                <v-btn
                  prepend-icon="mdi mdi-swap-horizontal"
                  rounded
                  variant="text"
                  @click="goToWithAuth('exchange-list')"
                >
                  Intercambios
                </v-btn>
                <v-divider class="my-3"></v-divider>
                <v-btn
                  v-if="!keycloak?.authenticated"
                  class="btn-inicio-sesion"
                  @click="login()"
                >
                  Iniciar Sesion
                </v-btn>
                <v-btn
                  v-if="keycloak?.authenticated"
                  class="btn-inicio-sesion"
                  @click="logOut()"
                >
                  Cerrar Sesion
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-menu>
      </v-col>
    </v-row>

    <v-card elevation="0">
      <v-tabs
        v-model="tab"
        align-tabs="center"
        color="deep-purple-accent-4"
        grow
        height="25"
      >
        <!-- Home -->
        <v-tab
          append-icon="mdi mdi-home-variant-outline"
          @click="goTo('home')"
          variant="plain"
          :ripple="false"
          value="one"
          >NotBuy</v-tab
        >

        <!-- Categorias -->

        <v-tab variant="plain" :ripple="false" value="two" class="not-cursor">
          <CategoryComponent
            :categories="categories"
            :go-to-query="goToQuery"
          />
        </v-tab>

        <!-- Intercambios -->
        <v-tab
          v-if="keycloak?.authenticated"
          append-icon="mdi mdi-swap-horizontal"
          variant="plain"
          :ripple="false"
          value="three"
          @click="goToWithAuth('exchange-list')"
          >Intercambios</v-tab
        >

        <!-- Publicaciones -->
        <v-tab
          v-if="keycloak?.authenticated"
          append-icon="mdi mdi-creation"
          @click="goToWithAuth('create-publish')"
          variant="plain"
          :ripple="false"
          value="four"
          >Publicar</v-tab
        >

        <!-- Planes -->
        <v-tab
          v-if="keycloak?.authenticated"
          append-icon="mdi mdi-cash-check"
          variant="plain"
          :ripple="false"
          value="five"
          @click="goToWithAuth('plan')"
          >Planes</v-tab
        >

        <!-- Ayuda -->
        <v-tab
          append-icon="mdi mdi-help-box-multiple-outline "
          variant="plain"
          :ripple="false"
          value="six"
          >Ayuda</v-tab
        >
      </v-tabs>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import keycloak from "../../security/keycloak-config";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import { onBeforeUnmount } from "vue";
import CategoryComponent from "./category.component.vue";
import { Categories } from "../../data/category.data";

export default defineComponent({
  name: "NavbarComponent",
  components: {
    CategoryComponent,
  },
  setup() {
    const router = useRouter();
    const loading = ref(false);
    const categories = Categories;

    const search = ref("");

    const isMenuOpen = ref(false);
    const windowWidth = ref(window.innerWidth);

    const logOut = async () => {
      await keycloak.logout();
    };

    const login = async () => {
      await keycloak.login();
    };

    const goTo = (path: string) => {
      router.push({ name: path });
    };

    const goToWithAuth = (path: string) => {
      if (keycloak.authenticated) {
        return router.push({ name: path });
      }
      return login();
    };

    const nameFormmatted = (name: string) => {
      const [ first, second] = name.split(" ");
      return `${first} ${second}`;
    };

    const goToHome = () => {
      router.push("/");
    };

    const goToQuery = (path: string, params: any) => {
      router.push({
        name: path,
        query: { category: params?.category, search: params?.search },
      });

      search.value = params?.search;
    };

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };

    const handleResize = () => {
      windowWidth.value = window.innerWidth;
      if (windowWidth.value > 1040) {
        isMenuOpen.value = false;
      }
    };

    onMounted(() => {
      window.addEventListener("resize", handleResize);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("resize", handleResize);
    });

    return {
      logOut,
      login,
      keycloak,
      isMenuOpen,
      toggleMenu,
      windowWidth,
      loading,
      goToHome,
      goTo,
      goToWithAuth,
      goToQuery,
      categories,
      search,
      nameFormmatted,
    };
  },
  data() {
    return {
      tab: null,
    };
  },
});
</script>

<style scoped>
.logo {
  max-width: 140px;
}

.active-button {
  border-bottom: 2px solid #ba0c2f;
}

.btn-inicio-sesion {
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

.btn-cerrar-sesion {
  color: #fff;
  background: #757575;
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

.not-cursor {
  cursor: default;
}

.text-color {
  color: black !important;
}

@media (max-width: 1280px) {
  .d-none-1280 {
    display: none !important;
  }
}

@media (min-width: 1280px) {
  .d-none-nav {
    display: none !important;
  }
}
</style>
