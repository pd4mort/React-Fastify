import { Product } from "./product";

interface User {
  id: number;
  email: string;
  name?: string;
  password: string;
  salt: string;
  products: Product[];
  createdAt: string;
  updatedAt: string;
}

export type { User };