import React, { useContext } from 'react';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentOptions, DrawerContentScrollView } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import { ThemeContext } from '../contexts/theme/ThemeContexts';
import { styles } from '../theme/appTheme';


import { Image, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { Navigator } from './Navigator';
import { SlidesScreen } from '../components/SlidesScreen';

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {

    const { width, height } = useWindowDimensions();
    const { theme } = useContext(ThemeContext);

    return (
        <NavigationContainer
            theme={theme}
        >
            <Drawer.Navigator
                // drawerPosition="right" //para ubicar el menu lateral
                drawerType={
                    width >= 758 ? 'permanent' : 'front'
                } //para configurar al drawer, mostrar siempre permanent
                drawerContent={(props) => <MenuInterno {...props} />}
            >
                <Drawer.Screen name="Navigator" component={Navigator} />
                <Drawer.Screen name="SlidesScreen" component={SlidesScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}


const MenuInterno = (props: DrawerContentComponentProps<DrawerContentOptions>) => {
    const { theme } = useContext(ThemeContext);

    return (
        <DrawerContentScrollView>
            {/* contenedor del avatar  */}
            <View style={
                styles.avatarContainer
            }>
                <Image source={{
                    uri: 'https://telarnicaragua.com/images/profile/default.png'
                }}
                    style={styles.avatar}
                />
            </View>
            {/* Opciones de Menu */}
            <View style={styles.menuContainer}>
                <TouchableOpacity style={styles.menuBoton} onPress={() => props.navigation.navigate('Navigator')}>
                    <Icon name="airplane-outline" size={20} color="grey" />

                    <Text style={{ ...styles.menuTexto, color: theme.colors.text }}> Navigator</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuBoton} onPress={() => props.navigation.navigate('SlidesScreen')}>
                    <Icon name="airplane-outline" size={20} color="grey" />

                    <Text style={{ ...styles.menuTexto, color: theme.colors.text }}> SlidesScreen</Text>
                </TouchableOpacity>
            </View>
        </DrawerContentScrollView>
    );
}