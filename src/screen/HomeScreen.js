import React, {useState, useEffect, useContext, useRef} from 'react';
import {View, SafeAreaView, Text, FlatList} from 'react-native';
import SearchBarScreen from './SearchBarScreen';
import globalStyles from '../styles/globalStyles';
import CarouselItem from './CarouselItem';
import Swiper from 'react-native-swiper';
import ContinueBuyingSection from './ContinueBuySection';
import stylesHome from '../styles/stylesHome';
import {ScrollView} from 'react-native-gesture-handler';
import CardsProducts from './CardsProducts';
import TaskContext from '../context/TaskContext';
import {FirebaseContext} from '../firebase';

const HomeScreen = ({navigation}) => {
  const {firebase} = useContext(FirebaseContext);
  const [searchText, setSearchText] = useState('');
  const {state, dispatch} = useContext(TaskContext);
  const dataLoadedRef = useRef(false);
  const userCorreo = state.userConnect[0]?.userCorreo ?? null;

  useEffect(() => {
    const userConnect = state.userConnect.length > 0;
    if (!userConnect) {
      navigation.navigate('Login');
    }
  }, [navigation, state.userConnect, firebase, dispatch, state.users]);

  useEffect(() => {
    if (!dataLoadedRef.current) {
      firebase.db.collection('products').get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let product = {
            id: Number(doc.data().id),
            title: doc.data().title,
            image: doc.data().image,
            description: doc.data().description,
            price: Number(doc.data().price),
            amount: Number(doc.data().amount),
            seller: doc.data().seller,
            shippingCost: doc.data().shippingCost
              ? Number(doc.data().shippingCost)
              : null,
            discount: doc.data().discount ? Number(doc.data().discount) : null,
            valor: doc.data().valor ? Number(doc.data().valor) : null,
            caracteristicas: doc.data().caracteristicas,
            medioDePago: doc.data().medioDePago,
            preguntas: doc.data().preguntas,
            comentarios: doc.data().comentarios,
            calificacion: Number(doc.data().calificacion),
            estado: doc.data().estado,
          };
          const exists = state.products.some(item => item.id === product.id);
          if (!exists) {
            dispatch({
              type: 'SET_ITEMS',
              payload: product,
              collectionType: 'products',
            });
          }
        });
      });

      firebase.db.collection('carouselData').get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let carrucel = {
            id: Number(doc.data().id),
            image: doc.data().image,
          };
          const exists = state.carouselData.some(item => item.id === carrucel.id);
          if (!exists) {
            dispatch({
              type: 'SET_ITEMS',
              payload: carrucel,
              collectionType: 'carouselData',
            });
          }
        });
      });

      firebase.db.collection('favorites').get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let favorite = {
            id: Number(doc.data().id),
            title: doc.data().title,
            image: doc.data().image,
            description: doc.data().description,
            price: Number(doc.data().price),
            amount: Number(doc.data().amount),
            seller: doc.data().seller,
            shippingCost: doc.data().shippingCost
              ? Number(doc.data().shippingCost)
              : null,
            discount: doc.data().discount ? Number(doc.data().discount) : null,
            valor: doc.data().valor ? Number(doc.data().valor) : null,
            caracteristicas: doc.data().caracteristicas,
            medioDePago: doc.data().medioDePago,
            preguntas: doc.data().preguntas,
            comentarios: doc.data().comentarios,
            calificacion: Number(doc.data().calificacion),
            estado: doc.data().estado,
            userCorreo: doc.data().userCorreo ?? null,
          };
          const exists = state.favorites.some(item => item.id === favorite.id);
          if (!exists) {
            dispatch({
              type: 'SET_ITEMS',
              payload: favorite,
              collectionType: 'favorites',
            });
          }
        });
      });

      firebase.db.collection('productsBuy').get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          if(doc.id.includes('_' + userCorreo)) {
          let product = {
            id: Number(doc.data().id),
            title: doc.data().title,
            image: doc.data().image,
            description: doc.data().description,
            price: Number(doc.data().price),
            amount: Number(doc.data().amount),
            seller: doc.data().seller,
            shippingCost: doc.data().shippingCost
              ? Number(doc.data().shippingCost)
              : null,
            discount: doc.data().discount ? Number(doc.data().discount) : null,
            valor: doc.data().valor ? Number(doc.data().valor) : null,
            caracteristicas: doc.data().caracteristicas,
            medioDePago: doc.data().medioDePago,
            preguntas: doc.data().preguntas,
            comentarios: doc.data().comentarios,
            calificacion: Number(doc.data().calificacion),
            estado: doc.data().estado,
            userCorreo: doc.data().userCorreo ?? null,
          };
          const exists = state.productsBuy.some(item => item.id === product.id);
          if (!exists) {
            dispatch({
              type: 'SET_ITEMS',
              payload: product,
              collectionType: 'productsBuy',
            });
          }
          }
        });
      });

      dataLoadedRef.current = true;
    }
  }, [dispatch, state.products, state.carouselData, state.favorites, firebase.db, userCorreo, state.productsBuy]);

  const filteredProducts = state.products.filter(item => {
    const searchTextLower = searchText.toLowerCase();
    return item.title.toLowerCase().includes(searchTextLower);
  });

  const handleSearch = query => {
    setSearchText(query);
  };

  const handlePress = item => {
    navigation.navigate('Offers');
  };

  const cardBuyPress = item => {
    navigation.navigate('Details', {id: item.id});
  };

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <ScrollView contentContainerStyle={globalStyles.scrollViewContent}>
        <View>
          <SearchBarScreen onSearch={handleSearch} />
        </View>
        <View style={globalStyles.containerSwiper}>
          <Swiper
            showsPagination={false}
            autoplay={true}
            autoplayTimeout={5}
            loop={true}>
            {state.carouselData.map((item) => (
              <CarouselItem key={item.id} item={item} onPress={handlePress} />
            ))}
          </Swiper>
        </View>
        <View style={globalStyles.containerBuys}>
          <ContinueBuyingSection
            continueBuyData={state.products.filter(item => [7,3,4,9].includes(item.id))}
            cardBuyPress={cardBuyPress}
            navigation={navigation}
          />
        </View>
        <View style={stylesHome.productListContainer}>
          <Text style={globalStyles.titleBlack}>Lista de Productos</Text>
          <FlatList
            data={filteredProducts}
            renderItem={({item}) => (
              <CardsProducts item={item} cardBuyPress={cardBuyPress} />
            )}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={stylesHome.productList}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
