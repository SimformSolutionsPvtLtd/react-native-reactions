import React, { useState } from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import { ReactionProvider } from 'react-native-reactions';
import { Card } from './component';
import { styles } from './AppStyles';
import { Colors } from './theme';
import { PostItemList } from './constants';

const App = () => {
  const [isScrollDisable, setIsScrollDisable] = useState<boolean>(true);

  return (
    <SafeAreaView style={styles.mainStyle}>
      <ReactionProvider>
        <FlatList
          data={PostItemList}
          scrollEnabled={isScrollDisable}
          style={{ backgroundColor: Colors.linkWater }}
          renderItem={({ index, item }) => (
            <Card
              item={item}
              index={index}
              onShowDismissCard={(e?: boolean) => setIsScrollDisable(!e)}
              isScrollDisable
            />
          )}
          keyExtractor={item => item.id}
        />
      </ReactionProvider>
    </SafeAreaView>
  );
};

export default App;
