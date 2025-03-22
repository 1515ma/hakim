export interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  duration: string;
  rating: number;
  category?: string;
  description: string;
  releaseDate?: string;
  narrator?: string;
  additionalText?: string;
  reviews?: number;
  isPublished?: boolean; // Adicionado isPublished
  audioFile?: string;    // Adicionado audioFile
  previewFile?: string;  // Adicionado previewFile
  createdAt?: string;    // Adicionado createdAt
  updatedAt?: string;    // Adicionado updatedAt
}
