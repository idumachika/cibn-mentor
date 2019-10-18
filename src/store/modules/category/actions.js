import {ListNihuTvCategory} from "../../../services/NihuTvCategory.Service";

const actions = {

    LOAD_CATEGORY_DATA: async (context) => {
        return await ListNihuTvCategory.listNihutvcategory().then((res) => {
            context.commit('SET_CATEGORY_DATA', res);
            return true;
        }).catch((err) => {
            window.console.log(err);
            return false;
        });
    }
};

export {actions};