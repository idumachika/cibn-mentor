<template>
   <div class="body"> 
    <nav class="sidebar sidebar-offcanvas" id="sidebar">
        <ul class="nav">
            <li class="nav-item nav-profile">
                <a href="#" class="nav-link">
                    <div class="nav-profile-image">
                        <i class="mdi mdi-account-circle mdi-48px"></i>
                        <span class="login-status online"></span> <!--change to offline or busy as needed-->
                    </div>
                    <div class="nav-profile-text d-flex flex-column">
                        <span class="font-weight-bold mb-2">Ugonna</span>
                        <span class="text-secondary text-small">Admin</span>

                    </div>
                    <i class="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
                </a>
            </li>
            <li class="nav-item" v-bind:class="{ active: 'dashboard' === currentPage }">
                <router-link class="nav-link" :to="{name: 'dashboard'}">
                    <span class="menu-title">Dashboard</span>
                    <i class="mdi mdi-home menu-icon"></i>
                </router-link>
            </li>
            <li class="nav-item">
                <a class="nav-link collapsed" data-toggle="collapse" href="#ui-basic" aria-expanded="false"
                   aria-controls="ui-basic">
                    <span class="menu-title">Entertainment </span>
                    <i class="menu-arrow"></i>
                    <i class="mdi mdi-google-wallet menu-icon"></i>
                </a>
                <div class="collapse" id="ui-basic" style="" v-bind:class="{ show: 'AddMusic' === currentPage }" >
                    <ul class="nav flex-column sub-menu">
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{name: 'AddMusic'}">
                                Add Music
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{name: 'ListMusic'}"
                                         v-bind:class="{ active: 'ListMusic' === currentPage }">
                                Music List
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{name: 'AddMusicCategory'}"
                                         v-bind:class="{ active: 'AddMusicCategory' === currentPage }">
                                Add Category
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{name: 'ListCategory'}"
                                         v-bind:class="{ active: 'ListCategory' === currentPage }">
                                 Category List
                            </router-link>
                        </li>
                    </ul>
                </div>
            </li>
             <li class="nav-item" v-bind:class="{ active: 'addRecap' === currentPage }">
                <a class="nav-link collapsed" data-toggle="collapse" href="#ui-basic1" aria-expanded="false"
                   aria-controls="ui-basic">
                    <span class="menu-title">Recap </span>
                    <i class="menu-arrow"></i>
                    <i class="mdi mdi-google-wallet menu-icon"></i>
                </a>
                <div class="collapse" id="ui-basic1" style="" v-bind:class="{ show: 'addRecap' === currentPage }">
                    <ul class="nav flex-column sub-menu">
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{name: 'addRecap'}">
                                Add Recap
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{name: 'listRecap'}"
                                         v-bind:class="{ active: 'listRecap' === currentPage }">
                                Recap List
                            </router-link>
                        </li>
                    </ul>
                </div>
            </li>

            <li class="nav-item" v-bind:class="{ active: 'AddTvShow' === currentPage }">
                <a class="nav-link collapsed" data-toggle="collapse" href="#ui-basic2"  aria-expanded="false"
                   aria-controls="ui-basic">
                    <span class="menu-title">Tv Show</span>
                    <i class="menu-arrow"></i>
                    <i class="mdi mdi-google-wallet menu-icon"></i>
                </a>
                <div class="collapse" id="ui-basic2" style="" v-bind:class="{ show: 'AddTvShow' === currentPage }">
                    <ul class="nav flex-column sub-menu">
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{name: 'AddTvShow'}">
                            Add TV Show
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{name: 'ListTvShow'}"
                                         v-bind:class="{ active: 'ListTvShow' === currentPage }">
                            Tv Show List
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{name: 'AddTvShowCategory'}"
                                         v-bind:class="{ active: 'AddTvShowCategory' === currentPage }">
                               Add Tv Show Category
                            </router-link>
                        </li>
                         <li class="nav-item">
                            <router-link class="nav-link" :to="{name: 'ListTvShowCategory'}"
                                         v-bind:class="{ active: 'ListTvShowCategory' === currentPage }">
                               Tv Show Category
                            </router-link>
                        </li>
                    </ul>
                </div>
            </li>
            <li class="nav-item" v-bind:class="{ active: 'adminAdd' === currentPage }">
                <a class="nav-link collapsed" data-toggle="collapse" href="#ui-basic3" aria-expanded="false"
                   aria-controls="ui-basic">
                    <span class="menu-title">Past, Present, Future</span>
                    <i class="menu-arrow"></i>
                    <i class="mdi mdi-account-key menu-icon"></i>
                </a>
                <div class="collapse" id="ui-basic3" style="" v-bind:class="{ show: 'addView' === currentPage }">
                    <ul class="nav flex-column sub-menu">
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{name: 'addView'}"
                                         v-bind:class="{ active: 'addView' === currentPage }">Add View
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{name: 'listView'}"
                                         v-bind:class="{ active: 'listView' === currentPage }">List View 
                            </router-link>
                        </li>
                    </ul>
                </div>
            </li>
            <li class="nav-item" v-bind:class="{ active: 'AddOriginalCategory' === currentPage }">
                <a class="nav-link collapsed" data-toggle="collapse" href="#ui-basic4" aria-expanded="false"
                   aria-controls="ui-basic">
                    <span class="menu-title">Nihu TV</span>
                    <i class="menu-arrow"></i>
                    <i class="mdi mdi-account-key menu-icon"></i>
                </a>
                 <div class="collapse" id="ui-basic4" style="" v-bind:class="{ show: 'AddOriginal' === currentPage }">
                    <ul class="nav flex-column sub-menu">
                        <!-- <li class="nav-item"><a class="nav-link" href="../../pages/ui-features/buttons.html">Block
                            User</a></li> -->
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{name: 'AddNihuTv'}"
                                         v-bind:class="{ active: 'AddNihuTv' === currentPage }">Add Nihu TV
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{name: 'ListNihuTv'}"
                                         v-bind:class="{ active: 'ListNihuTv' === currentPage }">List Nihu TV 
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{name: 'ListNihuTvcategory'}"
                                         v-bind:class="{ active: 'ListNihuTvcategory' === currentPage }"> List Nihu TV  Category
                            </router-link>
                        </li>
                    </ul>
                </div>
               
            </li>
        </ul>
    </nav>
  </div>  
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: "LeftNav",
        computed: {
            ...mapGetters({user: "GET_USER"}),
            currentPage() {
                return this.$route.name;
            }
        },
    }
</script>

<style scoped>

</style> 
