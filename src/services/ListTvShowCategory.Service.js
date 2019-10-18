import {ApiService} from "./api.service";

const ListTvShowCategoryservice = {
    listCategory: async () => {
        return await ApiService.get("/admin/tvshow/list-category").then((res) => {
            window.console.log(res.data.data);
            return Promise.resolve(res.data.message);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
    deletetvshowCategory: async (userId) => {
        return await ApiService.get('/admin/tvshow/delete-category/'+userId).then((res) => {
            return Promise.resolve(res.data);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
    edittvshowCategory: async (userId) => {
        return await ApiService.post('/admin/tvshow/edit-category/'+userId).then((res) => {
            return Promise.resolve(res.data);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
    viewtvshowCategory: async (userId) => {
        return await ApiService.get('/admin/tvshow/category-detail/'+userId).then((res) => {
            return Promise.resolve(res.data);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
};

export {ListTvShowCategoryservice};


