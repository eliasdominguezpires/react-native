import React from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native';

import { Movie } from '../interfaces/movieInterface';
import { Tarjeta } from './Tarjeta';

interface Props {
    title?: string;
    movies: Movie[];

}

export const HorizontalSlider = ({ title, movies }: Props) => {
    return (
        <View style={{
            height: (title) ? 220 : 200
        }}>
            {
                title &&
                <Text style={{
                    fontSize: 20, fontWeight: 'bold',
                    marginLeft: 7
                }}>{title}
                </Text>
            }
            <FlatList
                data={movies}
                renderItem={({ item }: any) => (
                    <Tarjeta movie={item} width={120} height={180} />
                )}
                keyExtractor={(item) => item.id.toString()}
                horizontal={true}
            />
        </View>
    )
}