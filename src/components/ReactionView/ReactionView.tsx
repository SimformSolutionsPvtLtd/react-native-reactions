import React, { useRef, useState } from 'react';
import {
  Animated,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import EmojiItem from '../EmojiItem';
import styles from './styles';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { useReaction } from './hooks';
import type { EmojiItemProp, ReactionViewProps } from './types';

const ReactionsView = (props: ReactionViewProps) => {
  const {
    children,
    items,
    cardStyle,
    onTap = () => {},
    touchableProps,
    itemIndex = 0,
  } = props;
  const [showPopUpCard, setShowPopUpCard] = useState(false);
  const [viewHeight, setViewHeight] = useState<number>(0);
  const rootRef = useRef<SafeAreaView>(null);

  const {
    onGesture,
    currentEmoji,
    setCurrentEmoji,
    emojiSize,
    showTopEmojiCard,
    setMainViewY,
    setMainViewX,
    mainViewX,
    showCardPosition,
    setMainViewWidth,
  } = useReaction(props);

  const gestureEnded = () => {
    if (currentEmoji) {
      onTap(items?.[currentEmoji]);
    }
    // When gesture ended
    setMainViewY(0);
    setShowPopUpCard(false);
  };

  const emojiPressHandler = (index: number, item: EmojiItemProp) => {
    onTap(item);
    setCurrentEmoji(index);
    setShowPopUpCard(false);
  };

  const selectScaledEmoji = (index: number, item: EmojiItemProp) => {
    onTap(item);
    setCurrentEmoji(index);
  };

  const onPressHandler = () => {
    rootRef?.current &&
      rootRef?.current.measureInWindow(
        (x: number, y: number, width: number) => {
          setMainViewX(x);
          setMainViewY(y);
          setMainViewWidth(width);
        }
      );
    setCurrentEmoji(0);
    setShowPopUpCard(!showPopUpCard);
  };

  const emojiBox = StyleSheet.flatten([styles.emojiBox, cardStyle]);
  const subContainer = StyleSheet.flatten([
    [
      styles.subContainer,
      showTopEmojiCard ? { top: viewHeight } : { bottom: viewHeight },
      {
        transform: [{ translateX: showCardPosition }],
      },
    ],
  ]);
  const hoverIndex: number = showTopEmojiCard ? -itemIndex : 1;

  return (
    <SafeAreaView
      ref={rootRef}
      style={[{ zIndex: hoverIndex, elevation: hoverIndex }]}>
      <PanGestureHandler onGestureEvent={onGesture} onEnded={gestureEnded}>
        <Animated.View>
          {mainViewX > 0 && showPopUpCard && (
            <View style={subContainer}>
              <View style={emojiBox}>
                {items?.map((item, index) => (
                  <EmojiItem
                    onPress={() => emojiPressHandler(index, item)}
                    key={item?.title}
                    data={item}
                    currentPosition={currentEmoji}
                    iconSize={emojiSize}
                    showTopEmojiCard={showTopEmojiCard}
                    getSelectedEmoji={e => selectScaledEmoji(index, e)}
                    {...props}
                  />
                ))}
              </View>
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
        </Animated.View>
      </PanGestureHandler>
    </SafeAreaView>
  );
};

export default ReactionsView;
