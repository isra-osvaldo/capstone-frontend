<template>
  <v-menu :close-on-content-click="false" location="end">
    <template v-slot:activator="{ props }">
      <v-btn
        variant="plain"
        color="#000000"
        v-bind="props"
        append-icon="mdi mdi-menu-down"
        class="pb-1"
      >
        Categorias
      </v-btn>
    </template>

    <v-menu
      v-for="(category, index) in categories"
      :key="index"
      location="end bottom"
      open-on-hover
    >
      <template v-slot:activator="{ props }">
        <v-list-item
          v-bind="props"
          append-icon="mdi mdi-menu-right"
          :prepend-icon="category.icon"
          :title="category.name"
          variant="flat"
          class="hover"
        ></v-list-item>
      </template>

      <v-list>
        <v-list-item
          v-for="(subCategory, subIndex) in category.sub_categories"
          :key="subIndex"
          :prepend-icon="subCategory.icon"
          class="pointer"
          @click="goToQuery('search-publish', {
            category: subCategory.name,
            search: '',
          })"
        >
          {{ subCategory.name }}
        </v-list-item>
      </v-list>
    </v-menu>
  </v-menu>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { type Category } from "../../data/category.data";

export default defineComponent({
  name: "CategoryComponent",
  props: {
    categories: {
      type: Object as () => Category[],
      required: true,
    },
    goToQuery: {
      type: Function,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>

.pointer {
  cursor: pointer;
}

.pointer:hover {
  background-color: #e0e0e0;
}

.hover:hover {
  background-color: #e0e0e0;
}
</style>
