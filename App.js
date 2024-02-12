import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Qrcode2 from './page/Qrcode2';
import Qrcode from './page/Qrcode';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Qrcode2></Qrcode2> */}
      <Qrcode></Qrcode>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
