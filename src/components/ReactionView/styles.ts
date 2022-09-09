import { StyleSheet } from 'react-native';
import { Colors, moderateScale, verticalScale } from '../../theme';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    position: 'absolute',
  },
  root: {
    zIndex: 11,
  },
  subContainer: {
    zIndex: 10,
  },
  emojiBox: {
    flexDirection: 'row',
    bottom: moderateScale(5),
    padding: moderateScale(9),
    backgroundColor: Colors.blue,
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
