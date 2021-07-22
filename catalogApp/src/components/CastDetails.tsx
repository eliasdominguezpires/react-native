import React from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import { Cast } from '../interfaces/creditsInterfaces';

interface Props {
    actor: Cast
}

export const CastDetails = ({ actor }: Props) => {

    const uri = `https://image.tmdb.org/t/p/w500/${actor.profile_path}`;

    return (
        <View style={styles.container}>
            {
                actor.profile_path && <Image source={{ uri }} style={styles.image} />
            }

            <View style={styles.info}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{actor.name}</Text>
                <Text style={{ fontSize: 18, opacity: 0.7 }}>{actor.character}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 55,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 15,

        marginRight: 10,
        marginLeft: 10,
        paddingRight: 10,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.51,
        shadowRadius: 13.16,
        elevation: 6,
    },
    image: { width: 50, height: 50, borderRadius: 10, marginTop: 3},
    info: { marginLeft: 10, marginTop: 3 }
});