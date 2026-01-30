<template>
  <div>
     <div class="col-md-7 q-px-xl">
        <div class="row  gutter-md">
          <div class="col-md-8" align="center">
             <div class="col-12 q-title q-my-lg text-weight-regular">Existing M-ATM Plan</div>
          </div>
          <!-- <div class="col-md-5">
            <q-select
              type="text"
              :error="$v.formData.plan.$error"
              @blur="$v.formData.plan.$touch"
              v-model.trim="formData.plan"
              float-label="Name of the Plan*"
              :options="getinstitutionCode"
               @selected="selectedPlan"
            />
            "planName":"One Month Plan",
    "incentivePercentage":"3",
    "minTxnVal":"9",
    "maxIncPerTxn":"7.96",
    "active":"true"
         </div> -->
          <div class="col-md-5">
              <q-input
                v-model.trim="formData.planName"
                @blur="$v.formData.planName.$touch"
                :error="$v.formData.planName.$error"
                class="text-weight-regular text-grey-8"
                color="grey-9"
                float-label="Name of the Plan*"
                placeholder="Name of the Plan*"
              />
            </div>
          
         <div class="col-md-5">
            <q-input
              type="number"
              v-model.trim="formData.incentivePercentage"
              @blur="$v.formData.incentivePercentage.$touch"
              :error="$v.formData.incentivePercentage.$error"
              float-label="Incentive Percentage *"
              color="grey-9"
            />
          </div>
         
           <div class="col-md-5">
            <q-input
              type="number"
              v-model.trim="formData.minTxnVal "
              @blur="$v.formData.minTxnVal.$touch"
              :error="$v.formData.minTxnVal.$error"
              float-label="Minimum Transaction Value*"
              color="grey-9"
             
            />
          </div>
          <div class="col-md-5">
            <q-input
              type="number"
              v-model.trim="formData.maxIncPerTxn"
              @blur="$v.formData.maxIncPerTxn.$touch"
              :error="$v.formData.maxIncPerTxn.$error"
              float-label="Maximum Incentive Per Transaction *"
              color="grey-9"
             
            />
          </div>
          
        </div>
      <div class="full-width group" align="right">
        <q-btn flat class="bg-white text-weight-regular text-grey-8" @click="GoToUsers()">Cancel</q-btn>
        <!-- <q-btn class="text-weight-regular" color="amber-9" @click="refreshData()">Reset</q-btn> -->
        <q-btn
          type="button"
          color="purple-9"
          @click="fnsubmitPlans(formData)"
        >Submit</q-btn>
      </div>
      </div>
  </div>
</template>

