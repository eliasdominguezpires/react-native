
import React, { createContext, useEffect, useReducer } from "react";
// import { Appearance, AppState, useColorScheme } from "react-native";
import { ThemeState, themeReducer, lightTheme, darkTheme } from './themeReducer';

interface Props {
    theme: ThemeState;
    setLightTheme: () => void;
    setDarkTheme: () => void;
}


export const ThemeContext = createContext({} as Props);

export const ThemeProvider = ({ children }: any) => {

    //Permite escuchar si la app esta activa o no para cambiar de teme
    /*const colorScheme = useColorScheme();
    const [theme, dispatch] = useReducer(themeReducer, (colorScheme === 'dark' ? darkTheme : lightTheme));

    useEffect(() => {
        AppState.addEventListener('change', (status) => {
            //console.log({ status });
            if (status === 'active') {
                (Appearance.getColorScheme() === 'light')
                    ? setLightTheme()
                    : setDarkTheme()
                console.log(Appearance.getColorScheme());

            }
        })
    }, [])
    */
    const [theme, dispatch] = useReducer(themeReducer, lightTheme);

    const setLightTheme = () => {
        dispatch({ type: 'set_ligth_theme' });
        //console.log("set_ligth_theme");
    };

    const setDarkTheme = () => {
        dispatch({ type: 'set_dark_theme' });
        //console.log("set_dark_theme");
    };

    return (
        <ThemeContext.Provider value={{
            theme,
            setLightTheme,
            setDarkTheme,
        }}>
            {
                children
            }
        </ThemeContext.Provider>
    )
}