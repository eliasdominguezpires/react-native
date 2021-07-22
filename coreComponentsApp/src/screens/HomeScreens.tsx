import React from 'react'
import { View, FlatList } from 'react-native';

import Icon from "react-native-vector-icons/Ionicons";

import { styles } from '../theme/appTheme';

import { FlatListMenuItem } from '../components/FlatListMenuItem';
import { menuItems } from '../data/menuItems';
import { HeaderComponent } from '../components/HeaderComponent';
import { ItemSeparetor } from '../components/ItemSeparetor';



export const HomeScreens = () => {

    return (
        <View style={{ flex: 1, ...styles.globalMargin }}>
            <Icon
                name="star-outline"
                size={50}
                color="grey"
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