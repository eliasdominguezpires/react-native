import React, { useContext } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerNavigator } from './DrawerNavigator';

import { ThemeContext } from '../contexts/theme/ThemeContexts';
import { AuthContext } from '../contexts/auth/AuthContexts';

import { LoadingScreen } from '../screens/login/LoadingScreen';
import { LoginScreen } from '../screens/login/LoginScreen';
import { RegisterScreen } from '../screens/login/RegisterScreen';
import { ProductsNavigator } from './ProductsNavigator';
import { HomeScreens } from '../screens/HomeScreens';

const Stack = createStackNavigator();

export const Navigator = () => {
    const { theme } = useContext(ThemeContext);

    const { status } = useContext(AuthContext);

    if (status === 'checkin') return <LoadingScreen />

    return (
        <NavigationContainer
            theme={theme}
        >

            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                {
                    (status === 'authenticated')
                        ? (
                            <>
                                <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
                                <Stack.Screen name="HomeScreen" component={HomeScreens} />

                                {/* <Stack.Screen name="SlidesScreen" component={SlidesScreen} /> */}
                            </>
                        )
                        : (
                            <>
                                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                                <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                            </>

                        )

                }

            </Stack.Navigator>
        </NavigationContainer>

    )
}