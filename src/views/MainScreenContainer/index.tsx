import React, { useState, useEffect, useRef } from 'react';
import { Linking, View, Image } from 'react-native';

import * as tf from '@tensorflow/tfjs';
import { bundleResourceIO } from '@tensorflow/tfjs-react-native';
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
  const [model, setModel] = useState<any>(undefined);
  const [isCameraReady, setIsCameraReady] = useState<boolean>(false);
  const cameraRef = useRef<Camera>(null);
  const [snapshot, setSnapshot] = useState<CameraCapturedPicture | undefined>(
    undefined,
  );

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
    if (!isCameraReady) return;

    const snap = await cameraRef.current?.takePictureAsync();
    if (snap) {
      console.log('SNAP: ', snap);
      setSnapshot(snap);
      // await FileSystem.copyAsync({
      //   from: snap.uri,
      //   to: 'file:///Users/aguezennec/Documents/Epitech/moodme-application/',
      // });
    }
    console.log('DETECTED: ', faces);
  };

  return hasPermission ? (
    <>
      <TensorCamera
        cameraReady={() => setIsCameraReady(true)}
        faceDetectionHandler={handleFacesDetected}
        ref={cameraRef}
      />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={{
            uri: snapshot?.uri,
          }}
          style={{ width: 300, height: 280 }}
        />
      </View>
    </>
  ) : (
    <NoCameraAccess
      handleCameraAccess={handleCameraAccess}
      hasPermission={hasPermission}
    />
  );
};

export default MainScreenContainer;
