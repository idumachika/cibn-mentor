<template>
        <!-- partial -->
        <div class="main-panel" slot="body">
            <div class="content-wrapper">
                <div class="page-header">
                    <h3 class="page-title">
                        <span class="page-title-icon bg-gradient-primary text-white mr-2"> <i
                                class="mdi mdi-cash-multiple"></i></span>
                       Change Password
                    </h3>
                </div>
            </div>
            <div class="content-wrapper">
        <Loader v-if="loading" :show-full="true" loading-text="Adding Category..."/>
            <div class="col-md-6 grid-margin stretch-card">
            <div class="card" > 

                <div class="card-body" >
                <form class="forms-sample" @submit.prevent="changePassword">
                    <div class="form-group">
                      <label for="exampleInputUsername1">Old Password</label>
                      <input type="text" class="form-control" id="exampleInputUsername1" v-model="password" placeholder="Old Password">
                    </div>
                    <div class="form-group">
                      <label for="exampleInputEmail1">New Password</label>
                      <input type="text" class="form-control" id="exampleInputEmail1" v-model="newPassword "placeholder="New Password">
                    </div>
                    <div class="mt-3">
                                    <button class="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn"
                                            href="">Change Password
                                    </button>
                        </div>
                  </form>
                </div>
              </div>
            </div>
            </div>
        
        </div>
        
</template>

<script>
    import Loader from "../../components/Loader/Loader";
    import Layout from '../../components/Layout';
    import {ChangePasswordService} from "../../services/changePassword.service.js";
    
    export default {
        name: 'credit',
        components: {Loader},
        data: function () {
            return {    
                password: '',
                newPassword: '',
                loading: false
                }
        },
        
        methods: {
            // ...mapActions({loginUser: 'LOGIN'}),
            
            async changePassword() {
                this.loading = true;
            await ChangePasswordService.changePassword({
                password:this.password,
                newPassword:this.newPassword,
            }).then((res)=>{
                    this.$toastr.success(res.message, {timeOut: 5000});
                }).catch((error) => {
                    this.$toastr.error(error.message, "Change Password failed!", {timeOut: 5000});
                });
                this.loading = false;
            }
            
        },
            
    }
</script>

