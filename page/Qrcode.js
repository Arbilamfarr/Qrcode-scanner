import React, { useState, useEffect } from 'react';
import { View, Text,StyleSheet, Button, Alert, Dimensions, Image } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as ImagePicker from 'expo-image-picker';

const dimention=Dimensions.get('screen')
const Qrcode = () => {
    
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
      const galleryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (galleryPermission.status !== 'granted') {
        Alert.alert('Permission not granted to access gallery');
      }
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(false);
    Alert.alert('QR Code Scanned', data);
  };

  const openCamera = () => {
    setScanned(!scanned);
  };
  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
        setScanned(!scanned);
     
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {hasPermission === null ? (
        <Text>Requesting for camera permission</Text>
      ) : hasPermission === false ? (
        <Text>No access to camera</Text>
      ) : (
        <View>
          {scanned ? (
            <View>
            <BarCodeScanner
              onBarCodeScanned={!scanned ? undefined : handleBarCodeScanned}
              style={{ height: dimention.height/2, width: dimention.width-50 }}
            />
            <Text style={styles.text}>Fixed camera of the qr code</Text>
            <Button title="Go back" onPress={openCamera} />
            </View>
          ) : (
            <View>
              <Image source={require('./../assets/qrcode.jpg')} style={styles.image}></Image>
              <Button title="Scan qr code" onPress={openCamera} />
              <Button title="Open Gallery" onPress={openGallery} />
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default Qrcode;
const styles = StyleSheet.create({
containned:{
    flex:1,
},
text:{
    textAlign:'center',
    marginVertical:20
},
image:{
    width:dimention.width-50,
    height:dimention.height/2,
    resizeMode:'cover',
    borderRadius:20,
    marginVertical:20,
}
})