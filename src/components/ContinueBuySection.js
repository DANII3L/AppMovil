import React from 'react';
import {
  View,
  Text,
  FlatList,
} from 'react-native';
import CardItemsSecondary from './CardsItemsSecondary';
import globalStyles from '../styles/globalStyles';

const ContinueBuyingSection = ({continueBuyData, cardBuyPress, navigation}) => {

  return (
    <View style={globalStyles.containerContinueBuy}>
      <Text style={globalStyles.titleBlack}>Seguir comprando</Text>
      <FlatList
        data={continueBuyData}
        renderItem={({item}) => (
          <CardItemsSecondary
            key={item.id}
            item={item}
            onPress={cardBuyPress}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={globalStyles.flatListContainer}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default ContinueBuyingSection;
