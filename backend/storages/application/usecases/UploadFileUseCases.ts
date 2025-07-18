import { StorageRepository } from '../../domain/repositories/StorageRepository';

export class UploadFileUseCase {
  private repository: StorageRepository;

  constructor(repository: StorageRepository) {
    this.repository = repository;
  }

  async execute(file: File): Promise<string> {
    const imageUrl = await this.repository.uploadFile(file);

    return imageUrl;
  }
}
