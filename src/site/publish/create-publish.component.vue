<template>
  <v-container class="h-100">
    <v-card class="mx-auto mt-10 border">
      <v-card-title class="text-h6 font-weight-regular text-center mt-5">
        <span class="mr-5">{{ currentTitle }}</span>

        <!-- icon dependiendo del stepper -->
        <v-icon v-if="step === 1" color="purple-darken-4" size="30" class="mr-5"
          >mdi-creation</v-icon
        >

        <v-icon v-if="step === 2" color="purple-darken-4" size="30" class="mr-5"
          >mdi-image-multiple</v-icon
        >

        <v-icon v-if="step === 3" color="purple-darken-4" size="30" class="mr-5"
          >mdi-check-circle</v-icon
        >

        <v-divider class="mt-5"></v-divider>
        <form autocomplete="off" @submit.prevent="onSubmit">
          <v-window v-model="step" class="mt-5">
            <v-window-item :value="1">
              <v-card-text>
                <v-row justify="center" align="center">
                  <v-col>
                    <!-- Name -->
                    <v-text-field
                      v-model="name.value.value"
                      :error-messages="name.errorMessage.value"
                      label="Nombre"
                      placeholder="Nombre"
                      variant="underlined"
                    ></v-text-field>
                  </v-col>

                  <!-- Precio -->
                  <v-col>
                    <v-text-field
                      v-model="price.value.value"
                      :error-messages="price.errorMessage.value"
                      label="Precio Referencia"
                      placeholder="Precio"
                      variant="underlined"
                      prefix="$"
                      suffix="CLP"
                      type="number"
                      min="1"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row justify="center" align="center">
                  <!-- Categoria -->
                  <v-col>
                    <v-combobox
                      v-model="category.value.value"
                      :error-messages="category.errorMessage.value"
                      label="Categoria"
                      placeholder="Categoria"
                      variant="underlined"
                      :items="SubCategories"
                    ></v-combobox>
                  </v-col>

                  <!-- Cantidad -->
                  <v-col>
                    <v-text-field
                      v-model="stock.value.value"
                      :error-messages="stock.errorMessage.value"
                      min="1"
                      label="Cantidad de stock"
                      placeholder="10"
                      variant="underlined"
                      type="number"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row justify="center" align="center">
                  <!-- Condición -->
                  <v-col>
                    <v-select
                      v-model="isNew.value.value"
                      :error-messages="isNew.errorMessage.value"
                      label="Condición"
                      placeholder="Condición"
                      variant="underlined"
                      :items="isNewArray"
                      item-title="text"
                      item-value="value"
                    ></v-select>
                  </v-col>

                  <!-- Caracteristicas / combobox con chips -->
                  <v-col>
                    <v-combobox
                      v-model="characteristics.value.value"
                      :error-messages="characteristics.errorMessage.value"
                      label="Caracteristicas del producto"
                      placeholder="Caracteristicas"
                      variant="underlined"
                      chips
                      multiple
                      closable-chips
                    ></v-combobox>
                  </v-col>
                </v-row>

                <v-row justify="center" align="center">
                  <!-- Descripción -->
                  <v-col>
                    <v-textarea
                      v-model="description.value.value"
                      :error-messages="description.errorMessage.value"
                      :counter="500"
                      label="Descripción"
                      placeholder="El producto es nuevo, nunca se ha usado y está en perfectas condiciones de funcionamiento y estética (sin rayas, golpes, etc.) y se entrega con todos sus accesorios originales y en su caja original y con su factura de compra."
                      variant="underlined"
                      auto-grow
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-window-item>

            <v-window-item :value="2">
              <v-card-text>
                <v-row justify="center" align="center">
                  <v-col>
                    <v-file-input
                      v-model="images.value.value"
                      :error-messages="images.errorMessage.value"
                      label="Imagenes para el producto"
                      placeholder="Imagenes"
                      variant="underlined"
                      chips
                      accept="image/png, image/jpeg, image/jpg"
                      prepend-icon="mdi-camera"
                      show-size
                      multiple
                    ></v-file-input>
                  </v-col>
                </v-row>

                <v-row justify="center" align="center">
                  <v-col>
                    <v-file-input
                      v-model="image.value.value"
                      :error-messages="image.errorMessage.value"
                      label="Imagen para la publicación"
                      placeholder="Imagen para la publicación"
                      variant="underlined"
                      chips
                      accept="image/png, image/jpeg, image/jpg"
                      prepend-icon="mdi-camera"
                      show-size
                    ></v-file-input>
                  </v-col>
                </v-row>

                <!-- Breve descripcion para la publicacion -->
                <v-row justify="center" align="center">
                  <v-col>
                    <v-textarea
                      v-model="publish_description.value.value"
                      :error-messages="publish_description.errorMessage.value"
                      :counter="200"
                      label="Descripción"
                      placeholder="Breve descripción para la publicación"
                      variant="underlined"
                      auto-grow
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-window-item>
          </v-window>

          <v-divider></v-divider>

          <v-card-actions>
            <v-btn v-if="step > 1 && step < 3" variant="text" @click="step--">
              Atras
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              v-if="step < 2"
              color="purple-darken-4"
              variant="flat"
              type="submit"
              @click="step++"
            >
              Siguiente
            </v-btn>

            <v-btn
              v-if="step === 2"
              color="purple-darken-4"
              variant="flat"
              type="submit"
              :loading="loading"
              :disabled="loading"
            >
              Publicar
            </v-btn>
          </v-card-actions>
        </form>
      </v-card-title>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { SubCategories } from "../../data/category.data";
