import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from "../screens/HomeScreen";
import { DetailScreen } from "../screens/DetailScreen";
import { Movies } from "../interface/movieInterface";

export type RootStackParams = {
  HomeScreen: undefined;
  DetailScreen: Movies
}
const Stack = createStackNavigator();

export const Navigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white'
        }
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="DetailScreen" options={{cardStyle: {backgroundColor: '#F3F1F1'}}} component={DetailScreen} />
    </Stack.Navigator>
  );
}