import React, { useEffect, useRef, useState } from 'react'

import MapView, { Marker, Polyline } from 'react-native-maps';
import { Location } from '../interfaces/locationInterfaces';
import { Fab } from './Fab';
import { useLocation } from '../hooks/useLocation';


interface Props {
    markers?: Location[];
    location: Location,
}

export const Map = ({ markers, location }: Props) => {

    const [showPolyline, setShowPolyline] = useState(true);

    const {
        getCurrentLocation,
        followUserLocation,
        userLocation,
        stopFollowUserLocation,
        routeLines
    } = useLocation();

    const mapViewRef = useRef<MapView>();
    const following = useRef<boolean>(true);

    const centerPosition = async () => {

        const { latitude, longitude } = await getCurrentLocation();

        following.current = true;

        mapViewRef.current?.animateCamera({
            center: { latitude, longitude },
            // zoom: ;
        });
    };

    useEffect(() => {
        followUserLocation();
        return () => {
            stopFollowUserLocation();
        }
    }, []);

    useEffect(() => {
        if (!following.current) return;

        const { latitude, longitude } = userLocation;
        mapViewRef.current?.animateCamera({
            center: { latitude, longitude },
            // zoom: ;
        });
    }, [userLocation]);

    return (
        <>
            <MapView
                ref={(el) => mapViewRef.current = el!}
                style={{ flex: 1 }}
                // provider={PROVIDER_GOOGLE}
                showsUserLocation
                initialRegion={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                onTouchStart={() => following.current = false}
            >
                {
                    showPolyline && (
                        <Polyline
                            coordinates={routeLines}
                            strokeColor="black"
                            strokeWidth={3}
                        />
                    )
                }


                {
                    markers?.map((marker, index) => (
                        <Marker
                            key={index}
                            image={require('../assets/custom-marker.png')}
                            coordinate={{
                                latitude: marker.latitude,
                                longitude: marker.longitude,
                            }}
                            title="Title"
                            description="Descripction"
                        />
                    ))
                }
            </MapView>
            <Fab
                iconName="compass-outline"
                onPress={() => {
                    centerPosition();
                }}
                style={{
                    position: 'absolute',
                    bottom: 10,
                    right: 20
                }}
            />

            <Fab
                iconName="brush-outline"
                onPress={() => {
                    setShowPolyline(value => !value);
                }}
                style={{
                    position: 'absolute',
                    bottom: 80,
                    right: 20
                }}
            />
        </>
    )
}