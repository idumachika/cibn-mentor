import {ApiService} from "./api.service";

const ListViewservice = {
    listView: async () => {
        return await ApiService.get("/admin/views/list-views").then((res) => {
            window.console.log(res.data.data);
            return Promise.resolve(res.data.message);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
    deleteView: async (userId) => {
        return await ApiService.get('/admin/views/delete-views/'+userId).then((res) => {
            return Promise.resolve(res.data);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
    editView: async (userId) => {
        return await ApiService.post('/admin/views/edit-views/'+userId).then((res) => {
            return Promise.resolve(res.data);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
    viewDetails: async (userId) => {
        return await ApiService.get('/admin/views/views-detail/'+userId).then((res) => {
            return Promise.resolve(res.data);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
};

export {ListViewservice};


