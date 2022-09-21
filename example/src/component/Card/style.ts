import { StyleSheet } from 'react-native'
import { moderateScale, scale, verticalScale, Colors } from '../../theme'

export const styles = StyleSheet.create({
    cardContainer: {
        marginVertical: verticalScale(5),
        backgroundColor: Colors.white,
        paddingVertical: verticalScale(10)
    },
    profileContainer: {
        marginHorizontal: scale(20)
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    postImageContainer:{
         alignItems: 'center',
          zIndex: -1
         },
    profileImage: {
        width: moderateScale(50),
        height: moderateScale(50),
        borderRadius: 10
    },
    dotContainer: {
        width: moderateScale(34),
        alignItems: 'flex-end'
    },
    dots: {
        fontWeight: '900',
    },
    title: {
        marginVertical: verticalScale(5),
        zIndex: -1
    },
    postImage: {
        width: '100%',
        height: verticalScale(200),
        zIndex: -1
    }
    ,
    reportContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: moderateScale(10)
    },
    commentshareContainer: {
        flexDirection: 'row',
    },
    shareText: {
        marginLeft: scale(5)
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
    }
})
