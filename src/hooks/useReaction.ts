import { useState } from 'react';
import type {
  GestureEvent,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import type { ReactionViewProps } from '../components/ReactionView/types';

const useReaction = (props: ReactionViewProps) => {
  const { items } = props;
  const [currentEmoji, setCurrentEmoji] = useState<number | undefined | null>();

  const onGesture = async (
    event: GestureEvent<PanGestureHandlerEventPayload>
  ) => {
    if (
      event.nativeEvent.absoluteY >= 310 &&
      event.nativeEvent.absoluteY <= 490 &&
      event.nativeEvent.absoluteX >= 16 &&
      event.nativeEvent.absoluteX <= 367
    ) {
      const currentItem = Math.floor(event.nativeEvent.x / 50);
      if (items && currentItem >= 0 && currentItem < items?.length) {
        setCurrentEmoji(currentItem);
      } else {
        setCurrentEmoji(null);
      }
    } else {
      setCurrentEmoji(null);
    }
  };

  return { onGesture, currentEmoji, setCurrentEmoji };
};

export default useReaction;
