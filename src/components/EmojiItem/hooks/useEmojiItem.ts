import { useEffect, useRef, useState } from 'react';
import { Animated, LayoutChangeEvent, View } from 'react-native';
import type { EmojiItemProps } from '../types';

const useEmojiItem = (props: EmojiItemProps) => {
  const {
    currentPosition = 0,
    index,
    showPopUpCard,
    emojiDuration = 400,
    scaleDuration = 200,
  } = props;

  const scaleEmoji = useRef(new Animated.Value(0)).current;
  const waveAnim = useRef(new Animated.Value(0)).current;
  const [xValue, setXValue] = useState<number>(0);
  const [titlePosition, setTitlePosition] = useState<number>(0);
  const scaled: boolean =
    currentPosition > xValue && currentPosition < xValue + 30;

  useEffect(() => {
    Animated.timing(scaleEmoji, {
      toValue: scaled ? 2 : 1,
      duration: scaleDuration,
      useNativeDriver: true,
    }).start();
  }, [emojiDuration, scaleDuration, scaleEmoji, scaled]);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(index * 100),
        Animated.timing(waveAnim, {
          toValue: showPopUpCard ? 1 : 0,
          duration: emojiDuration,
          useNativeDriver: true,
        }),
      ]),
      {
        iterations: 1,
      }
    ).start();
  }, [waveAnim, index, showPopUpCard, emojiDuration]);

  const childref = useRef<View | null>(null);

  const onLayout = (e: LayoutChangeEvent) => {
    childref?.current &&
      childref?.current.measureInWindow((x: number) => {
        setXValue(x);
      });
    setTitlePosition(e.nativeEvent.layout.x - 4);
  };

  const reverseEnim = (scaleEmoji as any)._value === 2 ? [2, 1, 0] : [0, 1, 2];

  const emojiAnimatedScaled = {
    transform: [
      {
        translateY: scaleEmoji.interpolate({
          inputRange: [0, 1, 2],
          outputRange: scaled ? [1, -3, -5] : [1, 1, 1],
        }),
      },
      {
        scaleY: scaleEmoji.interpolate({
          inputRange: [0, 1, 2],
          outputRange: scaled ? [0, 1, 1.5] : reverseEnim,
        }),
      },
      {
        scaleX: scaleEmoji.interpolate({
          inputRange: [0, 1, 2],
          outputRange: scaled ? [0, 1, 1.5] : reverseEnim,
        }),
      },
    ],
  };

  const wavedEmoji = {
    opacity: waveAnim.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0.5, 1],
    }),
    transform: [
      {
        translateY: waveAnim.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: showPopUpCard ? [15, 10, 0] : [0, 10, -index * 4],
        }),
      },
      {
        scale: waveAnim.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: showPopUpCard ? [0.5, 0.5, 1] : [1, 1, 0.5],
        }),
      },
    ],
  };

  return {
    onLayout,
    titlePosition,
    xValue,
    scaled,
    childref,
    wavedEmoji,
    emojiAnimatedScaled,
  };
};

export default useEmojiItem;
