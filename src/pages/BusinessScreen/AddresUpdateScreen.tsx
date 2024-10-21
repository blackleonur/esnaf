import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
} from 'react-native';

// Cihazın genişlik ve yüksekliğini alıyoruz
const {width, height} = Dimensions.get('window');

// Dinamik olarak boyutlandırma fonksiyonları
const scale = (size: number) => (width / 375) * size; // iPhone 11 genişliği baz alındı
const verticalScale = (size: number) => (height / 812) * size;

const AddressUpdateScreen: React.FC = () => {
  const [address, setAddress] = useState('');
  const [shopName, setShopName] = useState('');

  const handleSave = () => {
    Alert.alert('Başarılı', 'Adres ve dükkan ismi güncellendi.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adres ve Dükkan İsmini Güncelle</Text>

      <TextInput
        style={styles.input}
        placeholder="Adres"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Dükkan İsmi"
        value={shopName}
        onChangeText={setShopName}
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Kaydet</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scale(16),
    backgroundColor: '#fff',
  },
  title: {
    fontSize: scale(18),
    fontWeight: 'bold',
    marginBottom: verticalScale(16),
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: scale(8),
    padding: scale(10),
    marginBottom: verticalScale(16),
    fontSize: scale(16),
  },
  button: {
    backgroundColor: '#007BFF',
    padding: scale(16),
    borderRadius: scale(8),
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: scale(16),
  },
});

export default AddressUpdateScreen;
