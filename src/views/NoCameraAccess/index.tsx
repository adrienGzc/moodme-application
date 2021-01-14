import React from 'react';
import {
  StyleSheet,
  Text,
  TextProps,
  View,
  ViewProps,
  Pressable,
  PressableProps,
  StatusBar,
} from 'react-native';

import { Camera } from 'expo-camera';

interface NoCameraAccessProps {
  handleCameraAccess: () => void;
  hasPermission: boolean;
}

const NoCameraAccess = ({
  handleCameraAccess,
  hasPermission,
}: NoCameraAccessProps) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.text}>No camera access</Text>
      <Pressable style={styles.button} onPress={handleCameraAccess}>
        <Text style={styles.buttonLabel}>Enable camera</Text>
      </Pressable>
    </View>
  );
};

export default NoCameraAccess;
