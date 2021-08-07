import { Theme } from "@react-navigation/native";

type ThemeAction =
    | { type: 'set_ligth_theme' }
    | { type: 'set_dark_theme' };


export interface ThemeState extends Theme {
    currentTheme: 'light' | 'dark',
    dividerColor: string,
}

export const lightTheme: ThemeState = {
    currentTheme: 'light',
    dark: false,
    dividerColor: 'rgba(0,0,0,0.4)',
    colors: {
        primary: 'white',
        background: '#eeeeee',
        card: '#eeeeee',
        text: 'black',
        border: 'black',
        notification: 'yellow',
    }
}

export const darkTheme: ThemeState = {
    currentTheme: 'dark',
    dark: true,
    dividerColor: 'rgba(0,0,0,0.4)',
    colors: {
        primary: 'grey',
        background: '#2e2e2e',
        card: '#2e2e2e',
        text: 'white',
        border: '#f0f0f0',
        notification: 'teal',
    }
}

export const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => {

    switch (action.type) {
        case 'set_ligth_theme':
            return { ...lightTheme };
        case 'set_dark_theme':
            return { ...darkTheme };
        default:
            return state;
    }

}