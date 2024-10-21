import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const CustomerEntryStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width * 0.04, // Ekranın genişliğine göre dinamik padding
  },
  HeaderContainer: {
    marginTop: height * 0.01, // Dinamik margin top
    flex: 1,
  },
  HeaderText: {
    fontSize: width * 0.045, // Dinamik font boyutu
    fontWeight: 'bold',
    marginBottom: height * 0.01,
    marginTop: height * 0.01,
  },
  Text: {
    fontSize: width * 0.04, // Dinamik font boyutu
    fontWeight: '400',
    borderWidth: 0.4,
    borderRadius: width * 0.03, // Dinamik border-radius
    paddingLeft: width * 0.02, // Dinamik padding left
    alignContent: 'center',
    height: height * 0.06, // Dinamik height (düğme veya input boyutu)
  },
  ButtonContainer: {
    marginTop: height * 0.015, // Dinamik margin top
    flex: 1,
  },
  Button: {
    flexDirection: 'row',
    marginTop: height * 0.02,
    borderWidth: 0.3,
    paddingVertical: height * 0.015, // Dinamik padding vertical
    borderRadius: width * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonImage: {
    width: width * 0.05, // Dinamik resim boyutu
    height: width * 0.05,
    marginRight: width * 0.3, // Dinamik margin right
    marginLeft: width * 0.03, // Dinamik margin left
  },
  ButtonText: {
    fontWeight: '700',
    fontSize: width * 0.04, // Dinamik font boyutu
    color: '#c9c5c9',
  },
  Image: {
    width: width * 0.2, // Dinamik resim boyutu
    height: width * 0.2,
    alignSelf: 'center',
    marginTop: height * 0.035, // Dinamik margin top
  },
  entrybuttoncontainer: {
    marginTop: height * 0.07,
    alignItems: 'center',
  },
  EntryButton: {
    paddingVertical: height * 0.02, // Dinamik padding vertical
    paddingHorizontal: width * 0.35, // Dinamik padding horizontal
    borderRadius: width * 0.06, // Dinamik border-radius
    alignItems: 'center',
  },
  separatorContainer: {
    marginTop: height * 0.07,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: height * 0.015,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#C3C5C6', // Çizgi rengi
  },
  seperatorText: {
    fontSize: width * 0.03, // Dinamik font boyutu
    color: '#D5D6D7',
    alignSelf: 'center',
    marginHorizontal: width * 0.06, // Dinamik margin horizontal
  },
  Buttonkayit: {
    margin: 'auto',
    fontWeight: '700',
    fontSize: width * 0.04, // Dinamik font boyutu
  },
  ButtonWithSsoText: {
    fontWeight: '700',
    fontSize: width * 0.04, // Dinamik font boyutu
    fontStyle: 'normal',
    alignSelf: 'center',
    marginRight: width * 0.25, // Dinamik margin right
  },
});

export default CustomerEntryStyle;
