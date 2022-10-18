import { Image, Text, View } from 'react-native'
import React, { memo, useState } from 'react'
import { styles } from './styles'
import { Reaction } from 'react-native-reactions'
import { AppConstants, CardEmojiUrlList, Strings } from '../../constants'
import { CardProps, EmojiItemProp } from './types'
import _ from 'lodash';

const Footer = ({ index, selectedEmoji, setSelectedEmoji, onShowDismissCard }: CardProps) => (
    <View style={styles.bottomContainer} >
        <Reaction
            type='modal'
            items={CardEmojiUrlList}
            itemIndex={index}
            onTap={setSelectedEmoji}
            onShowDismissCard={onShowDismissCard}>
            {
                selectedEmoji ?
                    <Image
                        source={{ uri: selectedEmoji?.emoji as string }}
                        style={styles.emojiImage}
                    />
                    :
                    <Text>{Strings?.like}</Text>
            }
        </Reaction>
        <Text>{Strings?.comment}</Text>
        <Text>{Strings?.share}</Text>
    </View>
)

const CustomCard = ({ index, onShowDismissCard }: CardProps) => {
    const [selectedEmoji, setSelectedEmoji] = useState<EmojiItemProp>();
    return (
        <View style={styles.cardContainer}>
            <View style={styles.postImageContainer}>
                <Image
                    source={{ uri: AppConstants?.postImagePath }}
                    style={styles.postImage}
                />
            </View>
            <View style={styles.line} />
            <Footer index={index} selectedEmoji={selectedEmoji} setSelectedEmoji={setSelectedEmoji} onShowDismissCard={onShowDismissCard} />
        </View>
    )
}

export default memo(CustomCard, (prevProps, nextProps) =>
    _.isEqual(prevProps?.isScrollDisable, nextProps?.isScrollDisable),
);