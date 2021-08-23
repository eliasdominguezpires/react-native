import React, { createContext, useEffect, useState } from "react";
import { Producto, ProductsResponse } from '../../interfaces/productsInterfaces';
import baseApi from '../../apis/baseApi';

type ProductsContextProps = {
    products: Producto[];
    loadProducts: () => Promise<void>;
    addProduct: (categoryId: string, productName: string) => Promise<Producto>;
    updateProduct: (categoryId: string, productName: string, productId: string) => Promise<void>;
    deleteProduct: (id: string) => Promise<void>;
    loadProductById: (id: string) => Promise<Producto>;
    uploadProductImage: (data: any, id: string) => Promise<void>; //TODO cambiar ANY

}


export const ProductsContext = createContext({} as ProductsContextProps);

export const ProductsProvider = ({ children }: any) => {

    const [products, setProducts] = useState<Producto[]>([]);

    useEffect(() => {
        loadProducts();
    }, [])

    const loadProducts = async () => {
        const resp = await baseApi.get<ProductsResponse>('/productos?limite=50');
        // setProducts([...products, ...resp.data.productos]);
        setProducts([...resp.data.productos]);
        //console.log(resp.data.productos);
    };
    const addProduct = async (categoryId: string, productName: string): Promise<Producto> => {
        // console.log(categoryId, productName);
        const resp = await baseApi.post<Producto>('/productos', {
            nombre: productName,
            categoria: categoryId
        });
        setProducts([...products, resp.data]);

        return resp.data;
    };
    const updateProduct = async (categoryId: string, productName: string, productId: string) => {
        console.log(categoryId, productName, productId);
        const resp = await baseApi.put<Producto>(`/productos/${productId}`, {
            nombre: productName,
            categoria: categoryId,
        });
        console.log(JSON.stringify(resp, null, 5));
        
        setProducts(products.map(prod => {
            return (prod._id === productId)
                ? resp.data
                : prod;
        }));

    };
    const deleteProduct = async (id: string) => {

    };
    const loadProductById = async (id: string): Promise<Producto> => {
        const resp = await baseApi.get<Producto>(`/productos/${id}`);
        return resp.data;
    };
    const uploadProductImage = async (data: any, id: string) => {

    };

    return (
        <ProductsContext.Provider value={{
            products,
            loadProducts,
            addProduct,
            updateProduct,
            deleteProduct,
            loadProductById,
            uploadProductImage,

        }}>
            {children}
        </ProductsContext.Provider>
    )
}