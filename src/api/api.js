import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://backendedu.creative.az/api',
});

export default instance;