import {ApiService} from "./api.service";

const AddMusicCategoryService = {
    addCategory: async (data) => {
        return await ApiService.post('/admin/music/add-category', data).then((res) => {
            return Promise.resolve(res.data);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
    
    
  
    
};
export {AddMusicCategoryService};