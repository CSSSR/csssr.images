"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Picture = exports.PictureInternal = void 0;
const react_1 = __importDefault(require("react"));
exports.PictureInternal = ({ pictureData, alt }) => {
    return (react_1.default.createElement("picture", null,
        pictureData.sources.map(({ breakpointName, breakpointMedia, extension, srcSet }) => {
            return (react_1.default.createElement("source", { key: `${breakpointName}_${extension}`, media: breakpointMedia, type: `image/${extension}`, srcSet: srcSet }));
        }),
        react_1.default.createElement("img", { srcSet: pictureData.fallbackSrcSet, src: pictureData.fallbackSrc, alt: alt })));
};
const getPictureData = (requireFn) => {
    const allSources = requireFn.keys().map(requireFn);
    // Сортировка sources в порядке списка breakpoints
    allSources.sort((a, b) => a.order - b.order);
    const lastSource = allSources[allSources.length - 1];
    return {
        sources: allSources.map((source) => source.data).flat(),
        fallbackSrcSet: lastSource.data[lastSource.data.length - 1].srcSet,
        fallbackSrc: lastSource.fallbackSrc,
    };
};
exports.Picture = (props) => {
    const { requireImages } = props, rest = __rest(props, ["requireImages"]);
    const pictureData = getPictureData(requireImages);
    return react_1.default.createElement(exports.PictureInternal, Object.assign({ pictureData: pictureData }, rest));
};
