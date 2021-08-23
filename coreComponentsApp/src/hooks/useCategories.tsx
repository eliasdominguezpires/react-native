import { useEffect, useState } from "react"
import baseApi from '../apis/baseApi';
import { CategoriesResponse, Categoria } from '../interfaces/productsInterfaces';




export const useCategories = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState<Categoria[]>([])

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = async () => {
        const resp = await baseApi.get<CategoriesResponse>('/categorias');
        setCategories(resp.data.categorias);

        setIsLoading(false);
    }


    return {
        isLoading,
        categories
    }
}