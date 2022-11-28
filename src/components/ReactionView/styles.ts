import { StyleSheet } from 'react-native';
import { verticalScale } from '../../theme';

const styles = StyleSheet.create({
  subContainer: {
    position: 'absolute',
    zIndex: 10,
    height: verticalScale(80),
  },
});

export default styles;
