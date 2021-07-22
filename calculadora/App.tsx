import React from 'react'
import { SafeAreaView, StatusBar } from 'react-native';
import { Calculadora } from './src/screens/CalculadoraScreen';
import { styles } from './src/theme/appTheme';

const App = () => {
  return (
    <SafeAreaView style={styles.fondo}>
      <StatusBar
        backgroundColor='black'
        barStyle="light-content"
      />
      <Calculadora />
    </SafeAreaView>
  )
}

export default App;