import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import type { EmojiItemProp } from '../ReactionView/types';

export interface EmojiItemProps extends emojiProps {
  data: EmojiItemProp;
  onEmojiPress: () => void;
  currentPosition: number;
  showTopEmojiCard?: boolean;
  emojiKey?: string;
  isModal?: boolean;
  isTouchRelease?: boolean;
  setShowPopUpCard?: (e: boolean) => void;
  onTap?: (e: EmojiItemProp | undefined) => void;
  loaded?: boolean;
  index: number;
  showPopUpCard?: boolean;
  onEmojiCloseModal?: () => void;
  setTouchRelease?: (e: boolean) => void;
  emojiSize?: number;
}

export interface emojiData extends emojiProps {
  emojiData: EmojiItemProp;
  emojiKey?: string;
  emojiSize?: number;
}
export interface emojiProps {
  iconSize?: number;
  titleStyle?: StyleProp<TextStyle>;
  titleBoxStyle?: StyleProp<ViewStyle>;
  emojiContainerStyle?: StyleProp<ViewStyle>;
  emojiDuration?: number;
  scaleDuration?: number;
  emojiStyle?: StyleProp<TextStyle>;
}
