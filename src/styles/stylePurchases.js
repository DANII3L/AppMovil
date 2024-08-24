import {StyleSheet} from 'react-native';

const stylesPurchases = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 10,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  searchBar: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  listaCompras: {
    paddingBottom: 20,
  },
  compraItem: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  imagenProducto: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 10,
  },
  infoProducto: {
    flex: 1,
  },
  nameProducto: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateBuy: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
});

export default stylesPurchases;
