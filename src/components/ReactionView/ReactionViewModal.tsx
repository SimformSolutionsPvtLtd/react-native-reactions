import React, { useRef } from 'react';
import { TouchableOpacity } from 'react-native';
import { reactionModalRef } from '../ReactionModal';
import { useReaction } from './hooks';
import type { ReactionViewProps } from './types';

const ReactionViewModal = ({ touchableProps, ...props }: ReactionViewProps) => {
  const {
    children,
    onPress = () => {},
    disabled = false,
    onLongPress = () => {},
  } = props;
  const rootRef = useRef<TouchableOpacity>(null);
  const contentHeightRef = useRef<number>(0);
  const contentyRef = useRef<number>(0);
  const { emojiSize, isLongPress, isSinglePress } = useReaction(props);

  const onPressHandler = () => {
    rootRef?.current &&
      rootRef?.current.measureInWindow(
        (x: number, y: number, width: number) => {
          reactionModalRef.current &&
            reactionModalRef.current?.show({
              x,
              y,
              width,
              contentHeight: contentHeightRef.current,
              emojiSize,
              ...props,
            });
          contentyRef.current = y;
        }
      );
  };

  return (
    <TouchableOpacity
      hitSlop={{ top: 20, left: 20, right: 20, bottom: 20 }}
      ref={rootRef}
      disabled={
        disabled ||
        children?.props?.hasOwnProperty('onPress') ||
        children?.props?.hasOwnProperty('onLongPress')
      }
      {...touchableProps}
      onLayout={event => {
        const { height } = event.nativeEvent.layout;
        contentHeightRef.current = height;
      }}
      activeOpacity={1}
      onLongPress={() => (
        isLongPress ? onPressHandler() : !isSinglePress && onPress(),
        onLongPress()
      )}
      onPress={() => (
        isSinglePress ? onPressHandler() : !isLongPress && onLongPress(),
        onPress()
      )}>
      {React.isValidElement(children) &&
        React.cloneElement(children as React.ReactElement, {
          onLongPress: () => (
            isLongPress ? onPressHandler() : !isSinglePress && onPress(),
            onLongPress()
          ),
          onPress: () => (
            isSinglePress ? onPressHandler() : !isLongPress && onLongPress(),
            onPress()
          ),
          disabled: disabled,
          activeOpacity: 1,
        })}
    </TouchableOpacity>
  );
};

export default ReactionViewModal;
