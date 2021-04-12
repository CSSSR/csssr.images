import { Compiler } from 'webpack';

// We store all the links to the images through imgproxy here,
// to go through them after building and make sure they are created
// and will not be generated when we build the site.
export const imageUrls: string[] = [];

const pluginName = 'CollectAllImageUrlsPlugin';

export class Plugin {
  apply(compiler: Compiler): void {
    compiler.hooks.emit.tapAsync(pluginName, (compilation, callback) => {
      const imgproxyUrls = JSON.stringify(imageUrls);
      // Adds a file to the directory with the assembly
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
