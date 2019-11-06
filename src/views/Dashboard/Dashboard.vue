<template>
    <Layout>
        <!-- partial -->
        <div class="main-panel" slot="body">
            <div class="content-wrapper">
                <div class="page-header">
                    <h3 class="page-title">
              <span class="page-title-icon bg-gradient-primary text-white mr-2">
                <i class="mdi mdi-home"></i>
              </span>
                        Dashboard
                    </h3>
                </div>
                <div class="row">
                    <div class="col-md-4 stretch-card grid-margin">
                        <div class="card bg-gradient-danger card-img-holder text-white">
                            <div class="card-body">
                                <img src="../../assets/images/circle.svg" class="card-img-absolute"
                                     alt="circle-image"/>
                                <h4 class="font-weight-normal mb-3">My Mentor
                                    <i class="mdi mdi-account mdi-24px float-right"></i>
                                </h4>
                                <h2 class="mb-5">{{dashboardData.total_events || 0}}</h2>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 stretch-card grid-margin">
                        <div class="card bg-gradient-info card-img-holder text-white">
                            <div class="card-body">
                                <img src="../../assets/images/circle.svg" class="card-img-absolute"
                                     alt="circle-image"/>
                                <h4 class="font-weight-normal mb-3">Pending Mentor
                                    <i class="mdi mdi-account-multiple mdi-24px float-right"></i>
                                </h4>
                                <h2 class="mb-5">{{dashboardData.total_verifications || 0}}</h2>
                                <!--<h6 class="card-text">Decreased by 10%</h6>-->
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 stretch-card grid-margin">
                        <div class="card bg-gradient-success card-img-holder text-white">
                            <div class="card-body">
                                <img src="../../assets/images/circle.svg" class="card-img-absolute"
                                     alt="circle-image"/>
                                <h4 class="font-weight-normal mb-3">Active Mentor
                                    <i class="mdi mdi-account-multiple mdi-24px float-right"></i>
                                </h4>
                                <h2 class="mb-5">{{dashboardData.total_successful_transactions || 0}}</h2>
                                <!--<h6 class="card-text">Increased by 5%</h6>-->
                            </div>
                        </div>
                    </div>
                    
                </div>

                <div class="row" >
                    <div class="col-12 grid-margin">
                        <div class="card">
                            <div class="card-body">
                    <h4 class="card-title float-left">Schedules</h4>
                   <h4 class="float-right" style="cursor:pointer"><router-link style="color:#00B84A" to="/meeting-report">View All</router-link></h4>

                    <div class="table-responsive">
                      <table class="table">
                        <thead>
                          <tr>
                            <th>Thumbs</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <img src="../../assets/images/pishure.png" class="mr-2" alt="image"></td>
                            <td> David Grey</td>
                            <td>
                              <label class="badge badge-gradient-success">DONE</label>
                            </td>
                            <td> Dec 5, 2017 </td>
                          </tr>
                          <tr>
                            <td>
                              <img src="../../assets/images/pishure.png" class="mr-2" alt="image"> </td>
                            <td>Stella Johnson  </td>
                            <td>
                              <label class="badge badge-gradient-warning">PROGRESS</label>
                            </td>
                            <td> Dec 12, 2017 </td>
                          </tr>
                          <tr>
                            <td>
                              <img src="../../assets/images/pishure.png" class="mr-2" alt="image"></td>
                            <td>Marina Michel</td>
                            <td>
                              <label class="badge badge-gradient-info">ON HOLD</label>
                            </td>
                            <td> Dec 16, 2017 </td>
                          </tr>
                          <tr>
                            <td>
                              <img src="../../assets/images/pishure.png" class="mr-2" alt="image"></td>
                            <td>John Doe</td>
                            <td>
                              <label class="badge badge-gradient-danger">REJECTED</label>
                            </td>
                            <td> Dec 3, 2017 </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                        </div>
                    </div>
                </div>

                <!-- <div class="row" v-if="dashboardData.recent_wallet_transactions">
                    <div class="col-12 grid-margin">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title float-left">Recent Wallet Transactions</h4>
                                <h4 class="float-right">Wallet Balance: {{dashboardData.all_wallet_balance}}</h4>
                                <div class="table-responsive">
                                    <table class="table">
                                        <thead>
                                        <tr>
                                            <th>Reference</th>
                                            <th>Unit Worth</th>
                                            <th>Description</th>
                                            <th>User</th>
                                            <th>Type</th>
                                            <th>Created</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="wallet in dashboardData.recent_wallet_transactions" v-bind:key="wallet">
                                            <td>{{wallet.reference}}</td>
                                            <td>{{wallet.unit_worth}}</td>
                                            <td>{{wallet.description}}</td>
                                            <td>{{wallet.user}}</td>
                                            <td>
                                                <label class="badge badge-gradient-success" v-if="wallet.type === 'Credit'">
                                                    {{wallet.type}}
                                                </label>

                                                <label class="badge badge-gradient-danger" v-else-if="wallet.type === 'Debit'">
                                                    {{wallet.type}}
                                                </label>

                                            </td>
                                            <td>{{wallet.created_at}}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> -->
            </div>
            <!-- content-wrapper ends -->
            <!-- partial:partials/_footer.html -->
            <footer class="footer">
                <div class="d-sm-flex justify-content-center justify-content-sm-between">
                        <span class="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright © 2019 CIBN. All rights reserved.</span>
                    <span class="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">Hand-crafted & made with <i
                            class="mdi mdi-heart text-danger"></i></span>
                </div>
            </footer>
            <!-- partial -->
        </div>
        <!-- main-panel ends -->
    </Layout>
</template>

<script>
    import Layout from '../../components/Layout';
    import {dashboardService} from "../../services/Dashboard.Service";


    export default {
        name: "Dashboard",
        components: {Layout},
        data() {
            return {
                loading: true,
                dashboardData: ""
            }
        },
     
    }
</script>

<style scoped>
    .card .card-body {
        padding: 0.5rem 1.5rem;
   
}
    

    .card-body > h4 {
        padding-top: 15px;

    }
   
</style>