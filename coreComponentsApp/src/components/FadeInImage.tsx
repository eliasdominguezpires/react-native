import React, { useState } from 'react'
import { Animated, View, ActivityIndicator, StyleProp, ImageStyle } from 'react-native';
import { useAnimation } from '../hooks/useAnimation';

interface Props {
    uri: string;
    style?: StyleProp<ImageStyle>;
}
export const FadeInImage = ({ uri, style }: Props) => {

    const { opacity, fadeIn } = useAnimation();
    const [isLoading, setIsLoading] = useState(true);

    const finisLoading = () => {
        setIsLoading(false);
        fadeIn();
    }

    return (
        <View style={{
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            {
                isLoading &&
                <ActivityIndicator style={{ position: 'absolute' }}
                    color="grey"
                    size={30}
                />
            }
            <Animated.Image
                source={{ uri }}
                // onLoad={() => fadeIn(1000)}
                onLoadEnd={() => finisLoading()}
                style={{
                    ...style as any,
                    //width: '100%',
                    //height: 400,
                    opacity: opacity,
                }}
            />
        </View>

    )
}