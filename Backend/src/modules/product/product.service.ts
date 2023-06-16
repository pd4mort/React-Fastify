import prisma from "../../utils/prisma";
import { CreateProductInput, UpdateProductInput } from "./product.schema";

/**
 * Create product service
 * @param data 
 * @returns 
 */
export async function createProduct(data: CreateProductInput & { ownerId: number }) {
  return prisma.product.create({
    data,
  });
}

/**
 * Get product service
 * @returns 
 */
export function getProducts() {
  return prisma.product.findMany({
    select: {
      content: true,
      title: true,
      price: true,
      id: true,
      createdAt: true,
      updatedAt: true,
      owner: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  });
}

/**
 * Delete product by id service
 * @param id 
 * @returns 
 */
export function deleteProduct(id: number) {
  return prisma.product.delete({
    where: {
      id: id,
    },
  });
}

/**
 * Update product service
 * @param id 
 * @param data 
 * @returns 
 */
export function updateProduct(id: number, data: UpdateProductInput) {
  return prisma.product.update({
    where: {
      id: id,
    },
    data,
  });
}
