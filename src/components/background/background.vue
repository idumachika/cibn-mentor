<template>
  <div>
    
    <div class="main-content text-center">
         <div class="welcome h2">Welcome!</div>
        <div class="cibn h3">Chartered Institute of Bankers of Nigeria</div>
        <div class="box">
            <p>Mentoring App</p>
        </div>
    </div>
    
  </div>
  
</template>

<script>
import {mdbBtn, mdbModal, mdbModalHeader, mdbModalBody, mdbModalTitle, mdbModalFooter} from 'mdbvue'
export default {
    name:'background',
    components: {
      
    }

}
</script>

<style scoped>
  .main-content{
    margin-top:70px;
    background: url('../../assets/images/pishure.png');
    background-size: cover;
    width: 100%;
    height: 100vh;
  }
  .welcome{
    display: inline-flex;
    margin-top: 13% !important;
    margin-bottom: 5%;
    color: #fff;
    /* font-weight: bold; */
    /* font-size: 40px; */

}
  .box{
    margin: 1% auto;
    border-radius: 5px;
    width: 150px;
    height: 35px;
    text-align: center;
    background-color: brown;
}
.box p{
    text-align: center;
    position: relative;
    top: 5px;
    color: #fff;
}
.cibn{
    letter-spacing: 1.5px;
    color: #fff;
    font-weight: bold;
    font-size: 30px;
}
</style>