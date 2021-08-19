import React, { useContext } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

import { ThemeContext } from '../contexts/theme/ThemeContexts';

import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { MenuItem } from '../interfaces/interfaces';

interface Props {
    menuItem: MenuItem
}

export const FlatListMenuItem = ({ menuItem }: Props) => {

    const { theme:{
        colors
    } } = useContext(ThemeContext);
    
    const navigarion = useNavigation();

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigarion.navigate(menuItem.compoonent)}
        >
            <View style={styles.container}>
                <Icon name={menuItem.icon}
                    color="grey"
                    size={22}
                />
                <Text style={{
                    ...styles.texto,
                    color: colors.text
                }}>
                    {menuItem.name}
                </Text>
                <View style={{ flex: 1 }} />
                <Icon name="chevron-forward-outline"
                    color="grey"
                    size={22}
                />

            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    texto: {
        marginLeft: 5,
        fontSize: 18
    }
});