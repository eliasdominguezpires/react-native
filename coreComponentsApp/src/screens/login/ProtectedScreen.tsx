import React, { useContext } from 'react'
import { Button } from 'react-native'
import { Text, View, StyleSheet } from 'react-native'
import { AuthContext } from '../../contexts/auth/AuthContexts';

export const ProtectedScreen = () => {

   const { user, token, logOut } = useContext(AuthContext);

   return (
      <View style={styles.container}>
         <Text style={styles.title}>Protected</Text>
         <Button
            title="logout"
            color="#5856D6"
            onPress={logOut}
         />
         <Text>
            {JSON.stringify(user, null, 5)},
         </Text>

         <Text>
            {token},
         </Text>
      </View>
   )
}


const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
   title: {
      fontSize: 20,
      marginBottom: 20,
   }
});