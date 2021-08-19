import React, { useContext, useState } from 'react'
import {
    Text, View, StyleSheet, TextInput, KeyboardAvoidingView, Platform,
    TouchableWithoutFeedback, Keyboard
}
    from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';
import { CustomSwitch } from '../components/CustomSwitch';
import { HeaderComponent } from '../components/HeaderComponent';

import { styles } from '../themes/appTheme';
import { useForm } from '../hooks/useForm';
// import useReducer from 'react';
import { ThemeContext } from '../contexts/theme/ThemeContexts';

export const TextInputScreen = () => {

    const { theme: { colors } } = useContext(ThemeContext);

    const { form, onChange, isSuscribed } = useForm({
        name: '',
        email: '',
        phone: '',
        isSuscribed: false
    });

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.globalMargin}>
                        <HeaderComponent title="Text Input" />
                        <TextInput
                            style={stylesText.inputStyle}
                            placeholder="name"
                            autoCorrect={false}
                            autoCapitalize="words"
                            onChangeText={(value) => onChange(value, 'name')}
                        />
                        <TextInput
                            style={stylesText.inputStyle}
                            placeholder="email"
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={(value) => onChange(value, 'email')}
                            keyboardType="email-address"
                        />
                        <TextInput
                            style={stylesText.inputStyle}
                            placeholder="phone"
                            onChangeText={(value) => onChange(value, 'phone')}
                            keyboardType="phone-pad"
                        />

                        <View>
                            <Text style={{
                                ...stylesText.text,
                                color: colors.text
                            }}>isSuscribed</Text>
                            <CustomSwitch isOn={isSuscribed} onChange={(value) => onChange(value, 'isSuscribed')} />
                        </View>

                        <Text style={{ fontSize: 20, color: colors.text }}>{JSON.stringify(form, null, 2)}</Text>

                        <View style={{ height: 50 }} />
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const stylesText = StyleSheet.create({
    inputStyle: {
        borderWidth: 1,
        height: 35,
        paddingHorizontal: 10,
        borderRadius: 10,
        borderColor: 'grey',
        // borderColor: 'grey',
        marginVertical: 5,
        fontSize: 10
    },
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