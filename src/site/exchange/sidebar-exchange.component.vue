<template>
    <v-card elevation="0">
      <v-layout>
        <v-navigation-drawer class="w-100" permanent theme="dark">
          <v-list v-for="(item, i) in sideBarArray" :key="i">
            <v-list-item
              :title="item.title"
              :value="item.value"
              :active="isActive(item.to!)"
              :prepend-icon="item.icon"
              :to="item.to"
            >
            </v-list-item>
  
            <v-divider></v-divider>
          </v-list>
        </v-navigation-drawer>
        <v-main class="h-91"></v-main>
      </v-layout>
    </v-card>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { SidebarExchangeData } from '../../data/sidebar.data'
  import { useRouter } from 'vue-router'
  
  export default defineComponent({
    name: 'SidebarComponent',
    setup() {
      const router = useRouter()
      const sideBarArray = ref(SidebarExchangeData)
  
  
      const isActive = (to: string) => {
        return router.currentRoute.value.name === to
      }
  
    //   const navigateTo = (to: string) => {
    //     return router.push({ name: to, params: { uuid } })
    //   }
  
      return {
        sideBarArray,
        isActive
      }
    }
  })
  </script>
  
  <style scoped>
  .h-91 {
    height: 83.6vh !important;
    /* height: calc(100vh - 16vh) !important; */
    /* height: 100vh !important; */
  }
  
  .w-100 {
    width: 100% !important;
  }
  
  .v-list-item-title {
    font-weight: bold !important;
  }
  
  .display-none {
    display: none !important;
    padding: 0 !important;
  }
  
  .p-0 {
    padding: 0 !important;
  }
  .v-list-item--density-compact.v-list-item--one-line {
    min-height: 30px;
  }
  
  .v-list-item {
    margin-bottom: 13px !important;
  }
  </style>
  