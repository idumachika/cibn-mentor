import {ApiService} from "./api.service";

const ListRecapService = {
    listrecap: async () => {
        return await ApiService.get('/admin/recap/list').then((res) => {
            window.console.log(res.data.data);
            return Promise.resolve(res.data.message);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
    deleteRecap: async (adminId) => {
        return await ApiService.get('/admin/recap/delete/'+adminId).then((res) => {
            return Promise.resolve(res.data);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
    editRecap: async (adminId) => {
        return await ApiService.post('/admin/original/edit-category/'+adminId).then((res) => {
            return Promise.resolve(res.data);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
    viewRecap: async (adminId) => {
        return await ApiService.get('/admin/recap/detail/'+adminId).then((res) => {
            return Promise.resolve(res.data);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
    
};

export {ListRecapService};