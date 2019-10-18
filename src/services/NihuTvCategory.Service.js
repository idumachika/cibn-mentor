import {ApiService} from "./api.service";

const ListNihuTvCategory = {
    listNihutvcategory: async () => {
        return await ApiService.get('/admin/nihutv/list-category').then((res) => {
            window.console.log(res.data.data);
            return Promise.resolve(res.data.data);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
    deleteNihuTvCategory: async (adminId) => {
        return await ApiService.get('/admin/nihutv/delete-category/'+adminId).then((res) => {
            return Promise.resolve(res.data);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
   
    
};

export {ListNihuTvCategory};