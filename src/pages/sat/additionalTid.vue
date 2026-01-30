<template>
  <q-page>
    <!-- <q-pull-to-refresh :handler="PullToRefresh" inline></q-pull-to-refresh> -->
      <!--START: table title -->
      <div
        class="col-md-12 q-title q-px-lg q-py-md text-weight-regular bottom-border text-grey-9"
      >Bijlipay Additional Terminals</div>
      
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
        :data="tableData"
        :columns="columns"
        :filter="filter"
        :pagination.sync="paginationControl"
        row-key="name"
        :loading="toggleAjaxLoadFilter"
        :rows-per-page-options="[5,10,15,20]"
        @request="ajaxLoadAllLeadInfo"
      >
       <!--START: table header -->
        <q-tr slot="top-row" slot-scope="props">
        <q-th v-for="col in props.columns" :key="col.name" :props="props">{{ col.label }}</q-th>  
        </q-tr>
        <!--END: table header -->
        <q-td slot="body-cell-mid" slot-scope="props" :props="props">
          <span class="label text-primary"># {{props.row.mid}}</span>
        </q-td>
        <q-td
          slot="body-cell-leadNumber"
          slot-scope="props"
          :props="props"
          class="cursor-pointer"
          @click.native="toggleLeadInformation(props.row.leadInformation)"
        >
          <span class="label text-primary"># {{props.row.leadInformation.leadNumber}}</span>
        </q-td>
        <q-td
          slot="body-cell-leadAddress"
          slot-scope="props"
          :props="props"
        >{{props.row.leadInformation == null? 'NA':props.row.leadInformation.leadAddress}}</q-td>
        <q-td slot="body-cell-action" slot-scope="props" :props="props">
           <q-btn
            highlight
            push
            class="q-mx-sm"
            color="positive"
            size="sm"
            @click="additionalTid(props.row)"
          >Additional TID</q-btn>
        </q-td>
        <template slot="top"  class="bottom-border" >
          <!--START: table filter,search,excel download -->
          <div class="col-5">
            <q-search
              clearable
              v-model="filter"
              separator
              color="grey-9"
              placeholder="Type.."
              float-label="Search Using MID"
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
      <div v-if="toggleAjaxLoadFilter || toggleAjaxLoadFilter1" class="fullscreen spinner-overlay">
        <q-spinner-bars class="absolute-center" style="color:#61116a" :size="35" />
      </div>
      <!--END >>  Show Ajax Spinner -->  
    <!-- </div> -->
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import downloadExcel from 'vue-json-excel';
import showMerchantTransactionLevelDetails from '../../components/sat/showMerchantTransactionLevelDetails.vue';
import generalLeadInformation from '../../components/generalLeadInformation.vue';

export default {
  name: 'getadditionalTid',
  

  components: {
    showMerchantTransactionLevelDetails,
    generalLeadInformation
    
  },

  data() {
    return {
      propToggleLeadInformation: false,
      addtnLeadInformation: null,
      
      // paginationControl: {
      //   rowsPerPage: 10
      // },
      toggleAjaxLoadFilter: false,
            toggleAjaxLoadFilter1: false,

      paginationControl: {
        rowsNumber: 10,
        page: 1,
        sortBy: 'tid',
        descending: false,
        rowsPerPage: 10
      },
      paginationControl1: {
        rowsNumber: 10,
        page: 1,
        sortBy: 'tid',
        descending: false,
        rowsPerPage: 10
      },
      tableData: [],
      valueToggleMerchantTransaction: false,
      filter: '',
      filter1:'',
      //table information
      columns: [
        {
          name: 'mid',
          required: true,
          label: 'MID',
          align: 'left',
          field: 'mid',
          sortable: true
        },
        {
          name: 'leadNumber',
          required: true,
          label: 'Lead Id',
          align: 'left',
          field: row => {
            row.leadInformation.leadNumber;
          },
          sortable: false
        },
        {
          name: 'leadAddress',
          required: true,
          label: 'Merchant Address',
          align: 'center',
          field: row => {
            row.leadInformation.leadAddress;
          },
          sortable: false
        },
        {
          name: 'action',
          required: true,
          label: '',
          align: 'center',
          field: 'action',
          sortable: true
        }
      ],
      loading: true,
      filter_values: ''
    };
  },
  computed: {
    ...mapGetters('additionalTid', ['getadditionalTid']),
    // ...mapGetters('lostOrStolenDatas', ['getLostOrStolenDatas'])
  },
  mounted () {
    this.ajaxLoadAllLeadInfo({
      pagination: this.paginationControl,
      filter: this.filter
    });
  },
  methods: {
    ...mapActions('additionalTid', ['FETCH_ADDITIONAL_TID_DATAS', 'ADDITIONAL_TID_VERIFY_DATA']),
    // ...mapActions('lostOrStolenDatas', ['FETCH_ALL_LOST_DEVICES_DATAS']),
    //  ...mapActions('InventoryCentral',['DOWNLOAD_lOST_OR_STOLEN_DATAS']),
    //Load all short lead info while page loading
    ajaxLoadAllLeadInfo() {
      this.toggleAjaxLoadFilter = true;
      this.FETCH_ADDITIONAL_TID_DATAS()
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
      this.FETCH_ADDITIONAL_TID_DATAS({ pagination, filter })
        .then(res => {
          // updating pagination to reflect in the UI
          this.paginationControl = pagination;

          // we also set (or update) rowsNumber
          this.paginationControl.rowsNumber = this.getadditionalTid.totalElements;
          this.paginationControl.page = this.getadditionalTid.number + 1;

          // then we update the rows with the fetched ones
          this.tableData = this.getadditionalTid.content;
          if (this.getadditionalTid.sort != null) {
            this.paginationControl.sortBy = this.getadditionalTid.sort[0].property;
            this.paginationControl.descending = this.getadditionalTid.sort[0].ascending;
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

          this.ADDITIONAL_TID_VERIFY_DATA(reqData)
            .then(() => {
              // this.ajaxLoadAllLeadInfo();
              this.$q.loading.hide();
               this.$router.push({name: "additionalTidform", params: {data: reqData}})
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
