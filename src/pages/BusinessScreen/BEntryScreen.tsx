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
      navigation.navigation.navigate('BussinesHomeScreen');
    } else {
      Alert.alert('Lütfen mail ve şifre alanlarını doldurunuz.');
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
              style={BEntryStyle.NonMarketButton}
              onPress={goNonBussines}>
              <Text style={BEntryStyle.NonMarketText}>
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
