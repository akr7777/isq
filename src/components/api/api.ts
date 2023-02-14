import axios, {AxiosResponse} from "axios";
import { loginThunkPropsType, ProfileRequestType } from "../../store/features/authThunks";
import { CreateNewSupplierThunkRequestType } from "../../store/features/newSupplierSlice";
import { SendQuestionsPartType } from "../../store/features/questionsSlice";


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://toogle.io:5000/api/',
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
    },
    updateProfile: (profileData: ProfileRequestType):Promise<AxiosResponse> => {
        return instance.put('profile', profileData);
    }
}
export const supplierAPI = {
    getCompanies: (searchParamsLink: string):Promise<AxiosResponse> => {
        return instance.get('questionaries' + searchParamsLink);
        // return instance.get('test/getTest?contentId='+pageNumber);
    },
    createNewSupplier: (data: CreateNewSupplierThunkRequestType):Promise<AxiosResponse> => {
        return instance.post('questionaries', data);
    },
    deleteCompany: (companyId: string): Promise<AxiosResponse> => {
        return instance.delete('questionaries/' + companyId);
    }
}
export const complitedAPI = {
    getInfoCompany: (questionaryId: string):Promise<AxiosResponse> => {
        return instance.get('questionaries/' + questionaryId);
    }
}
export const questionsAPI = {
    getQuestionsPart: (questionarieId: string, partNumber: string):Promise<AxiosResponse> => {
        return instance.get('questionaries/' + questionarieId + '/parts/' + partNumber);
    },
    sendQuestionsPart: (data: SendQuestionsPartType):Promise<AxiosResponse> => {
        const apiLink: string = 'questionaries/' + data.questionarieId + '/parts/' + data.partNumber + '/answers';
        return instance.post(apiLink, data.answersArray)
    }
}