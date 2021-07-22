import React, { useEffect } from 'react'
import { Text, View, StyleSheet, Animated, } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useContext } from 'react';
import { GradientContext } from '../contexts/GradientContexts';
// import { color } from 'react-native-reanimated';
import { useFade } from '../hooks/useFade';

interface Props {
    children: JSX.Element | JSX.Element[]
}

export const GradientBackground = ({ children }: Props) => {

    const { colors, prevColors, setPrevMainColors } = useContext(GradientContext);

    const { opacity, fadeIn, fadeOut } = useFade();

    useEffect(() => {
        fadeIn(() => {
            setPrevMainColors(colors);
            fadeOut(0);
        });
    }, [colors])

    return (
        <View style={{ flex: 1 }}>
            <LinearGradient
                colors={[prevColors.primary, colors.secundary, 'white']}
                style={{ ...StyleSheet.absoluteFillObject }}
                start={{ x: 0.1, y: 0.1 }}
                end={{ x: 0.5, y: 0.7 }}
            />
            <Animated.View
                style={{
                    ...StyleSheet.absoluteFillObject,
                    opacity
                }}>
                <LinearGradient
                    colors={[colors.primary, colors.secundary, 'white']}
                    style={{ ...StyleSheet.absoluteFillObject }}
                    start={{ x: 0.1, y: 0.1 }}
                    end={{ x: 0.5, y: 0.7 }}
                />
            </Animated.View>
            {children}
        </View>
    )
}