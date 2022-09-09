import React from 'react';
import { Image, StyleSheet } from 'react-native';
import styles from './styles';
import type { EmojiImageType } from './types';

const EmojiImage = ({ emojiElementStyle, ...rest }: EmojiImageType) => {
  const imageStyle = StyleSheet.flatten([styles.img, emojiElementStyle]);
  return <Image style={imageStyle} {...rest} />;
};

export default EmojiImage;
