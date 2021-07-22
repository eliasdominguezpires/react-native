import React, { useContext } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { HeaderComponent } from '../components/HeaderComponent';
import { styles } from '../theme/appTheme';
import { ThemeContext } from '../contexts/theme/ThemeContexts';

export const ThemeScreen = () => {

    const { setLightTheme, setDarkTheme, theme: {
        colors
    } } = useContext(ThemeContext);
    return (
        <View style={styles.globalMargin}>
            <HeaderComponent title="Theme" />
            <View style={{
                flexDirection: 'row', justifyContent: 'space-between'
            }}>
                <TouchableOpacity
                    style={{
                        width: 150,
                        height: 45,
                        borderRadius: 20,
                        justifyContent: 'center',
                        backgroundColor: "#5656d6"
                    }}
                    activeOpacity={0.7}
                    onPress={setLightTheme}
                >
                    <Text style={{
                        fontSize: 22,
                        color: 'white', 
                        textAlign: 'center',
                    }}>Light</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        width: 150,
                        height: 45,
                        borderRadius: 20,
                        justifyContent: 'center',
                        backgroundColor: "#5656d6"
                    }}
                    activeOpacity={0.7}
                    onPress={setDarkTheme}
                >
                    <Text style={{
                        fontSize: 22,
                        color: 'white',
                        textAlign: 'center',
                    }}> Dark</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const stylesThme = StyleSheet.create({

});