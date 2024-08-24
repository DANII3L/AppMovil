import React, {useEffect, useState} from 'react';
import {View, Text, Image, ActivityIndicator} from 'react-native';
import {useAuth} from '../data/authContext';
import styleProfile from '../styles/sytleProfile';

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const {getDataUsers, getToken} = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        let users = await getDataUsers();
        if (users) {
          let userToken = await getToken();
          const userFind = users.filter(user => user.Correo === userToken);
          if (!userFind) {
            Alert('Usuario no encontrado');
            return null;
          }
          setUser(userFind[0]);
        }
      } catch (error) {
        console.error('Error buscando usuario:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  if (!user) {
    return (
      <View style={styleProfile.container}>
        <Text style={styleProfile.error}>No se encontraron datos del perfil.</Text>
      </View>
    );
  }

  const {Usuario, Direccion, FechaNacimiento, ImageProfile} = user;
  const [datePart] = FechaNacimiento.split('T');
  const [year, month, day] = datePart.split('-');
  const formattedFechaNacimiento = `${day}/${month}/${year}`;

  return (
    <View style={styleProfile.container}>
      <Image source={{uri: ImageProfile}} style={styleProfile.profileImage} />
      <View style={styleProfile.infoContainer}>
        <Text style={styleProfile.name}>
          {Usuario}
        </Text>
        <Text style={styleProfile.dob}>
          Dirección: {Direccion}
        </Text>
        <Text style={styleProfile.dob}>
          Fecha de nacimiento: {formattedFechaNacimiento}
        </Text>
      </View>
    </View>
  );
};

export default ProfileScreen;
