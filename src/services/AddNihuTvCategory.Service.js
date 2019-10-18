import {ApiService} from "./api.service";

const addNihuTvCategory = {
    addNihuCategory: async ({name}) => {
        return await ApiService.post('/admin/nihutv/add-category', {name:name}).then((res) => {
            return Promise.resolve(res.data);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
    
};



export {addNihuTvCategory};


