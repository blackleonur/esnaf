import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  ImageBackground,
  ImageBackgroundBase,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {NavigationProp} from '@react-navigation/native';

interface WelcomeScreenProps {
  navigation: NavigationProp<any, any>;
}

const TryScreen = (navigation: WelcomeScreenProps) => {
  function Entry() {
    navigation.navigation.navigate('CustomerEntryScreen');
  }

  function BussinesEntry() {
    navigation.navigation.navigate('BusinessEntryScreen');
  }

  return (
    <LinearGradient
      colors={['#43C6AC', '#F8FFAE']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={{flex: 1}}>
      {/* Logo */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../images/Logo.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* Esnafa Hoşgeldiniz Metni */}
      <Text style={styles.welcomeText}>Esnafa hoşgeldiniz</Text>

      {/* Yan Yana Butonlar */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.imageButton} onPress={Entry}>
          <Image
            source={require('../images/aaa.png')}
            style={[styles.userButtonImage]}
          />
          <Text style={styles.buttonText}>Müşteri</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.imageButton} onPress={BussinesEntry}>
          <ImageBackground
            source={require('../images/magazaa.png')} // Eğer bir arka plan görseli varsa
            style={[styles.imageButtonImage]}>
            {/* İçerik burada */}
          </ImageBackground>
          <Text style={styles.buttonText}>Esnaf</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    marginTop: 100,
    alignItems: 'center',
  },
  image: {
    width: 280,
    height: 280,
    borderRadius: 999,
  },
  welcomeText: {
    marginTop: 70,
    textAlign: 'center',
    fontSize: 40,
    color: '#0A3140',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 120,
    paddingHorizontal: 20,
  },
  imageButton: {
    alignItems: 'center',
    width: '45%', // Buton genişliği
  },
  imageButtonImage: {
    width: 140, // Görsel genişliği artırıldı
    height: 140, // Görsel yüksekliği artırıldı
    marginBottom: 15, // Görsel ve metin arasındaki boşluk büyütüldü
  },
  userButtonImage: {
    width: 160, // Görsel genişliği artırıldı
    height: 150, // Görsel yüksekliği artırıldı
    marginBottom: 15, // Görsel ve metin arasındaki boşluk büyütüldü
  },
  buttonText: {
    color: '#E8F2F2',
    fontSize: 22, // Yazı boyutu büyütüldü
    fontWeight: 'bold',
  },
});

export default TryScreen;
