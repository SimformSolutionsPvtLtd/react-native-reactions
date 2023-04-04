import React, {
  createRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { LayoutRectangle, Text, TouchableOpacity, View } from 'react-native';
import { reactionModalRef } from '../ReactionModal';
import { useReaction } from './hooks';
import styles from './styles';
import type { ReactionViewProps, GetCoordinateRef } from './types';

export const getCoordinatesRef = createRef<GetCoordinateRef>();

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

  const child = React.Children.only(children);
  const checkTouchRelease =
    position &&
    position > emojiViewCoordinates.x &&
    position <= emojiViewCoordinates.width + emojiViewCoordinates.x;

  const renderChildren = () => {
    return children?.type?.displayName === 'View' ? (
      <TouchableOpacity
        activeOpacity={1}
        onLongPress={() => {
          isLongPress ? onPressHandler() : !isSinglePress && onPress();
          onLongPress();
        }}
        onPress={() => {
          isSinglePress ? onPressHandler() : !isLongPress && onPress();
          onPress();
        }}>
        {child.props.children}
      </TouchableOpacity>
    ) : (
      React.cloneElement(children as React.ReactElement, {
        onLongPress: () => {
          isLongPress ? onPressHandler() : !isSinglePress && onPress();
          onLongPress();
        },
        onPress: () => {
          isSinglePress ? onPressHandler() : !isLongPress && onPress();
          onPress();
        },
      })
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
      onLongPress={() => {
        isLongPress ? onPressHandler() : !isSinglePress && onPress();
        onLongPress();
      }}
      onPress={() => {
        isSinglePress ? onPressHandler() : !isLongPress && onLongPress();
        onPress();
      }}
      {...panResponder.panHandlers}>
      <View
        onTouchStart={() => {
          setLoaded(true);
          setTouchRelease(false);
        }}
        onTouchEnd={() => {
          setLoaded(false);
          checkTouchRelease && setTouchRelease(true);
        }}>
        {React.isValidElement(children) && (
          <Text
            style={styles.textWrapperStyle}
            onLongPress={() => {
              isLongPress ? onPressHandler() : !isSinglePress && onPress();
              onLongPress();
            }}
            onPress={() => {
              isSinglePress ? onPressHandler() : !isLongPress && onLongPress();
              onPress();
            }}
            disabled={disabled}
            {...panResponder.panHandlers}>
            {renderChildren()}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ReactionViewModal;
