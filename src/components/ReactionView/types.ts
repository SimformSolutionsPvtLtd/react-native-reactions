import type {
  StyleProp,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

export interface ReactionViewProps {
  children: JSX.Element;
  items?: EmojiItemProp[];
  onTap?: (e: EmojiItemProp | undefined) => void;
  cardStyle?: StyleProp<ViewStyle>;
  emojiStyle?: StyleProp<TextStyle>;
  touchableProps?: TouchableOpacityProps;
  emojiKey?: string;
  iconSize?: number;
}

export interface EmojiItemProp {
  // emojiData object is indexed with a Key it will return a value of any type.
  [key: string]: any;
  id: number;
  emoji: React.ReactNode | string | number;
  title: string;
}
