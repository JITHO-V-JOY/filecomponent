import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.VUE_APP_URL
});

export default instance;