"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImgproxyUrlBuilder = void 0;
const imgproxy_1 = __importDefault(require("imgproxy"));
exports.getImgproxyUrlBuilder = ({ imagesHost, host, key, salt }) => {
    const imgproxy = new imgproxy_1.default({
        baseUrl: host,
        key,
        salt,
        encode: false,
    });
    const buildImgproxyUrl = (imgPath, dpr, extension) => {
        return imgproxy
            .builder()
            .dpr(dpr)
            .generateUrl(imagesHost + imgPath, extension);
    };
    return (imagePath, extension) => ({
        '1x': buildImgproxyUrl(imagePath, 0.333, extension),
        '2x': buildImgproxyUrl(imagePath, 0.666, extension),
        // 0 здесь означает, что не будет никакого изменения размеров картинки
        '3x': buildImgproxyUrl(imagePath, 0, extension),
    });
};
