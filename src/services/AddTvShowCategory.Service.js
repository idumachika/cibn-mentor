import {ApiService} from "./api.service";

const AddTvShowCategoryService = {
    addtvshowcategory: async (data) => {
        return await ApiService.post('/admin/tvshow/add-category', data).then((res) => {
            return Promise.resolve(res.data);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
    
};



export {AddTvShowCategoryService};