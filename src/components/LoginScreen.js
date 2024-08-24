import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {useAuth} from '../data/authContext';
import stylesLogin from '../styles/styleLogin';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorGeneral, seterrorGeneral] = useState('');
  const {login, getDataUsers} = useAuth();

  const validateEmail = email => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = password => {
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d)(?=.*[a-z]).{1,8}$/;
    return regex.test(password);
  };

  const handleLogin = async () => {
    if (!validateEmail(email))
      setErrorEmail('Introduzca un correo electrónico válido.');

    if (!validatePassword(password))
      setErrorPassword('Introduzca una contraseña con correcto formato.');

    setErrorEmail('');
    setErrorPassword('');

    let users = await getDataUsers();
    const userFind = users.filter(
      user => user.Correo === email && user.Contrasena === password,
    );

    if (userFind && userFind.length > 0) {
      await login(email);
      navigation.navigate('MainStack');
    } else {
      seterrorGeneral('No se ha encontrado este usuario registrado.');
    }
    /*
      !Obtener respuesta en caso de Api - llamada a API para autenticación

      const response = await fetch('url mi api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      if (result.token) {
        await login(result.token);
        navigation.navigate('AppStack');
      } else {
        console.error("Authentication failed");
      }*/
  };

  return (
    <View style={stylesLogin.container}>
      <ScrollView contentContainerStyle={stylesLogin.scrollView}>
        <Image
          source={{
            uri: 'https://u-static.fotor.com/images/text-to-image/result/PRO-85ba8d1b4dff4c7fb7fa641a22d012ad.jpg',
          }}
          style={stylesLogin.image}
          resizeMode="cover"
        />
        <View style={stylesLogin.formContainer}>
          <Text style={stylesLogin.title}>Iniciar sesión</Text>
          <TextInput
            style={stylesLogin.input}
            placeholder="Correo electrónico"
            value={email}
            onChangeText={setEmail}
          />
          {errorEmail ? <Text style={stylesLogin.error}>{errorEmail}</Text> : null}
          <TextInput
            style={stylesLogin.input}
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {errorPassword ? (
            <Text style={stylesLogin.error}>{errorPassword}</Text>
          ) : null}
          <Button title="Iniciar sesión" onPress={handleLogin} />
          {errorGeneral ? (
            <Text style={stylesLogin.error}>{errorGeneral}</Text>
          ) : null}
          <TouchableOpacity
            style={stylesLogin.registerLink}
            onPress={() => navigation.navigate('Register')}>
            <Text style={stylesLogin.registerText}>
              ¿No tienes una cuenta? Regístrate
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default LoginScreen;
