import {StyleSheet} from 'react-native';
const BussinesEntryStyle = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FFFFFF'},
  HeaderContainer: {margin: 25, alignSelf: 'center', padding: 8},
  HeaderText: {
    alignSelf: 'center',
    fontSize: 35,
    fontWeight: 'black',
    color: 'black',
  },
  Text: {
    fontSize: 22,
    color: 'black',
    margin: 12,
    marginTop: 80,
    fontWeight: 'black',
  },
  ButtonContainer: {
    marginTop: 20,
  },
  Button: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 5,
    paddingLeft: 80,
    paddingRight: 80,
    backgroundColor: '#44A6E3',
    margin: 10,
  },
  ButtonText: {
    fontSize: 22,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#202020',
  },
  Image: {width: 225, height: 225, alignSelf: 'center', marginTop: 45},
});

export default BussinesEntryStyle;
