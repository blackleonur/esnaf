// AddressUpdateScreen.tsx
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

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
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AddressUpdateScreen;
