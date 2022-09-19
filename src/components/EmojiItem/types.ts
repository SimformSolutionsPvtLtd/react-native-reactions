import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import type { EmojiItemProp } from '../ReactionView/types';

export interface EmojiItemProps extends emojiProps {
  data: EmojiItemProp;
  onPress: () => void;
  currentPosition: number;
  showTopEmojiCard?: boolean;
  emojiStyle?: StyleProp<TextStyle>;
  emojiKey?: string;
  getSelectedEmoji: (e: EmojiItemProp) => void;
}

export interface emojiData extends emojiProps {
  emojiData: EmojiItemProp;
  emojiStyle: StyleProp<TextStyle>;
  emojiKey?: string;
}
export interface emojiProps {
  iconSize?: number;
  titleStyle?: StyleProp<TextStyle>;
  titleBoxStyle?: StyleProp<ViewStyle>;
  emojiContainerStyle?: StyleProp<ViewStyle>;
}
