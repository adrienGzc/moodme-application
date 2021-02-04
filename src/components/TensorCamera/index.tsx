import React, {
  useState,
  ForwardedRef,
  forwardRef,
  useRef,
  useEffect,
} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  // Platform,
} from 'react-native';

// import * as tf from '@tensorflow/tfjs';
// import { cameraWithTensors } from '@tensorflow/tfjs-react-native';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';

import styles from '@moodme/assets/views/appStyles';

// const TensorCamera = cameraWithTensors(Camera);

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

    // const handleCameraStream = async (images: any) => {
    //   const loop = async () => {
    //     const nextImageTensor = await images.next().value;
    //     // const size = tf.util.sizeFromShape(nextImageTensor);
    //     // console.log(size);

    //     requestAnimationFrame(loop);
    //   };

    //   if (camRef.current) await loop();
    // };

    // let textureDims;
    // if (Platform.OS === 'ios') {
    //   textureDims = {
    //     height: 1920,
    //     width: 1080,
    //   };
    // } else {
    //   textureDims = {
    //     height: 1200,
    //     width: 1600,
    //   };
    // }

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
        {/* <TensorCamera
          autorender
          useCamera2Api
          cameraTextureHeight={textureDims.height}
          cameraTextureWidth={textureDims.width}
          // faceDetectorSettings={{
          //   mode: FaceDetector.Constants.Mode.accurate,
          //   detectLandmarks: FaceDetector.Constants.Landmarks.none,
          //   runClassifications: FaceDetector.Constants.Classifications.none,
          //   minDetectionInterval: 5000,
          //   tracking: true,
          // }}
          ref={ref}
          resizeDepth={3}
          resizeHeight={48}
          resizeWidth={48}
          style={styles.container}
          type={type}
          onCameraReady={cameraReady}
          // onFacesDetected={faceDetectionHandler}
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
