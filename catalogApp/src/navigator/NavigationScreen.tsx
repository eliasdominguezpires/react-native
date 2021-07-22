import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { HomeScreen } from '../screens/HomeScreen';
import { DetailScreen } from '../screens/DetailScreen';

import { Movie } from '../interfaces/movieInterface';

export type RouteStackParams = {
    HomeScreen: undefined,
    DetailScreen: Movie,
}

const Stack = createStackNavigator<RouteStackParams>();

export const NavigationScreen = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: {
                    // backgroundColor: 'white'
                }
            }}
        >
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="DetailScreen"
                options={{ cardStyle: { backgroundColor: 'white' } }}
                component={DetailScreen}
            />
        </Stack.Navigator>
    );
}