import {ApiService} from "./api.service";

const AddTvShowService = {
    addtvshow: async (data) => {
        return await ApiService.post('/admin/tvshow/add-tvshow', data).then((res) => {
            return Promise.resolve(res.data);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
    
};



export {AddTvShowService};