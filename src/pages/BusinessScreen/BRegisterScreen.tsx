import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import CheckBox from '@react-native-community/checkbox';
import styles from '../Styles/RegisterScreenStyles';
import {NavigationProp} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

interface RegisterScreenProps {
  navigation: NavigationProp<any, any>;
}
const RegisterScreen = (navigation: RegisterScreenProps) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptKVKK, setAcceptKVKK] = useState(false);

  // E-posta doğrulama regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Şifre doğrulama regex (bir harf ve bir rakam bulunmalı)
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  // Kayıt Ol butonuna basıldığında çalışacak fonksiyon
  const handleRegister = () => {
    // Boş alanların kontrolü
    if (!name || !surname || !email || !phone || !password) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }

    // Telefon numarasının 10 haneli olup olmadığını kontrol et
    if (phone.length !== 10) {
      Alert.alert('Hata', 'Telefon numaranızı eksik yada hatallı tuşladınız.');
      return;
    }

    // E-posta formatının doğru olup olmadığını kontrol et
    if (!emailRegex.test(email)) {
      Alert.alert('Hata', 'Lütfen geçerli bir e-posta adresi giriniz.');
      return;
    }

    // Şifrede bir harf ve bir rakam olup olmadığını kontrol et
    if (!passwordRegex.test(password)) {
      Alert.alert(
        'Hata',
        'Şifre en az 6 karakter uzunluğunda olmalı, bir harf ve bir rakam içermelidir.',
      );
      return;
    }

    navigation.navigation.navigate('BVerificiationScreen');
  };

  const handleTermsPress = () => {
    Alert.alert('Kullanım Şartları', 'Burada kullanım şartları yer alacak...');
  };

  const handleKVKKPress = () => {
    Alert.alert('KVKK Metni', 'Burada KVKK metni yer alacak...');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Kayıt Ol</Text>

      {/* Ad */}
      <Text style={styles.label}>Ad</Text>
      <TextInput
        style={styles.input}
        placeholder="Adınızı girin"
        value={name}
        onChangeText={setName}
      />

      {/* Soyad */}
      <Text style={styles.label}>Soyad</Text>
      <TextInput
        style={styles.input}
        placeholder="Soyadınızı girin"
        value={surname}
        onChangeText={setSurname}
      />

      {/* E-posta */}
      <Text style={styles.label}>E-posta</Text>
      <TextInput
        style={styles.input}
        placeholder="E-posta adresinizi girin"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      {/* Telefon */}
      <Text style={styles.label}>Telefon</Text>
      <View style={styles.phoneContainer}>
        <TouchableOpacity style={styles.countryCode}>
          <Icon name="flag" size={20} color="red" />
          <Text style={styles.countryCodeText}>+90</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.phoneInput}
          placeholder="Telefon numaranızı girin"
          value={phone}
          onChangeText={text => {
            // Yalnızca 10 haneli numara kabul edilecek
            if (text.length <= 10) {
              setPhone(text);
            }
          }}
          keyboardType="phone-pad"
          maxLength={10} // Telefon numarasını 10 hane ile sınırlandır
        />
      </View>

      {/* Şifre */}
      <Text style={styles.label}>Şifre</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Şifrenizi girin"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!passwordVisible}
        />
        <TouchableOpacity
          onPress={() => setPasswordVisible(!passwordVisible)}
          style={styles.eyeIcon}>
          <Icon name={passwordVisible ? 'eye' : 'eye-slash'} size={20} />
        </TouchableOpacity>
      </View>

      {/* Kayıt Ol butonu */}
      <LinearGradient
        colors={['#F36117', '#0a040a']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={{borderRadius: 25}}>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}>
          <Text style={styles.registerButtonText}>Devam Et</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

export default RegisterScreen;
