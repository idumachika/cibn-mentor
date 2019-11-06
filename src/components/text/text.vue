
<template>
<div class="text">
    <textarea placeholder="Write Here...." v-model="content" @keyup="onKeyup"></textarea>
</div>
</template>
<script>
import { actions } from '../../store/store.js';
export default {
    vuex: {
        actions: actions
    },
    data () {
        return {
            content: ''
        };
    },
    methods: {
        onKeyup (e) {
            if (e.ctrlKey && e.keyCode === 13 && this.content.length) {
                this.sendMessage(this.content);
                this.content = '';
            }
        }
        
    }
};
</script>


<style scoped>
.text {
  height: 160px;
  border-top: solid 1px #ddd;
}
.text textarea {
  padding: 10px;
  height: 100%;
  width: 100%;
  border: none;
  outline: none;
  resize: none;
}

</style>