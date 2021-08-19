import React, { useContext } from 'react';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentOptions, DrawerContentScrollView } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';

import { AuthContext } from '../contexts/auth/AuthContexts';
import { ThemeContext } from '../contexts/theme/ThemeContexts';
import { styles } from '../themes/appTheme';


import { Button, Image, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { LoadingScreen } from '../screens/login/LoadingScreen';

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
import { ProtectedScreen } from '../screens/login/ProtectedScreen';

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {

    const { width, height } = useWindowDimensions();

    const { status } = useContext(AuthContext);

    if (status === 'checkin') return <LoadingScreen />

    return (

        <Drawer.Navigator
            // drawerPosition="right" //para ubicar el menu lateral
            drawerType={
                width >= 758 ? 'permanent' : 'front'
            } //para configurar al drawer, mostrar siempre permanent
            drawerContent={(props) => <MenuInterno {...props} />}
            // initialRouteName="Navigator"
        >
            <Drawer.Screen name="HomeScreen" component={HomeScreens} />
            <Drawer.Screen name="Animation101Screen" component={Animation101Screen} />
            <Drawer.Screen name="Animation102Screen" component={Animation102Screen} />
            <Drawer.Screen name="SwitchScreen" component={SwitchScreen} />
            <Drawer.Screen name="AlertScreen" component={AlertScreen} />
            <Drawer.Screen name="TextInputScreen" component={TextInputScreen} />
            <Drawer.Screen name="PullToRefreshScreen" component={PullToRefreshScreen} />
            <Drawer.Screen name="SestionListScreen" component={SestionListScreen} />
            <Drawer.Screen name="ModalScreen" component={ModalScreen} />
            <Drawer.Screen name="InfiniteScrollScree" component={InfiniteScrollScree} />
            <Drawer.Screen name="SlidesScreen" component={SlidesScreen} />
            <Drawer.Screen name="ThemeScreen" component={ThemeScreen} />
            <Drawer.Screen name="ProtectedScreen" component={ProtectedScreen} />
        </Drawer.Navigator>
    );
}


const MenuInterno = (props: DrawerContentComponentProps<DrawerContentOptions>) => {
    const { theme } = useContext(ThemeContext);
    const { user, token, logOut } = useContext(AuthContext);

    const logoudClose = () => {
        props.navigation.dispatch(DrawerActions.toggleDrawer());
        logOut();
    }

    return (
        <DrawerContentScrollView>
            {/* contenedor del avatar  */}
            <View style={
                styles.avatarContainer
            }>
                <TouchableOpacity activeOpacity={0.8}>
                    <Image source={{
                        uri: user?.img ? user?.img : 'https://telarnicaragua.com/images/profile/default.png'
                    }}
                        style={styles.avatar}
                    />
                    <Text>{user?.nombre}</Text>
                </TouchableOpacity>
            </View>
            {/* Opciones de Menu */}
            <View style={styles.menuContainer}>
                <TouchableOpacity style={styles.menuBoton} onPress={() => props.navigation.navigate('ProtectedScreen')}>
                    <Icon name="airplane-outline" size={20} color="grey" />

                    <Text style={{ ...styles.menuTexto, color: theme.colors.text }}> Nome</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuBoton} onPress={() => props.navigation.navigate('SlidesScreen')}>
                    <Icon name="airplane-outline" size={20} color="grey" />

                    <Text style={{ ...styles.menuTexto, color: theme.colors.text }}> SlidesScreen</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Button
                    title="logout"
                    color="#5856D6"
                    onPress={logoudClose}
                    
                />
            </View>
        </DrawerContentScrollView>
    );
}