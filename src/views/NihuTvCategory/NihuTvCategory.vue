<template>
    <Layout>
        <div slot="head">
            <modal name="original_details" :height="390">
                <div class="modal-header">
                   
                </div>
                <div class="modaly">
                    <p>Category name: {{Original.name}}</p>
                    <p>Customer Description: {{Original.description}}</p>
                    <p>Date: {{Original.created_at}}</p>
                </div>
                <div class="modal-footer">
                    <button @click="closeOriginal" class="btn btn-primary mx-auto">Close</button>
                </div>
            </modal>
        </div>
         <div slot="head">
			<modal name="addNihuTvCategory" :height="600" >
				<div class="modal-header">
                    Add NihuTv Category
                </div>
				<div class="modal-dialog" role="document">
					<form @submit.prevent="addNihuCategory">
						<div class="modal-content" style="background-color:#FFF">
							<div class="modal-body mx-3">
								<div class="md-form mb-5 form-space">
									<label data-error="wrong" data-success="right">Short Film</label>
                                    <input type="text" v-model="name" class="form-control validate form-input" placeholder="Short Filmss">
								</div>
	
                            </div>
							<div class="modal-footer d-flex justify-content-center">
                                
								<button  class="btn btn-primary">Add NihuTv Category
                                    
                                </button>
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
                            <span class="page-title-icon bg-gradient-primary text-white mr-2"><i
                            class="mdi mdi-cash-multiple"></i></span>
                        Original Category
                    </h3>
                </div>
                 <div class="mt-3">
                    <button  @click="addNihuTvCategory" class="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn button" href="">Add Nihu Tv
                    </button>
                </div>
                <div class="row">
                    <div class="col-lg-12 grid-margin stretch-card td">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title"></h4>
                                <Datatable :columns="columns" :data="originaData"  @deleteNihuCategory="deleteNihuCategory"
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
    import {ListNihuTvCategory} from "../../services/NihuTvCategory.Service";
    import {addNihuTvCategory} from "../../services/AddNihuTvCategory.Service"
    import Datatable from '../../components/Datatable/Datatable';
    import Loader from '../../components/Loader/Loader';
    import swal from 'sweetalert';


    const action = [
        
        {
            class: 'btn btn-danger',
            callback: 'deleteNihuCategory',
            args: ['AdminId'],
            text: 'Delete',
        },
        
    ];

    export default {
        name: "Payment",
        data() {
            return {
                title: "Payment",
                columns: ["ID", 'Name', 'Actions'],
                perPage: 10,
                sortable: false,
                searchable: true,
                loading: true,
                originaData: [],
                actions: action,
                callbacks: ['test', 'delete '],
                isLoading: false,
                loadingText: "loading...",
                Original:[],
                name:''
            }
        },
        computed: {
            listCategory() {
                    return this.$store.getters.GET_CATEGORY
            }
        },
        mounted(){
            this.$store.dispatch('LOAD_CATEGORY_DATA')
        },
        async created() {
          await this.fetchOriginal();  
        },
        methods: {
            fetchOriginal() {
                this.originaData = [];

                ListNihuTvCategory.listNihutvcategory().then((response) => {
                response.forEach(({ id:film_id, name:music_name,uuid: adminId}) => {
                    this.originaData.push({
                        ID: film_id,
                        Name: music_name,
                        AdminId:adminId
                    });
                });
                this.loading = false;
                }).catch((err) => {
                    this.isLoading = false;
                    this.$toastr.error(err.message || "Payment comfirmation failed", "Error!", {timeOut: 5000});
                });
            },
            addNihuTvCategory(){
                this.$modal.show('addNihuTvCategory');

            },
            closeOriginal() {
                this.$modal.hide('original_details');
            },
            async addNihuCategory() {
                this.loading = true;
                await addNihuTvCategory.addNihuCategory({
                    name:this.name,

                }).then((res)=> {
                    this.$toastr.success(res.message, {timeOut: 5000});

                }).catch((error) => {
                    this.$toastr.error(error.error.message, "Account Creation failed!", {timeOut: 5000});
                });
                this.loading = false;
            },
            deleteNihuCategory(ref) {
				swal({
					title: "Are you sure?",
					text: "Are you sure that you want to delete this account",
					icon: "warning",
					dangerMode: true,
				})
					.then(willDelete => {
						if (willDelete) {
							this.loadingText = "Deleting event...";
							this.isLoading = true;
							ListNihuTvCategory.deleteNihuTvCategory(ref).then((res) => {
								this.isLoading = false;
								this.userData.splice(ref, 1);
								this.$toastr.success(res.message, {timeOut: 5000});
								this.loading = false;
							}).catch((err) => {
								this.isLoading = false;
								this.$toastr.error(err.message || "Admin delete failed", err.message, {timeOut: 5000});
							});
						}
					});

            },
            
           
        },
        components: {
            Layout, Datatable, Loader
        }
    }
</script>

<style scoped>
.button{
    width:20%;
    height:50px;
    padding: 10px,10px,10px,10px

}
.td{
    padding-top: 15px
}
.form-space{
    padding-top: 20px;
}
.form-input{
    height:50px;
    font-size: 18px
}
text-color{
    color: #FFF
}
.modal-header{
    background-color: #0172bb !important;
    color: white
}

</style>