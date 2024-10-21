import React, {useState} from 'react';
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
  Platform,
  PixelRatio,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');

// Ekran boyutuna göre dinamik bir ölçek hesaplayıcı
const scale = width / 375; // 375, iPhone 6'nın genişliği (referans alınan bir cihaz)
const normalize = (size: number) => {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

const BussinesSettingsScreen: React.FC = () => {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(true);

  const handleChangePassword = () => {
    Alert.alert(
      'Şifre Değiştir',
      'Şifre değiştirme sayfasına yönlendirileceksiniz.',
    );
  };

  const handleManageSubscriptions = () => {
    Alert.alert('Abonelikler', 'Aboneliklerinizi yönetin.');
  };

  const handleLanguagePreference = () => {
    Alert.alert('Dil Tercihi', 'Dil tercihini değiştir.');
  };

  const handleTheme = () => {
    Alert.alert('Tema', 'Tema değiştirme sayfasına yönlendirileceksiniz.');
  };

  const handleHelpCenter = () => {
    Alert.alert(
      'Yardım Merkezi',
      'Yardım merkezi sayfasına yönlendirileceksiniz.',
    );
  };

  const handleSendFeedback = () => {
    Alert.alert(
      'Geri Bildirim Gönder',
      'Geri bildirim gönderme sayfasına yönlendirileceksiniz.',
    );
  };

  const handleLogout = () => {
    Alert.alert('Çıkış Yap', 'Hesabınızdan çıkış yapıldı.');
  };

  return (
    <LinearGradient
      colors={['#FFFFFF', '#A6A6A6']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={{flex: 1}}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.header}>Ayarlar</Text>

          {/* Hesap Ayarları */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Hesap Ayarları</Text>
            <TouchableOpacity style={styles.row} onPress={handleChangePassword}>
              <Text style={styles.rowText}>Şifre Değiştir</Text>
              <Ionicons
                name="chevron-forward"
                size={normalize(20)}
                color="#000"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.row}
              onPress={handleManageSubscriptions}>
              <Text style={styles.rowText}>Abonelikleri Yönet</Text>
              <Ionicons
                name="chevron-forward"
                size={normalize(20)}
                color="#000"
              />
            </TouchableOpacity>
          </View>

          {/* Bildirim Ayarları */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Bildirim Ayarları</Text>
            <View style={styles.row}>
              <Text style={styles.rowText}>Push Bildirimleri</Text>
              <Switch
                value={pushNotifications}
                onValueChange={setPushNotifications}
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.rowText}>E-posta Bildirimleri</Text>
              <Switch
                value={emailNotifications}
                onValueChange={setEmailNotifications}
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.rowText}>SMS Bildirimleri</Text>
              <Switch
                value={smsNotifications}
                onValueChange={setSmsNotifications}
              />
            </View>
          </View>

          {/* Uygulama Ayarları */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Uygulama Ayarları</Text>
            <TouchableOpacity
              style={styles.row}
              onPress={handleLanguagePreference}>
              <Text style={styles.rowText}>Dil Tercihi</Text>
              <Text style={styles.rowValue}>Türkçe</Text>
              <Ionicons
                name="chevron-forward"
                size={normalize(20)}
                color="#000"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.row} onPress={handleTheme}>
              <Text style={styles.rowText}>Tema</Text>
              <Text style={styles.rowValue}>Koyu</Text>
              <Ionicons
                name="chevron-forward"
                size={normalize(20)}
                color="#000"
              />
            </TouchableOpacity>
          </View>

          {/* Destek ve Geri Bildirim */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Destek ve Geri Bildirim</Text>
            <TouchableOpacity style={styles.row} onPress={handleHelpCenter}>
              <Text style={styles.rowText}>Yardım Merkezi</Text>
              <Ionicons
                name="chevron-forward"
                size={normalize(20)}
                color="#000"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.row} onPress={handleSendFeedback}>
              <Text style={styles.rowText}>Geri Bildirim Gönder</Text>
              <Ionicons
                name="chevron-forward"
                size={normalize(20)}
                color="#000"
              />
            </TouchableOpacity>
          </View>

          <LinearGradient
            colors={['#F36117', '#0a040a']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={{borderRadius: 65}}>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}>
              <Text style={styles.logoutButtonText}>Çıkış Yap</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: normalize(16),
  },
  header: {
    fontSize: normalize(20),
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: normalize(16),
  },
  section: {
    marginVertical: normalize(16),
  },
  sectionTitle: {
    fontSize: normalize(16),
    fontWeight: 'bold',
    marginBottom: normalize(8),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: normalize(12),
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  rowText: {
    fontSize: normalize(16),
  },
  rowValue: {
    fontSize: normalize(16),
    color: '#888',
  },
  logoutButton: {
    marginTop: normalize(32),
    paddingVertical: normalize(12),
    borderRadius: normalize(8),
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: normalize(16),
    marginTop: -25,
  },
});

export default BussinesSettingsScreen;
