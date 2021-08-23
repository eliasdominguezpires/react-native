import React, { useState } from 'react'
import { Switch, Platform } from 'react-native';

interface Props {
    isOn: boolean;
    onChange: (value: boolean) => void;
}

export const CustomSwitch = ({ isOn, onChange }: Props) => {

    const [isEnabled, setIsEnabled] = useState(isOn);

    const toggleSwitch = () => {
        setIsEnabled(!isEnabled);
        onChange(!isEnabled);
    };

    return (
        <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            // thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            thumbColor={(Platform.OS) === 'android' ? '81b0ff' : '#767577'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
        />
    )
}