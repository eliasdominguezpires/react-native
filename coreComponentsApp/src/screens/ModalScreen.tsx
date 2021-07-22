import React, { useState } from 'react'
import { Text, View, StyleSheet, Button, Modal } from 'react-native'
import { HeaderComponent } from '../components/HeaderComponent'
import { styles } from '../theme/appTheme'

export const ModalScreen = () => {

    const [isVisible, setIsVisible] = useState(false);

    return (
        <View style={styles.globalMargin}>
            <HeaderComponent title="Modal Screen" />

            <Button
                title="Abrir modal"
                onPress={() => setIsVisible(true)}
            />

            <Modal
                animationType="fade"
                visible={isVisible}
                transparent={true}
            >
                {/* Background  */}
                <View style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    {/* Contenido */}
                    <View style={{
                        width: 200,
                        height: 200,
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        alignItems: 'center',
                        shadowOffset: {
                            width: 0,
                            height: 10
                        },
                        shadowOpacity: 0.25,
                        elevation: 20,
                        borderRadius: 5
                    }}>
                        <HeaderComponent title="Modal Title" />
                        <Text style={{
                            fontSize: 20,
                            fontWeight: '300',
                            marginBottom: 20
                        }}>Cuerpo</Text>
                        <Button
                            title="Close"
                            onPress={() => setIsVisible(false)}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    )
}