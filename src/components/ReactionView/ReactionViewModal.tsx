import React, { useRef } from 'react';
import { TouchableOpacity } from 'react-native';
import { reactionModalRef } from '../ReactionModal';
import type { ReactionViewProps } from './types';

const ReactionViewModal = ({
  children,
  touchableProps,
  ...props
}: ReactionViewProps) => {
  const rootRef = useRef<TouchableOpacity>(null);
  const contentHeightRef = useRef<number>(0);
  const contentyRef = useRef<number>(0);

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
              ...props,
            });
          contentyRef.current = y;
        }
      );
  };

  return (
    <TouchableOpacity
      ref={rootRef}
      disabled={
        children?.props?.hasOwnProperty('onPress') ||
        children?.props?.hasOwnProperty('onLongPress')
      }
      {...touchableProps}
      onLayout={event => {
        const { height } = event.nativeEvent.layout;
        contentHeightRef.current = height;
      }}
      onLongPress={onPressHandler}
      onPress={onPressHandler}>
      {React.isValidElement(children) &&
        React.cloneElement(children as React.ReactElement, {
          onLongPress: onPressHandler,
          onPress: onPressHandler,
        })}
    </TouchableOpacity>
  );
};

export default ReactionViewModal;
