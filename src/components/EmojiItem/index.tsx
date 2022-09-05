import React from 'react';
import { Animated, Pressable, StyleSheet, Text } from 'react-native';
import { verticalScale } from '../../theme';
import EmojiImage from '../EmojiImage';
import { useEmojiItem } from './hooks';
import styles from './styles';
import type { emojiData, EmojiItemProps } from './types';
import { isValidUrl } from '../../utils';

const EmojiButton = ({
  emojiData,
  emojiStyle,
  emojiKey = 'emoji',
}: emojiData) => {
  const emoji = emojiData?.[emojiKey];
  const isNumber: boolean = typeof emoji === 'number';
  const isValidEmement = React.isValidElement(emoji);
  const emojiElementStyle = StyleSheet.flatten([
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
        {...{ emojiElementStyle }}
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
    titleStyle,
    titleBoxStyle,
    emojiContainerStyle,
    showTopEmojiCard,
    emojiKey,
    emojiStyle,
    ...rest
  } = props;

  const { titlePosition, onLayout, scaled } = useEmojiItem(props);

  const labelStyle = StyleSheet.flatten([
    styles.titleBox,
    {
      transform: [
        { scale: scaled ? 1.0 : 0 },
        { translateX: titlePosition },
        { perspective: 1000 },
      ],
      opacity: scaled ? 1.0 : 0,
      top: showTopEmojiCard ? verticalScale(60) : verticalScale(-30),
    },
    titleBoxStyle,
  ]);

  const emojiItemStyle = StyleSheet.flatten([
    {
      transform: [{ scale: scaled ? 1.5 : 1 }, { perspective: 1000 }],
    },
  ]);

  return (
    <>
      {scaled && data?.title && (
        <Animated.View style={labelStyle}>
          <Text style={[styles.title, titleStyle]}>{data?.title}</Text>
        </Animated.View>
      )}
      <Pressable
        onPress={onPress}
        style={[styles.root, emojiContainerStyle]}
        onLayout={onLayout}
        {...rest}>
        <Animated.View style={emojiItemStyle}>
          <EmojiButton emojiData={data} {...{ emojiStyle, emojiKey }} />
        </Animated.View>
      </Pressable>
    </>
  );
};

export default EmojiItem;
