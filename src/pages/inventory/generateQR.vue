
<template>
  <q-page>
    <div>
      <q-tabs v-model="activeTab" class="shadow-1" color="grey-1" @select="goToDownloadTab">
        <q-tab default color="dark" name="tab-1" slot="title" label="Generate QR" />
        <q-tab color="dark" name="tab-2" slot="title" label="Download/View QR" />
        <!-- <q-tab color="dark" name="tab-3" slot="title" label="Request" /> -->
        <q-tab-pane name="tab-1">
          <q-card style="width:100%" >
          <q-card-main>
            <div>
              <div class="row">
                <label class="qrlabel" for="input-id"><b>Select Bank</b></label>
                <div class="col-3">
                  <q-select class="select" float-label="Select Bank"  id="input-id" v-model.trim="formData.id" :error="$v.formData.id.$error"  color="grey-9"
                    :options="bankListOptions" />
                </div>
              </div>
              <br />
              <div>
                <div class="row">
                  <label class="invlabel"  for="input"><b>Enter No Of QR</b></label>
                  <div class="col-3">
                      <q-input type="number" class="qr-input" :disable="this.formData.id == ''" @keyup="trackChange" @keydown="nameKeydown($event)" float-label="Enter Numbers of QR Count" v-model.trim="formData.count" id="input"
                    @blur="$v.formData.count.$touch"
                            :error="$v.formData.count.$error"
                      color="grey-9" />
                  </div>
                </div>
                <div class="row group">
                  <div class="col3" align="center">
                    <q-btn class="common-dark-blue" :disabled='this.formData.count == ""' label="Generate" @click="fnsubmit()" />
                  </div>
                </div>
              </div>
            </div>
          </q-card-main>
        </q-card>
        </q-tab-pane>

        <q-tab-pane name="tab-2">
          <div class="col-md-10">
            <q-search 
            clearable 
            class="btnsize"
            color="grey-9" 
            placeholder="Type.." 
            v-model="filter"
            float-label="Search by Batch" />
          </div>
          <q-table table-class="customTableClass" :data="tableData" :columns="columns"
            :pagination.sync="paginationControl"   :filter="filter" row-key="id" :loading="toggleAjaxLoadFilter"
            :rows-per-page-options="[5, 10, 15, 20]" @request="ajaxLoadAllBatchList">
            <!--START: table header -->
            <!-- <q-tr slot="top-row" slot-scope="props">
        <q-th v-for="col in props.columns" :key="col.name" :props="props">{{ col.label }}</q-th>
        </q-tr> -->
            <q-td slot="body-cell-createdAt" slot-scope="props" :props="props">{{
              props.row.createdAt == null ? 'NA' :
                props.row.createdAt | moment("Do MMM Y")
            }}</q-td>
            <q-td slot="body-cell-Batch" slot-scope="props" :props="props">{{
              props.row.batchId == null ? 'NA' :
                props.row.batchId
            }}</q-td>
            <q-td slot="body-cell-Bank" slot-scope="props" :props="props">{{
              props.row.staticQrBank.name == null ? 'NA'
                :
                props.row.staticQrBank.name
            }}</q-td>
            <q-td slot="body-cell-Count" slot-scope="props" :props="props">{{
              props.row.count == null ? 'NA' :
                props.row.count
            }}</q-td>
            <q-td slot="body-cell-remainingCount" slot-scope="props" :props="props">{{
              props.row.remainingQrCount == 0 ? '' : props.row.remainingQrCount
            }}</q-td>
            <q-td slot="body-cell-Action" slot-scope="props" :props="props">
              <div class="row no-wrap no-padding">
                <q-btn dense no-caps no-wrap label="Download" icon="file_download" size="md"
                  @click="downloadQrString(props.row)" flat class="text-green">
                </q-btn>
                <q-btn dense no-caps no-wrap label="View" icon="visibility" size="md" @click="ListVpaData(props.row)"
                  flat class="text-negative">
                </q-btn>
              </div>
            </q-td>
            <q-td slot="body-cell-Action2" slot-scope="props" :props="props"> 
              <div class="row no-wrap no-padding">
                <q-btn :disable="props.row.batchCount == true" dense no-caps no-wrap label="Sticker Recieved" icon="thumb_up_alt" size="md"
                  @click="stickerRecieved(props.row)" flat class="text-blue">
                </q-btn>
              </div>
            </q-td>
          </q-table>
        </q-tab-pane>
      </q-tabs>
    <qrPopUp v-if="propToggleData" :QrInfo="addBasicInformation" :propToggleDataPop="propToggleData"
      @closeRemarksInfo="toggle" />

    <ViewVpaData v-if="VpaDataModal" :VpaDataModal="VpaDataModal" :propRowDetails="propRowDetails"
      @toggleModal="ListVpaData" />
    </div>
  </q-page>
</template>
<script>
import {
  required,
}
  from "vuelidate/lib/validators";
