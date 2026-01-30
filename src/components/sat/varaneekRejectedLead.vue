<template>
  <q-page>
    <!-- content -->
    <div>
      <generalLeadInformation
        v-if="propToggleLeadInformation"
        :leadInformation="addtnLeadInformation"
        :propToggleLeadInformationPop="propToggleLeadInformation"
        @closeLeadInformation="toggleLeadInformation"
      />
      <!--END: table Footer -->
        <q-tab-pane name="rejectedTab">
          <q-table
            :data="tableData"
            :columns="columnData"
            table-class="customTableClass"
            :filter="filterSearch"
            :pagination.sync="paginationControl"
            :selected.sync="formData.marsDeviceIdsCookedUnAssinged"
            row-key="id"
            :loading="tableAjaxLoading"
            :rows-per-page-options="[10,20,50,100,150,200]"
            color="dark"
            @request="ajaxLoadAllLeadInfo"
          >
            <q-td
              slot="body-cell-leadNumber"
              slot-scope="props"
              :props="props"
              class="cursor-pointer"
              @click.native="toggleLeadInformation(props.row.leadNumber)"
            >
              <span class="label text-primary"
                ># {{ props.row.leadNumber }}</span
              >
            </q-td>
            <q-td
              slot="body-cell-submitToMarsDate"
              slot-scope="props"
              :props="props"
              >{{
                props.row.submitToMarsDate | moment("Do MMM Y")
              }}</q-td
            >
            <template slot="top" slot-scope="props">
              <div class="col-md-5">
                <q-search
                  clearable
                  color="grey-9"
                  v-model="filterSearch"
                  placeholder="Type.."
                  float-label="Search By Lead Number"
                  class="q-mr-lg q-py-sm"
                />
              </div>
            </template>
          </q-table>
        </q-tab-pane>
      <!--END: table Footer -->
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import generalLeadInformation from "../../components/generalLeadInformation.vue";

