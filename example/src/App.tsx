import React from 'react';
import { SafeAreaView } from 'react-native';
import { FlatList } from 'react-native-reactions';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Card } from './component';
import { styles } from './AppStyles'
import { Colors } from './theme';
import { PostItemList } from './constants';

const App = () => (
  <GestureHandlerRootView style={styles.mainStyle}>
    <SafeAreaView style={styles.mainStyle}>
      <FlatList
        data={PostItemList}
        style={{ backgroundColor: Colors.linkWater }}
        renderItem={({ index }) => <Card index={index} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  </GestureHandlerRootView>
);

export default App;
