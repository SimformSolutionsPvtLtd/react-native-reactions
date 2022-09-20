import { Image, Text, View } from 'react-native';
import React, { useState } from 'react';
import { styles } from './style';
import { ReactionView } from 'react-native-reactions';
import { AppConstants, CardEmojiList, Strings } from '../../constants';
import { CardProps, EmojiItemProp } from './type';

const Header = ({ index }: CardProps) => (
  <View style={styles.profileContainer}>
    <View style={styles.imageContainer}>
      <Image
        source={{ uri: AppConstants?.postProfileImagePath }}
        style={styles.profileImage}
      />
      <ReactionView items={CardEmojiList} itemIndex={index}>
        <Text style={styles.dots}>{Strings?.dot}</Text>
      </ReactionView>
    </View>
    <Text style={styles.title}>{Strings?.title}</Text>
  </View>
);

const Footer = ({ index, selectedEmoji, setSelectedEmoji }: CardProps) => (
  <View style={styles.bottomContainer}>
    <ReactionView
      items={CardEmojiList}
      itemIndex={index}
      onTap={setSelectedEmoji}>
      <Text>{selectedEmoji ? selectedEmoji?.emoji : Strings?.like}</Text>
    </ReactionView>
    <ReactionView items={CardEmojiList} itemIndex={index}>
      <Text>{Strings?.comment}</Text>
    </ReactionView>
    <ReactionView items={CardEmojiList} itemIndex={index}>
      <Text>{Strings?.share}</Text>
    </ReactionView>
  </View>
);

const PostInformation = ({ index }: CardProps) => (
  <View style={styles.reportContainer}>
    <Text>{Strings?.postLike}</Text>
    <View style={styles.commentshareContainer}>
      <Text>{Strings?.postComments}</Text>
      <ReactionView items={CardEmojiList} itemIndex={index}>
        <Text style={styles.shareText}>{Strings?.postShare}</Text>
      </ReactionView>
    </View>
  </View>
);

const Card = ({ index }: CardProps) => {
  const [selectedEmoji, setSelectedEmoji] = useState<EmojiItemProp>();
  return (
    <View style={styles.cardContainer}>
      <Header index={index} />
      <View style={styles.postImageContainer}>
        <Image
          source={{ uri: AppConstants?.postImagepath }}
          style={styles.postImage}
        />
      </View>
      <PostInformation index={index} />
      <View style={styles.line} />
      <Footer
        index={index}
        selectedEmoji={selectedEmoji}
        setSelectedEmoji={setSelectedEmoji}
      />
    </View>
  );
};

export default Card;
