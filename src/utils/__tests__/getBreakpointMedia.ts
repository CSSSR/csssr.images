import { getBreakpointMedia } from '../index';

test('breakpoint has both min and max width', () => {
  expect(
    getBreakpointMedia({
      minWidth: 10,
      maxWidth: 20,
    }),
  ).toBe('(min-width: 10px) and (max-width: 20px)');
});

test('breakpoint has only min width', () => {
  expect(
    getBreakpointMedia({
      minWidth: 10,
    }),
  ).toBe('(min-width: 10px)');
});

test('breakpoint has only max width', () => {
  expect(
    getBreakpointMedia({
      maxWidth: 20,
    }),
  ).toBe('(max-width: 20px)');
});
