<template>
    <Layout>
        <div slot="head">
            <modal name="view_tv_show" :height="300">
                <div class="modal-header">
                </div>
                <div class="modaly">
                    <p> <span style="font-weight:bold">Category name: </span>{{tvshowdetails.name}}</p>
                    <p> <span style="font-weight:bold">Category id:</span> {{tvshowdetails.category_id}}</p>
                    <p> <span style="font-weight:bold">Category Description</span>: {{tvshowdetails.description}}</p>
                  
                    
                </div>
                <div class="modal-footer">
                    <button @click="closeTvShowCategory" class="btn btn-primary mx-auto">Close</button>
                </div>
            </modal>
        </div>
        <div slot="head">
			<modal name="tvShowCategory-edit" :height="500" @before-open="beforeOpen">
				<div class="modal-header" style="textAlign:center">
					Edit Event
				</div>
				<div class="modal-dialog" role="document">
					<form @submit.prevent="eventedit(adminId)">
						<div class="modal-content" style="background-color:#FFF">
							<div class="modal-body mx-3">
								<div class="md-form mb-5">
									<label data-error="wrong" data-success="right">TvShow Name</label>
									<input type="text" v-model="editData.Name" class="form-control validate font-size">
								</div>
								<div class="md-form mb-5">
                                    <label data-error="wrong" data-success="right">TvShow Description</label>
                                    <textarea type="text" v-model="editData.Description"
                                                class="form-control validate">
                                    </textarea>
								</div>
                            </div>
							<div class="modal-footer d-flex justify-content-center">
								<button class="btn btn-danger">Edit TvShowCategory</button>
							</div>
						</div>
					</form>
				</div>

				<div class="modal-footer">
					<!-- <button @click="closeEditEvent" class="btn btn-primary mx-auto">Close</button> -->
				</div>
			</modal>
		</div>
    
        <div class="main-panel" slot="body">
            <Loader v-if="isLoading" :showFull=true :loading-text="loadingText"/>
            <div class="content-wrapper">
                <div class="page-header">
                    <h3 class="page-title">
                            <span class="page-title-icon bg-gradient-primary text-white mr-2"> <i
                                    class="mdi mdi-cash-multiple"></i></span>
                        Tv Show Category
                    </h3>
                </div>
                <div class="row">
                    <div class="col-lg-12 grid-margin stretch-card">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title"></h4>
                                <Datatable :columns="columns" :data="tvShowData" @DeletetvShowCategory="DeletetvShowCategory" @viewtvshowCategory="viewtvshowCategory"
                                           @openTvShowModal="openTvShowModal"
                                           :loading="loading" :actions="actions">
                                </Datatable>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
</template>

<script>
    import Layout from '../../components/Layout';
    import {ListTvShowCategoryservice} from "../../services/ListTvShowCategory.Service";
    import Datatable from '../../components/Datatable/Datatable';
    import Loader from '../../components/Loader/Loader';
    import swal from 'sweetalert';



    const action = [
        {
            class: 'btn btn-primary',
            callback: 'openTvShowModal',
            args: ['AdminId','Name', 'Description'],
            text: 'Edit',
            icon: "mdi mdi-account-edit mdi-18px ",
            
        },
        {
            class: 'btn btn-danger',
            callback: 'DeletetvShowCategory',
            args: ['AdminId'],
            text: 'Delete',
            icon: "mdi mdi-delete mdi-18px ",
        },
        {
            class: 'btn btn-primary',
            callback: 'viewtvshowCategory',
            args: ['AdminId'],
            text: 'View',
            icon:'mdi mdi-face mdi-18px'
            
        },

    ];

    export default {
        name: "Payment",
        data() {
            return {
                title: "Payment",
                columns: ["Thumbs", 'Name', 'Status'],
                perPage: 10,
                sortable: false,
                searchable: true,
                loading: true,
                tvShowData: [],
                actions: action,
                callbacks: ['test', 'delete '],
                isLoading: false,
                loadingText: "loading...",
                tvshowdetails:{},
                editData:{}
               
            }
        },
        async created() {
          await this.fetchPayments();  
        },
       
        methods: {
            fetchPayments() {
                this.tvShowData = [];

                ListTvShowCategoryservice.listCategory().then((response) => {
                response.forEach(({image:cover, name:music_name, description:des, overview:view, share:music_share, status: status_readable,uuid: adminId}) => {
                    this.tvShowData.push({
                        Thumbs: '<img src="'+cover+'">',
                        Name: music_name,
                        Description:des,
                        Status: status_readable,
                        Overview:view,
                        Share:music_share,
                        AdminId:adminId
                    });
                });
                this.loading = false;
            }).catch((err) => {
                this.isLoading = false;
                this.$toastr.error(err.message || "Loading List Failed", "Error!", {timeOut: 5000});
            });
            },
             closeTvShowCategory() {
            this.$modal.hide('view_tv_show');
            },
            openTvShowModal(AdminId,Name, Description, ) {
	
                    this.$modal.show('tvShowCategory-edit', {AdminId: AdminId,Name:Name, Description:Description,});
            },
            beforeOpen(event) {

                this.editData = event.params;
                    // console.log(event.params.event_name)
			},
                
        
            DeletetvShowCategory(adminId){

                swal({
                            title: "Are you sure?",
                            text: "Are you sure that you want to delete this event",
                            icon: "warning",
                            dangerMode: true,
				}).then(willDelete => {

                        if(willDelete){
                            this.loadingText = "deleting TvShow..."
                            this.isLoading = true;
                            ListTvShowCategoryservice.deletetvshowCategory(adminId).then((res) => {
                            this.isLoading= false;
                            this.tvShowData.splice(adminId, 1);
                            this.$toastr.success(res.message, {timeOut: 5000});
                            }).catch((error) => {
                            this.$toastr.error(error.message, "delete Unsuccessfull!", {timeOut: 5000});
                            this.isLoading= false;

                            });

                        }
                })
                    
                            
            },

            editTvShowCategory(adminId){
                    this.loadingText = "please wait..."
                    this.isLoading = true;
                    ListTvShowCategoryservice.edittvshowCategory(adminId).then((res) => {
                    this.isLoading= false;
                    this.$toastr.success(res.message, {timeOut: 5000});
                    }).catch((error) => {
                    this.$toastr.error(error.message, "delete Unsuccessfull!", {timeOut: 5000});
                    this.isLoading= false;

                    });
                            
                },
            viewtvshowCategory(adminId){
                    this.loadingText = "please wait..."
                    this.isLoading = true;
                    ListTvShowCategoryservice.viewtvshowCategory(adminId).then((res) => {
                    this.isLoading= false;
                    this.tvshowdetails  = res.message
                    this.$modal.show('view_tv_show');
                    }).catch((error) => {
                    this.$toastr.error(error.message, "delete Unsuccessfull!", {timeOut: 5000});
                    this.isLoading= false;

                    });
                            
                }
        
            
            
        },
        components: {
            Layout, Datatable, Loader
        }
    }
</script>

<style scoped>

</style>