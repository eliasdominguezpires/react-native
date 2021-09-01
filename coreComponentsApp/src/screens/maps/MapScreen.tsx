import React, { useContext, useEffect } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { PermissionsContext } from '../../contexts/permissions/PermissionsContext';
import { PermissionsScreen } from './PermissionsScreen';

import { Map } from '../../components/Map';
import { useLocation } from '../../hooks/useLocation';


export const MapScreen = () => {

   const { permissions } = useContext(PermissionsContext);

   if (permissions.locationStatus !== 'granted') {
      return <PermissionsScreen />
   }

   const { hasLocation, initialPosition } = useLocation();
   if (!hasLocation) {
      //console.log(hasLocation);
      return <PermissionsScreen />
      //TODO: verificar que se puede hacer si todavia no optuvo la ubicacion
   }



   return (
      <View style={{ flex: 1 }}>
         <Map
            location={initialPosition}
         // markers={
         //    [{
         //       latitud: 1,
         //       longitud: 1
         //    }]
         // }
         />
      </View>
   )
}