import React from 'react';
import { Text, View, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import currencyFormat from "currency-formatter";

import { MovieFull } from '../interfaces/movieInterface';
import { Cast } from '../interfaces/creditsInterfaces';
import { CastDetails } from './CastDetails';

interface Props {
    movieFull: MovieFull,
    cast: Cast[]
}
export const MovieDetails = ({ movieFull, cast }: Props) => {

    return (
        <>
            {/* Detalles */}
            <View style={{ marginHorizontal: 20 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Icon
                        name="star-outline"
                        color="grey"
                        size={16}
                    />
                    <Text>  {movieFull.vote_average} </Text>
                    <Text style={{ marginLeft: 5 }}>
                        -  {movieFull.genres.map(g => g.name).join(', ')}
                    </Text>
                </View>
                <Text style={{ fontSize: 23, marginTop: 10, fontWeight: 'bold' }}>
                    Sinaxis
                </Text>
                <Text style={{ fontSize: 16 }}>{movieFull.overview}</Text>
                <Text style={{ fontSize: 23, marginTop: 10, fontWeight: 'bold' }}>
                    Presupuesto
                </Text>
                <Text style={{ fontSize: 18 }}>{currencyFormat.format(movieFull.budget, { code: 'USD' })}</Text>
            </View>
            {/* Casting */}
            <View style={{ marginTop: 10, marginBottom: 50 }}>
                <Text style={{
                    fontSize: 23, marginTop: 10,
                    fontWeight: 'bold',
                    marginHorizontal: 20
                }}
                >
                    Actores
                </Text>
                <FlatList
                    data={cast}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <CastDetails actor={item} />}
                    horizontal={true}
                    style={{ marginTop: 5, height: 70 }}
                />

            </View>
        </>
    )
}