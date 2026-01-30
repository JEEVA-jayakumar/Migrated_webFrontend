<template>
  <q-page>
    <!-- content -->
    <div class="row bottom-border q-px-md q-py-md items-center">
    <q-radio class="radio" v-for="(item, index) in formData.flagOptions" :key="index" color="grey-9" v-model.trim="formData.flag"
          :val="item.value" :label="item.label" />
          </div>
          <div>
    <div  v-if="formData.flag == 1">
      <div class="row bottom-border q-px-md q-py-md items-center">
        <!--START: table title -->
        <div class="col-6 col-sm-4 col-md-8 q-title text-weight-regular text-grey-9">Bijlipay Allocate Device</div>
         <div class="col-md-12 col-md-6 q-pt-md group" align="right">
          <q-btn
            @click="$router.push('/inventory/central')"
            outline
            label="Cancel Allocation"
            color="negative"
          />
        </div>
        <!--END: table title -->
      </div>
      <div
        class="row bottom-border group q-px-md q-py-md items-center text-weight-regular text-grey-9"
      >
        <div class="col-md-4">
          <q-select
            :disabled="formData.device_type != ''"
            :class="[formData.device_type != '' ? 'no-pointer-events' : '']"
            v-model="formData.region"
            float-label="Select Region"
            radio
            color="grey-9"
            :options="regionOptions"
          />
          
        </div>
        <div class="col-md-4">
          <q-select
            clearable
            :disable="formData.region == ''"
            @clear="fnClearingDeviceTypeSelection"
            @input="fnSetDevicesByDeviceId"
            v-model="formData.device_type"
            float-label="Select Device Type"
            radio
            color="grey-9"
            :options="deviceOptions"
          />
        </div>
         <!-- <div class="col-md-12 col-md-6 q-pt-md group" align="right">
            <q-btn icon="red" outline label="Cancel" @click="emitToggleCheque" />
            <q-btn
              
              class="common-btn"
              label="Submit"
              @click="fnSubmitAllocateResellar"
            />
          </div> -->

          <!-- <div class="col">
          
             <q-btn
                        icon="check"
                        class="common-btn"
                        label="Submit"
                        @click="fnSubmitAllocateRegion"
             />

           </div> -->
        <div class="col-12 col-lg-4 group" align="right">
          <q-btn
            :disabled="formData.device_type == '' || formData.region == ''"
            @click="openScannerComp"
            v-if="scannerToggleOption"
            color="light-blue"
            class="q-py-xs"
            label="Start scan"
          />
          <q-btn
            icon="shopping_cart"
            outline
            class="q-py-xs"
            label="Add to cart"
            @click="fnAllocateDeviceToRegion"
          />
        </div>
        <!--END: table title -->
      </div>

      <div class="row text-weight-regular text-grey-9">
        <div class="col group" v-for="(item,index) in formData.scannedItems" :key="index">
          <q-card
            class="shadow-4"
            :style="'border:'+[formData.device_type.id == item.device.id?'2px solid #61116a':'unset']"
          >
            <q-list
              highlight
              separator
              class="q-pa-none"
              :class="[formData.device_type.id == item.device.id?'activeDeviceTab':'']"
            >
              <q-list-header style="border-bottom: 1px solid #ccc;">
                <q-icon
                  :style="'color:'[formData.device_type.id == item.device.id?'#fff':'#202c3f']"
                  name="fas fa-tablet-alt"
                />
                {{item.device.deviceName}}
              </q-list-header>
              <q-scroll-area
                style="height:400px"
                :thumb-style="{
                    right: '4px',
                    borderRadius: '5px',
                    background: 'grey',
                    width: '5px',
                    opacity: 0.5
                  }"
                :delay="1500"
              >
                <div v-if="item.deviceSerialNumbers.length > 0">
                  <q-item
                    separator
                    class="text-light-blue"
                    v-for="(subItem,subIndex) in item.deviceSerialNumbers"
                    :key="subIndex"
                  >
                    <q-item-main class="q-body-1">{{subItem}}</q-item-main>
                    <q-item-side>
                      <q-btn
                        round
                        size="sm"
                        color="negative"
                        icon="clear"
                        @click="fnRemoveScannedItems(index,subIndex)"
                      />
                    </q-item-side>
                  </q-item>
                </div>
                <div v-else>
                  <q-item>
                    <q-item-main class="q-body-1">No data to display</q-item-main>
                    <q-item-side>
                      <q-btn
                        round
                        size="sm"
                        color="negative"
                        @click="fnRemoveDeviceTypeFromList(index)"
                        icon="clear"
                      />
                    </q-item-side>
                  </q-item>
                </div>
              </q-scroll-area>
            </q-list>
          </q-card>
        </div>
      </div>
    </div>
    <div v-if="formData.flag == 2">
      
          <div class="col-md-3">
            <div  class="col-md-9 col-sm-12 col-xs-12">
              <div class="row bottom-border q-px-md q-py-md items-center">
              <div class="col-6 col-sm-4 col-md-8 q-title text-weight-regular text-grey-9 align1"
              >Bijlipay Allocate QR</div>
            </div>
              <div v-if="this.formData.count != null" class="row">
                <q-card class="card" align="center" color="purple-9"  >
                  <div>
                    <big class="alignbtn"  :style="'color'">{{ this.remainingCount == '' ? this.remainingCount = 0 : this.remainingCount
                    }} </big>
                  </div>
                  <div>
                    <label></label>
                  </div> 
                  <p>{{ this.label }}</p>
                </q-card>

              </div>
              <div v-else class="row group">
                <div>
                  <q-alert color="purple-9" icon="info">No data available to display</q-alert>
                </div>
              </div>
            </div>
           
            <div class="row">
              <label class="qrlabel"><b>Select Bank</b></label>
              <div class="col-md-3">
                <q-select class="sizeBank" clearable float-label="Select Bank"  @input="showChannel($event)" v-model.trim="formData.bank" :error="$v.formData.bank.$error" 
                  color="grey-9" :options="bankListOptions" />
              </div>
            </div>
            <div class="col-md-9 col-sm-12 col-xs-12">
            </div>
            <div class="row">
              <label class="qrlabel" ><b>Select Region</b></label>
              <div class="col-md-3">
                <q-select class="sizeRegion" clearable :disable="this.formData.bank == ''" float-label="Select Region" v-model.trim="formData.regionList" :error="$v.formData.regionList.$error" color="grey-9"
                  :options="RegionOptionIcici" />
              </div>
            </div>
        
          </div>
          <div class="row">
            <label class="qrlabel" for="input-id"><b>Enter No Of QR</b></label>
            <q-input class="sizeQR" type="number" :disable="this.formData.regionList == ''" float-label="Enter no of QR" min="1" oninput="this.value = Math.abs(this.value)"  v-model.trim="formData.count" :error="$v.formData.count.$error"  @blur="$v.formData.count.$touch" color="grey-9" />
          </div>
          <br />
          <div class="row">
            <label class="qrlabel" for="input-id"><b>Enter POD</b></label>
            <q-input class="alignPOD" disable float-label="Enter POD" v-model.trim="formData.podNumber" :error="$v.formData.podNumber.$error"  @blur="$v.formData.podNumber.$touch"  color="grey-9" />
          </div>
          <br />
          <div class="row">
            <div class="col-md-6" align="right">
              <q-btn color="purple-9" :disable="this.formData.count == ''" label="Assign" @click="fnAssignsubmit()" />
            </div>
          </div>
          &nbsp;&nbsp;&nbsp;
          <div class="col-4">
            <q-tabs v-model="activeTab" class="shadow-1" color="grey-1">
              <q-tab color="dark" name="tab-1" slot="title" label="Pending QR" />
              <q-tab color="dark" name="tab-2" slot="title" label="Approved QR" />
              <q-tab-pane name="tab-1">
                <div>
                  <q-search class="col-5 search" clearable color="grey-9" placeholder="Type.." v-model="filter"
                    float-label="Search By POD Number" />
                </div>
                <q-table table-class="customTableClass" :data="tableData" :columns="columns"
                  :pagination.sync="paginationControl2" :filter="filter" row-key="id" :loading="toggleAjaxLoadFilter1"
                  :row-per-page-options="[5, 10, 15, 20]" @request="ajaxLoadAllRegionList">
                  <q-td slot="body-cell-createdAt" slot-scope="props" :props="props">{{
                    props.row.createdAt == null ? 'NA' :
                    props.row.createdAt | moment("Do MMM Y")
                  }}</q-td>
                  <q-td slot="body-cell-podNumber" slot-scope="props" :props="props">{{
                    props.row.podNumber == null ? 'NA' :
                    props.row.podNumber
                  }}</q-td>
                  <q-td slot="body-cell-count" slot-scope="props" :props="props">{{
                    props.row.requestCount == null ? 'NA' :
                    props.row.requestCount
                  }}</q-td>
                  <q-td slot="body-cell-region" slot-scope="props" :props="props">{{
                    props.row.region.regionAreaName == null ? 'NA' :
                    props.row.region.regionAreaName
                  }}</q-td>
                  <q-td slot="body-cell-batchId" slot-scope="props" :props="props">{{
                    props.row.batch.batchId == null ? 'NA' :
                    props.row.batch.batchId
                  }}</q-td>
                  <q-td slot="body-cell-Action" slot-scope="props" :props="props">
                    <q-btn no-caps icon="edit" color="primary" @click="editCount(props.row)" size="xs" round>
                    </q-btn>
                  </q-td>
                  <q-td slot="body-cell-Action2" slot-scope="props" :props="props">
                    <div v-if="props.row.updated == true">
                      <q-btn no-caps icon="priority_high" color="orange" size="xs" round>
                      </q-btn>
                    </div>
                  </q-td>
                </q-table>
              </q-tab-pane>
              <q-tab-pane name="tab-2">
                <q-search class="col-5 search" clearable color="grey-9" placeholder="Type.." v-model="filter1"
                  float-label="Search By POD Number" />
                <q-table table-class="customTableClass" :data="tableData1" :columns="columns1"
                  :pagination.sync="paginationControl1" :filter="filter1" row-key="id" :loading="toggleAjaxLoadFilter1"
                  :row-per-page-options="[5, 10, 15, 20]" @request="ajaxLoadAllRegionList1">
                  <q-td slot="body-cell-podNumber" slot-scope="props" :props="props">{{
                    props.row.podNumber == null ? 'NA' :
                    props.row.podNumber
                  }}</q-td>
                  <q-td slot="body-cell-count" slot-scope="props" :props="props">{{
                    props.row.requestCount == null ? 'NA' :
                    props.row.requestCount
                  }}</q-td>
                  <q-td slot="body-cell-region" slot-scope="props" :props="props">{{
                    props.row.region.regionAreaName == null ? 'NA' :
                    props.row.region.regionAreaName
                  }}</q-td>
                  <q-td slot="body-cell-batchId" slot-scope="props" :props="props">{{
                    props.row.batch.batchId == null ? 'NA' :
                    props.row.batch.batchId
                  }}</q-td>
                </q-table>
              </q-tab-pane>
            </q-tabs>

          </div>
        </div>
      <!--START: Open showPDOmodal model -->
      <showPDOmodal
        v-if="showPDOmodal"
        :propshowPDOmodal="showPDOmodal"
        :propAllScannedItemArr="formData"
        @closeModel="fnAllocateDeviceToRegion"
      ></showPDOmodal>
      <editCountModal v-if="editCountModal" :propseditCountModal="editCountModal" :propsAllPendingQrItem="Data"
      @closeModel="editCount">
    </editCountModal>
      <!--END: Open showPDOmodal model -->
    </div>
  </q-page>
