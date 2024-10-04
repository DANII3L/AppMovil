import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import globalStyles from '../styles/globalStyles';

const SearchBarScreen = ({ onSearch }) => {
  const [searchText, setSearchText] = React.useState('');

  return (
    <View style={globalStyles.containerSearch}>
      <Ionicons name="search" size={24} color="#000" style={globalStyles.iconSearch} />
      <TextInput
        style={globalStyles.inputSearch}
        placeholder="Buscar en App Movil"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
        onSubmitEditing={() => onSearch(searchText)}
      />
      <TouchableOpacity onPress={() => { console.log( 'Buscando algun producto' ) }}>
        <Ionicons name="mic" size={24} color="#000" style={globalStyles.iconSearch} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBarScreen;
