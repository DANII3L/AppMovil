import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Image, ActivityIndicator, Alert} from 'react-native';
import styleProfile from '../styles/sytleProfile';
import TaskContext from '../context/TaskContext';

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const {state} = useContext(TaskContext);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        let userConnect = state.users.filter(user => user.correo === state.userConnect[0].correo)[0];
        console.log(userConnect);
        if (userConnect) {
          setUser(userConnect);
        } else {
          Alert.alert('Alerta', 'Usuario no encontrado');
          return;
        }
      } catch (error) {
        console.error('Error buscando usuario:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [state.userConnect, state.users]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  if (!user) {
    return (
      <View style={styleProfile.container}>
        <Text style={styleProfile.error}>
          No se encontraron datos del perfil.
        </Text>
      </View>
    );
  }

  const {Usuario, Direccion, FechaNacimiento, ImageProfile} = user;
  console.log(FechaNacimiento);
  const date = new Date(FechaNacimiento);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const formattedFechaNacimiento = `${day}/${month}/${year}`;

  return (
    <View style={styleProfile.container}>
      <Image source={{uri: ImageProfile}} style={styleProfile.profileImage} />
      <View style={styleProfile.infoContainer}>
        <Text style={styleProfile.name}>{Usuario}</Text>
        <Text style={styleProfile.dob}>Dirección: {Direccion}</Text>
        <Text style={styleProfile.dob}>
          Fecha de nacimiento: {formattedFechaNacimiento}
        </Text>
      </View>
    </View>
  );
};

export default ProfileScreen;
