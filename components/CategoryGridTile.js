import React from 'react';
import { TouchableOpacity, View, Tex, StyleSheet } from 'react-native';
import CategoriesScreen from '../screens/CategoriesScreen';

const CategoryGridTile = props => {
    return (
        <TouchableOpacity
        style={styles.gridItem}
        onPress={() => {props.onSelect}}
      >
        <View>
          <Text>{props.title}</Text>
        </View>
      </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150
  }
});

export default CategoriesScreen;