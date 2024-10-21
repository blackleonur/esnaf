import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';

const {width, height} = Dimensions.get('window');

const SettingsScreen = () => {
  const [pushEnabled, setPushEnabled] = React.useState(false);
  const [emailEnabled, setEmailEnabled] = React.useState(false);
  const [smsEnabled, setSmsEnabled] = React.useState(false);

  const togglePush = () => setPushEnabled(previousState => !previousState);
  const toggleEmail = () => setEmailEnabled(previousState => !previousState);
  const toggleSms = () => setSmsEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('./../../../images/Logo.png')} // Buraya kendi logo yolunuzu ekleyin
          style={styles.logo}
          resizeMode="contain" // Görselin boyutuna göre orantılı şekilde görünmesini sağlar
        />
      </View>

      {/* Ayarlar Başlığı */}
      <Text style={styles.header}>Ayarlar</Text>

      {/* Genel Ayarlar */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Genel Ayarlar</Text>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Dil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Görünüm</Text>
        </TouchableOpacity>
      </View>

      {/* Bildirim Ayarları */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bildirim Ayarları</Text>
        <View style={styles.optionWithSwitch}>
          <Text style={styles.optionText}>Uygulama Bildirimleri</Text>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={pushEnabled ? '#f5dd4b' : '#f4f3f4'}
            onValueChange={togglePush}
            value={pushEnabled}
          />
        </View>
        <View style={styles.optionWithSwitch}>
          <Text style={styles.optionText}>E-posta Bildirimleri</Text>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={emailEnabled ? '#f5dd4b' : '#f4f3f4'}
            onValueChange={toggleEmail}
            value={emailEnabled}
          />
        </View>
        <View style={styles.optionWithSwitch}>
          <Text style={styles.optionText}>SMS Bildirimleri</Text>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={smsEnabled ? '#f5dd4b' : '#f4f3f4'}
            onValueChange={toggleSms}
            value={smsEnabled}
          />
        </View>
      </View>

      {/* Gizlilik Ayarları */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Gizlilik Ayarları</Text>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Şifre Değiştir</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>İki Faktörlü Kimlik Doğrulama</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Uygulama İzinleri</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: width * 0.04, // Dinamik padding
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: height * 0.02, // Dinamik margin
  },
  logo: {
    width: width * 0.4, // Cihaz genişliğine göre dinamik olarak %50 genişlik
    height: height * 0.06, // Cihaz yüksekliğine göre dinamik olarak %10 yükseklik
  },
  header: {
    fontSize: width * 0.06, // Dinamik font boyutu
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: height * 0.01, // Dinamik margin
  },
  section: {
    marginBottom: height * 0.02, // Dinamik margin
  },
  sectionTitle: {
    fontSize: width * 0.04, // Dinamik font boyutu
    fontWeight: 'bold',
    marginBottom: height * 0.009,
    color: '#333',
  },
  option: {
    backgroundColor: '#fff',
    padding: width * 0.025, // Dinamik padding
    borderRadius: 8,
    marginBottom: height * 0.01, // Dinamik spacing
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  optionText: {
    fontSize: width * 0.042, // Dinamik font boyutu
    color: '#333',
  },
  optionWithSwitch: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: width * 0.025, // Dinamik padding
    borderRadius: 8,
    marginBottom: height * 0.012, // Dinamik spacing
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
});

export default SettingsScreen;
