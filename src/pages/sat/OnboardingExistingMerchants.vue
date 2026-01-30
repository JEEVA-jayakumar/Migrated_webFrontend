<template>
  <q-page>
    <!-- content -->
    <q-card>
      <!-- <div
        class="col-md-12 q-title q-px-lg q-py-md text-weight-regular bottom-border text-grey-9"
      >
        <b><h1 style="font-size:18px;">UPLOAD CSV FILE</h1></b>
      </div> -->
      <div class="text-grey-9">
        <div class="row bottom-border q-pa-sm items-center">
          <div class="col">
            <q-tabs
              class="shadow-1"
              animated
              swipeable
              color="tertiary"
              align="justify"
            >
              <q-tab class="size1" label="UPLOAD CSV FILE" slot="title" />
              <div>
                <div class="q-pa-md">
                  <div class="row text-center justify-center">
                    <div class="col-md-8 q-py-md" align="center">
                      <div class="col-md-5 align1" align="center">
                        <a
                          href="statics/files/iciciExistingMerchantOnboardingTemplate.xlsx"
                          class="hide-underline"
                          >Click here to download the template</a
                        >
                      </div>
                      <div
                        v-if="formData.fileSelected.length == 0"
                        :class="[
                          uploaderHovered
                            ? 'toggleBulkUploadDisable'
                            : 'toggleBulkUploadActive'
                        ]"
                        class="drop display-inline align-center  cursor-pointer"
                        @dragover.prevent="dragAndDropCustomAnimate(true)"
                        @dragleave.prevent="dragAndDropCustomAnimate(false)"
                        @drop="onDrop"
                      >
                        <label
                          style="width: auto;"
                          class="btn display-inline cursor-pointer "
                        >
                          Drag & Drop Or Click Here To Open A File
                          <input
                            type="file"
                            name="image"
                            @change="onChange"
                            ref="deviceBulkUpload"
                            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                          />
                        </label>
                      </div>
                      <div v-else align="left">
                        <q-card dense class="q-pa-xs">
                          <q-card-title>
                            Uploaded File
                          </q-card-title>
                          <q-card-separator />
                          <q-card-main>
                            <q-item dense>
                              <q-item-side icon="attach_file" />
                              <q-item-main>{{
                                formData.fileSelected[0].name
                              }}</q-item-main>
                              <q-item-side></q-item-side>
                            </q-item>
                          </q-card-main>
                          <q-card-separator />
                          <q-card-actions align="end">
                            <q-btn
                              size="10px"
                              type="button"
                              color="negative"
                              @click="removeBulkUploadFile"
                              label="Remove"
                              icon="clear"
                            />
                          </q-card-actions>
                        </q-card>
                      </div>
                    </div>
                    <div class="col-md-12 group align2" align="center">
                      <q-btn
                        :disabled="
                          formData.fileSelected.length == 0 ? true : false
                        "
                        type="button"
                        class="common-dark-blue"
                        label="Submit"
                        @click="uploadFileForBulkUpload"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </q-tabs>
          </div>
        </div>
      </div>
    </q-card>
    <q-card>
      <div class="text-grey-9">
        <div class="row bottom-border q-pa-sm items-center">
          <div class="col">
            <q-tabs class="shadow-1" animated swipeable color="tertiary" align="justify" >
              <q-tab class="size1" label="Onboarding Existing Merchants" slot="title" />
              <q-card class="group q-pa-md" v-if="selectedTab == 'unAssigned'">
                <div class="row items-center gutter-y-sm">
                  <div
                    class="col-md-3 col-sm-12 col-xs-12 text-grey-7 text-weight-medium"
                    align="left"
                  >
                    <span class="q-display-2 size2">{{
                      formData.marsDeviceIdsCooked.length
                    }}</span>
                    / selected
                  </div>
                  <div class="col-md-3 col-sm-6 col-xs-6">
                    <q-select
                      filter
                      clearable
                      v-model="formData.assignTo"
                      :disable="
                        formData.marsDeviceIdsCooked.length == 0 ? true : false
                      "
                      separator
                      color="grey-9"
                      :options="assignToOptions"
                      placeholder="Assign To"
                    />
                  </div>
                  <div class="col-md-3 col-sm-6 col-xs-6" align="right">
                    <q-btn
                      :disabled="this.formData.assignTo == ''"
                      type="button"
                      label="Assign"
                      class="common-dark-blue"
                      @click="assignImplementationUser"
                    />
                  </div>
                </div>
              </q-card>
              <q-card class="group q-pa-md" v-if="selectedTab == 'assigned'">
                <div class="row items-center gutter-y-sm">
                  <div class="col-md-9 col-sm-12 col-xs-12">
                    <div class="row items-center">
                      <div class="col-md-4 col-sm-6 col-xs-6 group"></div>
                    </div>
                  </div>
                </div>
              </q-card>
              <!--END: table Footer -->
              <q-tabs
                v-model="selectedTab"
                class="shadow-1"
                color="grey-1"
                @select="goToUnassignedTab"
              >
                <q-tab
                  default
                  color="dark"
                  name="unAssigned"
                  slot="title"
                  label="Unassigned"
                />
                <q-tab
                  color="dark"
                  name="assigned"
                  slot="title"
                  label="Assigned"
                />
                <q-tab-pane name="assigned">
                  <div class="row items-center gutter-y-sm">
                    <div
                      class="col-md-3 col-sm-12 col-xs-12 text-grey-7 text-weight-medium q-px-md"
                      align="left"
                    >
                      <span class="q-display-2 size2">{{
                        formData.marsDeviceIdsCookedUnAssinged.length
                      }}</span
                      >/ selected
                    </div>
                    <div class="col-md-9 col-sm-12 col-xs-12">
                      <div class="row items-center">
                        <div class="col-md-4 col-sm-6 col-xs-6">
                          <q-select
                            filter
                            clearable
                            v-model="formData.assignTo"
                            :disable="
                              formData.marsDeviceIdsCookedUnAssinged.length == 0
                                ? true
                                : false
                            "
                            separator
                            color="grey-9"
                            :options="assignToOptions"
                            placeholder="Assign To"
                          />
                        </div>
                        <!-- <div class="col-md-4 col-sm-6 col-xs-6">
                <q-checkbox
                  v-model="formData.triggerWelcomeMail"
                  color="dark"
                  label="Trigger welcome email"
                />
              </div> -->
                        <div class="col-md-4 col-sm-6 col-xs-6 group">
                          <div>
                            <q-btn
                              no-caps
                              :disabled="
                                formData.marsDeviceIdsCookedUnAssinged.length ==
                                0
                                  ? true
                                  : false || this.formData.assignTo == ''
                              "
                              label="Re-Assign"
                              class="common-dark-blue"
                              @click="reAssignImplementationUser"
                            />
                          </div>
                          <div>
                            <q-btn
                              no-caps
                              :disabled="
                                formData.marsDeviceIdsCookedUnAssinged.length ==
                                0
                                  ? true
                                  : false
                              "
                              label="Un-Assign"
                              class="common-dark-blue"
                              @click="unAssignImplementationUser"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!--START: table Data -->
                  <q-table
                    :data="tableData"
                    :columns="columnDataAssigned"
                    table-class="customTableClass"
                    :filter="filterSearch"
                    selection="multiple"
                    :pagination.sync="paginationControl"
                    :selected.sync="formData.marsDeviceIdsCookedUnAssinged"
                    row-key="id"
                    :loading="tableAjaxLoading"
                    :rows-per-page-options="[5, 10, 15, 20]"
                    color="dark"
                    @request="ajaxLoadAllLeadInfo"
                  >
                    <!-- selection="multiple" -->
                    <!-- <q-td v-if="props.row.leadInformation != null" slot="body-cell-leadNumber" slot-scope="props"
                            :props="props" class="cursor-pointer"
                            @click.native="toggleLeadInformation(props.row.leadInformation)">
                            <span class="label text-primary"># {{ props.row.leadInformation.leadNumber }}</span>
                        </q-td> -->
                    <!-- <q-td v-if="props.row.leadInformation != null" slot="body-cell-submitToMarsDate"
                            slot-scope="props" :props="props">{{
                                props.row.leadInformation.submitToMarsDate | moment("Do MMM Y")
                            }}</q-td> -->
                    <!-- <q-td v-if="props.row.leadInformation != null" slot="body-cell-createdAt" slot-scope="props"
                            :props="props">{{ props.row.createdAt | moment("Do MMM Y") }}</q-td>
                        <q-td v-if="props.row.leadInformation != null" slot="body-cell-deviceAddress" slot-scope="props"
                            :props="props" class="customTd customCellLength">
                            <div>{{ props.row.deviceAddress }}</div>
                        </q-td> -->
                    <q-td
                      slot="body-cell-tid"
                      slot-scope="props"
                      :props="props"
                      class="customTd"
                    >
                      <div class="text-primary">
                        {{ props.row.tid == null ? "NA" : props.row.tid }}
                      </div>
                    </q-td>
                    <q-td
                      slot="body-cell-mid"
                      slot-scope="props"
                      :props="props"
                      class="customTd"
                    >
                      <div class="text-primary">
                        {{ props.row.mid == null ? "NA" : props.row.mid }}
                      </div>
                    </q-td>
                    <template slot="top">
                      <div class="col-md-5">
                        <q-search
                          clearable
                          color="grey-9"
                          v-model="filterSearch"
                          placeholder="Type.."
                          float-label="Search By Merchant Name, TID, MID ..."
                          class="q-mr-lg q-py-sm"
                        />
                      </div>
                    </template>
                  </q-table>
                  <!--END: table Data -->
                </q-tab-pane>
                <q-tab-pane name="unAssigned">
                  <!--START: table Data -->
                  <q-table
                    :data="tableData1"
                    :columns="columnDataUnassigned"
                    table-class="customTableClass"
                    :filter="filterSearch1"
                    selection="multiple"
                    :selected.sync="formData.marsDeviceIdsCooked"
                    :pagination.sync="paginationControl1"
                    row-key="id"
                    :loading="tableAjaxLoading1"
                    :rows-per-page-options="[5, 10, 15, 20]"
                    color="dark"
                    @request="ajaxLoadAllLeadInfo1"
                  >
                    <!-- <q-td v-if="props.row.leadInformation != null" slot="body-cell-leadNumber" slot-scope="props"
                            :props="props" class="cursor-pointer"
                            @click.native="toggleLeadInformation(props.row.leadInformation)">
                            <span class="label text-primary"># {{ props.row.leadInformation.leadNumber }}</span>
                        </q-td>
                        <q-td v-if="props.row.leadInformation != null" slot="body-cell-submitToMarsDate"
                            slot-scope="props" :props="props">{{
                                props.row.leadInformation.submitToMarsDate | moment("Do MMM Y")
                            }}</q-td>
                        <q-td v-if="props.row.leadInformation != null" slot="body-cell-createdAt" slot-scope="props"
                            :props="props">{{ props.row.createdAt | moment("Do MMM Y") }}</q-td> -->
                    <q-td
                      slot="body-cell-tid"
                      slot-scope="props"
                      :props="props"
                      class="customTd"
                    >
                      <div class="text-primary">
                        {{ props.row.tid == "" ? "NA" : props.row.tid }}
                      </div>
                    </q-td>
                    <q-td
                      slot="body-cell-mid"
                      slot-scope="props"
                      :props="props"
                      class="customTd"
                    >
                      <div class="text-primary">
                        {{ props.row.mid == "" ? "NA" : props.row.mid }}
                      </div>
                    </q-td>
                    <!-- <q-td v-if="props.row.leadInformation != null" slot="body-cell-deviceAddress" slot-scope="props"
                            :props="props" class="customTd customCellLength">
                            <div>
                                {{ props.row.deviceAddress }}
                            </div>
                        </q-td> -->
                    <template slot="top">
                      <div class="col-md-5">
                        <q-search
                          clearable
                          color="grey-9"
                          v-model="filterSearch1"
                          placeholder="Type.."
                          float-label="Search By Merchant Name, TID, MID ..."
                          class="q-mr-lg q-py-sm"
                        />
                      </div>
                    </template>
                  </q-table>
                  <!--END: table Data -->
                </q-tab-pane>
              </q-tabs>
              <div class="row items-center gutter-y-sm">
                <div class="col-md-9 col-sm-12 col-xs-12">
                  <div class="row items-center"></div>
                </div>
              </div>
            </q-tabs>
          </div>
        </div>
      </div>
    </q-card>
  </q-page>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "implementationQueue",
  data() {
    return {
      propToggleLeadInformation: false,
      addtnLeadInformation: null,
      filterSearch: "",
      filterSearch1: "",
      selectedTab: "assigned",
      assignTo: "",
      assignToOptions: [],
      tableData: [],
      tableData1: [],
      uploaderHovered: false,
      columnDataAssigned: [
        {
          name: "leadNumber",
          required: true,
          label: "Lead Number",
          align: "left",
          field: row => {
            return row.leadInformation != null
              ? row.leadInformation.leadNumber
              : "NA";
          },
          sortable: false
        },

        {
          name: "merchant_name",
          required: true,
          label: "Merchant Name",
          align: "left",
          field: row => {
            return row.leadInformation == null
              ? "NA"
              : row.leadInformation.leadName == null
              ? "NA"
              : row.leadInformation.leadName;
          },
          sortable: false
        },
        {
          name: "tid",
          required: true,
          label: "TID",
          align: "left",
          field: row => {
            return row.tid == null ? "NA" : row.tid;
          },
          sortable: true
        },
        {
          name: "mid",
          required: true,
          label: "MID",
          align: "left",
          field: row => {
            return row.mid == null ? "NA" : row.mid;
          },
          sortable: true
        },
        {
          name: "mobile_number",
          required: true,
          label: "Mobile Number",
          align: "center",
          field: row => {
            return row.leadInformation != null
              ? row.leadInformation.contactNumber
              : "NA";
          },
          sortable: false
        },

        {
          name: "assigned_to",
          required: true,
          label: "Assigned To",
          align: "left",
          field: row => {
            return row.qrAssignedTo.name == null
              ? "NA"
              : row.qrAssignedTo.name + " | " + row.qrAssignedTo.employeeID;
          },
          sortable: false
        }
      ],
      columnDataUnassigned: [
        {
          name: "leadNumber",
          required: true,
          label: "Lead Number",
          align: "left",
          field: row => {
            return row.leadInformation != null
              ? row.leadInformation.leadNumber
              : "NA";
          },
          sortable: false
        },
        {
          name: "merchant_name",
          required: true,
          label: "Merchant Name",
          align: "left",
          field: row => {
            return row.leadInformation == null
              ? "NA"
              : row.leadInformation.leadName == null
              ? "NA"
              : row.leadInformation.leadName;
          },
          sortable: false
        },
        {
          name: "tid",
          required: true,
          label: "TID",
          align: "left",
          field: row => {
            return row.tid == null ? "NA" : row.tid;
          },
          sortable: true
        },
        {
          name: "mid",
          required: true,
          label: "MID",
          align: "left",
          field: row => {
            return row.mid == null ? "NA" : row.mid;
          },
          sortable: true
        },
        {
          name: "mobile_number",
          required: true,
          label: "Mobile Number",
          align: "center",
          field: row => {
            return row.leadInformation != null
              ? row.leadInformation.contactNumber
              : "NA";
          },
          sortable: false
        },
        {
          name: "leadAddress",
          required: true,
          label: "Address",
          align: "left",
          field: row => {
            return row.leadInformation == null ? "NA" : row.leadInformation.leadAddress;
          },
          sortable: false
        }
      ],

      currentDeviceInfo: {},
      showDeviceAddressModal: false,
      formData: {
        marsDeviceIdsCooked: [],
        marsDeviceIdsCookedUnAssinged: [],
        triggerWelcomeMail: false,
        assignTo: "",
        fileSelected: []
      },
      paginationControl: {
        sortBy: "createdAt", // String, column "name" property value
        descending: false,
        page: 1,
        rowsPerPage: 5 // current rows per page being displayed
      },
      paginationControl1: {
        sortBy: "createdAt", // String, column "name" property value
        descending: false,
        page: 1,
        rowsPerPage: 5 // current rows per page being displayed
      },
      tableAjaxLoading: false,
      tableAjaxLoading1: false
    };
  },
  computed: {
    ...mapGetters("OnboardingExistingMerchants", [
      "getOnboardingMerchantAssignedList",
      "getOnboardingMerchantUnassignedList"
    ]),
    ...mapGetters("ImplementationExecutive", ["getImplementationExecutiveList"])
  },
  beforeMount() {
    console.log("CHECK LENGTH", JSON.stringify(this.formData));
    console.log(
      "FILE CHECKSUM DETAILS-------------->>>>",
      JSON.stringify(this.fileCheckSum)
    );
  },
  mounted() {
    this.getPincodeInformations();
    console.log(
      "File Selected--------->>>>",
      JSON.stringify(this.formData.fileSelected)
    );
  },
  methods: {
    ...mapActions("OnboardingExistingMerchants", [
      "ONBOARDING_MERCHANT_ASSIGNED_LIST",
      "ONBOARDING_MERCHANT_UNASSIGNED_LIST",
      "ONBOARDING_MERCHANT_SUBMIT",
      "ONBOARDING_MERCHANT_SUBMIT_UNASSIGN"
    ]),
    ...mapActions("ImplementationExecutive", ["IMPLEMENTATION_EXECUTIVE_LIST"]),
    ...mapActions("SuperAdminUsers", ["FETCH_ALL_STATES_DATA"]),
    ...mapActions("UploadOnboardingMerchants", [
      "FEED_ONBOARDING_EXISTING_MERCHANT_DEVICE_BULK_UPLOAD_DATA"
    ]),

    removeBulkUploadFile() {
      this.formData.fileSelected = [];
    },

    dragAndDropCustomAnimate(action) {
      this.uploaderHovered = action;
    },
    onDrop: function(e) {
      e.stopPropagation();
      e.preventDefault();
      this.formData.fileSelected = e.dataTransfer.files;
      this.fileCheckSum(e.dataTransfer.files);
    },
    fileCheckSum(file) {
      console.log(file);
      let re = /(\.csv|\.xlsx|\.xls)$/i;
      if (!re.exec(file[0].name)) {
        this.formData.fileSelected = [];
        this.$q.notify({
          color: "negative",
          position: "bottom",
          message: "File format not supported",
          icon: "clear"
        });
        return false;
      }
    },
    onChange(e) {
      this.formData.fileSelected = e.target.files;
    },
    uploadFileForBulkUpload(formData) {
      if (this.formData.fileSelected.length == 0) {
        this.$q.notify({
          color: "amber-9",
          position: "bottom",
          message: "Please upload file",
          icon: "warning"
        });
        return false;
      } else {
        this.$q.loading.show({
          delay: 100, // ms
          spinnerColor: "purple-9",
          message: "Please wait.."
        });
        let assumeFormData = new FormData();
        assumeFormData.append("file", this.formData.fileSelected[0]);
        let assumeFormDataValue = {
          file: assumeFormData
        };
        this.FEED_ONBOARDING_EXISTING_MERCHANT_DEVICE_BULK_UPLOAD_DATA(
          assumeFormDataValue
        )
          .then(response => {
            this.$q.loading.hide();
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Successfully Added!",
              icon: "thumb_up"
            });
            this.ajaxLoadAllLeadInfo1({pagination: this.paginationControl1, filter: this.filterSearch1});
            this.$emit("emitToggleinventoryBulkUploadOnSuccess");
            this.formData.fileSelected = [];
          })
          .catch(error => {
            this.$q.loading.hide();
            this.$q.notify({
              color: "negative",
              position: "bottom",
              message:
                error.body.message == null
                  ? "Please Try Again Later !"
                  : error.body.message,
              icon: "thumb_down"
            });
            // this.formData.fileSelected = []
          });
      }
    },
    getPincodeInformations() {
      this.FETCH_ALL_STATES_DATA();
    },
    ajaxLoadAllLeadInfo1({ pagination, filter }) {
      // we set QTable to "loading" state
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data .."
      });
      this.ONBOARDING_MERCHANT_UNASSIGNED_LIST({ pagination, filter })
        .then(res => {
          // updating pagination to reflect in the UI
          this.paginationControl1 = pagination;

          // we also set (or update) rowsNumber
          this.paginationControl1.rowsNumber = this.getOnboardingMerchantUnassignedList.totalElements;
          this.paginationControl1.page =
            this.getOnboardingMerchantUnassignedList.number + 1;

          // then we update the rows with the fetched ones
          this.tableData1 = this.getOnboardingMerchantUnassignedList.content;
          console.log(
            "TABLE DATA1------------------------>>>>>",
            JSON.stringify(this.tableData1)
          );
          if (this.getOnboardingMerchantUnassignedList.sort != null) {
            console.log(
              "Sort is not null : ---------- : " +
                JSON.stringify(this.getOnboardingMerchantUnassignedList.sort)
            );
            this.paginationControl1.sortBy = this.getOnboardingMerchantUnassignedList.sort[0].property;
            this.paginationControl1.descending = this.getOnboardingMerchantUnassignedList.sort[0].ascending;
            console.log(
              "Pagination Control modified : -------- : " +
                JSON.stringify(this.paginationControl1)
            );
          } else {
            console.log("Sort is null : ---------- : ");
            this.paginationControl1.sortBy = "createdAt";
            this.paginationControl1.descending = !this.paginationControl1
              .descending;
          }
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

          // finally we tell QTable to exit the "loading" state
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },
    ajaxLoadAllLeadInfo({ pagination, filter }) {
      // we set QTable to "loading" state
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data .."
      });
      this.ONBOARDING_MERCHANT_ASSIGNED_LIST({ pagination, filter })
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
          // updating pagination to reflect in the UI
          this.paginationControl = pagination;

          // we also set (or update) rowsNumber
          this.paginationControl.rowsNumber = this.getOnboardingMerchantAssignedList.totalElements;
          this.paginationControl.page =
            this.getOnboardingMerchantAssignedList.number + 1;
          // then we update the rows with the fetched ones
          this.tableData = this.getOnboardingMerchantAssignedList.content;
          if (this.getOnboardingMerchantAssignedList.sort != null) {
            this.paginationControl.sortBy = this.getOnboardingMerchantAssignedList.sort[0].property;
            this.paginationControl.descending = this.getOnboardingMerchantAssignedList.sort[0].ascending;
          }
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },
    //Load all short lead info while page loading
    goToUnassignedTab(tab) {
      if (tab == "unAssigned") {
        this.ajaxLoadAllLeadInfo1({
          pagination: this.paginationControl1,
          filter: this.filterSearch1
        });
        this.formData.marsDeviceIdsCooked = [];
        this.formData.assignTo = "";
      } 
      else {
        this.ajaxLoadAllLeadInfo({
          pagination: this.paginationControl,
          filter: this.filterSearch
        });
        this.formData.marsDeviceIdsCookedUnAssinged = [];
        this.formData.assignTo = "";
      }
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
    // Function to assign implementation manager in implementation queue
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
          message: "Implementation officer cannot be empty!",
          icon: "thumb_down"
        });
      } else {
        let marsDeviceIdsCooked = [];
        self.formData.marsDeviceIdsCooked.map(function(value) {
          marsDeviceIdsCooked.push(value.id);
        });
        let postValues = {
          marsDeviceIds: marsDeviceIdsCooked,
          userId: self.formData.assignTo
        };
        self
          .ONBOARDING_MERCHANT_SUBMIT(postValues)
          .then(() => {
            this.ajaxLoadAllLeadInfo1({
              pagination: this.paginationControl1,
              filter: this.filterSearch1
            });
            self.formData.marsDeviceIdsCooked = [];
            self.formData.assignTo = "";
            self.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Successfully Assigned!",
              icon: "thumb_up"
            });
          })
          .catch(() => {
            self.$q.notify({
              color: "negative",
              position: "bottom",
              message: "Please try again",
              icon: "thumb_down"
            });
          });
      }
    },
    // Function to unAssignImplementationUser in implementation queue
    unAssignImplementationUser() {
      let self = this;
      if (self.formData.marsDeviceIdsCookedUnAssinged.length == 0) {
        self.$q.notify({
          color: "negative",
          position: "bottom",
          message: "Select atleast one item to Unassign",
          icon: "thumb_down"
        });
      } else {
        let marsDeviceIdsCookedUnAssinged = [];
        self.formData.marsDeviceIdsCookedUnAssinged.map(function(value) {
          marsDeviceIdsCookedUnAssinged.push(value.id);
        });

        let postValues = {
          action: this.$MARS_DEVICE_STATUS_TID_GENERATED,
          marsDeviceIds: marsDeviceIdsCookedUnAssinged,
          userId: this.$SEND_ZERO_FOR_UNASSIGING
        };
        self
          .ONBOARDING_MERCHANT_SUBMIT_UNASSIGN(postValues)
          .then(() => {
            this.ajaxLoadAllLeadInfo({
              pagination: this.paginationControl,
              filter: this.filterSearch
            });
            self.formData.marsDeviceIdsCookedUnAssinged = [];
            self.formData.assignTo = "";
            self.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Successfully Un-Assigned!",
              icon: "thumb_up"
            });
          })
          .catch(() => {
            self.$q.notify({
              color: "negative",
              position: "bottom",
              message: "Please try again",
              icon: "thumb_down"
            });
          });
      }
    },

    // Function to unAssignImplementationUser in implementation queue
    reAssignImplementationUser() {
      let self = this;
      if (self.formData.marsDeviceIdsCookedUnAssinged.length == 0) {
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
          message: "Implementation officer cannot be empty!",
          icon: "thumb_down"
        });
      } else {
        let marsDeviceIdsCookedUnAssinged = [];
        self.formData.marsDeviceIdsCookedUnAssinged.map(function(value) {
          marsDeviceIdsCookedUnAssinged.push(value.id);
        });
        let postValues = {
          action: this.$MARS_DEVICE_STATUS_SAT_ASSIGNED,
          marsDeviceIds: marsDeviceIdsCookedUnAssinged,
          triggerWelcomeMail: self.formData.triggerWelcomeMail,
          userId: self.formData.assignTo
        };
        self
          .ONBOARDING_MERCHANT_SUBMIT(postValues)
          .then(() => {
            this.ajaxLoadAllLeadInfo({
              pagination: this.paginationControl,
              filter: this.filterSearch
            });
            self.formData.marsDeviceIdsCookedUnAssinged = [];
            self.formData.assignTo = "";
            self.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Successfully Re-Assigned!",
              icon: "thumb_up"
            });
          })
          .catch(() => {
            self.$q.notify({
              color: "negative",
              position: "bottom",
              message: "Please try again",
              icon: "thumb_down"
            });
          });
      }
    },
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

