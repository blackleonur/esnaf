import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../Styles/RegisterScreenStyles';
import {NavigationProp} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');

const scale = (size: number) => (width / 375) * size;
const verticalScale = (size: number) => (height / 812) * size;

interface RegisterScreenProps {
  navigation: NavigationProp<any, any>;
}

const NonBussinesRegisterScreen = ({navigation}: RegisterScreenProps) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  const handleNext = () => {
    if (!name || !surname || !email || !phone || !password) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }
    if (phone.length !== 10) {
      Alert.alert('Hata', 'Telefon numaranızı eksik ya da hatalı tuşladınız.');
      return;
    }
    if (!emailRegex.test(email)) {
      Alert.alert('Hata', 'Lütfen geçerli bir e-posta adresi giriniz.');
      return;
    }
    if (!passwordRegex.test(password)) {
      Alert.alert(
        'Hata',
        'Şifre en az 6 karakter uzunluğunda olmalı, bir harf ve bir rakam içermelidir.',
      );
      return;
    }

    // Navigate to the second screen with the collected data
    navigation.navigate('ContiuneNonRegisterScreen', {
      name,
      surname,
      email,
      phone,
      password,
    });
  };

  return (
    <View style={[styles.container, {padding: scale(16)}]}>
      <Text style={[styles.header, {fontSize: scale(22)}]}>Kayıt Ol</Text>

      <Text style={[styles.label, {fontSize: scale(16)}]}>Ad</Text>
      <TextInput
        style={[styles.input, {padding: scale(10), fontSize: scale(14)}]}
        placeholder="Adınızı girin"
        value={name}
        onChangeText={setName}
      />

      <Text style={[styles.label, {fontSize: scale(16)}]}>Soyad</Text>
      <TextInput
        style={[styles.input, {padding: scale(10), fontSize: scale(14)}]}
        placeholder="Soyadınızı girin"
        value={surname}
        onChangeText={setSurname}
      />

      <Text style={[styles.label, {fontSize: scale(16)}]}>E-posta</Text>
      <TextInput
        style={[styles.input, {padding: scale(10), fontSize: scale(14)}]}
        placeholder="E-posta adresinizi girin"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <Text style={[styles.label, {fontSize: scale(16)}]}>Telefon</Text>
      <View style={[styles.phoneContainer, {padding: scale(10)}]}>
        <TouchableOpacity style={[styles.countryCode, {padding: scale(8)}]}>
          <Icon name="flag" size={scale(20)} color="red" />
          <Text style={[styles.countryCodeText, {fontSize: scale(14)}]}>
            +90
          </Text>
        </TouchableOpacity>
        <TextInput
          style={[styles.phoneInput, {padding: scale(10), fontSize: scale(14)}]}
          placeholder="Telefon numaranızı girin"
          value={phone}
          onChangeText={text => {
            if (text.length <= 10) {
              setPhone(text);
            }
          }}
          keyboardType="phone-pad"
          maxLength={10}
        />
      </View>

      <Text style={[styles.label, {fontSize: scale(16)}]}>Şifre</Text>
      <View style={[styles.passwordContainer, {padding: scale(10)}]}>
        <TextInput
          style={[styles.input, {padding: scale(10), fontSize: scale(14)}]}
          placeholder="Şifrenizi girin"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!passwordVisible}
        />
        <TouchableOpacity
          onPress={() => setPasswordVisible(!passwordVisible)}
          style={styles.eyeIcon}>
          <Icon name={passwordVisible ? 'eye' : 'eye-slash'} size={scale(20)} />
        </TouchableOpacity>
      </View>

      <LinearGradient
        colors={['#F36117', '#0a040a']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={{borderRadius: scale(25), marginTop: verticalScale(16)}}>
        <TouchableOpacity
          style={[styles.registerButton, {padding: verticalScale(16)}]}
          onPress={handleNext}>
          <Text style={[styles.registerButtonText, {fontSize: scale(16)}]}>
            Devam Et
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

export default NonBussinesRegisterScreen;
