<template>
   <Layout>
        <!-- partial -->
        <div class="main-panel" slot="body">
            <div class="content-wrapper">
                <div class="page-header">
                    <h3 class="page-title">
                        <span class="page-title-icon bg-gradient-primary text-white mr-2"> <i
                                class="mdi mdi-account-card-details"></i></span>
                        Add Nihu TV
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
                            <h4>Hello  Admin! Add Movies </h4>
                            <!-- <h6 class="font-weight-light">Sign in to continue.</h6> -->
                            <form class="pt-3" @submit.prevent="post">
                                <div class="form-group">
                            <label data-error="wrong" data-success="right">Category Type</label>

                                   <select v-model="category"
                                                    class="form-control form-control-lg font-weight">
                                                <option value="" disabled selected>Select Category Type</option>
                                                <option :value="list.uuid" v-for="(list, index) in listCategory"
                                                        v-bind:key="index"
                                                        class="btn btn-outline-secondary">
                                                    {{list.name}}
                                                </option>
                                    </select>
                                </div>
                                <div class="form-group">
                                <label data-error="wrong" data-success="right">Title</label>

                                    <input type="text" class="form-control form-control-lg"
                                            placeholder="Tv Title" v-model="title"
                                           required>
                                </div>
                                <div class="form-group">
                                <label data-error="wrong" data-success="right">Description</label>

                                    <input type="textarea" class="form-control form-control-lg"
                                            placeholder="Tv Description..." v-model="description"
                                           required>
                                </div>
                                <div class="form-group">
                        <label data-error="wrong" data-success="right">Duration</label>

                                    <input type="text" class="form-control form-control-lg" 
                                           placeholder="Duration"  v-model="duration" required>
                                </div>
                                <div class="form-group">
                                    <input type="text" class="form-control form-control-lg"
                                           placeholder="Year"  v-model="year" required>
                                </div>
                                 <div class="form-group">
                                    <input type="text" class="form-control form-control-lg"
                                           placeholder="Cast"  v-model="cast" required>
                                </div>
                                <div class="form-group">
                                    <input type="text" class="form-control form-control-lg"
                                           placeholder="Genre"  v-model="genre" required>
                                </div>
                                <div class="form-group">
                                            <label>Thumbnail Upload</label>
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
                                            <label>Audio/Video Upload</label>
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
                                            href="">Add Nihu TV
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
    import {addNihuTv} from "../../services/AddNihuTv.services";


    

    export default {
        name: 'admin',
        components: {Loader, Layout},
        data: function () {
            return {    
                title: '',
                category: '',
                description:'',
                image: '', 
                year:'',
                cast:'',
                duration:'',
                genre:'',
                imageName:'',
                file: '', 
                fileName:'',
                category_id:'',
                loading: false}
        },
        computed: {
        listCategory(){
                return this.$store.getters.GET_CATEGORY
                console.log(this.listCategory)
        },
        },
        mounted(){
            this.$store.dispatch('LOAD_CATEGORY_DATA')
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
                bodyFormData.set('category', this.category);
                bodyFormData.set('title', this.title);
                bodyFormData.set('description', this.description);
                bodyFormData.set('year', this.year);
                bodyFormData.set('cast', this.cast);
                bodyFormData.set('duration', this.duration);
                bodyFormData.set('genre', this.genre);
                bodyFormData.set('image', this.image);
                bodyFormData.set('file', this.file);
                await addNihuTv.addNihu(bodyFormData).then((res)=> {
                    this.$toastr.success(res.message, {timeOut: 5000});

                }).catch((error) => {
                    this.$toastr.error(error.message, "Music  Creation failed!", {timeOut: 5000});
                });
                this.loading = false;
            }
            
        },
            
    }
</script>
