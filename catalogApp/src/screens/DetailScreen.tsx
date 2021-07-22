import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';

import { ActivityIndicator, Dimensions, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { RouteStackParams } from '../navigator/NavigationScreen';

import Icon from 'react-native-vector-icons/Ionicons';
import { useMoviesDetails } from '../hooks/useMoviesDetails';
import { MovieDetails } from '../components/MovieDetails';
// import { Movie } from '../interfaces/movieInterface';

const screenHeight = Dimensions.get('screen').height;
//const screenWidth = Dimensions.get('screen').width;


interface Props extends StackScreenProps<RouteStackParams, 'DetailScreen'> { };

export const DetailScreen = (props: Props) => {

    const movie = props.route.params; // as Movie;
    const uri = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

    const { isLoading, movieFull, cast } = useMoviesDetails(movie.id);

    return (
        <ScrollView>
            <View style={styles.imageContainer}>
                <View style={styles.imageBorder}>
                    <Image
                        source={{ uri }}
                        style={styles.image}
                    />
                </View>
            </View>
            <View style={styles.marginContainer}>
                <Text style={styles.title}>{movie.original_title}</Text>
                <Text style={styles.subTitle}>{movie.title}</Text>
            </View>

            {
                isLoading
                    ? <ActivityIndicator size={35} color="grey" style={{ marginTop: 20 }} />
                    : <MovieDetails
                        movieFull={movieFull!} cast={cast}
                    />
            }
            {/* Botton close */}
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => props.navigation.pop()}
            >
                <Icon name="arrow-back-outline"
                    color="#e4d7d7"
                    size={50}

                />
            </TouchableOpacity>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        width: '100%',
        height: screenHeight * 0.7,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.51,
        shadowRadius: 13.16,
        elevation: 6,

        // overflow: 'hidden',
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20
    },
    image: {
        flex: 1,
    },
    imageBorder: {
        flex: 1,
        overflow: 'hidden',
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20
    },
    marginContainer: {
        marginHorizontal: 20,
        marginTop: 20,
    },
    subTitle: {
        fontSize: 16,
        opacity: 0.8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    backButton: {
        position: 'absolute',
        elevation: 6,
        top: 10,
        left: 10,
        opacity: 0.8,
    }
});