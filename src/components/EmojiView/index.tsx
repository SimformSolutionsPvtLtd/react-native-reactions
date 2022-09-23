import React, { useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import EmojiItem from '../EmojiItem';
import { useEmojiView } from './hooks';
import { styles } from './style';
import type { EmojiModalProps } from './types';

const EmojiView = ({
  onStartShouldSetResponder,
  ...props
}: EmojiModalProps) => {
  const { cardStyle, y = 0, items } = props;
  const [touchRelease, setTouchRelease] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const {
    currentEmoji,
    emojiSize,
    hitSlopHeigth,
    hitSlopWidth,
    panResponder,
    subContainer,
    emojiPressHandler,
    container,
  } = useEmojiView(props);

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
        onTouchStart={() => setLoaded(true)}
        onTouchEnd={() => setLoaded(false)}>
        {items?.map((item, index: number) => (
          <EmojiItem
            isTouchRelease={touchRelease}
            index={index}
            onPress={() => emojiPressHandler(item)}
            key={item?.title}
            data={item}
            currentPosition={currentEmoji}
            iconSize={emojiSize}
            showTopEmojiCard={y > 150}
            loaded={loaded}
            {...{ setTouchRelease, ...props }}
          />
        ))}
      </Animated.View>
    </Animated.View>
  );
};

export default EmojiView;
