import {ApiService} from "./api.service";

const AddViewService = {
    addview: async (data) => {
        return await ApiService.post('/admin/views/add-views', data).then((res) => {
            return Promise.resolve(res.data);
        }).catch((error) => {
            return Promise.reject(error.response.data);
        });
    },
    
};



export {AddViewService};


