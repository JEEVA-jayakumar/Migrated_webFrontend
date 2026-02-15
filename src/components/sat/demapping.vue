<template>
  <q-page>
    <div>
      <!--START: table title -->
      <div
        class="col-md-12 text-h6 q-px-lg q-py-md text-weight-regular bottom-border text-grey-9"
      >
        DE-Mapping
      </div>
      <!--END: table title -->
      <!-- //Common lead information in popup -->
      <generalLeadInformation
        v-if="propToggleLeadInformation"
        :leadInformation="addtnLeadInformation"
        :propToggleLeadInformationPop="propToggleLeadInformation"
        @closeLeadInformation="toggleLeadInformation"
      />
      <div class="side2">
      <div class="row items-center gutter-y-sm">
          <div class="col-md-3 col-sm-12 col-xs-12 text-grey-7 text-weight-medium" align="left">
            <span class="q-display-2">{{
              formData.marsDeviceIdsDemapping.length
            }}</span>/ selected
          </div>
          </div>
        </div>
      <!-- content -->
      <!--STARTv-model: table lead validation -->
      <q-table
        table-class="customTableClass"
        :rows="tableData"
        :columns="columns"
        :filter="filter"
        :pagination="paginationControl"
        selection="multiple"
        v-model:selected="formData.marsDeviceIdsDemapping"
        row-key="id"
        :loading="toggleAjaxLoadFilter"
        :rows-per-page-options="[5, 10, 15, 20, 25]"
        color="dark"
        @request="ajaxLoadAllLeadInfo"
      >
        <q-td
          v-slot:body-cell-leadNumber="props"
          :props="props"
          class="cursor-pointer"
          @click.native="toggleLeadInformation(props.row.leadInformation)"
        >
          <span class="label text-primary"
            ># {{ props.row.leadInformation.leadNumber }}</span
          >
        </q-td>

        <template slot="top">
          <!--START: table filter,search,excel download -->

          <div class="col-5">
            <q-input
              clearable
              v-model="filter"
              separator
              color="grey-9"
              placeholder="Type.."
              float-label="Search By Device Serial Number"
              class="q-mr-lg q-py-sm"
            />
          </div>
          <div class="side1">
            <q-btn
              no-caps
              :disabled="
                formData.marsDeviceIdsDemapping.length == 0
              "
              label="De-Mapping"
              class="common-dark-blue"
              @click="fnDemappingData"
            />
          </div>
        </template>
      </q-table>
      <!--END: table lead validation -->

      <!--START >>  demappingRemarks -->
      <demappingRemarks
        v-if="propShowUpdateDemapping"
        :propShowUpdateDemapping="propShowUpdateDemapping"
        :propRowDetails="propRowDetails"
        @emitfnshowUpdateDemapping="fnDemappingData"
      ></demappingRemarks>
      <!--END:  demappingRemarks-->

      <!--START >>  Show Ajax Spinner -->
      <div v-if="toggleAjaxLoadFilter" class="fullscreen spinner-overlay">
        <q-spinner-bars
          class="absolute-center"
          style="color:#61116a"
          :size="35"
        />
      </div>
      <!--END >>  Show Ajax Spinner -->
    </div>
  </q-page>
</template>

<script>
import { required, or } from '@vuelidate/validators';
import { mapGetters, mapActions } from "vuex";



import { date } from "quasar";
const today = new Date();
const { startOfDate, addToDate, subtractFromDate } = date;
import moment from "moment";
import generalLeadInformation from "../../components/generalLeadInformation.vue";
import demappingRemarks from "../../components/sat/demappingRemarks.vue";
export default {
  name: "merchantTransactionLevel",

  components: {
    generalLeadInformation,
    demappingRemarks
  },

  data() {
    return {
      propToggleLeadInformation: false,
      propMasterTrackerList: false,
      addtnLeadInformation: null,
      propShowUpdateDemapping: false,
      toggleAjaxLoadFilter: false,
      paginationControl: {
        rowsNumber: 10,
        page: 1,
        // sortBy: "deviceSerialNumber",
        rowsPerPage: 10
      },
      formData: {
        marsDeviceIdsDemapping: []
      },
      tableData: [],
      valueToggleMerchantTransaction: false,
      filter: "",
      //table information
      columns: [
        {
          name: "deviceSerialNumber",
          required: true,
          label: "Device Serial Number",
          align: "left",
          field: row => {
            return row.aggregatorRegionalInventory.serialNumber == null
              ? "NA"
              : row.aggregatorRegionalInventory.serialNumber;
          },
          sortable: false
        },
        {
          name: "deviceStatusDate",
          required: true,
          label: "Status",
          align: "left",
          field: row => {
            if (row.deviceStatus == 5) {
              return "Scanned Picked";
            } else {
              return "Scheduled for Deployment";
            }
            // return row.deviceStatus == null
            //   ? "NA"
            //   : row.deviceStatus;
          },
          sortable: false
        }
      ],
      loading: true,
      filter_values: ""
    };
  },

  computed: {
    ...mapGetters("deMapping", ["getdemappingStatusList"])
  },

  mounted() {
    this.ajaxLoadAllLeadInfo({
      pagination: this.paginationControl,
      filter: this.filter
    });
  },

  methods: {
    ...mapActions("deMapping", ["DEMAPPING_STATUS_LIST"]),

    ajaxLoadAllLeadInfo({ pagination, filter }) {
      // we set QTable to "loading" state
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data .."
      });
      this.DEMAPPING_STATUS_LIST({ pagination, filter })
        .then(res => {
          // updating pagination to reflect in the UI
          this.paginationControl = pagination;

          // we also set (or update) rowsNumber
          this.paginationControl.rowsNumber = this.getdemappingStatusList.totalElements;
          this.paginationControl.page = this.getdemappingStatusList.number + 1;

          // then we update the rows with the fetched ones
          this.tableData = this.getdemappingStatusList.content;
          if (this.getdemappingStatusList.sort != null) {
            this.paginationControl.sortBy = this.getdemappingStatusList.sort[0].property;
            this.paginationControl.descending = this.getdemappingStatusList.sort[0].ascending;
          }

          // finally we tell QTable to exit the "loading" state
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },
    
    toggleLeadInformation(leadDetails) {
      this.propToggleLeadInformation = !this.propToggleLeadInformation;
      if (leadDetails != undefined) {
        this.addtnLeadInformation = leadDetails;
      }
    },

    fnDemappingData() {
      let marsDeviceIdsDemapping = [];
      this.formData.marsDeviceIdsDemapping.map(function(value) {
        marsDeviceIdsDemapping.push(value.aggregatorRegionalInventory.id);
      });

      this.propShowUpdateDemapping = !this.propShowUpdateDemapping;
      
      if (marsDeviceIdsDemapping != undefined) {
        this.propRowDetails = marsDeviceIdsDemapping;
      }
      if (this.propShowUpdateDemapping == false) {
        this.ajaxLoadAllLeadInfo({
          pagination: this.paginationControl,
          filter: this.filter
        });
        this.formData.marsDeviceIdsDemapping =[];
      }
    }
  }
};
</script>
<style>
.btnalign {
  margin-left: 190px;
}

.side1 {
  margin-left: 170px;
}

.side2{
  margin-left: 20px;
}

</style>
