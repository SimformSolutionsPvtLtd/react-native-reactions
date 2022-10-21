import { useEffect, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { GlobalConstants } from '../../../constants';
import type { ReactionViewProps } from '../types';

const useReaction = (props: ReactionViewProps) => {
  const [currentEmoji, setCurrentEmoji] = useState<number>(0);
  const { iconSize = 25, showPopupType = 'default' } = props;
  const [emojiSize, setEmojiSize] = useState<number>(iconSize);
  const [mainViewY, setMainViewY] = useState<number>(0);
  const [mainViewX, setMainViewX] = useState<number>(0);
  const [mainViewWidth, setMainViewWidth] = useState<number>(0);
  const { width } = useWindowDimensions();

  const mainViewWidthX = width - (mainViewX + mainViewWidth);

  const showCardInCenter: boolean =
    mainViewWidthX > width / 4 && mainViewWidthX < width / 2;

  const showCardPosition = showCardInCenter
    ? width / 8
    : mainViewWidthX < 100
    ? -(width - mainViewX)
    : mainViewX + 100;

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
    showPopupType === GlobalConstants.onPress ||
    showPopupType === GlobalConstants.default;

  const isLongPress =
    showPopupType === GlobalConstants.onLongPress ||
    showPopupType === GlobalConstants.default;

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
