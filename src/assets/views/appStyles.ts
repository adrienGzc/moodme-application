import {
  StyleSheet,
  ViewProps,
  TextProps,
  TouchableOpacityProps,
} from 'react-native';

import colors from '../styles/colors';

interface StyleProps {
  container: ViewProps;
  flipContainer: ViewProps;
  flipButton: TouchableOpacityProps;
  flipButtonLabel: TextProps;
}

export default StyleSheet.create<StyleProps>({
  container: {
    zIndex: -1,
    flex: 1,
    // height: '60%',
  },
  flipContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.TRANSPARENT,
  },
  flipButton: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  flipButtonLabel: {
    fontSize: 18,
    marginBottom: 10,
    color: colors.WHITE,
  },
});
