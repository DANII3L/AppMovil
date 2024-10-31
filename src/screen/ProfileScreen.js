import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Image, ActivityIndicator, Alert} from 'react-native';
import styleProfile from '../styles/sytleProfile';
import TaskContext from '../context/TaskContext';

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const {state} = useContext(TaskContext);
  const userCorreo = state.userConnect[0]?.userCorreo ?? null;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        let userConnect = state.users.filter(user => user.Correo === userCorreo)[0];
        if (userConnect) {
          setUser(userConnect);
        } else {
          return;
        }
      } catch (error) {
        console.error('Error buscando usuario:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [userCorreo, state.users]);

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

  const {Correo, Direccion, FechaNacimiento, ImageProfile, Departamento, Ciudad} = user;

  const date = new Date(FechaNacimiento);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const formattedFechaNacimiento = `${day}/${month}/${year}`;

  return (
    <View style={styleProfile.container}>
      <Image source={{uri: ImageProfile}} style={styleProfile.profileImage} />
      <View style={styleProfile.infoContainer}>
        <Text style={styleProfile.name}>{Correo}</Text>
        <Text style={styleProfile.dob}>Departamento: {Departamento}</Text>
        <Text style={styleProfile.dob}>Ciudad: {Ciudad}</Text>
        <Text style={styleProfile.dob}>Dirección: {Direccion}</Text>
        <Text style={styleProfile.dob}>
          Fecha de nacimiento: {formattedFechaNacimiento}
        </Text>
      </View>
    </View>
  );
};

export default ProfileScreen;
