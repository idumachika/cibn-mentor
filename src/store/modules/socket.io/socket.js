import {getters} from './getters';
import {mutations} from './mutations';
import {actions} from './actions';

const now = new Date();
const state = {
    USERS: '',
    // 当前用户
    user: {
        name: 'coffce',
        img: 'dist/images/1.jpg'
    },
        // 会话列表
    sessions: [{
        id: 1,
        user: {
        name: 'Ugonna',
        img: 'https://via.placeholder.com/150/b0f7cc'
        },
        messages:[{
            content: 'Hello，这是一个基于Vue + Vuex + Webpack构建的简单chat示例，聊天记录保存在localStorge, 有什么问题可以通过Github Issue问我。',
            date: now
            },{
            content: '项目地址: https://github.com/coffcer/vue-chat',
            date: now
            }]
        },
        {
        id: 2,
        user: {
            name: 'Chika',
            img: 'https://via.placeholder.com/150/56a8c2'
        },
            messages: []
        },
        {
            id: 3,
            user: {
                name: 'Biodun',
                img: 'https://via.placeholder.com/150/56a8c2'
            },
            messages: []
        },
        {
             id: 4,
             user: {
                name: 'Kenny',
                img: 'https://via.placeholder.com/150/56a8c2'
             },
             messages: []
         }
        ],
        // 当前选中的会话
        currentSessionId: 1,
        // 过滤出只包含这个key的会话
        filterKey: ''
};

export default {
    state,
    getters,
    mutations,
    actions
}