import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import { Navigator } from './src/navigator/Navigator';

import { ThemeProvider } from './src/contexts/theme/ThemeContexts';
import { DrawerNavigator } from './src/navigator/DrawerNavigator';

/*const customTheme: Theme = {
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    // primary: '',
    // background: '#2e2e2e',
    // card: '',
    // text: '',
    // border: '',
    // notification: '',
  }
}
*/
const App = () => {
  return (
    <AppStateTheme>
      {/* <Navigator /> */}
      <DrawerNavigator />
    </AppStateTheme>
  )
}

const AppStateTheme = ({ children }: any) => {
  return (
    <ThemeProvider >
      {children}
    </ThemeProvider>
  )
}

export default App;