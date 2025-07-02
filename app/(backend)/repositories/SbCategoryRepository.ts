import { SupabaseClient } from "@supabase/supabase-js";
import { Category } from "../domain/entities/Category";
import { CategoryTable } from "../domain/tables/CategoryTable";

export const SbCategoryRepository = (supabase: SupabaseClient) => {
  // 데이터베이스 데이터를 도메인 엔티티로 변환
  const mapToMenu = (category: CategoryTable): Category => ({
    id: category.id,
    name: category.name,
  });

  const findAll = async () => {
    const { data, error } = await supabase.from("category").select();

    if (error) throw new Error(error.message);
    return data.map((menu) => mapToMenu(menu)) as Category[];
  };

  return {
    findAll,
  };
};

// export class SbCategoryRepository implements CategoryRepository {
//   private supabase;

//   constructor(supabase: SupabaseClient) {
//     this.supabase = supabase;
//   }

//   // 데이터베이스 데이터를 도메인 엔티티로 변환
//   private static mapToMenu(category: CategoryTable): Category {
//     return {
//       id: category.id,
//       name: category.name,
//     };
//   }

//   async findAll(): Promise<Category[]> {
//     const { data, error } = await this.supabase.from("category").select();

//     if (error) throw new Error(error.message);
//     return data.map((menu) =>
//       SbCategoryRepository.mapToMenu(menu)
//     ) as Category[];
//   }
// }
