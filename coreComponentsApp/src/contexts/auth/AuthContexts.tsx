import React, { createContext, useEffect, useReducer } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import baseApi from "../../apis/baseApi";
import { Usuario, LoginResponse, LoginData, RegisterData } from '../../interfaces/appInterfaces';
import { authReducer, AuthState } from './authReducer';


type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: Usuario | null;
    status: 'checkin' | 'authenticated' | 'not-authenticated';
    signIn: (loginData: LoginData) => void;
    signUp: (data: RegisterData) => void;
    logOut: () => void;
    removeError: () => void;
}

const authInitialState: AuthState = {
    status: 'checkin',
    token: null,
    user: null,
    errorMessage: ''
}

export const AuthContext = createContext({} as AuthContextProps);


export const AuthProvider = ({ children }: any) => {

    const [state, dispatch] = useReducer(authReducer, authInitialState);

    useEffect(() => {
        validateToken();
    }, []);

    const validateToken = async () => {
        const token = await AsyncStorage.getItem('token');
        //no token, no autenticado
        if (!token) return dispatch({ type: 'notAuthenticated' });
        // true
        const resp = await baseApi.get('/auth');
        if (resp.status !== 200) {
            return dispatch({ type: 'notAuthenticated' });
        }

        await AsyncStorage.setItem('token', resp.data.token);
        dispatch({
            type: 'signUp',
            payload: {
                token: resp.data.token,
                user: resp.data.usuario
            }
        });
    }

    const signIn = async ({ correo, password }: LoginData) => {
        try {
            const resp = await baseApi.post<LoginResponse>('/auth/login', { correo, password });
            dispatch({
                type: 'signUp',
                payload: {
                    token: resp.data.token,
                    user: resp.data.usuario
                }
            });
            //console.log(resp.data);
            await AsyncStorage.setItem('token', resp.data.token);
        } catch (error) {
            //console.log(error.response.data);
            dispatch({
                type: 'addError',
                payload: error.response.data.msg || 'Información Incorrecta'
            });
        }
    };
    const signUp = async ({ nombre, correo, password }: RegisterData) => {
        try {
            const resp = await baseApi.post<LoginResponse>('/usuarios', { nombre, correo, password });
            dispatch({
                type: 'signUp',
                payload: {
                    token: resp.data.token,
                    user: resp.data.usuario
                }
            });
            //console.log(resp.data);
            await AsyncStorage.setItem('token', resp.data.token);
        } catch (error) {
            //console.log(error.response.data);
            dispatch({
                type: 'addError',
                payload: error.response.data.errors[0].msg || 'Error de Registro'
            });
        }
    };

    const logOut = async () => {
        await AsyncStorage.removeItem('token');
        dispatch({
            type: 'logout'
        });
    };

    const removeError = () => {
        dispatch({
            type: 'removeError'
        })
    };

    return (
        <AuthContext.Provider value={{
            ...state,
            signIn,
            signUp,
            logOut,
            removeError,
        }}>
            {children}
        </AuthContext.Provider>
    )
}