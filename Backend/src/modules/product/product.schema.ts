import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';


const productInput = {
  title: z.string(),
  price: z.number(),
  content: z.string().optional(),
};

const productGenerated = {
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
};

const createProductSchema = z.object({
  ...productInput,
});

const productResponseSchema = z.object({
  ...productInput,
  ...productGenerated,
});

const productsResponseSchema = z.array(productResponseSchema);

const deleteProductSchema = z.object({
  id: z.number(),
});

const updateProductSchema = z.object({
  id: z.number(),
  ...productInput,
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type DeleteProductInput = z.infer<typeof deleteProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;

export const { schemas: productSchemas, $ref: productRef } = buildJsonSchemas(
  {
    createProductSchema,
    productResponseSchema,
    productsResponseSchema,
    deleteProductSchema,
    updateProductSchema,
  },
  {
    $id: 'ProductSchema',
  }
);
