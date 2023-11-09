import axios from 'axios';
import {AxiosInstance} from "axios";

let api: AxiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:3333/api/v1/',
});

api.defaults.headers.post['Content-Type'] = 'application/json';
api.defaults.headers.post['Accept'] = 'application/json';

export {
    api,
};