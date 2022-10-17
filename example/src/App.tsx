import React from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import { ReactionProvider } from 'react-native-reactions';
import { Card } from './component';
import { styles } from './AppStyles'
import { Colors } from './theme';
import { PostItemList } from './constants';

const App = () => (
  <SafeAreaView style={styles.mainStyle}>
    <ReactionProvider>
      <FlatList
        data={PostItemList}
        style={{ backgroundColor: Colors.linkWater }}
        renderItem={({ index }) => <Card index={index} />}
        keyExtractor={item => item.id}
      />
    </ReactionProvider>
  </SafeAreaView>
);

export default App;
