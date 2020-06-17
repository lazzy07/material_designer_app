import Compressor from "compressorjs";

export const compressImage = (
  image: File | Blob,
  options?: { quality: number; maxWidth?: number; maxHeight?: number }
): Promise<Blob> => {
  let opt = {
    quality: 0.5,
    ...options,
  };

  return new Promise((resolve, reject) => {
    new Compressor(image, {
      ...opt,
      success(res) {
        resolve(res);
      },
      error(err) {
        reject(err);
      },
    });
  });
};

// export const base64toBlob = (base64Data: string, contentType?: string) => {
//   contentType = contentType || "";
//   var sliceSize = 1024;
//   var byteCharacters = atob(base64Data);
//   var bytesLength = byteCharacters.length;
//   var slicesCount = Math.ceil(bytesLength / sliceSize);
//   var byteArrays = new Array(slicesCount);

//   for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
//     var begin = sliceIndex * sliceSize;
//     var end = Math.min(begin + sliceSize, bytesLength);

//     var bytes = new Array(end - begin);
//     for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
//       bytes[i] = byteCharacters[offset].charCodeAt(0);
//     }
//     byteArrays[sliceIndex] = new Uint8Array(bytes);
//   }
//   return new Blob(byteArrays, { type: contentType });
// };

// export const base64toBlob = (base64Data: string): Promise<Blob | null> => {
//   return new Promise((resolve, reject) => {
//     const img = new Image();
//     img.onerror = (err) => {
//       reject(err);
//     };

//     img.onload = () => {
//       var canvas = document.createElement("canvas");
//       canvas.width = img.width;
//       canvas.height = img.height;

//       var ctx = canvas.getContext("2d");
//       if (ctx) {
//         ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
//         canvas.toBlob((blob) => resolve(blob));
//       } else {
//         reject(new Error("Blob conversion failed"));
//       }
//     };

//     img.src = base64Data;
//   });
// };

export const base64toFile = (
  data: Buffer,
  fileName: string,
  contentType?: string
) => {
  return new File([data], fileName, { type: contentType });
};
