import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import styles from './styles';
import type { ReactionViewProps } from './types';

const Reactions = ({ items = [] }: ReactionViewProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>{items?.length}</Text>
    </SafeAreaView>
  );
};

export default Reactions;
