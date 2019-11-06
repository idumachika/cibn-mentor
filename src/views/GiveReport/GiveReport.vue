<template>
   <Layout>
      <Loader v-if="loading" :show-full="true" loading-text="Adding Category..."/>

        <!-- partial -->
        <div class="main-panel" slot="body">
            <div>
                <div class="page-header">
                    <h3 class="page-title">
                        <span class="page-title-icon bg-gradient-primary text-white mr-2"> <i
                                class="mdi mdi-cash-multiple"></i></span>
                       Give Report
                    </h3>
                </div>
            </div>
            <div class="content-wrapper">
            <div class="row">
            <div class="col-md-6 grid-margin stretch-card">
            <div class="card"> 

                <div class="card-body">
                    <form class="forms-sample">
                      <div class="form-group">
                        <label for="exampleInputUsername1">Learning Objectives</label>
                        <input type="text" class="form-control" id="exampleInputUsername1" placeholder="Learning Objective">
                      </div>
                      <div class="form-group">
                        <label for="exampleInputEmail1">Learning Goals</label>
                        <input type="text" class="form-control" id="exampleInputEmail1" placeholder="Learning Goals">
                      </div>
                      <div class="form-group">
                        <label for="exampleInputPassword1">Summary of Discussion</label>
                        <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Summary of Discussion">
                      </div>
                      <div class="form-group">
                        <label for="exampleInputConfirmPassword1">Learning Outcome</label>
                        <input type="text" class="form-control" id="exampleInputConfirmPassword1" placeholder="Learning Outcome">
                      </div>
                      
                      <button type="submit" class="btn btn-gradient-primary mr-2">Send Report</button>
                      <button class="btn btn-light">Cancel</button>
                    </form>
                </div>
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
    
    export default {
        name: 'credit',
        components: {Loader, Layout},
        data: function () {
            return {    
                name: '',
                description: '',
                image: '',
                imageName:'',
                loading: false
                }
        },
        
        methods: {
            // ...mapActions({loginUser: 'LOGIN'}),
            onFileChanged (event) {
                    this.image = event.target.files[0]
                    this.imageName = this.image.name;            },
            async addRecap() {
                this.loading = true;
                let bodyFormData = new FormData()
                bodyFormData.set('name', this.name);
                bodyFormData.set('description', this.description);
                bodyFormData.set('image', this.image);
                
                await AddRecapService.addRecap(bodyFormData).then((res)=>{
                    this.$toastr.success(res.message, {timeOut: 5000});
                }).catch((error) => {
                    this.$toastr.error(error.message, "Add Recap failed!", {timeOut: 5000});
                });
                this.loading = false;
            }
            
        },
            
    }
</script>