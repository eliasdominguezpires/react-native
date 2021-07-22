import React, { useRef } from 'react'
import { Animated, Easing } from 'react-native';

export const useAnimation = () => {

    const opacity = useRef(new Animated.Value(0)).current;
    const position = useRef(new Animated.Value(0)).current;

    const fadeIn = (duration: number = 500) => {
        Animated.timing(
            opacity,
            {
                toValue: 1,
                duration: duration,
                useNativeDriver: true,
            }
        ).start(() => 'La animacion termino');
    }

    const fadeOut = () => {
        Animated.timing(
            opacity,
            {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }
        ).start();

        Animated.timing(
            position,
            {
                toValue: -100,
                duration: 700,
                useNativeDriver: true
            }
        ).start();
    }

    const startPosition = (initPosition: number, duration = 300) => {
        position.setValue(initPosition);

        Animated.timing(
            position,
            {
                toValue: 0,
                duration,
                useNativeDriver: true,
                easing: Easing.bounce
            }
        ).start();
    }

    return {
        opacity,
        position,
        fadeIn,
        fadeOut,
        startPosition
    }
}