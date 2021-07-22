import React, { createContext, useState } from 'react';
import { useWindowDimensions } from 'react-native';

interface DimensionsProps {
    width: number;
    height: number;
    setStateWidth: (width: number) => void;
    setStateHeight: (height: number) => void;
}
export const DimensionsContext = createContext({} as DimensionsProps);

export const DimensionProvider = ({ children }: any) => {

    const { width, height } = useWindowDimensions();

    console.log(width, height);
    

    const [stateWidth, setWidth] = useState(width);

    const [stateHeight, setHeight] = useState(height);

    const setStateWidth = (width: number) => {
        setWidth(width);
    }

    const setStateHeight = (height: number) => {
        setHeight(height);
    }

    return (
        <DimensionsContext.Provider value={{
            width,
            height,
            setStateWidth,
            setStateHeight,
        }} >
            {children}
        </DimensionsContext.Provider>
    )
}