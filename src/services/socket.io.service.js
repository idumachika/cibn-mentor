import {
    ApiService
} from "./api.service";

const socketio = {
    listUser: async () => {
        return await ApiService.get('/users').then((res) => {
            window.console.log(res.data);
            return Promise.resolve(res.data);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
    postUser: async () => {
        return await ApiService.get('/users').then((res) => {
            return Promise.resolve(res.data);
        }).catch(() => {
            return Promise.reject(false);
        });
    },


};

export {
    socketio
};