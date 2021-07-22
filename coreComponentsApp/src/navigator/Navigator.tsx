import React, { useContext } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { ThemeContext } from '../contexts/theme/ThemeContexts';

import { HomeScreens } from '../screens/HomeScreens';
import { Animation101Screen } from '../screens/Animation101Screen';
import { Animation102Screen } from '../screens/Animation102Screen';
import { SwitchScreen } from '../screens/SwitchScreen';
import { AlertScreen } from '../screens/AlertScreen';
import { TextInputScreen } from '../screens/TextInputScreen';
import { PullToRefreshScreen } from '../screens/PullToRefreshScreen';
import { SestionListScreen } from '../screens/SestionListScreen';
import { ModalScreen } from '../screens/ModalScreen';
import { InfiniteScrollScree } from '../screens/InfiniteScrollScree';
import { SlidesScreen } from '../components/SlidesScreen';
import { ThemeScreen } from '../screens/ThemeScreen';

const Stack = createStackNavigator();

export const Navigator = () => {

    const { theme } = useContext(ThemeContext);

    return (
        <NavigationContainer
            theme={theme}
        >
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="HomeScreen" component={HomeScreens} />
                <Stack.Screen name="Animation101Screen" component={Animation101Screen} />
                <Stack.Screen name="Animation102Screen" component={Animation102Screen} />
                <Stack.Screen name="SwitchScreen" component={SwitchScreen} />
                <Stack.Screen name="AlertScreen" component={AlertScreen} />
                <Stack.Screen name="TextInputScreen" component={TextInputScreen} />
                <Stack.Screen name="PullToRefreshScreen" component={PullToRefreshScreen} />
                <Stack.Screen name="SestionListScreen" component={SestionListScreen} />
                <Stack.Screen name="ModalScreen" component={ModalScreen} />
                <Stack.Screen name="InfiniteScrollScree" component={InfiniteScrollScree} />
                <Stack.Screen name="SlidesScreen" component={SlidesScreen} />
                <Stack.Screen name="ThemeScreen" component={ThemeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}