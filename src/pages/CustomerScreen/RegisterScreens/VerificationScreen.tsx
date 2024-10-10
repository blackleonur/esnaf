import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import {NavigationProp} from '@react-navigation/native';

interface VerificationScreenProp {
  navigation: NavigationProp<any, any>;
}

const VerificationScreen: React.FC<VerificationScreenProp> = ({navigation}) => {
  const [code, setCode] = useState('');

  const handleVerify = () => {
    // Herhangi bir kodla doğrulamayı kabul et
    if (code) {
      Alert.alert('Kaydınız başarıyla oluşturulmuştur');
      navigation.navigate('FindScreen');
      Alert.alert("Esnaf'a Hoşgeldiniz ");
    } else {
      Alert.alert('Hata', 'Lütfen doğrulama kodunu giriniz.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Doğrulama Kodu</Text>
      <TextInput
        style={styles.input}
        placeholder="Doğrulama kodunu girin"
        value={code}
        onChangeText={setCode}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
        <Text style={styles.verifyButtonText}>Doğrula</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', padding: 16},
  header: {fontSize: 24, textAlign: 'center', marginBottom: 20},
  input: {borderWidth: 1, padding: 10, marginBottom: 20, borderRadius: 5},
  verifyButton: {backgroundColor: 'blue', padding: 15, alignItems: 'center'},
  verifyButtonText: {color: 'white', fontSize: 18},
});

export default VerificationScreen;
