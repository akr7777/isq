import axios, {AxiosResponse} from "axios";
import { loginThunkPropsType } from "../../store/features/authThunks";
import { CreateNewSupplierThunkRequestType } from "../../store/features/newSupplierSlice";


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
        return instance.post('login', credentials);
    },
    getProfile: ():Promise<AxiosResponse> => {
        return instance.get('profile');
    }
}
export const supplierAPI = {
    getCompanies: (pageNumber: number):Promise<AxiosResponse> => {
        return instance.get('questionaries?page='+pageNumber);
        // return instance.get('test/getTest?contentId='+pageNumber);
    },
    createNewSupplier: (data: CreateNewSupplierThunkRequestType):Promise<AxiosResponse> => {
        return instance.post('questionaries', data)
    }
}