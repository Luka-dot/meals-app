import React, { useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';
import { toggleFavorite } from '../store/actions/meals';

const ListItem = props => {
  return (
    <View style={styles.listItem}>
      <DefaultText>{props.children}</DefaultText>
    </View>
  )
}

const MealDetailScreen = props => {
  const availableMeals = useSelector(state => state.meals.meals);

  const mealId = props.navigation.getParam('mealId');

  const selectedMeals = availableMeals.find(meal => meal.id === mealId);

  const dispatch =  useDispatch();
  
  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(mealId));
  }, [dispatch, mealId]);

  // // setting params to be able to send to MealsDetails below
  // // has to be inside useEffect to avid infinite loop 
  useEffect(() => {
    props.navigation.setParams({toggleFav: toggleFavoriteHandler});
   // props.navigation.setParams({mealTitle: selectedMeal.title});
  }, [toggleFavoriteHandler]);  // when selected meal changes info will be send to header
  

  return (
    <ScrollView>
      <Image source={{uri: selectedMeals.imageUrl}} style={styles.image} />
      <View style={styles.details}>
                        <DefaultText>{selectedMeals.duration} min</DefaultText>
                        <DefaultText>{selectedMeals.complexity.toUpperCase()}</DefaultText>
                        <DefaultText>{selectedMeals.affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title} >Ingredients</Text>
      {selectedMeals.ingredients.map(ingredient => (
        <ListItem key={ingredient}>{ingredient}</ListItem>
      ))}
      <Text style={styles.title} >Steps</Text>
      {selectedMeals.steps.map(step => (
        <ListItem key={step}>{step}</ListItem>
      ))}
    </ScrollView>
  );
};

MealDetailScreen.navigationOptions = (navigationData) => {
  // const mealId = navigationData.navigation.getParam('mealId');
  const mealTitle = navigationData.navigation.getParam('mealTitle');
  const toggleFavorite = navigationData.navigation.getParam('toggleFav');
 // const selectedMeals = MEALS.find(meal => meal.id === mealId);
  return {
    headerTitle: mealTitle,
    headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton} >
                    <Item title='Favorite' iconName='ios-star' onPress={toggleFavorite} />
                </HeaderButtons>
  };
};

const styles = StyleSheet.create({
  image:{
    width: '100%',
    height: 200
  },
  details: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-around'
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    textAlign: 'center'
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10
  }
});

export default MealDetailScreen;
