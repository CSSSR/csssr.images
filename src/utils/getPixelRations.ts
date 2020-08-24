import { Dpr } from '../types';

export const getPixelRations = (originalPixelRatio: Dpr): Dpr[] => {
  switch (originalPixelRatio) {
    case '1x':
      return ['1x'];
    case '2x':
      return ['1x', '2x'];
    case '3x':
      return ['1x', '2x', '3x'];
  }
};
