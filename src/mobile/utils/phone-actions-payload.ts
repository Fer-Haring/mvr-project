export type ImageSourceOption = 'camera' | 'gallery';

export interface OpenImagePickerRequest {
  image_source: ImageSourceOption;
  width?: number;
}

export interface OpenImagePickerResponse {
  base64_image: string;
  mime_type: string;
  file_name: string;
}
