import React, { createContext, useEffect, useState } from "react";
import { AppState, Platform } from "react-native";
import { check, PERMISSIONS, PermissionStatus, request, openSettings } from "react-native-permissions";

type PermissionsContextProps = {
    permissions: PermissionState,
    askLocationPermission: () => void;
    checkLocationPermission: () => void;
}

export interface PermissionState {
    locationStatus: PermissionStatus
}

export const permissionInitState: PermissionState = {
    locationStatus: 'unavailable',
}

export const PermissionsContext = createContext({} as PermissionsContextProps);


export const PermissionProvider = ({ children }: any) => {

    const [permissions, setPermissions] = useState(permissionInitState);

    useEffect(() => {
        checkLocationPermission(); // ASYNC AWAIT
        AppState.addEventListener('change', state => {
            if (state !== 'active') return;
            checkLocationPermission(); // ASYNC AWAIT
        });
    }, [])

    const askLocationPermission = async () => {

        let permissionRequest: PermissionStatus = permissionInitState.locationStatus;

        if (Platform.OS === 'ios') {
            permissionRequest = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        } else if (Platform.OS === 'android') {
            permissionRequest = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        }
        if(permissionRequest === 'blocked'){
            openSettings();
        }
        setPermissions({
            ...permissions,
            locationStatus: permissionRequest
        });
        //console.log({ permissionRequest });

    }

    const checkLocationPermission = async () => {
        let permissionStatus: PermissionStatus = permissionInitState.locationStatus;

        if (Platform.OS === 'ios') {
            permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        } else if (Platform.OS === 'android') {
            permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        }
        setPermissions({
            ...permissions,
            locationStatus: permissionStatus
        });
        // console.log({ permissionStatus });

    }

    return (
        <PermissionsContext.Provider value={{
            permissions,
            askLocationPermission,
            checkLocationPermission
        }}>
            {children}
        </PermissionsContext.Provider>
    )
}