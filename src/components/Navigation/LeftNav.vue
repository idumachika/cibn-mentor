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
             <li class="nav-item" v-bind:class="{ active: 'Message' === currentPage }">
                <router-link class="nav-link" :to="{name: 'Message'}">
                    <span class="menu-title">Message</span>
                    <i class="mdi mdi-email menu-icon"></i>
                </router-link>
            </li>
            <li class="nav-item" v-bind:class="{ active: 'Mentor' === currentPage }">
                <a class="nav-link collapsed" data-toggle="collapse" href="#ui-basic1" aria-expanded="false"
                   aria-controls="ui-basic">
                    <span class="menu-title">Mentor</span>
                    <i class="menu-arrow"></i>
                    <i class="mdi mdi-account-multiple menu-icon"></i>
                </a>
                <div class="collapse" id="ui-basic1" style="" v-bind:class="{ show: 'Mentor' === currentPage }">
                    <ul class="nav flex-column sub-menu">
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{name: 'Mentor'}">
                                Mentors
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{name: 'ViewRequest'}"
                                         v-bind:class="{ active: 'listRecap' === currentPage }">
                                View Request
                            </router-link>
                        </li>
                    </ul>
                </div>
            </li>
        
            </li>
             <li class="nav-item" v-bind:class="{ active: 'MeetingReport' === currentPage }">
                <router-link class="nav-link" :to="{name: 'MeetingReport'}">
                    <span class="menu-title">Meeting Report</span>
                    <i class="mdi mdi-message-reply-text menu-icon"></i>
                </router-link>
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
