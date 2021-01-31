import React, { useState, useEffect } from 'react';
import { Linking } from 'react-native';

import * as tf from '@tensorflow/tfjs';
import {
  bundleResourceIO,
} from '@tensorflow/tfjs-react-native';
import { Camera } from 'expo-camera';

import { NoCameraAccess } from '@moodme/views';
import { TensorCamera } from '@moodme/components';

// LOAD MODEL AND MODEL WEIGHT
const modelTs = require('assets/model.json');
const weights = require('assets/weights.bin');

const MainScreenContainer = () => {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [isTfReady, setIsTfReady] = useState<boolean>(false);
  const [model, setModel] = useState<any>(undefined);

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

  const handleFacesDetected = (faces: any) => {
    console.log('DETECTED: ', faces);
  };

  return hasPermission ? (
    <TensorCamera faceDetectionHandler={handleFacesDetected} />
  ) : (
    <NoCameraAccess
      handleCameraAccess={handleCameraAccess}
      hasPermission={hasPermission}
    />
  );
};

export default MainScreenContainer;
