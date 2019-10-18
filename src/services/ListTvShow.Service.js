import {ApiService} from "./api.service";

const ListTvShowService = {
    listtvshow: async () => {
        return await ApiService.get('/admin/tvshow/list-tvshow').then((res) => {
            window.console.log(res.data.data);
            return Promise.resolve(res.data.message);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
    deleteTvshow: async (adminId) => {
        return await ApiService.get('/admin/tshow/delete-tvshow/'+adminId).then((res) => {
            return Promise.resolve(res.data);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
    
    editTvshow: async (adminId) => {
        return await ApiService.post('/admin/tvshow/edit-tvshow/'+adminId).then((res) => {
            return Promise.resolve(res.data);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
    viewTvshow: async (adminId) => {
        return await ApiService.get('/admin/tvshow/tvshow-detail/'+adminId).then((res) => {
            return Promise.resolve(res.data);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
    
    
    
};

export {ListTvShowService};