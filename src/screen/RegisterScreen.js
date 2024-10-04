import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../data/authContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import globalStyles from '../styles/globalStyles';
import TaskContext from '../context/TaskContext';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const {registerDataUser} = useAuth();
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [correo, setCorreo] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState(new Date());
  const [show, setShowDate] = useState(false);
  const [direccion, setDireccion] = useState('');
  const [pais] = useState('Colombia');
  const [departamento, setDepartamento] = useState('');
  const [ciudad, setCiudad] = useState('');
  const {state} = useContext(TaskContext);

  const validarFormulario = async () => {
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexContraseña =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d)(?=.*[a-z]).{1,8}$/;

    if (usuario.length > 10) {
      Alert.alert(
        'Error',
        'El nombre de usuario no puede exceder 10 caracteres.',
      );
      return;
    }

    if (!regexContraseña.test(contraseña)) {
      Alert.alert(
        'Error',
        'La contraseña debe tener máximo 8 caracteres, incluyendo 1 mayúscula, 1 caracter especial, letras y números.',
      );
      return;
    }

    if (!regexCorreo.test(correo)) {
      Alert.alert('Error', 'Por favor ingresa un correo válido.');
      return;
    }

    const userExist = state.users.filter(user => user.Correo === correo);
    if (userExist.length > 0) {
      Alert.alert('Error', 'El correo digitado ya posee una cuenta.');
      return;
    }

    const edad = moment().diff(moment(fechaNacimiento, 'YYYY-MM-DD'), 'years');
    if (edad < 18 || edad > 50) {
      Alert.alert('Error', 'No está en el rango de edad para crear la cuenta.');
      return;
    }

    if (direccion.length > 30) {
      Alert.alert('Error', 'La dirección no puede exceder 30 caracteres.');
      return;
    }

    const newUser = {
      Usuario: usuario,
      Contrasena: contraseña,
      Correo: correo,
      FechaNacimiento: fechaNacimiento,
      Direccion: direccion,
      Pais: pais,
      Departamento: departamento,
      Ciudad: ciudad,
      ImageProfile:
        'https://st5.depositphotos.com/3848923/64429/i/450/depositphotos_644292984-stock-illustration-black-white-cute-man-cartoon.jpg',
    };
    await registerDataUser(newUser);
    Alert.alert('Registro Exitoso', '¡Tu cuenta ha sido creada exitosamente!');
    navigation.navigate('Login');
  };

  const onChange = selectedDate => {
    if (selectedDate && selectedDate.date) {
      const currentDate = new Date(selectedDate.date);
      if (currentDate instanceof Date && !isNaN(currentDate.getTime())) {
        setFechaNacimiento(currentDate);
      }
    }
    setShowDate(false);
  };

  const handleDateChange = (event, date) => {
    setShowDate(false);
    if (date) {
      const formattedDate = new Date(date.toISOString().split('T')[0]);
      setFechaNacimiento(formattedDate);
    }
  };

  const departamentosYCiudades = {
    Antioquia: ['Medellín', 'Bello', 'Itagüí', 'Envigado', 'Rionegro'],
    Cundinamarca: ['Bogotá', 'Soacha', 'Chía', 'Zipaquirá', 'Facatativá'],
    'Valle del Cauca': ['Cali', 'Palmira', 'Buenaventura', 'Tuluá', 'Cartago'],
    Atlántico: [
      'Barranquilla',
      'Soledad',
      'Malambo',
      'Puerto Colombia',
      'Galapa',
    ],
    Santander: [
      'Bucaramanga',
      'Floridablanca',
      'Giron',
      'Piedecuesta',
      'Barrancabermeja',
    ],
  };

  const departamentos = Object.keys(departamentosYCiudades).map(
    (depto, index) => ({
      key: index + 1,
      label: depto,
    }),
  );

  const ciudades = departamento
    ? departamentosYCiudades[departamento].map((ciudad, index) => ({
        key: index + 1,
        label: ciudad,
      }))
    : [];

  return (
    <View style={{padding: 20}}>
      <Text>Usuario:</Text>
      <TextInput
        style={globalStyles.input}
        value={usuario}
        onChangeText={setUsuario}
        maxLength={10}
      />

      <Text>Contraseña:</Text>
      <TextInput
        style={globalStyles.input}
        value={contraseña}
        onChangeText={setContraseña}
        secureTextEntry
        maxLength={8}
      />

      <Text>Correo:</Text>
      <TextInput
        style={globalStyles.input}
        value={correo}
        onChangeText={setCorreo}
        keyboardType="email-address"
      />

      <Text>Fecha de nacimiento:</Text>
      <TouchableOpacity
        onPress={() => setShowDate(true)}
        style={globalStyles.dateButton}>
        <Text style={globalStyles.dateButtonText}>Seleccionar fecha</Text>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
          maximumDate={
            new Date(new Date().setFullYear(new Date().getFullYear() - 18))
          }
          minimumDate={
            new Date(new Date().setFullYear(new Date().getFullYear() - 50))
          }
        />
      )}

      <Text>
        Fecha seleccionada:{' '}
        {fechaNacimiento ? fechaNacimiento.toLocaleDateString() : 'Ninguna'}
      </Text>

      <Text>Dirección:</Text>
      <TextInput
        style={globalStyles.input}
        value={direccion}
        onChangeText={setDireccion}
        maxLength={30}
      />

      <Text>Departamento:</Text>
      <ModalSelector
        data={departamentos}
        initValue="Selecciona un departamento"
        onChange={option => {
          setDepartamento(option.label);
          setCiudad('');
        }}
        style={globalStyles.input}>
        <TextInput
          style={globalStyles.input}
          editable={false}
          placeholder="Selecciona un departamento"
          value={departamento}
        />
      </ModalSelector>

      <Text>Ciudad:</Text>
      <ModalSelector
        data={ciudades}
        initValue="Selecciona una ciudad"
        onChange={option => setCiudad(option.label)}
        style={globalStyles.input}
        disabled={!departamento}>
        <TextInput
          style={globalStyles.input}
          editable={false}
          placeholder="Selecciona una ciudad"
          value={ciudad}
        />
      </ModalSelector>

      <Button title="Registrar" onPress={validarFormulario} />
    </View>
  );
};

export default RegisterScreen;
