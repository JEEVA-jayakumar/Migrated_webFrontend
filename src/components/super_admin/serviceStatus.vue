<template>
  <q-page>
    <div>
      <q-tabs v-model="activeTab" class="shadow-1" color="grey-1" >
         <q-tab @select="ajaxSpareData" default  color="dark" name="tab-3" slot="title" label="Active Service Status" />
          <q-tab  color="dark" name="tab-4" slot="title" label="Deactive Service Status" />

          <q-tab-pane name="tab-3">
          <q-table
          :data="ActivetableData"
          table-class="customSATableClass"
          :columns="columns1"
          :filter="filterSearch"
          :pagination.sync="paginationControl"
          :filter-method="myCustomSearchFilter1"
          row-key="name"
          color="grey-9"
          >
          <q-td slot="body-cell-createdDate" slot-scope="props" :props="props">{{
                props.row.createdDate | moment("Do MMM Y")
            }}</q-td>
            <q-td slot="body-cell-updatedDate" slot-scope="props" :props="props">{{
                props.row.updatedDate | moment("Do MMM Y")
            }}</q-td>

            <q-td slot="body-cell-action" slot-scope="props" :props="props">
              <div class="row no-wrap no-padding">
              <q-btn dense no-caps no-wrap label="Modify" icon="far fa-plus-square" size="md"
                  @click="fnShowEditNewServiceStatus(props.row)" flat class="text-light-blue"></q-btn>
                <q-btn dense no-caps no-wrap label="Disable" icon="far fa-minus-square" size="md"
                  @click="fnDeleteServiceRequestStatus(props.row)" flat class="text-negative"></q-btn>
              </div>
            </q-td>

            <template slot="top" slot-scope="props">
              <div class="col-3">
                <q-search clearable color="grey-9" v-model="filterSearch" placeholder="Type.." class="q-mr-lg" />
              </div>
              <!--END: table filter,search -->
              <div class="col-3" align="right">
                <q-btn no-caps class="text-weight-regular" label="Add Service Status"
                  @click="fnShowAddNewServiceStatus(props.row)" color="purple-9" size="md" />

              </div>
            </template>
          </q-table>
        </q-tab-pane>

        <q-tab-pane name="tab-4">
          <q-table
          :data="DeactivetableData"
          table-class="customSATableClass"
          :columns="columns4"
          :filter="filterSearch3"
          :pagination.sync="paginationControl2"
          :filter-method="myCustomSearchFilter2"
          row-key="name"
          color="grey-9"
          >
            <q-td slot="body-cell-createdDate" slot-scope="props" :props="props">{{
                props.row.createdDate | moment("Do MMM Y")
            }}</q-td>
            <q-td slot="body-cell-updatedDate" slot-scope="props" :props="props">{{
                props.row.updatedDate | moment("Do MMM Y")
            }}</q-td>

            <q-td slot="body-cell-action1" slot-scope="props" :props="props">
              <div class="row no-wrap no-padding">
                <q-btn dense no-caps no-wrap label="Active" icon="far fa-plus-square" size="md"
                  @click="fnShowActiveServiceStatus(props.row)" flat class="text-light-blue"></q-btn>
              </div>
            </q-td>

            <template slot="top" slot-scope="props">
              <div class="col-3">
                <q-search clearable color="grey-9" v-model="filterSearch3" placeholder="Type.." class="q-mr-lg" />
              </div>
            </template>
          </q-table>
        </q-tab-pane>
      </q-tabs>

      <!--START: Show AddServiceStatus -->
      <ShowAddServiceStatus v-if="propShowAddServiceStatus" :propShowAddServiceStatus="propShowAddServiceStatus"
        :propRowDetails3="propRowDetails3" @emitfnShowAddNewServiceStatus="fnShowAddNewServiceStatus" />
      <!--END: Show AddServiceStatus -->

      <!--START: Show EditServiceStatus -->
      <ShowEditServiceStatus
       v-if="propShowEditServiceStatus"
        :propShowEditServiceStatus="propShowEditServiceStatus"
        :propRowDetails5="propRowDetails5"
         @emitfnShowEditNewServiceStatus="fnShowEditNewServiceStatus"
          />
      <!--END: Show EditServiceStatus -->
    </div>
  </q-page>