export default {
  name: "varaneekImplementationQueue",
  components: {
    generalLeadInformation
  },
  data() {
    return {
      propToggleLeadInformation: false,
      addtnLeadInformation: null,

      filterSearch: "",
      selectedTab: "rejectedTab",
      assignToOptions: [],
      tableData: [],
      //Defining columns for table
      columnData: [
        {
          name: "leadNumber",
          required: true,
          label: "Lead Number",
          align: "left",
          field: row => {
            return row.leadNumber;
          },
          sortable: false
        },
        {
          name: "submitToMarsDate",
          required: true,
          label: "Date of Submission",
          align: "left",
          field: row => {
            return row.submitToMarsDate;
          },
          format: val => `${val}|moment("Do MMM Y")`,
          sortable: true
        },
        {
          name: "leadInformation",
          required: true,
          label: "Device Type",
          align: "left",
          field: row => {
            return row.device == null ?  "NA" :row.device.deviceName;
          },
          sortable: false
        },
        {
          name: "rejectedAt",
          required: true,
          label: "Rejected At",
          align: "left",
          field: row => {
            return row.marsReason == null ?  "NA" :row.marsReason;
          },
          sortable: false
        },
        {
          name: "reason",
          required: true,
          label: "Reason",
          align: "left",
          field: row => {
            return row.marsReason == null ?  "NA" :row.marsReason;
          },
          sortable: false
        },
      ],
      currentDeviceInfo: {},
      showDeviceAddressModal: false,
      formData: {
        marsDeviceIdsCooked: [],
        marsDeviceIdsCookedUnAssinged: [],
      },
      paginationControl: {        
        sortBy: "createdAt", // String, column "name" property value
        descending: false,
        page: 1,
        rowsPerPage: 10 // current rows per page being displayed
      },
      tableAjaxLoading: false,
    };
  },
  computed: {
    ...mapGetters("varaneekImplementationQueue", [
      "getrejectStatusList"
    ]),
    ...mapGetters("ImplementationExecutive", [
      "getImplementationExecutiveList"
    ]),
    ...mapGetters("SuperAdminUsers", ["getAllStatesData"])
  },
  created() {
    this.ajaxLoadAllLeadInfo({
      pagination: this.paginationControl,
      filter: this.filterSearch
    });
    this.getPincodeInformations();
  },
  methods: {
    ...mapActions("varaneekImplementationQueue", [
      "REJECT_STATUS_LIST"
    ]),
    ...mapActions("ImplementationExecutive", ["IMPLEMENTATION_EXECUTIVE_LIST"]),
    ...mapActions("SuperAdminUsers", ["FETCH_ALL_STATES_DATA"]),

    getPincodeInformations() {
      this.FETCH_ALL_STATES_DATA();
    },
    ajaxLoadAllLeadInfo({ pagination, filter }) {
      // we set QTable to "loading" state
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data .."
      });
      this.REJECT_STATUS_LIST({ pagination, filter })
        .then((response) => {
          this.IMPLEMENTATION_EXECUTIVE_LIST().then(response => {
            let assumeArr = [];
            this.getImplementationExecutiveList.map(function(value) {
              assumeArr.push({ label: value.name + " | " + value.employeeID+ " | " + value.email, value: value.id });
            });
            this.assignToOptions = assumeArr;
          });
          // updating pagination to reflect in the UI
          this.paginationControl = pagination;

          // we also set (or update) rowsNumber
          this.paginationControl.rowsNumber = this.getrejectStatusList.totalElements;
          this.paginationControl.page = this.getrejectStatusList.number + 1;

          // then we update the rows with the fetched ones
          this.tableData = this.getrejectStatusList.content;
          if (this.getrejectStatusList.sort != null) {
            this.paginationControl.sortBy = this.getrejectStatusList.sort[0].property;
            this.paginationControl.descending = this.getrejectStatusList.sort[0].ascending;
          }

          // finally we tell QTable to exit the "loading" state
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },

    // Function to open device address pop up
    UpdateDeviceAddress(currentDeviceInfo) {
      this.currentDeviceInfo = [];
      this.showDeviceAddressModal = !this.showDeviceAddressModal;
      if (this.formData.marsDeviceIdsCooked.length == 0) {
        let assumeObj = {
          id: [currentDeviceInfo.id],
          marsDeviceAddress: {
            deviceAddress: currentDeviceInfo.deviceAddress,
            latitude: 0,
            longitude: 0,
            pincode: currentDeviceInfo.pincode,
            city: currentDeviceInfo.city,
            state: currentDeviceInfo.state
          }
        };
        this.currentDeviceInfo = assumeObj;
      } else {
        let marsDeviceIdsCooked = [];
        this.formData.marsDeviceIdsCooked.map(function(value) {
          marsDeviceIdsCooked.push(value.id);
        });
        let assumeObj = {
          id: marsDeviceIdsCooked,
          marsDeviceAddress: {
            deviceAddress: currentDeviceInfo.deviceAddress,
            latitude: 0,
            longitude: 0,
            pincode: currentDeviceInfo.pincode,
            city: currentDeviceInfo.city,
            state: currentDeviceInfo.state
          }
        };
        this.currentDeviceInfo = assumeObj;
      }
    },
    // Function to open device address pop up
    UpdateDeviceAddressAfterEmit(pagination) {
      this.showDeviceAddressModal = !this.showDeviceAddressModal;
      this.paginationControl = pagination;
    },
    // Function to toggle lead information pop up screen
    toggleLeadInformation(leadDetails) {
      this.propToggleLeadInformation = !this.propToggleLeadInformation;
      if (leadDetails != undefined) {
        this.addtnLeadInformation = leadDetails;
      }
    }
  }
};
</script>

<style scoped>
.customTd {
  text-align: left !important;
  word-wrap: break-word;
  white-space: normal;
}
.customTd.customCellLength {
  min-width: 300px !important;
  overflow-x: auto;
}
</style>
