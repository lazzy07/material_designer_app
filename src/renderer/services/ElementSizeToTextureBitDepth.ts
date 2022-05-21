import { TEXTURE_BIT_DEPTH } from "../../interfaces/TextureBitDepths";

export const elementSizeToBitDepth = (
  elementSize: number
): TEXTURE_BIT_DEPTH => {
  if (elementSize === 8) {
    return TEXTURE_BIT_DEPTH.U_INT_8;
  } else if (elementSize === 16) {
    return TEXTURE_BIT_DEPTH.U_INT_16;
  } else if (elementSize === 32) {
    return TEXTURE_BIT_DEPTH.U_INT_32;
  }

  return TEXTURE_BIT_DEPTH.U_INT_8;
};
