import React, { useState, useEffect, useRef } from 'react';
import { Linking, View, Image } from 'react-native';
import Svg, { Circle, Rect } from 'react-native-svg';

import * as tf from '@tensorflow/tfjs';
import {
  bundleResourceIO,
  decodeJpeg,
  fetch,
} from '@tensorflow/tfjs-react-native';
import { Camera, CameraCapturedPicture } from 'expo-camera';

import { TensorCamera } from '@moodme/components';
import { NoCameraAccess } from '@moodme/views';

// LOAD MODEL AND MODEL WEIGHT
const modelTs = require('assets/model.json');
const weights = require('assets/weights.bin');

const MainScreenContainer = () => {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [isTfReady, setIsTfReady] = useState<boolean>(false);
  const [model, setModel] = useState<tf.LayersModel>();
  const [isCameraReady, setIsCameraReady] = useState<boolean>(false);
  const cameraRef = useRef<Camera>(null);
  const [snapshot, setSnapshot] = useState<CameraCapturedPicture | undefined>(
    undefined,
  );
  const [facesFound, setFacesFound] = useState<any>(undefined);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await tf.ready();
      setIsTfReady(true);

      const loadedModel = await tf.loadLayersModel(
        bundleResourceIO(modelTs, weights),
      );

      setModel(loadedModel);
    })();
  }, []);

  const handleCameraAccess = async () => {
    const { status } = await Camera.requestPermissionsAsync();

    if (status === 'granted') setHasPermission(status === 'granted');
    else Linking.openURL('app-settings://');
  };

  const handleFacesDetected = async (faces: any) => {
    if (!isCameraReady || !faces.faces.length) {
      setFacesFound(null);
      setSnapshot(undefined);
      return;
    }

    setFacesFound(faces.faces);
    try {
      const snap = await cameraRef.current?.takePictureAsync({
        quality: 1,
        base64: true,
      });
      if (snap) {
        // console.log('SNAP: ', snap);
        // const encodedPic = tf.util.encodeString(snap.base64);
        // const response = await fetch(snap.uri, {}, { isBinary: true });
        // const rawImageData = await response.arrayBuffer();
        // const imageTensor = decodeJpeg(rawImageData, 1);
        // console.log(imageTensor.shape);
        setSnapshot(snap);
      }
    } catch (_error) {}
  };

  return hasPermission ? (
    <>
      <TensorCamera
        cameraReady={() => setIsCameraReady(true)}
        faceDetectionHandler={handleFacesDetected}
        ref={cameraRef}
      >
        {/* <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            position: 'absolute',
            zIndex: 10000,
          }}
        > */}
        {facesFound &&
          facesFound.map((face: any) => {
            const {
              bounds: { origin, size },
              faceID,
            } = face;
            // console.log('FACE: ', face);
            return (
              <Svg
                key={faceID}
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  position: 'absolute',
                  zIndex: 10000,
                }}
                // viewBox={`${origin.x} ${origin.y} 100 100`}
                // viewBox="0 0 500 500"
              >
                <Rect
                  fill="transparent"
                  height={size.height - 5}
                  stroke="blue"
                  strokeWidth="2"
                  width={size.width - 20}
                  x={origin.x + 10}
                  y={origin.y + 5}
                />
                {/* <Circle
                  cx={origin.y}
                  cy={origin.x}
                  fill="transparent"
                  r="5"
                  stroke="red"
                  strokeWidth="2.5"
                /> */}
              </Svg>
            );
          })}
        {/* <Image
          source={{
            uri: snapshot?.uri,
          }}
          style={{ width: 300, height: 280 }}
        /> */}
        {/* </View> */}
      </TensorCamera>
    </>
  ) : (
    <NoCameraAccess
      handleCameraAccess={handleCameraAccess}
      hasPermission={hasPermission}
    />
  );
};

export default MainScreenContainer;
