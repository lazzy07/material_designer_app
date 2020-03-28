import Compressor from "compressorjs";

export const compressImage = (
  image: File,
  options?: { quality: number; maxWidth?: number; maxHeight?: number }
): Promise<Blob> => {
  let opt = {
    quality: 0.5,
    ...options
  };

  return new Promise((resolve, reject) => {
    new Compressor(image, {
      ...opt,
      success(res) {
        resolve(res);
      },
      error(err) {
        reject(err);
      }
    });
  });
};
