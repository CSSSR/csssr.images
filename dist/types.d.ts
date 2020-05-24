export declare type PixelRatio = '1x' | '2x' | '3x';
export declare type SrcSet = {
    [pixelRatio in PixelRatio]: string;
};
export declare type ImageSource = {
    breakpointName: string;
    breakpointMedia: string;
    extension: string;
    srcSet: string;
};
export declare type ImgproxyResponsiveLoaderResult = {
    order: number;
    data: ImageSource[];
    fallbackSrc: string;
};
export declare type Breakpoint = {
    name: string;
    minWidth?: number;
    maxWidth?: number;
};
