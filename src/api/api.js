import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://backendtestapp.local:8080/api',
});

export default instance;