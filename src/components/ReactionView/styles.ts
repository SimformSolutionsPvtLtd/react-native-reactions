import { StyleSheet } from 'react-native';
import { verticalScale } from '../../theme';

const styles = StyleSheet.create({
  subContainer: {
    position: 'absolute',
    zIndex: 10,
    height: verticalScale(80),
  },
  textWrapperStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
