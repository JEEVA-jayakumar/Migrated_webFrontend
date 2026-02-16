<template>
  <div>
    <q-dialog
      class="customModalOverlay"
      v-model="toggleModel"
      @hide="emitToggleReject(toggleModel)"
      @escape-key="emitToggleReject(toggleModel)"
      :content-css="{ padding: '100px', minWidth: '70vw' }"
    >
      <div
        class="text-h6 q-px-lg q-py-md text-center justify-center text-weight-regular bottom-border text-grey-9"
      >
        <div class="col text-h6">Additional Info</div>
      </div>
      <q-card>
        <div class="q-px-md">
          <div class="q-pa-md">
            <div class="row gutter-sm q-py-sm">
              <div class="col-md-6">
                <q-select
                  placeholder="Choose from the below*"
                  color="grey-9"
                  @blur="$v.formdata.branchZone.$touch;"
                  :error="$v.formdata.branchZone.$error"
                  v-model.trim="formdata.branchZone"
                  float-label="Zone*"
                  :options="getAllZone"
                  @clear="fnClearZone"
                  @input="fnFetchZone()"
                />
              </div>
              <div class="col-md-6">
                <q-select
                  placeholder="Choose from the below*"
                  color="grey-9"
                  @blur="$v.formdata.iaDistrict.$touch;"
                  :error="$v.formdata.iaDistrict.$error"
                  v-model.trim="formdata.iaDistrict"
                  float-label="IA_District*"
                  :options="getAllDistrict"
                  @input="fnFetchBranchName()"
                />
              </div>
              <div class="col-md-6">
                <q-select
                  disable
                  placeholder="Choose from the below*"
                  color="grey-9"
                  v-model.trim="formdata.raDistrict"
                  float-label="RA_District*"
                  :options="getAllDistrict"
                  @clear="fnClearZone"
                  @input="fnFetchZone()"
                />
              </div>
              <div class="col-md-6">
                <q-select
                  disable
                  placeholder="Choose from the below*"
                  color="grey-9"
                  v-model.trim="formdata.od1District"
                  float-label="OD1_District*"
                  :options="getAllDistrict"
                  @clear="fnClearZone"
                  @input="fnFetchZone()"
                />
              </div>
              <div class="col-md-6">
                <q-select
                  disable
                  placeholder="Choose from the below*"
                  color="grey-9"
                  v-model.trim="formdata.od2District"
                  float-label="OD2_District*"
                  :options="getAllDistrict"
                />
              </div>
              <div class="col-md-6">
                <q-select
                  placeholder="Choose from the below*"
                  color="grey-9"
                  @blur="$v.formdata.installationBranchCode.$touch;"
                  :error="$v.formdata.installationBranchCode.$error"
                  v-model.trim="formdata.installationBranchCode"
                  float-label="InstallationBranchName*"
                  :options="getAllBranchName"
                />
              </div>
              <div class="col-md-6">
                <q-input
                  color="grey-9"
                  @blur="$v.formdata.lorState.$touch;"
                  :error="$v.formdata.lorState.$error"
                  v-model.trim="formdata.lorState"
                  float-label="IOR_STATE(type min 3 characters)*"
                  placeholder="Start typing ..*"
                >
                  <q-autocomplete
                    separator
                    @search="searchIorState"
                    :debounce="10"
                    :min-characters="3"
                  />
                </q-input>
              </div>
              <div class="col-md-6">
                <q-input
                  color="grey-9"
                  @blur="$v.formdata.pin.$touch;"
                  :error="$v.formdata.pin.$error"
                  v-model.trim="formdata.pin"
                  float-label="Pincode"
                  placeholder="Start typing ..*"
                  @input="pincodeBasedDistrict"
                >
                  <q-autocomplete
                    separator
                    @search="searchAxisBankPincode"
                    :min-characters="3"
                  />
                </q-input>
              </div>

              <div class="col-md-6">
                <q-select
                  placeholder="Choose from the below*"
                  color="grey-9"
                  v-model.trim="formdata.state"
                  float-label="State*"
                  @input="pincodeandDistrictBasedCity"
                  :options="getPincodeBasedDistrict"
                />
              </div>
              <div class="col-md-6">
                <q-select
                  placeholder="Choose from the below*"
                  color="grey-9"
                  @blur="$v.formdata.city.$touch;"
                  :error="$v.formdata.city.$error"
                  v-model.trim="formdata.city"
                  float-label="City*"
                  :options="getPincodeDistrict"
                  @input="citybasedlocation"
                />
              </div>
              <div class="col-md-6">
                <q-select
                  placeholder="Choose from the below*"
                  color="grey-9"
                  v-model.trim="formdata.iaLocation"
                  float-label="IA_LOCATION*"
                  :options="getCityBasedLocation"
                />
              </div>
              <div class="col-md-6">
                <q-select
                  placeholder="Choose from the below*"
                  color="grey-9"
                  v-model.trim="formdata.iaSalutation"
                  float-label="IA_Salution*"
                  :options="iaSalutationOptions"
                />
              </div>
              <div class="col-md-6">
                <q-select
                  placeholder="Choose from the below*"
                  color="grey-9"
                  v-model.trim="formdata.iaGender"
                  float-label="IA_Gender*"
                  :options="iaGenderOptions"
                />
              </div>
              <div class="col-md-6">
                <q-select
                  placeholder="Choose from the below*"
                  color="grey-9"
                  v-model.trim="formdata.od1Salutation"
                  float-label="OD1_Salutation*"
                  :options="od1SalutationOptions"
                />
              </div>
              <div class="col-md-6">
                <q-select
                  placeholder="Choose from the below*"
                  color="grey-9"
                  v-model.trim="formdata.od1Gender"
                  float-label="OD1_Gender*"
                  :options="od1GenderOptions"
                />
              </div>
              <div class="col-md-6">
                <q-select
                  placeholder="Choose from the below*"
                  color="grey-9"
                  v-model.trim="formdata.od2Salutation"
                  float-label="OD2_Salutation*"
                  :options="od2SalutationOptions"
                />
              </div>
              <div class="col-md-6">
                <q-select
                  placeholder="Choose from the below*"
                  color="grey-9"
                  v-model.trim="formdata.od2Gender"
                  float-label="OD2_Gender*"
                  :options="od2GenderOptions"
                />
              </div>
            </div>
          </div>
          <div align="right">
            <q-btn
              color="positive"
              class="q-ma-sm float-right"
              @click="finalFormSubmit(formdata)"
              align="right"
              label="Submit To Mars"
            />
            <q-btn
              align="right"
              color="grey-9"
              class="float-right q-ma-sm"
              @click="emitToggleReject(showRejectAdditionalInfo)"
              >Cancel
            </q-btn>
          </div>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { required } from "@vuelidate/validators";
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
import { date } from "quasar";

