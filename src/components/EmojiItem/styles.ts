import { StyleSheet } from 'react-native';
import { Colors, moderateScale, scale, verticalScale } from '../../theme';

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: scale(3),
  },
  titleBox: {
    position: 'absolute',
    backgroundColor: Colors.red,
    paddingVertical: verticalScale(4),
    borderRadius: 16,
    paddingHorizontal: scale(5),
  },
  title: {
    textTransform: 'capitalize',
    color: Colors.white,
    fontWeight: '600',
    fontSize: moderateScale(12),
  },
  img: {
    width: moderateScale(25),
    height: moderateScale(20),
    resizeMode: 'contain',
  },
  emojiText: {
    textTransform: 'capitalize',
    color: Colors.white,
    textAlign: 'center',
  },
});

export default styles;
