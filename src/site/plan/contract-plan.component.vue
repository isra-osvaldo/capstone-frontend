<template>
  <v-card>
    <v-card-title class="text-center">Contratar Plan</v-card-title>
    <v-row justify="center">
      <v-col cols="10">
        <v-text-field
          variant="underlined"
          v-model="transaction.buyOrder"
          label="Orden de compra"
          readonly
        ></v-text-field>

        <v-text-field
          variant="underlined"
          v-model="transaction.sessionId"
          label="Sesión"
          readonly
        ></v-text-field>

        <v-text-field
          variant="underlined"
          v-model="transaction.amount"
          label="Monto"
          readonly
        ></v-text-field>
      </v-col>
    </v-row>

    <v-card-actions>
      <v-btn color="deep-purple" class="ma-3" variant="flat">
        <div v-html="transbankHtml"></div>
      </v-btn>

      <v-spacer></v-spacer>
        <v-btn color="primary" @click="dialogActions(false)">Cancelar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Transaction } from "../../common/interfaces/plan.interface";

export default defineComponent({
  name: "ContractPlanComponent",
  components: {},
  props: {
    renderHtml: {
      type: String,
      required: true,
    },
    transaction: {
      type: Object as () => Transaction,
      required: true,
    },
    dialogActions: {
      type: Function as any,
      required: true,
    },
  },
  setup(props) {
    const transbankHtml = ref(props.renderHtml);

    return {
      transbankHtml,
    };
  },
});
</script>

<style scoped></style>
../../common/interfaces/plan.interface