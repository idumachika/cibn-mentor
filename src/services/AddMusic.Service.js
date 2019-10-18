import {ApiService} from "./api.service";

const AddMusicService = {
    addmusic: async (data) => {
        return await ApiService.post('/admin/music/add', data).then((res) => {
            return Promise.resolve(res.data);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
    
};



export {AddMusicService};


