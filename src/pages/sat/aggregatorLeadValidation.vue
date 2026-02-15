<template>
  <q-page>
    <!-- <q-pull-to-refresh :handler="PullToRefresh" inline></q-pull-to-refresh> -->
      <!--START: table title -->
      <div
        class="col-md-12 text-h6 q-px-lg q-py-md text-weight-regular bottom-border text-grey-9"
      >Aggregator Lead Validation</div>
      <!--END: table title -->
      <!-- //Common lead information in popup -->
      <generalLeadInformation
        v-if="propToggleLeadInformation"
        :leadInformation="addtnLeadInformation"
        :propToggleLeadInformationPop="propToggleLeadInformation"
        @closeLeadInformation="toggleLeadInformation"
      />
      <!-- content -->
      <!--START: table lead validation -->
      <q-table
        table-class="customTableClass"
        :rows="tableData"
        :columns="columns"
        :filter="filter"
        :pagination="paginationControl"
        row-key="name"
        :loading="toggleAjaxLoadFilter"
        :rows-per-page-options="[5,10,15,20]"
        @request="ajaxLoadAllLeadInfo"
      >
      <q-td
      />
       <!--START: table header -->
        <q-tr v-slot:top-row="props">
        <q-th v-for="col in props.columns" :key="col.name" :props="props">{{ col.label }}</q-th>  
        </q-tr>
        <!--END: table header -->
         <q-td 
         v-slot:body-cell-leadNumber="props"
         :props="props"
         class="cursor-pointer"
         @click.native="toggleLeadInformation(props.row)"
         >
          <span class="label text-primary"> {{props.row.leadNumber}}</span>
          
        </q-td>
        <q-td v-slot:body-cell-contactName="props" :props="props">
          <span class="label text-primary"> {{props.row.leadInformation.contactName}}</span>
        </q-td>
        <q-td
            v-slot:body-cell-date="props"
            :props="props"
          >{{ props.row.date | moment("Do MMM Y") }}</q-td>
         <q-td v-slot:body-cell-verifiedFinanceStatus="props" :props="props">
            <span
              class="label text-positive"
              v-if="props.row.verifiedFinanceStatus== $VERIFIED_FINANCE_STATUS_SUCCESS"
            >Approved</span>
            <span
              class="label text-negative"
              v-else-if="props.row.verifiedFinanceStatus== $VERIFIED_FINANCE_STATUS_PENDING"
            >Pending</span>
            <span
              class="label text-negative"
              v-else-if="props.row.verifiedFinanceStatus== $VERIFIED_FINANCE_STATUS_REJECT"
            >Rejected</span>
            <span class="label" v-else>NA</span>
          </q-td>
          <q-td v-slot:body-cell-leadStatus="props" :props="props">
            <span
              class="label text-positive"
              v-if="props.row.verifiedFinanceStatus== $LEAD_STATUS_SUBMIT_TO_SAT_LEAD && props.row.verifiedFinanceStatus== $VERIFIED_FINANCE_STATUS_SUCCESS"
            >New</span>
            <span
              class="label text-negative"
              v-if="props.row.verifiedFinanceStatus== $LEAD_STATUS_SUBMIT_TO_SAT_LEAD && props.row.verifiedFinanceStatus== $VERIFIED_DOCUMENT_STATUS_REJECT"
            >Rejected</span>
            <!-- <span
              class="label text-positive"
              v-if="props.row.leadStatus == $LEAD_STATUS_MARS_APPROVED"
            >Mars Approved</span> -->
            
            <q-btn
              v-else-if="props.row.leadStatus == $LEAD_STATUS_MARS_APPROVED"
              highlight
              push
              class="disabled"
              color="positive"
              size="sm"
            >Mars Approved</q-btn>

            <span
              class="label text-primary"
              v-else-if="props.row.leadStatus== $LEAD_STATUS_DATA_ENTRY_PENDING"
            >WIP</span>
            <!-- <span
              class="label text-orange"
              v-else-if="props.row.leadStatus== $LEAD_STATUS_SUBMITED_TO_MARS"
            >Submitted To Mars</span> -->
            <q-btn
              v-else-if="props.row.leadStatus == $LEAD_STATUS_SUBMITED_TO_MARS"
              highlight
              push
              class="disabled"
              color="purple-9"
              size="sm"
            >Submitted To Mars</q-btn>

            <span class="label text-negative" v-else>Pending</span>
          </q-td>
        <q-td v-slot:body-cell-mid="props" :props="props">
          <span class="label text-primary"># {{props.row.mid}}</span>
        </q-td>
       
        <q-td v-slot:body-cell-contactNumber="props" :props="props">
          <span class="label text-primary"> {{props.row.leadInformation.contactNumber}}</span>
        </q-td>
        <!-- <q-td
          v-slot:body-cell-leadNumber="props"
          :props="props"    
        >
          <span class="label text-primary"># {{props.row.leadInformation.leadNumber}}</span>
        </q-td> -->
        <!-- <q-td v-slot:body-cell-date="props" :props="props">
          <span class="label text-primary"># {{props.row.date}}</span>
        </q-td> -->
        <q-td
          v-slot:body-cell-leadAddress="props"
          :props="props"
        >{{props.row.leadInformation == null? 'NA':props.row.leadInformation.leadAddress}}</q-td>
        
        <!-- <q-td v-slot:body-cell-action="props" :props="props">
            @click.native="toggleLeadInformation(props.row.leadInformation.leadNumber)"
              class="cursor-pointer"
           <q-btn
            highlight
            push
            class="q-mx-sm"
            color="positive"
            size="sm"
            @click="additionalTid(props.row)"
          >Additional TID</q-btn>
        </q-td> -->
        <template slot="top"  class="bottom-border" >
          <!--START: table filter,search,excel download -->
          <div class="col-5">
            <q-input
              clearable
              v-model="filter"
              separator
              color="grey-9"
              placeholder="Type.."
              float-label="Search By Merchant Name, Lead ID.."
              class="q-mr-lg q-py-sm"
            />
          </div>
        </template>
      </q-table>
      <!--END: table lead validation -->
      <showMerchantTransactionLevelDetails
        v-if="valueToggleMerchantTransaction"
        :valueToggleMerchantTransaction="valueToggleMerchantTransaction"
        @revertRowClick="rowClick"
      ></showMerchantTransactionLevelDetails>
      <!--START >>  Show Ajax Spinner -->
       <Phonepe_validation
         v-if="propShowLeadNumberDetails"
        :propShowLeadNumberDetails="propShowLeadNumberDetails"
        :propRowDetails="propRowDetails"
      ></Phonepe_validation>
      <!--START >>  Show Ajax Spinner -->
      <div v-if="toggleAjaxLoadFilter || toggleAjaxLoadFilter1" class="fullscreen spinner-overlay">
        <q-spinner-bars class="absolute-center" style="color:#61116a" :size="35" />
      </div>
      <!--END >>  Show Ajax Spinner -->  
    <!-- </div> -->
  </q-page>
