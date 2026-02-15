<template>
  <q-page>
    <!--START: content -->
    <div class="q-pa-md">
      <!-- START: Dashboard wrapper -->
      <div class="row gutter-x-xs">
        <div class="col-lg-8">
          <div class="row gutter-x-xs gutter-y-xs items-center justify-center">
            <div class="col-lg-4 col-md-6 col-sm-12">
              <div>
                <q-card class="border-radius-10 q-pa-md" color="purple-9">
                  <div class="row items-center justify-center">
                    <div class="col-lg-4 col-md-8 col-sm-12 items-center text-center">
                      <div class="text-h5 sm-text-caption text-center">{{ exceptionCount.totalExceptionCount }}</div>
                    </div>
                    <div class="col items-center text-center full-height gt-md">
                      <div style="border-left:1px solid #fff;height: 35px !important;"></div>
                    </div>
                    <div class="col-lg-7 col-md-8 col-sm-12 items-center">
                      <div class="lg-text-h6 sm-text-caption text-weight-light text-center">Exception</div>
                    </div>
                  </div>
                </q-card>
                <q-card class="q-py-md items-center">
                  <div class="row items-center text-center" style="min-height:75px">
                    <div class="col-md-4 q-my-xs">
                      <div class="text-caption text-grey-10">KYC Exception</div>
                      <q-chip class="cursor-pointer" @click="retrieveLeadsList(exceptionCount.kycPendingLeadIds)"
                        color="purple-9">{{ exceptionCount.kycPendingCount }}</q-chip>
                    </div>
                    <div class="col-md-4 q-my-xs">
                      <div class="text-caption text-grey-10">Bank Exception</div>
                      <q-chip class="cursor-pointer"
                        @click="retrieveLeadsList(exceptionCount.banksubventionPendingLeadIds)" color="purple-9">{{
                          exceptionCount.banksubventionPendingCount
                        }}</q-chip>
                    </div>
                    <div class="col-md-4 q-my-xs">
                      <div class="text-caption text-grey-10">Pricing Subvention</div>
                      <q-chip class="cursor-pointer" @click="retrieveLeadsList(exceptionCount.pricingPendingLeadIds)"
                        color="purple-9">{{ exceptionCount.pricingPendingCount }}</q-chip>
                    </div>
                  </div>
                </q-card>
              </div>
            </div>

            <div class="col-lg-4 col-md-6 col-sm-12">
              <div>
                <q-card class="border-radius-10 q-pa-md" color="purple-9">
                  <div class="row items-center justify-center">
                    <div class="col-lg-4 col-md-8 col-sm-12 items-center text-center">
                      <div class="text-h5 sm-text-caption text-center">{{ regionalInventoryCount.totalDevice }}</div>
                    </div>
                    <div class="col items-center text-center full-height gt-md">
                      <div style="border-left:1px solid #fff;height: 35px !important;"></div>
                    </div>
                    <div class="col-lg-7 col-md-8 col-sm-12 items-center">
                      <div class="lg-text-h6 sm-text-caption text-weight-light text-center">Stock Inventory (Bijlipay)
                      </div>
                    </div>
                  </div>
                </q-card>
                <q-card class="q-py-md items-center">
                  <div class="row items-center text-center" style="min-height:75px">
                    <div class="col-md-4 q-my-xs">
                      <div class="text-caption text-grey-10">Allocated Devices</div>
                      <q-chip class color="purple-9">{{ regionalInventoryCount.allocatedDeviceCount }}</q-chip>
                    </div>
                    <div class="col-md-4 q-my-xs">
                      <div class="text-caption text-grey-10">Pending Devices</div>
                      <q-chip class color="purple-9">{{ regionalInventoryCount.pendingDeviceCount }}</q-chip>
                    </div>
                    <div class="col-md-4 q-my-xs">
                      <div class="text-caption text-grey-10">Damaged Devices</div>
                      <q-chip class color="purple-9">{{ regionalInventoryCount.damagedDeviceCount }}</q-chip>
                    </div>
                  </div>
                </q-card>
              </div>
            </div>

            <div class="col-lg-4 col-md-6 col-sm-12">
              <div>
                <q-card class="border-radius-10 q-pa-md" color="purple-9">
                  <div class="row items-center justify-center">
                    <div class="col-lg-4 col-md-8 col-sm-12 items-center text-center">
                      <div class="text-h5 sm-text-caption text-center">{{ marsDeviceCount.totalMarsDeviceCount }}</div>
                    </div>
                    <div class="col items-center text-center full-height gt-md">
                      <div style="border-left:1px solid #fff;height: 35px !important;"></div>
                    </div>
                    <div class="col-lg-7 col-md-8 col-sm-12 items-center">
                      <div class="lg-text-h6 md-text-caption sm-text-caption text-weight-light text-center">Implementation
                      </div>
                    </div>
                  </div>
                </q-card>
                <q-card class="q-py-md items-center">
                  <div class="row items-center text-center" style="min-height:75px">
                    <div class="col-md-6 q-my-xs">
                      <div class="text-caption text-grey-10">Assigned/{{ marsDeviceCount.assignedDeviceCount }}</div>
                    </div>
                    <div class="col-md-6 q-my-xs">
                      <div class="text-caption text-negative">
                        <q-icon color="amber-9" name="fa fa-bell" />
                        Unassigned/{{ marsDeviceCount.unassignedDeviceCount }}
                      </div>
                    </div>
                  </div>
                </q-card>
              </div>
            </div>
          </div>
          <!-- <div class="row gutter-x-xs gutter-y-xs justify-center"> -->
         <!-- <div class="q-my-md q-px-md q-py-sm bg-grey-12 round-borders">
            <div>
              <q-card-section>
                <div class="col-lg-7 col-md-8 col-sm-12 items-center">
                  <div class="col-12 col-lg-9">
                    <div class="text-subtitle1 text-bold">Stock Inventory (Aggregator)</div>
                  </div>
                </div>
              </q-card-section>
               <div class="row gutter-x-xs gutter-y-xs items-center justify-center q-mt-md">
            <div class="col">
              <q-card class="border-radius-10 q-pa-md" color="purple-9">
                <div class="row items-center justify-center">
                  <div class="col-lg-4 col-md-8 col-sm-12 items-center text-center">
                    <div class="text-h5 sm-text-caption text-center">{{ aggregatorCount.totalDevice }}</div>
                  </div>
                  <div class="col items-center text-center full-height gt-md">
                    <div style="border-left:1px solid #fff;height: 35px !important;"></div>
                  </div>
                  <div class="col-lg-7 col-md-8 col-sm-12 items-center">
                    <div class="lg-text-h6 md-text-caption sm-text-caption text-weight-light text-center">Aggregators</div>
                  </div>
                </div>
              </q-card>
              <q-card class="q-py-md items-center">
                <div class="row items-center text-center" style="min-height:75px">
                  <div class="col-md-4 q-my-xs">
                    <div class="text-caption text-grey-10">Pending Device</div>

                    <q-chip class="cursor-pointer" color="purple-9">{{ aggregatorCount.pendingDeviceCount }}</q-chip>
                  </div>
                  <div class="col-md-4 q-my-xs">
                    <div class="text-caption text-grey-10">Allocated Device</div>
                    <q-chip class="cursor-pointer" color="purple-9">{{
                      aggregatorCount.allocatedDeviceCount
                    }}</q-chip>
                  </div>
                  <div class="col-md-4 q-my-xs">
                    <div class="text-caption text-grey-10">Damaged Device</div>
                    <q-chip class="cursor-pointer" color="purple-9">{{
                      aggregatorCount.damagedDeviceCount
                    }}</q-chip>
                  </div>
                </div>
              </q-card>
            </div>
            </div>
            </div>
          </div>-->
          <div class="row gutter-x-xs gutter-y-xs items-center justify-center q-mt-md">
            <div class="col">
              <q-card class="border-radius-10 q-pa-md" color="purple-9">
                <div class="row items-center justify-center">
                  <div class="col-lg-4 col-md-8 col-sm-12 items-center text-center">
                    <div class="text-h5 sm-text-caption text-center">{{ serviceRequestCount.total }}</div>
                  </div>
                  <div class="col items-center text-center full-height gt-md">
                    <div style="border-left:1px solid #fff;height: 35px !important;"></div>
                  </div>
                  <div class="col-lg-7 col-md-8 col-sm-12 items-center">
                    <div class="lg-text-h6 sm-text-caption text-weight-light text-center">Service Request</div>
                  </div>
                </div>
              </q-card>

              <!--  start service request counts-->
              <q-card class="row border-radius-10 q-pa-md">
                <div class="col-6 q-py-md items-center">
                  <div class="col border-radius-10 q-pa-md" align="left">
                    <div class="lg-text-h6 sm-text-caption text-weight-light text-center"><strong>Internal</strong></div>
                  </div>
                  <div class="row text-center justify-center" style="min-height:75px">
                    <div class="col-md-4 q-my-xs">
                      <div class="text-caption text-grey-10">closed</div>
                      <q-chip class color="purple-9">{{
                        serviceRequestCount.internal.closed == null ? 0
                          : serviceRequestCount.internal.closed
                      }}</q-chip>
                    </div>
                    <div class="col-md-4 q-my-xs">
                      <div class="text-caption text-grey-10">assigned</div>
                      <q-chip class color="purple-9">{{
                        serviceRequestCount.internal.assigned == null ? 0 :
                          serviceRequestCount.internal.assigned
                      }}</q-chip>
                    </div>
                    <div class="col-md-4 q-my-xs">
                      <div class="text-caption text-grey-10">unassigned</div>
                      <q-chip class color="purple-9">{{
                        serviceRequestCount.internal.unassigned == null ? 0 :
                          serviceRequestCount.internal.unassigned
                      }}</q-chip>
                    </div>
                    <div class="col-md-4 q-my-xs">
                      <div class="text-caption text-grey-10">Total</div>
                      <q-chip class color="purple-9">{{
                        serviceRequestCount.intTotal == null ? 0 :
                          serviceRequestCount.intTotal
                      }}</q-chip>
                    </div>
                    <div class="col-md-4 q-my-xs">
                      <div class="text-caption text-grey-10">ReOpenAssigned</div>
                      <q-chip class color="purple-9">{{
                        serviceRequestCount.internal.ReOpenAssigned == null ? 0 :
                          serviceRequestCount.internal.ReOpenAssigned
                      }}</q-chip>
                    </div>
                    <div class="col-md-4 q-my-xs">
                      <div class="text-caption text-grey-10">ReOpenedUnAssigned</div>
                      <q-chip class color="purple-9">{{
                        serviceRequestCount.internal.ReOpenedUnAssigned == null ? 0 :
                          serviceRequestCount.internal.ReOpenedUnAssigned
                      }}</q-chip>
                    </div>
                  </div>
                </div>
                <div class="col items-center text-center full-height gt-md">
                  <div style="border-left:1px solid rgb(209 209 209);height: 200px !important;"></div>
                </div>
                <div class="col-6 q-py-md items-center">
                  <div class="col border-radius-10 q-pa-md">
                    <div class="lg-text-h6 sm-text-caption text-weight-light text-center"><strong>External</strong></div>
                  </div>
                  <div class="row text-center justify-center" style="min-height:75px">
                    <div class="col-md-4 q-my-xs">
                      <div class="text-caption text-grey-10">closed</div>
                      <q-chip class color="purple-9">{{
                        serviceRequestCount.external.closed == null ? 0
                          : serviceRequestCount.external.closed
                      }}</q-chip>
                    </div>
                    <div class="col-md-4 q-my-xs">
                      <div class="text-caption text-grey-10">assigned</div>
                      <q-chip class color="purple-9">{{
                        serviceRequestCount.external.assigned == null ? 0 :
                          serviceRequestCount.external.assigned
                      }}</q-chip>
                    </div>
                    <div class="col-md-4 q-my-xs">
                      <div class="text-caption text-grey-10">unassigned</div>
                      <q-chip class color="purple-9">{{
                        serviceRequestCount.external.unassigned == null ? 0 :
                          serviceRequestCount.external.unassigned
                      }}</q-chip>
                    </div>
                    <div class="col-md-4 q-my-xs">
                      <div class="text-caption text-grey-10">Total</div>
                      <q-chip class color="purple-9">{{
                        serviceRequestCount.extTotal == null ? 0 :
                          serviceRequestCount.extTotal
                      }}</q-chip>
                    </div>
                    <div class="col-md-4 q-my-xs">
                      <div class="text-caption text-grey-10">ReOpenAssigned</div>
                      <q-chip class color="purple-9">{{
                        serviceRequestCount.external.ReOpenAssigned == null ? 0 :
                          serviceRequestCount.external.ReOpenAssigned
                      }}</q-chip>
                    </div>
                    <div class="col-md-4 q-my-xs">
                      <div class="text-caption text-grey-10">ReOpenedUnAssigned</div>
                      <q-chip class color="purple-9">{{
                        serviceRequestCount.external.ReOpenedUnAssigned == null ? 0 :
                          serviceRequestCount.external.ReOpenedUnAssigned
                      }}</q-chip>
                    </div>
                  </div>
                </div>
              </q-card>
            </div>

          </div>

          <div class="row gutter-x-xs">
            <div class="col-lg-12">
              <q-card class="q-my-md q-px-md q-py-sm bg-grey-12 round-borders">
                <q-card-section>
                  <div class="text-subtitle1 text-bold">Aging Tracker</div>
                </q-card-section>
                <chartSATagingTracker :options="{ responsive: false, maintainAspectRatio: false }" :height="150"
                  class="bg-white q-pa-md round-borders"></chartSATagingTracker>
              </q-card>
              <q-card class="q-my-md q-px-md q-py-sm bg-grey-12 round-borders">
                <q-card-section>
                  <div class="row items-center">
                    <div class="col-12 col-lg-9">
                      <div class="text-subtitle1 text-bold">Merchant Tracker</div>
                    </div>
                    <div class="col-12 col-lg-3">
                      <div class="text-subtitle1 text-bold">
                        <q-select inverted color="purple-9" :value="dateSelection" @change="changeMerchantTrackerData"
                          :options="[{ label: 'Days', value: 'DAYS' }, { label: 'Week', value: 'WEEK' }, { label: 'Month', value: 'MONTH' }, { label: 'Year', value: 'YEAR' }]" />
                      </div>
                    </div>
                  </div>
                </q-card-section>
                <chartMerchantTracker v-if="renderMerchantGraph" :borderWidth="1" :height="150"
                  :merchantTrackerData="getSatDashboardGraphData" class="bg-white q-pa-md round-borders">
                </chartMerchantTracker>
              </q-card>
            </div>
          </div>
        </div>

        <div class="col-lg-4">
          <div class="row gutter-x-xs gutter-y-xs items-center justify-center" style="min-height: 100px;">
            <div class="col-md-5 col-sm-12 col-xs-12 full-width">
              <q-card class="q-pa-sm full-height bg-orange border-radius-10 vertical-middle items-center" align="center"
                vertical>
                <q-card-section>
                  <div class="text-h6 text-white cursor-pointer"
                    @click="retrieveLeadsList(applicationPendingCount.totalApplicationPendingLeadIds)">
                    {{ applicationPendingCount.totalApplicationPendingCount }}</div>
                </q-card-section>
                <q-separator style="width:75px" class="bg-white" />
                <q-card-section class="q-pa-md">
                  <p class="md-text-subtitle1 sm-text-caption text-faded text-white" align="center">Application Pending</p>
                </q-card-section>
              </q-card>
            </div>
            <div class="col-md-7 col-sm-12 col-xs-12">
              <div class="row lg-inline gutter-xs">
                <div class="col-lg-6 col-sm-6 col-xs-6" style="height:50%">
                  <q-card class="q-pa-sm bg-negative border-radius-10" align="center">
                    <div class="row items-center justify-around q-pa-xs">
                      <div class="col-12">
                        <div class="md-text-subtitle1 sm-text-caption text-white">
                          <small>Fin rejects</small>
                        </div>
                      </div>
                      <div class="col-12">
                        <div class="text-body1 text-white cursor-pointer"
                          @click="retrieveLeadsList(applicationPendingCount.financeRejectLeadIds)">
                          {{ applicationPendingCount.financeRejectCount }}</div>
                      </div>
                    </div>
                  </q-card>
                </div>
                <div class="col-lg-6 col-sm-6 col-xs-6" style="height:50%">
                  <q-card class="q-pa-sm bg-amber-9 border-radius-10" align="center">
                    <div class="row items-center justify-around q-pa-xs">
                      <div class="col-12">
                        <div class="md-text-subtitle1 sm-text-caption text-white">
                          <small>Fin pending</small>
                        </div>
                      </div>
                      <div class="col-12">
                        <div class="text-body1 text-white cursor-pointer"
                          @click="retrieveLeadsList(applicationPendingCount.financePendingLeadIds)">
                          {{ applicationPendingCount.financePendingCount }}</div>
                      </div>
                    </div>
                  </q-card>
                </div>
                <div class="col-lg-4 col-sm-4 col-xs-4" style="height:50%">
                  <q-card class="q-pa-sm bg-blue-6 border-radius-10" align="center">
                    <div class="row items-center justify-around q-pa-xs">
                      <div class="col-12">
                        <div class="md-text-subtitle1 sm-text-caption text-white">
                          <small>WIP</small>
                        </div>
                      </div>
                      <div class="col-12">
                        <div class="text-body1 text-white cursor-pointer"
                          @click="retrieveLeadsList(applicationPendingCount.wipLeadIds)">
                          {{ applicationPendingCount.wipCount }}</div>
                      </div>
                    </div>
                  </q-card>
                </div>
                <div class="col-lg-4 col-sm-4 col-xs-4" style="height:50%">
                  <q-card class="q-pa-sm bg-positive border-radius-10" align="center">
                    <div class="row items-center justify-around q-pa-xs">
                      <div class="col-12">
                        <div class="md-text-subtitle1 sm-text-caption text-white">
                          <small>New</small>
                        </div>
                      </div>
                      <div class="col-12">
                        <div class="text-body1 text-white cursor-pointer"
                          @click="retrieveLeadsList(applicationPendingCount.withSatLeadIds)">
                          {{ applicationPendingCount.withSatCount }}</div>
                      </div>
                    </div>
                  </q-card>
                </div>
                <div class="col-lg-4 col-sm-4 col-xs-4" style="height:50%">
                  <q-card class="q-pa-sm bg-purple-9 border-radius-10" align="center">
                    <div class="row items-center justify-around q-pa-xs">
                      <div class="col-12">
                        <div class="md-text-subtitle1 sm-text-caption text-white">
                          <small>Ops</small>
                        </div>
                      </div>
                      <div class="col-12">
                        <div class="text-body1 text-white cursor-pointer"
                          @click="retrieveLeadsList(applicationPendingCount.withOPSLeadIds)">
                          {{ applicationPendingCount.withOPSHead }}</div>
                      </div>
                    </div>
                  </q-card>
                </div>
              </div>
            </div>
          </div>

          <div class="row gutter-x-xs gutter-y-xs q-my-xs items-center">
            <div class="col-md-12">
              <q-card square>
                <q-card-section>
                  Aging Tracker -
                  <span class="text-amber-9">Pending</span>
                </q-card-section>
                <q-card-section>
                  <div>
                    <q-table dense hide-bottom :rows="agingTrackerPendingTableData"
                      :columns="agingTrackerPendingColumns" :pagination="paginationControl" row-key="name">
                      <q-td v-slot:body-cell-name="props" :props="props">{{ props.row.name }}</q-td>
                      <q-td v-slot:body-cell-greaterThanOneDay="props" :props="props" class="cursor-pointer"
                        @click.native="retrieveLeadsList(props.row.greaterThanOneDayLeadIdList)">{{
                          props.row.greaterThanOneDay
                        }}</q-td>
                      <q-td v-slot:body-cell-greaterThanTwoDays="props" :props="props" class="cursor-pointer"
                        @click.native="retrieveLeadsList(props.row.greaterThanTwoDaysLeadIdList)">{{
                          props.row.greaterThanTwoDays
                        }}</q-td>
                      <q-td v-slot:body-cell-greaterThanFiveDays="props" :props="props"
                        class="cursor-pointer"
                        @click.native="retrieveLeadsList(props.row.greaterThanFiveDaysLeadIdList)">{{
                          props.row.greaterThanFiveDays
                        }}</q-td>
                    </q-table>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
      </div>
      <!-- END: Dashboard wrapper -->
      <!-- //Common lead information in popup -->
      <leadList v-if="dashboardAgingTrackerLeads" :propLeadInformation="rowDetails"
        :propToggleModal="dashboardAgingTrackerLeads" @closeLeadsList="retrieveLeadsList" />
    </div>
  </q-page>
  <!--END: content -->
