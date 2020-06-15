import React from 'react';
import { useSelector } from 'react-redux';

import { CATEGORIES } from '../data/dummy-data';
import MealList from '../components/MealList';

const CategoryMealScreen = props => {
  const catId = props.navigation.getParam('categoryId');

  // retrieving date from state (redux)
  const availableMeals = useSelector(state => state.meals.filteredMeals);  // meals is set up in app.js inside rootReducer. 
                                                                          // rootReducer => filteredMeals is inside Reducer/meals.js

  //  const selectedCategory = CATEGORIES.find(cat => cat.id === catId);
  const displayedMeals = availableMeals.filter(meal => meal.categoryIds.indexOf(catId) >= 0);

  return (
    <MealList listData={displayedMeals} navigation={props.navigation} />
  );
};

CategoryMealScreen.navigationOptions = navigationData => {
  const catId = navigationData.navigation.getParam('categoryId');

  const selectedCategory = CATEGORIES.find(cat => cat.id === catId);

  return {
    headerTitle: selectedCategory.title
  };
};


export default CategoryMealScreen;
