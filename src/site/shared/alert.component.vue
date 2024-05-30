<template>
  <v-container v-if="!loading">
    <v-alert
      color="deep-purple"
      :icon="icon"
      :title="title"
      :text="text"
    ></v-alert>
  </v-container>

  <v-container v-else>
    <v-alert
      color="deep-purple"
      icon="mdi mdi-loading mdi-spin"
      title="Cargando..."
      text="Espere un momento por favor"
    ></v-alert>

  </v-container>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
export default defineComponent({
  name: "AlertComponent",
  props: {
    icon: {
      type: String,
      default: "$info",
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    loading: {
      type: Boolean,
    },
  },
  setup(props) {

    const loading =  computed(() => props.loading)

    return {
      loading,
    };
  },
});
</script>
