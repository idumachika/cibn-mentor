import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login/Login.vue';
import Store from './store/store';
import Dashboard from './views/Dashboard/Dashboard.vue';
import Message from './views/Message/Message.vue';
import Mentor from './views/Mentor/Mentor.vue';
import Home from './views/Home/Home.vue';
import MeetingReport from  './views/MeetingReport/MeetingReport.vue';
import ChangePassword from './views/ChangePassword/ChangePassword.vue';
import GiveReport from './views/GiveReport/GiveReport.vue';
import ViewRequest from './views/ViewRequest/ViewRequest.vue'



Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.NODE_ENV === 'production' ? '/nihu-music' : '/',

    routes: [{
            path:'/',
            name:'login',
            component: Login,
            meta: {
                public: true, // Allow access to even if not logged in
                onlyWhenLoggedOut: true
            }
        },
        {
            path:'/home',
            name:'home',
            component:Home,
            meta: {
                 public: true, // Allow access to even if not logged in
                 onlyWhenLoggedOut: true
             }

        },
        {
            path:'/dashboard',
            name:'dashboard',
            component: Dashboard,
        },
        {
            path:'/logout',
            name:'logout',
        },
        {
            path:'/message',
            name:'Message',
            component: Message,
        },
        {
            path: '/view-request',
            name: 'ViewRequest',
            component: ViewRequest,
        },
        {
            path: '/give-report',
            name: 'GiveReport',
            component: GiveReport,
        },
        {
            path:'/mentor',
            name:'Mentor',
            component: Mentor,
        },
        {
            path: '/meeting-report',
            name: 'MeetingReport',
            component: MeetingReport,
        },
        {
            path:'/changePassword',
            name:'ChangePassword',
            component:ChangePassword,
             meta: {
                 public: true, // Allow access to even if not logged in
                 onlyWhenLoggedOut: true
             }
            
        }


    ]
});


router.beforeEach((to, from, next) => {
    const isPublic = to.matched.some(record => record.meta.public);
    const onlyWhenLoggedOut = to.matched.some(record => record.meta.onlyWhenLoggedOut);
    const loggedIn = Store.getters.IS_AUTHENTICATED;

    if (!isPublic && !loggedIn) {
        return next({
            name: 'login',
        });
    }

    // Do not allow user to visit login page or register page if they are logged in
    if (loggedIn && onlyWhenLoggedOut) {
        return next({
            name: 'dashboard'
        });
    }

    next();
});

export default router;