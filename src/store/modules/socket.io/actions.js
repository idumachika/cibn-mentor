import {
    socketio
} from "../../../services/socket.io.service";

const actions = {

    LOAD_USER_DATA: async (context) => {
        return await socketio.listUser().then((res) => {
            context.commit('SET_USER_DATA', res);
            return true;
        }).catch((err) => {
            window.console.log(err);
            return false;
        });
    },

    initData: ({dispatch}) => dispatch('INIT_DATA'),
    sendMessage: ({dispatch}, content) => dispatch('SEND_MESSAGE', content),
    selectSession: ({ dispatch}, id) => dispatch('SELECT_SESSION', id),
    search:({dispatch}, value) => dispatch('SET_FILTER_KEY', value)



};

export {actions}