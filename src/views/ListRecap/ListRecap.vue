<template>
    <Layout>
        <div slot="head">
            <modal name="recap_details" :height="300">
                <div class="modaly">
                    <p> <img alt="" :src="recapData"/></p>
                    <p> <span style="font-weight:bold">Category id: </span>{{recapData.category_id}}</p>
                    <!-- <p>Category name: {{musicData.category_name}}</p> -->
                    <p> <span style="font-weight:bold">Recap Description:</span>  {{recapData.content}}</p>
                    <p><span style="font-weight:bold">Name: </span> {{recapData.name}}</p>
                    <p> <span style="font-weight:bold">Recap Overview:</span>{{recapData.overview}}</p>
                </div>
                <div class="modal-footer">
                    <button @click="closeMusic" class="btn btn-primary mx-auto">Close</button>
                </div>
            </modal>
        </div>
        <div slot="head">
			<modal name="recap-edit" :height="500" @before-open="beforeOpen">
				<div class="modal-header">
					Edit Recap
				</div>
				<div class="modal-dialog" role="document">
					<form @submit.prevent="eventedit(adminId)">
						<div class="modal-content" style="background-color:#FFF">
							<div class="modal-body mx-3">
								<div class="md-form mb-5">
									<label data-error="wrong" data-success="right">Recap Name</label>
									<input type="text" v-model="editData.Name" class="form-control validate textSize">
								</div>
								<div class="md-form mb-5">
									<label data-error="wrong" data-success="right">Recap Description</label>
									<textarea type="email" v-model="editData.Description" class="form-control validate textSize"></textarea>
								</div>

								

							</div>
							<div class="modal-footer d-flex justify-content-center">
								<button class="btn btn-danger">Edit Recap</button>
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
                     Manage Recap
                    </h3>
                </div>
                <div class="row">
                    <div class="col-lg-12 grid-margin stretch-card">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title"></h4>
                                <!-- <Datatable :fields="fields" :data="paymentsData" :perPage="1"> -->
                                <!-- </Datatable> -->
                                <Datatable :columns="columns" :data="adminData" :loading="loading" @ViewRecap="ViewRecap" @EditRecapModal="EditRecapModal" @DeleteRecap="DeleteRecap" :actions="actions"></Datatable>
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
    import {ListRecapService} from "../../services/ListRecap.services";
    import Datatable from '../../components/Datatable/Datatable';
    import Loader from '../../components/Loader/Loader';
    import swal from 'sweetalert';



    const action = [
        {
            class: 'btn btn-primary',
            actionType: 'click',
            callback: 'EditRecapModal',
            args: ['AdminId','Description','Name'],
            text: 'Edit',
            icon: "mdi mdi-account-edit mdi-18px ",
        },
        {
            class: 'btn btn-danger',
            actionType: 'click',
            callback: 'DeleteRecap',
            args: ['AdminId'],
            text: 'Delete',
            icon: "mdi mdi-delete mdi-18px ",


			
        },
        {
            class: 'btn btn-primary',
            actionType: 'click',
            callback: 'ViewRecap',
            args: ['AdminId'],
            text: 'View',
            icon:'mdi mdi-face mdi-18px'
        },
    ];


    export default {
        name: "ListRecap",

        
        data() {
            return {
                title: "ListRecap",
                columns: ["Thumbs", 'Name','Description', 'Category', 'Status'],
                perPage: 10,
                sortable: false,
                searchable: true,
                loading: true,
                adminData: [],
                recapData:{},
                isLoading:false,
                actions: action,
                loadingText:"please wait...",
                callbacks: ['test', 'DeleteMusic'],
                editData:{},
            }
        },
        async created() {
            await ListRecapService.listrecap().then((response) => {
                response.forEach(({ image:cover, name:recap_name, content:des, category_id:id, status: status_readable,uuid: adminId}) => {
                    this.adminData.push({
                        Thumbs: '<img src="'+cover+'">',
                        Name: recap_name,
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
                test(adminId,) {
                    window.console.log("AdminId:" + adminId);
                },
                blockUser() {
                    window.alert('Blocked User');
                },
                closeMusic() {
                this.$modal.hide('recap_details');
                },
                EditRecapModal(AdminId, Name, Description) {
	
				this.$modal.show('recap-edit', {AdminId: AdminId, Name: Name, Description: Description});
                },
                beforeOpen(event) {
				this.editData = event.params;
            },
            closeRecap() {
                this.$modal.hide('recap_details');
                },
                
            DeleteRecap(adminId){
                swal({
                        title: "Are you sure?",
                        text: "Are you sure that you want to delete this event",
                        icon: "warning",
                        dangerMode: true,
				}).then(willDelete => {

                    if(willDelete){
                            this.loadingText = "deleting music..."
                            this.isLoading = true;
                            ListRecapService.deleteRecap(adminId).then((res) => {
                            this.isLoading= false;
                            this.adminData.splice(adminId, 1);
                            this.$toastr.success(res.message, {timeOut: 5000});
                            }).catch((error) => {
                            this.$toastr.error(error.message, "delete Unsuccessfull!", {timeOut: 5000});
                            this.isLoading= false;

                        });

                    }
                })
                    
                            
            },
            EditRecap(adminId){
                    this.loadingText = "please wait..."
                    this.isLoading = true;
                    ListRecapService.editRecap(adminId).then((res) => {
                    this.isLoading= false;
                    this.$toastr.success(res.message, {timeOut: 5000});
                }).catch((error) => {
                    this.$toastr.error(error.message, "delete Unsuccessfull!", {timeOut: 5000});
                    this.isLoading= false;

                });
                            
            },
            ViewRecap(adminId){
                    this.loadingText = "please wait..."
                    this.isLoading = true;
                    ListRecapService.viewRecap(adminId).then((res) => {
                    this.isLoading= false;
                    window.console.log(res)
                    this.recapData = res.message
                    this.$modal.show('recap_details');
                }).catch((error) => {
                      window.console.log(error)
                    this.isLoading= false;

                });
                            
            }
        },
        components: {Layout,Loader, Datatable}
    }
</script>

<style scoped>
.textSize{
    font-size: 18px;
}

</style>