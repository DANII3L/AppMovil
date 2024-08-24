import { StyleSheet } from "react-native";

const stylesLogin = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    scrollView: {
      flexGrow: 1,
    },
    imageContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    },
    image: {
      width: '100%',
      height: 590,
    },
    formContainer: {
      backgroundColor: '#fff',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
      elevation: 5,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    input: {
      height: 40,
      borderColor: '#ddd',
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 15,
      paddingHorizontal: 10,
      backgroundColor: '#fff',
    },
    registerLink: {
      marginTop: 20,
      alignItems: 'center',
    },
    registerText: {
      color: '#007BFF',
      fontSize: 16,
    },
    error: {
      color: 'red',
      marginBottom: 10,
    },
  });

  export default stylesLogin;