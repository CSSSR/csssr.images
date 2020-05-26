import { Compiler } from 'webpack';

// Храним все ссылки на картинки через imgproxy здесь,
// чтобы после сборки пройтись по ним и убедиться, что они созданы
// и не будут генерироваться при работе с сайтом.
export const imageUrls: string[] = [];

const pluginName = 'CollectAllImageUrlsPlugin';

export class Plugin {
  apply(compiler: Compiler): void {
    compiler.hooks.done.tap(pluginName, function () {
      // TODO emit file here
      console.log(JSON.stringify(imageUrls));
    });
  }
}
