import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import BEntryStyle from '../Styles/BEntryStyle';
import {NavigationProp} from '@react-navigation/native';
import {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios'; // Axios for sending the request
import {TokenService} from '../../TokenService';
import Apiurl from '../../Apiurl';

interface SeperatorText {
  text: string;
}

const SeparatorWithText: React.FC<SeperatorText> = ({text = 'VEYA'}) => {
  return (
    <View style={BEntryStyle.separatorContainer}>
      <View style={BEntryStyle.line} />
      <Text style={BEntryStyle.seperatorText}>{text}</Text>
      <View style={BEntryStyle.line} />
    </View>
  );
};

interface EntryScreenProp {
  navigation: NavigationProp<any, any>;
}

function CustomerEntryScreen(navigation: EntryScreenProp) {
  const [loginInput, setLoginInput] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function isValidEmail(input: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  }

  function isValidPhoneNumber(input: string) {
    const phoneRegex = /^[0-9]{10,15}$/;
    return phoneRegex.test(input);
  }

  async function Entry() {
    if (loginInput !== '' && password !== '') {
      if (isValidEmail(loginInput) || isValidPhoneNumber(loginInput)) {
        try {
          // Creating the payload to send to the backend
          const payload = {
            Identifier: loginInput, // This can be either email or phone
            Password: password,
          };

          // Send POST request to the backend (assuming the endpoint is '/api/Business/Login')
          const response = await axios.post(
            `${Apiurl}/api/Business/Login`,
            payload,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          );
          console.log('blablaasd');
          if (response.status === 200) {
            // Navigate to the BusinessHomeScreen if successful
            const token = response.data.result.token;
            console.log('token', token);
            await TokenService.setToken(token); // Save the token
            navigation.navigation.navigate('BussinesHomeScreen');
            navigation.navigation.navigate('BussinesHomeScreen');
          } else {
            Alert.alert(
              'Giriş Başarısız',
              'Lütfen bilgilerinizi kontrol edin.',
            );
          }
        } catch (error) {
          Alert.alert('Giriş Başarısız', 'Sunucuyla bağlantı kurulamadı.');
          console.log(error);
        }
      } else {
        Alert.alert('Geçerli bir email veya telefon numarası giriniz.');
      }
    } else {
      Alert.alert('Lütfen mail/telefon ve şifre alanlarını doldurunuz.');
    }
  }

  function BRegister() {
    navigation.navigation.navigate('BRegisterScreen');
  }

  function goNonBussines() {
    navigation.navigation.navigate('NonBusinessEntryScreen');
  }

  return (
    <LinearGradient
      colors={['#FFFFFF', '#A6A6A6']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={{flex: 1}}>
      <View style={BEntryStyle.container}>
        <Image
          style={BEntryStyle.Image}
          source={require('../../../src/images/Logo.png')}
        />
        <View style={BEntryStyle.HeaderContainer}>
          <Text style={BEntryStyle.HeaderText}>Mail veya Telefon</Text>
          <TextInput
            style={BEntryStyle.Text}
            placeholder="Email adresi veya telefon numarası giriniz"
            value={loginInput}
            onChangeText={setLoginInput}
          />
          <Text style={BEntryStyle.HeaderText}>Şifre</Text>
          <View style={{position: 'relative'}}>
            <TextInput
              style={[BEntryStyle.Text, {paddingRight: 40}]}
              placeholder="Şifrenizi Giriniz"
              secureTextEntry={!isPasswordVisible}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              style={{
                position: 'absolute',
                right: 10,
                top: 9,
              }}>
              <Icon
                name={isPasswordVisible ? 'eye-slash' : 'eye'}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>
          <View>
            <LinearGradient
              colors={['#F36117', '#0a040a']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={{borderRadius: 25, marginTop: 45}}>
              <TouchableOpacity style={BEntryStyle.EntryButton} onPress={Entry}>
                <Text style={BEntryStyle.ButtonText}>Giriş Yap</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
          <SeparatorWithText text="VEYA" />
        </View>
        <View style={BEntryStyle.ButtonContainer}>
          <LinearGradient
            colors={['#F36117', '#0a040a']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={{borderRadius: 25, marginTop: 15}}>
            <TouchableOpacity style={BEntryStyle.Button} onPress={BRegister}>
              <Text style={BEntryStyle.Buttonkayit}>Kayıt ol</Text>
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient
            colors={['#F36117', '#0a040a']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={{borderRadius: 65, marginTop: 20}}>
            <TouchableOpacity
              style={BEntryStyle.Button}
              onPress={goNonBussines}>
              <Text style={BEntryStyle.Buttonkayit}>
                İş Yeri Olmadan Kayıt Ol
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </LinearGradient>
  );
}

export default CustomerEntryScreen;