* {
  font-family: "Arial";
  font-size: 12px;
}

*,
*:after,
*:before {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-touch-callout: none;
}

.align1 {
  margin-bottom: 7px;
}
.align2 {
  margin-top: 10px;
}
.align3 {
  height: -4%;
}
.size1 {
  margin-left: -15px;
}
.size2 {
  font-size: xx-large;
}

input[type="file"] {
  position: absolute;
  opacity: 0;
  z-index: -1;
}

.align-center {
  text-align: center;
}

.helper {
  height: 100%;
  display: inline-block;
  vertical-align: middle;
  width: 0;
}

.hidden {
  display: none !important;
}

.hidden.image {
  display: inline-block !important;
}

.display-inline {
  display: inline-block;
  vertical-align: middle;
}

.img {
  border: 1px solid #f6f6f6;
  display: inline-block;
  height: auto;
  max-height: 80%;
  max-width: 80%;
  width: auto;
}

.drop {
  padding: 15px;
  background-color: #f6f6f6;
  border-radius: 2px;
  height: 100%;
  max-height: 400px;
  max-width: 600px;
  width: 100%;
}
.toggleBulkUploadActive {
  border: 4px dashed #ccc;
}
.toggleBulkUploadDisable {
  border: 4px dashed #1f2c3fa6;
}
</style>
