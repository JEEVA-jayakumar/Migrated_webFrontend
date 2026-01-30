<template>
  <div>
    <q-modal minimized class="customModalOverlay" v-model="toggleModel" @hide="emitfnshowConvertToSat()"
      :content-css="{ padding: '50px', minWidth: '40vw' }">
      <form>
        <div class="column group">
          <div class="col-md-12">
            <div class="q-title text-weight-regular">Approve the Lead</div>
          </div>

          <div class="col-md-12">
            <q-input disable @keyup.enter="submitShortLead(formData)" v-model="data.data"
              class="text-weight-regular text-grey-8" color="grey-9" float-label="leadId" placeholder="leadId" />
          </div>
          <div class="col-md-12">
            <q-input disable v-model="merchant.paymentDetails.deviceSerialNumber" class="no-margin"
              float-label="Serial Number" />
          </div>
          <!-- <div class="col-md-12">
           
            <q-datetime
              format="DD/MM/YYYY"
              v-model="merchant.paymentDetails.installationDate"
              class="no-margin"
              float-label="Installation Date"
            />
          </div> -->
          <!-- <div class="col-md-12">
          
            <div class="col-xs-12 col-sm-6">
              <q-datetime
                format="DD/MM/YYYY"
                v-model="merchant.paymentDetails.deinstallationDate"
                class="no-margin"
                float-label="DeInstallation Date"
              />
              
            </div>
          </div> -->
          <div class="col-md-12 group" align="right">
            <q-btn flat align="right" class="bg-white text-weight-regular text-grey-8"
              @click="emitfnshowConvertToSat()">Cancel</q-btn>
            <q-btn align="right" @click="submitShortLead(merchant)" color="purple-9">submit</q-btn>
          </div>
        </div>
      </form>
    </q-modal>
  </div>
</template>

