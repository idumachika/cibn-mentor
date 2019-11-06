import { ApiService } from "./api.service";

const ChangePasswordService = {
    changePassword: async ({password, newPassword}) => {
        return await ApiService.post('/auth/changePassword', {password:password, newPassword:newPassword}).then((res) => {
            return Promise.resolve(res);
        }).catch((error) => {
            return Promise.reject(error.response.data);
        });
    },

};



export{ ChangePasswordService };