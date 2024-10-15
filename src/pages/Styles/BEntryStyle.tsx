import {cloneElement} from 'react';
import {StyleSheet} from 'react-native';
const BEntryStyle = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FFFFFF'},
  HeaderContainer: {marginLeft: 6, marginRight: 6, marginTop: 45},
  HeaderText: {fontSize: 24, color: 'black', marginBottom: 9, marginTop: 9},
  Text: {
    fontSize: 17,
    fontWeight: '400',
    borderWidth: 1,
    borderRadius: 9,
    paddingLeft: 7,
    alignContent: 'center',
  },
  ButtonContainer: {marginLeft: 5, marginRight: 5},
  Button: {
    paddingBottom: 10,
    paddingTop: 10,

    margin: 7,
  },
  buttonImage: {
    width: 25,
    height: 25,
    marginRight: 115,
    marginLeft: 12,
  },
  ButtonText: {color: '#fff', fontSize: 18},
  Image: {width: 175, height: 175, alignSelf: 'center', marginTop: 25},
  EntryButton: {
    paddingHorizontal: 50,
    paddingVertical: 15,
    alignItems: 'center', // Buton içeriğini yatayda ortalar
  },
  separatorContainer: {
    marginTop: 35,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    alignContent: 'center',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'gray', // Çizgi rengi
  },
  text: {
    marginHorizontal: 10,
    fontSize: 16,
    color: 'gray', // Yazı rengi
    alignSelf: 'center',
    paddingLeft: 30,
    paddingRight: 30,
  },
  Buttonkayit: {
    textAlign: 'center', // Yazıyı ortalar
    color: '#fff',
    fontSize: 18,
  },
  NonMarketText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
  },
  NonMarketButton: {
    flexDirection: 'row',
    justifyContent: 'center', // Button içeriğini yatayda ortalar
    paddingBottom: 10,
    paddingTop: 10,
    borderRadius: 5,
    margin: 7,
  },
});

export default BEntryStyle;
