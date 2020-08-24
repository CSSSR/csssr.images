import { SrcSet, Dpr } from '../types';

export const getOriginalExtensionSrcSet = (pixelRatios: Dpr[], outputImagePath:string):SrcSet => {
  return pixelRatios.reduce((acc, item ) => {
   acc[item] = outputImagePath;
    return acc;
  }, {} as SrcSet);
}
