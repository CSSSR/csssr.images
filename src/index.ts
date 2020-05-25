import { Picture, PictureSmart } from './react/Picture';
import Plugin from './webpack/plugin';
import { getSrcSetString, getBreakpointMedia, getPictureData } from './utils/utils'
import loader from './webpack/loader';

module.exports.Picture = Picture
module.exports.PictureSmart = PictureSmart

module.exports.Plugin = Plugin

module.exports.getSrcSetString = getSrcSetString
module.exports.getBreakpointMedia = getBreakpointMedia
module.exports.getPictureData = getPictureData

module.exports = loader
