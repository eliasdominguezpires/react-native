import React, { useState } from 'react'
import { StyleSheet, Switch, Platform, Alert } from 'react-native';

interface Props {
    title: string,
    message?: string;
    onPressCancel?: (value: boolean) => void;
    onPressOk?: (value: boolean) => void;
}

export const CustomAlert = ({ title, message = '' }: Props) => {

    const onPressCancel = () => {
        console.log("Cancel Pressed");
    }

    const onPressOk = () => {
        console.log("OK Pressed");
    }

    return (
        Alert.alert(
            title,
            message ? message : undefined,
            [
                {
                    text: "Cancel",
                    onPress: () => onPressCancel(),
                    style: "destructive"
                },
                { text: "OK", onPress: () => onPressOk() }
            ],
            {
                cancelable: true,
                onDismiss: () => console.log('onDismis'),

            }
        )
    )
}