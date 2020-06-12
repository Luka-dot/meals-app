import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { MEALS } from '../data/dummy-data';
import HeaderButton from '../components/HeaderButton';

const MealDetailScreen = props => {
  const mealId = props.navigation.getParam('mealId');

  const selectedMeals = MEALS.find(meal => meal.id === mealId);

  return (
    <View style={styles.screen}>
      <Text>The Meal Detail Screen!</Text>
      <Text>{selectedMeals.title}</Text>
      <Button title="Go Back to Categories" onPress={() => {
          props.navigation.popToTop();
      }} />
    </View>
  );
};

MealDetailScreen.navigationOptions = (navigationData) => {
  const mealId = navigationData.navigation.getParam('mealId');
  const selectedMeals = MEALS.find(meal => meal.id === mealId);
  return {
    headerTitle: selectedMeals.title,
    headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton} >
                    <Item title='Favorite' iconName='ios-star' onPress={() => {
                      console.log('marked Favorite');
                    }} />
                </HeaderButtons>
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default MealDetailScreen;