</template>
<script>
import ShowAddServiceStatus from '../../components/super_admin/ShowAddServiceStatus.vue'
import ShowEditServiceStatus from '../../components/super_admin/ShowEditServiceStatus.vue'

import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'getserviceRequestStatusDetails',
  components: {

    ShowAddServiceStatus,
    ShowEditServiceStatus
  },

  data () {
    return {
      activeTab: 'tab-3',
      propShowAddServiceType: false,
      propShowEditServiceType: false,
      propShowEditSubTaskType: false,
      propShowActiveServiceType: false,
      propShowAddSubTaskType: false,
      propShowAddServiceStatus: false,
      propShowEditServiceStatus: false,
      propRowDetails: '',
      propRowDetails1: '',
      propRowDetails2: '',
      propRowDetails3: '',
      propRowDetails4: '',
      propRowDetails5: '',

      filter: '',
      filterSearch: '',
      filterSearch1: '',
      filterSearch2: '',
      filterSearch3: '',
      filter_values: '',
      multipleSelect: '',
      // serviceReqIssueTypeSets: [],

      paginationControl: {
        rowsPerPage: 10
      },
      paginationControl2: {
        rowsPerPage: 10
      },

      // table information
      columns1: [

        {
          name: 'name',
          required: true,
          label: 'name',
          align: 'left',
          field: 'name',
          sortable: true
        },
        {
          name: 'updatedDate',
          required: true,
          label: 'Updated Date',
          align: 'left',
          field: 'updatedDate',
          sortable: true
        },
        {
          name: 'action',
          required: true,
          label: '',
          align: 'left',
          field: 'action',
          sortable: false
        }
      ],
      columns4: [

        {
          name: 'name',
          required: true,
          label: 'name',
          align: 'left',
          field: 'name',
          sortable: true
        },
        {
          name: 'updatedDate',
          required: true,
          label: 'Updated Date',
          align: 'left',
          field: 'updatedDate',
          sortable: true
        },
        {
          name: 'action1',
          required: true,
          label: '',
          align: 'left',
          field: 'action1',
          sortable: false
        }
      ],

      tableData: [],
      tableData1: [],
      ActivetableData: [],
      DeactivetableData: []
    }
  },
  mounted () {
    this.ajaxSpareData()
    this.ajaxSpareData1()
  },

  created () {
    /* START: Load user table data filter > Regions */
    this.ajaxSpareData()
    this.ajaxSpareData1()
    /* End: Load user table data filter > Regions */
  },

  computed: {
    ...mapGetters('serviceRequest', [
      'getserviceRequestGetTypes',
      'getsubTaskDetails'
    ]),
    ...mapGetters('ServiceRequestStatus', [
      'getserviceRequestStatusDetails'
    ])
  },

  methods: {
    ...mapActions('serviceRequest', [
      'FETCH_ALL_SERVICE_REQUEST_GET_TYPES',
      'DELETE_SERVICE_REQUEST_TYPES',
      'FETCH_SUB_TASK_DATAS',
      'DELETE_SUB_TASK_TYPES'
    ]),
    ...mapActions('serviceRequest', ['EDIT_SERVICE_REQUEST_TYPES', 'ACTIVE_SERVICE_ISSUE_TYPES']),
    ...mapActions('ServiceRequestStatus', ['FETCH_SERVICE_REQUEST_STATUS_DETAILS',
      'POST_SERVICE_STATUS_TYPES',
      'ACTIVE_SERVICE_STATUS_TYPES',
      'EDIT_SERVICE_STATUS_TYPES',
      'DELETE_SERVICE_STATUS_TYPES']),

    fnShowActiveServiceStatus (reqData) {
      console.log('REQEST DATA---------->', JSON.stringify(reqData))
      let param = {
        id: reqData.id,
        request: reqData
      }
      this.$q
        .dialog({
          title: 'Confirm',
          message: 'Are you sure want to delete?',
          ok: 'Continue',
          cancel: 'Cancel'
        })
        .then(() => {
          this.$q.loading.show({
            delay: 100, // ms
            message: 'Please Wait',
            spinnerColor: 'purple-9',
            customClass: 'shadow-none'
          })
          this.EDIT_SERVICE_STATUS_TYPES(param)
            .then(() => {
              this.$q.loading.hide()
              this.$q.notify({
                color: 'positive',
                position: 'bottom',
                message: 'Successfully updated!',
                icon: 'thumb_up'
              })
              this.$q.loading.hide()
              this.ajaxSpareData()
            })
        })
        .catch(error => {
          this.$q.loading.hide()
          this.$q.notify({
            color: 'negative',
            position: 'bottom',
            message:
                error.body.message == null
                  ? 'Please Try Again Later !'
                  : error.body.message,
            icon: 'thumb_down'
          })
        })
    },

    fnDeleteServiceRequestStatus (rowDetails) {
      console.log('ROW DETAILS------------->', JSON.stringify(rowDetails))
      this.$q
        .dialog({
          title: 'Confirm',
          message: 'Are you sure want to delete?',
          ok: 'Continue',
          cancel: 'Cancel'
        })
        .then(() => {
          this.$q.loading.show({
            delay: 100, // ms
            message: 'Please Wait',
            spinnerColor: 'purple-9',
            customClass: 'shadow-none'
          })
          this.DELETE_SERVICE_STATUS_TYPES(rowDetails)
            .then(response => {
              this.$q.loading.hide()
              this.$q.notify({
                color: 'positive',
                position: 'bottom',
                message: 'Successfully removed',
                icon: 'thumb_up'
              })
              this.$q.loading.hide()
              this.ajaxSpareData()
            })
        })
        .catch(() => {
          this.$q.notify({
            color: 'negative',
            position: 'bottom',
            message: 'No changes made!',
            icon: 'thumb_down'
          })
        })
    },

    ajaxSpareData () {
      this.FETCH_SERVICE_REQUEST_STATUS_DETAILS()
        .then(res => {
          console.log('getserviceRequestStatusDetails------->', JSON.stringify(this.getserviceRequestStatusDetails))
          this.tableData = this.getserviceRequestStatusDetails
          console.log('tableData------->', JSON.stringify(this.tableData))
          this.DeactivetableData = this.getserviceRequestStatusDetails.filter(service => service.active == false)
          console.log('DeactivetableData------->', JSON.stringify(this.DeactivetableData))
          this.ActivetableData = this.getserviceRequestStatusDetails.filter(service => service.active == true)
          console.log('ActivetableData------->', JSON.stringify(this.ActivetableData))
        })
        .catch(() => {
          this.$q.loading.hide()
        })
    },
    ajaxSpareData1 () {
      this.FETCH_ALL_SERVICE_REQUEST_GET_TYPES()
        .then(res => {
        //   this.tableData1 = this.getsubTaskDetails;
          console.log(
            'TABLE DATA 11111111111111 VALUES-RESPONSE---------->',
            JSON.stringify(this.tableData1)
          )
          this.DeactiveissueTypes = this.getsubTaskDetails.filter(service => service.active == false)
          this.ActiveissueTypes = this.getsubTaskDetails.filter(service => service.active == true)
        })
        .catch(() => {
          this.$q.loading.hide()
        })
    },
    fnShowAddNewServiceStatus (token) {
      this.propShowAddServiceStatus = !this.propShowAddServiceStatus
      // this.propRowDetails3 = rowDetails;
      if (token == 'refresh') {
        this.ajaxSpareData()
      }
    },

    fnShowEditNewServiceStatus (rowDetails) {
      this.propShowEditServiceStatus = !this.propShowEditServiceStatus
      this.propRowDetails5 = rowDetails
      if (this.propShowEditServiceStatus == false) {
        this.ajaxSpareData()
      }
    },

    myCustomSearchFilter1 (rows, terms, cols, cellValue) {
      const lowerTerms = terms ? terms.toLowerCase() : ''
      return rows.filter(row =>
        cols.some(
          col =>
            (cellValue(col, row) + '').toLowerCase().indexOf(lowerTerms) !== -1
        )
      )
    },
    myCustomSearchFilter2 (rows, terms, cols, cellValue) {
      const lowerTerms = terms ? terms.toLowerCase() : ''
      return rows.filter(row =>
        cols.some(
          col =>
            (cellValue(col, row) + '').toLowerCase().indexOf(lowerTerms) !== -1
        )
      )
    }
  }
}
</script>

<style>
</style>
