import React, { useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import EmojiView from '../EmojiView';
import { useReaction } from './hooks';
import styles from './styles';
import type { ReactionViewProps } from './types';

const ReactionsView = (props: ReactionViewProps) => {
  const { children, touchableProps, itemIndex = 0 } = props;
  const [showPopUpCard, setShowPopUpCard] = useState(false);
  const [viewHeight, setViewHeight] = useState<number>(0);
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
  } = useReaction(props);

  const onPressHandler = () => {
    rootRef?.current &&
      rootRef?.current.measureInWindow(
        (x: number, y: number, width: number) => {
          setMainViewX(x);
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
      {
        transform: [{ translateX: showCardPosition }],
      },
    ],
  ]);
  const hoverIndex: number = showTopEmojiCard ? -itemIndex : 1;

  const onStartShouldSetResponder = () => {
    setShowPopUpCard(false);
    return true;
  };

  return (
    <SafeAreaView
      ref={rootRef}
      style={[{ zIndex: hoverIndex, elevation: hoverIndex }]}>
      {mainViewX > 0 && (
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
              ...props,
            }}
          />
        </View>
      )}
      <TouchableOpacity
        disabled={
          children?.props?.hasOwnProperty('onPress') ||
          children?.props?.hasOwnProperty('onLongPress')
        }
        {...touchableProps}
        onLayout={event => {
          const { height } = event.nativeEvent.layout;
          setViewHeight(height);
        }}
        onLongPress={onPressHandler}
        onPress={onPressHandler}>
        {React.isValidElement(children) &&
          React.cloneElement(children as React.ReactElement, {
            onLongPress: onPressHandler,
            onPress: onPressHandler,
          })}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ReactionsView;
