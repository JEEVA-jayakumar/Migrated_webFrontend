<template>
  <q-page>
    <div>
      <div class="col-md-9 col-sm-12 col-xs-12">
                <div v-if="RegionalInventoryQrCount.length > 0" class="row">
                  <q-card class="border-radius-10 q-pa-md q-ma-md" color="purple-9" height="35px" width="35px" v-for="menu in RegionalInventoryQrCount" :key="menu">
                    <div>
                      <big :style="'color'">{{ menu.label.requestCount == '' ? menu.label.requestCount = 0
                        :menu.label.requestCount
                      }} </big>
                    </div>
                    <div>
                      <label>
                       {{ menu.value }}
                      </label>
                    </div>
                  </q-card>
                </div>
                <div v-else class="row group">
                  <div>
                    <q-banner color="purple-9" icon="info">No data available to display</q-banner>
                  </div>
                </div>
              </div>
      <div>
        <q-tabs v-model="activeTab" class="shadow-1" color="grey-1" @select="goToCompleteTab">
          <q-tab default color="dark" name="tab-1" slot="title" label="Pending QR" />
          <q-tab color="dark" name="tab-2" slot="title" label="Approved QR" />
          <q-tab color="dark" name="tab-3" slot="title" label="Allocate To SO" />
          <q-tab-panel name="tab-1">
            <div class="row items-center">
            
              <div class="col-8"></div>
              <q-input class="col-4" clearable color="grey-9" placeholder="Type.." v-model="filter"
                float-label="Search By POD Number" />
            </div>
            <q-table table-class="customTableClass" class="q-py-none" :rows="tableData" :columns="columns"
              :filter="filter" :rows-per-page-options="[5, 10, 15]" :pagination="paginationControl"
              :loading="toggleAjaxLoadFilter" @request="ajaxLoadAllLeadInfo">
              <q-td v-slot:body-cell-updatedAt="props" :props="props">{{
                props.row == null ? "NA" : props.row.updatedAt |
              moment("Do MMM Y")
              }}</q-td>
              <q-td v-slot:body-cell-Action="props" :props="props">
                <q-btn dense no-caps no-wrap label="Approve" icon="edit" size="md" @click="ApproveIncomingData(props.row)"
                  flat class="text-primary">
                </q-btn>

              </q-td>
            </q-table>
          </q-tab-panel>
          <q-tab-panel name="tab-2">
            <div class="row">
              <div class="col-8"></div>
              <q-input class="col-4" v-model="filter1" clearable color="grey-9" placeholder="Type.."
                float-label="Search By POD Number" />
            </div>
            <q-table table-class="customTableClass" class="q-py-none" :rows="tableData1" :columns="columns2"
              :filter="filter1" :rows-per-page-options="[5, 10, 15]" :pagination="paginationControl1"
              :loading="toggleAjaxLoadFilter1" @request="ajaxLoadAllLeadInfo1">
              <q-td v-slot:body-cell-updatedAt="props" :props="props">{{
                props.row.updatedAt |
                moment("Do MMM Y")
              }}</q-td>
            </q-table>

          </q-tab-panel>
          <q-tab-panel name="tab-3">
            <div>
              <!-- <div class="col-md-9 col-sm-12 col-xs-12">
                <div v-if="this.formData.count != null" class="row">
                  <q-card class="border-radius-10 q-pa-md q-ma-md" color="purple-9" height="35px" width="35px">
                    <div>
                    </div>
                    <div>
                      <label></label>
                    </div>
                    <p>{{ "Available Count" }}</p>
                  </q-card>

                </div>
                <div v-else class="row group">
                  <div>
                    <q-banner color="purple-9" icon="info">No data available to display</q-banner>
                  </div>
                </div>
              </div> -->
              <!-- validation -->
              <div class="row">
                <article class="col-md-2 size7">
                  <strong>
                    Select Bank
                  </strong>
                </article>
                <div class="col-md-3">
                  <q-select clearable float-label="Select Bank"  v-model.trim="formData.id" :error="$v.formData.id.$error" 
                    color="grey-9" :options="bankListOptions" />
                </div>

              </div>

              <div class="col-md-9 col-sm-12 col-xs-12">
              </div>
              <div class="row">
                <div class="col-md-2 size7">
                  <strong>
                    <span>Select SO</span>
                  </strong>
                </div>
                <div class="col-md-3">
                  <q-select :disable="this.formData.id == ''" filter clearable float-label="Select SO" v-model="formData.soList" :error="$v.formData.soList.$error"  color="grey-9"
                    :options="SoListData" @request="regionBasedSoLoad" />
                </div>
              </div>
              <br />
            </div>
            
            <div class="row">
              <div class="col-md-2 size7">
                <strong>
                  <span>Enter no of QR </span>
                </strong>
              </div>
              <q-input type="number" min="1" :disable="this.formData.soList == ''" oninput="this.value = Math.abs(this.value)"  :error="$v.formData.count.$error"  float-label="Enter no of QR" v-model.trim="formData.count" color="grey-9" />
            </div>
            <br />
            <div class="row">
              <div class="col-md-2 size7">
                <strong>
                  <span>Enter POD</span>
                </strong>
              </div>
              <q-input disable float-label="Enter POD" :error="$v.formData.podNumber.$error" v-model.trim="formData.podNumber" color="grey-9" />
            </div>
            <br />
            <div class="row">
              <div class="col-md-6" align="right">
                <q-btn type="button" class="common-dark-blue" :disable="this.formData.count == ''" label="Assign" @click="fnAssignsubmit()" />
              </div>
            </div>
            &nbsp;
            <q-tabs v-model="tab" class="shadow-1" color="grey" @select="goToApproveTab">
              <q-tab default color="dark" name="tab-4" slot="title" label="Pending List" />
              <q-tab default color="dark" name="tab-5" slot="title" label="Approved List" />
              <q-tab default color="dark" name="tab-6" slot="title" label="Rejected List" />
              <q-tab-panel name="tab-4">
                <div class="row">
              <div class="col-8"></div>
              <q-input class="col-4" v-model="filter4" clearable color="grey-9" placeholder="Type.."
                float-label="Search By POD Number" />
            </div>
            <q-table table-class="customTableClass" class="q-py-none" :rows="tableData4" :columns="columns4"
              :filter="filter4" :rows-per-page-options="[5, 10, 15]" :pagination="paginationControl4"
              :loading="toggleAjaxLoadFilter4" @request="ajaxLoadAllLeadInfo4">
              <q-td v-slot:body-cell-createdAt="props" :props="props">{{
                props.row.createdAt |
                moment("Do MMM Y")
              }}</q-td>
            </q-table>
              </q-tab-panel>
              <q-tab-panel name="tab-5">
                <div class="row">
              <div class="col-8"></div>
              <q-input class="col-4" v-model="filter5" clearable color="grey-9" placeholder="Type.."
                float-label="Search By POD Number" />
            </div>
            <q-table table-class="customTableClass" class="q-py-none" :rows="tableData5" :columns="columns5"
              :filter="filter5" :rows-per-page-options="[5, 10, 15]" :pagination="paginationControl5"
              :loading="toggleAjaxLoadFilter5" @request="ajaxLoadAllLeadInfo5">
              <q-td v-slot:body-cell-createdAt="props" :props="props">{{
                props.row.createdAt |
                moment("Do MMM Y")
              }}</q-td>
            </q-table>
              </q-tab-panel>
              <q-tab-panel name="tab-6">
                <div class="row">
              <div class="col-8"></div>
              <q-input class="col-4" v-model="filter6" clearable color="grey-9" placeholder="Type.."
                float-label="Search By POD Number" />
            </div>
            <q-table table-class="customTableClass" class="q-py-none" :rows="tableData6" :columns="columns6"
              :filter="filter6" :rows-per-page-options="[5, 10, 15]" :pagination="paginationControl6"
              :loading="toggleAjaxLoadFilter6" @request="ajaxLoadAllLeadInfo6">
              <q-td v-slot:body-cell-createdAt="props" :props="props">{{
                props.row.createdAt |
                moment("Do MMM Y")
              }}</q-td>
            </q-table>
              </q-tab-panel>
            </q-tabs>
          </q-tab-panel>
        </q-tabs>
      </div>
      <div v-if="toggleAjaxLoadFilter || toggleAjaxLoadFilter1" class="fullscreen spinner-overlay">
        <q-spinner-bars class="absolute-center" style="color:#61116a" :size="35" />
      </div>
    </div>
    <staticQrRegionApprove v-if="staticQrRegionApproveModal" :propsApproveRegionModal="staticQrRegionApproveModal"
      :propsApproveRegion="Data" @closeModel="ApproveIncomingData">
    </staticQrRegionApprove>
  </q-page>
