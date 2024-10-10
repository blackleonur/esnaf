import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import CustomerEntryStyle from '../Styles/CustomerEntryStyle';
import {NavigationProp} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'; // İkonu ekledik

interface SeperatorText {
  text: string;
}

const SeparatorWithText: React.FC<SeperatorText> = ({text = 'VEYA'}) => {
  return (
    <View style={CustomerEntryStyle.separatorContainer}>
      <View style={CustomerEntryStyle.line} />
      <Text style={CustomerEntryStyle.text}>{text}</Text>
      <View style={CustomerEntryStyle.line} />
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
    <View style={CustomerEntryStyle.container}>
      <Image
        style={CustomerEntryStyle.Image}
        source={require('../../../src/images/Logo.png')}
      />
      <View style={CustomerEntryStyle.HeaderContainer}>
        <Text style={CustomerEntryStyle.HeaderText}>Mail</Text>
        <TextInput
          style={CustomerEntryStyle.Text}
          placeholder="E mail Adresi Giriniz"
          value={mail}
          onChangeText={setMail}></TextInput>
        <Text style={CustomerEntryStyle.HeaderText}>Şifre</Text>
        <View style={{position: 'relative'}}>
          <TextInput
            style={[CustomerEntryStyle.Text, {paddingRight: 40}]}
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
          <TouchableOpacity style={CustomerEntryStyle.EntryButton}>
            <Text style={CustomerEntryStyle.ButtonText} onPress={Entry}>
              Giriş Yap
            </Text>
          </TouchableOpacity>
        </View>
        <SeparatorWithText text="VEYA" />
      </View>
      <View style={CustomerEntryStyle.ButtonContainer}>
        <TouchableOpacity
          style={CustomerEntryStyle.Button}
          onPress={goNonBussines}>
          <Text style={CustomerEntryStyle.Buttonkayit}>Kayıt ol</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default CustomerEntryScreen;
