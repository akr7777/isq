import axios, {AxiosResponse} from "axios";
import { loginThunkPropsType } from "../../store/features/authThunks";


const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://toogle.io:5000/api/',
});

instance.interceptors.request.use((config)=> {
    if (config.headers)
        config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    return config;
});

export const authAPI = {
    login: (credentials: loginThunkPropsType):Promise<AxiosResponse> => {
        return instance.post('login', credentials)
    }
}
export const supplierAPI = {
    getCompanies: (pageNumber: number):Promise<AxiosResponse> => {
        return instance.get('companies.json');
        // return instance.get('test/getTest?contentId='+pageNumber);
    }
}