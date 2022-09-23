import { Image, Text, View } from 'react-native'
import React, { useState } from 'react'
import { styles } from './style'
import { Reaction } from 'react-native-reactions'
import { AppConstants, CardEmojiList, Strings } from '../../constants'
import { CardProps, EmojiItemProp } from './type'

const Header = ({ index }: CardProps) => (
    <View style={styles.profileContainer}>
        <View style={styles.imageContainer}>
            <Image source={{ uri: AppConstants?.postProfileImagePath }}
                style={styles.profileImage} />
            <Reaction type='modal' items={CardEmojiList} itemIndex={index}>
                <Text style={styles.dots}>{Strings?.dot}</Text>
            </Reaction>
        </View>
        <Text style={styles.title}>{Strings?.title}</Text>
    </View>
)

const Footer = ({ index, selectedEmoji, setSelectedEmoji }: CardProps) => (
    <View style={styles.bottomContainer} >
        <Reaction type='modal' items={CardEmojiList} itemIndex={index} onTap={setSelectedEmoji}>
            <Text>{selectedEmoji ? selectedEmoji?.emoji : Strings?.like}</Text>
        </Reaction>
            <Text>{Strings?.comment}</Text>
        <Reaction items={CardEmojiList} itemIndex={index} onTap={setSelectedEmoji}>
            <Text>{Strings?.share}</Text>
        </Reaction>
    </View>
)

const PostInformation = ({ index }: CardProps) => (
    <View style={styles.reportContainer}>
        <Text>{Strings?.postLike}</Text>
        <View style={styles.commentshareContainer}>
            <Text>{Strings?.postComments}</Text>
            <Reaction type='modal' items={CardEmojiList} itemIndex={index}>
                <Text style={styles.shareText}>{Strings?.postShare}</Text>
            </Reaction>
        </View>
    </View>
)

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
            <Footer index={index} selectedEmoji={selectedEmoji} setSelectedEmoji={setSelectedEmoji} />
        </View>
    )
}

export default Card