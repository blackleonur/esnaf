import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import CustomerEntryStyle from '../../Styles/CustomerEntryStyle';
import {NavigationProp} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome'; // İkonu ekledik

interface SeperatorText {
  text: string;
  textColor?: string;
  leftLineColor?: string; // Sol çizgi rengi için
  rightLineColor?: string; // Sağ çizgi rengi için
}

const SeparatorWithText: React.FC<SeperatorText> = ({
  text = 'VEYA',
  textColor = 'black',
  leftLineColor = 'gray', // Varsayılan sol çizgi rengi
  rightLineColor = 'gray', // Varsayılan sağ çizgi rengi
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

  function Register() {
    navigation.navigation.navigate('RegisterScreen');
  }
  return (
    <LinearGradient
      colors={['#FFFFFF', '#A6A6A6']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={{flex: 1}}>
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
              style={{marginLeft: 10, marginRight: 125}}
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
              style={{marginLeft: 10, marginRight: 122}}
            />
            <Text style={CustomerEntryStyle.ButtonWithSsoText}>
              Google ile giriş yap
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

export default CustomerEntryScreen;
