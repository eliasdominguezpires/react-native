import React, { useContext, useState } from 'react'
import { View, Switch, Platform, Text, StyleSheet } from 'react-native';
import { CustomSwitch } from '../components/CustomSwitch';
import { HeaderComponent } from '../components/HeaderComponent';
import { ThemeContext } from '../contexts/theme/ThemeContexts';

export const SwitchScreen = () => {

    const { theme: { colors } } = useContext(ThemeContext);

    const [state, setState] = useState({
        isActive: true,
        isHungry: false,
        isHappy: true
    });

    const { isActive, isHungry, isHappy } = state;

    const onChange = (value: boolean, field: keyof typeof state) => {
        setState({
            ...state,
            [field]: value
        })
    }

    return (
        <View style={{
            marginHorizontal: 15
        }}>
            <HeaderComponent title="Shiches" />
            <View>
                <Text style={{ ...styles.text, color: colors.text }}>isActive</Text>
                <CustomSwitch isOn={isActive} onChange={(value) => onChange(value, 'isActive')} />
            </View>

            <View>
                <Text style={{ ...styles.text, color: colors.text }}>isHungry</Text>
                <CustomSwitch isOn={isHungry} onChange={(value) => onChange(value, 'isHungry')} />
            </View>

            <View>
                <Text style={{ ...styles.text, color: colors.text }}>isHappy</Text>
                <CustomSwitch isOn={isHappy} onChange={(value) => onChange(value, 'isHappy')} />
            </View>

            <Text style={{ ...styles.text, color: colors.text }}>
                {
                    JSON.stringify(state, null, 5)
                }
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    switchRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: 10
    },
    text: {
        fontSize: 25,
    }
});