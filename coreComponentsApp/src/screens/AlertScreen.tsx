import React from 'react'
import { View, Button, Alert } from 'react-native';

import prompt from 'react-native-prompt-android';

import { HeaderComponent } from '../components/HeaderComponent'
import { styles } from '../themes/appTheme';
import { CustomAlert } from '../components/CustomAlert';



export const AlertScreen = () => {

    const showAlert = () => {
        Alert.alert(
            "Titulo",
            "My Alert Msg",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "destructive"
                },
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            {
                cancelable: true,
                onDismiss: () => console.log('onDismis'),

            }
        )
    };

    const showAlert2 = () => {
        CustomAlert({ title: 'Titulo Enviado', message: '' });
    };

    const shorPromt = () => {
        /* 
            Alert.prompt(
            'estas seguro ?',
            'Esta accion no se puede revertir',
            (valor: string) => console.log('info', valor),
            'login-password',
            'Valor por defecto',
            'numeric' // tipo de teclado por defecto
            );
        */
        prompt(
            'Enter password',
            'Enter your password to claim your $1.5B in lottery winnings',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'OK', onPress: password => console.log('OK Pressed, password: ' + password) },
            ],
            {
                type: 'secure-text',
                cancelable: false,
                defaultValue: 'test',
                placeholder: 'placeholder'
            }
        );
    };

    return (
        <View style={styles.globalMargin}>
            <HeaderComponent title="Alert" />

            <Button
                title="Show Alert"
                onPress={showAlert}
            />

            <View style={{ height: 10 }} />
            <Button
                title="Custom Alert"
                onPress={showAlert2}
            />

            <View style={{ height: 10 }} />
            <Button
                title="show Promt"
                onPress={shorPromt}
            />
        </View>
    )
}