<template>
    <Layout>
         <div slot="head">
            <modal name="music_details" :height="350">
                <div class="modaly">

                    <p> <span style="font-weight:bold">Title:</span> {{detailCategory.title}}</p>
                    <p> <span style="font-weight:bold">Area of Interest:</span> {{detailCategory.areaOfSpecialization}}</p>
                    <p> <span style="font-weight:bold">MemberShip ID:</span>  {{detailCategory.membership_id}}</p>
                    <p> <span style="font-weight:bold">Organization:</span> {{detailCategory.organization}}</p>
                    <p> <span style="font-weight:bold">Phone Number:</span> {{detailCategory.phoneNumber}}</p>
                    <p> <span style="font-weight:bold">Years Of Experience:</span> {{detailCategory.yearsOfExperience}} Years</p>



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
                                class="mdi mdi-account-multiple menu-icon"></i></span>
                        Choose Mentor
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
    import Datatable from '../../components/Datatable/Datatable';
    import Loader from '../../components/Loader/Loader';
    import swal from 'sweetalert';
    import {Mentorservice} from '../../services/Mentor.service.js'
    const action = [
        {
            class: 'btn btn-primary',
            actionType: 'click',
            callback: 'ViewCategory',
            args: ['AdminId'],
            text: 'View Profile ',
        },
        {
            class: 'btn btn-danger',
            actionType: 'click',
            args: ['AdminId'],
            callback: 'DeleteCategory',
            text: 'Request Mentor',
        },
        
    ];
    export default {
        name: "Listuser",
        
        data() {
            return {
                title: "Listuser",
                columns: ["Thumbs", "Name", 'Surname','Year of Exp', 'Skill','Status'],
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
            await Mentorservice.mentorCategory().then((response) => {
                response.forEach(({displayPicture:cover, firstName:first_name, lastName:last_name, yearsOfExperience:years, areaOfSpecialization:skill, status: status_readable, _id:adminId}) => {
                    this.userData.push({
                        Thumbs: '<img src="'+cover+'">',
                        Name: first_name,
                        Surname:last_name,
                        'Year of Exp':years,
                        Skill:skill,
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
	
				this.$modal.show('music_details', {AdminId: AdminId,Name: Name, Description: Description});
            },
            beforeOpen(event) {
				this.editData = event.params;
            },
            
            DeleteCategory(adminId){
                swal({
                        title: "Are you sure?",
                        text: "Are you sure you want to request for a mentor",
                        icon: "warning",
                        dangerMode: true,
				}).then(willDelete => {
                    if(willDelete){
                            this.loadingText = "requesting..."
                            this.isLoading = true;
                            ListCategoryservice.deleteCategory(adminId).then((res) => {
                            this.isLoading= false;
                            this.userData.splice(adminId, 1);
                            this.$toastr.success(res.message, {timeOut: 5000});
                        }).catch((error) => {
                            this.$toastr.error(error.message, "request Unsuccessfull!", {timeOut: 5000});
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
                    Mentorservice.viewCategory(adminId).then((res) => {
                        this.detailCategory = res;
                        window.console.log('**********', this.detailCategory)
                        this.isLoading= false;
                        this.$modal.show('music_details');
                    }).catch((err) => this.$toastr.error(err.message || "View Profile failed", "Error!", {timeOut: 5000}));

                    
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
