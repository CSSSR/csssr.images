import { OrderedBreakpointSource, BreakpointSource } from '../types';

export const getSources = (allSources: OrderedBreakpointSource[]): BreakpointSource[] => {
  // Делаем копию массива, так как сортировка мутирует исходный массив
  const sortedSources = [...allSources];
  // Сортировка srcSets в порядке списка breakpoints
  sortedSources.sort((a, b) => a.order - b.order);
  return sortedSources.map((item) => ({
    breakpointMedia: item.breakpointMedia,
    srcSets: item.srcSets,
  }));
};
