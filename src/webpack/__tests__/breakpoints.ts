import { getBreakpointMedia } from '../../utils/utils';

test('breakpoint has both min and max width', () => {
  expect(
    getBreakpointMedia({
      name: 'name',
      minWidth: 10,
      maxWidth: 20,
    }),
  ).toBe('(min-width: 10px) and (max-width: 20px)');
});

test('breakpoint has only min width', () => {
  expect(
    getBreakpointMedia({
      name: 'name',
      minWidth: 10,
    }),
  ).toBe('(min-width: 10px)');
});

test('breakpoint has only max width', () => {
  expect(
    getBreakpointMedia({
      name: 'name',
      maxWidth: 20,
    }),
  ).toBe('(max-width: 20px)');
});
