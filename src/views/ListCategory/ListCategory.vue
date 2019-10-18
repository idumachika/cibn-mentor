<template>
    <Layout>
         <div slot="head">
            <modal name="music_details" :height="250">
                <div class="modaly">
                    <p> <span style="font-weight:bold">Music Name:</span> {{detailCategory.name}}</p>
                    <p> <span style="font-weight:bold">Music Description:</span>  {{detailCategory.description}}</p>
                    <p> <span style="font-weight:bold">Date:</span> {{detailCategory.created_at}}</p>

                </div>
                <div class="modal-footer">
                    <button @click="closeCategory" class="btn btn-primary mx-auto">Close</button>
                </div>
            </modal>
        </div>
        <div slot="head">
			<modal name="category-edit" :height="500" @before-open="beforeOpen">
				<div class="modal-header">
					Edit Event
				</div>
				<div class="modal-dialog" role="document">
					<form @submit.prevent="eventedit(adminId)">
						<div class="modal-content" style="background-color:#FFF">
							<div class="modal-body mx-3">
								<div class="md-form mb-5">
									<label data-error="wrong" data-success="right">Music Name</label>
									<input type="text" v-model="editData.Name" class="form-control validate textSize">
								</div>
								<div class="md-form mb-5">
									<label data-error="wrong" data-success="right">Music Description</label>
									<textarea type="email" v-model="editData.Description" class="form-control validate textSize"></textarea>
								</div>
                            </div>
							<div class="modal-footer d-flex justify-content-center">
								<button class="btn btn-danger">Edit Music Category</button>
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
                        Manage Category
                    </h3>
                </div>
                <div class="row">
                    <div class="col-lg-12 grid-margin stretch-card">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title"></h4>
                                <!-- <Datatable :fields="fields" :data="paymentsData" :perPage="1"> -->
                                <!-- </Datatable> -->
                                <Datatable :columns="columns" :data="userData" :loading="loading" @ViewCategory="ViewCategory" @DeleteCategory="DeleteCategory" @openMusicModal="openMusicModal" :actions="actions"></Datatable>
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
    import {ListCategoryservice} from "../../services/ListCategoryService";
    import Datatable from '../../components/Datatable/Datatable';
    import Loader from '../../components/Loader/Loader';
    import swal from 'sweetalert';




    const action = [
        {
            class: 'btn btn-primary',
            actionType: 'click',
            callback: 'openMusicModal',
            args: ['AdminId','Name','Description',],
            text: 'Edit',
            icon: "mdi mdi-account-edit mdi-18px ",

        },
        {
            class: 'btn btn-danger',
            actionType: 'click',
            args: ['AdminId'],
            callback: 'DeleteCategory',
            text: 'Delete',
            icon: "mdi mdi-delete mdi-18px ",

        },
        {
            class: 'btn btn-primary',
            actionType: 'click',
            callback: 'ViewCategory',
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
                columns: [ "Thumbs", 'Name','Description',  'Status'],
                perPage: 10,
                sortable: false,
                searchable: true,
                loading: true,
                userData: [],
                isLoading:false,
                actions: action,
                detailCategory:[],
                loadingText:"loading...",
                callbacks: ['test', 'DeleteCategory'],
                editData:{}
            }
        },
        async created() {
            await ListCategoryservice.listCategory().then((response) => {
                response.forEach(({image:cover, name:music_name, description:des, overview:over_view,  status: status_readable,uuid: adminId}) => {
                    this.userData.push({
                        Thumbs: '<img src="'+cover+'">',
                        Name: music_name,
                        Description:des,
                        OverView:over_view,
                        Status: status_readable,
                        AdminId: adminId
                        
                        
                    });
                });
                this.loading = false;
            }).catch((err) => window.console.log(err));
        },
        methods: {
            test(adminId) {
                    window.console.log("Userid: " + adminId);
            },
            blockUser() {
                    window.alert('Blocked User');
            },
            closeCategory() {
                this.$modal.hide('music_details');
            },
            openMusicModal(AdminId,Name, Description ) {
	
				this.$modal.show('category-edit', {AdminId: AdminId,Name: Name, Description: Description});
            },
            beforeOpen(event) {
				this.editData = event.params;
            },
            
            DeleteCategory(adminId){

                swal({
                        title: "Are you sure?",
                        text: "Are you sure that you want to delete this event",
                        icon: "warning",
                        dangerMode: true,
				}).then(willDelete => {

                    if(willDelete){
                            this.loadingText = "deleting music..."
                            this.isLoading = true;
                            ListCategoryservice.deleteCategory(adminId).then((res) => {
                            this.isLoading= false;
                            this.userData.splice(adminId, 1);
                            this.$toastr.success(res.message, {timeOut: 5000});
                        }).catch((error) => {
                            this.$toastr.error(error.message, "delete Unsuccessfull!", {timeOut: 5000});
                            this.isLoading= false;

                        });

                    }
                })
                    
                            
            },
            EditCategory(adminId){
                    this.loadingText = "please wait..."
                    this.isLoading = true;
                    ListCategoryservice.editCategory(adminId).then((res) => {
                        this.isLoading= false;
                    this.$toastr.success(res.message, {timeOut: 5000});
                }).catch((err) => this.$toastr.error(err.message || "Edit failed", "Error!", {timeOut: 5000}));

            },
            ViewCategory(adminId){
                    this.loadingText = "please wait...."
                    this.isLoading = true;
                    ListCategoryservice.viewCategory(adminId).then((res) => {
                        this.detailCategory = res.message;
                        this.isLoading= false;
                        this.$modal.show('music_details');
                    }).catch((err) => this.$toastr.error(err.message || "View failed", "Error!", {timeOut: 5000}));

                    
            }
        },
        components: {Layout,Loader, Datatable}
    }
</script>

<style scoped>
.textSize{
    font-size: 18
}

</style>