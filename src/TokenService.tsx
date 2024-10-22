import AsyncStorage from '@react-native-async-storage/async-storage';
import {JwtPayload, jwtDecode} from 'jwt-decode'; // Doğru şekilde jwtDecode import edildi

const TOKEN_KEY = 'authToken';

// Token içinde yer alan verileri tanımlayan arayüz
interface CustomJwtPayload extends JwtPayload {
  nameid: string;
  email: string;
  BusinessName: string;
  PhoneNumber: string;
}

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
        const decoded = jwtDecode<CustomJwtPayload>(token); // Token CustomJwtPayload tipine göre çözüldü
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
TokenService.decodeToken().then((decodedToken: CustomJwtPayload | null) => {
  if (decodedToken) {
    console.log('ID:', decodedToken.nameid);
    console.log('Business Name:', decodedToken.BusinessName);
    console.log('Phone Number:', decodedToken.PhoneNumber);
    console.log('Email:', decodedToken.email);
  }
});
