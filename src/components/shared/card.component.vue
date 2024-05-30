<template>
  <v-card class="my-2" :width="width" :class="class">
    <template v-slot:loader="{ isActive }">
      <v-progress-linear
        :active="isActive"
        color="deep-purple"
        height="4"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      :height="height"
      :lazy-src="card.image"
      :src="card.image"
      class="mt-2"
    >
      <template v-slot:placeholder>
        <div class="d-flex align-center justify-center fill-height">
          <v-progress-circular
            color="grey-lighten-4"
            indeterminate
          ></v-progress-circular>
        </div>
      </template>
    </v-img>

    <v-card-item>
      <v-card-title>{{ card.name }}</v-card-title>

      <v-card-subtitle>
        <span class="me-1">{{ card.category }}</span>
        <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
      </v-card-subtitle>
    </v-card-item>

    <v-card-text class="min_height">
      <v-row align="center" class="mx-0">
        <v-rating
          :model-value="card.reputationId.rating"
          color="amber"
          density="compact"
          half-increments
          readonly
          size="small"
        ></v-rating>

        <div class="text-grey ms-4">
          {{ card.reputationId.rating }} ({{
            card.reputationId.total_calification 
          }})
        </div>
      </v-row>

      <div class="mt-4 text-subtitle-2 elipsis">
        {{ card.publish_description }}
      </div>
    </v-card-text>

    <v-divider v-if="showActions"></v-divider>
    <v-card-actions v-if="showActions">
      <v-btn
        color="deep-purple-lighten-2 ma-3"
        variant="outlined"
        @click="goToDetailPublish(card.uuid_product)"
      >
        Ver Detalles
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { PublishWithObjectReputation } from "../../common/response/publish.response";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "CardComponent",
  props: {
    card: {
      type: Object as () => PublishWithObjectReputation,
      required: true,
    },
    height: {
      type: String,
      default: "180",
    },
    width: {
      type: String,
      default: "",
    },
    class: {
      type: String,
      default: "",
    },
    showActions: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    const router = useRouter();

    const goToDetailPublish = (uuid: string) => {
      router.push({ name: "detail-product", params: { uuid } });
    };

    return {
      goToDetailPublish,
    };
  },
});
</script>

<style scoped>
.elipsis {
  overflow: hidden;
  text-overflow: ellipsis;
}

.min_height {
  min-height: 114px;
  max-height: 114px;
}
</style>
