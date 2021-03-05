import React, { useState, useEffect, useRef } from 'react';
import { Linking } from 'react-native';
import Svg, { Rect } from 'react-native-svg';

import * as tf from '@tensorflow/tfjs';
import { bundleResourceIO, decodeJpeg } from '@tensorflow/tfjs-react-native';
import { Camera, CameraCapturedPicture } from 'expo-camera';
import * as FileSystem from 'expo-file-system';

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

  const formatShapeFaceImage = () => {};

  const handlingCapture = async (imageCaptured: {
    height: number;
    width: number;
    uri: string;
  }) => {
    const imgB64 = await FileSystem.readAsStringAsync(imageCaptured.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    const imgBuffer = tf.util.encodeString(imgB64, 'base64').buffer;
    const raw = new Uint8Array(imgBuffer);
    const imageTensor = decodeJpeg(raw);
    console.log('COUCOU: ', imageTensor);
  };

  const handleFacesDetected = async (faces: any) => {
    if ((isTfReady && !isCameraReady) || !faces.faces.length) {
      setFacesFound(null);
      setSnapshot(undefined);
      return;
    }

    setFacesFound(faces.faces);
    try {
      const snap = await cameraRef.current?.takePictureAsync();
      if (snap) {
        console.log('SNAP: ', snap);
        // handlingCapture(snap);
      }
      // eslint-disable-next-line no-empty
    } catch (_error) {}
  };

  return hasPermission ? (
    <>
      <TensorCamera
        cameraReady={() => setIsCameraReady(true)}
        faceDetectionHandler={handleFacesDetected}
        ref={cameraRef}
      >
        {facesFound &&
          facesFound.map((face: any) => {
            const {
              bounds: { origin, size },
              faceID,
            } = face;
            return (
              <Svg
                key={faceID}
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  position: 'absolute',
                }}
              >
                <Rect
                  fill="transparent"
                  height={size.height - 5}
                  stroke="blue"
                  strokeWidth="2"
                  width={size.width - 70}
                  x={origin.x + 40}
                  y={origin.y + 5}
                />
              </Svg>
            );
          })}
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
