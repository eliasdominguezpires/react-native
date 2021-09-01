import { useEffect, useRef, useState } from "react";
import Geolocation from "@react-native-community/geolocation";
import { Location } from '../interfaces/locationInterfaces';


export const useLocation = () => {

    const [hasLocation, setHasLocation] = useState(false);
    const [routeLines, setRouteLines] = useState<Location[]>([]);


    const [initialPosition, setInitialPosition] = useState<Location>({
        latitude: 0,
        longitude: 0,
    });
    const [userLocation, setUserLocation] = useState<Location>({
        longitude: 0,
        latitude: 0
    });

    const watchId = useRef<number>();

    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        }
    }, [])

    useEffect(() => {
        getCurrentLocation()
            .then(location => {

                if (!isMounted.current) return;

                setInitialPosition(location);
                setUserLocation(location);
                setRouteLines(routes => [...routes, location]);
                setHasLocation(true);
            });
    }, []);


    const getCurrentLocation = (): Promise<Location> => {
        return new Promise((resolve, reject) => {
            Geolocation.getCurrentPosition(
                (info) => {
                    console.log(info)
                    resolve({
                        latitude: info.coords.latitude,
                        longitude: info.coords.longitude
                    });

                },
                (err) => {
                    console.log("getCurrentLocation"+{ err })
                    reject({ err })
                }, {
                //distanceFilter : 100,
                enableHighAccuracy: true
            }
            );
        });
    };

    const followUserLocation = () => {
        watchId.current = Geolocation.watchPosition((info) => {
            if (!isMounted.current) return;
            // console.log(info);
            const location: Location = {
                latitude: info.coords.latitude,
                longitude: info.coords.longitude
            };

            setUserLocation(location);

            setRouteLines(routes => [...routes, location]);
        },
            (err) => {
                console.log({ err })
            }, {
            distanceFilter: 5,
            enableHighAccuracy: true
        })
    };

    const stopFollowUserLocation = () => {
        if (watchId.current)
            Geolocation.clearWatch(watchId.current);
    }

    return {
        hasLocation,
        initialPosition,
        getCurrentLocation,
        followUserLocation,
        userLocation,
        stopFollowUserLocation,
        routeLines
    }
}