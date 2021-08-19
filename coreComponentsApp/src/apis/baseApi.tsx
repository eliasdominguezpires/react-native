import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';


const API_HOST = "api";
const SERVICE_REST = 'http://192.168.100.43:8080/' + API_HOST;

const baseApi = axios.create({ baseURL: SERVICE_REST });

baseApi.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers['x-token'] = token;
        }

        return config;
    }
)

export default baseApi;