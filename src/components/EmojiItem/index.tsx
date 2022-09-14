import React from 'react';
import { Animated, Pressable, StyleSheet, Text } from 'react-native';
import { isValidUrl } from '../../utils';
import EmojiImage from '../EmojiImage';
import styles from './styles';
import type { emojiData, EmojiItemProps } from './types';

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

const EmojiItem = ({
  data,
  scaled,
  emojiStyle,
  emojiKey,
  ...rest
}: EmojiItemProps) => {
  const labelStyle = StyleSheet.flatten([
    styles.titleBox,
    {
      transform: [{ scale: scaled ? 1.0 : 0 }, { perspective: 1000 }],
      opacity: scaled ? 1.0 : 0,
    },
  ]);

  const emojiItemStyle = StyleSheet.flatten([
    {
      transform: [{ scale: scaled ? 1.5 : 1 }, { perspective: 1000 }],
    },
  ]);

  return (
    <Pressable {...rest} style={styles.root}>
      {scaled && data?.title && (
        <Animated.View style={labelStyle}>
          <Text style={styles.title}>{data?.title}</Text>
        </Animated.View>
      )}
      <Animated.View style={emojiItemStyle}>
        <EmojiButton emojiData={data} {...{ emojiStyle, emojiKey }} />
      </Animated.View>
    </Pressable>
  );
};

export default EmojiItem;
