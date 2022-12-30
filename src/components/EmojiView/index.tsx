import React, { useRef, useState } from 'react';
import { LayoutRectangle, StyleSheet, View } from 'react-native';
import EmojiItem from '../EmojiItem';
import { useEmojiView } from './hooks';
import { styles } from './styles';
import type { EmojiModalProps } from './types';
import Animated from 'react-native-reanimated';

const EmojiView = ({
  onStartShouldSetResponder,
  getEmojiViewCoordinates,
  ...props
}: EmojiModalProps) => {
  const {
    cardStyle,
    y = 0,
    items,
    directTouchRelease,
    directTouchLoad,
    panResponder,
  } = props;
  const [touchRelease, setTouchRelease] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const {
    currentEmoji,
    emojiSize,
    hitSlopHeigth,
    hitSlopWidth,
    subContainer,
    emojiPressHandler,
    container,
  } = useEmojiView(props);
  const measureRef = useRef<Animated.View>(null);

  const emojiBox = StyleSheet.flatten([styles.emojiBox, cardStyle]);

  return (
    <Animated.View
      style={[subContainer, container]}
      {...panResponder.panHandlers}
      onResponderRelease={() => setTouchRelease(true)}>
      <View
        onStartShouldSetResponder={onStartShouldSetResponder}
        hitSlop={{
          bottom: hitSlopHeigth,
          top: hitSlopHeigth,
          right: hitSlopWidth,
          left: hitSlopWidth,
        }}
      />
      <Animated.View
        style={emojiBox}
        ref={measureRef}
        onLayout={() => {
          measureRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
            const layoutRectangle: LayoutRectangle = {
              x: pageX,
              y: pageY,
              width,
              height,
            };
            getEmojiViewCoordinates && getEmojiViewCoordinates(layoutRectangle);
          });
        }}
        onTouchStart={() => setLoaded(true)}
        onTouchEnd={() => setLoaded(false)}>
        {items?.map((item, index: number) => (
          <EmojiItem
            isTouchRelease={directTouchRelease || touchRelease}
            index={index}
            onEmojiPress={() => emojiPressHandler(item)}
            key={item?.title}
            data={item}
            currentPosition={currentEmoji}
            iconSize={emojiSize}
            showTopEmojiCard={y > 150}
            loaded={directTouchLoad || loaded}
            {...{ setTouchRelease, ...props }}
          />
        ))}
      </Animated.View>
    </Animated.View>
  );
};

export default EmojiView;
