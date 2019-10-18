<template>
    <Layout>
        <div slot="head">
            <modal name="view_original" :height="390">
                <div class="modal-header">
                   
                </div>
                <div class="modaly">
                    <img alt="" :src="OriginalCategory.image"><img/>
                    <p>Category Name: {{OriginalCategory.name}}</p>
                    <p>Customer Description: {{OriginalCategory.description}}</p>
                    <p>Date: {{OriginalCategory.created_at}}</p>
                   
                </div>
                <div class="modal-footer">
                    <button @click="closeOriginalCategory" class="btn btn-primary mx-auto">Close</button>
                </div>
            </modal>
        </div>
        <!-- <div slot="head">
            <modal name="comfirm-payment" :height="390">
                <div class="modal-header">
                    Payment details for {{confirmData.reference}}
                </div>
                <div class="modaly">
                    <p>Customer name: {{confirmData.customer_name}}</p>
                    <p>Customer email: {{confirmData.customer_email}}</p>
                    <p>Amount: {{queryData.amount}}</p>
                    <p>Payment type: {{queryData.payment_type}}</p>
                    <p>Gateway response: {{queryData.gateway_response}}</p>
                    <p v-if="queryData.card">Card Type: {{queryData.card.type}}</p>
                </div>
                <div class="modal-footer">
                    <button @click="closeQueryPayment" class="btn btn-primary mx-auto">Close</button>
                </div>
            </modal>
        </div> -->
        <!-- partial -->
        <div class="main-panel" slot="body">
            <Loader v-if="isLoading" :showFull=true :loading-text="loadingText"/>
            <div class="content-wrapper">
                <div class="page-header">
                    <h3 class="page-title">
                            <span class="page-title-icon bg-gradient-primary text-white mr-2"> <i
                                    class="mdi mdi-cash-multiple"></i></span>
                        Original  Category
                    </h3>
                </div>
                <div class="row">
                    <div class="col-lg-12 grid-margin stretch-card">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title"></h4>
                                <Datatable :columns="columns" :data="listnihu" @editOriginal="editOriginal" @deleteOriginal="deleteOriginal"
                                           @viewOriginal="viewOriginal"
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
    import {ListNihuTvService} from "../../services/ListNihuTv.Service";
    import Datatable from '../../components/Datatable/Datatable';
    import Loader from '../../components/Loader/Loader'


    const action = [
        {
            class: 'btn btn-primary',
            callback: 'editOriginal',
            args: ['AdminId'],
            text: 'Edit',
            icon: "mdi mdi-account-edit mdi-18px ",
           
        },
        {
            class: 'btn btn-danger',
            callback: 'deleteOriginal',
            args: ['AdminId'],
            text: 'Delete',
            icon: "mdi mdi-delete mdi-18px ",

        },
        {
            class: 'btn btn-primary',
            callback: 'viewOriginal',
            args: ['AdminId'],
            text: 'View',
           
        },
    ];

    export default {
        name: "Payment",
        data() {
            return {
                title: "Payment",
                columns: [ 'Thumbs', 'Title', 'Genre', 'Duration'],
                perPage: 10,
                sortable: false,
                searchable: true,
                loading: true,
                listnihu: [],
                actions: action,
                callbacks: ['test', 'delete '],
                isLoading: false,
                loadingText: "loading...",
                OriginalCategory: {},
                confirmData:{}
            }
        },
        async created() {
          await this.fetchPayments();  
        },
        methods: {
            fetchPayments() {
                this.listnihu = [];

                 ListNihuTvService.listnihu().then((response) => {
                response.forEach(({ image_url:thumbs, title:name,  genre:movie_genre, duration:time,uuid: adminId}) => {
                    this.listnihu.push({
                         'Thumbs': '<img src='+thumbs+'/>',
                        'Title':name,
                         'Genre':movie_genre,
                         'Duration':time,
                        AdminId: adminId
                    });
                });
                this.loading = false;
            }).catch((err) => {
                this.isLoading = false;
                this.$toastr.error(err.message || "Loading List Failed", "Error!", {timeOut: 5000});
            });
            },
            
            deletePay() {
                window.alert('deleted');
            },
            closeOriginalCategory() {
                this.$modal.hide('view_original');
            },
            
            deleteOriginal(adminId) {
                this.loadingText = "Please wait...";
                this.isLoading = true;
                ListOriginalCategoryService.deleteOriginal(adminId).then((response) => {
                this.isLoading = false;
                this.$toastr.success(response.message || "Payment querying failed", "Error!", {timeOut: 5000})
                }).catch((err) => this.$toastr.error(err.message || "Payment querying failed", "Error!", {timeOut: 5000}));

            },
            editOriginal(adminId) {
                this.loadingText = "Please wait...";
                this.isLoading = true;
                ListOriginalCategoryService.editOriginalCategory(adminId).then((response) => {
                    this.isLoading = false;
                    this.$modal.show('edit_original');
                    this.$toastr.success(response.message || "Payment querying failed", "Error!", {timeOut: 5000})

                }).catch((err) => this.$toastr.error(err.message || "Payment querying failed", "Error!", {timeOut: 5000}));

            },
            viewOriginal(adminId) {
                this.loadingText = "Please wait...";
                this.isLoading = true;
            ListOriginalCategoryService.viewOriginalCategory(adminId).then((response) => {
                    this.isLoading = false;
                    this.OriginalCategory = response.message;
                    this.$modal.show('view_original');
                    this.$toastr.success(response.message || "Payment querying failed", "Error!", {timeOut: 5000})
            }).catch((err) => this.$toastr.error(err.message || "Payment querying failed", "Error!", {timeOut: 5000}));

            }
        },
        components: {
            Layout, Datatable, Loader
        }
    }
</script>

<style scoped>

.font-size{

    font-size: 18px
}

</style>