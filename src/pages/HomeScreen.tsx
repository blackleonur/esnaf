import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  ImageBackground,
  ImageBackgroundBase,
  Animated, // Animated import
  Easing,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {NavigationProp} from '@react-navigation/native';
import {useRef, useEffect} from 'react';
import {useState} from 'react';

interface WelcomeScreenProps {
  navigation: NavigationProp<any, any>;
}

const TryScreen = (navigation: WelcomeScreenProps) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [displayedText, setDisplayedText] = useState(''); // Ekranda gösterilecek metin

  useEffect(() => {
    const startAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.2, // Büyüme oranı
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1, // Orijinal boyut
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    };

    startAnimation(); // Animasyonu başlat
  }, [scaleAnim]);

  // Harflerin tek tek yazılması animasyonu

  function Entry() {
    navigation.navigation.navigate('CustomerEntryScreen');
  }

  function BussinesEntry() {
    navigation.navigation.navigate('BusinessEntryScreen');
  }

  return (
    <LinearGradient
      colors={['#FFFFFF', '#A6A6A6']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={{flex: 1}}>
      {/* Logo */}
      <View style={styles.imageContainer}>
        <Animated.Image
          source={require('../images/Logo.png')}
          style={[styles.image, {transform: [{scale: scaleAnim}]}]} // Animasyonlu stil
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
    color: '#0f0214',
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
    color: '#0f0214',
    fontSize: 22, // Yazı boyutu büyütüldü
    fontWeight: 'bold',
  },
});

export default TryScreen;
