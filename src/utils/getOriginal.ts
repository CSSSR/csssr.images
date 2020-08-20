import { BreakpointSource } from '../types';

export const getOriginal = (source: BreakpointSource): string => {
  // TODO здесь использовалось 3x изображение
  // Надо использовать самое большое по значению
  // или может быть сохранять где-то original раньше
  return source.srcSets[source.srcSets.length - 1].srcSet['1x']
}
