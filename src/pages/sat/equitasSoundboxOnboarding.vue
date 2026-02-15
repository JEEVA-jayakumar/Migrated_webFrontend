<template>
  <q-page>
    <!-- content -->
    <div
      class="col-md-12 text-h6 q-px-lg q-py-md text-weight-regular bottom-border text-grey-9 row justify-between items-center"
    >
      Equitas SoundBox Onboarding<q-btn
        no-caps
        label="Download Error Data"
        @click="downloadErrorData"
        class="common-dark-blue"
      />
    </div>

    <q-tabs
      v-model="selectedTab"
      class="shadow-1"
      color="grey-1"
      @select="goToUnassignedTab"
    >
      <q-tab
        default
        color="dark"
        name="unassigned"
        slot="title"
        label="Un Assigned"
      />
      <q-tab color="dark" name="assigned" slot="title" label="Assigned" />
      <!-- <q-tab color="dark" name="ReOpened" slot="title" label="ReOpenend" /> -->

      <q-tab color="dark" name="completed" slot="title" label="Completed" />

      <q-tab-panel name="unassigned">
        <q-card class="group q-pa-md">
          <div
            class="row items-center gutter-y-sm"
            style="display: flex; justify-content: space-between; width: 100%;"
          >
            <div
              class="col-md-3 col-sm-6 col-xs-6 text-grey-7 text-weight-medium"
              align="left"
            >
              <span class="q-display-2">{{
                formData.marsDeviceIdsCooked.length
              }}</span
              >/ selected
            </div>

            <div
              class="col-md-3 col-sm-6 col-xs-6"
              style="flex: 1;  max-width: 200px;"
              align="right"
            >
              <q-select
                filter
                clearable
                v-model="formData.assignTo.id"
                separator
                color="grey-9"
                :disable="
                  formData.marsDeviceIdsCooked.length == 0
                "
                :options="assignToOptions"
                placeholder="Assign To"
              />
            </div>
            <div
              class="col-md-3 col-sm-6 col-xs-6"
              style="flex: 1;  max-width: 200px;"
              align="right"
            >
              <q-select
                filter
                clearable
                v-model="formData.region"
                separator
                color="grey-9"
                :disable="
                  formData.marsDeviceIdsCooked.length == 0
                "
                :options="assignToRegionOptions"
                placeholder="Assign To Region"
              />
            </div>
            <div class="col-md-3 col-sm-6 col-xs-6" align="right">
              <q-btn
                no-caps
                label="Assign"
                @click="assignImplementationUser"
                class="common-dark-blue"
              />
            </div>
          </div>
        </q-card>
        <q-table
          :rows="tableData1"
          :columns="columnDataUnassigned"
          table-class="customTableClass"
          :filter="filterSearch1"
          selection="multiple"
          :selected="formData.marsDeviceIdsCooked"
          v-model:pagination="paginationControl1"
          row-key="id"
          :loading="tableAjaxLoading1"
          :rows-per-page-options="[5, 10, 15, 20]"
          color="dark"
          @request="ajaxLoadAllLeadInfo1"
        >
          <q-td
            v-slot:body-cell-leadNumber="props"
            :props="props"
            class="cursor-pointer"
          >
            <span class="label" :class="['text-primary']">{{
              props.row.qrLeadInformation.id
            }}</span>
          </q-td>
          <q-td v-slot:body-cell-merchantName="props" :props="props">
            {{
              props.row.qrLeadInformation.merchantName == null
                ? "NA"
                : props.row.qrLeadInformation.merchantName
            }}
          </q-td>
          <q-td v-slot:body-cell-contactEmail="props" :props="props">
            {{
              props.row.qrLeadInformation.contactEmail == null
                ? "NA"
                : props.row.qrLeadInformation.contactEmail
            }}
          </q-td>
          <q-td
            v-slot:body-cell-contactAddress="props"
            :props="props"
          >
            {{
              props.row.qrLeadInformation.contactAddress == null
                ? "NA"
                : props.row.qrLeadInformation.contactAddress
            }}
          </q-td>
          <q-td
            v-slot:body-cell-contactNumber="props"
            :props="props"
          >
            {{
              props.row.qrLeadInformation.contactNumber == null
                ? "NA"
                : props.row.qrLeadInformation.contactNumber
            }}
          </q-td>

          <q-td
            v-slot:body-cell-alternateContactNumber="props"
            :props="props"
          >
            {{
              props.row.qrLeadInformation.alternateContactNumber == null
                ? "NA"
                : props.row.qrLeadInformation.alternateContactNumber
            }}
          </q-td>
          <q-td v-slot:body-cell-pincode="props" :props="props">
            {{
              props.row.qrLeadInformation.pincode == null
                ? "NA"
                : props.row.qrLeadInformation.pincode
            }}
          </q-td>
          <q-td v-slot:body-cell-sim="props" :props="props">
            {{ props.row.sim == null ? "NA" : props.row.sim }}
          </q-td>

          <q-td v-slot:body-cell-tid="props" :props="props">
            {{ props.row.tid == null ? "NA" : props.row.tid }}
          </q-td>
          <q-td v-slot:body-cell-mid="props" :props="props">
            {{ props.row.mid == null ? "NA" : props.row.mid }}
          </q-td>
          <q-td v-slot:body-cell-vpa="props" :props="props">
            {{ props.row.vpa == null ? "NA" : props.row.vpa }}
          </q-td>
          <template slot="top">
            <!--START: table filter,search -->
            <div class="col-md-5">
              <q-input
                clearable
                color="grey-9"
                v-model="filterSearch1"
                placeholder="Type.."
                float-label="Search By Mob No, VPA, Merchant Name"
                class="q-mr-lg q-py-sm"
              />
            </div>
            <!--ENDv-model: table filter,search -->
          </template>
        </q-table>
      </q-tab-panel>
      <q-tab-panel name="assigned">
        <!--START: table Data -->
        <q-table
          :rows="tableData"
          :columns="columnDataAssigned"
          table-class="customTableClass"
          :filter="filterSearch"
          :pagination="paginationControl"
          row-key="id"
          :loading="tableAjaxLoading"
          :rows-per-page-options="[5, 10, 15, 20]"
          color="dark"
          @request="ajaxLoadAllLeadInfo"
        >
          <!-- selection="multiple" -->
          <q-td
            v-slot:body-cell-leadNumber="props"
            :props="props"
            class="cursor-pointer"
          >
            <span class="label" :class="['text-primary']">{{
              props.row.qrLeadInformation.id
            }}</span>
          </q-td>
          <q-td v-slot:body-cell-merchantName="props" :props="props">
            {{
              props.row.qrLeadInformation.merchantName == null
                ? "NA"
                : props.row.qrLeadInformation.merchantName
            }}
          </q-td>
          <q-td v-slot:body-cell-contactEmail="props" :props="props">
            {{
              props.row.qrLeadInformation.contactEmail == null
                ? "NA"
                : props.row.qrLeadInformation.contactEmail
            }}
          </q-td>
          <q-td
            v-slot:body-cell-contactAddress="props"
            :props="props"
          >
            {{
              props.row.qrLeadInformation.contactAddress == null
                ? "NA"
                : props.row.qrLeadInformation.contactAddress
            }}
          </q-td>
          <q-td
            v-slot:body-cell-contactNumber="props"
            :props="props"
          >
            {{
              props.row.qrLeadInformation.contactNumber == null
                ? "NA"
                : props.row.qrLeadInformation.contactNumber
            }}
          </q-td>

          <q-td
            v-slot:body-cell-alternateContactNumber="props"
            :props="props"
          >
            {{
              props.row.qrLeadInformation.alternateContactNumber == null
                ? "NA"
                : props.row.qrLeadInformation.alternateContactNumber
            }}
          </q-td>
          <q-td v-slot:body-cell-assignedTo="props" :props="props">
            {{
              props.row.assignedTo.name == null
                ? "NA"
                : props.row.assignedTo.name
            }}
          </q-td>
          <q-td v-slot:body-cell-pincode="props" :props="props">
            {{
              props.row.qrLeadInformation.pincode == null
                ? "NA"
                : props.row.qrLeadInformation.pincode
            }}
          </q-td>
          <q-td v-slot:body-cell-sim="props" :props="props">
            {{ props.row.sim == null ? "NA" : props.row.sim }}
          </q-td>

          <q-td v-slot:body-cell-tid="props" :props="props">
            {{ props.row.tid == null ? "NA" : props.row.tid }}
          </q-td>
          <q-td v-slot:body-cell-mid="props" :props="props">
            {{ props.row.mid == null ? "NA" : props.row.mid }}
          </q-td>
          <q-td v-slot:body-cell-vpa="props" :props="props">
            {{ props.row.vpa == null ? "NA" : props.row.vpa }}
          </q-td>

          <q-td v-slot:body-cell-action="props" :props="props">
            <q-btn
              highlight
              push
              class="q-mx-sm"
              color="positive"
              size="sm"
              @click="fnReassignData(props.row)"
              >Re-Assign</q-btn
            >
          </q-td>
          <template slot="top">
            <!--START: table filter,search -->
            <div class="col-md-5">
              <q-input
                clearable
                color="grey-9"
                v-model="filterSearch"
                placeholder="Type.."
                float-label="Search By Mob No, VPA, Merchant Name"
                class="q-mr-lg q-py-sm"
              />
            </div>
          </template>
        </q-table>
        <!--ENDv-model: table Data -->
      </q-tab-panel>
      <q-tab-panel name="completed">
        <q-table
          :rows="tableData2"
          :columns="completed"
          table-class="customTableClass"
          :filter="filterSearch2"
          :selected="formData.marsDeviceIdsCooked"
          v-model:pagination="paginationControl2"
          row-key="id"
          :loading="tableAjaxLoading2"
          :rows-per-page-options="[5, 10, 15, 20]"
          color="dark"
          @request="ajaxLoadAllLeadInfo2"
        >
          <q-td
            v-slot:body-cell-leadNumber="props"
            :props="props"
            class="cursor-pointer"
          >
            <span class="label" :class="['text-primary']">{{
              props.row.qrLeadInformation.id
            }}</span>
          </q-td>
          <q-td v-slot:body-cell-merchantName="props" :props="props">
            {{
              props.row.qrLeadInformation.merchantName == null
                ? "NA"
                : props.row.qrLeadInformation.merchantName
            }}
          </q-td>
          <q-td v-slot:body-cell-contactEmail="props" :props="props">
            {{
              props.row.qrLeadInformation.contactEmail == null
                ? "NA"
                : props.row.qrLeadInformation.contactEmail
            }}
          </q-td>
          <q-td
            v-slot:body-cell-contactAddress="props"
            :props="props"
          >
            {{
              props.row.qrLeadInformation.contactAddress == null
                ? "NA"
                : props.row.qrLeadInformation.contactAddress
            }}
          </q-td>
          <q-td
            v-slot:body-cell-contactNumber="props"
            :props="props"
          >
            {{
              props.row.qrLeadInformation.contactNumber == null
                ? "NA"
                : props.row.qrLeadInformation.contactNumber
            }}
          </q-td>

          <q-td
            v-slot:body-cell-alternateContactNumber="props"
            :props="props"
          >
            {{
              props.row.qrLeadInformation.alternateContactNumber == null
                ? "NA"
                : props.row.qrLeadInformation.alternateContactNumber
            }}
          </q-td>
          <q-td v-slot:body-cell-state="props" :props="props">
            {{
              props.row.qrLeadInformation.merchantStateName == null
                ? "NA"
                : props.row.qrLeadInformation.merchantStateName
            }}
          </q-td>
          <q-td v-slot:body-cell-city="props" :props="props">
            {{
              props.row.qrLeadInformation.merchantDistrictName == null
                ? "NA"
                : props.row.qrLeadInformation.merchantDistrictName
            }}
          </q-td>
          <q-td v-slot:body-cell-pincode="props" :props="props">
            {{
              props.row.qrLeadInformation.pincode == null
                ? "NA"
                : props.row.qrLeadInformation.pincode
            }}
          </q-td>
          <q-td v-slot:body-cell-vpa="props" :props="props">
            {{ props.row.vpa == null ? "NA" : props.row.vpa }}
          </q-td>
          <q-td v-slot:body-cell-updatedAt="props" :props="props">
            {{
              props.row.qrLeadInformation.updatedAt == null
                ? "NA"
                : props.row.qrLeadInformation.updatedAt
            }}
          </q-td>
          <q-td v-slot:body-cell-equitasLat="props" :props="props">
            {{
              props.row.qrLeadInformation.equitasLat == null
                ? "NA"
                : props.row.qrLeadInformation.equitasLat
            }}
          </q-td>
          <q-td v-slot:body-cell-equitasLan="props" :props="props">
            {{
              props.row.qrLeadInformation.equitasLan == null
                ? "NA"
                : props.row.qrLeadInformation.equitasLan
            }}
          </q-td>
          <template slot="top">
            <div class="col-md-5">
              <q-input
                color="grey-9"
                v-model="filterSearch2"
                placeholder="Type.."
                float-label="Search By Merchant Name"
                class="q-mr-lg q-py-sm"
              />
            </div>
            <div class="col-md-5"></div>
            <div class="col-md-2" align="right">
              <q-btn
                no-caps
                label="Download"
                @click="downloadCompletedData"
                class="common-dark-blue"
              />
            </div>
          </template>
        </q-table>
        <!--END: table Data -->
      </q-tab-panel>
    </q-tabs>
    <div class="row items-center gutter-y-sm">
      <div class="col-md-9 col-sm-12 col-xs-12">
        <div class="row items-center"></div>
      </div>
    </div>
    <equitasReassign
      v-if="propShowReassign"
      :propShowReassign="propShowReassign"
      :propRowDetails="propRowDetails"
      @emitfnshowUpdateOpenedExternal="fnReassignData"
    ></equitasReassign>
  </q-page>
