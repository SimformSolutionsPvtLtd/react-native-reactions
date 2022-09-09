import { StyleSheet } from 'react-native';
import { Colors, moderateScale } from './theme';

export const styles = StyleSheet.create({
  emojiText: {
    textTransform: 'capitalize',
    fontSize: moderateScale(20),
    color: Colors.white,
    textAlign: 'center',
  },
  cardStyle: {
    backgroundColor: Colors.black,
    borderRadius: 30,
    padding: moderateScale(5),
    borderWidth: 5,
    borderColor: Colors.blue,
  },
  mainStyle: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