</template>
<script>

import { minValue, required,}from "@vuelidate/validators";
import { mapGetters, mapActions } from 'vuex'
import staticQrRegionApprove from '../../components/sat/staticQrRegionApprove.vue'
export default {
  name: 'staticQRinventory',
  components: {
    staticQrRegionApprove,
  },
  data() {
    return {
      propToggleRemarks: false,
      propToggleViewRemarks: false,
      staticQrRegionApproveModal: false,
      addBasicInformation: {
        remarks: null,
        action: 0
      },
      RegionalInventoryQrCount: [],
      bankListOptions: [],
      SoListData: [],
      toggleAjaxLoadFilter: false,
      toggleAjaxLoadFilter1: false,
      toggleAjaxLoadFilter4:false,
      toggleAjaxLoadFilter5:false,
      toggleAjaxLoadFilter6:false,
      activeItemId: 0,
      activeTab: 'tab-1',
      filter: '',
      filter1: '',
      filter4:'',
      filter5:'',
      filter6:'',
      Data: [],
      count: 0,
      value:null,
      paginationControl: {
        rowsNumber: 5,
        page: 1,
        sortBy: 'updatedAt',
        descending: false,
        rowsPerPage: 5
      },
      paginationControl1: {
        rowsNumber: 5,
        page: 1,
        sortBy: 'updatedAt',
        descending: false,
        rowsPerPage: 5
      },
      paginationControl4: {
        rowsNumber: 5,
        page: 1,
        sortBy: 'updatedAt',
        descending: false,
        rowsPerPage: 5
      },
      paginationControl5: {
        rowsNumber: 5,
        page: 1,
        sortBy: 'updatedAt',
        descending: false,
        rowsPerPage: 5
      },
      paginationControl6: {
        rowsNumber: 5,
        page: 1,
        sortBy: 'updatedAt',
        descending: false,
        rowsPerPage: 5
      },
      formData: {
        SoRegion:'',
       soList:'',
       id:'',
       count:'',
       podNumber:'',
       allocate_region:''
      },

      tableAjaxLoading: false,
      activeTab: 'tab-1',
      columns: [
        {
          name: 'updatedAt',
          required: true,
          label: 'Date',
          align: 'left',
          field: 'updatedAt',
          sortable: true
        },
        {
          name: 'qrBank',
          required: true,
          label: 'Bank Name',
          align: 'left',
          field: row => {
            return row.qrBank.name
          },
          sortable: false
        },
        {
          name: 'podNumber',
          required: true,
          label: 'Pod Number',
          align: 'left',
          field: row => {
            return row.podNumber
          },
          sortable: false
        },
        {
          name: 'requestCount',
          required: true,
          label: 'QR Count',
          align: 'left',
          field: row => {
            return row.requestCount
          },
          sortable: false
        },
        {
          name: 'Action',
          required: true,
          label: 'Action',
          align: 'left',
          sortable: false
        }

      ],
      columns2: [{
        name: 'updatedAt',
        required: true,
        label: 'Date',
        align: 'left',
        field: 'updatedAt',
        sortable: true
      },
      {
        name: 'qrBank',
        required: true,
        label: 'Bank Name',
        align: 'left',
        field: row => {
          return row.qrBank.name
        },
        sortable: false
      },
      {
        name: 'podNumber',
        required: true,
        label: 'Pod Number',
        align: 'left',
        field: row => {
          return row.podNumber
        },
        sortable: false
      },
      {
        name: 'requestCount',
        required: true,
        label: 'QR Count',
        align: 'left',
        field: row => {
          return row.requestCount
        },
        sortable: false
      }
      ],
      columns4: [{
        name: 'createdAt',
        required: true,
        label: 'Date',
        align: 'left',
        field: 'createdAt',
        sortable: true
      },
      {
        name: 'qrBank',
        required: true,
        label: 'Bank Name',
        align: 'left',
        field: row => {
          return row.qrBank.name
        },
        sortable: false
      },
      {
        name: 'podNumber',
        required: true,
        label: 'Pod Number',
        align: 'left',
        field: row => {
          return row.podNumber
        },
        sortable: false
      },
      {
        name: 'requestCount',
        required: true,
        label: 'QR Count',
        align: 'left',
        field: row => {
          return row.requestCount
        },
        sortable: false
      },
      {
        name: 'region',
        required: true,
        label: 'Region',
        align: 'left',
        field: row => {
          return row.region.regionAreaName
        },
        sortable: false
      },
      {
        name: 'so',
        required: true,
        label: 'SO Name',
        align: 'left',
        field: row => {
          return row.so == null ? "NA" :row.so.name+" | "+row.so.employeeID;
        },
        sortable: false
      }
      ],
      columns5: [{
        name: 'createdAt',
        required: true,
        label: 'Date',
        align: 'left',
        field: 'createdAt',
        sortable: true
      },
      {
        name: 'qrBank',
        required: true,
        label: 'Bank Name',
        align: 'left',
        field: row => {
          return row.qrBank.name
        },
        sortable: false
      },
      {
        name: 'podNumber',
        required: true,
        label: 'Pod Number',
        align: 'left',
        field: row => {
          return row.podNumber
        },
        sortable: false
      },
      {
        name: 'requestCount',
        required: true,
        label: 'QR Count',
        align: 'left',
        field: row => {
          return row.requestCount
        },
        sortable: false
      },
      {
        name: 'region',
        required: true,
        label: 'Region',
        align: 'left',
        field: row => {
          return row.region.regionAreaName
        },
        sortable: false
      },
      {
        name: 'so',
        required: true,
        label: 'SO Name',
        align: 'left',
        field: row => {
          return row.so == null ? "NA" :row.so.name+" | "+row.so.employeeID;
        },
        sortable: false
      }
      ],
      columns6: [{
        name: 'createdAt',
        required: true,
        label: 'Date',
        align: 'left',
        field: 'createdAt',
        sortable: true
      },
      {
        name: 'qrBank',
        required: true,
        label: 'Bank Name',
        align: 'left',
        field: row => {
          return row.qrBank.name
        },
        sortable: false
      },
      {
        name: 'podNumber',
        required: true,
        label: 'Pod Number',
        align: 'left',
        field: row => {
          return row.podNumber
        },
        sortable: false
      },
      {
        name: 'requestCount',
        required: true,
        label: 'QR Count',
        align: 'left',
        field: row => {
          return row.requestCount
        },
        sortable: false
      },
      {
        name: 'region',
        required: true,
        label: 'Region',
        align: 'left',
        field: row => {
          return row.region.regionAreaName
        },
        sortable: false
      },
      {
        name: 'so',
        required: true,
        label: 'SO Name',
        align: 'left',
        field: row => {
          return row.so == null ? "NA" :row.so.name+" | "+row.so.employeeID;
        },
        sortable: false
      }
      ],
      tableData: [],
      tableData1: [],
      filterRoles: [],
      error: true,
      warning: false
    }
  },

  computed: {
    ...mapGetters("InventoryCentral", [
      "getRegionBasedSO"
    ]),
    ...mapGetters('staticQrInventory', ['getpendingQrList','getRejectedQrListOfSo','getApprovedQrListOfSo','getpendingQrListOfSo', 'getApprovedQrList', 'getpendingQrList', 'getStaticQrReginolInventory'])
  },
  validations:{
 formData:{
  count:{
    required,
    minLength: minValue(1)
  },
  id:{
    required
  },
  soList:{
    required
  },
  podNumber:{
    required
  }
 }
},
  beforeMount() {
    // console.log("REGINOL INVENTORY", JSON.stringify(this.getStaticQrReginolInventory));
    // console.log("Test" + localStorage.getItem("aa_t"));
    this.podGeneration()
  },
  mounted() {
    this.ajaxLoadAllLeadInfo1({
      pagination: this.paginationControl1,
      filter: this.filter1
    })
 
  },
  created() {
    this.loadingData({
      pagination: this.paginationControl,
      filter: this.filter
    })
    this.ajaxLoadAllLeadInfo4({
      pagination: this.paginationControl4,
      filter: this.filter4
    })
    this.ajaxLoadAllLeadInfo5({
      pagination: this.paginationControl5,
      filter: this.filter5
    })
    this.ajaxLoadAllLeadInfo6({
      pagination: this.paginationControl6,
      filter: this.filter6
    })
    this.regionalInventoryCount()
    this.fnAjaxGetAllBankList()
    this.regionBasedSoLoad()
  },
  methods: {
    ...mapActions("InventoryCentral", [
      "FETCH_REGION_BASED_SO"
    ]),
    ...mapActions('staticQrInventory', ['FETCH_UNAPPROVED_QR_LIST','FETCH_UNAPPROVED_QR_LIST_OF_SO', 'FETCH_APPROVED_QR_LIST_OF_SO','FETCH_REJECTED_QR_LIST_OF_SO','FETCH_APPROVED_QR_LIST', 'FETCH_STATIC_QR_REGIONAL_INVENTORY_COUNT']),
    ...mapActions('generateQR', ['FETCH_BANK_LIST','ASSIGN_SO']), 
    fnAssignsubmit(){
      this.$v.formData.$touch()
      if(this.$v.formData.$error){
        this.$q.notify('Please review fields again.')
      }else{
     console.log("SO LIST",JSON.stringify(this.formData.soList));
     this.formData.allocate_region = JSON.parse(localStorage.getItem('u_i')).region
    let request = {
    staticQrBank: {
        id: this.formData.id
    },
    so: {
        id: this.formData.soList
    },
    region:{
        id: this.formData.allocate_region.id
    },
    requestedCount: this.formData.count,
    podNumber: this.formData.podNumber
    }
      this.$q.loading.show({
        delay: 0,
        spinnerColor: 'purple-9',
        message: 'Fetching data ..'
      })
      this.ASSIGN_SO(request).then(response => {
        this.$q.notify({
          color: 'positive',
          position: 'bottom',
          message: 'Successfully Assigned!',
          icon: 'thumb_up'
        })
        this.formData.id='',
        this.formData.soList='',
        this.formData.count='',
        this.formData.podNumber=''
        this.podGeneration(),
        this.ajaxLoadAllLeadInfo4({pagination: this.paginationControl4, filter: this.filter4})
    this.loadingData({pagination: this.paginationControl, filter: this.filter}),
    this.ajaxLoadAllLeadInfo5({pagination: this.paginationControl5, filter: this.filter5})
    this.$q.loading.hide()
      }).catch(() => {
        this.$q.notify({
          color: 'negative',
          position: 'bottom',
          message: 'No changes made!',
          icon: 'thumb_down'
        })
        this.$q.loading.hide()
      })
    }
  },
    ajaxLoadAllLeadInfo() {
      console.log('loading Data with out request')
      this.loadingData({
        pagination: this.paginationControl,
        filter: this.filter
      })
    },
    ajaxLoadAllLeadInfo(request) {
      console.log('loading Data with request : ', request)
      let req = {
        pagination: request.pagination,
        filter: request.filter
      }
      this.loadingData(req)
    },
    loadingData(request) {
      this.$q.loading.show({
        delay: 0,
        spinnerColor: 'purple-9',
        message: 'Fetching data ..'
      })
      this.FETCH_UNAPPROVED_QR_LIST(request)
        .then(response => {
          console.log('Req pagination : ---- :', JSON.stringify(response))
          this.paginationControl = request.pagination
          this.paginationControl.rowsNumber = this.getpendingQrList.totalElements
          this.paginationControl.page = this.getpendingQrList.number + 1
          this.tableData = this.getpendingQrList.content
          if (this.getpendingQrList.sort != null) {
            this.paginationControl.sortBy = this.getpendingQrList.sort[0].property
            this.paginationControl.descending = this.getpendingQrList.sort[0].ascending
          }
          this.$q.loading.hide()
        })
        .catch(() => {
          this.$q.loading.hide()
        })
    },

    goToCompleteTab(tab) {
      if (tab == 'tab-2') {
        this.ajaxLoadAllLeadInfo1({
          pagination: this.paginationControl1,
          filter: this.filter1
        })
        let request = {
          pagination: this.paginationControl1,
          filter: this.filter1
        }
        this.FETCH_APPROVED_QR_LIST(request)
          .then((response) => {
            this.toggleAjaxLoadFilter1 = false
          })
          .catch((error) => {
            this.toggleAjaxLoadFilter1 = false
          })
      } else {
        this.ajaxLoadAllLeadInfo({
          pagination: this.paginationControl,
          filter: this.filter
        })
      }
    },
    goToApproveTab(tab){
if(tab == 'tab-4'){
  this.ajaxLoadAllLeadInfo4({
          pagination: this.paginationControl4,
          filter: this.filter4
        })
}else if(tab == 'tab-5'){
  this.ajaxLoadAllLeadInfo5({
          pagination: this.paginationControl5,
          filter: this.filter5
        })
}else{
  this.ajaxLoadAllLeadInfo6({
          pagination: this.paginationControl6,
          filter: this.filter6
        })
}
    },
    ApproveIncomingData(rowData) {
      this.staticQrRegionApproveModal = !this.staticQrRegionApproveModal
      if (rowData != undefined) {
        this.Data = rowData
      }
      if (this.staticQrRegionApproveModal == false) {
        this.loadingData({
          pagination: this.paginationControl,
          filter: this.filter
        })
        this.regionalInventoryCount()
      }
    },
    ajaxLoadAllLeadInfo1() {
      this.toggleAjaxLoadFilter1 = true
      this.FETCH_APPROVED_QR_LIST()
        .then(response => {
          this.toggleAjaxLoadFilter1 = false
        })
        .catch(error => {
          this.toggleAjaxLoadFilter1 = false
        })
    },
    ajaxLoadAllLeadInfo1({ pagination, filter }) {
      this.$q.loading.show({
        delay: 0,
        spinnerColor: 'purple-9',
        message: 'Fetching data ..'
      })
      this.FETCH_APPROVED_QR_LIST({ pagination, filter })
        .then(res => {
          this.paginationControl1 = pagination
          this.paginationControl1.rowsNumber = this.getApprovedQrList.totalElements
          this.paginationControl1.page = this.getApprovedQrList.number + 1
          this.tableData1 = this.getApprovedQrList.content
          if (this.getApprovedQrList.sort != null) {
            this.paginationControl1.sortBy = this.getApprovedQrList.sort[0].property
            this.paginationControl1.descending = this.getApprovedQrList.sort[0].ascending
          }
          this.$q.loading.hide()
        })
        .catch(() => {
          this.$q.loading.hide()
        })
    },

//unApproved So List
ajaxLoadAllLeadInfo4({ pagination, filter }) {
      this.$q.loading.show({
        delay: 0,
        spinnerColor: 'purple-9',
        message: 'Fetching data ..'
      })
      this.FETCH_UNAPPROVED_QR_LIST_OF_SO({ pagination, filter })
        .then(res => {
          this.paginationControl4 = pagination
          this.paginationControl4.rowsNumber = this.getpendingQrListOfSo.totalElements
          this.paginationControl4.page = this.getpendingQrListOfSo.number + 1
          this.tableData4 = this.getpendingQrListOfSo.content
          if (this.getpendingQrListOfSo.sort != null) {
            this.getpendingQrListOfSo.sortBy = this.getpendingQrListOfSo.sort[0].property
            this.getpendingQrListOfSo.descending = this.getpendingQrListOfSo.sort[0].ascending
          }
          this.$q.loading.hide()
        })
        .catch(() => {
          this.$q.loading.hide()
        })
    },
//approved SO List
ajaxLoadAllLeadInfo5({ pagination, filter }) {
      this.$q.loading.show({
        delay: 0,
        spinnerColor: 'purple-9',
        message: 'Fetching data ..'
      })
      this.FETCH_APPROVED_QR_LIST_OF_SO({ pagination, filter })
        .then(res => {
          this.paginationControl5 = pagination
          this.paginationControl5.rowsNumber = this.getApprovedQrListOfSo.totalElements
          this.paginationControl5.page = this.getApprovedQrListOfSo.number + 1
          this.tableData5 = this.getApprovedQrListOfSo.content
          if (this.getApprovedQrListOfSo.sort != null) {
            this.getApprovedQrListOfSo.sortBy = this.getApprovedQrListOfSo.sort[0].property
            this.getApprovedQrListOfSo.descending = this.getApprovedQrListOfSo.sort[0].ascending
          }
          this.$q.loading.hide()
        })
        .catch(() => {
          this.$q.loading.hide()
        })
    },
    ajaxLoadAllLeadInfo6({ pagination, filter }) {
      this.$q.loading.show({
        delay: 0,
        spinnerColor: 'purple-9',
        message: 'Fetching data ..'
      })
      this.FETCH_REJECTED_QR_LIST_OF_SO({ pagination, filter })
        .then(res => {
          this.paginationControl6 = pagination
          this.paginationControl6.rowsNumber = this.getRejectedQrListOfSo.totalElements
          this.paginationControl6.page = this.getRejectedQrListOfSo.number + 1
          this.tableData6 = this.getRejectedQrListOfSo.content
          if (this.getRejectedQrListOfSo.sort != null) {
            this.getRejectedQrListOfSo.sortBy = this.getRejectedQrListOfSo.sort[0].property
            this.getRejectedQrListOfSo.descending = this.getRejectedQrListOfSo.sort[0].ascending
          }
          this.$q.loading.hide()
        })
        .catch(() => {
          this.$q.loading.hide()
        })
    },
    regionalInventoryCount() {
      let RegionCount=[]
      this.FETCH_STATIC_QR_REGIONAL_INVENTORY_COUNT()
        .then(response => {
          console.log("CHECK COUNT",JSON.stringify(response));
          response.map(function(value){
            RegionCount.push({
          label:value,    
          value:value.qrBank.name
         })
          })
         this.RegionalInventoryQrCount = RegionCount
         console.log("REGION COUNGT",JSON.stringify(this.RegionalInventoryQrCount));
         // this.RegionalInventoryQrCount = response
        })
        .catch(() => {
          this.$q.loading.hide()
        })
    },
    fnAjaxGetAllBankList() {
      this.FETCH_BANK_LIST()
        .then(response => {
          let assumeArr = []
          console.log("BANK LISt", JSON.stringify(response.data.data));
          response.data.data.map(function (value) {
            assumeArr.push({
              label: value.name,
              value: value.id
            })
          })

          this.bankListOptions = assumeArr
        })
        .catch(() => {
          this.bankListOptions = []
        })
    },

    regionBasedSoLoad() {
      let regionArea = JSON.parse(localStorage.getItem('u_i')).region.id
      console.log('REGION BASED SO DETAILS--------->', regionArea)
      // this.red
      this.FETCH_REGION_BASED_SO(regionArea).then(() => {
        let assumeArr = []
        this.getRegionBasedSO.map(function (value, index) {
          assumeArr.push({
            // label: value.name,
            //  value: value,
            //value: JSON.stringify(value)
            label: value.name+ " | " + value.employeeID+ " | " + value.email, value: value.id
          })
        })
        this.SoListData = assumeArr
        console.log('SO=====>>>>', JSON.stringify(this.SoListData))
      })
    },
    podGeneration(){
      const name = 'SO'
    const d = new Date()
    // console.log("DATE OF POD---------->",d)
    let number = d.getTime()
    // console.log("Number OF POD---------->",JSON.stringify(number))
    let finalValue = name.concat(number)
    // console.log("finalValue OF POD---------->",finalValue)
    this.formData.podNumber = finalValue
    }

  }
}
</script>
<style>
.customTabActive {
  background: purple;
  color: #fff;
}

.size7{
  margin-top: 20px;
}
</style>
