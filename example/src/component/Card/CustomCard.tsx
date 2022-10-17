import { Image, Text, View } from 'react-native'
import React, { useState } from 'react'
import { styles } from './style'
import { Reaction } from 'react-native-reactions'
import { AppConstants, CardEmojiUrlList, Strings } from '../../constants'
import { CardProps, EmojiItemProp } from './type'

const Footer = ({ index, selectedEmoji, setSelectedEmoji }: CardProps) => (
    <View style={styles.bottomContainer} >
        <Reaction type='modal' items={CardEmojiUrlList} itemIndex={index} onTap={setSelectedEmoji} iconSize={22} isShowCardInCenter>
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

const CustomCard = ({ index }: CardProps) => {
    const [selectedEmoji, setSelectedEmoji] = useState<EmojiItemProp>();
    return (
        <View style={styles.cardContainer}>
            <View style={styles.postImageContainer}>
                <Image
                    source={{ uri: AppConstants?.postImagepath }}
                    style={styles.postImage}
                />
            </View>
            <View style={styles.line} />
            <Footer index={index} selectedEmoji={selectedEmoji} setSelectedEmoji={setSelectedEmoji} />
        </View>
    )
}

export default CustomCard