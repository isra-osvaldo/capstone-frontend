import { array, boolean, InferType, mixed, number, object, string } from "yup";

// TODO: add validation for images

export const ProductSchema = object().shape({
  name: string().required().trim().min(3).max(50),
  price: number().required('Debe ingresar un precio').min(1).max(100000000),
  stock: number().required().min(1).max(100000000).positive().integer(),
  category: string().required().trim().min(3).max(50),
  isNew: boolean().required(),
  description: string().required().trim().min(3).max(500),
  characteristics: array()
    .of(string().required().trim().min(3).max(500))
    .required(),
  image: mixed().required(),
});

export const PublishSchema = object().shape({
  images: array().of(mixed().required()).required(),
  publish_description: string().required().trim().min(3).max(200),
});

export const ProductPublishSchema = ProductSchema.concat(PublishSchema);

export type ProductType = InferType<typeof ProductSchema>;
export type PublishType = InferType<typeof PublishSchema>;
export type ProductPublishType = InferType<typeof ProductPublishSchema>;
export type ProductWithoutImageType = Omit<ProductType, "image">;
