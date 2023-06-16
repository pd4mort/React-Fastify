import { FastifyRequest } from "fastify";
import { createProduct, getProducts, deleteProduct, updateProduct } from "./product.service";
import { CreateProductInput, UpdateProductInput } from "./product.schema";

/**
 * Create product
 * @param request 
 * @returns 
 */
export async function createProductHandler(
  request: FastifyRequest<{
    Body: CreateProductInput;
  }>
) {
  const product = await createProduct({
    ...request.body,
    ownerId: request.user.id,
  });

  return product;
}

/**
 * Get product
 * @returns 
 */
export async function getProductsHandler() {
  const products = await getProducts();

  return products;
}

/**
 * Delete product
 * @param request 
 * @returns 
 */
export async function deleteProductHandler(
  request: FastifyRequest<{
    Params: { id: number };
  }>
) {
  const id = request.params.id;
  const delProduct = await deleteProduct(id);

  return delProduct;
}

/**
 * Update product
 * @param request 
 * @returns 
 */
export async function updateProductHandler(
  request: FastifyRequest<{
    Params: { id: number };
    Body: UpdateProductInput;
  }>
) {
  const id = request.params.id;
  const updatedProduct = await updateProduct(id, request.body);

  return updatedProduct;
}
