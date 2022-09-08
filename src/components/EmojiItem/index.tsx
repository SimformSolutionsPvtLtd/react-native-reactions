import React from 'react';
import { Animated, Pressable, Text } from 'react-native';
import styles from './styles';
import type { emojiData, EmojiItemProps } from './types';
import EmojiImage from '../EmojiImage';
import { isValidUrl } from '../../utils';

const EmojiButton = ({ emojiData }: emojiData) => {
  const isNumber: boolean = typeof emojiData.emoji === 'number';

  const isValidEmement = React.isValidElement(emojiData.emoji);

  if (isValidEmement) {
    return emojiData.emoji as React.ReactElement;
  } else if (isValidUrl(emojiData.emoji as string) || isNumber) {
    return (
      <EmojiImage
        source={
          isNumber
            ? (emojiData?.emoji as number)
            : { uri: emojiData.emoji as string }
        }
      />
    );
  } else {
    return <Text style={styles.emojiText}>{emojiData.emoji}</Text>;
  }
};

const EmojiItem = ({ data, scaled, ...rest }: EmojiItemProps) => (
  <Pressable {...rest} style={styles.root}>
    {scaled && (
      <Animated.View
        style={[
          styles.titleBox,
          {
            transform: [{ scale: scaled ? 1.0 : 0 }, { perspective: 1000 }],
          },
          { opacity: scaled ? 1.0 : 0 },
        ]}>
        <Text style={styles.title}>{data.title}</Text>
      </Animated.View>
    )}
    <Animated.View>
      <Animated.View
        style={{
          transform: [{ scale: scaled ? 1.5 : 1 }, { perspective: 1000 }],
        }}>
        <EmojiButton emojiData={data} />
      </Animated.View>
    </Animated.View>
  </Pressable>
);

export default EmojiItem;