</template>
<script>
import {
  required,
  requiredIf,
  email,
  minLength,
  maxLength,
  alpha,
  alphaNum,
  numeric,
} from "@vuelidate/validators";
import { mapGetters, mapActions } from "vuex";
import { nullableTypeAnnotation } from "babel-types";
import equitasReassign from "../../components/sat/equitasReassign.vue";
export default {
  name: "equitasSoundboxOnboarding",
  components: {
    equitasReassign,
  },
  data() {
    return {
      filterSearch1: "",
      filterSearch: "",
      filterSearch2: "",
      tableAjaxLoading1: false,
      tableAjaxLoading: false,
      tableAjaxLoading2: false,
      selectedTab: "assigned",
      propShowReassign: false,
      formData: {
        marsDeviceIdsCooked: [],
        marsDeviceIdsCookedUnAssinged: [],
        triggerWelcomeMail: false,
        assignTo: {
          id: "",
        },
        region: "",
      },
      tableData1: [],
      tableData: [],
      tableData2: [],
      assignToOptions: [],
      assignToRegionOptions: [],
      paginationControl1: {
        sortBy: "createdAt", // String, column "name" property value
        descending: false,
        page: 1,
        rowsPerPage: 10, // current rows per page being displayed
      },
      paginationControl: {
        sortBy: "createdAt", // String, column "name" property value
        descending: false,
        page: 1,
        rowsPerPage: 10, // current rows per page being displayed
      },
      paginationControl2: {
        sortBy: "createdAt", // String, column "name" property value
        descending: false,
        page: 1,
        rowsPerPage: 10, // current rows per page being displayed
      },

      columnDataUnassigned: [
        {
          name: "leadNumber",
          required: true,
          label: "Lead Id",
          align: "left",
          field: "leadNumber",
          sortable: false,
        },
        {
          name: "merchantName",
          required: true,
          label: "Merchant Name",
          align: "left",
          field: "merchantName",
          sortable: false,
        },
        {
          name: "contactEmail",
          required: true,
          label: "Merchant Email",
          align: "left",
          field: "contactEmail",
          sortable: false,
        },
        {
          name: "contactAddress",
          required: true,
          label: "Merchant Address",
          align: "left",
          field: "contactAddress",
          sortable: false,
        },
        {
          name: "contactNumber",
          required: true,
          label: "Merchant Number",
          align: "left",
          field: "contactNumber",
          sortable: false,
        },
        {
          name: "alternateContactNumber",
          required: true,
          label: "Alternate Number",
          align: "left",
          field: "alternateContactNumber",
          sortable: false,
        },
        {
          name: "pincode",
          required: true,
          label: "Merchant Pincode",
          align: "left",
          field: "pincode",
          sortable: false,
        },
        {
          name: "sim",
          required: true,
          label: "Sim No",
          align: "left",
          field: "sim",
          sortable: false
        },

        {
          name: "tid",
          required: true,
          label: "TID",
          align: "left",
          field: row => {
            return row.tid;
          },
          sortable: false
        },
        {
          name: "mid",
          required: true,
          label: "MID",
          align: "left",
          field: row => {
            return row.mid;
          },
          sortable: false
        },

        {
          name: "vpa",
          required: true,
          label: "VPA",
          align: "left",
          field: row => {
            return row.vpa;
          },
          sortable: false
        }
      ],
      columnDataAssigned: [
        {
          name: "leadNumber",
          required: true,
          label: "Lead Id",
          align: "left",
          field: "leadNumber",
          sortable: false
        },
        {
          name: "merchantName",
          required: true,
          label: "Merchant Name",
          align: "left",
          field: "merchantName",
          sortable: false
        },
        {
          name: "contactEmail",
          required: true,
          label: "Merchant Email",
          align: "left",
          field: "contactEmail",
          sortable: false
        },
        {
          name: "contactAddress",
          required: true,
          label: "Merchant Address",
          align: "left",
          field: "contactAddress",
          sortable: false
        },
        {
          name: "contactNumber",
          required: true,
          label: "Merchant Number",
          align: "left",
          field: "contactNumber",
          sortable: false
        },
        {
          name: "alternateContactNumber",
          required: true,
          label: "Alternate Number",
          align: "left",
          field: "alternateContactNumber",
          sortable: false
        },
        {
          name: "assignedTo",
          required: true,
          label: "SO Name",
          align: "left",
          field: "assignedTo",
          sortable: false
        },

        {
          name: "pincode",
          required: true,
          label: "Merchant Pincode",
          align: "left",
          field: "pincode",
          sortable: false
        },
        {
          name: "sim",
          required: true,
          label: "Sim No",
          align: "left",
          field: "sim",
          sortable: false
        },

        {
          name: "tid",
          required: true,
          label: "TID",
          align: "left",
          field: row => {
            return row.tid;
          },
          sortable: false
        },
        {
          name: "mid",
          required: true,
          label: "MID",
          align: "left",
          field: row => {
            return row.mid;
          },
          sortable: false
        },

        {
          name: "vpa",
          required: true,
          label: "VPA",
          align: "left",
          field: row => {
            return row.vpa;
          },
          sortable: false
        },
        {
          name: "action",
          required: true,
          label: "Re-Assign",
          align: "center",
          field: "action",
          sortable: false
        }
      ],
      completed: [
        {
          name: "leadNumber",
          required: true,
          label: "Lead Id",
          align: "left",
          field: "leadNumber",
          sortable: false
        },
        {
          name: "merchantName",
          required: true,
          label: "Merchant Name",
          align: "left",
          field: "merchantName",
          sortable: false
        },
        {
          name: "contactEmail",
          required: true,
          label: "Merchant Email",
          align: "left",
          field: "contactEmail",
          sortable: false
        },
        {
          name: "contactNumber",
          required: true,
          label: "Merchant Number",
          align: "left",
          field: "contactNumber",
          sortable: false
        },
        {
          name: "alternateContactNumber",
          required: true,
          label: "Alternate Number",
          align: "left",
          field: "alternateContactNumber",
          sortable: false
        },
        {
          name: "state",
          required: true,
          label: "State",
          align: "left",
          field: "state",
          sortable: false
        },
        {
          name: "city",
          required: true,
          label: "City",
          align: "left",
          field: "city",
          sortable: false
        },
        {
          name: "pincode",
          required: true,
          label: "Pincode",
          align: "left",
          field: "pincode",
          sortable: false
        },
        {
          name: "contactAddress",
          required: true,
          label: "Address",
          align: "left",
          field: "contactAddress",
          sortable: false
        },
        {
          name: "vpa",
          required: true,
          label: "VPA",
          align: "left",
          field: "vpa",
          sortable: false
        },
        {
          name: "updatedAt",
          required: true,
          label: "Implementation Date",
          align: "left",
          field: "updatedAt",
          sortable: false
        },
        {
          name: "equitasLat",
          required: true,
          label: "Lat",
          align: "left",
          field: "equitasLat",
          sortable: false
        },
        {
          name: "equitasLan",
          required: true,
          label: "Lan",
          align: "left",
          field: "equitasLan",
          sortable: false
        }
      ]
    };
  },

  computed: {
    ...mapGetters("ImplementationExecutive", [
      "getImplementationExecutiveList",
      "getRegionList"
    ]),
    ...mapGetters("DeviceReplacement", [
      "getEquitasQueueAssignedList",
      "getEquitasQueueUnAssignedList",
      "getEquitasQueueCompletedList"
    ]),
    ...mapGetters("SuperAdminUsers", ["getAllStatesData"])
  },
  created() {
    this.ajaxLoadAllLeadInfo1({
      pagination: this.paginationControl1,
      filter: this.filterSearch1
    });
    this.ajaxLoadAllLeadInfo2({
      pagination: this.paginationControl2,
      filter: this.filterSearch2
    });
  },

  methods: {
    ...mapActions("DeviceReplacement", [
      "EQUITAS_ONBOARDING_QUEUE_ASSIGNED_LIST",
      "EQUITAS_ONBOARDING_QUEUE_UNASSIGNED_LIST",
      "EQUITAS_SOUNDBOX_REQUEST_UNASSIGED_TO_ASSIGNED_STATE",
      "EQUITAS_ONBOARDING_QUEUE_COMPLETED_LIST",
      "EQUITAS_ONBOARDING_REQUEST_TO_ASSIGNED_REGION"
    ]),
    ...mapActions("ImplementationExecutive", [
      "IMPLEMENTATION_EXECUTIVE_LIST",
      "REGION_LIST"
    ]),
    ...mapActions("staticQrDownloads", [
      "DOWNLOAD_ERROR_DATA",
      "DOWNLOAD_COMPLETED_DATA"
    ]),

    ajaxLoadAllLeadInfo1({ pagination, filter }) {
      // we set QTable to "loading" state
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data .."
      });
      this.EQUITAS_ONBOARDING_QUEUE_UNASSIGNED_LIST({
        pagination,
        filter
      })
        .then(res => {
          this.IMPLEMENTATION_EXECUTIVE_LIST().then(response => {
            let assumeArr = [];
            this.getImplementationExecutiveList.map(function(value) {
              assumeArr.push({
                label:
                  value.name + " | " + value.employeeID + " | " + value.email,
                value: value.id
              });
            });
            this.assignToOptions = assumeArr;
          });
          this.REGION_LIST().then(response => {
            let assumeArrData = [];
            this.getRegionList.map(function(value) {
              assumeArrData.push({
                label: value.regionAreaName,
                value: value.code
              });
            });

            this.assignToRegionOptions = assumeArrData;
          });
          // updating pagination to reflect in the UI
          this.paginationControl1 = pagination;

          // we also set (or update) rowsNumber
          this.paginationControl1.rowsNumber = this.getEquitasQueueUnAssignedList.totalElements;
          this.paginationControl1.page =
            this.getEquitasQueueUnAssignedList.number + 1;

          // then we update the rows with the fetched ones
          this.tableData1 = this.getEquitasQueueUnAssignedList.content;
          console.log("TABLE EQUITAS", this.tableData1);
          if (this.getEquitasQueueUnAssignedList.sort != null) {
            this.paginationControl1.sortBy = this.getEquitasQueueUnAssignedList.sort[0].property;
            this.paginationControl1.descending = this.getEquitasQueueUnAssignedList.sort[0].ascending;
          } else {
            this.paginationControl1.sortBy = "createdAt";
            this.paginationControl1.descending = !this.paginationControl1
              .descending;
          }
          // finally we tell QTable to exit the "loading" state
          this.$q.loading.hide();
        })
        .catch(error => {
          this.$q.loading.hide();
          let errorMessage = "Please TryAgain";
          // Try to get readable error message from common locations
          if (error && error.message) {
            errorMessage = error.message;
          } else if (error && error.status === 404) {
            this.tableData1 = [];
            errorMessage = "No Data Found";
          }

          this.$q.notify({
            color: "negative",
            position: "bottom",
            message: errorMessage,
            icon: "thumb_down"
          });
        });
    },
    ajaxLoadAllLeadInfo({ pagination, filter }) {
      // we set QTable to "loading" state
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data .."
      });
      this.EQUITAS_ONBOARDING_QUEUE_ASSIGNED_LIST({ pagination, filter })
        .then(res => {
          // updating pagination to reflect in the UI
          this.paginationControl = pagination;

          // we also set (or update) rowsNumber
          this.paginationControl.rowsNumber = this.getEquitasQueueAssignedList.totalElements;
          this.paginationControl.page =
            this.getEquitasQueueAssignedList.number + 1;

          // then we update the rows with the fetched ones
          this.tableData = this.getEquitasQueueAssignedList.content;

          if (this.getEquitasQueueAssignedList.sort != null) {
            this.paginationControl.sortBy = this.getEquitasQueueAssignedList.sort[0].property;
            this.paginationControl.descending = this.getEquitasQueueAssignedList.sort[0].ascending;
          }
          // finally we tell QTable to exit the "loading" state
          this.$q.loading.hide();
        })
        .catch(error => {
          this.$q.loading.hide();
          let errorMessage = "Please TryAgain";
          // Try to get readable error message from common locations
          if (error && error.message) {
            errorMessage = error.message;
          } else if (error && error.status === 404) {
            this.tableData = [];
            errorMessage = "No Data Found";
          }

          this.$q.notify({
            color: "negative",
            position: "bottom",
            message: errorMessage,
            icon: "thumb_down"
          });
        });
    },
    ajaxLoadAllLeadInfo2({ pagination, filter }) {
      this.$q.loading.show({
        delay: 0,
        spinnerColor: "purple-9",
        message: "Fetching data .."
      });
      this.EQUITAS_ONBOARDING_QUEUE_COMPLETED_LIST({ pagination, filter })
        .then(res => {
          this.paginationControl = pagination;

          this.paginationControl.rowsNumber = this.getEquitasQueueCompletedList.totalElements;
          this.paginationControl.page =
            this.getEquitasQueueCompletedList.number + 1;

          this.tableData2 = this.getEquitasQueueCompletedList.content;
          if (this.getEquitasQueueCompletedList.sort != null) {
            this.paginationControl.sortBy = this.getEquitasQueueCompletedList.sort[0].property;
            this.paginationControl.descending = this.getEquitasQueueCompletedList.sort[0].ascending;
          }

          this.$q.loading.hide();
        })
        .catch(error => {
          this.$q.loading.hide();

          let errorMessage = "Please TryAgain";

          // Try to get readable error message from common locations
          if (error && error.message) {
            errorMessage = error.message;
          } else if (error && error.status === 404) {
            this.tableData2 = [];
            errorMessage = "No Data Found";
          }

          this.$q.notify({
            color: "negative",
            position: "bottom",
            message: errorMessage,
            icon: "thumb_down"
          });
        });
    },
    goToUnassignedTab(tab) {
      if (tab == "unassigned") {
        let request = {
          pagination: this.paginationControl1,
          filter: this.filterSearch1
        };
        this.toggleAjaxLoadFilter = true;
        this.EQUITAS_ONBOARDING_QUEUE_UNASSIGNED_LIST(request)
          .then(response => {
            this.toggleAjaxLoadFilter = false;
          })
          .catch(error => {
            this.toggleAjaxLoadFilter = false;
          });
        this.ajaxLoadAllLeadInfo1({
          pagination: this.paginationControl1,
          filter: this.filterSearch1
        });
      } else if (tab == "assigned") {
        this.ajaxLoadAllLeadInfo({
          pagination: this.paginationControl,
          filter: this.filterSearch
        });
      } else {
        this.ajaxLoadAllLeadInfo2({
          pagination: this.paginationControl2,
          filter: this.filterSearch2
        });
      }
    },
    fnReassignData(rowDetails) {
      this.propShowReassign = !this.propShowReassign;
      this.ajaxLoadAllLeadInfo({
        pagination: this.paginationControl,
        filter: this.filterSearch
      });
      // eslint-disable-next-line eqeqeq
      if (rowDetails != undefined) {
        this.propRowDetails = rowDetails;
      }
    },
    assignImplementationUser() {
      let self = this;
      if (self.formData.marsDeviceIdsCooked.length == 0) {
        self.$q.notify({
          color: "negative",
          position: "bottom",
          message: "Select atleast one item to assign",
          icon: "thumb_down"
        });
      } else if (self.formData.assignTo == "") {
        self.$q.notify({
          color: "negative",
          position: "bottom",
          message: "Request Mode cannot be empty!",
          icon: "thumb_down"
        });
      } else if (
        self.formData.assignTo.id != null &&
        (self.formData.region == null || self.formData.region == "")
      ) {
        this.$q.loading.show({
          delay: 100, // ms
          spinnerColor: "purple-9",
          message: "Please wait.."
        });

        let marsDeviceIdsCooked = [];
        self.formData.marsDeviceIdsCooked.map(function(value) {
          marsDeviceIdsCooked.push(value.id);
        });
        let postValues = {
          // action: this.$MARS_DEVICE_STATUS_SAT_ASSIGNED,
          userId: this.formData.assignTo.id,
          marsDeviceIds: {
            marsDeviceIds: marsDeviceIdsCooked
          }
        };
        console.log("check Payload", postValues);
        self
          .EQUITAS_SOUNDBOX_REQUEST_UNASSIGED_TO_ASSIGNED_STATE(postValues)
          .then(res => {
            if (res.status == 200) {
              this.formData.marsDeviceIdsCooked = [];
              this.formData.assignTo = "";
              this.$q.notify({
                color: "positive",
                position: "bottom",
                message: "Successfully assigned!",
                icon: "thumb_up"
              });
              this.$q.loading.hide();
              this.ajaxLoadAllLeadInfo1({
                pagination: this.paginationControl1,
                filter: this.filterSearch1
              });
            } else {
              self.$q.notify({
                color: "negative",
                position: "bottom",
                message: "INTERNAL SERVER ERROR !!",
                icon: "thumb_down"
              });
              this.$q.loading.hide();
            }
          })
          .catch(() => {
            self.$q.notify({
              color: "negative",
              position: "bottom",
              message: "Please try again",
              icon: "thumb_down"
            });
            this.$q.loading.hide();
          });
        this.$q.loading.hide();
      } else if (
        self.formData.region != null &&
        (self.formData.assignTo.id == null || self.formData.assignTo.id == "")
      ) {
        this.$q.loading.show({
          delay: 100, // ms
          spinnerColor: "purple-9",
          message: "Please wait.."
        });
        console.log("regionCode", self.formData.region);
        let marsDeviceIdsCooked = [];
        self.formData.marsDeviceIdsCooked.map(function(value, index) {
          marsDeviceIdsCooked.push(value.id);
        });
        let data = {
          regionCode: self.formData.region,
          marsDeviceIds: {
            marsDeviceIds: marsDeviceIdsCooked
          }
        };
        self
          .EQUITAS_ONBOARDING_REQUEST_TO_ASSIGNED_REGION(data)
          .then(res => {
            if (res.status == 200) {
              this.formData.marsDeviceIdsCooked = [];
              this.formData.assignTo = "";
              this.$q.notify({
                color: "positive",
                position: "bottom",
                message: res.body.data,
                icon: "thumb_up"
              });
              this.$q.loading.hide();
              this.ajaxLoadAllLeadInfo1({
                pagination: this.paginationControl1,
                filter: this.filterSearch1
              });
            } else {
              self.$q.notify({
                color: "negative",
                position: "bottom",
                message: res.body.data,
                icon: "thumb_down"
              });
              this.$q.loading.hide();
            }
          })

          .catch(error => {
            self.$q.notify({
              color: "negative",
              position: "bottom",
              message: error.body.data,
              icon: "thumb_down"
            });
            this.$q.loading.hide();
          });

        this.$q.loading.hide();
      } else if (
        self.formData.assignTo.id != null &&
        self.formData.region != null
      ) {
        self.$q.notify({
          color: "negative",
          position: "bottom",
          message: "Select Only One Request mode",
          icon: "thumb_down"
        });
      } else {
        self.$q.notify({
          color: "negative",
          position: "bottom",
          message: "Select Any One Request mode",
          icon: "thumb_down"
        });
      }
    },
    downloadCompletedData() {
      this.$q.loading.show({
        delay: 100, // ms
        spinnerColor: "purple-9",
        message: "Please wait.."
      });
      this.DOWNLOAD_COMPLETED_DATA().then(response => {
        this.$q.loading.hide();

        this.$q.notify({
          color: "positive",
          position: "bottom",
          message: "Successfully Downloaded",
          icon: "thumb_up"
        });
      });
    },

    downloadErrorData() {
      this.$q.loading.show({
        delay: 100,
        spinnerColor: "purple-9",
        message: "Please wait..."
      });

      this.DOWNLOAD_ERROR_DATA()
        .then(response => {
          console.log("error res", response);
          this.$q.loading.hide();
          this.$q.notify({
            color: "positive",
            position: "bottom",
            message: "Successfully Downloaded",
            icon: "thumb_up"
          });
        })
        .catch(error => {
          this.$q.loading.hide();

          let errorMessage = "Download failed.";

          // Try to get readable error message from common locations
          if (error && error.message) {
            errorMessage = error.message;
          } else if (error && error.status === 404) {
            errorMessage = "No Data Found";
          }

          this.$q.notify({
            color: "negative",
            position: "bottom",
            message: errorMessage,
            icon: "thumb_down"
          });
        });
    }
  }
};
</script>
