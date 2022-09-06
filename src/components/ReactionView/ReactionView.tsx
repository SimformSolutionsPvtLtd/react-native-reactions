import React, { useState } from 'react';
import { Animated, SafeAreaView, TouchableOpacity, View } from 'react-native';
import EmojiItem from '../EmojiItem';
import styles from './styles';
import type { ReactionViewProps } from './types';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { useReaction } from '../../hooks';

const ReactionsView = (props: ReactionViewProps) => {
  const { children, items } = props;
  const [showPopUpCard, setShowPopUpCard] = useState(false);
  const [viewHeight, setViewHeight] = useState<number>();

  const { onGesture, currentEmoji, setCurrentEmoji } = useReaction(props);

  const gestureEnded = () => {
    setShowPopUpCard(false);
  };

  const emojiPressHandler = (index: number) => {
    setCurrentEmoji(index);
    setShowPopUpCard(false);
  };

  const btnPressHandler = () => {
    setCurrentEmoji(null);
    setShowPopUpCard(!showPopUpCard);
  };

  return (
    <SafeAreaView style={styles.container}>
      <PanGestureHandler onGestureEvent={onGesture} onEnded={gestureEnded}>
        <Animated.View style={styles.root}>
          <View>
            {showPopUpCard && (
              <View style={[styles.subContainer, { bottom: viewHeight }]}>
                <View style={styles.floatBox}>
                  <View style={styles.emojiBox}>
                    {items?.map((item, index) => (
                      <EmojiItem
                        onPress={() => emojiPressHandler(index)}
                        key={item?.title}
                        data={item}
                        scaled={currentEmoji === index}
                      />
                    ))}
                  </View>
                </View>
              </View>
            )}
          </View>
          <TouchableOpacity
            onLayout={event => {
              const { height } = event.nativeEvent.layout;
              setViewHeight(height);
            }}
            onLongPress={btnPressHandler}
            onPress={btnPressHandler}>
            <>{children}</>
          </TouchableOpacity>
        </Animated.View>
      </PanGestureHandler>
    </SafeAreaView>
  );
};

export default ReactionsView;
