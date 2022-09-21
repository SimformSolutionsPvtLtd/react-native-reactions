import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { moderateScale } from '../../theme';
import styles from './styles';
import type { EmojiImageType } from './types';

const EmojiImage = ({
  emojiElementStyle,
  iconSize = 0,
  ...rest
}: EmojiImageType) => {
  const imageStyle = StyleSheet.flatten([
    styles.img,
    emojiElementStyle,
    { width: moderateScale(iconSize), height: moderateScale(iconSize) },
  ]);
  return <Image style={imageStyle} {...rest} />;
};

export default EmojiImage;
