import React from 'react'
import { Text, TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from 'react-native';

interface Props {
    title: string;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
}

export const BlackButton = ({ title, onPress, style = {} }: Props) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            style={{
                ...style as any,
                ...styles.blackButton
            }}
        >
            <Text style={styles.textButton}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    blackButton: {
        height: 30,
        width: 150,
        backgroundColor: 'black',
        borderRadius: 50,
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.27,
        elevation: 6
    },
    textButton: {
        color: 'white',
        fontSize: 19,

    }
});