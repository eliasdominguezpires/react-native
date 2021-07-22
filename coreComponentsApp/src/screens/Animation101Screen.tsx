import React from 'react'
import { View, StyleSheet, Animated, Button } from 'react-native';
import { useAnimation } from '../hooks/useAnimation';

export const Animation101Screen = () => {

    const { fadeIn, fadeOut, opacity, position, startPosition } = useAnimation();

    return (
        <View style={styles.container}>
            <Animated.View style={{
                ...styles.purpleBox,
                opacity: opacity,
                transform: [{
                    translateY: position,
                    // translateX: position
                }]
            }} />
            <Button
                title="Fade IN"
                onPress={() => {
                    fadeIn();
                    startPosition(-100);
                }}
            />

            <Button
                title="Fade OU"
                onPress={fadeOut}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    purpleBox: {
        backgroundColor: '#5856D6',
        width: 150,
        height: 150
    }
});