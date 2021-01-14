import { StyleSheet, TextProps, ViewProps, PressableProps } from 'react-native';

import colors from '@moodme/assets/styles/colors';
import spacing from '@moodme/assets/styles/spacing';

interface StylesProps {
  container: ViewProps;
  text: TextProps;
  button: PressableProps;
  buttonLabel: TextProps;
}
export default StyleSheet.create<StylesProps>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  button: {
    justifyContent: 'center',
    borderRadius: 6,
    backgroundColor: colors.ORANGE,
    height: 48,
    maxWidth: '100%',
    ...spacing.pg2,
  },
  buttonLabel: {
    fontSize: 20,
    color: colors.WHITE,
  },
});
