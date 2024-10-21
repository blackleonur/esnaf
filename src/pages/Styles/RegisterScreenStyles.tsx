import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.046, // Responsive padding
    justifyContent: 'center',
  },
  header: {
    fontSize: width * 0.062, // Dynamic font size
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: height * 0.03,
  },
  label: {
    fontSize: width * 0.034, // Dynamic font size
    fontWeight: '600',
    marginBottom: height * 0.01,
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: width * 0.01, // Dynamic padding
    marginBottom: height * 0.012,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: width * 0.02,
  },
  countryCodeText: {
    fontSize: width * 0.04,
    marginLeft: width * 0.01,
  },
  phoneInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: width * 0.03,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  checkboxText: {
    fontSize: width * 0.032,
    marginLeft: width * 0.02,
  },
  registerButton: {
    paddingVertical: height * 0.02,
    alignItems: 'center',
    borderRadius: 25,
    marginBottom: height * 0,
  },
  registerButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: width * 0.032,
  },
});

export default styles;
