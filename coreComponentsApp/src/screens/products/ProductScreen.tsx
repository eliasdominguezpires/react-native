import React, { useContext, useEffect, useState } from 'react'
import { Text, View, StyleSheet, Button, Image, Alert, ScrollView, TextInput } from 'react-native';

import { StackScreenProps } from '@react-navigation/stack';
import { ProductsStackParams } from '../../navigator/ProductsNavigator';

import { Picker } from '@react-native-picker/picker';
import { launchCamera, launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';

import { ProductsContext } from '../../contexts/products/ProductsContext';
import { useCategories } from '../../hooks/useCategories';
import { useForm } from '../../hooks/useForm';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductScreen'> { };

export const ProductScreen = ({ navigation, route }: Props) => {

    const { id = '', name = '' } = route.params;

    // const [selectedLanguage, setSelectedLanguage] = useState();
    const { loadProductById, addProduct, updateProduct, uploadProductImage } = useContext(ProductsContext);
    const [tempUri, setTempUri] = useState<string>();

    const { _id, categoriaId, nombre, img, form, onChange, setFormValue } = useForm({
        _id: id,
        categoriaId: '',
        nombre: name,
        img: ''
    });
    const { categories } = useCategories();

    useEffect(() => {
        navigation.setOptions({
            title: (nombre) ? nombre : 'New Product'
        })
    }, [nombre]);
    useEffect(() => {
        loadProduct();
    }, [])

    const loadProduct = async () => {
        if (id.length === 0) return;

        const product = await loadProductById(id);
        setFormValue({
            _id: id,
            categoriaId: product.categoria._id,
            img: product.img || '',
            nombre: nombre
        })
    }

    const saveOrUpdate = async () => {
        // const tempCategoriaId = categoriaId || categories[0]._id;
        if (categoriaId.length === 0) {
            Alert.alert('Seleccione', 'Se debe de seleccionar una categoria')
            return;
        }

        if (id.length > 0) {
            updateProduct(categoriaId, nombre, id);
        } else {
            const newProduc = await addProduct(categoriaId, nombre);
            onChange(newProduc._id, '_id')
        }
    }

    const takePhoto = () => {
        launchCamera({
            mediaType: 'photo',
            quality: 0.8
        }, (resp) => {
            if (resp.didCancel) return;
            if (!resp.assets) return;

            setTempUri(resp.assets?.[0].uri);

            uploadProductImage(resp.assets[0], _id);
        });
    }

    const takePhotoFromGallery = () => {
        launchImageLibrary(
            {
                mediaType: 'photo',
                quality: 0.8,
            },
            resp => {
                if (resp.didCancel) return;
                if (!resp.assets) return;

                setTempUri(resp.assets?.[0].uri);
                uploadProductImage(resp.assets[0], _id);
            },
        );
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.label}>Nombre del Producto:</Text>
                <TextInput
                    placeholder='Producto'
                    style={styles.textInput}
                    value={nombre}
                    onChangeText={(value) => onChange(value, 'nombre')}
                />

                {/* Selector / picker */}
                <Text style={styles.label}>Seleccione Categoria</Text>
                <Picker
                    selectedValue={categoriaId}
                    onValueChange={(itemIndex) => onChange(itemIndex, 'categoriaId')}>
                    {
                        categories.map(c => (
                            <Picker.Item
                                label={c.nombre}
                                value={c._id}
                                key={c._id}
                            />
                        ))
                    }
                </Picker>

                <Button
                    title="Guardar"
                    onPress={() => { saveOrUpdate(); }}
                    color="#5856D6"
                />

                {
                    (_id.length > 0) && (
                        <View style={styles.footer}>
                            <Button
                                title="Camara"
                                onPress={() => { takePhoto(); }}
                                color="#5856D6"
                            />
                            <View style={{ width: 10 }} />
                            <Button
                                title="Galeria"
                                onPress={() => { takePhotoFromGallery(); }}
                                color="#5856D6"
                            />
                        </View>

                    )
                }
                {
                    (img.length > 0 && !tempUri) && (
                        <Image
                            source={{ uri: img }}
                            style={{
                                marginTop: 20,
                                width: '100%',
                                height: 300
                            }}
                        />
                    )
                }
                {/* Imagen Temporal */}
                {
                    (tempUri) && (
                        <Image
                            source={{ uri: tempUri }}
                            style={{
                                marginTop: 20,
                                width: '100%',
                                height: 300
                            }}
                        />
                    )
                }
                <Text>{JSON.stringify(form, null, 5)}</Text>
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        marginHorizontal: 20,
    },
    label: {
        fontSize: 15,
    },
    textInput: {
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        borderColor: 'rgba(0,0,0,0.2)',
        height: 35,
        marginTop: 3,
        marginBottom: 10,
        color: 'grey'
    },
    footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 10 }
});

function useStatae<T>(arg0: string): [any, any] {
    throw new Error('Function not implemented.');
}
