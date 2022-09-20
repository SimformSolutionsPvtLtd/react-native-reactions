import { useRef, useState } from 'react';
import type { LayoutChangeEvent, View } from 'react-native';
import type { EmojiItemProps } from '../types';

const useEmojiItem = (props: EmojiItemProps) => {
  const { currentPosition = 0 } = props;

  const [xValue, setXValue] = useState<number>(0);
  const [titlePosition, setTitlePosition] = useState<number>(0);

  const childref = useRef<View | null>(null);

  const onLayout = (e: LayoutChangeEvent) => {
    childref?.current &&
      childref?.current.measureInWindow((x: number) => {
        setXValue(x);
      });

    const value = Math.floor(e.nativeEvent.layout.x);
    setTitlePosition(e.nativeEvent.layout.x);
    setXValue(value);
  };

  const scaled: boolean =
    currentPosition > xValue && currentPosition < xValue + 20;
  return { onLayout, titlePosition, xValue, scaled, childref };
};

export default useEmojiItem;