import { mapGetters, mapActions } from 'vuex'
import qrPopUp from '../../components/inventory/qrPopUp.vue'
import ViewVpaData from '../../components/inventory/ViewVpaData.vue'
export default {
  name: 'generateQR',
  components: {
    qrPopUp,
    ViewVpaData
  },
  data () {
    return {
      filter: '',
      response: '',
      bankListOptions: [],
      propToggleData: false,
      VpaDataModal: false,
      propRowDetails: '',
      addBasicInformation: '',
      batchValue: [],
      batchInput: {
        batchId: 0
      },
      formData: {
        id: '',
        count: '',
        name: ''
      },
      // qrData: {
      //   QRbatch: 1,
      //   QRcount: 2
      // },
      toggleAjaxLoadFilter: false,
      paginationControl: {
        rowsNumber: 5,
        page: 1,
        sortBy: 'createdAt',
        descending: false,
        rowsPerPage: 5
      },
      activeTab: 'tab-1',
     
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
          name: 'Batch',
          required: true,
          label: 'Batch',
          align: 'left',
          field: 'batchId',
          sortable: false
        },
        {
          name: 'Bank',
          required: true,
          label: 'Bank',
          align: 'left',
          field: 'name',
          sortable: false
        },
        {
          name: 'Count',
          required: true,
          label: 'QR Generated',
          align: 'left',
          field: 'count',
          sortable: false
        },
        // {
        //   name: 'remainingCount',
        //   required: true,
        //   label: 'Remaining QR Count',
        //   align: 'left',
        //   field: 'remainingCount',
        //   sortable: false
        // },
        {
          name: 'Action',
          required: true,
          label: 'Action',
          align: 'left',
          field: 'role',
          sortable: false
        },
        {
          name: 'Action2',
          required: true,
          label: 'Action',
          align: 'left',
          field: 'role',
          sortable: false
        }
      ],
      // columns3: [
      //     {
      //         name: "Date",
      //         required: true,
      //         label: "Date",
      //         align: "left",
      //         field: row => {
      //             return row.user.name;
      //         },
      //         sortable: false
      //     },
      //     {
      //         name: "Request From",
      //         required: true,
      //         label: "Request From",
      //         align: "left",
      //         field: row => {
      //             return row.user.employeeID;
      //         },
      //         sortable: false
      //     },
      //     {
      //         name: "Model",
      //         required: true,
      //         label: "Model",
      //         align: "left",
      //         field: row => {
      //             return row.user.contactNumber;
      //         },
      //         sortable: false
      //     },
      //     {
      //         name: "count",
      //         required: true,
      //         label: "count",
      //         align: "left",
      //         field: row => {
      //             return row.user.email;
      //         },
      //         sortable: false
      //     },
      //     {
      //         name: "Action",
      //         required: true,
      //         label: "Action",
      //         align: "left",
      //         field: "role",
      //         sortable: false
      //     },

      // ],
      tableData: [],
      VpaDataModal: false
    }

  },
  created () {
    this.fnAjaxGetAllBankData()
    this.trackChange()
  },
  mounted () {
    this.ajaxLoadAllBatchList({
      pagination: this.paginationControl

    })
  },
  computed: {
    ...mapGetters('generateQR', ['getAllBankList', 'getAllBatchList'])
  },
  validations:{
 formData:{
  count:{
    required
  },
  id:{
    required
  }
 }
},
  methods: {
    ...mapActions('generateQR', ['FETCH_BANK_LIST', 'FETCH_BATCH_DETAILS', 'GENERATE_QR','APPROVE_RECIEVED_STICKER']),
    ...mapActions('staticQrDownloads', ['DOWNLOAD_STATIC_QR_DATA']),

    trackChange(){
      this.formData.count = parseInt(this.formData.count) === 0  ? null : this.formData.count
    },
    nameKeydown(e) {
      if (/^\W$/.test(e.key)) {
        e.preventDefault();
      }
    },
    fnAjaxGetAllBankData () {
      this.FETCH_BANK_LIST()
        .then(() => {
          let assumeArr = []
           console.log('BANKLIST OPTION---->>>>', JSON.stringify(this.getAllBankList))
          this.getAllBankList.map(function (value) {
            assumeArr.push({
              label: value.name,
              value: value.id
            })
          })
          this.bankListOptions = assumeArr
          // this.bankListOptions = this.getAllBankList.bankName
          // console.log("BANKLIST OPTION---->>>>",JSON.stringify(this.bankListOptions));
        })
        .catch(() => {
          this.bankListOptions = []
        })
    },
    goToDownloadTab (tab) {
      if (tab === 'tab-2') {
        this.ajaxLoadAllBatchList({
          pagination: this.paginationControl

        })
        let request = {
          pagination: this.paginationControl,
          filter: this.filter
        }
        this.FETCH_BATCH_DETAILS(request)
          .then(() => {
            this.toggleAjaxLoadFilter = false
          })
          .catch(() => {
            this.toggleAjaxLoadFilter = false
          })
      } else {
        this.ajaxLoadAllBatchList({
          pagination: this.paginationControl
          // filter: this.filter
        })
      }
    },
    ajaxLoadAllBatchList () {
      this.toggleAjaxLoadFilter = true
      this.FETCH_BATCH_DETAILS()
        .then(() => {
          this.toggleAjaxLoadFilter = false
        })
        .catch(() => {
          this.toggleAjaxLoadFilter = false
        })
    },
    ajaxLoadAllBatchList ({ pagination, filter }) {
      this.$q.loading.show({
        delay: 0,
        spinnerColor: 'purple-9',
        message: 'Fetching data ..'
      })
      this.FETCH_BATCH_DETAILS({ pagination, filter })
        .then(() => {
          this.paginationControl = pagination
          this.paginationControl.rowsNumber = this.getAllBatchList.totalElements
          this.paginationControl.page = this.getAllBatchList.number + 1
          this.tableData = this.getAllBatchList.content
          console.log('RESPONSE DATA', JSON.stringify(this.tableData))
          if (this.getAllBatchList.sort != null) {
            this.paginationControl.sortBy = this.getAllBatchList.sort[0].property
            this.paginationControl.descending = this.getAllBatchList.sort[0].ascending
          }
          this.$q.loading.hide()
        })
        .catch(() => {
          this.$q.loading.hide()
        })
    },
    
    fnsubmit () {
      this.$v.formData.$touch()
      if(this.$v.formData.$error){
        this.$q.notify('Please review fields again.')
      }else{
     
        let qrData = {
        staticQrBank: {
          id: this.formData.id
        },
        count: this.formData.count
      }
      this.$q
          .dialog({
            title: "Confirm",
            message: "Are you sure want to generate QR ?",
            ok: "Continue",
            cancel: "Cancel"
          })
          .then(() => {
            this.$q.loading.show({
            delay: 0, // ms
            spinnerColor: "purple-9",
            message: "Processing .."
          });
      this.GENERATE_QR(qrData)
      .then(response => {
        this.response = response
        this.$q.notify({
          color: 'positive',
          position: 'bottom',
          message: 'Successfully Generated!',
          icon: 'thumb_up'
        })
        this.$q.loading.hide();
        this.toggle()
        this.formData.id = '',
        this.formData.count = '',
        this.formData.name = ''
        // if (response.status == 200) {
        //   this.propToggleData = !this.propToggleData
        //   if (data != undefined) {
        //     this.addBasicInformation = response
        //   }
        // }
      }).catch(() => {
        this.$q.notify({
          color: 'negative',
          position: 'bottom',
          message: 'No changes made!',
          icon: 'thumb_down'
        })
        this.$q.loading.hide();
      })
    
    })
      }
    
    },
    stickerRecieved(props) {
     
      this.$q.dialog({
        title: 'Confirm',
        message: 'Are you sure?',
        ok: 'Yes',
        cancel: 'Cancel'
      }).then(() => {
      this.APPROVE_RECIEVED_STICKER(props)
      .then(response => {
        this.response = response
        this.$q.loading.show({
        delay: 0,
        spinnerColor: 'purple-9',
        message: 'data generating ..'
      })
      this.ajaxLoadAllBatchList({
          pagination: this.paginationControl
          // filter: this.filter
        })
        this.$q.notify({
          color: 'positive',
          position: 'bottom',
          message: 'Approved Successfully !',
          icon: 'thumb_up'
        })
      
        this.$q.loading.hide()
      })
      
    }) .catch(() => {
        this.$q.notify({
          color: 'negative',
          position: 'bottom',
          message: 'No changes made!',
          icon: 'thumb_down'
        })
      })
    },
    toggle () {
      this.propToggleData = !this.propToggleData
      if (this.response != undefined) {
        this.addBasicInformation = this.response
      }
    },
    ListVpaData (rowDetails) {
      this.VpaDataModal = !this.VpaDataModal
      this.propRowDetails = rowDetails
    },

    downloadQrString (data) {
      this.$q.loading.show({
          delay: 100, // ms
          spinnerColor: "purple-9",
          message: "Please wait.."
      });
      let qrId = {
        id: data.batchId
      }
      this.DOWNLOAD_STATIC_QR_DATA(qrId.id)
        .then(response => {
          this.$q.loading.hide()
          console.log('data information------------------>', response)
          this.$q.notify({
            color: 'positive',
            position: 'bottom',
            message: 'Successfully Downloaded',
            icon: 'thumb_up'
          })
        })
    }

  }

}
</script>
<style>
.invlabel {
display: inline-block;
width: 150px;
height: 10px;
text-align: left;
padding: 10px 30px; 
}
.col3{
  margin-left: 250px;
  margin-top: 30px;
}
.btnsize{
  margin-right: 67%;
  margin-bottom: 7px;
}
/* .select{
  display: inline-block;
  line-height: 100%;
  padding: 10px 70px; 
  position:sticky;
  align-items: center;
} */
.qrlabel{
  padding: 20px 30px; 
}
.qr-input{
  display: inline-block;
  text-align: left;
  line-height: 200%;
  margin-left: -16px;
  width: 200px;
}
</style>
