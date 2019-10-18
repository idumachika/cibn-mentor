<template>
    <div class="container-scroller">
        <Loader v-if="loading" :show-full="true" loading-text="Logging in..."/>
        <div class="container-fluid page-body-wrapper full-page-wrapper">
            <div class="content-wrapper d-flex align-items-center auth">
                <div class="row w-100">
                    <div class="col-lg-4 mx-auto">
                        <div class="auth-form-light text-left p-5">
                            <div class="brand-logo">
                                <img src="../../assets/images/nihu-logo3.svg">
                            </div>
                            <h4>Hello! let's get started</h4>
                            <h6 class="font-weight-light">Sign in to continue.</h6>
                            <form class="pt-3" @submit.prevent="login">
                                <div class="form-group">
                                    <input type="text" class="form-control form-control-lg" id="exampleInputEmail1"
                                           placeholder="Username" v-model="email">
                                </div>
                                <div class="form-group">
                                    <input type="password" class="form-control form-control-lg"
                                           id="exampleInputPassword1" placeholder="Password" v-model="password"
                                        >
                                </div>
                                <div class="mt-3">
                                    <button class="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn btn-rounded"
                                            href="">SIGN IN
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <!-- content-wrapper ends -->
        </div>
        <!-- page-body-wrapper ends -->
    </div>
</template>
<!-- container-scroller -->

<script>
    import Loader from "../../components/Loader/Loader";

    export default {
        name: 'Login',
        components: {Loader},
        data: function () {
            return {email: '', password: '', loading: false}
        },
        methods: {
            login () {
                alert(9)
                this.$router.push('/dashboard')
            }
        }
    }
</script>

<style scoped>
.content-wrapper {
        background: #000000;
    }

    .auth .auth-form-light {
        border-radius: 20px;
        background: #101010;
    }

    h4, h6 {
        color: white;
    }

    .auth form .form-group .form-control {
        border-radius: 30px;
        color: white;
    }
</style>