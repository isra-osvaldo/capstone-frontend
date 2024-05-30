<template>
  <v-card class="text-center" :loading="loading">
    <v-card-title class="card-header">Calificar Intercambio</v-card-title>
    <form autocomplete="off" @submit.prevent="onSubmit">
      <v-card-text>
        <v-row justify="center" align="center">
          <v-col cols="12" md="10" lg="10">
            <div class="text-center">
              <v-rating
                v-model="evaluation.value.value"
                :error-messages="evaluation.errorMessage.value"
                hover
                color="yellow-darken-3"
              ></v-rating>
            </div>

            <v-textarea
              v-model="comment.value.value"
              :error-messages="comment.errorMessage.value"
              :counter="500"
              label="Comentario"
              placeholder="Escribe un comentario"
              variant="outlined"
              rows="3"
              class="mt-3"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn color="deep-purple" class="ma-3" variant="flat" type="submit"
          >Calificar</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="dialogActions(false, index)">Cancelar</v-btn>
      </v-card-actions>
    </form>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import Swal from "sweetalert2";
import { useField, useForm } from "vee-validate";
import { number, object, string } from "yup";
import { ExchangeForCalification } from "../../common/interfaces/exchange.interface";
import { calificationService } from "../../services/calification.service";
import { CalificationResponse } from "../../common/response/calification.response";

export default defineComponent({
  name: "DialogExchangeComponent",
  props: {
    dialogActions: {
      type: Function,
      required: true,
    },
    exchange: {
      type: Object as () => ExchangeForCalification,
      required: true,
    },
    index: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const loading = ref(false);
    const exchange = ref(props.exchange);
    const calification = ref({} as CalificationResponse);

    const CalificationSchema = object().shape({
      comment: string().trim().max(500).required("Ingrese un comentario"),
      evaluation: number()
        .min(1)
        .max(5)
        .required("Seleccione una calificación"),
    });

    const { handleSubmit } = useForm({
      validationSchema: CalificationSchema,
      initialValues: {
        evaluation: 5,
        comment: "",
      },
    });

    const comment = useField("comment", CalificationSchema);
    const evaluation = useField("evaluation", CalificationSchema) as any;

    const getCalification = async () => {
      return await calificationService.getCalificationByExchangeUuid(
        exchange.value.exchange_uuid
      );
    };

    const setValues = (calification: CalificationResponse) => {
      comment.value.value = calification.comment;
      evaluation.value.value = calification.calification;
    };

    const onSubmit = handleSubmit(async (values) => {
      loading.value = true;
      props.dialogActions(false, props.index)

      Swal.fire({
        title: "Realizando Calificación",
        html: "Espere un momento por favor",
        timerProgressBar: true,
        toast: true,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      try {
        if (calification.value) {
          await calificationService.updateCalification(
            {
              uuid_exchange: exchange.value.exchange_uuid,
              comment: values.comment,
              evaluation: values.evaluation,
              uuid_user: exchange.value.productOffer.uuid_user,
            },
            calification.value.uuid
          );
        } else {
          await calificationService.createCalification({
            uuid_exchange: exchange.value.exchange_uuid,
            comment: values.comment,
            evaluation: values.evaluation,
            uuid_user: exchange.value.productOffer.uuid_user,
          });
        }

        Swal.fire({
          title: "Califación",
          text: "Se ha realizado con éxito",
          icon: "success",
          confirmButtonText: "Aceptar",
          toast: true,
        });
      } catch (error: any) {
        Swal.fire({
          title: "No se ha podido realizar la calificación",
          text: error.response.data.message || "Ha ocurrido un error",
          icon: "error",
          confirmButtonText: "Aceptar",
          toast: true,
        });
      } finally {
        loading.value = false;
      }
    });

    onMounted(async () => {
      calification.value = await getCalification();
      if (calification.value) {
        setValues(calification.value);
      }
    });

    return {
      loading,
      onSubmit,
      comment,
      evaluation,
    };
  },
});
</script>

<style scoped>
.size-up {
  font-size: 50px;
}

.card-header {
  background-color: #6d42ba;
  color: white;
  text-transform: uppercase;
}
</style>
