import { useEffect, useRef, useState } from 'react';
import {
  GestureResponderEvent,
  PanResponder,
  useWindowDimensions,
} from 'react-native';
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
  const [position, setPosition] = useState<number>();

  const mainViewWidthX = width - (mainViewX + mainViewWidth);

  const showCardInCenter: boolean =
    mainViewWidthX > width / 4 && mainViewWidthX < width / 2;

  const showCardPosition = showCardInCenter
    ? width / 8
    : mainViewWidthX < 100
    ? -(width - mainViewX)
    : mainViewX;

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

  const isSinglePress = showPopupType === GlobalConstants.onPress;

  const isLongPress = showPopupType === GlobalConstants.default;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {},
      onPanResponderMove: event => onGesture(event),
      onPanResponderRelease: () => {
        setPosition(0);
      },
    })
  ).current;

  const onGesture = async (event: GestureResponderEvent) => {
    if (event.nativeEvent?.pageX <= 367) {
      const currentItem = Math.floor(event.nativeEvent?.pageX);
      setPosition(currentItem ?? 0);
    } else {
      setPosition(0);
    }
  };
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
    width,
    showCardInCenter,
    position,
    setPosition,
    panResponder,
  };
};

export default useReaction;
