import {ApiService} from "./api.service";

const ListCategoryservice = {
    listCategory: async () => {
        return await ApiService.get("/admin/music/list-category").then((res) => {
            window.console.log(res.data.data);
            return Promise.resolve(res.data.message);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
    deleteCategory: async (userId) => {
        return await ApiService.get('/admin/music/delete-category/'+userId).then((res) => {
            return Promise.resolve(res.data);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
    editCategory: async (userId) => {
        return await ApiService.post('/admin/music/edit-category/'+userId).then((res) => {
            return Promise.resolve(res.data);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
    viewCategory: async (userId) => {
        return await ApiService.get('/admin/music/category-detail/'+userId).then((res) => {
            return Promise.resolve(res.data);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
};

export {ListCategoryservice};


