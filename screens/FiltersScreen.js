import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import Colors from '../constance/Colors';
import { setFilters } from '../store/actions/meals';

const FilterSwitch = props => {
  return (
    <View style={styles.filterContainer}>
        <Text>{props.label}</Text>
        <Switch 
          trackColor={{ true: Colors.primaryColor }}
          thumbColor={'silver'}
          value={props.state} 
          onValueChange={props.onChange} 
        />
      </View>
  )
}

const FiltersScreen = props => {
  const { navigation } = props;

  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);

  const dispatch = useDispatch();

  const saveFilters = useCallback(() => {
    const appliedFilters = {
      isGlutenFree: isGlutenFree,
      isLactoseFree: isLactoseFree,
      isVegan: isVegan,
      isVegetarian: isVegetarian
    }

    dispatch(setFilters(appliedFilters));
  }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian, dispatch ]);

  useEffect(() => {
    navigation.setParams({save: saveFilters});
  }, [saveFilters]);  // 2nd argument [saveFilters] are dependencies to useEffect
                      // ensures it will re-render only if those 2 changes

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters</Text>
      <FilterSwitch 
        label='Gluten-free' 
        state={isGlutenFree} 
        onChange={newValue => setIsGlutenFree(newValue)} 
      />
      <FilterSwitch 
        label='Lactose-free' 
        state={isLactoseFree} 
        onChange={newValue => setIsLactoseFree(newValue)} 
      />
      <FilterSwitch 
        label='Vegan' 
        state={isVegan} 
        onChange={newValue => setIsVegan(newValue)} 
      />
      <FilterSwitch 
        label='Vegetarian' 
        state={isVegetarian} 
        onChange={newValue => setIsVegetarian(newValue)} 
      />
    </View>
  );
};

FiltersScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Filter Meals',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName="ios-save"
          onPress={navData.navigation.getParam('save')}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center'
  },
  filterContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginVertical: 15
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    margin: 20,
    textAlign: 'center'
  }
});

export default FiltersScreen;