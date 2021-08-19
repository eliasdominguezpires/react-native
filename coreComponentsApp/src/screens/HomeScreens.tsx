import React from 'react'
import { View, FlatList } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';

import Icon from "react-native-vector-icons/Ionicons";

import { styles } from '../themes/appTheme';
import { menuItems } from '../data/menuItems';

import { FlatListMenuItem } from '../components/FlatListMenuItem';
import { HeaderComponent } from '../components/HeaderComponent';
import { ItemSeparetor } from '../components/ItemSeparetor';



export const HomeScreens = () => {

    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, ...styles.globalMargin }}>
            <Icon
                name="star-outline"
                size={50}
                color="grey"
                onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            />
            <FlatList
                data={menuItems}
                renderItem={({ item, index }) => <FlatListMenuItem menuItem={item} />}
                keyExtractor={(item) => item.name}
                ListHeaderComponent={() => <HeaderComponent title="Opcions de Menu" />}
                ItemSeparatorComponent={() => <ItemSeparetor />}
            />
        </View>
    )
}