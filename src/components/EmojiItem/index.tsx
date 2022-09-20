import React, { memo, useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text } from 'react-native';
import { moderateScale, verticalScale } from '../../theme';
import { isValidUrl } from '../../utils';
import EmojiImage from '../EmojiImage';
import type { EmojiItemProp } from '../ReactionView/types';
import { useEmojiItem } from './hooks';
import styles from './styles';
import type { emojiData, EmojiItemProps } from './types';

const EmojiButton = ({
  emojiData,
  emojiStyle,
  emojiKey = 'emoji',
  iconSize = 28,
}: emojiData) => {
  const emoji = emojiData?.[emojiKey];
  const isNumber: boolean = typeof emoji === 'number';
  const isValidEmement = React.isValidElement(emoji);
  const emojiElementStyle = StyleSheet.flatten([
    { fontSize: moderateScale(iconSize) },
    emojiStyle,
    emoji?.props?.style ?? {},
  ]);

  if (isValidEmement) {
    return React.cloneElement(emoji as React.ReactElement, {
      style: emojiElementStyle,
    });
  } else if (isValidUrl(emoji as string) || isNumber) {
    return (
      <EmojiImage
        {...{ emojiElementStyle, iconSize }}
        source={isNumber ? (emoji as number) : { uri: emoji as string }}
      />
    );
  } else {
    return <Text style={[styles.emojiText, emojiElementStyle]}>{emoji}</Text>;
  }
};

const EmojiItem = (props: EmojiItemProps) => {
  const {
    data,
    onPress,
    iconSize = 28,
    titleStyle,
    titleBoxStyle,
    emojiContainerStyle,
    showTopEmojiCard,
    emojiKey,
    emojiStyle,
    getSelectedEmoji,
    index,
    showPopUpCard,
    emojiDuration = 800,
    scaleDuration = 200,
    ...rest
  } = props;

  const { titlePosition, onLayout, scaled, childref } = useEmojiItem(props);
  const scaleEmoji = useRef(new Animated.Value(0)).current;
  const waveAnim = useRef(new Animated.Value(0)).current;

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

  const emojiAnimatedScaled = {
    transform: [
      {
        translateY: scaleEmoji.interpolate({
          inputRange: [0, 1, 2],
          outputRange: scaled ? [0, 0, -5] : [0, 0, 1],
        }),
      },
      {
        scaleY: scaleEmoji.interpolate({
          inputRange: [0, 1, 2],
          outputRange: scaled ? [0, 0, 1.5] : [1, 1, 1],
        }),
      },
      {
        scaleX: scaleEmoji.interpolate({
          inputRange: [0, 1, 2],
          outputRange: scaled ? [0, 0, 1.5] : [1, 1, 1],
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
          outputRange: showPopUpCard ? [100, -20, 0] : [0, 100, -index * 5],
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

  const labelStyle = StyleSheet.flatten([
    styles.titleBox,
    {
      transform: [
        {
          translateY: scaleEmoji.interpolate({
            inputRange: [0, 1, 4],
            outputRange: scaled ? [0, 0, 5] : [0, 0, 0],
          }),
        },
        {
          translateX: scaleEmoji.interpolate({
            inputRange: [0, 1, 4],
            outputRange: scaled ? [0, titlePosition, titlePosition] : [0, 0, 0],
          }),
        },
        { scale: scaled ? 1.5 : 1 },
      ],
    },
    {
      top: showTopEmojiCard ? verticalScale(90) : verticalScale(-iconSize - 30),
    },
    titleBoxStyle,
  ]);

  useEffect(() => {
    const getEmoji: EmojiItemProp | null = scaled ? data : null;

    return () => {
      getEmoji && getSelectedEmoji(getEmoji);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, scaled]);

  const emojiLableStyle = StyleSheet.flatten([styles.title, titleStyle]);
  const pressableStyle = StyleSheet.flatten([styles.root, emojiContainerStyle]);

  return (
    <>
      {scaled && data?.title && (
        <Animated.View style={labelStyle}>
          <Text style={emojiLableStyle}>{data?.title}</Text>
        </Animated.View>
      )}
      <Pressable
        ref={childref}
        onPress={onPress}
        style={pressableStyle}
        onLayout={onLayout}
        {...rest}>
        <Animated.View style={scaled ? emojiAnimatedScaled : wavedEmoji}>
          <EmojiButton
            emojiData={data}
            {...{
              emojiStyle,
              emojiKey,
              iconSize,
            }}
          />
        </Animated.View>
      </Pressable>
    </>
  );
};

export default memo(EmojiItem);
