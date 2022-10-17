import { useEffect, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { GlobalConstants } from '../../../constants';
import type { ReactionViewProps } from '../types';

const useReaction = (props: ReactionViewProps) => {
  const [currentEmoji, setCurrentEmoji] = useState<number>(0);
  const { iconSize = 25, variant = 'default' } = props;
  const [emojiSize, setEmojiSize] = useState<number>(iconSize);
  const [mainViewY, setMainViewY] = useState<number>(0);
  const [mainViewX, setMainViewX] = useState<number>(0);
  const [mainViewWidth, setMainViewWidth] = useState<number>(0);
  const { width } = useWindowDimensions();

  const mainViewWidthX = mainViewX + mainViewWidth;

  const showCardPosition = width - mainViewWidthX < 100 ? -70 : 100;

  useEffect(() => {
    if (iconSize > GlobalConstants.max) {
      setEmojiSize(30);
    } else if (iconSize < GlobalConstants.min) {
      setEmojiSize(15);
    } else {
      setEmojiSize(iconSize);
    }
  }, [iconSize]);

  const showTopEmojiCard: boolean = mainViewY < 150 ? true : false;

  const isSinglePress =
    variant === GlobalConstants.onPress || variant === GlobalConstants.default;

  const isLongPress =
    variant === GlobalConstants.onLongPress ||
    variant === GlobalConstants.default;

  return {
    currentEmoji,
    setCurrentEmoji,
    emojiSize,
    mainViewY,
    setMainViewY,
    showTopEmojiCard,
    setMainViewX,
    mainViewX,
    showCardPosition,
    setMainViewWidth,
    isSinglePress,
    isLongPress,
  };
};

export default useReaction;
