import {
    ApiService
} from "./api.service";
import router from "../router";

const userService = {
    login: ({
        email,
        password
    }) => {
        return new Promise(function (resolve, reject) {
            ApiService.post('/auth/login', {
                email: email,
                password: password
            }).then(async (res) => {
                window.console.log("=======", res.data)
                if (res.data.category == "mentee") {
                    router.push('/dashboard')

                }
                if (res.category == "mentor") {
                    router.push('/dashboard')
                }
                let token = res.data.token;
                resolve(token);
            }).catch((error) => {
                reject(error);
            });
        });
    },
    authorize: async (token) => {
        return await ApiService.customRequest({
            headers: {
                'x-auth-token': token
            },
            method: "GET",
            url: ApiService.getBaseUrl() + "/users/me"
        }).then((res) => {
            return Promise.resolve(res.data);
        }).catch((error) => {
            return Promise.reject(error.response.data);
        });
    }
};

export {
    userService
};