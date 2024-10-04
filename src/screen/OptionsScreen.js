import * as React from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import globalStyles from '../styles/globalStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

function OptionsScreen({navigation}) {

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    navigation.navigate('Login');
  };

  const handleSupport = () => {
    navigation.navigate('Support');
  };
  
  return (
    <ScrollView
      style={globalStyles.container}
      contentContainerStyle={globalStyles.contentContainer}>
      <View style={globalStyles.section}>
        <Text style={globalStyles.sectionTitle}>Tus Atajos</Text>
        <View style={globalStyles.cardContainer}>
          <TouchableOpacity
            style={globalStyles.cardList}
            onPress={() => navigation.navigate('MyPurchases')}>
            <Ionicons name="home" size={30} color="#007BFF" />
            <Text style={globalStyles.cardText}>Pedidos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={globalStyles.cardList}
            onPress={() => navigation.navigate('Favorites')}>
            <Ionicons name="bookmarks-outline" size={30} color="#007BFF" />
            <Text style={globalStyles.cardText}>Favoritos</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={globalStyles.divider} />

      <View style={globalStyles.section}>
        <Text style={globalStyles.sectionTitle}>Opciones de usuario</Text>
        <View style={globalStyles.buttonContainer}>
          <TouchableOpacity style={globalStyles.button} onPress={handleLogout}>
            <Text style={globalStyles.buttonText}>Cerrar sesión</Text>
            <Ionicons
              name="chevron-forward-outline"
              size={20}
              color="#007BFF"
              style={globalStyles.icon}
            />
          </TouchableOpacity>
        </View>
        <View style={globalStyles.buttonContainer}>
          <TouchableOpacity
            style={globalStyles.button}
            onPress={handleSupport}>
            <Text style={globalStyles.buttonText}>Ayuda y soporte</Text>
            <Ionicons
              name="chevron-forward-outline"
              size={20}
              color="#007BFF"
              style={globalStyles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default OptionsScreen;
