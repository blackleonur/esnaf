import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import BussinesEntryStyle from '../Styles/BussinessEntryStyle';
import {NavigationProp} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import BEntryScreen from './BEntryScreen';

interface goBentryprop {
  navigation: NavigationProp<any, any>;
}

const BusinessEntryScreen = (navigation: goBentryprop) => {
  function goBentry() {
    navigation.navigation.navigate('BEntryScreen');
  }
  function goRegistery() {
    navigation.navigation.navigate('BRegisterScreen');
  }
  function goNonBussines() {
    navigation.navigation.navigate('NonBusinessEntryScreen');
  }
  return (
    <View style={BussinesEntryStyle.container}>
      <Image
        style={BussinesEntryStyle.Image}
        source={require('../.././images/Logo.png')}
      />
      <View style={BussinesEntryStyle.HeaderContainer}>
        <Text style={BussinesEntryStyle.HeaderText}>Esnaf Paneli</Text>
        <Text style={BussinesEntryStyle.Text}>
          İş yeri portalımıza hoş geldiniz. Burada iş yerinizle ilgili tüm
          işlemleri gerçekleştirebilirsiniz. Giriş yaparak veya kayıt olarak iş
          yerinizin yönetimini kolayca sağlayabilirsiniz.
        </Text>
      </View>
      <View style={BussinesEntryStyle.ButtonContainer}>
        <TouchableOpacity style={BussinesEntryStyle.Button} onPress={goBentry}>
          <Text style={BussinesEntryStyle.ButtonText}>Giriş Yap</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={BussinesEntryStyle.Button}
          onPress={goRegistery}>
          <Text style={BussinesEntryStyle.ButtonText}>Kayıt Ol</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={BussinesEntryStyle.Button}
          onPress={goNonBussines}>
          <Text style={BussinesEntryStyle.ButtonText}>Dükkanım Yok</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BusinessEntryScreen;