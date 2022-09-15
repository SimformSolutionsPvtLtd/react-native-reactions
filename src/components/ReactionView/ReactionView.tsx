import React, { useState } from 'react';
import {
  Animated,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { useReaction } from './hooks';
import EmojiItem from '../EmojiItem';
import styles from './styles';
import type { EmojiItemProp, ReactionViewProps } from './types';

const ReactionsView = (props: ReactionViewProps) => {
  const {
    children,
    items,
    cardStyle,
    onTap = () => {},
    emojiStyle,
    touchableProps,
    emojiKey,
  } = props;
  const [showPopUpCard, setShowPopUpCard] = useState(false);
  const [viewHeight, setViewHeight] = useState<number>(0);

  const {
    onGesture,
    currentEmoji,
    setCurrentEmoji,
    emojiSize,
    showTopEmojiCard,
    setMainViewY,
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

  const onPressHandler = () => {
    setCurrentEmoji(0);
    setShowPopUpCard(!showPopUpCard);
  };

  const container = StyleSheet.flatten([styles.container]);
  const emojiBox = StyleSheet.flatten([styles.emojiBox, cardStyle]);

  return (
    <SafeAreaView style={styles.main}>
      <PanGestureHandler onGestureEvent={onGesture} onEnded={gestureEnded}>
        <Animated.View style={styles.root}>
          <View style={container}>
            {showPopUpCard && (
              <View
                style={[
                  styles.subContainer,
                  showTopEmojiCard
                    ? { top: viewHeight + 10 }
                    : { top: viewHeight - 80 },
                ]}>
                <View style={emojiBox}>
                  {items?.map((item, index) => (
                    <EmojiItem
                      onPress={() => emojiPressHandler(index, item)}
                      key={item?.title}
                      data={item}
                      currentPosition={currentEmoji}
                      iconSize={emojiSize}
                      showTopEmojiCard={showTopEmojiCard}
                      {...{ emojiStyle, emojiKey, props }}
                    />
                  ))}
                </View>
              </View>
            )}
          </View>
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
