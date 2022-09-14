import type { StyleProp, TextStyle } from 'react-native';
import type { EmojiItemProp } from '../ReactionView/types';

export interface EmojiItemProps {
  data: EmojiItemProp;
  scaled: boolean;
  onPress: () => void;
  emojiStyle?: StyleProp<TextStyle>;
  emojiKey?: string;
}

export interface emojiData {
  emojiData: EmojiItemProp;
  emojiStyle: StyleProp<TextStyle>;
  emojiKey?: string;
}
