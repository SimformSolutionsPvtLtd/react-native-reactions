import { StyleSheet } from 'react-native';
import { Colors, moderateScale, verticalScale } from '../../theme';

export const styles = StyleSheet.create({
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
    elevation: 5,
  },
});
