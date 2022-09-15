import { useEffect, useState } from 'react';
import type {
  GestureEvent,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import { GlobalConstants } from '../../../constants';
import type { ReactionViewProps } from '../types';

const useReaction = (props: ReactionViewProps) => {
  const [currentEmoji, setCurrentEmoji] = useState<number>(0);
  const { iconSize = 0 } = props;
  const [emojiSize, setEmojiSize] = useState<number>(iconSize);
  const [mainViewY, setMainViewY] = useState<number>(0);

  useEffect(() => {
    if (iconSize > GlobalConstants.max) {
      setEmojiSize(30);
    } else if (iconSize < GlobalConstants.min) {
      setEmojiSize(15);
    } else {
      setEmojiSize(iconSize);
    }
  }, [iconSize]);

  const onGesture = async (
    event: GestureEvent<PanGestureHandlerEventPayload>
  ) => {
    setMainViewY(c => c || event.nativeEvent.absoluteY);

    if (
      event.nativeEvent.absoluteY >= mainViewY - 80 &&
      event.nativeEvent.absoluteY <= mainViewY + 50 &&
      event.nativeEvent.absoluteX >= 16 &&
      event.nativeEvent.absoluteX <= 367
    ) {
      const currentItem = Math.floor(event.nativeEvent.x);
      if (currentItem) {
        setCurrentEmoji(currentItem);
      } else {
        setCurrentEmoji(0);
      }
    } else {
      setCurrentEmoji(0);
    }
  };

  const showTopEmojiCard: boolean = mainViewY < 150 ? true : false;

  return {
    onGesture,
    currentEmoji,
    setCurrentEmoji,
    emojiSize,
    mainViewY,
    setMainViewY,
    showTopEmojiCard,
  };
};

export default useReaction;
