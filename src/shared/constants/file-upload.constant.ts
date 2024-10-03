export const MOVIE_POSTER_MAX_SIZE_BYTES: number = 5242880; //5MB
export const MOVIE_POSTER_MAX_SIZE_MB: number =
  MOVIE_POSTER_MAX_SIZE_BYTES / (1024 * 1024);
export const SUPPORTED_MIME_TYPES: string[] = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

//Google Storage
export const GOOGLE_STORAGE_BUCKET_URL =
  'https://storage.googleapis.com/cinema_images_bucket/';
export const GOOGLE_STORAGE_BUCKET_NAME = 'cinema_images_bucket';
export const GOOGLE_STORAGE_POSTER_FOLDER_NAME = 'movie_posters/';
