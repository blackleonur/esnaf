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
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'; // İkonu ekledik
import LinearGradient from 'react-native-linear-gradient';
interface SeperatorText {
  text: string;
}

const SeparatorWithText: React.FC<SeperatorText> = ({text = 'VEYA'}) => {
  return (
    <View style={BEntryStyle.separatorContainer}>
      <View style={BEntryStyle.line} />
      <Text style={BEntryStyle.text}>{text}</Text>
      <View style={BEntryStyle.line} />
    </View>
  );
};
interface EntryScreenProp {
  navigation: NavigationProp<any, any>;
}

function CustomerEntryScreen(navigation: EntryScreenProp) {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function Entry() {
    if (mail !== '' && password !== '') {
      // Mail ve şifre doluysa FindScreen'e yönlendir
      navigation.navigation.navigate('FindScreen');
    } else {
      // Hata durumu için bir uyarı verebilirsiniz
      Alert.alert('Lütfen mail ve şifre alanlarını doldurunuz.');
    }
  }
  function goNonBussines() {
    navigation.navigation.navigate('NonBussinesRegisterScreen');
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
          <Text style={BEntryStyle.HeaderText}>Mail</Text>
          <TextInput
            style={BEntryStyle.Text}
            placeholder="E mail Adresi Giriniz"
            value={mail}
            onChangeText={setMail}></TextInput>
          <Text style={BEntryStyle.HeaderText}>Şifre</Text>
          <View style={{position: 'relative'}}>
            <TextInput
              style={[BEntryStyle.Text, {paddingRight: 40}]}
              placeholder="Şifrenizi Giriniz"
              secureTextEntry={!isPasswordVisible} // Şifreyi göster/gizle
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)} // Tıklanınca görünürlüğü değiştir
              style={{
                position: 'absolute', // İkonun pozisyonunu ayarlıyoruz
                right: 10, // Sağ tarafa hizalıyoruz
                top: 9, // İkonu TextInput ile dikey olarak ortalıyoruz
              }}>
              <Icon
                name={isPasswordVisible ? 'eye-slash' : 'eye'} // Şifre görünürse 'eye-slash', değilse 'eye' ikonu
                size={24}
                color="gray"
                style={{marginRight: 10}} // Stil ayarları (ikon boyutu ve sağ marj)
              />
            </TouchableOpacity>
          </View>
          <View>
            <LinearGradient
              colors={['#F36117', '#0a040a']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={{borderRadius: 65, marginTop: 20}}>
              <TouchableOpacity style={BEntryStyle.EntryButton}>
                <Text style={BEntryStyle.ButtonText} onPress={Entry}>
                  Giriş Yap
                </Text>
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
            style={{borderRadius: 65, marginTop: 20}}>
            <TouchableOpacity
              style={BEntryStyle.Button}
              onPress={goNonBussines}>
              <Text style={BEntryStyle.Buttonkayit}>Kayıt ol</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </LinearGradient>
  );
}

export default CustomerEntryScreen;
