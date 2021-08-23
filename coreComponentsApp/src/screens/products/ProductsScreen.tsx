import React, { useContext, useEffect, useState } from 'react'
import { Text, View, StyleSheet, FlatList, TouchableOpacity, RefreshControl } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack';

import { ProductsContext } from '../../contexts/products/ProductsContext';

import { ProductsStackParams } from '../../navigator/ProductsNavigator';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductsScreen'> { };

export const ProductsScreen = ({ navigation }: Props) => {

   const [isFefresh, setIsFefresh] = useState(false);
   const { products, loadProducts } = useContext(ProductsContext);

   useEffect(() => {
      navigation.setOptions({
         headerRight: () => (
            <TouchableOpacity
               activeOpacity={0.7}
               style={{ marginRight: 8 }}
               onPress={
                  () => navigation.navigate('ProductScreen', {
                     name: 'New Product'
                  })
               }
            >
               <Text>Agregar </Text>
            </TouchableOpacity>
         )
      })
   }, [])
   //TODO: Pull to REFRESH

   const loadProductsFromBack = async () => {
      setIsFefresh(true);
      await loadProducts();
      setIsFefresh(false) ;
   }

   return (
      <View style={{
         flex: 1,
         marginHorizontal: 10
      }}>
         <FlatList
            data={products}
            keyExtractor={(p) => p._id}
            renderItem={({ item }) => (
               <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={
                     () => navigation.navigate('ProductScreen', {
                        id: item._id,
                        name: item.nombre
                     })}
               >
                  <Text style={styles.productName}>{item.nombre}</Text>
               </TouchableOpacity>
            )}

            ItemSeparatorComponent={
               () => (
                  <View style={styles.itemSeparetor} />
               )
            }
            refreshControl={
               <RefreshControl
                  refreshing={isFefresh}
                  onRefresh={loadProductsFromBack}
               />
            }
         />
      </View>
   )
}

const styles = StyleSheet.create({
   productName: {
      fontSize: 20,
   },
   itemSeparetor: {
      borderBottomWidth: 1,
      marginVertical: 5,
      borderBottomColor: 'rgba(0,0,0,0.2)'
   }
});