import React from 'react';
import { Text, View, StatusBar, Button } from 'react-native';

import noCameraStyles from '@moodme/assets/views/noCameraAccessStyles';

interface NoCameraAccessProps {
  handleCameraAccess: () => void;
  hasPermission: boolean;
}

const NoCameraAccess = ({ handleCameraAccess }: NoCameraAccessProps) => {
  return (
    <View style={noCameraStyles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={noCameraStyles.text}>No camera access</Text>
      <Button title="Enable camera" onPress={handleCameraAccess} />
    </View>
  );
};

export default NoCameraAccess;
