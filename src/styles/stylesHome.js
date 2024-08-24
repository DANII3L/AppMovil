import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const stylesHome = StyleSheet.create({
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 10,
    padding: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    flexDirection: 'row',
    alignItems: 'center',
    width: width - 20,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
  },
  productInfo: {
    flex: 1,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  productValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'grey',
  },
  productDiscount: {
    fontSize: 14,
    color: 'green',
    marginTop: 5,
  },
  productListContainer: {
    paddingHorizontal: 10,
  },
  productList: {
    paddingBottom: 20,
  },
  flatList: {
    flex: 1,
    marginTop: 10,
  },
});

export default stylesHome;
