"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageUrls = void 0;
// Храним все ссылки на картинки через imgproxy здесь,
// чтобы после сборки пройтись по ним и убедиться, что они созданы
// и не будут генерироваться при работе с сайтом.
exports.imageUrls = [];
const pluginName = 'CollectAllImageUrlsPlugin';
class Plugin {
    apply(compiler) {
        compiler.hooks.done.tap(pluginName, function () {
            // TODO emit file here
            console.log(JSON.stringify(exports.imageUrls));
        });
    }
}
exports.default = Plugin;
