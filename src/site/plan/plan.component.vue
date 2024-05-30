<template>
  <v-container class="height d-flex align-center mt-10">
    <v-row justify="center" align="center">
      <v-col
        cols="12"
        md="4"
        lg="4"
        v-for="planRender in planRenders"
        :key="planRender.id"
        class="d-flex justify-center scale"
      >
        <CardPlanComponent
          :card="planRender"
          :price="plan?.amount || 0"
          :days="days"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { PlanData } from "../../data/plan.data";
import CardPlanComponent from "../shared/card-plan.component.vue";
import type { Plan } from "../../common/interfaces/plan.interface";
import { planService } from "../../services/plan.service";

export default defineComponent({
  name: "PlanComponent",
  components: {
    CardPlanComponent,
  },
  setup() {
    const plan = ref({} as Plan);
    const planRenders = ref([] as any);
    const days = ref(0);

    const getPlan = async () => {
      const response = await planService.getPlanActive();

      if (response) {
        // Calcular los dias restantes entre timestamp_end y timestamp_start
        const dateStart = new Date(response.timestamp_start);
        const dateEnd = new Date(response.timestamp_end);
        const diffTime = Math.abs(dateEnd.getTime() - dateStart.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        days.value = diffDays;
      }

      return response;
    };

    onMounted(async () => {
      plan.value = await getPlan();
      planRenders.value = PlanData;
    });

    return {
      planRenders,
      plan,
      days,
    };
  },
});
</script>

<style scoped>
.height {
  height: 50vh;
}

.scale {
  transition: all 0.3s ease-in-out;
}

.scale:hover {
  transform: scale(1.03);
}

@media (max-width: 970px) {
  .height {
    height: 100vh;
  }
}
</style>