</template>

<script>
import { required } from '@vuelidate/validators';
import { mapGetters, mapActions } from "vuex";
import chartDailyVolume from "../../components/sat/chartDailyVolume.js";
import chartMerchantTracker from "../../components/sat/chartMerchantTracker.js";
import chartSATagingTracker from "../../components/sat/chartSATagingTracker.js";
import leadList from "../../components/sat/leadList.vue";

export default {
  name: "dashoboard",
  components: {
    leadList,
    chartDailyVolume,
    chartSATagingTracker,
    chartMerchantTracker
  },
  data() {
    return {
      dateSelection: "DAYS",
      renderMerchantGraph: true,
      dashboardAgingTrackerLeads: false,
      rowDetails: {},
      paginationControl: {
        rowsPerPage: 10
      },
      flag: false,
      aggregator: "",
      // aggregatorOptions: [],
      exceptionCount: {
        banksubventionPendingCount: 0,
        kycPendingCount: 0,
        pricingPendingCount: 0,
        totalExceptionCount: 0
      },
      aggregatorCount: {
        totalDevice: 0,
        damagedDeviceCount: 0,
        pendingDeviceCount: 0,
        allocatedDeviceCount: 0
      },
      marsDeviceCount: {
        assignedDeviceCount: 0,
        totalMarsDeviceCount: 0,
        unassignedDeviceCount: 0
      },
      regionalInventoryCount: {
        allocatedDeviceCount: 0,
        damagedDeviceCount: 0,
        pendingDeviceCount: 0,
        totalDevice: 0
      },
      serviceRequestCount: {
        external: {
          closed: 0,
          assigned: 0,
          unassigned: 0
        },
        internal: {
          closed: 0,
          assigned: 0,
          unassigned: 0
        },
        total: 0,
        intTotal: 0,
        extTotal: 0
      },
      applicationPendingCount: {
        financePendingCount: 0,
        financeRejectCount: 0,
        wipCount: 0,
        withOPSHead: 0
      },
      agingTrackerPendingColumns: [
        {
          name: "name",
          required: false,
          label: "Stage",
          align: "left",
          field: "name",
          sortable: false
        },
        {
          name: "greaterThanOneDay",
          required: false,
          label: ">1",
          align: "left",
          field: "greaterThanOneDay",
          sortable: true
        },
        {
          name: "greaterThanTwoDays",
          required: false,
          label: ">2",
          align: "left",
          field: "greaterThanTwoDays",
          sortable: true
        },
        {
          name: "greaterThanFiveDays",
          required: false,
          label: ">5",
          align: "left",
          field: "greaterThanFiveDays",
          sortable: true
        }
      ],
      agingTrackerPendingTableData: []
    };
  },
  created() {
    this.fetchCountInformation();
    // this.fetchAggregatorList();
    this.fetchServiceRequestCounts();
    this.changeMerchantTrackerData("DAYS");
    this.fetchAggregatorsCountInformation();
  },
  computed: {
    ...mapGetters("SAT_Dashboard", [
      "getSatDashboard", "getAggregatorsSatDashboard",
      "getSatAgingTrackerdata",
      "getSatDashboardGraphData"
    ]),
    ...mapGetters("superAdminAggregators", ["getCreatedAggregatorList", "getActiveCreatedAggregatorList"]),
    ...mapGetters("serviceRequestSat", ["getserviceRequestCountDatas"]),
    ...mapGetters("serviceRequestPhonepeSat", ["getserviceRequestPhonepeCountDatas"]),
  },
  methods: {
    ...mapActions("SAT_Dashboard", [
      "FETCH_DASHBOARD_CHART_DATA",
      "FETCH_DASHBOARD_COUNT", "FETCH_AGGREGATORS_DASHBOARD_COUNT",
      "FETCH_SAT_AGING_TRACKER_DATA"
    ]),
    ...mapActions("superAdminAggregators", ["GET_CREATED_AGGREGATORS_LIST", "GET_ACTIVE_CREATED_AGGREGATORS_LIST"]),
    ...mapActions("serviceRequestSat", ["FETCH_SERVICE_REQUEST_COUNT_DETAILS"]),
    ...mapActions("serviceRequestPhonepeSat", ["FETCH_PHONEPE_SERVICE_REQUEST_COUNT_DETAILS"]),

    // fnclick(val){
    //   console.log("fnclick ------->",JSON.stringify(val));
    // },
    fetchCountInformation() {
      this.$q.loading.show({
        delay: 100, // ms
        spinnerColor: "purple-9",
        message: "Fetching data .."
      });
      this.FETCH_DASHBOARD_COUNT(
        JSON.parse(localStorage.getItem("u_i")).region.id
      )
        .then(() => {
          this.applicationPendingCount = this.getSatDashboard.applicationPendingCount;
          this.exceptionCount = this.getSatDashboard.exceptionCount;
          this.marsDeviceCount = this.getSatDashboard.marsDeviceCount;
          this.regionalInventoryCount = this.getSatDashboard.regionalInventoryCount;
          this.FETCH_SAT_AGING_TRACKER_DATA(
            JSON.parse(localStorage.getItem("u_i")).region.id
          ).then(() => {
            this.agingTrackerPendingTableData = this.getSatAgingTrackerdata;
          });
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },
    fetchAggregatorsCountInformation() {
      this.$q.loading.show({
        delay: 100, // ms
        spinnerColor: "purple-9",
        message: "Fetching data .."
      });
      let param = {
        region: JSON.parse(localStorage.getItem("u_i")).region.id
      };
      this.FETCH_AGGREGATORS_DASHBOARD_COUNT(param)
        .then(() => {
          console.log("getAggregatorsSatDashboard ------->", JSON.stringify(this.getAggregatorsSatDashboard));
          this.aggregatorCount = this.getAggregatorsSatDashboard.regionalInventoryCount;
          // this.applicationPendingCount = this.getSatDashboard.applicationPendingCount;
          // this.exceptionCount = this.getSatDashboard.exceptionCount;
          // this.marsDeviceCount = this.getSatDashboard.marsDeviceCount;
          // this.regionalInventoryCount = this.getSatDashboard.regionalInventoryCount;
          // this.FETCH_SAT_AGING_TRACKER_DATA(
          //   JSON.parse(localStorage.getItem("u_i")).region.id
          // ).then(() => {
          //   this.agingTrackerPendingTableData = this.getSatAgingTrackerdata;
          // });
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },
    // selectedAggregators(val) {
    //   this.flag = true;
    //   this.fetchAggregatorsCountInformation(val);
    // },
    // fetchAggregatorList() {
    //   let self = this;
    //   let cookedArr = [];
    //   self.GET_ACTIVE_CREATED_AGGREGATORS_LIST()
    //     .then(() => {
    //       return _.map(self.getActiveCreatedAggregatorList, (item) => {
    //         console.log("ITEM -------->", item)
    //         cookedArr.push({
    //           value: item,
    //           label: item.name
    //         });
    //         console.log("cookedArr -------->", cookedArr)
    //         self.aggregatorOptions = cookedArr;
    //         // this.flag = true;
    //       });

    //     })
    // },
    fetchServiceRequestCounts() {
      this.$q.loading.show({
        delay: 100, // ms
        spinnerColor: "purple-9",
        message: "Fetching data .."
      });
      this.FETCH_SERVICE_REQUEST_COUNT_DETAILS()
        .then(() => {
          console.log("SERVICE REQUEST COUNT------>", JSON.stringify(this.getserviceRequestCountDatas))
          this.serviceRequestCount = this.getserviceRequestCountDatas;
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
      this.FETCH_PHONEPE_SERVICE_REQUEST_COUNT_DETAILS()
        .then(() => {
          console.log("PHONEPE SERVICE REQUEST COUNT------>", JSON.stringify(this.getserviceRequestPhonepeCountDatas))
          this.serviceRequestCount = this.getserviceRequestPhonepeCountDatas;
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },
    changeMerchantTrackerData(value) {
      this.renderMerchantGraph = false;
      this.$q.loading.show({
        delay: 100, // ms
        spinnerColor: "purple-9",
        message: "Fetching data .."
      });
      this.dateSelection = value;
      this.FETCH_DASHBOARD_CHART_DATA({
        region: JSON.parse(localStorage.getItem("u_i")).region.id,
        action: value
      })
        .then(() => {
          this.renderMerchantGraph = true;
          this.$q.loading.hide();
        })
        .catch(() => {
          this.renderMerchantGraph = false;
          this.$q.loading.hide();
        });
    },
    retrieveLeadsList(props) {
      this.dashboardAgingTrackerLeads = !this.dashboardAgingTrackerLeads;
      if (props != undefined) {
        if (props.length > 0) {
          this.rowDetails = props;
        } else {
          this.$q.notify({
            color: "amber-9",
            position: "bottom",
            message: "Oops, no lead available to display",
            icon: "info"
          });
        }
      }
    }
  }
};
</script>

<style scoped>
.border-radius-10 {
  border-radius: 8px !important;
}

.q-item-main.q-item-section.shadow-1.q-pa-md {
  min-height: 80px;
}

.q-chip.row.no-wrap.inline.items-center.custom_chip_progress.bg-purple-9.text-white {
  height: 35px;
  background: #fff !important;
  color: #333 !important;
  border: 3px solid #691b9a;
  border-radius: 30px;
  width: 35px;
  text-align: center;
  margin: 2px;
}

.customTabActive {
  background: #212c3f;
  color: #fff;
}
</style>
