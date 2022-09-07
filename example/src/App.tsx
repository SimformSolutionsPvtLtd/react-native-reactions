import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { ReactionView } from 'react-native-reactions';

const styles = StyleSheet.create({
  emojiText: {
    textTransform: 'capitalize',
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});

const cardEmojiList = [
  {
    id: 0, emoji: <Text style={styles.emojiText}>😇</Text>, title: 'like'
  },
  {
    id: 1, emoji: <Text style={styles.emojiText}>🥰</Text>, title: 'love'
  },
  {
    id: 2, emoji: <Text style={styles.emojiText}>🙄</Text>, title: 'care'
  },
  {
    id: 3, emoji: <Text style={styles.emojiText}>🤪</Text>, title: 'haha'
  },
  {
    id: 5, emoji: <Text style={styles.emojiText}>😇</Text>, title: 'sad'
  },
];

const App = () => {
  return <ReactionView items={cardEmojiList}>
    <Text>React Native Reactions</Text>
  </ReactionView>;
};

export default App;