export default {
  props: ["showRejectAdditionalInfo", "propToggleadditionalInfo"],

  data() {
    return {
      toggleModel: this.propToggleadditionalInfo,
      formdata: {
        installationBranchCode: "",
        iaLocation: "",
        iaDistrict: "",
        branchZone: "",
        raDistrict: "",
        od1District: "",
        od2District: "",
        lorState: "",
        iaSalutation: "",
        iaGender: "",
        od1Salutation: "",
        od1Gender: "",
        od2Salutation: "",
        od2Gender: "",
        state: "",
        city: "",
        pin: "",
      },
      iaSalutationOptions: [
        {
          label: "MR",
          value: "Mr",
        },
        {
          label: "MRS",
          value: "Mrs",
        },
        {
          label: "Ms",
          value: "Ms",
        },
      ],
      iaGenderOptions: [
        {
          label: "Male",
          value: "M",
        },
        {
          label: "FeMale",
          value: "F",
        },
        {
          label: "Transgender",
          value: "T",
        },
      ],
      od1SalutationOptions: [
        {
          label: "MR",
          value: "Mr",
        },
        {
          label: "MRS",
          value: "Mrs",
        },
        {
          label: "MS",
          value: "Ms",
        },
      ],
      od1GenderOptions: [
        {
          label: "Male",
          value: "M",
        },
        {
          label: "FeMale",
          value: "F",
        },
        {
          label: "Transgender",
          value: "T",
        },
      ],
      od2SalutationOptions: [
        {
          label: "MR",
          value: "Mr",
        },
        {
          label: "MRS",
          value: "Mrs",
        },
        {
          label: "MS",
          value: "Ms",
        },
      ],
      od2GenderOptions: [
        {
          label: "Male",
          value: "M",
        },
        {
          label: "FeMale",
          value: "F",
        },
        {
          label: "Transgender",
          value: "T",
        },
      ],
      merchant: this.propToggleadditionalInfo.merchant,
      propLeadDeatils: this.propToggleadditionalInfo.propLeadDeatils,
      leadId: this.propToggleadditionalInfo.leadId,
      diners: this.propToggleadditionalInfo.diners,
      data: this.propToggleadditionalInfo.data,
      holdPayment: this.propToggleadditionalInfo.holdPayment,
      multiTidpaymentMode: this.propToggleadditionalInfo.multiTidpaymentMode,
    };
  },
  computed: {
    ...mapGetters("District", ["getAllDistrict"]),
    ...mapGetters("BranchName", ["getAllBranchName"]),
    ...mapGetters("PincodeBasedDistrict", ["getPincodeBasedDistrict"]),
    ...mapGetters("AllZone", ["getAllZone"]),
    ...mapGetters("StateBasedDistrict", ["getPincodeDistrict"]),
    ...mapGetters("StateName", ["getiorState"]),
    ...mapGetters("AxisBankPincode", ["getAxisBankPincode"]),
    ...mapGetters("CityBasedLocation", ["getCityBasedLocation"]),
    ...mapGetters("AllZone", ["getAllZone"]),
    ...mapGetters("InstitutionCode", ["getinstitutionCode"]),
  },
  error: {
    branchZone: {
      alert: false,
      issue: "",
      value: "",
    },
    city: {
      alert: false,
      issue: "",
      value: "",
    },
    iaDistrict: {
      alert: false,
      issue: "",
      value: "",
    },
    installationBranchCode: {
      alert: false,
      issue: "",
      value: "",
    },
    lorState: {
      alert: false,
      issue: "",
      value: "",
    },
    pin: {
      alert: false,
      issue: "",
      value: "",
    },
  },
  validations: {
    formdata: {
      branchZone: {
        required,
      },
      city: {
        required,
      },
      iaDistrict: {
        required,
      },
      installationBranchCode: {
        required,
      },
      lorState: {
        required,
      },
      pin: {
        required,
      },
    },
  },
  beforeMount() {
    this.merchant = this.propToggleadditionalInfo.merchant;
    this.holdPayment = this.propToggleadditionalInfo.holdPayment;
    this.multiTidpaymentMode = this.propToggleadditionalInfo.multiTidpaymentMode;
   
    this.data = this.propToggleadditionalInfo.data.institutionCode;
    this.merchant.leadId = this.propToggleadditionalInfo.leadId;
    // this.institutionCode = this.propToggleadditionalInfo.data.institutionCode;
    this.propLeadDeatils = this.propToggleadditionalInfo.propLeadDeatils;
    this.diners = this.propToggleadditionalInfo.diners;
  
  },
  created() {
    this.fetchAllZone();
    this.fetchAllDistrict();
    this.fetchInstutionCode();
  },
  methods: {
    ...mapActions("District", ["FETCH_ALL_DISTRICT"]),
    ...mapActions("BranchName", ["FECTCH_ALL_BRANCH"]),
    ...mapActions("PincodeBasedDistrict", ["FETCH_AXIS_BANK_PINCODE_BASED_DISTRICT"]),
    ...mapActions("StateBasedDistrict", ["FETCH_AXIS_BANK_PINCODE_DISTRICT"]),
    ...mapActions("CityBasedLocation", ["FETCH_AXIS_BANK_CITY_LOCATION"]),
    ...mapActions("StateName", ["FETCH_IOR_STATE"]),
    ...mapActions("InstitutionCode", ["INSTITUTIONCODE_FROM_FROM_MARS"]),
    ...mapActions("leadInformationVasMapping", [
      "LEAD_INFORMATION_VAS_MAPPING_DERTAILS",
      "SAVEING_THE_LEAD_STATUS_DETAILS",
      "GET_LEAD_INFORMATION_VAS_MAPPING_DERTAILS",
      "CREATE_BASE_TID",
      "LOAD_GET_SUB_TID_LIST",
      "GET_BASE_TID_LIST",
      "GET_SUB_TID_LIST",
      "CREATE_SUB_TIDS_LIST",
    ]),

    ...mapActions("AxisBankPincode", ["FETCH_AXIS_BANK_PINCODE_LOCATION"]),
    ...mapActions("mars_dataSubmit", [
      "MARS_DATA_SUBMIT_INTERNAL",
      "MARS_DATA_SUBMIT_EXTERNAL",
      "MARS_DATA_EXTERNAL_SUBMIT_RESPONSE",
      "SUBMIT_SUB_TID_MERCHANT_REF_CODE_DETAILS",
      "FETCH_SAVED_DATA_FROM_OWN_DB",
    ]),
    ...mapActions("AllZone", ["FETCH_ALL_ZONE"]),

    emitToggleReject(showRejectAdditionalInfo) {
      this.$emit("closeRejectModel");
    },
    pincodeBasedDistrict() {
      this.FETCH_AXIS_BANK_PINCODE_BASED_DISTRICT(this.formdata.pin);
    },
    fetchAllZone() {
      this.FETCH_ALL_ZONE();
    },
    fetchInstutionCode() {
      this.INSTITUTIONCODE_FROM_FROM_MARS();
    },
    searchIorState(request, done) {
      this.FETCH_IOR_STATE(request);
      done(this.getiorState);
    },
    citybasedlocation() {
      this.FETCH_AXIS_BANK_CITY_LOCATION(this.formdata.city);
    },
    searchAxisBankPincode(request, done) {
      this.FETCH_AXIS_BANK_PINCODE_LOCATION(request);
      done(this.getAxisBankPincode);
    },
    pincodeandDistrictBasedCity() {
      this.FETCH_AXIS_BANK_PINCODE_DISTRICT(
        this.formdata.pin + "/" + this.formdata.state
      );
    },
    commonDateFormatInvalidMARSformat(selectedDate) {
      if (selectedDate == "" || selectedDate == null || selectedDate == "Invalid date") {
        return null;
      } else {
        return moment(selectedDate, "DD/MM/YYYY").format("YYYY-MM-DD");
      }
    },
    commonDateFormatDOB1(selectedDate) {
      if (selectedDate == "" || selectedDate == null || selectedDate == "Invalid date") {
        return null;
      } else {
        if (typeof selectedDate === "number") {
          // alert("qwertyuio");
          return moment(selectedDate).format("DD/MM/YYYY");
        } else {
          return selectedDate;
        }
      }
    },
    fnFetchZone() {
      this.FETCH_ALL_DISTRICT(this.formdata.branchZone);
    },
    fetchAllDistrict() {
      this.FETCH_ALL_DISTRICT();
    },
    fnClearZone() {
      this.formdata.branchZone = "";
    },
    fnFetchBranchName() {
      this.FECTCH_ALL_BRANCH(this.formdata.iaDistrict);
      this.formdata.raDistrict = this.formdata.iaDistrict;
      this.formdata.od1District = this.formdata.iaDistrict;
      this.formdata.od2District = this.formdata.iaDistrict;
    },
    updateLeadStatus(request) {
      this.SAVEING_THE_LEAD_STATUS_DETAILS(request)
        .then((response) => {
          if (response.status == 200) {
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: response.message,
              icon: "thumb_up",
            });
          } else {
            this.$q.notify({
              color: "negative",
              position: "bottom",
              message: "Something went wrong!",
              icon: "clear",
            });
          }
        })
        .catch((error) => {
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message:
              error.body != null
                ? error.body.message
                : "Lead Information status update failed!",
            icon: "clear",
          });
          this.$q.loading.hide();
        });
    },
    finalFormSubmit(request) {
      this.$v.formdata.$touch();
      if (this.$v.formdata.$error) {
        this.$q.notify({
          color: "negative",
          position: "bottom",
          message: "Please fill all mandatory fields",
          icon: "info",
        });
        // this.$emit("closeRejectModel","refresh");
      } else {
        this.subTidArr = [];
        this.subTidArr.push({ request });
        let self = this;
        self.$q.loading.show({
          delay: 0, // ms
          spinnerColor: "purple-9",
          message: "Validating ..",
        });
        const finalRequest = {
          action: 2,
          merchant: self.merchant,
        };
        finalRequest.merchant.leadId = self.$route.params.id;
        finalRequest.merchant.holdPayment = finalRequest.holdPayment;
        let a = {
          ...finalRequest.merchant.mdrPlan,
        };
        finalRequest.merchant.mdrPlan = {
          ...a,
          diners: this.diners,
        };
        finalRequest.merchant.businessInformation.currentPosName =
          finalRequest.merchant.businessInformation.currentPosName == "N"
            ? ""
            : finalRequest.merchant.businessInformation.currentPosName;
        finalRequest.merchant.companyInformation.constitutionName =
          finalRequest.merchant.companyInformation.constitutionName == "61"
            ? "60"
            : finalRequest.merchant.companyInformation.constitutionName;
        (finalRequest.merchant.paymentDetails.emiStartDate = this.commonDateFormatDOB1(
          finalRequest.merchant.paymentDetails.emiStartDate
        )),
          (finalRequest.merchant.revParamAndLeadInfo = {
            bijlipaySwitch: this.propLeadDeatils.bijlipaySwitch,
            vasInstanceMapping: this.propLeadDeatils.vasInstanceMapping,
          });
        finalRequest.merchant.revParameters.notificationRecipient =
          finalRequest.merchant.revParameters.notificationRecipient == "N"
            ? null
            : finalRequest.merchant.revParameters.notificationRecipient;
                       

                finalRequest.merchant.revParameters.upiFlag = finalRequest.merchant.revParameters.upiFlag == "1" ? "0" : finalRequest.merchant.revParameters.upiFlag;

        finalRequest.merchant.bankInformation.bankDetails.paymentMode = this.propToggleadditionalInfo.multiTidpaymentMode.paymentMode;
        finalRequest.merchant.additionalInfo = this.formdata;

        self
          .MARS_DATA_SUBMIT_INTERNAL(finalRequest)
          .then((response) => {
            self.$q.loading.show({
              delay: 0, // ms
              spinnerColor: "purple-9",
              message: "Saved.. Sending data to mars",
            });

            let key = this.data;
            this.$q.localStorage.set("aa_t", key);
            delete this.merchant.customIncentiveRates[0].add;
            delete this.merchant.customIncentiveRates[1].add;
            delete this.merchant.customIncentiveRates[2].add;
            delete this.merchant.customIncentiveRates[3].add;
            delete this.merchant.customIncentiveRates[4].add;

            delete finalRequest.merchant.leadId;
            delete finalRequest.action;
            delete finalRequest.merchant.revParamAndLeadInfo;
            delete finalRequest.merchant.holdPayment;
            delete finalRequest.merchant.SharingDiscountFee;
            if (this.propLeadDeatils.mAtmOnboardingPlan != null) {
              if (
                this.propLeadDeatils.mAtmOnboardingPlan.leadSource.sourceName == "ATM" &&
                this.propLeadDeatils.mAtmOnboardingPlan.planName == "Kannor ATM Plan"
              ) {
                finalRequest.merchant.mdrPlan.incentive.fixed =
                  finalRequest.merchant.mdrPlan.incentive.fixed;
                finalRequest.merchant.mdrPlan.incentive.percentage =
                  finalRequest.merchant.mdrPlan.incentive.percentage;
                finalRequest.merchant.mdrPlan.incentive.minimum =
                  finalRequest.merchant.mdrPlan.incentive.minimum;
                finalRequest.merchant.mdrPlan.incentive.minimumTxnValue =
                  finalRequest.merchant.mdrPlan.incentive.minimumTxnValue;
              } else {
                finalRequest.merchant.mdrPlan.incentive.percentage =
                  finalRequest.merchant.mdrPlan.incentive.percentage == 0
                    ? null
                    : finalRequest.merchant.mdrPlan.incentive.percentage;
                finalRequest.merchant.mdrPlan.incentive.fixed =
                  finalRequest.merchant.mdrPlan.incentive.fixed == 0
                    ? null
                    : finalRequest.merchant.mdrPlan.incentive.fixed;
                finalRequest.merchant.mdrPlan.incentive.minimum =
                  finalRequest.merchant.mdrPlan.incentive.minimum == 0
                    ? null
                    : finalRequest.merchant.mdrPlan.incentive.minimum;
                finalRequest.merchant.mdrPlan.incentive.minimumTxnValue =
                  finalRequest.merchant.mdrPlan.incentive.minimumTxnValue == 0
                    ? null
                    : finalRequest.merchant.mdrPlan.incentive.minimumTxnValue;
              }
            } else {
              finalRequest.merchant.mdrPlan.incentive.percentage =
                finalRequest.merchant.mdrPlan.incentive.percentage == 0
                  ? null
                  : finalRequest.merchant.mdrPlan.incentive.percentage;
              finalRequest.merchant.mdrPlan.incentive.fixed =
                finalRequest.merchant.mdrPlan.incentive.fixed == 0
                  ? null
                  : finalRequest.merchant.mdrPlan.incentive.fixed;
              finalRequest.merchant.mdrPlan.incentive.minimum =
                finalRequest.merchant.mdrPlan.incentive.minimum == 0
                  ? null
                  : finalRequest.merchant.mdrPlan.incentive.minimum;
              finalRequest.merchant.mdrPlan.incentive.minimumTxnValue =
                finalRequest.merchant.mdrPlan.incentive.minimumTxnValue == 0
                  ? null
                  : finalRequest.merchant.mdrPlan.incentive.minimumTxnValue;
            }
            finalRequest.merchant.paymentDetails.numberOfTerminals = 1;
            let size = finalRequest.merchant.partnerInformation.length;
           
            for (var i = 0; i < size; i++) {
              finalRequest.merchant.partnerInformation[i].dob = this.commonDateFormatDOB1(
                finalRequest.merchant.partnerInformation[i].dob
              );
            }
            finalRequest.merchant.revParameters.isMTIDEnabled =
              this.propToggleadditionalInfo.data.subTid == true ? 1 : 0;
            finalRequest.merchant.revParameters.bTID =
              this.propToggleadditionalInfo.data.baseTid != null
                ? this.propToggleadditionalInfo.data.baseTid
                : "null";
            finalRequest.merchant.revParameters.scheme =
              this.propToggleadditionalInfo.data.scheme != null
                ? this.propToggleadditionalInfo.data.scheme
                : "null";
            finalRequest.merchant.revParameters.rrId =
              this.propToggleadditionalInfo.data.rrId != null
                ? this.propToggleadditionalInfo.data.rrId
                : "null";
            finalRequest.merchant.revParameters.tidIdentifier =
              this.propToggleadditionalInfo.data.tidIdentifier != null
                ? this.propToggleadditionalInfo.data.tidIdentifier
                : "null";
            finalRequest.merchant.salesInformation.institutionCode = this.propToggleadditionalInfo.data.institutionCode;
          

            finalRequest.merchant.revParameters.combinedSettlementFlag = this.propToggleadditionalInfo.multiTidpaymentMode.combinedSettlementFlag;
            finalRequest.merchant.revParameters.ONBOARDING_REQD = this.propToggleadditionalInfo.multiTidpaymentMode.ONBOARDING_REQD;
            finalRequest.merchant.partnerInformation.dob = this.merchant.partnerInformation.dob;
            self
              .MARS_DATA_SUBMIT_EXTERNAL({
                params: finalRequest,
                leadStatus: this.propLeadDeatils.leadStatus,
                refNumber: this.propLeadDeatils.merchantRefCode,
              })

              .then((response) => {
                let feed_paramaters;
                if (response.status == 204) {
                  feed_paramaters = {
                    applicationNumber: this.propLeadDeatils.applicationNumber,
                    merchantRefCode: this.propLeadDeatils.merchantRefCode,
                  };
                } else {
                  feed_paramaters = response.body;
                }
                self.$q.loading.show({
                  delay: 0, // ms
                  spinnerColor: "purple-9",
                  message: "Great.. All set to go",
                });
                if (this.propLeadDeatils.leadSource.multiTidEnabled == true) {
                  let param = {
                    merchantRefCode: feed_paramaters.merchantRefCode,
                    marsDeviceId: this.propToggleadditionalInfo.data.id,
                  };
                  self
                    .SUBMIT_SUB_TID_MERCHANT_REF_CODE_DETAILS(param)
                    .then((response) => {
                      self.$q.notify({
                        color: "positive",
                        position: "bottom",
                        message: "Successfully submitted to MARS",
                        icon: "thumb_up",
                      });
                      self.$q.loading.hide();
                    });
                  self.updateLeadStatus({ leadId: self.$route.params.id, status: 104 });
                }
                self
                  .MARS_DATA_EXTERNAL_SUBMIT_RESPONSE({
                    request: feed_paramaters,
                    leadId: self.$route.params.id,
                  })
                  .then((response) => {
                    self.$q.notify({
                      color: "positive",
                      position: "bottom",
                      message: "Successfully submitted to MARS",
                      icon: "thumb_up",
                    });
                    this.$emit("closeRejectModel", "refresh");

                    // self.loadingSubTid({ leadId: self.$route.params.id });
                    // this.$emit("closeRejectModel","refresh");
                    // this.emitToggleReject(toggleModel);
                    // this.emitToggleReject(showRejectAdditionalInfo);
                  });
              })
              .catch((error) => {
                this.merchant.companyInformation.constitutionName = this.propLeadDeatils.merchantType.merchantTypeName;
                this.$set(
                  finalRequest.merchant.salesInformation,
                  "applicationDate",
                  this.commonDateFormatInvalidMARSformat(
                    finalRequest.merchant.salesInformation.applicationDate
                  )
                );

                this.$set(
                  finalRequest.merchant.salesInformation,
                  "aggreementDate",
                  this.commonDateFormatInvalidMARSformat(
                    finalRequest.merchant.salesInformation.aggreementDate
                  )
                );

                this.$set(
                  finalRequest.merchant.salesInformation,
                  "loanDisbursementDate",
                  this.commonDateFormatInvalidMARSformat(
                    finalRequest.merchant.salesInformation.loanDisbursementDate
                  )
                );

                this.$set(
                  finalRequest.merchant.salesInformation,
                  "tenureStartDate",
                  this.commonDateFormatInvalidMARSformat(
                    finalRequest.merchant.salesInformation.tenureStartDate
                  )
                );

                this.$set(
                  finalRequest.merchant.companyInformation,
                  "establishYear",
                  this.commonDateFormatInvalidMARSformat(
                    finalRequest.merchant.companyInformation.establishYear
                  )
                );

                this.$set(
                  finalRequest.merchant.bankInformation.collectionDetails,
                  "chequeDepositedDate",
                  this.commonDateFormatInvalidMARSformat(
                    finalRequest.merchant.bankInformation.collectionDetails
                      .chequeDepositedDate
                  )
                );

                this.$set(
                  finalRequest.merchant.bankInformation.collectionDetails,
                  "collectedDate",
                  this.commonDateFormatInvalidMARSformat(
                    finalRequest.merchant.bankInformation.collectionDetails.collectedDate
                  )
                );

                this.$set(
                  finalRequest.merchant.bankInformation.collectionDetails,
                  "chequeDate",
                  this.commonDateFormatInvalidMARSformat(
                    finalRequest.merchant.bankInformation.collectionDetails.chequeDate
                  )
                );

                this.$set(
                  finalRequest.merchant.businessInformation,
                  "memberSince",
                  this.commonDateFormatInvalidMARSformat(
                    finalRequest.merchant.businessInformation.memberSince
                  )
                );
                this.$set(
                  finalRequest.merchant.businessInformation,
                  "lastTurnoverYear",
                  this.commonDateFormatInvalidMARSformat(
                    finalRequest.merchant.businessInformation.lastTurnoverYear
                  )
                );

                if (error.data.hasOwnProperty("errorDetails")) {
                  let OThis = this;
                  _.map(error.data.errorDetails, (actual) => {
                    let splitted = actual.field.split("/");
                    if (splitted[1].slice(0, 18) == "partnerInformation") {
                      let findPartnersErrorIndex = actual.field
                        .split("partnerInformation")[1]
                        .slice(1, 2);
                      let computeSplitted = splitted[splitted.length - 1];
                      let fieldErrorFound = eval(`
                        OThis.$v.viewBinding.partnersArr.$each[
                          ${findPartnersErrorIndex}
                        ].${computeSplitted}`);
                      fieldErrorFound.$model = "";
                      OThis.error.tab.partnerInformation = true;

                      let generateErrorMessage = eval(`
                        OThis.error.field.merchant.partnerInformation[
                          ${findPartnersErrorIndex}
                        ]`);
                      generateErrorMessage.alert = true;
                      generateErrorMessage.issue = actual.issue;
                      generateErrorMessage.value = actual.value;
                    } else {
                      let splittingErrorField = `OThis.$v.${splitted.join(".")}`;
                      let fieldErrorFound = eval(splittingErrorField);
                      fieldErrorFound.$model = "";
                      OThis.$set(OThis.error.tab, splitted[1], true);

                      let generateErrorMessage = eval(
                        `OThis.error.field.${splitted.join(".")}`
                      );
                      generateErrorMessage.alert = true;
                      generateErrorMessage.issue = actual.issue;
                      generateErrorMessage.value = actual.value;
                    }
                  });
                  this.$q.notify({
                    color: "negative",
                    position: "bottom",
                    message: `${error.data.message}`,
                    icon: "thumb_down",
                  });
                } else {
                  this.$q.notify({
                    color: "negative",
                    position: "bottom",
                    message: `${error.data.message}`,
                    icon: "thumb_down",
                  });
                }
                self.$q.loading.hide();
              });
          })
          .catch(() => {
            self.$q.loading.hide();
          });
      }
    },
  },
};
</script>
