import AsyncStorage from '@react-native-async-storage/async-storage';
import {JwtPayload, jwtDecode} from 'jwt-decode';

const TOKEN_KEY = 'authToken';

// Business ve User için ortak verileri tanımlayan genel arayüz
interface BaseJwtPayload extends JwtPayload {
  nameid: string;
  email: string;
  PhoneNumber: string;
}

// Business kullanıcısına özel verileri tanımlayan arayüz
interface BusinessJwtPayload extends BaseJwtPayload {
  BusinessName: string;
}

// User kullanıcısına özel verileri tanımlayan arayüz
interface UserJwtPayload extends BaseJwtPayload {
  FirstName: string;
  LastName: string;
}

// Kullanıcı türlerini kapsayan birleşik tip
type CustomJwtPayload = BusinessJwtPayload | UserJwtPayload;

export const TokenService = {
  async setToken(token: string) {
    try {
      await AsyncStorage.setItem(TOKEN_KEY, token);
      console.log('Token başarıyla kaydedildi');
    } catch (error) {
      console.error('Token kaydedilirken hata oluştu', error);
    }
  },

  async getToken() {
    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      console.log('Alınan token:', token);
      return token;
    } catch (error) {
      console.error('Token alınırken hata oluştu', error);
    }
    return null;
  },

  async decodeToken() {
    try {
      const token = await this.getToken();
      if (token) {
        const decoded = jwtDecode<CustomJwtPayload>(token);
        console.log('Decoded token:', decoded);
        return decoded;
      }
    } catch (error) {
      console.error('Token decode edilirken hata oluştu', error);
    }
    return null;
  },

  async removeToken() {
    try {
      await AsyncStorage.removeItem(TOKEN_KEY);
      console.log('Token başarıyla silindi');
    } catch (error) {
      console.error('Token silinirken hata oluştu', error);
    }
  },
};

// Token'ı kullanarak ilgili verilere erişim
TokenService.decodeToken().then(decodedToken => {
  if (decodedToken) {
    console.log('ID:', decodedToken.nameid);
    console.log('Email:', decodedToken.email);
    console.log('Phone Number:', decodedToken.PhoneNumber);

    if ('BusinessName' in decodedToken) {
      // Business kullanıcısı için
      console.log('Business Name:', decodedToken.BusinessName);
    } else if ('FirstName' in decodedToken && 'LastName' in decodedToken) {
      // User kullanıcısı için
      console.log('First Name:', decodedToken.FirstName);
      console.log('Last Name:', decodedToken.LastName);
    }
  }
});
