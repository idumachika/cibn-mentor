import {ApiService} from "./api.service";

const ListNihuTvService = {
    listnihu: async () => {
        return await ApiService.get('/admin/nihutv/list').then((res) => {
            window.console.log(res.data.data);
            return Promise.resolve(res.data.data);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
    deleteNihuTv: async (adminId) => {
        return await ApiService.get('/admin/nihutv/delete/'+adminId).then((res) => {
            return Promise.resolve(res.data);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
    editNihutv: async (adminId) => {
        return await ApiService.post('/admin/nihutv/edit/'+adminId).then((res) => {
            return Promise.resolve(res.data);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
    viewNihutv: async (adminId) => {
        return await ApiService.get('/admin/original/category-detail/'+adminId).then((res) => {
            return Promise.resolve(res.data);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
    
};

export {ListNihuTvService};