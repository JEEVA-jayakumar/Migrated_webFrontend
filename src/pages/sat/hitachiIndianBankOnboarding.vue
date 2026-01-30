<template>
  <q-page>
    <q-card>
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
                      <div
                        v-if="formData.fileSelected.length == 0"
                        :class="[
                          uploaderHovered
                            ? 'toggleBulkUploadDisable'
                            : 'toggleBulkUploadActive'
                        ]"
                        class="drop display-inline align-center cursor-pointer"
                        @dragover.prevent="dragAndDropCustomAnimate(true)"
                        @dragleave.prevent="dragAndDropCustomAnimate(false)"
                        @drop="onDrop"
                      >
                        <label style="width: auto;" class="btn display-inline cursor-pointer">
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
                    <div class="col-md-12 group" align="center">
                      <q-btn
                        :disabled="formData.fileSelected.length == 0 ? true : false"
                        type="button"
                        color="purple-9"
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
            <q-tabs
              class="shadow-1"
              animated
              swipeable
              color="tertiary"
              align="justify"
              v-model="selectedTab"
              @select="goToUnassignedTab"
            >
              <q-tab
                class="size1"
                label="Hitachi Onboarding Merchants"
                slot="title"
                default
                name="unAssigned"
              />
              <!-- <q-card class="group q-pa-md" v-if="selectedTab == 'unAssigned'">
              </q-card> -->
              <!-- <q-tabs
                v-model="selectedTab"
                class="shadow-1"
                color="grey-1"
                @select="goToUnassignedTab"
              > -->
              <!-- <q-tab
                  default
                  class="size1" 
                  color="dark"
                  name="unAssigned"
                  slot="title"
                  label="Hitachi Onboarding Merchants"
                /> -->
              <q-tab-pane name="unAssigned">
                <!--START: table Data -->
                <q-table
                  :data="tableData1"
                  :columns="columnData"
                  table-class="customTableClass"
                  :filter="filterSearch1"
                  :selected.sync="formData.marsDeviceIdsCooked"
                  :pagination.sync="paginationControl1"
                  row-key="id"
                  :loading="tableAjaxLoading1"
                  :rows-per-page-options="[5, 10, 15, 20]"
                  color="dark"
                  @request="ajaxLoadAllLeadInfo1"
                >
                  <q-td
                    slot="body-cell-tid"
                    slot-scope="props"
                    :props="props"
                    class="customTd"
                  >
                    <div class="text-primary">{{ props.row.tid }}</div>
                  </q-td>
                  <q-td
                    slot="body-cell-mid"
                    slot-scope="props"
                    :props="props"
                    class="customTd"
                  >
                    <div class="text-primary">{{ props.row.mid }}</div>
                  </q-td>
                  <q-td
                    slot="body-cell-createdAt"
                    slot-scope="props"
                    :props="props"
                    >{{ props.row.createdAt | moment("Do MMM Y") }}</q-td
                  >
                  <q-td
                    slot="body-cell-assign"
                    slot-scope="props"
                    :props="props"
                  >
                    <q-btn
                      class="btn1"
                      v-if="props.row.isStatus == 1"
                      disable
                      highlight
                      push
                      color="positive"
                      size="sm"
                      >Success</q-btn
                    >
                    <q-btn
                      v-if="props.row.isStatus == 2"
                      highlight
                      push
                      color="negative"
                      size="sm"
                      @click="OGSPendingStatus(props.row)"
                      >Re-Submit</q-btn
                    >
                    <q-btn
                      v-if="props.row.isStatus == 3"
                      highlight
                      push
                      color="negative"
                      size="sm"
                      @click="OGSPendingStatus(props.row)"
                      >Re-Submit</q-btn
                    >
                    <q-btn
                      class="btn1"
                      v-if="props.row.isStatus == 4"
                      disable
                      highlight
                      push
                      color="purple-9"
                      size="sm"
                      >Installed</q-btn
                    >
                    <q-btn
                      v-if="props.row.isStatus == null"
                      highlight
                      push
                      color="purple-9"
                      size="sm"
                      @click="OGSPendingStatus(props.row)"
                      >Re-Submit</q-btn
                    >
                  </q-td>
                  <template slot="top">
                    <div class="col-md-4">
                      <q-search
                        clearable
                        color="grey-9"
                        v-model="filterSearch1"
                        placeholder="Type.."
                        float-label="Search by MerchantName, TID, MID..."
                        class="q-mr-lg q-py-sm"
                      />
                    </div>

                    <div class="col-md-6">
                    <q-btn
                      color="purple-9"
                      label="Download as Excel"
                      class="q-mr-lg q-py-sm float-right"
                      size="md"
                      @click="downloadHitachiIndianBank()"
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
            <!-- </q-tabs> -->

            
          </div>
        </div>
      </div>
    </q-card>
    <downloadIndianBankReports
              v-if="propHitachiReport"
              :propHitachiReport="propHitachiReport"
              @emitfnHitachiIndianBank="downloadHitachiIndianBank"
            ></downloadIndianBankReports>
  </q-page>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import downloadIndianBankReports from "../../components/sat/downloadIndianBankReports.vue";
