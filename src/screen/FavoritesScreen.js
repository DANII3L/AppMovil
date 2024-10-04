import React, {useContext, useState} from 'react';
import {View, FlatList, TextInput} from 'react-native';
import stylesFavorites from '../styles/stylesFavorites';
import TaskContext from '../context/TaskContext';
import TaskListFavoritesItems from '../components/TaskListFavoritesItems';
import ConfirmationAlert from '../components/ConfirmationAlert';

const FavoritesScreen = ({navigation}) => {
  const {state, dispatch} = useContext(TaskContext);
  const [searchText, setSearchText] = useState('');

  const filteredFavorites = state.favorites.filter(item => {
    const searchTextLower = searchText.toLowerCase();
    return item.title.toLowerCase().includes(searchTextLower) && item.userCorreo === state.userConnect[0]?.userCorreo;
  });

  const onDeletePress = item => {
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
        renderItem={({item}) => (
          <TaskListFavoritesItems
            item={item}
            onDelete={() => onDeletePress(item)}
            navigation={navigation}
          />
        )}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={stylesFavorites.listFavorites}
      />
    </View>
  );
};

export default FavoritesScreen;
