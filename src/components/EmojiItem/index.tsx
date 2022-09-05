import React from 'react';
import { Animated, Pressable, Text } from 'react-native';
import styles from './styles';
import type { EmojiItemProps } from './types';

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
        {data.emoji}
      </Animated.View>
    </Animated.View>
  </Pressable>
);

export default EmojiItem;
