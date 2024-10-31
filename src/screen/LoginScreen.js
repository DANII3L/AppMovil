import React, {useContext, useEffect, useRef, useState} from 'react';
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
import TaskContext from '../context/TaskContext';
import { FirebaseContext } from '../firebase';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorGeneral, seterrorGeneral] = useState('');
  const {login} = useAuth();
  const {state, dispatch} = useContext(TaskContext);
  const {firebase} = useContext(FirebaseContext);
  const dataLoadedRef = useRef(false);

  useEffect(() => {
    if (!dataLoadedRef.current) {
      if (firebase && firebase.db) {
        firebase.db.collection('users').get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
            let userData = {
              id: doc.id,
              Correo: doc.data().Correo,
              Contrasena: doc.data().Contrasena,
              FechaNacimiento: new Date(doc.data().FechaNacimiento.seconds * 1000),
              Direccion: doc.data().Direccion,
              Pais: doc.data().Pais,
              Departamento: doc.data().Departamento,
              Ciudad: doc.data().Ciudad,
              ImageProfile: doc.data().ImageProfile,
            };
            const exists = state.users.some(item => item.Correo === userData.Correo);
            if (!exists) {
              dispatch({
                type: 'SET_ITEMS',
                payload: userData,
                collectionType: 'users',
              });
            }
          });
        }).catch(error => {
          console.error("Error al obtener usuarios: ", error);
        });
      } else {
        console.error("Firebase no está inicializado correctamente.");
      }

      dataLoadedRef.current = true;
    }
  }, [dispatch, state.users, firebase]);

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

    const users = state.users;

    const userFind = users.filter(
      user => user.Correo === email && user.Contrasena === password,
    );

    if (userFind.length > 0) {
      await login(email);
      navigation.navigate('MainStack');
    } else {
      seterrorGeneral('No se ha encontrado este usuario registrado.');
    }
  };

  return (
    <View style={stylesLogin.container}>
      <ScrollView contentContainerStyle={stylesLogin.scrollView}>
        <Image
          source={{
            uri: 'https://firebasestorage.googleapis.com/v0/b/app-movil-dc1fe.appspot.com/o/Welcome.jpg?alt=media&token=d0f0955a-22da-47f5-883d-744e2512ad72',
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
