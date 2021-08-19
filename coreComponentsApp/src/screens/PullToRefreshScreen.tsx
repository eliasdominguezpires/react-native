import React, { useState } from 'react'
import { Text, View, StyleSheet, ScrollView, RefreshControl } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { HeaderComponent } from '../components/HeaderComponent'
import { styles } from '../themes/appTheme'

export const PullToRefreshScreen = () => {

    const [refreshing, setRefreshing] = useState(false);
    const [data, setData] = useState<string>();

    const onRefresh = () => {
        setRefreshing(true);

        setTimeout(() => {
            setRefreshing(false);
            setData('Hola Mundo');
        }, 1500);
    }

    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    progressViewOffset={50}
                    // progressBackgroundColor=""
                    colors={['grey', 'red', 'orange', 'black']}
                    // style={{
                    //     backgroundColor: 'grey'
                    //     //Solo IOS
                    // }}
                    // tintColor="white"
                    title="Refreshing"
                    // titleColor=""
                />
            }
        >

            <View style={styles.globalMargin}>
                <HeaderComponent title="Pull to Refresh" />

                <Text>{data}</Text>

            </View>
        </ScrollView>
    )
}