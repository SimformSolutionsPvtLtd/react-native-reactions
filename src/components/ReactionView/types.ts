import type {
  LayoutRectangle,
  PressableProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import type { emojiProps } from '../EmojiItem/types';
import type { EmojiAnimationProps } from '../EmojiView/types';

export interface ReactionViewProps extends emojiProps, EmojiAnimationProps {
  type?: 'default' | 'modal';
  children: JSX.Element;
  items?: EmojiItemProp[];
  onTap?: (e: EmojiItemProp | undefined) => void;
  cardStyle?: StyleProp<ViewStyle>;
  touchableProps?: PressableProps;
  itemIndex?: number;
  onShowDismissCard?: (onShowDismissCardType?: boolean) => void;
  isShowCardInCenter?: boolean;
  showPopupType?: 'default' | 'onPress';
  onPress?: () => void;
  disabled?: boolean;
  onLongPress?: () => void;
  panResponder?: any;
}

export interface EmojiItemProp {
  // emojiData object is indexed with a Key it will return a value of any type.
  [key: string]: any;
  id: number;
  emoji: React.ReactNode | string | number;
  title: string;
}

export interface GetCoordinateRef {
  sendCoordinates: (coordinates: LayoutRectangle) => void;
}
