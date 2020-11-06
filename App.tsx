/* eslint-disable react/style-prop-object */
/* eslint-disable react-native/no-color-literals */
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ViewProps,
  TextProps,
  TouchableOpacityProps,
} from 'react-native';

import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import { StatusBar } from 'expo-status-bar';

interface StyleProps {
  container: ViewProps;
  flipContainer: ViewProps;
  flipButton: TouchableOpacityProps;
  flipButtonLabel: TextProps;
}

const styles = StyleSheet.create<StyleProps>({
  container: {
    flex: 1,
  },
  flipContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  flipButton: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  flipButtonLabel: {
    fontSize: 18,
    marginBottom: 10,
    color: 'white',
  },
});

export default () => {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [type, setType] = useState(Camera.Constants.Type.front);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleFacesDetected = (value: any) => {
    console.log('DETECTED: ', value);
  };

  return (
    <View style={styles.container}>
      <Camera
        faceDetectorSettings={{
          mode: FaceDetector.Constants.Mode.accurate,
          detectLandmarks: FaceDetector.Constants.Landmarks.none,
          runClassifications: FaceDetector.Constants.Classifications.none,
          minDetectionInterval: 5000,
          tracking: true,
        }}
        style={styles.container}
        type={type}
        onFacesDetected={handleFacesDetected}
      >
        <View style={styles.flipContainer}>
          <TouchableOpacity
            style={styles.flipButton}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back,
              );
            }}
          >
            <Text style={styles.flipButtonLabel}>Flip</Text>
          </TouchableOpacity>
        </View>
      </Camera>
      <StatusBar style="auto" />
    </View>
  );
};
