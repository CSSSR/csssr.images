import { backgroundCss } from '../index';

// TODO Можно здесь подсмотреть более симпатичный репортинг завалившихся тестов
// https://gist.github.com/cassidoo/c726872858ce14e793a26619bd6a358f
expect.extend({
  toBeSameCss(received, expected) {
    const replaceWhitespace = (str: string) => str.replace(/\s+/g, ' ').trim();
    const normalizedReceived = replaceWhitespace(received);
    const normalizedExpected = replaceWhitespace(expected);
    const pass = normalizedReceived === normalizedExpected;

    if (pass) {
      return {
        message: () =>
          `expected ${normalizedReceived} not to have the same content as ${normalizedExpected}`,
        pass: true,
      };
    } else {
      return {
        pass: false,
        message: () =>
          `expected ${normalizedReceived} to have the same content as ${normalizedExpected}`,
      };
    }
  },
});

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toBeSameCss: (expected: string) => R;
    }
  }
}

test('backgroundCss all, png only', () => {
  expect(
    backgroundCss('.my-selector', [
      {
        breakpointMedia: undefined,
        srcSets: [
          {
            extension: 'png',
            srcSet: {
              '1x': '/all.1x.png',
              '2x': '/all.2x.png',
              '3x': '/all.3x.png',
            },
          },
        ],
      },
    ]),
  ).toBeSameCss(`
.my-selector {
  background-image: url(/all.1x.png);
}

@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .my-selector {
    background-image: url(/all.2x.png);
  }
}

@media (-webkit-min-device-pixel-ratio: 3), (min-resolution: 288dpi) {
  .my-selector {
    background-image: url(/all.3x.png);
  }
}`);
});

test('backgroundCss all, png and webp', () => {
  expect(
    backgroundCss('.my-selector', [
      {
        breakpointMedia: undefined,
        srcSets: [
          {
            extension: 'png',
            srcSet: {
              '1x': '/all.1x.png',
              '2x': '/all.2x.png',
              '3x': '/all.3x.png',
            },
          },
          {
            extension: 'webp',
            srcSet: {
              '1x': '/all.1x.webp',
              '2x': '/all.2x.webp',
              '3x': '/all.3x.webp',
            },
          },
        ],
      },
    ]),
  ).toBeSameCss(`
.my-selector {
  background-image: url(/all.1x.png);
}

html.webp .my-selector {
  background-image: url(/all.1x.webp);
}

@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .my-selector {
    background-image: url(/all.2x.png);
  }
  html.webp .my-selector {
    background-image: url(/all.2x.webp);
  }
}

@media (-webkit-min-device-pixel-ratio: 3), (min-resolution: 288dpi) {
  .my-selector {
    background-image: url(/all.3x.png);
  }
  html.webp .my-selector {
    background-image: url(/all.3x.webp);
  }
}`);
});

test('backgroundCss complex selector', () => {
  expect(
    backgroundCss('#my .complex[selector="my"] > div, .my-selector::after', [
      {
        breakpointMedia: undefined,
        srcSets: [
          {
            extension: 'png',
            srcSet: {
              '1x': '/all.1x.png',
              '2x': '/all.2x.png',
              '3x': '/all.3x.png',
            },
          },
        ],
      },
    ]),
  ).toBeSameCss(`
#my .complex[selector="my"] > div, .my-selector::after {
  background-image: url(/all.1x.png);
}

@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  #my .complex[selector="my"] > div, .my-selector::after {
    background-image: url(/all.2x.png);
  }
}

@media (-webkit-min-device-pixel-ratio: 3), (min-resolution: 288dpi) {
  #my .complex[selector="my"] > div, .my-selector::after {
    background-image: url(/all.3x.png);
  }
}`);
});

test('backgroundCss one breakpoint, png only', () => {
  expect(
    backgroundCss('.my-selector', [
      {
        breakpointMedia: '(min-width: 400px) and (max-width: 799px)',
        srcSets: [
          {
            extension: 'png',
            srcSet: {
              '1x': '/tablet.all.1x.png',
              '2x': '/tablet.all.2x.png',
              '3x': '/tablet.all.3x.png',
            },
          },
        ],
      },
    ]),
  ).toBeSameCss(`
@media (min-width: 400px) and (max-width: 799px) {
  .my-selector {
    background-image: url(/tablet.all.1x.png);
  }

  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    .my-selector {
      background-image: url(/tablet.all.2x.png);
    }
  }

  @media (-webkit-min-device-pixel-ratio: 3), (min-resolution: 288dpi) {
    .my-selector {
      background-image: url(/tablet.all.3x.png);
    }
  }
}`);
});

