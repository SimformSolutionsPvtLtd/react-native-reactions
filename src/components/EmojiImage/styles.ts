import { StyleSheet } from 'react-native';
import { moderateScale } from '../../theme';

const styles = StyleSheet.create({
  img: {
    width: moderateScale(25),
    height: moderateScale(20),
    resizeMode: 'contain',
  },
});

export default styles;
