import { StyleSheet } from 'react-native';
import { verticalScale } from '../../theme';

const styles = StyleSheet.create({
  subContainer: {
    position: 'absolute',
    right: 0,
    zIndex: 10,
    height: verticalScale(80),
    alignItems: 'center',
  },
});

export default styles;
