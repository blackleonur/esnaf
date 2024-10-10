import React from 'react';
import {View, Text, Image} from 'react-native';
import style from './screen.style';
import {TouchableOpacity} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
interface WelcomeScreenProps {
  navigation: NavigationProp<any, any>;
}

function WelcomeScreen(navigation: WelcomeScreenProps) {
  const Separator = () => {
    return <View style={style.separator} />;
  };
  function Entry() {
    navigation.navigation.navigate('EntryScreen');
  }

  function NonBussinesEntry() {
    navigation.navigation.navigate('BussinesEntryScreen');
  }
  return (
    <View style={style.container}>
      <Image
        style={style.Image}
        source={require('../.././images/Logo.png')}></Image>
      <Text style={style.Text}>ESNAF'a Hoş Geldiniz</Text>
      <View style={style.ButtonContainer}>
        <TouchableOpacity style={style.Button}>
          <Text style={style.ButtonText} onPress={Entry}>
            Giriş Yap
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.Button}>
          <Text style={style.ButtonText}>Esnaf Paneli </Text>
        </TouchableOpacity>
      </View>
      <Separator></Separator>
      <TouchableOpacity style={style.NonEntryButton}>
        <Text style={style.ButtonText}>Giriş Yapmadan Devam Et</Text>
      </TouchableOpacity>
    </View>
  );
}

export default WelcomeScreen;
