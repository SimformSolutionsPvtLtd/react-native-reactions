import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { ReactionView } from 'react-native-reactions';
import { styles } from './AppStyles';

interface SelectedEmojiType {
  id: number;
  emoji: React.ReactNode | string | number;
  title: string;
}

const cardEmojiList = [
  {
    id: 0,
    emoji: <Text>😇</Text>,
    title: 'like',
  },
  {
    id: 1,
    emoji: <Text>🥰</Text>,
    title: 'love',
  },
  {
    id: 2,
    emoji: <Text>🙄</Text>,
    title: 'care',
  },
  {
    id: 3,
    emoji: <Text>🤪</Text>,
    title: 'haha',
  },
  {
    id: 5,
    emoji: <Text style={styles.emojiText}>😇</Text>,
    title: 'sad',
  },
];

const App = () => {
  const [selectedEmoji, setSelectedEmoji] = useState<SelectedEmojiType>();

  return (
    <View style={styles.mainStyle}>
      <ReactionView
        items={cardEmojiList}
        cardStyle={styles.cardStyle}
        emojiStyle={styles.emojiText}
        onTap={e => setSelectedEmoji(e)}>
        <Text>React Native Reactions</Text>
      </ReactionView>
    </View>
  );
};

export default App;
