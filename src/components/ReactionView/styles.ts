import { StyleSheet } from 'react-native';
import { Colors, moderateScale, verticalScale } from '../../theme';

const styles = StyleSheet.create({
  subContainer: {
    position: 'absolute',
    right: 0,
    zIndex: 10,
    height: verticalScale(80),
    alignItems: 'center',
  },
  emojiBox: {
    flexDirection: 'row',
    padding: moderateScale(9),
    backgroundColor: Colors.white,
    borderRadius: 30,
    shadowColor: Colors.black,
    shadowOffset: {
      width: moderateScale(3),
      height: verticalScale(2),
    },
    shadowOpacity: 0.5,
    shadowRadius: 1,
  },
});

export default styles;
