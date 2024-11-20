import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CheckBox from '@react-native-community/checkbox';
import styles from './Styles/RegisterScreenStyles';
import {NavigationProp} from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import Apiurl from '../Apiurl';

interface RegisterScreenProps {
  navigation: NavigationProp<any, any>;
}

const RegisterScreen = (navigation: RegisterScreenProps) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [addres, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptKVKK, setAcceptKVKK] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  const handleRegister = async () => {
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

    if (!acceptTerms || !acceptKVKK) {
      Alert.alert(
        'Hata',
        'Lütfen kullanım şartlarını ve KVKK metnini okuyup kabul ettiğinizi onaylayın.',
      );
      return;
    }

    const userData = {
      firstName: name,
      lastName: surname,
      email: email,
      phone: phone,
      password: password,
      adress: addres,
    };

    try {
      const response = await axios.post(
        `${Apiurl}/api/User/Register`,
        userData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.status === 200) {
        Alert.alert('Başarılı', 'Kayıt başarılı!');
        navigation.navigation.navigate('VerificationScreen');
      } else {
        Alert.alert('Hata', 'Kayıt sırasında bir hata oluştu.');
      }
    } catch (error) {
      Alert.alert('Hata', 'Kayıt işlemi başarısız oldu.');
      console.error(error);
    }
  };

  const handleTermsPress = () => {
    Alert.alert('Kullanım Şartları', 'Burada kullanım şartları yer alacak...', [
      {
        text: 'Okudum, Anladım, Kabul Ediyorum',
        onPress: () => setAcceptTerms(true),
      },
      {
        text: 'Vazgeç',
        style: 'cancel',
      },
    ]);
  };

  const handleKVKKPress = () => {
    Alert.alert('KVKK Metni', 'Burada KVKK metni yer alacak...', [
      {
        text: 'Okudum, Anladım, Kabul Ediyorum',
        onPress: () => setAcceptKVKK(true),
      },
      {
        text: 'Vazgeç',
        style: 'cancel',
      },
    ]);
  };

  return (
    <LinearGradient
      colors={['#FFFFFF', '#A6A6A6']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.header}>Kayıt Ol</Text>

        <Text style={styles.label}>Ad</Text>
        <TextInput
          style={styles.input}
          placeholder="Adınızı girin"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Soyad</Text>
        <TextInput
          style={styles.input}
          placeholder="Soyadınızı girin"
          value={surname}
          onChangeText={setSurname}
        />

        <Text style={styles.label}>E-posta</Text>
        <TextInput
          style={styles.input}
          placeholder="E-posta adresinizi girin"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Text style={styles.label}>Adres</Text>
        <TextInput
          style={styles.input}
          placeholder="Adresinizi girin"
          value={addres}
          onChangeText={setAddress}
        />

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
              if (text.length <= 10) {
                setPhone(text);
              }
            }}
            keyboardType="phone-pad"
            maxLength={10}
          />
        </View>

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

        <View style={styles.checkboxContainer}>
          <CheckBox
            value={acceptTerms}
            onValueChange={() => {}}
            disabled={!acceptTerms}
          />
          <TouchableOpacity onPress={handleTermsPress}>
            <Text style={styles.checkboxText}>
              Kullanım şartlarını kabul ediyorum
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.checkboxContainer}>
          <CheckBox
            value={acceptKVKK}
            onValueChange={() => {}}
            disabled={!acceptKVKK}
          />
          <TouchableOpacity onPress={handleKVKKPress}>
            <Text style={styles.checkboxText}>
              KVKK metnini okudum, onaylıyorum
            </Text>
          </TouchableOpacity>
        </View>

        <LinearGradient
          colors={['#F36117', '#0a040a']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={{borderRadius: 25}}>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}>
            <Text style={styles.registerButtonText}>Kayıt Ol</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </LinearGradient>
  );
};

export default RegisterScreen;
