import { useEffect, useRef, useState } from 'react';
import type { LayoutChangeEvent, TouchableOpacity } from 'react-native';
import {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import type { EmojiItemProps } from '../types';

const useEmojiItem = (props: EmojiItemProps) => {
  const {
    currentPosition = 0,
    index,
    showPopUpCard,
    emojiDuration = 200,
    scaleDuration = 100,
  } = props;

  const [xValue, setXValue] = useState<number>(0);
  const [titlePosition, setTitlePosition] = useState<number>(0);
  //boolean flag to identify whether the emoji is pressed or not
  const scaled: boolean =
    currentPosition > xValue && currentPosition < xValue + 20;
  const scaleEmoji = useSharedValue(0);
  const waveAnim = useSharedValue(0);

  useEffect(() => {
    waveAnim.value = withDelay(
      index * 40,
      withTiming(showPopUpCard ? 1 : 0, {
        duration: emojiDuration,
      })
    );
  }, [waveAnim, index, showPopUpCard, emojiDuration]);

  const childRef = useRef<TouchableOpacity | null>(null);

  const onLayout = (e: LayoutChangeEvent) => {
    setTimeout(() => {
      childRef?.current &&
        childRef?.current.measureInWindow((x: number) => {
          setXValue(x);
        });
    }, 200);
    setTitlePosition(e.nativeEvent.layout.x - 4);
  };

  const reverseEnim = (scaleEmoji as any).value === 2 ? [2, 1, 0] : [0, 1, 2];

  useEffect(() => {
    scaleEmoji.value = withTiming(scaled ? 2 : 1, {
      duration: scaleDuration,
    });
  }, [emojiDuration, scaleDuration, scaleEmoji, scaled]);

  const emojiAnimatedScaled = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scaleEmoji.value,
            [0, 1, 2],
            scaled ? [1, -3, -5] : [1, 1, 1]
          ),
        },
        {
          scaleY: interpolate(
            scaleEmoji.value,
            [0, 1, 2],
            scaled ? [0, 1, 1.5] : reverseEnim
          ),
        },
        {
          scaleX: interpolate(
            scaleEmoji.value,
            [0, 1, 2],
            scaled ? [0, 1, 1.5] : reverseEnim
          ),
        },
      ],
    };
  }, [emojiDuration, scaleDuration, scaleEmoji, scaled]);

  const wavedEmoji = useAnimatedStyle(() => {
    return {
      opacity: interpolate(waveAnim.value, [0, 0.5, 1], [0, 0.5, 1]),
      transform: [
        {
          translateY: interpolate(
            waveAnim.value,
            [0, 0.5, 1],
            showPopUpCard ? [15, 10, 0] : [0, 10, -index * 4]
          ),
        },
        {
          scale: interpolate(
            waveAnim.value,
            [0, 0.5, 1],
            showPopUpCard ? [0.5, 0.5, 1] : [1, 1, 0.5]
          ),
        },
      ],
    };
  });

  return {
    onLayout,
    titlePosition,
    xValue,
    scaled,
    childRef,
    wavedEmoji,
    emojiAnimatedScaled,
  };
};

export default useEmojiItem;
