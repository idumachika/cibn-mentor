<template>
   <Layout>
        <!-- partial -->
        <div class="main-panel" slot="body">
            <div class="content-wrapper">
                <div class="page-header">
                    <h3 class="page-title">
                        <span class="page-title-icon bg-gradient-primary text-white mr-2"> <i
                                class="mdi mdi-account-card-details"></i></span>
                        Add Music
                    </h3>
                </div>
            </div>
            <div class="container-scroller">
        <Loader v-if="loading" :show-full="true"/>
        <div class="container-fluid page-body-wrapper full-page-wrapper">
            <div class="content-wrapper  align-items-center auth">
                <div class="row w-100">
                    <div class="col-md-6 mx-auto">
                        <div class="auth-form-light text-left p-5">
                            <div class="brand-logo">
                            </div>
                            <h4>Hello  Admin! Add Music </h4>
                            <!-- <h6 class="font-weight-light">Sign in to continue.</h6> -->
                            <form class="pt-3" @submit.prevent="post">
                                <div class="form-group">
                                    <input type="text" class="form-control form-control-lg" id="exampleInputEmail1"
                                           placeholder="Music Name"  v-model="name" required>
                                </div>
                                <div class="form-group">
                                    <input type="textarea" class="form-control form-control-lg"
                                           id="exampleInputPassword1" placeholder="Write Here..." v-model="description"
                                           required>
                                </div>
                                <div class="form-group">
                                    <input type="text" class="form-control form-control-lg" id="exampleInputEmail1"
                                           placeholder="Category"  v-model="category_id" required>
                                </div>
                                <div class="form-group">
                                            <label>Image upload</label>
                                            <input type="file" name="img[]" @change="onImageChanged"
                                                   class="file-upload-default" ref="image">
                                        <div class="input-group col-xs-12">
                                                <input type="text" v-model='imageName' accept="image/*"
                                                       class="form-control file-upload-info" disabled=""
                                                       placeholder="Upload Image">
                                                <span class="input-group-append">
                                                <button class="file-upload-browse btn btn-gradient-primary"
                                                @click="$refs.image.click()" type="button">Upload</button>
                                                </span>
                                        </div>
                                </div>
                                <div class="form-group">
                                            <label>Audio/Video upload</label>
                                            <input type="file" name="img[]" @change="onFileChanged"
                                                   class="file-upload-default" ref="file">
                                        <div class="input-group col-xs-12">
                                                <input type="text" v-model='fileName' accept="video/*,image/*"
                                                    class="form-control file-upload-info" disabled=""
                                                    placeholder="Upload Image">
                                            <span class="input-group-append">
                                                    <button class="file-upload-browse btn btn-gradient-primary" type="button"
                                                    @click="$refs.file.click()">Upload
                                                    </button>
                                            </span>
                                        </div>
                                </div>
                                <div class="mt-3">
                                    <button class="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn"
                                            href="">Add Music
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
        </div>
        
    </Layout>
</template>
<!-- container-scroller -->

<script>
    import Loader from "../../components/Loader/Loader";
    import Layout from '../../components/Layout';
    import {AddMusicService} from "../../services/AddMusic.Service";


    

    export default {
        name: 'admin',
        components: {Loader, Layout},
        data: function () {
            return {    
                name: '',
                description: '',
                image: '', 
                imageName:'',
                file: '', 
                fileName:'',
                category_id:'',
                loading: false}
        },
        
        methods: {
            // ...mapActions({loginUser: 'LOGIN'}),
            onImageChanged (event) {
                    this.image = event.target.files[0]
                    this.imageName = this.image.name;
            },
            onFileChanged (event) {
                    this.file = event.target.files[0]
                    this.fileName = this.file.name;
            },
            async post() {
               this.loading = true;
                let bodyFormData = new FormData()
                bodyFormData.set('name', this.name);
                bodyFormData.set('description', this.description);
                bodyFormData.set('image', this.image);
                bodyFormData.set('file', this.file);
                bodyFormData.set('category_id', this.category_id);
                await AddMusicService.addmusic(bodyFormData).then((res)=> {
                    this.$toastr.success(res.message, {timeOut: 5000});

                }).catch((error) => {
                    this.$toastr.error(error.message, "Music  Creation failed!", {timeOut: 5000});
                });
                this.loading = false;
            }
            
        },
            
    }
</script>