<script>
  import { required, maxLength, minLength } from "vuelidate/lib/validators";

  import { mapGetters, mapActions } from "vuex";
  export default {
    props: ["propShowConvertToSat", "propRowDetails"],
    data() {
      return {
        paginationControl: {
          rowsNumber: 5,
          page: 1,
          sortBy: "mid",
          descending: false,
          rowsPerPage: 5,
        },

        toggleModel: this.propShowConvertToSat,
        viewBinding: {},
        merchant: {
          salesInformation: {
            institutionCode: "",
          },

          kyc: {
            documents: [],
          },
          paymentDetails: {
            settlementType: "",
            tipEnabled: "",
            cashAtPosEnabled: "",
            intlCardAcceptance: "",
            preAuth: "",
            rentalPlanCode: "",
            // deviceSerialNumber: this.propRowDetails.regionalInventory == null ? this.propRowDetails.aggregatorRegionalInventory.serialNumber : this.propRowDetails.regionalInventory.serialNumber,
            deviceSerialNumber: (
              this.propRowDetails &&
              this.propRowDetails.leadInformation &&
              this.propRowDetails.leadInformation.leadSource &&
              this.propRowDetails.leadInformation.leadSource.sourceName === "LS_TOHANDS"
            )
              ? (this.propRowDetails.toHandsSerialNumber
                ? this.propRowDetails.toHandsSerialNumber
                : "NA")
              : (
                this.propRowDetails &&
                  this.propRowDetails.regionalInventory &&
                  this.propRowDetails.regionalInventory.serialNumber
                  ? this.propRowDetails.regionalInventory.serialNumber
                  : (
                    this.propRowDetails &&
                      this.propRowDetails.aggregatorRegionalInventory &&
                      this.propRowDetails.aggregatorRegionalInventory.serialNumber
                      ? this.propRowDetails.aggregatorRegionalInventory.serialNumber
                      : "NA"
                  )
              ),
            installationDate: "",
            deinstallationDate: "",
          },
        },
        paymentType: [
          {
            label: "Cheque",
            value: 2,
          },

          {
            label: "NEFT",
            value: 1,
          },
          {
            label: "SWIPE",
            value: 3,
          },
          // {
          //   label: "Paper statement",
          //   value: "P"
          // }
        ],
        formData: {
          data: this.propRowDetails.id,
        },
        data: {
          data: this.propRowDetails.leadInformation.id,
        },
      };
    },
    created() {
      console.log("Hellow world");
      this.$q.loading.show({
        delay: 100, // ms
        spinnerColor: "purple-9",
        message: "Fetching Data..",
      });

      this.FETCH_MARS_DATA(this.propRowDetails.leadInformation.id).then(
        (response) => {
          this.$q.loading.hide();
          // this.$q.notify({
          //   color: "positive",
          //   position: "bottom",
          //   message: "data",
          //   icon: "thumb_up",
          //   message: response.data.message
          // });
        }
      );
      let self = this;
      self.merchant.kyc.documents.push({
        documentName: "CPF form",
        documentType: 148,
        documentImage: [
          this.GLOBAL_FILE_FETCH_URL + "/" + this.propRowDetails.cpvForm,
        ],
      });
      self.merchant.kyc.documents.push({
        documentName: "Implementation form",
        documentType: 147,
        documentImage: [
          this.GLOBAL_FILE_FETCH_URL +
          "/" +
          this.propRowDetails.implementationForm,
        ],
      });
      self.merchant.kyc.documents.push({
        documentName: "Photo of the shop",
        documentType: 146,
        documentImage: [
          this.GLOBAL_FILE_FETCH_URL + "/" + this.propRowDetails.pictureOfShop,
        ],
      });
      // self.data = this.propRowDetails.regionalInventory == null ? this.propRowDetails.aggregatorRegionalInventory : this.propRowDetails.regionalInventory;
      // .then(response => {
      //   // this.merchant.paymentDetails.settlementType = this.getAllMarsData.paymentDetails.settlementType;
      //   // this.merchant.paymentDetails.tipEnabled = this.getAllMarsData.paymentDetails.tipEnabled;
      //   // this.merchant.paymentDetails.cashAtPosEnabled = this.getAllMarsData.paymentDetails.cashAtPosEnabled;
      //   // this.merchant.paymentDetails.intlCardAcceptance = this.getAllMarsData.paymentDetails.intlCardAcceptance;
      //   // this.merchant.paymentDetails.preAuth = this.getAllMarsData.paymentDetails.preAuth;
      //   // this.merchant.paymentDetails.rentalPlanCode = this.getAllMarsData.paymentDetails.rentalPlanCode;
      //   // this.merchant.salesInformation.institutionCode = this.getAllMarsData.salesInformation.institutionCode;
      //   this.fetchAndCookDocuments();
      //   this.$q.loading.hide();
      // })
    },
    beforeMount() {
      console.log("Hellow world ----->", JSON.stringify(this.propRowDetails));
    },

    computed: {
      ...mapGetters("GlobalVariables", ["GLOBAL_FILE_FETCH_URL"]),
      ...mapGetters("SA_Devices", ["getAllDevicesInfo"]),
      ...mapGetters("leadSource", ["getActiveLeadSource"]),

      ...mapGetters("CategoryBasedMdr", ["categoryBasedMdr"]),
      ...mapGetters("plan", ["getActivePlan"]),
      ...mapGetters("appMerchantType", ["getappMerchantDocumentType"]),
      ...mapGetters("shortLeadInfo", ["getShortLead"]),
      ...mapGetters("categoryBasedRental", ["categoryBasedRental"]),
      ...mapGetters("DocumentApprove", ["getDocumentApprove"]),
      ...mapGetters("equitasImplementedQueue", ["getEquitasReport"]),
      ...mapGetters("GetMarsData", ["getAllMarsData", "getImplementedQueue"]),
    },
    methods: {
      ...mapActions("pincodes", ["FETCH_ALL_PINCODES", "EDIT_NEW_PINCODE"]),
      ...mapActions("convertToWip", ["CONVERT_TO_WIP"]),
      ...mapActions("SA_Devices", ["FETCH_DEVICES_DATA"]),
      ...mapActions("leadSource", ["LEAD_SOURCE_ACTIVE_LIST"]),

      ...mapActions("MdrPlan", ["MDR_PLAN"]),
      ...mapActions("CategoryBasedMdr", [
        "CATEGORY_BASED_MDR_PLAN",
        "EDIT_MDR_PLAN",
      ]),
      ...mapActions("plan", ["PLAN_ACTIVE_LIST"]),
      ...mapActions("soTosat", ["SO_TO_SAT"]),
      ...mapActions("appMerchantType", ["APP_MERCHANT_DOCUMENT_TYPE"]),
      ...mapActions("shortLeadInfo", ["FETCH_SHORT_LEAD"]),
      ...mapActions("categoryBasedRental", ["CATEGORY_BASED_RENTAL_PLAN"]),
      ...mapActions("DocumentApprove", ["DOCUMENT_APPROVE"]),
      ...mapActions("equitasImplementedQueue", ["EQUITAS_TRACKER_LIST"]),
      ...mapActions("GetMarsData", ["FETCH_MARS_DATA", "IMPLEMENTED_QUEUE"]),
      ...mapActions("CMS_EDIT_MDR", [
        "CMS_EDIT_MDR",
        "CMS_EDIT_MERCHANT",
        "CMS_EDIT_KYC",
        "CMS_EDIT_TERMINAL",
        "CMS_EDIT_TERMINAL_DEVICE",
      ]),

      emitfnshowConvertToSat() {
        this.$emit("emitfnshowConvertToSat");
      },
      //Permission creation final submit
      // submitShortLead(request) {
      //   let key = this.getAllMarsData.salesInformation.institutionCode;
      //   this.$q.localStorage.set("a_t", key);
      //   let id = {
      //     data: {
      //       data: this.propRowDetails.leadInformation.id,
      //     },
      //   };
      //   if (this.propRowDetails.leadInformation.leadSource.multiTidEnabled == true) {
      //     this.tid = this.propRowDetails.subTidOfDbs
      //   } else {
      //     this.tid = this.propRowDetails.tid
      //   }
      //   let terminalparams = {
      //     terminal: {
      //       id: this.tid,

      //     },
      //     terminalparams: {
      //       merchant: {
      //         companyInformation: {
      //           applicationNumber: this.getAllMarsData.salesInformation
      //             .applicationNumber,
      //         },
      //         paymentDetails: {
      //           deviceSerialNumber: request.paymentDetails.deviceSerialNumber,
      //           installationDate: request.paymentDetails.installationDate,
      //           deinstallationDate: request.paymentDetails.deinstallationDate,
      //         },
      //         kyc: request.kyc,
      //       },
      //     },
      //         data: this.propRowDetails

      //   };

      //   //  let terman
      //   this.$q.loading.show({
      //     delay: 100, // ms
      //     spinnerColor: "purple-9",
      //     message: "Please wait..",
      //   });

      //   this.CMS_EDIT_TERMINAL_DEVICE(terminalparams)

      //     .then((response) => {
      //       this.DOCUMENT_APPROVE(this.propRowDetails.id);
      //       this.$q.loading.hide();
      //       this.$emit("emitfnshowConvertToSat");
      //       this.$q.notify({
      //         color: "positive",
      //         position: "bottom",
      //         message: "data",
      //         icon: "thumb_up",
      //         message: "Terminal Details Successully Updated",
      //       });
      //     })
      //     .catch((error) => {
      //       this.$q.loading.hide();
      //       console.log(error);
      //       this.$q.notify({
      //         color: "negative",
      //         position: "bottom",
      //         icon: "thumb_down",
      //         message: error.data.message,
      //       });

      //       // this.$router.push("sat/lead/lead/view/audocuments");
      //     });
      //   // this.CMS_EDIT_KYC(requestparams)

      //   //   .then(response => {
      //   //     this.$q.loading.hide();
      //   //     this.$q.notify({
      //   //       color: "positive",
      //   //       position: "bottom",
      //   //       message: "data",
      //   //       icon: "thumb_up",
      //   //       message: "Merchant Details Successfully Updated"
      //   //     });
      //   //   })
      //   //   .catch(error => {
      //   //     this.$q.loading.hide();
      //   //     console.log(error);
      //   //     this.$q.notify({
      //   //       color: "negative",
      //   //       position: "bottom",
      //   //       icon: "thumb_down",
      //   //       message: error.data.message
      //   //     });
      //   //   });
      //   // this.DOCUMENT_APPROVE(this.propRowDetails.id +"/2")
      //   //   .then(response => {
      //   //     this.$emit("emitfnshowConvertToSat");
      //   //     this.$q.loading.hide();
      //   //     // this.EQUITAS_TRACKER_LIST();
      //   //     this.$q.notify({
      //   //       color: "positive",
      //   //       position: "bottom",
      //   //       message: "This lead is Approved!",
      //   //       icon: "thumb_up"
      //   //     });
      //   //     location.reload();
      //   //   })
      //   //   .catch(() => {
      //   //     this.$q.loading.hide();
      //   //     // this.EQUITAS_TRACKER_LIST();
      //   //     this.$q.notify({
      //   //       color: "negative",
      //   //       position: "bottom",
      //   //       message: error.body.message == null ? "Please Try Again Later !" : error.body.message,
      //   //       icon: "thumb_down"
      //   //     });
      //   //
      //   //   });

      //   // console.log(
      //   //   "final submit to mars",
      //   //   requestparams.params.merchant.salesInformation.institutionCode
      //   // );
      // },
      submitShortLead(request) {


        //  let terman
        this.$q.loading.show({
          delay: 100, // ms
          spinnerColor: "purple-9",
          message: "Please wait..",
        });
        if (
          this.propRowDetails &&
          this.propRowDetails.leadInformation &&
          this.propRowDetails.leadInformation.leadSource &&
          this.propRowDetails.leadInformation.leadSource.sourceName === 'LS_Wowpe'
        ) {

          this.DOCUMENT_APPROVE(this.propRowDetails.id)
            .then((response) => {
              this.$q.loading.hide();
              this.$emit("emitfnshowConvertToSat");
              this.$q.notify({
                color: "positive",
                position: "bottom",
                message: "data",
                icon: "thumb_up",
                message: "Terminal Details Successully Updated",
              });
            })

        } else {
          let key = this.getAllMarsData.salesInformation.institutionCode;
          this.$q.localStorage.set("a_t", key);
          let id = {
            data: {
              data: this.propRowDetails.leadInformation.id,
            },
          };
          if (this.propRowDetails.leadInformation.leadSource.multiTidEnabled == true) {
            this.tid = this.propRowDetails.subTidOfDbs
          } else {
            this.tid = this.propRowDetails.tid
          }
          let terminalparams = {
            terminal: {
              id: this.tid,

            },
            terminalparams: {
              merchant: {
                companyInformation: {
                  applicationNumber: this.getAllMarsData.salesInformation
                    .applicationNumber,
                },
                paymentDetails: {
                  deviceSerialNumber: request.paymentDetails.deviceSerialNumber,
                  installationDate: request.paymentDetails.installationDate,
                  deinstallationDate: request.paymentDetails.deinstallationDate,
                },
                kyc: request.kyc,
              },
            },
            data: this.propRowDetails

          };
          this.CMS_EDIT_TERMINAL_DEVICE(terminalparams)

            .then((response) => {
              this.DOCUMENT_APPROVE(this.propRowDetails.id);
              this.$q.loading.hide();
              this.$emit("emitfnshowConvertToSat");
              this.$q.notify({
                color: "positive",
                position: "bottom",
                message: "data",
                icon: "thumb_up",
                message: "Terminal Details Successully Updated",
              });
            })
            .catch((error) => {
              this.$q.loading.hide();
              console.log(error);
              this.$q.notify({
                color: "negative",
                position: "bottom",
                icon: "thumb_down",
                message: error.data.message,
              });

              // this.$router.push("sat/lead/lead/view/audocuments");
            });
        }


      },


      // submitShortLeadDuplicate(request) {
      //   let key = this.getAllMarsData.salesInformation.institutionCode;
      //   this.$q.localStorage.set("a_t", key);
      //   let id = {
      //     data: {
      //       data: this.propRowDetails.leadInformation.id,
      //     },
      //   };
      //   let terminalparams = {
      //     terminal: {
      //       id: this.propRowDetails.subTid,
      //     },
      //     terminalparams: {
      //       merchant: {
      //         companyInformation: {
      //           applicationNumber: this.getAllMarsData.salesInformation
      //             .applicationNumber,
      //         },
      //         // paymentDetails: request.paymentDetails

      //         paymentDetails: {
      //           deviceSerialNumber: request.paymentDetails.deviceSerialNumber,
      //           installationDate: request.paymentDetails.installationDate,
      //           deinstallationDate: request.paymentDetails.deinstallationDate,
      //         },
      //         kyc: request.kyc,
      //       },
      //     },
      //   };

      //   //  let terman
      //   this.$q.loading.show({
      //     delay: 100, // ms
      //     spinnerColor: "purple-9",
      //     message: "Please wait..",
      //   });

      //   this.CMS_EDIT_TERMINAL_DEVICE(terminalparams)

      //     .then((response) => {
      //       this.DOCUMENT_APPROVE(this.propRowDetails.id);

      //       // this.ajaxLoadAllLeadInfo({
      //       //   pagination: this.paginationControl,
      //       //   filter: this.filter
      //       // });

      //       this.$q.loading.hide();
      //       this.$emit("emitfnshowConvertToSat");
      //       this.$q.notify({
      //         color: "positive",
      //         position: "bottom",
      //         message: "data",
      //         icon: "thumb_up",
      //         message: "Terminal Details Successully Updated",
      //       });

      //       // location.reload();

      //       // this.CMS_EDIT_KYC(requestparams).then(response => {
      //       //   this.$q.loading.hide();
      //       //   this.$q.notify({
      //       //     color: "positive",
      //       //     position: "bottom",
      //       //     message: "data",
      //       //     icon: "thumb_up",
      //       //     message: "Merchant Details Successfully Updated"
      //       //   });
      //       // });
      //     })
      //     .catch((error) => {
      //       this.$q.loading.hide();
      //       console.log(error);
      //       this.$q.notify({
      //         color: "negative",
      //         position: "bottom",
      //         icon: "thumb_down",
      //         message: error.data.message,
      //       });

      //       // this.$router.push("sat/lead/lead/view/audocuments");
      //     });
      //   // this.CMS_EDIT_KYC(requestparams)

      //   //   .then(response => {
      //   //     this.$q.loading.hide();
      //   //     this.$q.notify({
      //   //       color: "positive",
      //   //       position: "bottom",
      //   //       message: "data",
      //   //       icon: "thumb_up",
      //   //       message: "Merchant Details Successfully Updated"
      //   //     });
      //   //   })
      //   //   .catch(error => {
      //   //     this.$q.loading.hide();
      //   //     console.log(error);
      //   //     this.$q.notify({
      //   //       color: "negative",
      //   //       position: "bottom",
      //   //       icon: "thumb_down",
      //   //       message: error.data.message
      //   //     });
      //   //   });
      //   // this.DOCUMENT_APPROVE(this.propRowDetails.id +"/2")
      //   //   .then(response => {
      //   //     this.$emit("emitfnshowConvertToSat");
      //   //     this.$q.loading.hide();
      //   //     // this.EQUITAS_TRACKER_LIST();
      //   //     this.$q.notify({
      //   //       color: "positive",
      //   //       position: "bottom",
      //   //       message: "This lead is Approved!",
      //   //       icon: "thumb_up"
      //   //     });
      //   //     location.reload();
      //   //   })
      //   //   .catch(() => {
      //   //     this.$q.loading.hide();
      //   //     // this.EQUITAS_TRACKER_LIST();
      //   //     this.$q.notify({
      //   //       color: "negative",
      //   //       position: "bottom",
      //   //       message: error.body.message == null ? "Please Try Again Later !" : error.body.message,
      //   //       icon: "thumb_down"
      //   //     });
      //   //
      //   //   });

      //   // console.log(
      //   //   "final submit to mars",
      //   //   requestparams.params.merchant.salesInformation.institutionCode
      //   // );
      // },
      ajaxLoadAllLeadInfo({ pagination, filter }) {
        // we set QTable to "loading" state
        this.$q.loading.show({
          delay: 0, // ms
          spinnerColor: "purple-9",
          message: "Fetching data ..",
        });
        this.EQUITAS_TRACKER_LIST({ pagination, filter })
          .then((res) => {
            // updating pagination to reflect in the UI
            this.paginationControl = pagination;

            // we also set (or update) rowsNumber
            this.paginationControl.rowsNumber = this.getEquitasReport.totalElements;
            this.paginationControl.page = this.getEquitasReport.number + 1;

            // then we update the rows with the fetched ones
            this.tableData = this.getEquitasReport.content;
            if (this.getEquitasReport.sort != null) {
              this.paginationControl.sortBy = this.getEquitasReport.sort[0].property;
              this.paginationControl.descending = this.getEquitasReport.sort[0].ascending;
            }

            // finally we tell QTable to exit the "loading" state
            this.$q.loading.hide();
          })
          .catch(() => {
            this.$q.loading.hide();
          });
      },
      finalFormSubmitKyc(request) {
        let key = this.getAllMarsData.salesInformation.institutionCode;
        this.$q.localStorage.set("a_t", key);
        let requestparams = {
          url: {
            id: this.getAllMarsData.merchantRefCode,
            //  code:this.getAllMarsData.salesInformation.institutionCode
          },

          params: {
            merchant: {
              companyInformation: {
                applicationNumber: this.getAllMarsData.salesInformation
                  .applicationNumber,
              },

              kyc: request.kyc,
            },
          },
        };

        // this.ajaxLoadLeadDataEntryInfo();
        this.CMS_EDIT_KYC(requestparams)

          .then((response) => {
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "data",
              icon: "thumb_up",
              message: response.data.message,
            });

            // var self = this;
            // Object.keys(this.formData).forEach(function(key, index) {
            //   self.formData[key] = "";
            // });
          })
          .catch((error) => {
            console.log(error);
            this.$q.notify({
              color: "negative",
              position: "bottom",
              icon: "thumb_down",
              message: error.data.message,
            });
            requestparams.params.kyc = "";
            // var self = this;
            // Object.keys(this.formData).forEach(function(key, index) {
            //   self.formData[key] = "";
            // });
          });
        console.log("final submit to mars", requestparams.url);
        this.DOCUMENT_APPROVE(this.data.data)
          .then((response) => {
            this.$emit("emitfnshowConvertToSat");
            this.$q.loading.hide();
            // this.EQUITAS_TRACKER_LIST();
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "This lead is Approved!",
              icon: "thumb_up",
            });
            location.reload();
          })
          .catch(() => {
            this.$q.loading.hide();
            // this.EQUITAS_TRACKER_LIST();
            this.$q.notify({
              color: "negative",
              position: "bottom",
              message: error.body.message == null ? "Please Try Again Later !" : error.body.message,
              icon: "thumb_down",
            });
            // this.$router.push("sat/lead/lead/view/audocuments");
          });
      },
    },

    fnleadSource(item) {
      this.formData.leadSource1 = item.id;
      this.formData.leadSource = item;
      let formData = {
        leadSource: this.formData.leadSource1,
        device: this.formData.deviceId,
        merchantType: this.formData.merchantCategory1,
      };
      let self = this;
      self.CATEGORY_BASED_MDR_PLAN(formData).then((response) => {
        if (response.status == 200) {
          this.formData.debitLessthanAmount =
            self.categoryBasedMdr.debitLessthanAmount;
          this.formData.debitGreaterthanAmount =
            self.categoryBasedMdr.debitGreaterthanAmount;
          this.formData.stdCC = self.categoryBasedMdr.stdCC;
          this.formData.premiumCC = self.categoryBasedMdr.premiumCC;
          this.formData.corpCC = self.categoryBasedMdr.corpCC;
          this.formData.intlCC = self.categoryBasedMdr.intlCC;
          this.formData.superPremiumlCC = self.categoryBasedMdr.superPremiumlCC;
        } else {
          this.$q.notify({
            color: "negative",
            position: "bottom-left",
            message: "Invalid IFSC code",
            icon: "clear",
          });
          this.formData.debitLessthanAmount = "";
          this.formData.debitGreaterthanAmount = "";
          this.formData.stdCC = "";
          this.formData.premiumCC = "";
          this.formData.corpCC = "";
          this.formData.intlCC = "";
          this.formData.superPremiumlCC = "";
        }
      });
    },
    fnDevice(item) {
      this.formData.deviceId = item.id;
      this.formData.device = item;
      let formData = {
        leadSource: this.formData.leadSource1,
        device: this.formData.deviceId,
        merchantType: this.formData.merchantCategory1,
      };
      let self = this;
      self.CATEGORY_BASED_MDR_PLAN(formData).then((response) => {
        if (response.status == 200) {
          this.formData.debitLessthanAmount =
            self.categoryBasedMdr.debitLessthanAmount;
          this.formData.debitGreaterthanAmount =
            self.categoryBasedMdr.debitGreaterthanAmount;
          this.formData.stdCC = self.categoryBasedMdr.stdCC;
          this.formData.premiumCC = self.categoryBasedMdr.premiumCC;
          this.formData.corpCC = self.categoryBasedMdr.corpCC;
          this.formData.intlCC = self.categoryBasedMdr.intlCC;
          this.formData.superPremiumlCC = self.categoryBasedMdr.superPremiumlCC;
        } else {
          this.$q.notify({
            color: "negative",
            position: "bottom-left",
            message: "Invalid IFSC code",
            icon: "clear",
          });
          this.formData.debitLessthanAmount = "";
          this.formData.debitGreaterthanAmount = "";
          this.formData.stdCC = "";
          this.formData.premiumCC = "";
          this.formData.corpCC = "";
          this.formData.intlCC = "";
          this.formData.superPremiumlCC = "";
        }
      });
    },
    fnPlan(item) {
      this.formData.planId = item.id;
      this.formData.plan = item;
      let formData = {
        leadSource: this.formData.leadSource1,
        device: this.formData.deviceId,
        plan: this.formData.planId,
      };
      let self = this;
      self.CATEGORY_BASED_RENTAL_PLAN(formData).then((response) => {
        if (response.status == 200) {
          this.formData.setupFees = self.categoryBasedRental.setupFees;
          this.formData.recurringFees = self.categoryBasedRental.monthlyFees;
        } else {
          this.$q.notify({
            color: "negative",
            position: "bottom-left",
            message: "Invalid MDR Plan Code",
            icon: "clear",
          });
          this.formData.setupFees = "";
          this.formData.monthlyFees = "";
        }
      });
    },
    fnMerchantCategory(item) {
      this.formData.merchantCategory1 = item.id;
      this.formData.merchantCategory = item;
      let formData = {
        leadSource: this.formData.leadSource1,
        device: this.formData.deviceId,
        merchantType: this.formData.merchantCategory1,
      };
      let self = this;
      self.CATEGORY_BASED_MDR_PLAN(formData).then((response) => {
        if (response.status == 200) {
          this.formData.debitLessthanAmount =
            self.categoryBasedMdr.debitLessthanAmount;
          this.formData.debitGreaterthanAmount =
            self.categoryBasedMdr.debitGreaterthanAmount;
          this.formData.stdCC = self.categoryBasedMdr.stdCC;
          this.formData.premiumCC = self.categoryBasedMdr.premiumCC;
          this.formData.corpCC = self.categoryBasedMdr.corpCC;
          this.formData.intlCC = self.categoryBasedMdr.intlCC;
          this.formData.superPremiumlCC = self.categoryBasedMdr.superPremiumlCC;
        } else {
          this.$q.notify({
            color: "negative",
            position: "bottom-left",
            message: "Invalid IFSC code",
            icon: "clear",
          });
          this.formData.debitLessthanAmount = "";
          this.formData.debitGreaterthanAmount = "";
          this.formData.stdCC = "";
          this.formData.premiumCC = "";
          this.formData.corpCC = "";
          this.formData.intlCC = "";
          this.formData.superPremiumlCC = "";
        }
      });
    },
    fnCategoryBasedMdr(request) {
      let formData = {
        leadSource: this.getActiveLeadSource.id,
        device: request.device,
        merchantType: request.merchantType,
      };
      let self = this;
      self.CATEGORY_BASED_MDR_PLAN(formData).then((response) => {
        if (response.status == 200) {
          this.formData.debitLessthanAmount =
            self.categoryBasedMdr.debitLessthanAmount;
          this.formData.debitGreaterthanAmount =
            self.categoryBasedMdr.debitGreaterthanAmount;
          this.formData.stdCC = self.categoryBasedMdr.stdCC;
          this.formData.premiumCC = self.categoryBasedMdr.premiumCC;
          this.formData.corpCC = self.categoryBasedMdr.corpCC;
          this.formData.intlCC = self.categoryBasedMdr.intlCC;
          this.formData.superPremiumlCC = self.categoryBasedMdr.superPremiumlCC;
        } else {
          this.$q.notify({
            color: "negative",
            position: "bottom-left",
            message: "Invalid IFSC code",
            icon: "clear",
          });
          this.formData.debitLessthanAmount = "";
          this.formData.debitGreaterthanAmount = "";
          this.formData.stdCC = "";
          this.formData.premiumCC = "";
          this.formData.corpCC = "";
          this.formData.intlCC = "";
          this.formData.superPremiumlCC = "";
        }
      });
    },
    fnCategoryBasedRental(request) {
      let formData = {
        leadSource: request.leadSource,
        device: request.device,
        plan: request.plan,
      };
      let self = this;
      self.CATEGORY_BASED_RENTAL_PLAN(formData).then((response) => {
        if (response.status == 200) {
          this.formData.setupFees = self.categoryBasedRental.setupFees;
          this.formData.monthlyFees = self.categoryBasedRental.monthlyFees;
        } else if (response.data == null) {
          this.formData.setupFees = 0;
          this.formData.monthlyFees = 0;
        } else {
          this.$q.notify({
            color: "negative",
            position: "bottom-left",
            message: "Invalid MDR Plan Code",
            icon: "clear",
          });
          this.formData.setupFees = "";
          this.formData.monthlyFees = "";
        }
      });
    },
    ajaxLoadMarsData() {
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data ..",
      });
      this.FETCH_MARS_DATA(this.propRowDetails.leadInformation.id)
        .then((response) => {
          // this.merchant.paymentDetails.settlementType = this.getAllMarsData.paymentDetails.settlementType;
          // this.merchant.paymentDetails.tipEnabled = this.getAllMarsData.paymentDetails.tipEnabled;
          // this.merchant.paymentDetails.cashAtPosEnabled = this.getAllMarsData.paymentDetails.cashAtPosEnabled;
          // this.merchant.paymentDetails.intlCardAcceptance = this.getAllMarsData.paymentDetails.intlCardAcceptance;
          // this.merchant.paymentDetails.preAuth = this.getAllMarsData.paymentDetails.preAuth;
          // this.merchant.paymentDetails.rentalPlanCode = this.getAllMarsData.paymentDetails.rentalPlanCode;
          // this.merchant.salesInformation.institutionCode = this.getAllMarsData.salesInformation.institutionCode;
          this.fetchAndCookDocuments();
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
      this.toggleAjaxLoadFilter = false;
    },
  };
</script>
