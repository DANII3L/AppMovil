import React, {useState, useEffect, useContext, useRef} from 'react';
import {View, SafeAreaView, Text, FlatList} from 'react-native';
import SearchBarScreen from './SearchBarScreen';
import globalStyles from '../styles/globalStyles';
import {carouselData} from '../data/carouselData';
import CarouselItem from './CarouselItem';
import Swiper from 'react-native-swiper';
import {continueBuyData} from '../data/continueBuyData';
import ContinueBuyingSection from './ContinueBuySection';
import stylesHome from '../styles/stylesHome';
import {ScrollView} from 'react-native-gesture-handler';
import CardsProducts from './CardsProducts';
import TaskContext from '../context/TaskContext';
import {productsData} from '../data/productsData';

const HomeScreen = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const {state, dispatch} = useContext(TaskContext);
  const dataLoadedRef = useRef(false);

  useEffect(() => {
    const userConnect = state.userConnect.length > 0;
    if (!userConnect) {
      navigation.navigate('Login');
    }
  }, [navigation, state.userConnect]);

  useEffect(() => {
    if (!dataLoadedRef.current) {
      productsData.forEach(product => {
        const exists = state.products.some(item => item.id === product.id);
        if (!exists) {
          dispatch({
            type: 'SET_ITEMS',
            payload: product,
            collectionType: 'products',
          });
        }
      });
      dataLoadedRef.current = true;
    }
  }, [dispatch, state.products]);

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
            {carouselData.map((item, index) => (
              <CarouselItem key={index} item={item} onPress={handlePress} />
            ))}
          </Swiper>
        </View>
        <View style={globalStyles.containerBuys}>
          <ContinueBuyingSection
            continueBuyData={continueBuyData}
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