</template>

<script>
import { required, or } from '@vuelidate/validators';
import { mapGetters, mapActions } from 'vuex';

import downloadExcel from 'vue-json-excel';
import showMerchantTransactionLevelDetails from '../../components/sat/showMerchantTransactionLevelDetails.vue';
import generalLeadInformation from '../../components/generalLeadInformation.vue';
// import Phonepe_validation from '../../components/sat/Phonepe_validation.vue';

export default {
  name: 'getaggregatorLeadValidationData',
  

  components: {
    showMerchantTransactionLevelDetails,
    generalLeadInformation,
    // Phonepe_validation
},

  data() {
    return {
      propToggleLeadInformation: false,
      propRowDetails:"",
      propShowLeadNumberDetails: false,
      addtnLeadInformation: null,
      
      // paginationControl: {
      //   rowsPerPage: 10
      // },
      toggleAjaxLoadFilter: false,
            toggleAjaxLoadFilter1: false,

      paginationControl: {
        rowsNumber: 10,
        page: 1,
        sortBy: 'leadNumber',
        descending: false,
        rowsPerPage: 10
      },
      // paginationControl1: {
      //   rowsNumber: 10,
      //   page: 1,
      //   sortBy: 'tid',
      //   descending: false,
      //   rowsPerPage: 10
      // },
      tableData: [],
      valueToggleMerchantTransaction: false,
      filter: '',
      filter1:'',
      //table information
      columns: [
        {
          name: 'date',
          required: true,
          label: 'Date',
          align: 'left',
          field: 'date',
          sortable: false
        },
        {
            name: 'leadNumber',
            required: true,
          label: 'leadNumber',
          align: 'left',
          field: 'leadNumber',
          sortable: true
        },
        {
          name: 'leadId',
          required: true,
          label: 'Lead Id',
          align: 'left',
          field: 'leadId',
          sortable: false
        },
        {
            name: 'merchantName',
            required: true,
          label: 'Merchant Name',
          align: 'left',
          field: 'merchantName',
          sortable: false
        },
         {
          name: 'state',
          required: true,
          label: 'State',
          align: 'center',
          field: 'state',
          sortable: false
        },
          {
          name: 'salesOfficerName',
          required: true,
          label: 'SO Name',
          align: 'center',
          field: row => {
            return row.salesOfficerName+" | "+row.salesOfficerEmpId;
          },
          sortable: false
        },
        {
          name: "verifiedFinanceStatus",
          required: true,
          label: "Finance Approval",
          align: "left",
          field: row => {
            return row.verifiedFinanceStatus ==
              this.$VERIFIED_FINANCE_STATUS_SUCCESS
              ? "Success"
              : row.verifiedFinanceStatus ==
                this.$VERIFIED_FINANCE_STATUS_PENDING
              ? "Pending"
              : row.verifiedFinanceStatus ==
                this.$VERIFIED_FINANCE_STATUS_REJECT
              ? "Rejected"
              : "NA";
          },
          sortable: true
        },
        {
          name: 'leadStatus',
          required: true,
          label: 'Status',
          align: 'center',
          field:'leadStatus',
          sortable: true
        }
        //{
        //   name: 'leadNumber',
        //   required: true,
        //   label: 'Lead Number',
        //   align: 'center',
        //   field: 'leadNumber',
        //   sortable: true
        // }
      ],
      loading: true,
      filter_values: ''
    };
  },
  computed: {
    ...mapGetters('aggregatorLeadValidation', ['getaggregatorLeadValidationData']),
    // ...mapGetters('lostOrStolenDatas', ['getLostOrStolenDatas'])
  },
  mounted () {
    this.ajaxLoadAllLeadInfo({
      pagination: this.paginationControl,
      filter: this.filter
    });
  },
  methods: {
    ...mapActions('aggregatorLeadValidation', ['FETCH_AGGREGATOR_LEAD_VALIDATION_DATAS']),
    // ...mapActions('lostOrStolenDatas', ['FETCH_ALL_LOST_DEVICES_DATAS']),
    //  ...mapActions('InventoryCentral',['DOWNLOAD_lOST_OR_STOLEN_DATAS']),
    //Load all short lead info while page loading

    getLeadNumberDetails(rowDetails){
      this.propShowLeadNumberDetails =!this.propShowLeadNumberDetails;
      if(rowDetails != undefined){
        this.propRowDetails= rowDetails;
      }
    },
    ajaxLoadAllLeadInfo() {
      this.toggleAjaxLoadFilter = true;
      this.FETCH_AGGREGATOR_LEAD_VALIDATION_DATAS()
        .then(response => {
          this.toggleAjaxLoadFilter = false;
        })
        .catch(error => {
          this.toggleAjaxLoadFilter = false;
        });
    },
    ajaxLoadAllLeadInfo ({ pagination, filter }) {
      // we set QTable to "loading" state
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: 'purple-9',
        message: 'Fetching data ..'
      });
      this.FETCH_AGGREGATOR_LEAD_VALIDATION_DATAS({ pagination, filter })
        .then(res => {
          // updating pagination to reflect in the UI
          this.paginationControl = pagination;

          // we also set (or update) rowsNumber
          this.paginationControl.rowsNumber = this.getaggregatorLeadValidationData.totalElements;
          this.paginationControl.page = this.getaggregatorLeadValidationData.number + 1;

          // then we update the rows with the fetched ones
          this.tableData = this.getaggregatorLeadValidationData.content;
          console.log("TABLE DATA VALUES---------->",JSON.stringify(this.tableData))
          if (this.getaggregatorLeadValidationData.sort != null) {
            this.paginationControl.sortBy = this.getaggregatorLeadValidationData.sort[0].property;
            this.paginationControl.descending = this.getaggregatorLeadValidationData.sort[0].ascending;
          }

          // finally we tell QTable to exit the "loading" state
          this.$q.loading.hide();
          // console.log("Table Datas ---------------------->"+JSON.stringify(this.tableData));
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },
    additionalTid (reqData) {
      console.log('the request data ' + JSON.stringify(reqData))
      this.$q
        .dialog({
          title: 'Confirm',
          message: 'Are you sure want to Move Additional Tid?',
          ok: 'Continue',
          cancel: 'Cancel'
        })
        .then(() => {
          this.$q.loading.show({
            delay: 0, // ms
            spinnerColor: 'purple-9',
            message: 'Processing ..'
          })

        })
    },
    // Function to toggle lead information pop up screen
    toggleLeadInformation (leadDetails) {

      this.propToggleLeadInformation = !this.propToggleLeadInformation;
      if (leadDetails != undefined) {
        this.addtnLeadInformation = leadDetails;
      }
    },
  } 
};
</script>

<style>
</style>
