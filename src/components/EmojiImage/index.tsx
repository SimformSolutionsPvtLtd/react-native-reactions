import React from 'react';
import { Image } from 'react-native';
import styles from './styles';
import type { ImageProps } from './types';

const EmojiImage = ({ source }: ImageProps) => (
  <Image source={source} style={styles.img} />
);

export default EmojiImage;
