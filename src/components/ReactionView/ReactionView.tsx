import React, { useEffect, useRef, useState } from 'react';
import {
  LayoutRectangle,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import EmojiView from '../EmojiView';
import { useReaction } from './hooks';
import styles from './styles';
import type { ReactionViewProps } from './types';

const ReactionView = (props: ReactionViewProps) => {
  const {
    children,
    touchableProps,
    itemIndex = 0,
    onPress = () => {},
    disabled = false,
    onLongPress = () => {},
    onShowDismissCard,
  } = props;
  const [showPopUpCard, setShowPopUpCard] = useState(false);
  const [viewHeight, setViewHeight] = useState<number>(0);
  const [touchRelease, setTouchRelease] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [emojiViewCoordinates, setEmojiViewCoordinates] =
    useState<LayoutRectangle>({
      width: 0,
      height: 0,
      x: 0,
      y: 0,
    });
  const rootRef = useRef<SafeAreaView>(null);
  const {
    setCurrentEmoji,
    showTopEmojiCard,
    setMainViewY,
    setMainViewX,
    mainViewX,
    showCardPosition,
    setMainViewWidth,
    mainViewY,
    emojiSize,
    isLongPress,
    isSinglePress,
    width: screenWidth,
    showCardInCenter,
    panResponder,
    position,
  } = useReaction(props);

  const onPressHandler = () => {
    rootRef?.current &&
      rootRef?.current.measureInWindow(
        (x: number, y: number, width: number) => {
          setMainViewX(prev => (prev === 0 ? x : prev));
          setMainViewY(y);
          setMainViewWidth(width);
          setCurrentEmoji(0);
          setShowPopUpCard(!showPopUpCard);
        }
      );
  };

  const subContainer = StyleSheet.flatten([
    [
      styles.subContainer,
      showTopEmojiCard ? { top: viewHeight } : { bottom: viewHeight - 10 },
      showCardPosition > 0
        ? { left: showCardInCenter ? -(screenWidth / 2) : 0 }
        : { right: mainViewX + showCardPosition },
    ],
  ]);
  const hoverIndex: number = showTopEmojiCard ? -itemIndex : 1;
  const checkTouchRelease =
    position &&
    position > emojiViewCoordinates.x &&
    position <= emojiViewCoordinates.width + emojiViewCoordinates.x;
  const onStartShouldSetResponder = () => {
    setShowPopUpCard(!showPopUpCard);
    return true;
  };
  const isCardOpen: boolean = mainViewX > 0 && showPopUpCard === true;

  useEffect(() => {
    onShowDismissCard && onShowDismissCard(showPopUpCard);
  }, [onShowDismissCard, showPopUpCard]);

  return (
    <SafeAreaView
      ref={rootRef}
      style={[{ zIndex: hoverIndex, elevation: hoverIndex }]}>
      {isCardOpen && (
        <View style={subContainer}>
          <EmojiView
            onStartShouldSetResponder={onStartShouldSetResponder}
            getEmojiViewCoordinates={coordinates => {
              setEmojiViewCoordinates(coordinates);
            }}
            {...{
              x: mainViewX,
              y: mainViewY,
              isModal: false,
              setShowPopUpCard,
              showPopUpCard,
              emojiSize,
              position,
              panResponder,
              directTouchRelease: touchRelease,
              directTouchLoad: loaded,
              ...props,
            }}
          />
        </View>
      )}
      <View
        onLayout={event => {
          const { height } = event.nativeEvent.layout;
          setViewHeight(height);
        }}
        onTouchStart={() => {
          setLoaded(true);
          setTouchRelease(false);
        }}
        onTouchEnd={() => {
          setLoaded(false);
          checkTouchRelease && setTouchRelease(true);
        }}
        {...panResponder.panHandlers}>
        {React.isValidElement(children) && (
          <Pressable
            {...touchableProps}
            hitSlop={{ top: 20, left: 20, right: 20, bottom: 20 }}
            disabled={disabled}
            onLongPress={() => {
              isLongPress ? onPressHandler() : !isSinglePress && onPress();
              onLongPress();
            }}
            onPress={() => {
              isSinglePress ? onPressHandler() : !isLongPress && onPress();
              onPress();
            }}>
            {children}
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ReactionView;
