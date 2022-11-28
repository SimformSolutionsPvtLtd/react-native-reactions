import type { GestureResponderEvent } from 'react-native';
import type { ModalProps } from '../ReactionModal/types';
import type { ReactionViewProps } from '../ReactionView';

// here don't require children in EmojiModalProps
type ReactionProps = Omit<ReactionViewProps, 'children'>;

export interface EmojiModalProps
  extends ReactionProps,
    ModalProps,
    EmojiAnimationProps {
  onStartShouldSetResponder?:
    | ((event: GestureResponderEvent) => boolean)
    | undefined;
  isModal?: boolean;
  setShowPopUpCard?: (showPopUpCardType: boolean) => void;
  showPopUpCard?: boolean;
  onEmojiCloseModal?: () => void;
  onShowDismissCard?: (onShowDismissCardType?: boolean) => void;
  isShowCardInCenter?: boolean;
}

export interface EmojiAnimationProps {
  opacityRange?: number[];
  cardDuration?: number;
}
