import React, { useState } from 'react'
import { Text, View, StyleSheet, FlatList, Image, ActivityIndicator } from 'react-native';
import { FadeInImage } from '../../components/FadeInImage';
import { HeaderComponent } from '../../components/HeaderComponent';
import { styles as stylesGlobal } from '../../themes/appTheme';

export const InfiniteScrollScree = () => {

    const [numbers, setNumbers] = useState([0, 1, 2, 3, 4, 5]);

    const loadMore = () => {
        const newArray: number[] = [];
        for (let i = 0; i < 5; i++) {
            newArray[i] = numbers.length + i;
        }

        // setTimeout(() => {
        //     setNumbers([...numbers, ...newArray]);
        // }, 1500);

        setNumbers([...numbers, ...newArray]);
    }

    const renderItem = (item: number) => {
        return (
            // <Text style={styles.textItem}>{item}</Text>
            /*<Image
                source={{ uri: `https://picsum.photos/id/${item}/500/600` }}
                style={{ width: '100%', height: 400 }}
            />*/

            <FadeInImage
                uri={`https://picsum.photos/id/${item}/500/600`}
                style={{
                    width: '100%',
                    height: 400,
                    borderRadius: 5,
                }}
            />
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={numbers}
                keyExtractor={(item) => item.toString()}
                renderItem={({ item }) => renderItem(item)}

                ListHeaderComponent={() => (
                    <View style={stylesGlobal.globalMargin}>
                        <HeaderComponent title="Infinite Scroll" />
                    </View>
                )}

                onEndReached={() => { loadMore() }}
                onEndReachedThreshold={0.5}

                ListFooterComponent={() => (
                    <View style={{
                        width: '100%',
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <ActivityIndicator size={30} color="white" />
                    </View>
                )}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    textItem: {
        backgroundColor: "grey",
        height: 150
    }
});