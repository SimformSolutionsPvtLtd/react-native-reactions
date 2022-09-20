import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import EmojiItem from '../EmojiItem';
import { useReaction } from './hooks';
import styles from './styles';
import type { EmojiItemProp, ReactionViewProps } from './types';

const ReactionsView = (props: ReactionViewProps) => {
  const {
    children,
    items,
    cardStyle,
    onTap = () => {},
    touchableProps,
    itemIndex = 0,
    opacityRange,
    cardDuration = 400,
    emojiDuration = 800,
    scaleDuration = 200,
  } = props;
  const [showPopUpCard, setShowPopUpCard] = useState(false);
  const [viewHeight, setViewHeight] = useState<number>(0);
  const rootRef = useRef<SafeAreaView>(null);
  const cardAnim = useRef(new Animated.Value(0)).current;

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

  useEffect(() => {
    Animated.timing(cardAnim, {
      toValue: showPopUpCard ? 1 : 0,
      duration: cardDuration,
      useNativeDriver: true,
    }).start();
  }, [cardAnim, cardDuration, showPopUpCard]);

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
      { top: viewHeight },
      {
        transform: [{ translateX: showCardPosition }],
      },
    ],
  ]);
  const hoverIndex: number = showTopEmojiCard ? -itemIndex : 1;

  const outputrange = showTopEmojiCard
    ? [0, emojiSize - 10, emojiSize - 20]
    : [0, -emojiSize - 30, -emojiSize - 60];

  const container = {
    opacity: cardAnim.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: opacityRange ? opacityRange : [0, 0, 1],
    }),
    transform: [
      {
        translateY: cardAnim.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: outputrange,
        }),
      },
    ],
  };

  return (
    <SafeAreaView
      ref={rootRef}
      style={[{ zIndex: hoverIndex, elevation: hoverIndex }]}>
      <PanGestureHandler onGestureEvent={onGesture} onEnded={gestureEnded}>
        <View>
          <Animated.View style={container}>
            {mainViewX > 0 && (
              <Animated.View style={subContainer}>
                <Animated.View style={emojiBox}>
                  {items?.map((item, index) => (
                    <EmojiItem
                      onPress={() => emojiPressHandler(index, item)}
                      key={item?.title}
                      data={item}
                      currentPosition={currentEmoji}
                      iconSize={emojiSize}
                      showTopEmojiCard={showTopEmojiCard}
                      getSelectedEmoji={scaledEmoji =>
                        selectScaledEmoji(index, scaledEmoji)
                      }
                      {...{
                        index,
                        emojiDuration,
                        showPopUpCard,
                        scaleDuration,
                      }}
                      {...props}
                    />
                  ))}
                </Animated.View>
              </Animated.View>
            )}
          </Animated.View>
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
        </View>
      </PanGestureHandler>
    </SafeAreaView>
  );
};

export default ReactionsView;
