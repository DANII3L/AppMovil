import { StyleSheet } from 'react-native';

const stylesFavorites = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchBar: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  listFavorites: {
    padding: 10,
  },
  favoriteItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  favoriteItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageProduct: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  infoProduct: {
    flex: 1,
  },
  nameProduct: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemStatus: {
    fontSize: 14,
  },
  favIconContainer: {
    marginLeft: 10,
  },
});

export default stylesFavorites;
