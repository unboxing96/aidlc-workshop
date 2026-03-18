import api from './api';

export interface ImageUploadResponse { imageUrl: string; }

export const imageApi = {
  upload: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post<ImageUploadResponse>('/images', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};
