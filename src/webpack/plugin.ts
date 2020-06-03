import { Compiler } from 'webpack';

// Храним все ссылки на картинки через imgproxy здесь,
// чтобы после сборки пройтись по ним и убедиться, что они созданы
// и не будут генерироваться при работе с сайтом.
export const imageUrls: string[] = [];

const pluginName = 'CollectAllImageUrlsPlugin';

// TODO imageUrls накапливаются, если запускать этот плагин в watch режиме
// Надо либо по обработанным файлам собирать инфу о ссылках, либо сбрасывать массив при рестарте webpack'а
export class Plugin {
  apply(compiler: Compiler): void {
    compiler.hooks.emit.tapAsync(pluginName, (compilation, callback) => {
      const imgproxyUrls = JSON.stringify(imageUrls);
      // Добавляет файл в директорию со сборкой
      compilation.assets['imgproxyUrls.json'] = {
        source: function () {
          return imgproxyUrls;
        },
        size: function () {
          return imgproxyUrls.length;
        },
      };

      callback();
    });
  }
}
