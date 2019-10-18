<template>
    <Layout>
         <div slot="head">
            <modal name="view_tv_show" :height="300">
                <div class="modal-header">
                </div>
                <div class="modaly">
                    <p> <span style="font-weight:bold">Name:</span> {{tvshowdetails.name}}</p>
                    <p> <span style="font-weight:bold">Category id:</span> {{tvshowdetails.category_id}}</p>
                    <p> <span style="font-weight:bold">Description:</span> {{tvshowdetails.content}}</p>
                    <p> <span style="font-weight:bold">Overview :</span> {{tvshowdetails.overview}}</p>
                    <p> <span style="font-weight:bold">Number of Share:</span> {{tvshowdetails.share}}</p>
                </div>
                <div class="modal-footer">
                    <button @click="closeTvShowCategory" class="btn btn-primary mx-auto">Close</button>
                </div>
            </modal>
        </div>
         <div slot="head">
			<modal name="tvShow-edit" :height="500" @before-open="beforeOpen">
				<div class="modal-header" style="textAlign:center">
					Edit Event
				</div>
				<div class="modal-dialog" role="document">
					<form @submit.prevent="eventedit(adminId)">
						<div class="modal-content" style="background-color:#FFF">
							<div class="modal-body mx-3">
								<div class="md-form mb-5">
									<label data-error="wrong" data-success="right">TvShow Name</label>
									<input type="text" v-model="editData.Name" class="form-control validate">
								</div>
								<div class="md-form mb-5">
									<label data-error="wrong" data-success="right">TvShow Description</label>
									<textarea type="text" v-model="editData.Description" class="form-control validate"></textarea>
								</div>
                            </div>
							<div class="modal-footer d-flex justify-content-center">
								<button class="btn btn-danger">Edit TvShow</button>
							</div>
						</div>
					</form>
				</div>

				<div class="modal-footer">
					<!-- <button @click="closeEditEvent" class="btn btn-primary mx-auto">Close</button> -->
				</div>
			</modal>
		</div>
        <!-- partial -->
        <div class="main-panel" slot="body">
            <Loader v-if="isLoading" :showFull=true :loading-text="loadingText"/>
            <div class="content-wrapper">
                <div class="page-header">
                    <h3 class="page-title">
                        <span class="page-title-icon bg-gradient-primary text-white mr-2"> <i
                                class="mdi mdi-account-card-details"></i></span>
                     Tv show
                    </h3>
                </div>
                <div class="row">
                    <div class="col-lg-12 grid-margin stretch-card">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title"></h4>
                                <!-- <Datatable :fields="fields" :data="paymentsData" :perPage="1"> -->
                                <!-- </Datatable> -->
                                <Datatable :columns="columns" :data="adminData" :loading="loading" @openTvShowModal="openTvShowModal" @viewTvShow="viewTvShow" @DeletetvShow="DeletetvShow" :actions="actions"></Datatable>
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
    import {ListTvShowService} from "../../services/ListTvShow.Service";
    import Datatable from '../../components/Datatable/Datatable';
    import Loader from '../../components/Loader/Loader';
    import swal from 'sweetalert';




    const action = [
        {
            class: 'btn btn-primary',
            actionType: 'click',
             callback: 'openTvShowModal',
            args: ['AdminId','Name','Description'],
            text: 'Edit',
            icon: "mdi mdi-account-edit mdi-18px ",
        },
        {
            class: 'btn btn-danger',
            actionType: 'click',
            callback: 'DeletetvShow',
            args: ['AdminId'],
            text: 'Delete',
            icon: "mdi mdi-delete mdi-18px ",

        },
        {
            class: 'btn btn-primary',
            actionType: 'click',
             callback: 'viewTvShow',
            args: ['AdminId'],
            text: 'View',
            icon:'mdi mdi-face mdi-18px'
        },
    ];


    export default {
        name: "Listuser",

        
        data() {
            return {
                title: "Listuser",
                columns: ["Cover", 'Name', 'Category', 'Status'],
                perPage: 10,
                sortable: false,
                searchable: true,
                loading: true,
                tvshowdetails:{},
                adminData: [],
                isLoading:false,
                actions: action,
                loadingText:"loading...",
                callbacks: ['test', 'DeleteMusic'],
                editData:{}
            }
        },
        async created() {
            await ListTvShowService.listtvshow().then((response) => {
                response.forEach(({ image:cover, name:music_name, content:des, category_id:id, status: status_readable,uuid: adminId}) => {
                    this.adminData.push({
                        Cover: '<img src="'+cover +'">',
                        Name:music_name,
                        Description:des,
                        Status: status_readable,
                        Category:id,
                        AdminId: adminId
                        
                    });
                });
                this.loading = false;
            }).catch((err) => window.console.log(err));
        },
         methods: {
            test(adminId) {
                window.console.log("AdminId:" + adminId);
            },
            blockUser() {
                window.alert('Blocked User');
            },
            closeTvShowCategory() {
                this.$modal.hide('view_tv_show');
            },
            openTvShowModal(AdminId,Name, Description, ) {
	
                this.$modal.show('tvShow-edit', {AdminId: AdminId,Name:Name, Description:Description,});
            },
            beforeOpen(event) {
                this.editData = event.params;
			},
            DeletetvShow(adminId){
                swal({
                        title: "Are you sure?",
                        text: "Are you sure that you want to delete this event",
                        icon: "warning",
                        dangerMode: true,
				}).then(willDelete => {

                    if(willDelete){
                            this.loadingText = "deleting music..."
                            this.isLoading = true;
                            ListTvShowService.deleteTvshow(adminId).then((res) => {
                            this.isLoading= false;
                            this.$toastr.success(res.message, {timeOut: 5000});
                            }).catch((error) => {
                            this.$toastr.error(error.message, "delete Unsuccessfull!", {timeOut: 5000});
                            this.isLoading= false;

                            });

                        }
                })
                    
                            
            },
               
            editTvShow(adminId){
                    this.loadingText = "please wait..."
                    this.isLoading = true;
                    ListTvShowService.editTvshow(adminId).then((res) => {
                    this.isLoading= false;
                    this.$toastr.success(res.message, {timeOut: 5000});
                }).catch((error) => {
                    this.$toastr.error(error.message, "delete Unsuccessfull!", {timeOut: 5000});
                    this.isLoading= false;

                });
                            
            },
            viewTvShow(adminId){
                    this.loadingText = "please wait..."
                    this.isLoading = true;
                    ListTvShowService.viewTvshow(adminId).then((res) => {
                    this.isLoading= false;
                    this.tvshowdetails  = res.message
                    this.$modal.show('view_tv_show');
                }).catch((error) => {
                    this.$toastr.error(error.message, "show details Unsuccessfull!", {timeOut: 5000});
                    this.isLoading= false;

                });
                            
            }
        },
        components: {Layout,Loader, Datatable}
    }
</script>

<style scoped>

</style>