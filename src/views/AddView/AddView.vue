<template>
   <Layout>
        <!-- partial -->
        <div class="main-panel" slot="body">
            <div class="content-wrapper">
                <div class="page-header">
                    <h3 class="page-title">
                        <span class="page-title-icon bg-gradient-primary text-white mr-2"> <i
                                class="mdi mdi-cash-multiple"></i></span>
                       Add View
                    </h3>
                </div>
            </div>
            <div class="content-wrapper  align-items-center auth">
        <Loader v-if="loading" :show-full="true" loading-text="please wait..."/>
            <div class="col-md-6 grid-margin stretch-card">
            <div class="card" @submit.prevent="addView"> 

                <div class="card-body">
                    <form class="forms-sample">
                        <div class="form-group">
                        <label for="exampleInputUsername1">Name</label>
                        <input type="text" class="form-control" id="exampleInputUsername1" v-model="name"  placeholder="Music Name">
                        </div>
                        <div class="form-group">
                        <label for="exampleInputEmail1">Description</label>
                        <input type="text" class="form-control" id="exampleInputEmail1" v-model="content" placeholder="Write Here">
                        </div>
                        <div class="form-group">
                        <label for="exampleInputEmail1">Overview</label>
                        <input type="text" class="form-control" id="exampleInputEmail1" v-model="overview" placeholder="Write Here">
                        </div>
                        <div class="form-group">
                        <label for="exampleInputEmail1">Category</label>
                        <input type="number" class="form-control" id="exampleInputEmail1" v-model="category_id" placeholder="Write Here">
                        </div>
                        <div class="form-group">
                            <label>Image upload</label>
                                <input type="file" name="img[]" @change="onFileChanged"
                                    class="file-upload-default" ref="image">
                                    <div class="input-group col-xs-12">
                                        <input type="text" v-model='imageName' accept="image/*"
                                            class="form-control file-upload-info" disabled=""
                                                placeholder="Upload Image">
                                                    <span class="input-group-append">
                                            <button class="file-upload-browse btn btn-gradient-primary"
                                                    @click="$refs.image.click()" type="button">Upload
                                                    </button>
                                                    </span>
                                    </div>
                        </div>
                    
                        
                        <button type="submit" class="btn btn-gradient-primary mr-2">Add View</button>
                    </form>
                </div>
              </div>
            </div>
            </div>
          
        </div>
        
    </Layout>
</template>

<script>
    import Loader from "../../components/Loader/Loader";
    import Layout from '../../components/Layout';
    import {AddViewService} from "../../services/AddView.services";


    

    export default {
        name: 'credit',
        components: {Loader, Layout},
        data: function () {
            return {    
                name: '',
                content: '',
                overview:'',
                category_id:'',
                image: '',
                imageName:'',
                loading: false
                }
        },
        
        methods: {
            // ...mapActions({loginUser: 'LOGIN'}),
            onFileChanged (event) {
                    this.image = event.target.files[0]
                      this.imageName = this.image.name;
            },
            async addView() {
                this.loading = true;
                let bodyFormData = new FormData()
                bodyFormData.set('name',this.name);
                bodyFormData.set('content',this.content);
                bodyFormData.set('overview',this.overview);
                bodyFormData.set('category_id',this.category_id);
                bodyFormData.set('image',this.image);
                
                await AddViewService.addview(bodyFormData).then((res)=>{
                    this.$toastr.success(res.message, {timeOut: 5000});



                }).catch((error) => {
                    this.$toastr.error(error.message, "Tv Show Failed!", {timeOut: 5000});
                });
                this.loading = false;

            }
            
        },
            
    }
</script>

