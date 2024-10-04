import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import stylesFavorites from '../styles/stylesFavorites';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TaskListFavoritesItems = ({item, onDelete, navigation}) => {
  const cardBuyPress = itemBuy => {
    navigation.navigate('Details', {id: itemBuy.id});
  };
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
          <Ionicons name="star" size={24} color="green" onPress={onDelete}/>
        </TouchableOpacity>
      </View>
    );
};

export default TaskListFavoritesItems;
