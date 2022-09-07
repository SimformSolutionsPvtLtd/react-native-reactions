import { StyleSheet } from 'react-native';
import { Colors, moderateScale, verticalScale } from 'src/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  root: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 11,
  },
  subContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: verticalScale(80),
    justifyContent: 'center',
    zIndex: 10,
  },
  floatBox: {
    alignItems: 'center',
  },
  emojiBox: {
    width: '110%',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 33,
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: moderateScale(3),
      height: verticalScale(2),
    },
    shadowOpacity: 0.24,
    shadowRadius: 1,
  },
});

export default styles;
