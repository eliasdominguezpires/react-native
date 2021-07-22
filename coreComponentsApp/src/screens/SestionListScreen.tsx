import React, { useContext } from 'react'
import { Text, View, StyleSheet, SectionList } from 'react-native'
import { HeaderComponent } from '../components/HeaderComponent'
import { styles } from '../theme/appTheme';
import { ItemSeparetor } from '../components/ItemSeparetor';
import { ThemeContext } from '../contexts/theme/ThemeContexts';

interface Casas {
    casa: string;
    data: string[];
}

const casas: Casas[] = [
    {
        casa: "DC Comics",
        data: ["Batman", "Superman", "Robin", "", ""]
    },
    {
        casa: "Marvel Comics",
        data: ["Iron Man", "Thor", "Spiderman", "Loki", "Hulk", "Black Widow", "Nick",]
    },
    {
        casa: "Anime",
        data: ["Naruto", "Dragon Ball", "One Punch", "7 Pecados Capitales", "Boruto", "Caballeros del Sodiaco", "Samurai X", "Bleach"]
    }
];

export const SestionListScreen = () => {


    const { theme: { colors } } = useContext(ThemeContext);

    return (
        <View style={{
            ...styles.globalMargin,
            flex: 1
        }}>
            {/* */}
            <SectionList
                sections={casas}
                keyExtractor={(item, index) => item + index}

                ListHeaderComponent={() => <HeaderComponent title="Seciton List" />}
                ListFooterComponent={() => (
                    <View style={{ marginBottom: 30 }}>
                        <HeaderComponent title={'Total de Categorias ' + casas.length} />
                    </View>
                )}

                renderItem={({ item }) => <Text style={{ color: colors.text }}>{item}</Text>}
                stickySectionHeadersEnabled

                renderSectionHeader={({ section }) => (
                    <View style={{
                        // backgroundColor: 'white'
                    }}>
                        <HeaderComponent title={section.casa} />
                    </View>
                )}
                renderSectionFooter={({ section }) => (
                    <Text style={{ color: colors.text }}>{'total ' + section.data.length}</Text>
                )}

                // ItemSeparatorComponent={() => <ItemSeparetor />}
                SectionSeparatorComponent={() => <ItemSeparetor />}

                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={true}
            />
        </View>
    )
}