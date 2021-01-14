import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Linking,
  StatusBar,
  Button,
} from 'react-native';

import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';

import appStyles from '@moodme/assets/views/appStyles';
import noCameraStyles from '@moodme/assets/views/noCameraAccessStyles';

export default () => {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [type, setType] = useState(Camera.Constants.Type.front);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleCameraAccess = async () => {
    const { status } = await Camera.requestPermissionsAsync();

    if (status === 'granted') setHasPermission(status === 'granted');
    else Linking.openURL('app-settings://');
  };

  const handleFacesDetected = (faces: any) => {
    console.log('DETECTED: ', faces);
  };

  return !hasPermission ? (
    <View style={noCameraStyles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={noCameraStyles.text}>No camera access</Text>
      <Button title="Enable camera" onPress={handleCameraAccess} />
    </View>
  ) : (
    <View style={appStyles.container}>
      <Camera
        faceDetectorSettings={{
          mode: FaceDetector.Constants.Mode.accurate,
          detectLandmarks: FaceDetector.Constants.Landmarks.none,
          runClassifications: FaceDetector.Constants.Classifications.none,
          minDetectionInterval: 5000,
          tracking: true,
        }}
        style={appStyles.container}
        type={type}
        onFacesDetected={handleFacesDetected}
      >
        <View style={appStyles.flipContainer}>
          <TouchableOpacity
            style={appStyles.flipButton}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back,
              );
            }}
          >
            <Text style={appStyles.flipButtonLabel}>Flip</Text>
          </TouchableOpacity>
        </View>
      </Camera>
      {/* <StatusBar style="auto" /> */}
    </View>
  );
};
