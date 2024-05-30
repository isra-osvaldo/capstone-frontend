<template>
  <v-container>
    <div class="card" :class="card.animation">
      <div class="content">
        <div class="title">{{ card.title }}</div>
        <p class="title">{{ card.subtitle }}</p>

        <div class="price">${{ card.price }}</div>

        <ul class="lists">
          <li class="list">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span>{{ card.changes }} Intercambios</span>
          </li>
          <!-- <li class="list">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span>Lorem ipsum dolor!</span>
          </li>
          <li class="list">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span>Lorem ipsum dolor!</span>
          </li> -->
        </ul>
        <p class="letter-white" v-if="days && price === card.price">
          Días restantes {{ days }}
        </p>
      </div>
      <v-btn
        v-if="price === card.price || card.price === 0"
        :loading="loading"
        class="no-mouse"
        >{{ price === card.price ? "Plan Actual" : "Gratis" }}
      </v-btn>
      <v-btn
        v-else
        @click="createTransaction(card.price, card.type)"
        :color="card?.color"
        :loading="loading"
        >{{ card.button }}
        <v-dialog v-model="dialog" width="700">
          <ContractPlanComponent
            :dialog-actions="dialogActions"
            :render-html="renderHtml"
            :transaction="transaction"
          />
        </v-dialog>
      </v-btn>
    </div>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { PlanRender } from "../../data/plan.data";
import { transbankService } from "../../services/transbank.service";
import {
  Transaction,
  Credential,
} from "../../common/interfaces/plan.interface";
import ContractPlanComponent from "../plan/contract-plan.component.vue";
import Swal from "sweetalert2";

export default defineComponent({
  name: "CardPlanComponent",
  components: {
    ContractPlanComponent,
  },
  props: {
    card: {
      type: Object as () => PlanRender,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    days: {
      type: Number,
    },
  },
  setup(props) {
    const dialog = ref(false);
    const loading = ref(false);

    const transaction = ref({} as Transaction);
    const credentials = ref({} as Credential);

    const renderHtml = ref("");

    const createTransaction = async (amount: number, type: string) => {
      loading.value = true;

      if (props.days) {
        const result = await Swal.fire({
          icon: "question",
          text: "Aun tienes días restantes en tu plan",
          confirmButtonText: "¿Deseas continuar?",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
        });

        if(!result.isConfirmed) {
          loading.value = false;
          return;
        }

      }

      const buyOrder = "O-" + Math.floor(Math.random() * 10000) + 1;
      const sessionId = "S-" + Math.floor(Math.random() * 10000) + 1;

      const payload: Transaction = {
        amount,
        buyOrder,
        sessionId,
        type,
      };
      // Obtengo el html
      const response = await transbankService.createTransaction(payload);

      transaction.value = payload;

      renderHtml.value = response;

      // showHtml.value = true;
      loading.value = false;
      dialogActions(true);
    };

    const dialogActions = (state: boolean) => {
      dialog.value = state;
    };

    return {
      createTransaction,
      dialogActions,
      dialog,
      transaction,
      credentials,
      renderHtml,
      loading,
    };
  },
});
</script>

<style scoped>
.letter-white {
  color: white;
}
.no-mouse {
  cursor: default;
}
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 90%;
  max-width: 400px;
  padding: 20px 1px;
  margin: 10px 0;
  text-align: center;
  position: relative;
  cursor: default;
  box-shadow: 0 10px 15px -3px rgba(33, 150, 243, 0.4),
    0 4px 6px -4px rgba(33, 150, 243, 0.4);
  border-radius: 10px;
  background-color: #6b6ecc;
  background: linear-gradient(45deg, #04051dea 0%, #2b566e 100%);
}

.content {
  padding: 20px;
}

.content .price {
  color: white;
  font-weight: 800;
  font-size: 50px;
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.42);
}

.content .description {
  color: rgba(255, 255, 255, 0.6);
  margin-top: 10px;
  font-size: 14px;
}

.content .title {
  font-weight: 800;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.64);
  margin-top: 10px;
  font-size: 25px;
  letter-spacing: 1px;
}

button {
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  border: none;
  outline: none;
  color: rgb(255 255 255);
  text-transform: uppercase;
  font-weight: 700;
  font-size: 0.75rem;
  padding: 0.75rem 1.5rem;
  background-color: rgb(33 150 243);
  border-radius: 0.5rem;
  width: 90%;
  text-shadow: 0px 4px 18px #2c3442;
}

.lists {
  margin-bottom: 1.5rem;
  flex: 1 1 0%;
  color: rgba(156, 163, 175, 1);
}

.lists .list {
  margin-bottom: 0.5rem;
  display: flex;
  margin-left: 0.5rem;
}

.lists .list svg {
  height: 1.5rem;
  width: 1.5rem;
  flex-shrink: 0;
  margin-right: 0.5rem;
  color: rgba(167, 139, 250, 1);
}
</style>
