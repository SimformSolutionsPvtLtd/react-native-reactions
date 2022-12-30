import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import EmojiItem from '../EmojiItem';
import { useEmojiView } from './hooks';
import { styles } from './styles';
import type { EmojiModalProps } from './types';
import Animated from 'react-native-reanimated';

const EmojiView = ({
  onStartShouldSetResponder,
  ...props
}: EmojiModalProps) => {
  const {
    cardStyle,
    y = 0,
    items,
    directTouchRelease,
    directTouchLoad,
  } = props;
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
