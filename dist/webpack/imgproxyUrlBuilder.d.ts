import { SrcSet } from '../types';
declare type ImgproxyUrlBuilderConfig = {
    imagesHost: string;
    host: string;
    key: string;
    salt: string;
};
export declare const getImgproxyUrlBuilder: ({ imagesHost, host, key, salt }: ImgproxyUrlBuilderConfig) => (imagePath: string, extension: string) => SrcSet;
export {};