test('backgroundCss one breakpoint, png and webp', () => {
  expect(
    backgroundCss('.my-selector', [
      {
        breakpointMedia: '(min-width: 400px) and (max-width: 799px)',
        srcSets: [
          {
            extension: 'png',
            srcSet: {
              '1x': '/tablet.all.1x.png',
              '2x': '/tablet.all.2x.png',
              '3x': '/tablet.all.3x.png',
            },
          },
          {
            extension: 'webp',
            srcSet: {
              '1x': '/tablet.all.1x.webp',
              '2x': '/tablet.all.2x.webp',
              '3x': '/tablet.all.3x.webp',
            },
          },
        ],
      },
    ]),
  ).toBeSameCss(`
@media (min-width: 400px) and (max-width: 799px) {
  .my-selector {
    background-image: url(/tablet.all.1x.png);
  }
  html.webp .my-selector {
    background-image: url(/tablet.all.1x.webp);
  }

  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    .my-selector {
      background-image: url(/tablet.all.2x.png);
    }
    html.webp .my-selector {
      background-image: url(/tablet.all.2x.webp);
    }
  }

  @media (-webkit-min-device-pixel-ratio: 3), (min-resolution: 288dpi) {
    .my-selector {
      background-image: url(/tablet.all.3x.png);
    }
    html.webp .my-selector {
      background-image: url(/tablet.all.3x.webp);
    }
  }
}`);
});

test('backgroundCss multiple breakpoints, png and webp', () => {
  expect(
    backgroundCss('.my-selector', [
      {
        breakpointMedia: '(max-width: 399px)',
        srcSets: [
          {
            extension: 'png',
            srcSet: {
              '1x': '/mobile.all.1x.png',
              '2x': '/mobile.all.2x.png',
              '3x': '/mobile.all.3x.png',
            },
          },
          {
            extension: 'webp',
            srcSet: {
              '1x': '/mobile.all.1x.webp',
              '2x': '/mobile.all.2x.webp',
              '3x': '/mobile.all.3x.webp',
            },
          },
        ],
      },
      {
        breakpointMedia: '(min-width: 400px) and (max-width: 799px)',
        srcSets: [
          {
            extension: 'png',
            srcSet: {
              '1x': '/tablet.all.1x.png',
              '2x': '/tablet.all.2x.png',
              '3x': '/tablet.all.3x.png',
            },
          },
          {
            extension: 'webp',
            srcSet: {
              '1x': '/tablet.all.1x.webp',
              '2x': '/tablet.all.2x.webp',
              '3x': '/tablet.all.3x.webp',
            },
          },
        ],
      },
      {
        breakpointMedia: '(min-width: 800px)',
        srcSets: [
          {
            extension: 'png',
            srcSet: {
              '1x': '/desktop.all.1x.png',
              '2x': '/desktop.all.2x.png',
              '3x': '/desktop.all.3x.png',
            },
          },
          {
            extension: 'webp',
            srcSet: {
              '1x': '/desktop.all.1x.webp',
              '2x': '/desktop.all.2x.webp',
              '3x': '/desktop.all.3x.webp',
            },
          },
        ],
      },
    ]),
  ).toBeSameCss(`
@media (max-width: 399px) {
  .my-selector {
    background-image: url(/mobile.all.1x.png);
  }
  html.webp .my-selector {
    background-image: url(/mobile.all.1x.webp);
  }

  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    .my-selector {
      background-image: url(/mobile.all.2x.png);
    }
    html.webp .my-selector {
      background-image: url(/mobile.all.2x.webp);
    }
  }

  @media (-webkit-min-device-pixel-ratio: 3), (min-resolution: 288dpi) {
    .my-selector {
      background-image: url(/mobile.all.3x.png);
    }
    html.webp .my-selector {
      background-image: url(/mobile.all.3x.webp);
    }
  }
}

@media (min-width: 400px) and (max-width: 799px) {
  .my-selector {
    background-image: url(/tablet.all.1x.png);
  }
  html.webp .my-selector {
    background-image: url(/tablet.all.1x.webp);
  }

  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    .my-selector {
      background-image: url(/tablet.all.2x.png);
    }
    html.webp .my-selector {
      background-image: url(/tablet.all.2x.webp);
    }
  }

  @media (-webkit-min-device-pixel-ratio: 3), (min-resolution: 288dpi) {
    .my-selector {
      background-image: url(/tablet.all.3x.png);
    }
    html.webp .my-selector {
      background-image: url(/tablet.all.3x.webp);
    }
  }
}

@media (min-width: 800px) {
  .my-selector {
    background-image: url(/desktop.all.1x.png);
  }
  html.webp .my-selector {
    background-image: url(/desktop.all.1x.webp);
  }

  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    .my-selector {
      background-image: url(/desktop.all.2x.png);
    }
    html.webp .my-selector {
      background-image: url(/desktop.all.2x.webp);
    }
  }

  @media (-webkit-min-device-pixel-ratio: 3), (min-resolution: 288dpi) {
    .my-selector {
      background-image: url(/desktop.all.3x.png);
    }
    html.webp .my-selector {
      background-image: url(/desktop.all.3x.webp);
    }
  }
}`);
});
