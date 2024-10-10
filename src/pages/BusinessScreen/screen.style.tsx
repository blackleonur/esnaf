import {Image, StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B7B597',
    justifyContent: 'center',
  },
  Image: {
    borderRadius: 100,
    width: 250,
    height: 250,
    alignSelf: 'center',
    margin: 52,
  },
  Text: {
    alignSelf: 'center',
    fontSize: 28,
    color: 'black',
    fontWeight: '900',
    marginTop: 25,
  },
  ButtonContainer: {
    flex: 1,
    flexDirection: 'column',
    margin: 30,
    marginTop: 75,
  },

  Button: {
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    margin: 5,
    backgroundColor: '#F5F5DC',
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 12,
    paddingBottom: 12,
  },
  ButtonText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  NonEntryButton: {
    marginTop: 45,
    alignItems: 'center',
    borderRadius: 12,
    margin: 35,
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 4,
    paddingBottom: 12,
    marginBottom: 50,
  },
  separator: {
    height: 1, // Yükseklik 1 px olarak belirlenmiş bir çizgi
    width: '100%', // Ekran genişliği kadar uzat
    backgroundColor: 'black', // Çizgi rengi (gri)
  },
});

export default style;
