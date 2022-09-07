import React, { useState } from 'react';
import { Animated, SafeAreaView, TouchableOpacity, View } from 'react-native';
import EmojiItem from '../EmojiItem';
import styles from './styles';
import type { ReactionViewProps } from './types';
import { PanGestureHandler } from 'react-native-gesture-handler';

const ReactionsView = ({ children, items }: ReactionViewProps) => {
  const [showPopUpCard, setShowPopUpCard] = useState(false);
  const [currentEmoji, setCurrentEmoji] = useState<number | undefined | null>();
  const [viewHeight, setViewHeight] = useState<number>();

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
      <PanGestureHandler onEnded={gestureEnded}>
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