export default {
  name: "implementationQueue",
  components: {
    downloadIndianBankReports
  },
  data() {
    return {
      propToggleLeadInformation: false,
      propHitachiReport:false,
      addtnLeadInformation: null,
      filterSearch: "",
      filterSearch1: "",
      selectedTab: "assigned",
      assignTo: "",
      assignToOptions: [],
      tableData: [],
      tableData1: [],
      uploaderHovered: false,

      columnData: [
        {
          name: "createdAt",
          required: true,
          label: "Upload Date / Time",
          align: "left",
          field: row => {
            return row.createdAt;
          },
          format: val => `${val}|moment("Do MMM Y")`,
          sortable: true
        },
        {
          name: "merchant_name",
          required: true,
          label: "Merchant Name",
          align: "left",
          field: row => {
            return row.leadName == null ? "NA" : row.leadName;
          },
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
          name: "device_model",
          required: true,
          label: "Device Model",
          align: "center",
          field: row => {
            return row.device != null ? row.device : "NA";
          },
          sortable: false
        },
        {
          name: "device_address",
          required: true,
          label: "Contact Name",
          align: "left",
          field: row => {
            return row.contactName == null ? "NA" : row.contactName;
          },
          sortable: false
        },
        {
          name: "contact_number",
          required: true,
          label: "Contact Number",
          align: "center",
          field: row => {
            return row.contactNumber != null ? row.contactNumber : "NA";
          },
          sortable: false
        },
        {
          name: "status",
          required: true,
          label: "Status",
          align: "left",
          field: row => {
            if (row.isStatus == 1) {
              return "Success";
            } else if (row.isStatus == 2) {
              return "Pending";
            } else if (row.isStatus == 3) {
              return "OGS Failure";
            } else if (row.isStatus == 4) {
              return "Installed";
            } else {
              return "Failure";
            }
          },
          sortable: false
        },
        {
          name: "assign",
          required: true,
          label: "Action",
          align: "left",
          field: "action",
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
    ...mapGetters("HitachiIndianBankOnboarding", ["getHitachiIndianOnboarding"])
    // ...mapGetters("ImplementationExecutive", ["getImplementationExecutiveList"])
  },
  beforeMount() {
    console.log(
      "FORMDATA------------->>>>",
      JSON.stringify(this.formData.props)
    );
    console.log(
      "PROPS DETAILS TID1-------------->>>>",
      JSON.stringify(this.props)
    );
  },
  mounted() {
    console.log(
      "File Selected--------->>>>",
      JSON.stringify(this.formData.fileSelected)
    );
  },
  methods: {
    ...mapActions("HitachiIndianBankOnboarding", [
      "HITACHI_INDIAN_ONBOARDING_LIST",
      "REASSIGN_HITACHI_MERCHANTS"
    ]),
    ...mapActions("InventoryCentral", ["REPORT_HITACHI_ONBOARDING_MERCHANTS"]),
    ...mapActions("SuperAdminUsers", ["FETCH_ALL_STATES_DATA"]),
    ...mapActions("IndianBankUpload", [
      "FEED_HITACHI_INDIAN_BANK_ONBOARDING_UPLOAD_DATA"
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
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Validating .."
      });
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
        this.FEED_HITACHI_INDIAN_BANK_ONBOARDING_UPLOAD_DATA(
          assumeFormDataValue
        )
          .then(response => {
            this.$q.loading.hide();
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Successfully Uploaded!",
              icon: "thumb_up"
            });
            this.ajaxLoadAllLeadInfo1({pagination: this.paginationControl,filter: this.filterSearch});
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
      this.HITACHI_INDIAN_ONBOARDING_LIST({ pagination, filter })
        .then(res => {
          // updating pagination to reflect in the UI
          this.paginationControl1 = pagination;

          // we also set (or update) rowsNumber
          this.paginationControl1.rowsNumber = this.getHitachiIndianOnboarding.totalElements;
          this.paginationControl1.page =
            this.getHitachiIndianOnboarding.number + 1;

          // then we update the rows with the fetched ones
          this.tableData1 = this.getHitachiIndianOnboarding.content;
          console.log(
            "TABLE DATA1------------------------>>>>>",
            JSON.stringify(this.tableData1)
          );
          if (this.getHitachiIndianOnboarding.sort != null) {
            console.log(
              "Sort is not null : ---------- : " +
                JSON.stringify(this.getHitachiIndianOnboarding.sort)
            );
            this.paginationControl1.sortBy = this.getHitachiIndianOnboarding.sort[0].property;
            this.paginationControl1.descending = this.getHitachiIndianOnboarding.sort[0].ascending;
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

    //Load all short lead info while page loading
    goToUnassignedTab(tab) {
      if (tab == "unAssigned") {
        this.ajaxLoadAllLeadInfo1({
          pagination: this.paginationControl1,
          filter: this.filterSearch1
        });
      } else {
        this.ajaxLoadAllLeadInfo({
          pagination: this.paginationControl,
          filter: this.filterSearch
        });
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
    OGSPendingStatus(request) {
      console.log(
        "PROPS DETAILS TID STATUS-------->>>>",
        JSON.stringify(request.tid)
      );
      let param = {
        tid: request.tid
      };
      this.$q.loading.show({
        delay: 100, // ms
        message: "Please Wait",
        spinnerColor: "purple-9",
        customClass: "shadow-none"
      });
      this.REASSIGN_HITACHI_MERCHANTS(param)
        .then(response => {
          this.ajaxLoadAllLeadInfo1({
            pagination: this.paginationControl1,
            filter: this.filterSearch1
          });
          this.$q.notify({
            color: "positive",
            position: "bottom",
            message: "Re-Assigned Successfully",
            icon: "thumb_up"
          });
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
        });
    },

    // downloadHitachiOnboardingMerchants() {
    //   this.$q.loading.show({
    //     delay: 100 // ms
    //   });
    //   this.REPORT_HITACHI_ONBOARDING_MERCHANTS()
    //     .then(() => {
    //       this.$q.loading.hide();
    //       this.$q.notify({
    //         color: "positive",
    //         position: "bottom",
    //         message: "Success, file has been downloaded",
    //         icon: "check"
    //       });
    //     })
    //     .catch(error => {
    //       console.log(error);
    //       this.$q.loading.hide();
    //       this.$q.notify({
    //         color: "negative",
    //         position: "bottom",
    //         message: "Please try again",
    //         icon: "thumb_down"
    //       });
    //     });
    // },
    downloadHitachiIndianBank() {
      this.propHitachiReport = !this.propHitachiReport;
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

input[type="file"] {
  position: absolute;
  opacity: 0;
  z-index: -1;
}
.side1 {
  margin-left: 24px;
  font-size: 30px;
}
.btn1 {
  width: 87px;
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
/* .size1{
  font-size: medium;
} */

.size3{
  margin-left: 30px;
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
