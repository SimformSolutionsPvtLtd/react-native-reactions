import type {
  StyleProp,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import type { emojiProps } from '../EmojiItem/types';

export interface ReactionViewProps extends emojiProps {
  type?: 'default' | 'modal';
  children: JSX.Element;
  items?: EmojiItemProp[];
  onTap?: (e: EmojiItemProp | undefined) => void;
  cardStyle?: StyleProp<ViewStyle>;
  emojiStyle?: StyleProp<TextStyle>;
  touchableProps?: TouchableOpacityProps;
  emojiKey?: string;
  itemIndex?: number;
  onShowDismissCard?: (onShowDismissCardType?: boolean) => void;
  isShowCardInCenter?: boolean;
  variant?: 'default' | 'onPress' | 'onLongPress';
  onPress?: () => void;
  disabled?: boolean;
  onLongPress?: () => void;
}

export interface EmojiItemProp {
  // emojiData object is indexed with a Key it will return a value of any type.
  [key: string]: any;
  id: number;
  emoji: React.ReactNode | string | number;
  title: string;
}
