import 'react-native-gesture-handler';
import React from 'react';

import { ThemeProvider } from './src/contexts/theme/ThemeContexts';
import { AuthProvider } from './src/contexts/auth/AuthContexts';
import { ProductsProvider } from './src/contexts/products/ProductsContext';

import { Navigator } from './src/navigator/Navigator';

const AppState = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  return (
    <AuthProvider>
      <ProductsProvider>
        {children}
      </ProductsProvider>
    </AuthProvider>
  )
}

const AppStateTheme = ({ children }: any) => {
  return (
    <ThemeProvider >
      {children}
    </ThemeProvider>
  )
}

const App = () => {
  return (
    <AppStateTheme>
      <AppState>
        <Navigator />
        {/* <DrawerNavigator /> */}
      </AppState>
    </AppStateTheme>
  )
}

export default App;