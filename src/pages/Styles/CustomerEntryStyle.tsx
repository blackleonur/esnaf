import {StyleSheet} from 'react-native';
const CustomerEntryStyle = StyleSheet.create({
  container: {flex: 1},
  HeaderContainer: {marginLeft: 6, marginRight: 6, marginTop: 45},
  HeaderText: {fontSize: 24, fontWeight: 'bold', marginBottom: 9, marginTop: 9},
  Text: {
    fontSize: 17,
    fontWeight: '400',
    borderWidth: 0.4,
    borderRadius: 9,
    paddingLeft: 7,
    alignContent: 'center',
  },
  ButtonContainer: {marginTop: 10},
  Button: {
    flexDirection: 'row',
    marginTop: 15,
    borderWidth: 0.4,
    paddingBottom: 15,
    paddingTop: 15,
    borderRadius: 9,
    margin: 7,
    alignItems: 'center',
  },
  buttonImage: {
    width: 25,
    height: 25,
    marginRight: 115,
    marginLeft: 12,
  },
  ButtonText: {fontWeight: '700', fontSize: 18, color: '#c9c5c9'},
  Image: {width: 175, height: 175, alignSelf: 'center', marginTop: 25},
  entrybuttoncontainer: {marginTop: 55},
  EntryButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
  },

  separatorContainer: {
    marginTop: 35,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#C3C5C6', // Çizgi rengi
  },
  text: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 16,
    color: '#D5D6D7', // Yazı rengi
  },
  Buttonkayit: {
    marginLeft: 190,
    fontWeight: '700',
    fontSize: 18,
  },
  NonMarketText: {
    alignItems: 'center',
    fontWeight: '700',
    fontSize: 18,
    paddingLeft: 116,
  },
  NonMarketButton: {
    flexDirection: 'row',
    backgroundColor: '#C3C5C6',
    marginTop: 15,
    borderWidth: 1,
    paddingBottom: 15,
    paddingTop: 15,
    borderRadius: 9,
    margin: 7,
  },
  ButtonWithSsoText: {
    fontWeight: '700',
    fontSize: 18,
    fontStyle: 'normal',
  },
  seperatorText: {
    fontSize: 16,
    color: '#D5D6D7',
    alignSelf: 'center',
    marginHorizontal: 22,
  },
});

export default CustomerEntryStyle;
