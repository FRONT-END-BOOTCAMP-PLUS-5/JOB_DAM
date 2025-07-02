import { CategoryRepository } from "../../domain/repositories/CategoryRepository";
import { CategoryTable } from "../../domain/tables/CategoryTable";
import { CategoryDto } from "../dtos/CategoryDto";

export const GetCategoryListUsecase = (repository: CategoryRepository) => {
  const execute = async () => {
    // 카테고리 목록 조회
    const categories: CategoryTable[] = await repository.findAll();

    // 카테고리 목록을 DTO로 변환
    const categoryDtos: CategoryDto[] = categories.map((category) => ({
      id: category.id,
      name: category.name,
    }));

    // 카테고리 DTO 반환
    return {
      category: categoryDtos,
    };
  };

  return {
    execute,
  };
};

// export class GetCategoryListUsecase {
//   private repository: CategoryRepository;

//   constructor(repository: CategoryRepository) {
//     this.repository = repository;
//   }

//   async execute(): Promise<{ category: CategoryDto[] }> {
//     // 카테고리 목록 조회
//     const categories: CategoryTable[] = await this.repository.findAll();

//     // 카테고리 목록을 DTO로 변환
//     const categoryDtos: CategoryDto[] = categories.map((category) => ({
//       id: category.id,
//       name: category.name,
//     }));

//     // 카테고리 DTO 반환
//     return {
//       category: categoryDtos,
//     };
//   }
// }
