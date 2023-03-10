import React, { useEffect, useRef, useState } from 'react';
import {
  LayoutRectangle,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import EmojiView from '../EmojiView';
import { useReaction } from './hooks';
import styles from './styles';
import type { ReactionViewProps } from './types';

const ReactionView = (props: ReactionViewProps) => {
  const {
    children,
    touchableProps,
    itemIndex = 0,
    onPress = () => {},
    disabled = false,
    onLongPress = () => {},
    onShowDismissCard,
  } = props;
  const [showPopUpCard, setShowPopUpCard] = useState(false);
  const [viewHeight, setViewHeight] = useState<number>(0);
  const [touchRelease, setTouchRelease] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [emojiViewCoordinates, setEmojiViewCoordinates] =
    useState<LayoutRectangle>({
      width: 0,
      height: 0,
      x: 0,
      y: 0,
    });
  const rootRef = useRef<SafeAreaView>(null);
  const {
    setCurrentEmoji,
    showTopEmojiCard,
    setMainViewY,
    setMainViewX,
    mainViewX,
    showCardPosition,
    setMainViewWidth,
    mainViewY,
    emojiSize,
    isLongPress,
    isSinglePress,
    width: screenWidth,
    showCardInCenter,
    panResponder,
    position,
    mainViewWidth,
  } = useReaction(props);

  const onPressHandler = () => {
    rootRef?.current &&
      rootRef?.current.measureInWindow(
        (x: number, y: number, width: number) => {
          setMainViewX(prev => (prev === 0 ? x : prev));
          setMainViewY(y);
          setMainViewWidth(width);
          setCurrentEmoji(0);
          setShowPopUpCard(!showPopUpCard);
        }
      );
  };

  const subContainer = StyleSheet.flatten([
    [
      styles.subContainer,
      showTopEmojiCard ? { top: viewHeight } : { bottom: viewHeight - 10 },
      showCardPosition > 0
        ? { left: showCardInCenter ? -(screenWidth / 2) : 0 }
        : { right: mainViewX + showCardPosition },
    ],
  ]);
  const hoverIndex: number = showTopEmojiCard ? -itemIndex : 1;
  const checkTouchRelease =
    position &&
    position > emojiViewCoordinates.x + mainViewWidth &&
    position <= emojiViewCoordinates.width + emojiViewCoordinates.x;
  const onStartShouldSetResponder = () => {
    setShowPopUpCard(!showPopUpCard);
    return true;
  };
  const isCardOpen: boolean = mainViewX > 0 && showPopUpCard === true;

  useEffect(() => {
    onShowDismissCard && onShowDismissCard(showPopUpCard);
  }, [onShowDismissCard, showPopUpCard]);

  const child = React.Children.only(children);

  const renderChildren = () => {
    return children?.type?.displayName === 'View' ? (
      <TouchableOpacity
        activeOpacity={1}
        onLongPress={() => (
          isLongPress ? onPressHandler() : !isSinglePress && onPress(),
          onLongPress()
        )}
        onPress={() => (
          isLongPress ? onPressHandler() : !isSinglePress && onPress(),
          onLongPress()
        )}>
        {child.props.children}
      </TouchableOpacity>
    ) : (
      React.cloneElement(children as React.ReactElement, {
        onLongPress: () => (
          isLongPress ? onPressHandler() : !isSinglePress && onPress(),
          onLongPress()
        ),
        onPress: () => (
          isLongPress ? onPressHandler() : !isSinglePress && onPress(),
          onLongPress()
        ),
      })
    );
  };

  return (
    <SafeAreaView
      ref={rootRef}
      style={[{ zIndex: hoverIndex, elevation: hoverIndex }]}>
      {isCardOpen && (
        <View style={subContainer}>
          <EmojiView
            onStartShouldSetResponder={onStartShouldSetResponder}
            getEmojiViewCoordinates={coordinates => {
              setEmojiViewCoordinates(coordinates);
            }}
            {...{
              x: mainViewX,
              y: mainViewY,
              isModal: false,
              setShowPopUpCard,
              showPopUpCard,
              emojiSize,
              position,
              panResponder,
              directTouchRelease: touchRelease,
              directTouchLoad: loaded,
              ...props,
            }}
          />
        </View>
      )}
      <TouchableOpacity
        activeOpacity={1}
        disabled={
          disabled ||
          children?.props?.hasOwnProperty('onPress') ||
          children?.props?.hasOwnProperty('onLongPress')
        }
        {...touchableProps}
        onLayout={event => {
          const { height } = event.nativeEvent.layout;
          setViewHeight(height);
        }}
        onLongPress={() => (
          isLongPress ? onPressHandler() : !isSinglePress && onPress(),
          onLongPress()
        )}
        onPress={() => (
          isSinglePress ? onPressHandler() : !isLongPress && onLongPress(),
          onPress()
        )}
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
              onLongPress={() => (
                isLongPress ? onPressHandler() : !isSinglePress && onPress(),
                onLongPress()
              )}
              onPress={() => (
                isSinglePress
                  ? onPressHandler()
                  : !isLongPress && onLongPress(),
                onPress()
              )}
              disabled={disabled}
              {...panResponder.panHandlers}>
              {renderChildren()}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ReactionView;
