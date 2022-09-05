import { StyleSheet } from 'react-native';
import { Colors, moderateScale, verticalScale } from '../../theme';

const styles = StyleSheet.create({
  root: {
    width: moderateScale(30),
    height: moderateScale(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleBox: {
    position: 'absolute',
    backgroundColor: Colors.blackTransparent,
    top: verticalScale(-50),
    paddingVertical: verticalScale(4),
    borderRadius: 16,
  },
  title: {
    textTransform: 'capitalize',
    fontSize: moderateScale(12),
    color: Colors.white,
    textAlign: 'center',
  },
});

export default styles;
