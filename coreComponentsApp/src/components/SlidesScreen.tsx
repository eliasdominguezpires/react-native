import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useRef, useState } from 'react';
import {
    Text, View, StyleSheet, SafeAreaView,
    ImageSourcePropType, useWindowDimensions, Image,
    TouchableOpacity, Animated
} from 'react-native';

import Carousel, { Pagination } from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/Ionicons';

import { ThemeContext } from '../contexts/theme/ThemeContexts';
import { useAnimation } from '../hooks/useAnimation';

interface Slide {
    title: string;
    desc: string;
    img: ImageSourcePropType
}

const items: Slide[] = [
    {
        title: 'Titulo 1',
        desc: 'Ea et eu enim fugiat sunt reprehenderit sunt aute quis tempor ipsum cupidatat et.',
        img: require('../assets/slide-1.png')
    },
    {
        title: 'Titulo 2',
        desc: 'Anim est quis elit proident magna quis cupidatat culpa labore Lorem ea. Exercitation mollit velit in aliquip tempor occaecat dolor minim amet dolor enim cillum excepteur. ',
        img: require('../assets/slide-2.png')
    },
    {
        title: 'Titulo 3',
        desc: 'Ex amet duis amet nulla. Aliquip ea Lorem ea culpa consequat proident. Nulla tempor esse ad tempor sit amet Lorem. Velit ea labore aute pariatur commodo duis veniam enim.',
        img: require('../assets/slide-3.png')
    },
];

interface Props extends StackScreenProps<any, any> { };

//const { width, height } = Dimensions.get('window');

export const SlidesScreen = ({ navigation }: Props) => {

    const { theme: { colors } } = useContext(ThemeContext);

    const { width } = useWindowDimensions();

    const [activeIndex, setActiveIndex] = useState(0);
    const { opacity, fadeIn } = useAnimation();

    const isVisible = useRef(false);

    const renderItem = (item: Slide) => {
        return (
            <View style={{
                flex: 1,
                // backgroundColor: 'white',
                borderRadius: 5,
                padding: 40,
                justifyContent: 'center'
            }}>
                <Image
                    source={item.img}
                    style={{
                        width: 350,
                        height: 400,
                        resizeMode: 'center'
                    }}
                />
                <Text style={styles.title}>{item.title}</Text>
                <Text style={{ ...styles.subTitle, color: colors.text }}>{item.desc}</Text>
            </View>
        )
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                paddingTop: 50
            }}
        >
            <Carousel
                // ref={(c) => { this._carousel = c; }}
                data={items}
                renderItem={({ item }) => renderItem(item)}
                sliderWidth={width}
                itemWidth={width}
                layout="default"
                onSnapToItem={(index) => {
                    setActiveIndex(index);
                    if (index === (items.length - 1)) {
                        isVisible.current = true;
                        fadeIn();
                    }
                }}
            />
            <View style={{
                // backgroundColor: 'red'
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 15,
                alignItems: 'center'
            }}>
                <Pagination
                    dotsLength={items.length}
                    activeDotIndex={activeIndex}
                    // dotColor="red"
                    dotStyle={{
                        width: 8,
                        height: 8,
                        borderRadius: 3,
                        // backgroundColor: '#5656d6'
                    }}
                />
                <Animated.View
                    style={{
                        opacity: opacity
                    }}
                >
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            backgroundColor: '#5656d6',
                            width: 80,
                            height: 30,
                            borderRadius: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        activeOpacity={0.7}
                        onPress={() => {
                            if (isVisible.current) {
                                navigation.navigate('HomeScreen');
                            }
                        }}
                    >
                        <Text style={{
                            fontSize: 15,
                            color: colors.text
                        }}> Enviar</Text>
                        <Icon
                            name="chevron-forward-outline"
                            color="grey"
                            size={15}
                        />
                    </TouchableOpacity>
                </Animated.View>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#5656d6'
    },
    subTitle: {
        fontSize: 16,

    }
});