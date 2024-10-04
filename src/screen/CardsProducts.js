import React, {useContext} from 'react';
import {View, Text, TouchableOpacity, Image, Alert} from 'react-native';
import stylesHome from '../styles/stylesHome';
import stylesFavorites from '../styles/stylesFavorites';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TaskContext from '../context/TaskContext';
import ConfirmationAlert from '../components/ConfirmationAlert';

const CardsProducts = ({
  item,
  cardBuyPress,
  mostrarBotonDelete = false,
  onDeletePress,
}) => {
  const {state, dispatch} = useContext(TaskContext);
  const statusColor = item.estado === 'Disponible' ? 'green' : 'red';
  const userCorreo = state.userConnect[0]?.userCorreo;
  const isFavorite = state.favorites.some(
    fav => fav.id === item.id && fav.userCorreo === userCorreo,
  );
  const handleFavoritePress = () => {

    if (isFavorite) {
      ConfirmationAlert({
        title: 'Confirmar eliminación',
        message: `¿Estás seguro de que quieres eliminar ${item.title} de tus favoritos?`,
        onConfirm: () =>
          dispatch({
            type: 'DELETE_ITEM',
            payload:{id: item.id},
            collectionType: 'favorites',
          }),
        onCancel: () => console.log('Eliminación cancelada'),
      });
    } else {
      const itemNew = {
        ...item,
        userCorreo: userCorreo,
      };
      dispatch({
        type: 'ADD_ITEM',
        payload: itemNew,
        collectionType: 'favorites',
      });
      Alert.alert('Producto agregado a favoritos');
    }
  };

  return (
    <View style={stylesFavorites.favoriteItemContainer}>
      <TouchableOpacity
        style={stylesFavorites.favoriteItem}
        onPress={() => cardBuyPress(item)}>
        <Image source={{uri: item.image}} style={stylesHome.productImage} />
        <View style={stylesFavorites.infoProduct}>
          <Text style={stylesHome.productTitle}>{item.title}</Text>
          <Text style={stylesHome.productDescription}>{item.description}</Text>
          <Text style={stylesHome.productValue}>${item.price.toFixed(2)}</Text>
          <Text style={stylesHome.cantidad}>Cantidad: {item.amount}</Text>
          <Text style={[stylesFavorites.itemStatus, {color: statusColor}]}>
            {item.estado}
          </Text>
          {item.discount && (
            <Text style={stylesHome.productDiscount}>-${item.discount}%</Text>
          )}
          {mostrarBotonDelete && (
            <TouchableOpacity
              style={stylesHome.deleteButton}
              onPress={() => onDeletePress(item)}>
              <Text style={stylesHome.deleteButtonText}>Eliminar</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={stylesFavorites.favIconContainer}
        onPress={handleFavoritePress}>
        <Ionicons
          name={isFavorite ? 'star' : 'star-outline'}
          size={24}
          color="green"
        />
      </TouchableOpacity>
    </View>
  );
};

export default CardsProducts;