</template>

<script>
import { minValue, required,}from "vuelidate/lib/validators";
import Vue from "vue";
import VueBarcodeScanner from "vue-barcode-scanner";
Vue.use(VueBarcodeScanner);
import { mapGetters, mapActions } from "vuex";
import showPDOmodal from "../../components/inventory/showPDOmodal.vue";
import editCountModal from '../../components/inventory/editCountModal.vue'
export default {
  name: "allocateDevice",
  components: {
    showPDOmodal,
    editCountModal
  },
  data() {
    return {
      label: '',
      batchList: [],
      RegionOptionIcici: [],
      inventoryQrCount: [],
      remainingCount: [],
      bankListOptions: [],
      filterSearch: "",
      scannerToggleOption: true,
      showPDOmodal: false,
      editCountModal: false,
      tableData: [],
      tableData1: [],
      regionOptions: [],
      deviceOptions: [],

      tempTableData: [],
      filter: '',
      filter1: '',
      formData: {
        region: "",
        device_type: "",
        count:"",
        Batch: '',
        podNumber: '',
        regionList: '',
        bank:'',
        scannedItems: [],
        flagOptions: [
          {
            label: 'Device',
            value: 1
          },
          {
            label: 'QR',
            value: 2
          }

        ]
      },
      paginationControl2: {
        rowsNumber: 5,
        page: 1,
        sortBy: 'podNumber',
        descending: false,
        rowsPerPage: 5
      },
      paginationControl1: {
        rowsNumber: 5,
        page: 1,
        sortBy: 'podNumber',
        descending: false,
        rowsPerPage: 5
      },
      paginationControl: {
        rowsPerPage: 10
      },
      tableAjaxLoading: false,
      columns: [
        {
          name: 'createdAt',
          required: true,
          label: 'createdAt',
          align: 'left',
          field: 'createdAt',
          sortable: true
        },
        {
          name: 'podNumber',
          required: true,
          label: 'Pod Number',
          align: 'left',
          field: 'podNumber',
          sortable: true
        },
        {
          name: 'count',
          required: true,
          label: 'Assigned Count',
          align: 'left',
          field: 'count',
          sortable: false
        },
        {
          name: 'receivedCount',
          required: true,
          label: 'Recieved Count',
          align: 'left',
          field: row => {
            return row.receivedCount == 0 ? "Not Yet Recived" : row.receivedCount
          },
          sortable: false
        },
        {
          name: 'region',
          required: true,
          label: 'Region',
          align: 'left',
          field: 'region',
          sortable: false
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
          name: 'Action',
          required: true,
          label: 'Action',
          align: 'left',
          sortable: false
        },
        {
          name: 'Action2',
          required: true,
          label: 'Updated',
          align: 'left',
          sortable: false
        }

      ],
      columns1: [
        {
          name: 'podNumber',
          required: true,
          label: 'Pod Number',
          align: 'left',
          field: 'podNumber',
          sortable: true
        },
        {
          name: 'count',
          required: true,
          label: 'Count',
          align: 'left',
          field: 'count',
          sortable: false
        },
        {
          name: 'region',
          required: true,
          label: 'Region',
          align: 'left',
          field: 'region',
          sortable: false
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

      ]
    };
  },

  computed: {
    // ...mapGetters("InventoryScanAddDevice", ["getAddDeviceScannedItems"]),
    ...mapGetters("InventoryCentral", [
      "getAllInventoryDevicesTypesData",
      "getAllRegionsData","getAllBatchForm"
    ]),
    ...mapGetters('generateQR'['getAllRegionList', 'getAllBankList', 'getAllRegionBasedQrAllocatedApproveList', 'getAllActiveBatchList', 'getAllRegionBasedQrAllocatedList']),
    ...mapGetters('iciciStaticQr'['getStaicQrInventoryCount'])
  },
  validations:{ 
   formData:{
    bank:{
    required
  },
  regionList:{
    required
  },
  count:{
    required,
    minLength: minValue(1)
  },
  podNumber:{
    required
  }
 }
},
  created() {
    this.fnAjaxGetAllDevicesTypesData();
    this.fnAjaxGetAllRegionsData();
    this.fnAjaxGetAllBankList()
    this.fnAjaxGetAllRegionList()
    this.inventoryCount()
  },
  destroyed() {
    // Remove listener when component is destroyed
    this.$barcodeScanner.destroy();
  },
  beforeMount() {
    console.log("INVENTORY_COUNT", JSON.stringify(this.getStaicQrInventoryCount));
    this.podGeneration()
  },
  mounted() {
    this.ajaxLoadAllRegionList({
      pagination: this.paginationControl2,
      filter: this.filter
    })
    this.ajaxLoadAllRegionList1({
      pagination: this.paginationControl1,
      filter: this.filter1
    })
  },
  methods: {
    // ...mapActions("SatDeviceTrackerScanner", ["REACTIVE_SCANNED_DEVICE_DATA"]),
    ...mapActions("commonLoader", ["TOGGLE_COMMON_LOADER"]),
    ...mapActions("InventoryCentral", [
      "FETCH_ALL_INVENTORY_DEVICES_TYPES_DATA",
      "FETCH_ALL_REGIONS_DATA"
      
    ]),
    ...mapActions("VerifyDevice", [
      "DEVICE_VERIFICATION_ON_SCAN_USING_DEVICE_TYPE_ID_ALLOCATION"
    ]),
    ...mapActions('generateQR', ['FETCH_BANK_LIST', 'FETCH_REGION_BASED_QR_ALLOCATED_APPROVED_LIST', 'FETCH_REGION_LIST', 'ASSIGN_REGION', 'FETCH_REGION_BASED_QR_ALLOCATED_LIST']),
    ...mapActions('iciciStaticQr', [
      'FETCH_STATIC_QR_INVENTORY_COUNT'
    ]),

    ajaxLoadAllRegionList({ pagination, filter }) {
      this.$q.loading.show({
        delay: 0,
        spinnerColor: 'purple-9',
        message: 'Fetching data ..'
      })
      this.FETCH_REGION_BASED_QR_ALLOCATED_LIST({ pagination, filter })
        .then(response => {
          this.paginationControl2 = pagination
          this.paginationControl2.rowsNumber = response.totalElements
          this.paginationControl2.page = response.number + 1
          this.tableData = response.content
          console.log('TABLE DATA', JSON.stringify(this.tableData))
          if (this.response.sort != null) {
            this.paginationControl2.sortBy = response.sort[0].property
            this.paginationControl2.descending = response.sort[0].ascending
          }
          this.$q.loading.hide()
        })
        .catch(() => {
          this.$q.loading.hide()
        })
    },
    ajaxLoadAllRegionList1({ pagination, filter }) {
      this.$q.loading.show({
        delay: 0,
        spinnerColor: 'purple-9',
        message: 'Fetching data ..'
      })
      this.FETCH_REGION_BASED_QR_ALLOCATED_APPROVED_LIST({ pagination, filter })
        .then(response => {
          // this.Data = response
          this.paginationControl1 = pagination
          this.paginationControl1.rowsNumber = response.totalElements
          this.paginationControl1.page = response.number + 1
          this.tableData1 = response.content
          console.log('TABLE DATA1', JSON.stringify(this.tableData))
          if (this.response.sort != null) {
            this.paginationControl1.sortBy = response.sort[0].property
            this.paginationControl1.descending = response.sort[0].ascending
          }
          this.$q.loading.hide()
        })
        .catch(() => {
          this.$q.loading.hide()
        })
    },
    fnAjaxGetAllRegionList() {
      this.FETCH_REGION_LIST()
        .then(res => {
          let Region = res.data.data
          let assumeArr = []
          Region.map(function (value) {
            assumeArr.push({
              label: value.regionAreaName,
              value: value.id
            })
          })
          this.RegionOptionIcici = assumeArr
        })
        .catch(() => {
          this.RegionOptionIcici = []
        })
    },
    inventoryCount() {
      this.FETCH_STATIC_QR_INVENTORY_COUNT()
        .then(response => {
          console.log("COUNT", JSON.stringify(response));
          this.inventoryQrCount = response
        })
        .catch(() => {
          this.$q.loading.hide()
        })
    },
    showChannel(event) {
      self = this;
      if (self.inventoryQrCount.length > 0) {
        self.inventoryQrCount.forEach(function (obj) {
          if (event == obj.staticQrBank.id) {
            self.remainingCount = obj.count
            self.label = obj.staticQrBank.name
          }
        })
      }
    },
    podGeneration() {
      const name = 'REG'
      const d = new Date()
      let number = d.getTime()
      let finalValue = name.concat(number)
      this.formData.podNumber = finalValue
    },
    fnAssignsubmit() {
      this.$v.formData.$touch()
      if(this.$v.formData.$error){
        this.$q.notify('Please review fields again.')
      }else{
      let request = {
        staticQrBank: {
          id: this.formData.bank
        },
        region: {
          id: this.formData.regionList
        },
        requestedCount: this.formData.count,
        podNumber: this.formData.podNumber
      }
      this.$q.loading.show({
        delay: 0,
        spinnerColor: 'purple-9',
        message: 'Fetching data ..'
      })
      this.ASSIGN_REGION(request).then(response => {

        this.ajaxLoadAllRegionList({
          pagination: this.paginationControl2
        })
        this.$q.notify({
          color: 'positive',
          position: 'bottom',
          message: 'Successfully Assigned!',
          icon: 'thumb_up'
        })
        this.inventoryCount()
        this.formData.bank = ''
        this.formData.regionList = ''
        this.formData.count = ''
        this.formData.podNumber = ''
        this.remainingCount = ''
        this.podGeneration()
      }).catch(() => {
        this.$q.notify({
          color: 'negative',
          position: 'bottom',
          message: 'No changes made!',
          icon: 'thumb_down'
        })
        this.$q.loading.hide()
        this.inventoryCount()
        this.formData.bank = ''
        this.formData.regionList = ''
        this.formData.count = ''
        this.formData.podNumber = ''
        this.remainingCount = ''
      })
    }
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

          console.log("LIST ", JSON.stringify(this.bankListOptions));
        })
        .catch(() => {
          this.bankListOptions = []
        })
    },
    fnAjaxGetAllActiveBatchList() {
      this.FETCH_ACTIVE_BATCH_LIST()
        .then(res => {
          this.activeBatch = res.data.data
          let assumeArr = []
          this.activeBatch.map(function (value) {
            assumeArr.push({
              label: JSON.stringify(value.batchId),
              value: JSON.parse(value.batchId)
            })
          })
          this.batchList = assumeArr
        })
        .catch(() => {
          this.batchList = []
        })
    },
    //  emitToggleCheque(toggleModal) {
    //   this.$emit("closeModel");
    // },
    // fnSubmitAllocateResellar(request) {
    //   let params = {};
    //   if (this.formData.region == "") {
    //     this.$q.notify({
    //       color: "amber-9",
    //       position: "bottom",
    //       message: "Region cannot be empty!",
    //       icon: "warning"
    //     });
    //   } else if (this.formData.device == "") {
    //     this.$q.notify({
    //       color: "amber-9",
    //       position: "bottom",
    //       message: "Device Type cannot be empty!",
    //       icon: "warning"
    //     });
    //   } else {
    //     this.FETCH_ALL_SUBMITS(this.formData)
    //       .then(() => {
    //         this.TOGGLE_COMMON_LOADER(false);
    //         this.$q.notify({
    //           color: "positive",
    //           position: "bottom",
    //           message: "Devices has been successfully allocated to region",
    //           icon: "thumb_up"
    //         });
    //         this.$router.push("/inventory/central");
    //       })
    //       .catch(error => {
    //         this.TOGGLE_COMMON_LOADER(false);
    //         this.$q.notify({
    //           color: "negative",
    //           position: "bottom",
    //           message: error.body.message == null ? "Please Try Again Later !" : error.body.message,
    //           icon: "thumb_down"
    //         });
    //       });
    //   }
    // },

    // Function to dynamically set column name for scanned items without store
    fnSetDevicesByDeviceId() {
      this.scannerToggleOption = true;
      this.$barcodeScanner.destroy();
      // Set local variable for this
      let self = this;

      // Get device type object from array using selected dvice type by user
      let predictIfDeviceExist = self.formData.scannedItems.filter(function(
        value
      ) {
        return value.device.id == self.formData.device_type.id;
      });

      // Push scanned item values into array
      if (predictIfDeviceExist.length == 0) {
        self.formData.scannedItems.unshift({
          device: {
            deviceName: self.formData.device_type.deviceName,
            id: self.formData.device_type.id
          },
          deviceSerialNumbers: []
        });
      }
    },

    // Create callback function to receive barcode when the scanner is already done
    onBarcodeScanned(barcode) {
      let self = this;
      let predictIfDeviceExist = self.formData.scannedItems.find(function(
        value
      ) {
        return value.device.id == self.formData.device_type.id;
      });
      let assumeArr;
      assumeArr = {
        device: {
          deviceName: self.formData.device_type.deviceName,
          id: self.formData.device_type.id
        },
        deviceSerialNumbers: predictIfDeviceExist.deviceSerialNumbers
      };
      let finalAssumation = _.find(assumeArr.deviceSerialNumbers, function(oo) {
        return oo == barcode;
      });
      if (finalAssumation == undefined) {
        console.log("Inside");
        this.DEVICE_VERIFICATION_ON_SCAN_USING_DEVICE_TYPE_ID_ALLOCATION({
          device: self.formData.device_type.id,
          barcode: barcode
        })
          .then(() => {
            console.log("Error-1");
            assumeArr.deviceSerialNumbers.push(barcode);
          })
          .catch(() => {
            console.log("Error-2");
            this.$q.notify({
              color: "primary",
              position: "bottom",
              message: barcode + " is invalid",
              icon: "info"
            });
          });
      } else {
        this.$q.notify({
          color: "primary",
          position: "bottom",
          message: barcode + " - already exist in " + assumeArr.device.name,
          icon: "info"
        });
      }
    },

    openScannerComp() {
      this.$q.notify({
        color: "positive",
        position: "bottom",
        message: "Start scanning for " + this.formData.device_type.deviceName,
        icon: "list"
      });
      this.scannerToggleOption = false;
      if (!this.$barcodeScanner.hasListener()) {
        this.$barcodeScanner.init(this.onBarcodeScanned);
      }
    },

    // Function remove scanned items
    fnRemoveScannedItems(index, subIndex) {
      // this.formData.scannedItems[index].deviceSerialNumbers.splice(subIndex, 1);
      this.$delete(
        this.formData.scannedItems[index].deviceSerialNumbers,
        subIndex
      );
    },

    // Function to final submit for allocate device
    fnAllocateDeviceToRegion() {
      this.showPDOmodal = !this.showPDOmodal;
    },

    // Function to get all device types
    fnAjaxGetAllDevicesTypesData() {
      this.FETCH_ALL_INVENTORY_DEVICES_TYPES_DATA()
        .then(() => {
          let assumeArr = [];
          this.getAllInventoryDevicesTypesData.map(function(value, index) {
            assumeArr.push({
              label: value.deviceName,
              value: value
            });
          });
          this.deviceOptions = assumeArr;
        })
        .catch(error => {
          this.deviceOptions = [];
        });
    },

    // Function to get ll regiosn data
    fnAjaxGetAllRegionsData() {
      this.FETCH_ALL_REGIONS_DATA()
        .then(() => {
          let assumeArr = [];
          this.getAllRegionsData.map(function(value, index) {
            assumeArr.push({
              label: value.regionAreaName,
              value: value.id
            });
          });
          this.regionOptions = assumeArr;
        })
        .catch(error => {
          this.regionOptions = [];
        });
    },

    // Function to delete the entire device based information
    fnRemoveDeviceTypeFromList(index) {
      // this.formData.scannedItems.splice(index, 1);
      this.$delete(this.formData.scannedItems, index);
    },

    // Function to clear device type
    fnClearingDeviceTypeSelection() {
      this.formData.device_type = "";
      this.formData.scannedItems = [];
    },
    editCount(rowDetails) {
      this.editCountModal = !this.editCountModal
      if (rowDetails != undefined) {
        this.Data = rowDetails
      }
      if (this.editCountModal == false) {
        this.ajaxLoadAllRegionList({
          pagination: this.paginationControl

        })
      }
      console.log('TEST', this.editCountModal)
    },
  }
};
</script>
<style scoped>
.activeDeviceTab .q-list-header {
  border-bottom: 1px solid rgb(204, 204, 204);
  background: #61116a;
  color: #fff;
}
.qrlabel{
  padding: 20px 30px; 
}
.card{
padding:3px;
width:100px;
border-radius: 12px;
margin-left: 20px;
margin-top: 20px;
}
.sizeBank{
  width: 235px;
}
.sizeRegion{
  margin-left: -12px;
  width: 235px;
}
.sizeQR{
  margin-left: -18px;
}
.alignPOD{
  margin-left: 10px;
}
.alignbtn{
  width: 10%;
}
.radio{
  padding:5px;
}
.align1{
  margin-left: 10px;
  margin-top: 10px;
}
.search{
  width: 25%;
}
</style>
