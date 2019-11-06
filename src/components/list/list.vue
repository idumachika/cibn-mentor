<template>
<div class="list">
    <ul>
        <li v-for="item in listUser" :class="{ active: item.id === currentId }" @click="selectSession(item.id)">
            <img class="avatar" width="30" height="30" :alt="item.user.name" :src="item.user.img">
            <p class="name">{{item.user.name}}</p>
        </li>
    </ul>
</div>
</template>

<script>
import { actions } from '../../store/store.js';
import {socketio} from '../../services/socket.io.service.js'
export default {
    
    data() {
        return {
            loading: true,
            dashboardData: "",
            results: []
        }
    },

    computed: {
        listUser() {
            return this.$store.getters.GET_USER_INFORMATION;
        }
        
            

    },

    mounted(){
        // this.getPosts();
        this.togglelistUser();
        
    },
    methods:{
        togglelistUser: function() {
                this.$store.dispatch("LOAD_USER_DATA");
        },
        initData:function(){
           this.$store.dispatch('INIT_DATA');

        }, 
        sendMessage:function(content){
            this.$store.dispatch('SEND_MESSAGE', content);

        },
        selectSession: function(id){
            console.log('=======', id)
            this.$store.dispatch('SELECT_SESSION', id);

        }, 
        search:function(value){
            this.$store.dispatch('SET_FILTER_KEY', value);

        }, 

        getPosts() {
            socketio.listUser().then((response) => {
                this.results = response;
                console.log(this.results)
            }).catch( error => { 
                console.log(error); 
            });
        },
        



    }

};
</script>

<style scoped>
.list li {
  padding: 12px 15px;
  border-bottom: 0.1px solid #00B84A;
  cursor: pointer;
    transition: background-color 0.1s;
list-style-type:none
}
.list li:hover {
  background-color: rgba(255, 255, 255, 0.03);
}
.list li.active {
  background-color: rgba(255, 255, 255, 0.1);
  list-style-type:none
}
.list .avatar,
.list .name {
  vertical-align: middle;
}
.list .avatar {
  border-radius: 30px;
}
.list .name {
  display: inline-block;
  margin: 0 0 0 15px;
}

</style>