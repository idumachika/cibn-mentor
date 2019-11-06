<template>
   <div class="container-fluid">
        <Loader v-if="loading" :show-full="true" loading-text="Logging in..."/>

        <mdb-navbar dark position='top' expand='medium' class="navbar" style="background: green; width: 100vw;"> 
            <mdb-navbar-brand waves >
            <router-link to="/"> <img src="../../assets/images/logos.png" alt=""></router-link>
            </mdb-navbar-brand>
        </mdb-navbar>


        <div class="row">
            <div class="col-md-4 col-lg-4 col-sm-6 col-xs-6 log-in-details">
              <div class="details" style="margin-top: 50%;">

                <!-- alert error message -->
                 <mdb-alert color="danger" v-if="passes" class="mt-2" leaveAnimation="fadeOut"  @closeAlert="retFalse" dismiss> <span style="font-size:15px">Invalid email or password</span> </mdb-alert>
                  <div class="text" style="top: 50%; position: relative;">  
                    <h3>LOGIN</h3>
                    <p>Welcome back! Kindly enter your email and password.</p>
                  </div>
                  <ValidationObserver>
                    <section style="margin-top: -15%;">
                        <mdb-row>
                            <mdb-col >
                              <form @submit.prevent="login" class="form">
                                  <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
                                    <mdb-input type="text" name ='email' v-model="email" label="Email" bg size="sm" />
                                    <span style="font-size:13px; color:red"> <span v-if="errors[0]"><i class="fas fa-ban"></i></span> {{ errors[0] }}</span>
                                  </ValidationProvider> 
                                  <ValidationProvider name="password" rules="required|min:6" v-slot="{ errors }">  
                                    <mdb-input type="password" name ='password'  v-model="password" label="Password" bg size="sm" />
                                    <span style="font-size:13px; color:red"> <span v-if="errors[0]"><i class="fas fa-ban"></i></span> {{ errors[0] }}</span> 
                                  </ValidationProvider>
                                  <router-link to="/changePassword"> 
                                    <div class="mt-1 mb-4 text-right" style="color:orange; width:auto; cursor:pointer; font-size: 14px;">Forgot password?</div>
                                  </router-link> 
                                    
                                    <mdb-btn class="btn-block" color="success" style="width:auto; margin-left: -1px; border-radius:7px;">
                                      <span>Login</span>

                                    </mdb-btn>
                              </form>

                              <div  class="mt-3" style="color:lightblue; cursor:pointer">Don't have an account? <span><a  class="register" style="color:lightblue" href="/signup">Register</a></span></div>
                            </mdb-col>
                        </mdb-row>
                    </section>
                  </ValidationObserver>  
              </div>
            </div>
            <div class="col-md-8 col-lg-8 col-sm-6 col-xs-6 main-content">

            </div>

            <mdb-modal :show="modal" @close="modal = false">
            <mdb-modal-header>
              <mdb-modal-title>Modal title</mdb-modal-title>
            </mdb-modal-header>
            <mdb-modal-body>...</mdb-modal-body>
            <mdb-modal-footer>
              <mdb-btn color="secondary" @click.native="modal = false">Close</mdb-btn>
              <mdb-btn color="primary">Save changes</mdb-btn>
            </mdb-modal-footer>
          </mdb-modal>

        </div>
      
  </div>
</template>
<!-- container-scroller -->

<script>
    import Loader from "../../components/Loader/Loader";
    import {mapActions} from 'vuex';
    import router from '../../router';
    import { ValidationObserver, ValidationProvider } from "vee-validate";
    import{mdbNavbar, mdbAlert, mdbBtn, mdbContainer, mdbNavItem, mdbNavbarNav, mdbNavbarBrand, mdbRow, mdbCol, mdbInput, mdbModal, mdbModalHeader, mdbModalBody, mdbModalTitle, mdbModalFooter} from 'mdbvue'


    export default {
        name: 'Login',
        components: {
            Loader,
            mdbBtn,
            mdbNavbar,
            mdbNavItem, 
            mdbNavbarNav, 
            mdbNavbarBrand,
            mdbContainer, 
            mdbRow, 
            mdbCol, 
            mdbInput,
            mdbModal, 
            mdbAlert,
            mdbModalHeader, 
            mdbModalBody, 
            mdbModalTitle, 
            mdbModalFooter,
            ValidationObserver,
            ValidationProvider 
        },
        data: function () {
            return {
                email: '',
                password: '', 
                loading: false,
                modal: false,

                }
        },
        methods: {
            ...mapActions({loginUser: 'LOGIN'}),
            async login() {
                this.loading = true;
                await this.loginUser({
                    email: this.email,
                    password: this.password
                }).then(function () {
                    router.push({name: 'dashboard'});
                }).catch((error) => {
                    this.$toastr.error(error.message, "Login Failed!", {timeOut: 5000});
                });
                this.loading = false;
            },
            retFalse () {
            this.$store.commit('setPasses', false)
            }
        }
    }
</script>

<style>
.main-content{
    background: url('../../assets/images/baby.svg');
    background-size: cover;
    width: 100%;
    height: 100vh;
    margin-top: -2px;
}
.log-in-details{
    background: #003B18;
    margin-top: -2px;
}
label{
  background: none;
}
.details{
    width: 55%;
    margin: 25% auto;
    color: #fff;
}
.details h3{
    font-weight: bold;
}
.details p{
    font-size: 0.8em;
    margin-bottom: 20%;
}
label{
    font-size: 0.8em;
    margin-bottom: 0;
}
.text-right{
    margin-top: -5%;
}
.btn{
    width: 45%;
    margin-top: -20%;

}
.register:hover {
  text-decoration: underline;
  color:whitesmoke !important
}
</style>