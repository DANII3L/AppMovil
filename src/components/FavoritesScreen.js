import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {myFavoritesData} from '../data/myFavoritesData';
import stylesFavorites from '../styles/stylesFavorites';
import Ionicons from 'react-native-vector-icons/Ionicons';

const FavoritesScreen = ({navigation}) => {
  const [searchText, setSearchText] = useState('');

  const filteredFavorites = myFavoritesData.filter(item => {
    const searchTextLower = searchText.toLowerCase();
    return item.description.toLowerCase().includes(searchTextLower);
  });

  const cardBuyPress = item => {
    navigation.navigate('Details', {id: item.id});
  };

  const renderFavoriteItem = ({item}) => {
    const statusColor = item.estado === 'Disponible' ? 'green' : 'red';

    return (
      <View style={stylesFavorites.favoriteItemContainer}>
        <TouchableOpacity
          style={stylesFavorites.favoriteItem}
          onPress={() => cardBuyPress(item)}>
          <Image
            source={{uri: item.image}}
            style={stylesFavorites.imageProduct}
          />
          <View style={stylesFavorites.infoProduct}>
            <Text style={stylesFavorites.nameProduct}>{item.title}</Text>
            <Text style={[stylesFavorites.itemStatus, {color: statusColor}]}>
              {item.estado}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={stylesFavorites.favIconContainer}>
          <Ionicons name="star-outline" size={24} color="green" onPress={() => {Alert.alert('Alerta', `Eliminado ${item.title} de favoritos...`)}}/>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={stylesFavorites.container}>
      <TextInput
        style={stylesFavorites.searchBar}
        placeholder="Buscar por nombre"
        value={searchText}
        onChangeText={text => setSearchText(text)}
      />
      <FlatList
        data={filteredFavorites}
        renderItem={renderFavoriteItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={stylesFavorites.listFavorites}
      />
    </View>
  );
};

export default FavoritesScreen;
