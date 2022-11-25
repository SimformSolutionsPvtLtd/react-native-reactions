import { useEffect, useRef, useState } from 'react';
import {
  PanResponder,
  StyleSheet,
  useWindowDimensions,
  GestureResponderEvent,
} from 'react-native';
import type { EmojiItemProp } from '../../ReactionView/types';
import { GlobalConstants } from '../../../constants';
import type { EmojiModalProps } from '../types';
import {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const useEmojiView = (props: EmojiModalProps) => {
  const {
    y = 0,
    x = 0,
    width: mainViewWidth = 0,
    isModal = true,
    onTap = () => {},
    setShowPopUpCard = () => {},
    showPopUpCard,
    cardDuration = 150,
    opacityRange = [0, 0, 1],
    onEmojiCloseModal = () => {},
    onShowDismissCard = () => {},
    isShowCardInCenter = false,
  } = props;

  const [currentEmoji, setCurrentEmoji] = useState<number>(0);
  const { iconSize = 25 } = props;
  const [emojiSize, setEmojiSize] = useState<number>(iconSize);
  const { width, height } = useWindowDimensions();
  const cardAnim = useSharedValue(0);

  // get child component position to how far is the end of x
  const mainViewWidthX = width - (x + mainViewWidth);

  // based on mainViewWidthX get center position to show card
  const showCardInCenter: boolean =
    mainViewWidthX > width / 4 && mainViewWidthX < width / 2;

  // set card position based on child component
  const showCardPosition = x < 100 ? x + 5 : width / (emojiSize / 8);

  useEffect(() => {
    onShowDismissCard(showPopUpCard);
  }, [onShowDismissCard, showPopUpCard]);

  useEffect(() => {
    return () => setCurrentEmoji(0);
  }, [showPopUpCard]);

  useEffect(() => {
    if (iconSize > GlobalConstants.max) {
      setEmojiSize(30);
    } else if (iconSize < GlobalConstants.min) {
      setEmojiSize(15);
    } else {
      setEmojiSize(iconSize);
    }
  }, [iconSize]);

  useEffect(() => {
    cardAnim.value = withTiming(showPopUpCard ? 1 : 0, {
      duration: cardDuration,
    });
  }, [cardAnim, cardDuration, showPopUpCard]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {},
      onPanResponderMove: event => onGesture(event),
      onPanResponderRelease: () => {},
    })
  ).current;

  const onGesture = async (event: GestureResponderEvent) => {
    if (event.nativeEvent?.pageX >= 16 && event.nativeEvent?.pageX <= 367) {
      const currentItem = Math.floor(event.nativeEvent?.pageX);
      if (currentItem) {
        setCurrentEmoji(currentItem);
      } else {
        setCurrentEmoji(0);
      }
    } else {
      setCurrentEmoji(0);
    }
  };

  const subContainer = StyleSheet.create([
    {
      alignItems:
        showCardInCenter || isShowCardInCenter ? 'center' : 'baseline',
    },
  ]);

  const emojiPressHandler = (item: EmojiItemProp) => {
    onTap && onTap(item);
    isModal ? onEmojiCloseModal() : setShowPopUpCard(false);
  };

  const outputRange =
    y > 150
      ? [0, emojiSize - 10, emojiSize - 20]
      : [emojiSize - 40, emojiSize - 30, emojiSize - 20];

  const outputRangeModal = y > 150 ? [0, y - 50, y - 70] : [0, y + 10, y + 30];

  const container = useAnimatedStyle(() => {
    return {
      opacity: interpolate(cardAnim.value, [0, 0.5, 1], opacityRange),
      transform: [
        {
          translateY: interpolate(
            cardAnim.value,
            [0, 0.5, 1],
            isModal ? outputRangeModal : outputRange
          ),
        },
        {
          translateX: isModal
            ? showCardInCenter || isShowCardInCenter
              ? 0
              : showCardPosition
            : showCardPosition,
        },
      ],
    };
  });

  const hitSlopHeigth = showPopUpCard ? height : 0;
  const hitSlopWidth = showPopUpCard ? width : 0;

  return {
    onGesture,
    currentEmoji,
    setCurrentEmoji,
    emojiSize,
    showCardPosition,
    height,
    showCardInCenter,
    width,
    panResponder,
    subContainer,
    emojiPressHandler,
    container,
    hitSlopHeigth,
    hitSlopWidth,
  };
};

export default useEmojiView;
