import { Category } from "../entities/Category";

export interface CategoryRepository {
  findAll(): Promise<Category[]>;
}
