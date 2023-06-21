import React, {
  createRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { LayoutRectangle, View, Pressable } from 'react-native';
import { reactionModalRef } from '../ReactionModal';
import { useReaction } from './hooks';
import type { GetCoordinateRef, ReactionViewProps } from './types';

export const getCoordinatesRef = createRef<GetCoordinateRef>();

const ReactionViewModal = ({ touchableProps, ...props }: ReactionViewProps) => {
  const {
    children,
    onPress = () => {},
    disabled = false,
    onLongPress = () => {},
  } = props;
  const rootRef = useRef<View>(null);
  const contentHeightRef = useRef<number>(0);
  const contentyRef = useRef<number>(0);
  const [touchRelease, setTouchRelease] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [emojiViewCoordinates, setEmojiViewCoordinates] =
    useState<LayoutRectangle>({
      width: 0,
      height: 0,
      x: 0,
      y: 0,
    });
  const { emojiSize, isLongPress, isSinglePress, panResponder, position } =
    useReaction(props);

  useImperativeHandle(getCoordinatesRef, () => ({
    sendCoordinates: coordinates => {
      setEmojiViewCoordinates(coordinates);
    },
  }));

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
              directTouchRelease: touchRelease,
              directTouchLoad: loaded,
              position,
              panResponder,
              ...props,
            });
          contentyRef.current = y;
        }
      );
  };

  useEffect(() => {
    reactionModalRef.current &&
      reactionModalRef.current?.sendUpdatedValues({
        directTouchRelease: touchRelease,
        directTouchLoad: loaded,
        position,
        panResponder,
        ...props,
      });
  }, [loaded, panResponder, position, props, touchRelease]);

  const checkTouchRelease =
    position &&
    position > emojiViewCoordinates.x &&
    position <= emojiViewCoordinates.width + emojiViewCoordinates.x;

  return (
    <View
      ref={rootRef}
      onLayout={event => {
        const { height } = event.nativeEvent.layout;
        contentHeightRef.current = height;
      }}
      onTouchStart={() => {
        setLoaded(true);
        setTouchRelease(false);
      }}
      onTouchEnd={() => {
        setLoaded(false);
        checkTouchRelease && setTouchRelease(true);
      }}
      {...panResponder.panHandlers}>
      {React.isValidElement(children) && (
        <Pressable
          {...touchableProps}
          hitSlop={{ top: 20, left: 20, right: 20, bottom: 20 }}
          disabled={disabled}
          onLongPress={() => {
            isLongPress ? onPressHandler() : !isSinglePress && onPress();
            onLongPress();
          }}
          onPress={() => {
            isSinglePress ? onPressHandler() : !isLongPress && onPress();
            onPress();
          }}>
          {children}
        </Pressable>
      )}
    </View>
  );
};

export default ReactionViewModal;
