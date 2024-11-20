import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import CustomerEntryStyle from '../../Styles/CustomerEntryStyle';
import {NavigationProp} from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TokenService} from '../../../TokenService';
import Apiurl from '../../../Apiurl';

interface SeperatorText {
  text: string;
  textColor?: string;
  leftLineColor?: string;
  rightLineColor?: string;
}

const SeparatorWithText: React.FC<SeperatorText> = ({
  text = 'VEYA',
  textColor = 'black',
  leftLineColor = 'gray',
  rightLineColor = 'gray',
}) => {
  return (
    <View style={CustomerEntryStyle.separatorContainer}>
      <View
        style={[CustomerEntryStyle.line, {backgroundColor: leftLineColor}]}
      />
      <Text style={[CustomerEntryStyle.seperatorText, {color: textColor}]}>
        {text}
      </Text>
      <View
        style={[CustomerEntryStyle.line, {backgroundColor: rightLineColor}]}
      />
    </View>
  );
};

interface EntryScreenProp {
  navigation: NavigationProp<any, any>;
}

function CustomerEntryScreen({navigation}: EntryScreenProp) {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  async function Entry() {
    if (mail !== '' && password !== '') {
      try {
        const response = await fetch(`${Apiurl}/api/User/Login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Identifier: mail,
            Password: password,
          }),
        });

        const data = await response.json();

        if (data.isSuccess && data.result && data.result.token) {
          const token = data.result.token;
          await TokenService.setToken(token); // Token'ı kaydet
          navigation.navigate('FindScreen'); // Başarılı giriş sonrası yönlendirme
        } else {
          Alert.alert('Giriş Başarısız', 'Geçersiz kullanıcı adı veya şifre.');
        }
      } catch (error) {
        console.error('Giriş isteğinde hata:', error);
        Alert.alert(
          'Giriş Başarısız',
          'Bir hata oluştu, lütfen tekrar deneyin.',
        );
      }
    } else {
      Alert.alert('Lütfen mail ve şifre alanlarını doldurunuz.');
    }
  }

  function Register() {
    navigation.navigate('RegisterScreen');
  }

  return (
    <LinearGradient
      colors={['#FFFFFF', '#A6A6A6']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={{flex: 1}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={CustomerEntryStyle.container}>
          <Image
            style={CustomerEntryStyle.Image}
            source={require('../../../images/Logo.png')}
          />
          <View style={CustomerEntryStyle.HeaderContainer}>
            <Text style={CustomerEntryStyle.HeaderText}>Mail</Text>
            <TextInput
              style={CustomerEntryStyle.Text}
              placeholder="E mail Adresi Giriniz"
              value={mail}
              onChangeText={setMail}
            />
            <Text style={CustomerEntryStyle.HeaderText}>Şifre</Text>
            <View style={{position: 'relative'}}>
              <TextInput
                style={[CustomerEntryStyle.Text, {paddingRight: 40}]}
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

            <View style={CustomerEntryStyle.entrybuttoncontainer}>
              <LinearGradient
                colors={['#F36117', '#0a040a']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={{borderRadius: 25}}>
                <TouchableOpacity style={CustomerEntryStyle.EntryButton}>
                  <Text style={CustomerEntryStyle.ButtonText} onPress={Entry}>
                    Giriş Yap
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>

            <SeparatorWithText
              text="VEYA"
              textColor="gray"
              leftLineColor="gray"
              rightLineColor="gray"
            />
          </View>
          <View style={CustomerEntryStyle.ButtonContainer}>
            <TouchableOpacity
              style={CustomerEntryStyle.Button}
              onPress={Register}>
              <Text style={CustomerEntryStyle.Buttonkayit}>Kayıt ol</Text>
            </TouchableOpacity>
            <TouchableOpacity style={CustomerEntryStyle.Button}>
              <Icon
                name="apple"
                size={25}
                color="black"
                style={{marginRight: 'auto', marginLeft: 5}}
              />
              <Text style={CustomerEntryStyle.ButtonWithSsoText}>
                Apple ile giriş yap
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={CustomerEntryStyle.Button}>
              <Icon
                name="google"
                size={25}
                color="black"
                style={{marginRight: 'auto', marginLeft: 5}}
              />
              <Text style={CustomerEntryStyle.ButtonWithSsoText}>
                Google ile giriş yap
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

export default CustomerEntryScreen;
