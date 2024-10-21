import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  ImageBackground,
  Animated,
  Easing,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {NavigationProp} from '@react-navigation/native';

interface WelcomeScreenProps {
  navigation: NavigationProp<any, any>;
}

const TryScreen = (navigation: WelcomeScreenProps) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [displayedText, setDisplayedText] = useState('');

  const {width, height} = Dimensions.get('window'); // Dinamik ekran boyutları

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

  // Ekran yönlendirmeleri
  function Entry() {
    navigation.navigation.navigate('CustomerEntryScreen');
  }

  function BussinesEntry() {
    navigation.navigation.navigate('BusinessEntryScreen');
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <LinearGradient
          colors={['#FFFFFF', '#A6A6A6']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.linearGradient}>
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
                style={[
                  styles.userButtonImage,
                  {width: width * 0.4, height: height * 0.2},
                ]}
              />
              <Text style={styles.buttonText}>Müşteri</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.imageButton}
              onPress={BussinesEntry}>
              <ImageBackground
                source={require('../images/magazaa.png')}
                style={[
                  styles.imageButtonImage,
                  {width: width * 0.4, height: height * 0.2},
                ]}>
                {/* İçerik burada */}
              </ImageBackground>
              <Text style={styles.buttonText}>Esnaf</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  imageContainer: {
    marginTop: 80,
    alignItems: 'center',
  },
  image: {
    width: Dimensions.get('window').width * 0.58, // Ekran genişliğine göre ayarlandı
    height: Dimensions.get('window').height * 0.24, // Ekran yüksekliğine göre ayarlandı
    borderRadius: 999,
  },
  welcomeText: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 26,
    color: '#0f0214',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 110,
    paddingHorizontal: 5,
  },
  imageButton: {
    alignItems: 'center',
    width: '45%',
  },
  imageButtonImage: {
    marginBottom: 15,
  },
  userButtonImage: {
    marginBottom: 15,
  },
  buttonText: {
    color: '#0f0214',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TryScreen;
