import React from 'react'
import { View, Animated, Button } from 'react-native'
import { useFade } from '../hooks/useFade';

export const FadeScreen = () => {

    const { opacity, fadeIn, fadeOut } = useFade();

    return (
        <View style={{
            flex: 1,
            backgroundColor: 'grey',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Animated.View style={{
                backgroundColor: '#084FGA',
                width: 150,
                height: 150,
                borderColor: 'white',
                borderWidth: 20,
                opacity: opacity
            }} />
            <Button title="push IN" onPress={() => fadeIn()} />
            <Button title="push OU" onPress={() => fadeOut()} />
        </View>
    )
}