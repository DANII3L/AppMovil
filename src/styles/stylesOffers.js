import {StyleSheet} from 'react-native';

const stylesOffers = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 10,
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  listOffers: {
    paddingBottom: 20,
  },
  offerItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    alignItems: 'center',
  },
  imageProduct: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  infoProduct: {
    flex: 1,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  price: {
    fontSize: 14,
    color: '#333',
    marginVertical: 5,
  },
  discount: {
    fontSize: 14,
    color: 'green',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default stylesOffers;
