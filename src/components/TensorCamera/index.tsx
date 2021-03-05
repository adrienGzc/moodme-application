import React, {
  useState,
  ForwardedRef,
  forwardRef,
  useRef,
  useEffect,
} from 'react';
import { Text, View, TouchableOpacity, StatusBar } from 'react-native';

import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';

import styles from '@moodme/assets/views/appStyles';

interface CameraScreenProps {
  faceDetectionHandler: (faces: any) => void;
  cameraReady: () => void;
  children: JSX.Element;
}

const CameraScreen = forwardRef(
  (
    { faceDetectionHandler, cameraReady, children }: CameraScreenProps,
    ref: ForwardedRef<any>,
  ) => {
    const [type, setType] = useState(Camera.Constants.Type.front);
    const camRef = useRef(false);

    useEffect(() => {
      camRef.current = true;
      return () => {
        camRef.current = false;
      };
    }, []);

    return (
      <>
        <StatusBar barStyle="light-content" />
        <Camera
          useCamera2Api
          faceDetectorSettings={{
            mode: FaceDetector.Constants.Mode.accurate,
            detectLandmarks: FaceDetector.Constants.Landmarks.none,
            runClassifications: FaceDetector.Constants.Classifications.none,
            minDetectionInterval: 100,
            tracking: true,
          }}
          ref={ref}
          style={styles.container}
          type={type}
          onCameraReady={cameraReady}
          onFacesDetected={faceDetectionHandler}
        >
          {children}
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
      </>
    );
  },
);

export default CameraScreen;
