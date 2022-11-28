import type { ImageSourcePropType, ImageStyle, StyleProp } from 'react-native';
export type ImageProps = {
  source: ImageSourcePropType;
  emojiImageStyle?: StyleProp<ImageStyle>;
};
export interface EmojiImageType extends ImageProps {
  emojiElementStyle: StyleProp<ImageStyle>;
  emojiSize?: number;
}
