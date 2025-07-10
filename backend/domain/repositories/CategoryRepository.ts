import { Category } from '../entities/category/Category';

export interface CategoryRepository {
  findAll(): Promise<Category[]>;
}
