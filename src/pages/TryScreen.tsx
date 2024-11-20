import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { NavigationProp } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { scale } from 'src/utils/scaling';

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
      colors={['#FCFEFD', '#0A3140']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}>
      {/* Logo */}
      <View style={styles.imageContainer}>
        <Image source={require('../images/Logo.png')} style={styles.image} resizeMode='contain' />
      </View>

      {/* Esnafa Hoşgeldiniz Metni */}
      <Text style={styles.welcomeText}>Esnafa hoşgeldiniz</Text>

      {/* Yan Yana Butonlar */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.imageButton} onPress={Entry}>
          <Image
            source={require('../images/Customer.png')} // Müşteri görseli
            style={styles.imageButtonImage}
          />
          <Text style={styles.buttonText}>Müşteri</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.imageButton} onPress={BussinesEntry}>
          <Image
            source={require('../images/Market.png')} // Esnaf görseli
            style={styles.imageButtonImage}
          />
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
    width: scale(280), //TODO: scale fonksiyonu ile boyutlandırarak tüm cihazlarda responsive görünür
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
    width: 120, // Görsel genişliği artırıldı
    height: 120, // Görsel yüksekliği artırıldı
    marginBottom: 15, // Görsel ve metin arasındaki boşluk büyütüldü
  },
  buttonText: {
    color: '#E8F2F2',
    fontSize: 22, // Yazı boyutu büyütüldü
    fontWeight: 'bold',
  },
});

export default TryScreen;
