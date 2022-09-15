import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { ReactionView } from 'react-native-reactions';
import { styles } from './AppStyles';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-gesture-handler'
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
    id: 2, emoji: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Twemoji_1f600.svg/1200px-Twemoji_1f600.svg.png', title: 'care'
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
    <GestureHandlerRootView style={styles.mainStyle}>
      <ReactionView items={cardEmojiList} iconSize={20}
        cardStyle={styles.cardStyle}
        emojiStyle={styles.emojiText}
        onTap={e => setSelectedEmoji(e)}
      >
        <Text>React Native Reactions</Text>
      </ReactionView>
    </GestureHandlerRootView>
  );
};

export default App;