import { isNew } from "../../data/product.data";
import { useField, useForm } from "vee-validate";
import { ProductPublishSchema } from "../../schema/product.schema";
import { productService } from "../../services/product.service";
import { imageService } from "../../services/image.service";
import { publishService } from "../../services/publish.service";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "CreatePublishComponent",
  props: {},
  setup() {
    const loading = ref(false);
    const router = useRouter();

    const { handleSubmit } = useForm({
      validationSchema: ProductPublishSchema,
    });

    const name = useField("name", ProductPublishSchema);
    const price = useField("price", ProductPublishSchema);
    const stock = useField("stock", ProductPublishSchema);
    const category = useField("category", ProductPublishSchema) as any;
    const isNew = useField("isNew", ProductPublishSchema) as any;
    const characteristics = useField(
      "characteristics",
      ProductPublishSchema
    ) as any;
    const description = useField("description", ProductPublishSchema);
    const image = useField("image", ProductPublishSchema) as any;
    const images = useField("images", ProductPublishSchema) as any;
    const publish_description = useField(
      "publish_description",
      ProductPublishSchema
    );

    const onSubmit = handleSubmit(async (values) => {
      try {
        loading.value = true;

        Swal.fire({
          title: "Publicando producto",
          html: "Espere un momento por favor",
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        const payload = await ProductPublishSchema.validate(values);
        const product = await productService.createProduct(payload);
        const publish = await publishService.createPublish({
          publish_description: values.publish_description,
          uuid_product: product.uuid,
        });

        const promises = [];

        promises.push(
          imageService.uploadImagePublish(values.image, publish.uuid)
        );
        promises.push(
          imageService.uploadImagesProduct(values.images, product.uuid)
        );

        await Promise.all(promises);

        Swal.fire({
          icon: "success",
          title: "Producto publicado",
          showConfirmButton: false,
          timer: 1500,
          didClose: () => {
            router.push({
              name: "detail-product",
              params: { uuid: product.uuid },
            });
          },
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Algo salio mal!",
          footer: "Intente nuevamente",
        });
      } finally {
        loading.value = false;
      }
    });

    return {
      onSubmit,
      name,
      price,
      stock,
      category,
      isNew,
      characteristics,
      description,
      image,
      images,
      publish_description,
      loading,
    };
  },
  data: () => ({
    step: 1,
    SubCategories,
    isNewArray: isNew,
  }),

  computed: {
    currentTitle() {
      switch (this.step) {
        case 1:
          return "Crear Producto";
        case 2:
          return "Subir Imagenes";
        default:
          return;
      }
    },
  },
});
</script>

<style scoped>
.border {
  border-radius: 10px;
  border: 10px solid #6200ee;
}
</style>
