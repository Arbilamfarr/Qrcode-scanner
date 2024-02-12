import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import QRCodeScanner from 'react-native-qrcode-scanner';

const Qrcode2 = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    (async () => {
      const galleryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (galleryPermission.status !== 'granted') {
        Alert.alert('Permission not granted to access gallery');
      }
    })();
  }, []);

  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  };

  const onReadQRCode = (event) => {
    if (event.data) {
      Alert.alert('QR Code Scanned', event.data);
    } else {
      Alert.alert('No QR Code found in the image');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>QR Code Scanner from Image</Text>

      <View style={styles.imageContainer}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.image} />
        ) : (
          <Text>No image selected</Text>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Open Gallery" onPress={openGallery} />
      </View>

      {selectedImage && (
        <QRCodeScanner
          onRead={onReadQRCode}
          flashMode={QRCodeScanner.Constants.FlashMode.auto}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  imageContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 20,
  },
  image: {
    width: 300,
    height: 200,
  },
  buttonContainer: {
    width: '80%',
  },
});

export default Qrcode2;
