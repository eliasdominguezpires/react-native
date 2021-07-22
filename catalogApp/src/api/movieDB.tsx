import axios from 'axios';

const movieDB = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie',
    params: {
        api_key: '2c6cdb0072e74f7277750c8ec1088d67',
        lenguage: 'es-ES'
    }
});

export default movieDB;