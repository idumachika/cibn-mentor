<template>
  <div>
    
   <mdb-navbar dark position='top' expand='medium' class="navbar"> 
       <mdb-navbar-brand waves >
           <img src="../assets/images/logos.png" alt="">
       </mdb-navbar-brand>
    <mdb-navbar-toggler>
            <mdb-navbar-nav right class="mr-5" style="">
               <mdb-nav-item style="cursor:pointer; top:"   @click="modal = true" class="text-white mt-2 signup">Register</mdb-nav-item>
              <mdb-nav-item  @click="login" style="cursor:pointer" class="ml-3 text-white mt-2 signin">Sign In</mdb-nav-item>
            </mdb-navbar-nav>
          </mdb-navbar-toggler>

 </mdb-navbar>

 <!-- <div class="container"> -->
       
        
          <!-- <mdb-btn class="mt-5" color="primary" >Launch demo modal</mdb-btn> -->
          <mdb-modal :show="modal" @close="modal = false" style="margin-top: 10%;">
            
             
            
            <mdb-modal-body><br>
              <input class="form-control" type="text" placeholder="Enter your email or membership number" style="width: 100%;"><br><br>
              <div  class="text-white cancel btn" style="background:tomato" @click.native="modal = false">Cancel</div>
              <mdb-btn color="success" class="continue" @click='signup'>Continue</mdb-btn>
            </mdb-modal-body>
            
          </mdb-modal>


 </div>

    
  <!-- </div> -->
    
</template>

<script>
import{mdbNavbar, mdbBtn, mdbContainer, mdbNavItem, mdbNavbarNav,  mdbDropdown,mdbDropdownItem,mdbDropdownMenu, mdbDropdownToggle,mdbNavbarToggler, mdbNavbarBrand, mdbModal, mdbModalHeader, mdbModalBody, mdbModalTitle, mdbModalFooter } from 'mdbvue'
export default {
name:'navbar',
components:{
    mdbBtn,
    mdbNavbar,
    mdbNavItem, 
    mdbNavbarNav,
    mdbNavbarToggler, 
    mdbNavbarBrand,
    mdbContainer,
    mdbDropdown,
    mdbDropdownItem,
    mdbDropdownMenu,
    mdbDropdownToggle,
    mdbModal, 
      mdbModalHeader, 
      mdbModalBody, 
      mdbModalTitle, 
      mdbModalFooter
},
    data() {
      return {
        modal: false
      };
    },
    methods: {
      login () {
        this.$router.push('/login');
      },
      signup () {
        this.$router.push('/signup');
      }
    }
}
</script>

<style scoped>

.navbar {
    background-color: #00B84A !important;
    height: 12vh;
    width: 100vw;
}
.navbar-brand img{
    margin-left: 25%;
    width: 60%;
    height: 60%;
}

.borderr{
    /* background: #00B84A !important;
    border: 1px solid #fff;
    width: 80%; */
    /* padding:15px; */
    border: 2px solid white;
    display: flex !important;
    justify-content: flex-end !important
}
.borderr2{
    background: none !important;
    border: none;
    width: 69%;
    /* padding:20px; */

}
input:focus,.textarea:focus, select:focus {
     border-color: rgba(75, 148, 8, 0.8);
     box-shadow: 0 0 5px rgb(75, 148, 8, 1);
     outline: 0 none;
 }

 .signup:hover, .signin:hover {
    border:2px solid white;
    border-radius:5px;
 }

 .cancel:hover, .continue:hover {
    background: #bbb !important; 
 }


</style>