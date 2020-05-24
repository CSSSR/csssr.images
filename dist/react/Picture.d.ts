/// <reference types="webpack-env" />
import React from 'react';
import { ImageSource } from '../types';
import RequireContext = __WebpackModuleApi.RequireContext;
export declare type PictureCommonProps = {
    alt: string;
};
export declare type PictureData = {
    sources: ImageSource[];
    fallbackSrcSet: string;
    fallbackSrc: string;
};
export declare type PictureInternalProps = {
    pictureData: PictureData;
} & PictureCommonProps;
export declare const PictureInternal: React.FC<PictureInternalProps>;
export declare type PictureProps = {
    requireImages: RequireContext;
} & PictureCommonProps;
export declare const Picture: React.FC<PictureProps>;
