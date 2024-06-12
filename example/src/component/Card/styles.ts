import { StyleSheet } from 'react-native'
import { moderateScale, scale, verticalScale, Colors } from '../../theme'

export const styles = StyleSheet.create({
    cardContainer: {
        marginVertical: verticalScale(5),
        backgroundColor: Colors.white,
        paddingVertical: verticalScale(10)
    },
    postImageContainer: {
        alignItems: 'center',
        zIndex: -1
    },
    postImage: {
        width: '100%',
        height: verticalScale(200),
        zIndex: -1,
        resizeMode:'center'
    },
    line: {
        borderWidth: 0.3,
        borderColor: Colors.linkWater,
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: moderateScale(10),
        marginHorizontal: scale(20)
    },
    emojiImage:{
        width: scale(18),
        height: verticalScale(18),
        resizeMode: "contain"
    },
    text: {
        color: Colors.black
    }
})
