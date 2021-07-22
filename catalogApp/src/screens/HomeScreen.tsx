import React, { useEffect } from 'react';
import { ActivityIndicator, View, Dimensions, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Carousel from 'react-native-snap-carousel';
// import ImageColors from 'react-native-image-colors';

import { Tarjeta } from '../components/Tarjeta';
import { useMovies } from '../hooks/useMovies';

import { HorizontalSlider } from '../components/HorizontalSlider';
import { GradientBackground } from '../components/GradientBackground';
import { getImageColors } from '../helpers/getColors';
import { useContext } from 'react';
import { GradientContext } from '../contexts/GradientContexts';
import { DimensionsContext } from '../contexts/DimensionsContexts';

// const { width: windowsWidth } = Dimensions.get('window');

export const HomeScreen = () => {

    const { width } = useContext(DimensionsContext);
    const { setMainColors } = useContext(GradientContext);

    const { nowPlaying, popular, topRated, upComing, isLoading, popularTV } = useMovies();
    const { top } = useSafeAreaInsets();

    const getPosterColors = async (index: number) => {
        const movie = nowPlaying[index];
        const uri = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

        const [primary = '#084F6A', secundary = '#75CEDB'] = await getImageColors(uri);

        setMainColors({ primary, secundary });
        // console.log(primary, secundary);
    }

    useEffect(() => {
        if (nowPlaying.length > 0) {
            getPosterColors(0);
        }
    }, [nowPlaying]);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator color='red' size={100} />
            </View>
        )
    }

    return (
        <GradientBackground>
            <ScrollView>
                <View style={{ marginTop: top + 20 }}>
                    {/* <Tarjeta movie={peliculasEnCine[1]} /> */}
                    <View style={{ height: 380 }}>
                        {/* Carousen principal */}
                        <Carousel
                            data={nowPlaying}
                            renderItem={({ item }: any) => <Tarjeta movie={item} />}
                            sliderWidth={width}
                            itemWidth={250}
                            inactiveSlideOpacity={0.6}
                            onSnapToItem={index => getPosterColors(index)}
                        />
                    </View>
                    {/* slider's */}
                    <HorizontalSlider title={"Popular"} movies={popular} />
                    <HorizontalSlider title={"Top"} movies={topRated} />
                    <HorizontalSlider title={"Próximamente"} movies={upComing} />
                    <HorizontalSlider title={"Series"} movies={popularTV} />
                </View>
            </ScrollView>
        </GradientBackground>
    )
}