import { ApiService } from "./api.service";

const Mentorservice = {
    mentorCategory: async () => {
        return await ApiService.get("/users").then((res) => {
            window.console.log(res.data);
            return Promise.resolve(res.data);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
    deleteCategory: async (userId) => {
        return await ApiService.get('/admin/music/delete-category/' + userId).then((res) => {
            return Promise.resolve(res.data);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
    editCategory: async (userId) => {
        return await ApiService.post('/admin/music/edit-category/' + userId).then((res) => {
            return Promise.resolve(res.data);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
    viewCategory: async (userId) => {
        return await ApiService.get('/users/' + userId).then((res) => {
            return Promise.resolve(res.data);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
};

export { Mentorservice };