import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const BussinesEntryStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  HeaderContainer: {
    margin: width * 0.05, // Dinamik margin
    alignSelf: 'center',
    padding: width * 0.02, // Dinamik padding
  },
  HeaderText: {
    alignSelf: 'center',
    fontSize: width * 0.065, // Dinamik font boyutu
    fontWeight: 'bold', // 'black' yerine 'bold' kullanıldı
    color: 'black',
  },
  Text: {
    fontSize: width * 0.055, // Dinamik font boyutu
    color: 'black',
    margin: width * 0.03, // Dinamik margin
    marginTop: height * 0.06, // Dinamik margin
    fontWeight: 'bold', // 'black' yerine 'bold' kullanıldı
  },
  ButtonContainer: {
    marginTop: height * 0.014, // Dinamik margin
    paddingBottom: width * 0.02,
    paddingLeft: width * 0.02, // Dinamik padding left
    paddingRight: width * 0.02, // Dinamik padding right
  },
  Button: {
    borderRadius: width * 0.03, // Dinamik border-radius

    padding: height * 0.005, // Dinamik padding
    paddingLeft: width * 0.2, // Dinamik padding left
    paddingRight: width * 0.2, // Dinamik padding right
    paddingBottom: width * 0.0,
    margin: width * 0.015, // Dinamik margin
    marginTop: width * 0.005, // Dinamik margin
  },
  ButtonText: {
    fontSize: width * 0.055, // Dinamik font boyutu
    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#202020',
  },
  Image: {
    width: width * 0.45, // Dinamik resim boyutu
    height: width * 0.45, // Dinamik resim boyutu
    alignSelf: 'center',
    marginTop: height * 0.04, // Dinamik margin
  },
  Linear: {
    borderRadius: 25,
    marginBottom: height * 0.02,
  },
});

export default BussinesEntryStyle;