<script>
import uploadFile from "../../components/super_admin/uploadFile.vue";
import {
  required,
  email,
  requiredIf,
  branch_code,
  minLength,
  maxLength,
  alpha,
  alphaNum,
  numeric
} from "vuelidate/lib/validators";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    uploadFile
  },
  data() {
    return {
     propShowCreateUploadFile: false,
      leadSourceOptions: [],
      dataCopy: [],
      dataPlan: [],
      propRowDetails: {},

      formData: {
        planName: "",
        incentivePercentage: "",
        minTxnVal: "",
        maxIncPerTxn: "",
      }
    };
  },

  validations: {
    formData: {
      planName: {
        required
      },
      incentivePercentage: {
        required
      },
      minTxnVal: {
        required
      },
      maxIncPerTxn: {
        required
      },
    }
  },

  beforeMount(){
//    this.fetchAllDropdownValuesFromMARSapi(
//       this.merchant.salesInformation.institutionCode
//     );
      this.propRowDetails = this.$route.params.data;
       console.log("DATA PLANS 12345----------->"+JSON.stringify(this.propRowDetails))
      // this.dataPlan = this.getMatmPlanDetails
      //   console.log("DATA PLAN1111---------------->"+JSON.stringify(this.dataPlan))
          this.formData.planName = this.propRowDetails.planName;
           this.formData.incentivePercentage = this.propRowDetails.incentivePercentage;
          this.formData.minTxnVal = this.propRowDetails.minTxnVal;
         this.formData.maxIncPerTxn = this.propRowDetails.maxIncPerTxn;
         {
   
    
}
        // console.log("DATA PLAN-1111--------------->"+JSON.stringify(this.plan))
        // console.log("DATA PERCENTAGE-1111--------------->"+JSON.stringify(this.InPercentage ))
        // console.log("DATA MIN TRANSACTION---1111------------->"+JSON.stringify(this.minTransacVal ))
        // console.log("DATA MAX TRANSACTION--1111------------->"+JSON.stringify( this.maxTransacVal))
  },
  computed: {
    ...mapGetters("leadSource", ["getActiveLeadSource"]),
     ...mapGetters("getMatmDatas", ["getMatmPlanDetails"]),
    ...mapGetters("InstitutionCode", ["getinstitutionCode"]),
    ...mapGetters("updatePlanDetails", ["getUpdatePlanDetailsDatas"]),
  },
  created() {
    this.ajaxLoadLeadSource();
    this.fetchInstutionCode();
    this.ajaxLoadPlanInfo();
  },
  methods: {
    ...mapActions("leadSource", ["LEAD_SOURCE_ACTIVE_LIST"]),
    ...mapActions("getMatmDatas",["FETCH_ALL_MATM_PLAN_DETAILS"]),
    ...mapActions("InstitutionCode", ["INSTITUTIONCODE_FROM_FROM_MARS"]),
    ...mapActions("updatePlanDetails",["UPDATE_PLAN_DETAILS_DATAS"]),
    ...mapActions("Bank_SO", ["SAVE_BANK_SO"]),
    // fnSubmitBankDetails(formData) {
    //   this.$v.formData.$touch();
    //   if (this.$v.formData.$error) {
    //     this.$q.notify("Please review fields again.");
    //     // return;
    //   } else {
    //     this.SAVE_BANK_SO(formData)
    //       .then(response => {
    //         this.$q.notify({
    //           color: "positive",
    //           position: "bottom",
    //           message: response.data.message,
    //           icon: "thumb_up"
    //         });
    //         this.formData.planName = "";
    //         this.formData.InPercentage = "";
    //         this.formData.minTransacVal = "";
    //         this.formData.maxTransacVal = "";
            
    //       })
    //       .catch(error => {
    //         this.$q.loading.hide();
    //         this.$q.notify({
    //           type: "warning",
    //           color: "amber-9",
    //           position: "bottom",
    //           message: error.data.message
    //         });
    //       });
    //   }
    // },
    fnsubmitPlans(request) {
    
      this.$v.formData.$touch();
      if (this.$v.formData.$error) {
        this.$q.notify("Please review fields again.");
       
      } 
      
      else{
       let requestParams = {
         params:{
           id : this.propRowDetails.deviceId.id
         },
        formData: {
          planName :this.propRowDetails.planName,
           incentivePercentage : this.propRowDetails.incentivePercentage,
          minTxnVal : this.propRowDetails.minTxnVal,
         maxIncPerTxn : this.propRowDetails.maxIncPerTxn,
        },
       }
        this.UPDATE_PLAN_DETAILS_DATAS(requestParams)
        .then(response => {
            this.$q.notify({
                color: "positive",
                position: "bottom",
                message: "Plan has been updated successfully",
                icon: "thumb_up"
              });
          })
          .catch(error=>{
              this.$q.loading.hide();
              this.$q.notify({
                color: "negative",
                position: "bottom",
                message: "Please try again",
                icon: "thumb_down"
              });
          });
          // this.formData.email="",
          // this.formData.password="",
          // this.formData.confirm_password="",
          // this.formData.partner.partnerName="",
          // this.formData.mids.mid=""
        //   this.formData.email="",
        //   this.formData.password="",
        //   this.formData.confirm_password="",
        //   this.formData.partner.partnerName="",
        //   this.formData.mids.mid="",
        //   this.formData.mids.partner.partnerName=""
         
      }

    },
     GoToUsers() {
      this.$router.push("/super/admin/manage/existingmATMplan/");
    },
    selectedPlan(item)
    {
      this.formData.InPercentage = item.value.InPercentage
      this.formData.minTransacVal = item.value.minTransacVal
      this.formData.maxTransacVal = item.value.maxTransacVal
    },
    ajaxLoadPlanInfo(){
      this.FETCH_ALL_MATM_PLAN_DETAILS();
    },
    // ajaxLoadPlanInfo(){
    //    let innerSelf = this;
    //     innerSelf
    //     .FETCH_ALL_MATM_PLAN_DETAILS()
    //     this.dataPlan = this.getMatmPlanDetails
    //     console.log("DATA PLAN---------------->"+JSON.stringify(this.dataPlan))
    //     .then(() => {
         
    //     this.formData.plan = this.dataPlan.planName;
    //        this.formData.InPercentage = this.dataPlan.incentivePercentage;
    //        this.formData.minTransacVal = this.dataPlan.minTxnVal;
    //      this.formData. maxTransacVal = this.dataPlan.maxIncPerTxn;
    //     console.log("DATA PLAN---------------->"+JSON.stringify(this.formData.plan))
    //     console.log("DATA PERCENTAGE---------------->"+JSON.stringify(this.formData.InPercentage ))
    //     console.log("DATA MIN TRANSACTION---------------->"+JSON.stringify(this.formData.minTransacVal ))
    //     console.log("DATA MAX TRANSACTION---------------->"+JSON.stringify( this.formData. maxTransacVal))
          
    //     })
    //     .catch(() => {
    //       this.$q.notify({
    //            message: `Oops! Something went wrong`,
    //             type: "negative",
    //             actions: [
    //             {
    //             label: "Go back",
    //             handler: () => {
    //               this.$router.push({ name: "existingmATMplan" });
    //             }
    //           }
    //         ],
    //       });
    //        innerSelf.$q.loading.hide();
    //     });

    // },
     fetchInstutionCode() {
      this.INSTITUTIONCODE_FROM_FROM_MARS();
    },
    ajaxLoadLeadSource() {
      let self = this;
      self.LEAD_SOURCE_ACTIVE_LIST().then(() => {
        return _.map(self.getActiveLeadSource, item => {
          self.dropDown.leadSourceOptions.push({
            value: item.sourceName,
            label: item.sourceName
          });
        });
      });
    },
    created: function () {
      if (this.$route.params.data) {
        this.propRowDetails = $route.params.data;
      }
      // this.fetchCustomers();
    },
    fnShowCreateUploadFile() {
      this.propShowCreateUploadFile = !this.propShowCreateUploadFile;
    }
  }
};
</script>
