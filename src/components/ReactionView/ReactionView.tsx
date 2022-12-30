import React, { useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
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
  } = props;
  const [showPopUpCard, setShowPopUpCard] = useState(false);
  const [viewHeight, setViewHeight] = useState<number>(0);
  const [touchRelease, setTouchRelease] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
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

  const onStartShouldSetResponder = () => {
    setShowPopUpCard(false);
    return true;
  };
  const isCardOpen: boolean = mainViewX > 0 && showPopUpCard === true;

  return (
    <SafeAreaView
      ref={rootRef}
      style={[{ zIndex: hoverIndex, elevation: hoverIndex }]}>
      {isCardOpen && (
        <View style={subContainer}>
          <EmojiView
            onStartShouldSetResponder={onStartShouldSetResponder}
            {...{
              x: mainViewX,
              y: mainViewY,
              isModal: false,
              setShowPopUpCard,
              showPopUpCard,
              emojiSize,
              position,
              directTouchRelease: touchRelease,
              directTouchLoad: loaded,
              ...props,
            }}
          />
        </View>
      )}
      <TouchableOpacity
        activeOpacity={1}
        disabled={
          disabled ||
          children?.props?.hasOwnProperty('onPress') ||
          children?.props?.hasOwnProperty('onLongPress')
        }
        {...touchableProps}
        onLayout={event => {
          const { height } = event.nativeEvent.layout;
          setViewHeight(height);
        }}
        onLongPress={() => (
          isLongPress ? onPressHandler() : !isSinglePress && onPress(),
          onLongPress()
        )}
        onPress={() => (
          isSinglePress ? onPressHandler() : !isLongPress && onLongPress(),
          onPress()
        )}
        {...panResponder.panHandlers}>
        <View
          onTouchStart={() => {
            setLoaded(true);
            setTouchRelease(false);
          }}
          onTouchEnd={() => {
            setLoaded(false);
            setTouchRelease(true);
          }}>
          {React.isValidElement(children) &&
            React.cloneElement(children as React.ReactElement, {
              onLongPress: () => (
                isLongPress ? onPressHandler() : !isSinglePress && onPress(),
                onLongPress()
              ),
              onPress: () => (
                isSinglePress
                  ? onPressHandler()
                  : !isLongPress && onLongPress(),
                onPress()
              ),
              disabled: disabled,
              activeOpacity: 1,
              ...panResponder.panHandlers,
            })}
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ReactionView;
