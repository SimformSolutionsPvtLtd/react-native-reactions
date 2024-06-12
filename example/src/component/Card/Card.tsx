import { Image, Text, View } from 'react-native';
import React, { memo, useState } from 'react';
import { styles } from './styles';
import { Reaction } from 'react-native-reactions';
import { CardEmojiList, Strings } from '../../constants';
import { CardProps, EmojiItemProp } from './types';
import _ from 'lodash';

const Footer = ({
  index,
  selectedEmoji,
  setSelectedEmoji,
  onShowDismissCard,
}: CardProps) => (
  <View style={styles.bottomContainer}>
    <Reaction
      type="modal"
      items={CardEmojiList}
      itemIndex={index}
      onTap={setSelectedEmoji}
      onShowDismissCard={onShowDismissCard}>
      <Text style={styles.text}>{selectedEmoji ? selectedEmoji?.emoji : Strings?.like}</Text>
    </Reaction>
    <Text style={styles.text}>{Strings?.share}</Text>
  </View>
);

const Card = ({ index, onShowDismissCard, item }: CardProps) => {
  const [selectedEmoji, setSelectedEmoji] = useState<EmojiItemProp>();
  return (
    <View style={styles.cardContainer}>
      <View style={styles.postImageContainer}>
        <Image source={{ uri: item?.image }} style={styles.postImage} />
      </View>
      <View style={styles.line} />
      <Footer
        index={index}
        selectedEmoji={selectedEmoji}
        setSelectedEmoji={setSelectedEmoji}
        onShowDismissCard={onShowDismissCard}
      />
    </View>
  );
};

export default memo(Card, (prevProps, nextProps) =>
  _.isEqual(prevProps?.isScrollDisable, nextProps?.isScrollDisable)
);
