import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import Colors from '../constants/Colors';
import FavoritesScreen from '../screens/FavoritesScreen';

const defaultStackNavOptions = {
    // initialRouteName: 'Categories',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
      },
      headerTintColor:
        Platform.OS === 'android' ? 'white' : Colors.primaryColor,
      headerTitle: 'A Screen'
    }
}

const MealsNavigator = createStackNavigator(
  {
    Categories: {
      screen: CategoriesScreen
    },
    CategoryMeals: {
      screen: CategoryMealsScreen
    },
    MealDetail: MealDetailScreen
  }, { defaultNavigationOptions: defaultStackNavOptions }
);

const FavNavigator = createStackNavigator({
  Favorites: FavoritesScreen,
  MealDetail: MealDetailScreen
}, { defaultNavigationOptions: defaultStackNavOptions }
);

const tabScreenConfig = {
  Meals: {screen: MealsNavigator, navigationOptions: {
    tabBarIcon: (tabInfo) => {
      return (
        <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />
      );
    }, 
      tabBarColor: Colors.primaryColor
  }},
  Favorites: {screen: FavNavigator, navigationOptions: {
    tabBarLabel: 'Favorites!',
    tabBarIcon: (tabInfo) => {
      return <Ionicons name='ios-star' size={25} color={tabInfo.tintColor} />
    },
    tabBarColor: Colors.accentColor
  } },
};

const MealsFavTabNavigator = 
  Platform.OS === 'android' 
  ? createMaterialBottomTabNavigator(tabScreenConfig, {
    activeColor: 'white',
    shifting: true
  }) 
  : createBottomTabNavigator( {
    tabScreenConfig: {
    activeTintColor: Colors.accentColor,
  }
});

export default createAppContainer(MealsFavTabNavigator);
