import React, { useState, FunctionComponent } from 'react';
import { Text, View, TouchableOpacity, StatusBar } from 'react-native';

import { cameraWithTensors } from '@tensorflow/tfjs-react-native';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';

import appStyles from '@moodme/assets/views/appStyles';

const TensorCamera = cameraWithTensors(Camera);

interface CameraScreenProps {
  faceDetectionHandler: (faces: any) => void;
}

const CameraScreen: FunctionComponent<CameraScreenProps> = ({
  faceDetectionHandler,
}) => {
  const [type, setType] = useState(Camera.Constants.Type.front);

  return (
    <View style={appStyles.container}>
      <StatusBar barStyle="light-content" />
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
        onFacesDetected={faceDetectionHandler}
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
    </View>
  );
};

export default CameraScreen;
