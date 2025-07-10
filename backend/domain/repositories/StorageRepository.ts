export interface StorageRepository {
  uploadFile(file: File): Promise<string>;
  deleteFile(fileUrl: string): Promise<void>;
}
