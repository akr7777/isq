import axios, {AxiosResponse} from "axios";


const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://95.142.46.27/questionare/api/',
});

instance.interceptors.request.use((config)=> {
    if (config.headers)
        config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    return config;
});

export const supplierAPI = {
    getCompanies: (pageNumber: number):Promise<AxiosResponse> => {
        return instance.get('companies.json');
        // return instance.get('test/getTest?contentId='+pageNumber);
    }
}