import React, { useContext } from 'react'
import { Text, View, StyleSheet } from 'react-native';

import { BlackButton } from '../../components/BlackButton';

import { PermissionsContext } from '../../contexts/permissions/PermissionsContext';

export const PermissionsScreen = () => {

   const { permissions, askLocationPermission } = useContext(PermissionsContext);

   return (
      <View style={styles.container}>
         <Text style={styles.title}>Permisos Necesarios para utilizar GPS</Text>

         <BlackButton
            title="Permiso"
            onPress={askLocationPermission}
         />
         <Text style={{ marginTop: 20 }}>
            {JSON.stringify(permissions, null, 5)}
         </Text>
      </View>
   )
}


const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
   },
   title: {
      width: 200,
      fontSize: 28,
      textAlign: 'center',
      marginBottom: 20
   }
});