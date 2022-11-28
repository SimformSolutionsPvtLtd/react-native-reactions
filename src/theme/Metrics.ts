import { Dimensions } from 'react-native';

export const { width: windowWidth, height: windowHeight } =
  Dimensions.get('window');
const isLessWidth = windowWidth < windowHeight;
const shortDimension = isLessWidth ? windowWidth : windowHeight;
const longDimension = isLessWidth ? windowHeight : windowWidth;

const getNewSize = (size: number): number => {
  const aspectRatio = windowHeight / windowWidth;
  let newSize = 0;
  if (aspectRatio > 1.77) {
    newSize = size;
  } else if (aspectRatio > 1.6) {
    newSize = size * 0.97;
  } else if (aspectRatio > 1.55) {
    newSize = size * 0.95;
  } else if (aspectRatio > 1.5) {
    newSize = size * 0.93;
  } else if (aspectRatio > 1.45) {
    newSize = size * 0.91;
  } else if (aspectRatio > 1.4) {
    newSize = size * 0.89;
  } else if (aspectRatio > 1.35) {
    newSize = size * 0.87;
  } else if (aspectRatio > 1.329) {
    return size;
  } else if (aspectRatio > 1.3) {
    newSize = size * 0.85;
  } else if (aspectRatio > 1.2) {
    newSize = size * 0.84;
  } else if (aspectRatio > 1.185) {
    return size * 0.95;
  } else if (aspectRatio > 1.15) {
    return size * 0.82;
  } else {
    newSize = size * 0.6;
  }
  return newSize;
};

// Default guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth: number = 375;
const guidelineBaseHeight: number = 812;

// Use for horizontal scaling
export const scale = (
  size: number,
  skipAspectRatio: boolean = false
): number => {
  const changeSize = skipAspectRatio ? size : getNewSize(size);
  return (shortDimension / guidelineBaseWidth) * changeSize;
};

// Use for vertical scaling
export const verticalScale = (
  size: number,
  skipAspectRatio: boolean = false
): number => {
  const changeSize = skipAspectRatio ? size : getNewSize(size);
  return (longDimension / guidelineBaseHeight) * changeSize;
};

// Use for horizontal & vertical scaling (example: Fonts)
export const moderateScale = (
  size: number,
  skipAspectRatio: boolean = false,
  factor: number = 0.5
): number => {
  const changeSize = skipAspectRatio ? size : getNewSize(size);
  return (
    changeSize + (scale(changeSize, skipAspectRatio) - changeSize) * factor
  );
};
