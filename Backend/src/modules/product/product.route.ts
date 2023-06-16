import { FastifyInstance } from "fastify";
import {
  createProductHandler,
  getProductsHandler,
  deleteProductHandler,
  updateProductHandler
} from "./product.controller";
import { productRef } from "./product.schema";

/**
 * Products routes
 * @param server 
 */
async function productRoutes(server: FastifyInstance) {

  /**
   * Add product 
   * need authenticate
   */
  server.post("/", {
    preHandler: [server.authenticate],
    schema: {
      body: productRef("createProductSchema"),
      response: {
        201: productRef("productResponseSchema")
      }
    }
  }, createProductHandler);

  /**
   * Get  products
   */
  server.get("/", {
    schema: {
      response: {
        200: productRef("productsResponseSchema")
      }
    }
  }, getProductsHandler);


  /**
   * Delete product by id
   * @id
   * need authenticate
   */
  server.delete("/:id", {
    preHandler: [server.authenticate],
    schema: {
      params: {
        type: "object",
        properties: {
          id: { type: "number" }
        }
      },
      response: {
        200: {
          type: "string",
          description: "Product deleted successfully"
        }
      }
    }
  }, deleteProductHandler);

  /**
   * Update product
   * @id 
   * need authenticate
   */
  server.put("/:id", {
    preHandler: [server.authenticate],
    schema: {
      params: {
        type: "object",
        properties: {
          id: { type: "number" }
        }
      },
      body: productRef("createProductSchema"),
      response: {
        200: productRef("productResponseSchema")
      }
    }
  }, updateProductHandler);
}

export default productRoutes;
