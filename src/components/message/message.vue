<template>
<div class="message" v-scroll-bottom="listUser">
    <ul v-if="listUser">
        <li v-for="item in listUser.messages">
            <p class="time">
                <span>{{ item.date | time }}</span>
            </p>
            <div class="main" :class="{ self: item.self }">
                <img class="avatar" width="30" height="30" :src="item.self ? item.img : item.img" />
                <div class="text">{{ item.content }}</div>
            </div>
        </li>
    </ul>
</div>
</template>

<script>
export default {
    
    computed: {
        // user: ({ user }) => user,
        listUser() {
            return this.$store.getters.GET_USER_MESSAGE;
        }
        // session: ({ sessions, currentSessionId }) => sessions.find(session => session.id === currentSessionId)
    },
    
    filters: {
        // 将日期过滤为 hour:minutes
        time (date) {
            if (typeof date === 'string') {
                date = new Date(date);
            }
            return date.getHours() + ':' + date.getMinutes();
        }
    },
    directives: {
        // 发送消息后滚动到底部
        'scroll-bottom' () {
            this.vm.$nextTick(() => {
                this.el.scrollTop = this.el.scrollHeight - this.el.clientHeight;
            });
        }
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
.message {
  padding: 10px 15px;
  overflow-y: scroll;
}
.message li {
  margin-bottom: 15px;
}
.message .time {
  margin: 7px 0;
  text-align: center;
}
.message .time > span {
  display: inline-block;
  padding: 0 18px;
  font-size: 12px;
  color: #fff;
  border-radius: 2px;
  background-color: #dcdcdc;
}
.message .avatar {
  float: left;
  margin: 0 10px 0 0;
  border-radius: 3px;
}
.message .text {
  display: inline-block;
  position: relative;
  padding: 0 10px;
  max-width: calc(100% - 40px);
  min-height: 30px;
  line-height: 2.5;
  font-size: 12px;
  text-align: left;
  word-break: break-all;
  background-color: #fafafa;
  border-radius: 4px;
}
.message .text:before {
  content: " ";
  position: absolute;
  top: 9px;
  right: 100%;
  border: 6px solid transparent;
  border-right-color: #fafafa;
}
.message .self {
  text-align: right;
}
.message .self .avatar {
  float: right;
  margin: 0 0 0 10px;
}
.message .self .text {
  background-color: #b2e281;
}
.message .self .text:before {
  right: inherit;
  left: 100%;
  border-right-color: transparent;
  border-left-color: #b2e281;
}

</style>