import {ApiService} from "./api.service";

const userService = {
    login: ({email, password}) => {
        return new Promise(function (resolve, reject) {
            ApiService.post('/admin/login', {email: email, password: password}).then(async (res) => {
                let token = res.data.data.token;
                resolve(token);
            }).catch((error) => {
                reject(error);
            });
        });
    },
    authorize: async (token) => {
        return await ApiService.customRequest({
            headers: {'Authorization': token},
            method: "GET",
            url: ApiService.getBaseUrl() + "/admin/authorize"
        }).then((res) => {
            return Promise.resolve(res.data.data);
        }).catch((error) => {
            return Promise.reject(error.response.data);
        });
    }
};

export {userService};