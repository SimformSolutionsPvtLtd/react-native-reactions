import type { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';
import type { EmojiItemProp } from '../ReactionView/types';

export interface EmojiItemProps extends emojiProps {
  data: EmojiItemProp;
  onPress: () => void;
  currentPosition: number;
  showTopEmojiCard?: boolean;
  emojiStyle?: StyleProp<TextStyle>;
  emojiKey?: string;
}

export interface emojiData extends emojiProps {
  emojiData: EmojiItemProp;
  emojiStyle: StyleProp<TextStyle>;
  emojiKey?: string;
}

type imageProps = Omit<ImageStyle, 'width' | 'height'>;

type textProps = Omit<TextStyle, 'fontSize'>;

export interface emojiProps {
  iconSize?: number;
  titleStyle?: StyleProp<TextStyle>;
  titleBoxStyle?: StyleProp<ViewStyle>;
  emojiImageStyle?: StyleProp<imageProps>;
  emojiTextStyle?: StyleProp<textProps>;
  emojiContainerStyle?: StyleProp<ViewStyle>;
}
