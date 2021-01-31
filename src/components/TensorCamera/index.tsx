import React, { useState, ForwardedRef, forwardRef } from 'react';
import { Text, View, TouchableOpacity, StatusBar } from 'react-native';

// import * as tf from '@tensorflow/tfjs';
// import { cameraWithTensors } from '@tensorflow/tfjs-react-native';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';

import styles from '@moodme/assets/views/appStyles';

// const TensorCamera = cameraWithTensors(Camera);

interface CameraScreenProps {
  faceDetectionHandler: (faces: any) => void;
  cameraReady: () => void;
}

const CameraScreen = forwardRef(
  (
    { faceDetectionHandler, cameraReady }: CameraScreenProps,
    ref: ForwardedRef<Camera>,
  ) => {
    const [type, setType] = useState(Camera.Constants.Type.front);

    return (
      <>
        <StatusBar barStyle="light-content" />
        <Camera
          faceDetectorSettings={{
            mode: FaceDetector.Constants.Mode.accurate,
            detectLandmarks: FaceDetector.Constants.Landmarks.none,
            runClassifications: FaceDetector.Constants.Classifications.none,
            minDetectionInterval: 500,
          }}
          ref={ref}
          style={styles.container}
          type={type}
          onCameraReady={cameraReady}
          onFacesDetected={faceDetectionHandler}
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
        {/* <TensorCamera
        autorender
        cameraTextureHeight={textureDims.height}
        cameraTextureWidth={textureDims.width}
        faceDetectorSettings={{
          mode: FaceDetector.Constants.Mode.accurate,
          detectLandmarks: FaceDetector.Constants.Landmarks.none,
          runClassifications: FaceDetector.Constants.Classifications.none,
          minDetectionInterval: 5000,
          tracking: true,
        }}
        resizeDepth={3}
        resizeHeight={1080}
        resizeWidth={1920}
        style={styles.container}
        type={type}
        onFacesDetected={faceDetectionHandler}
        onReady={handleCameraStream}
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
      </TensorCamera> */}
      </>
    );
  },
);

export default CameraScreen;
