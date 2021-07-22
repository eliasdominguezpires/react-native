import 'react-native-gesture-handler';

import React from 'react'
import { NavigationContainer } from '@react-navigation/native';

import { NavigationScreen } from './src/navigator/NavigationScreen';
import { GradientProvider } from './src/contexts/GradientContexts';
import { DimensionProvider } from './src/contexts/DimensionsContexts';
// import { FadeScreen } from './src/screens/FadeScreen';

const AppState = ({ children }: any) => {
  return (
    <GradientProvider>
      {children}
    </GradientProvider>
  )
}

const AppStateDimension = ({ children }: any) => {
  return (
    <DimensionProvider>
      {children}
    </DimensionProvider>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <AppStateDimension>
        <AppState>
          <NavigationScreen />
          {/* <FadeScreen /> */}
        </AppState>
      </AppStateDimension>
    </NavigationContainer>
  )
}

export default App;