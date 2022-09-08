import type { EmojiItem } from '../ReactionView/types';

export interface EmojiItemProps {
  data: EmojiItem;
  scaled: boolean;
  onPress: () => void;
}

export interface emojiData {
  emojiData: EmojiItem;
}
