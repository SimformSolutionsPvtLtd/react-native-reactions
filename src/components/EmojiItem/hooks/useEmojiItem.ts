import { useState } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import type { EmojiItemProps } from '../types';

const useEmojiItem = (props: EmojiItemProps) => {
  const { currentPosition = 0 } = props;

  const [xValue, setXValue] = useState<number>(0);
  const [titlePosition, setTitlePosition] = useState<number>(0);

  const onLayout = (e: LayoutChangeEvent) => {
    const value = Math.floor(e.nativeEvent.layout.x);
    setTitlePosition(e.nativeEvent.layout.x);
    setXValue(value);
  };

  const scaled: boolean =
    currentPosition > xValue && currentPosition < xValue + 20;
  return { onLayout, titlePosition, xValue, scaled };
};

export default useEmojiItem;
