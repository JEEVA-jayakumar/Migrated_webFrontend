<template>
    <div>
       <q-dialog
       :model-value="showRejectLeadModel"
       @hide="emitToggleReject(showRejectLeadModel)" 
       @escape-key="emitToggleReject(showRejectLeadModel)"  
       :content-css="{padding:'50px'}"
       >
        <div>
          <div align="center" class="text-subtitle1 q-mb-md capitalize">{{propShowRejectLeadComponent.merchantName}}</div>
          <div align="center" class="text-light-blue text-h6 q-mb-md">#{{propShowRejectLeadComponent.leadNumber}}</div>
           <div class="col-md-12">
                     <q-input
                    color="grey-9"
                    disable
                    v-model="formData.device"
                    float-label="Selected device"
                     @request="ajaxLoadShortLeadInfo"
                    
                    
                  />
        </div>
          
         
          <q-btn color="negative" class="q-ma-sm float-right" @click="leadRejectSubmit(formData)" align="right" label="Reject" />
          <q-btn align="right" color="grey-9" 
            class="float-right q-ma-sm" @click="emitToggleReject(showRejectLeadModel)">Cancel
          </q-btn>
        </div>
      </q-dialog>
    </div>
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
  numeric
} from "@vuelidate/validators";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["showRejectLeadModel", "propShowRejectLeadComponent"],

  data() {
    return {
      //Reject reason checkbox
      formData: {
        leadInformation: {
          verifiedFinanceStatus: this.propShowRejectLeadComponent.verifiedFinanceStatus
        },
        leadVerificationStatus: {
          status: 0,
          fieldName: "Device",
        },
         device:"",
        leadId: this.propShowRejectLeadComponent.leadId,
       
      },
      propLeadInformation: {},
      
      propsRowDetails:[],
      // formData: {
      //  device:"",
      //  remarks:"",
      // },
      // dropDown: {
      //   deviceOptions: [],
      // },
    };
  },


   created() {
    /* START: Load user table data filter > DeviceTypes */
    // this.ajaxLoadDataForDeviceTypeTable();
    // this.marsDeviceModelDatasLoading();
    //  this.LEAD_BASED_RENTAL(this.formData.leadSource1);
    /* End: Load user table data filter > DeviceTypes */
   this.ajaxLoadShortLeadInfo();
  },
 beforeMount(){
    //  this.propsRowDetails = JSON.stringify(this.getShortLeadInfo);
       this.formData.device =this.getShortLeadInfo.device.deviceName;
 },
  computed: {
    ...mapGetters("SA_Devices", ["getAllDevicesInfo"]),
     ...mapGetters("SatLeadValidation", ["getShortLeadInfo"])
    
  },
  methods: {
    ...mapActions("Finance", ["REJECT_LEAD_EXCEPTION"]),
    ...mapActions("commonLoader", ["TOGGLE_COMMON_LOADER"]),
     ...mapActions("SA_Devices", ["FETCH_DEVICES_DATA"]),
     ...mapActions("SatLeadValidation", ["FETCH_SHORT_LEAD_DATA"]),
    emitToggleReject(showRejectLeadModel) {
      this.$emit("closeRejectLeadModel");
    },
     ajaxLoadShortLeadInfo() {
      this.FETCH_SHORT_LEAD_DATA(this.propShowRejectLeadComponent.leadId)
       .then(response => {
          this.propLeadInformation = this.getShortLeadInfo;
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        }); 
    },
    //   ajaxLoadDataForDeviceTypeTable() {
    //   let self = this;
    //   self
    //     .FETCH_DEVICES_DATA()
    //     .then(() => {
    //       return _.map(self.getAllDevicesInfo, item => {
    //         self.dropDown.deviceOptions.push({
    //           value: item.deviceName,
    //           label: item.deviceName
    //         });
    //       });
    //     })
    // },
    leadRejectSubmit(formData) {
        // let 
      this.$v.formData.$touch();
      if (this.$v.formData.$error) {
        this.$q.notify("Please review fields again.");
      } else {
        this.$q
          .dialog({
            title: "Confirm",
            message: "Are you sure want to reject the lead?",
            ok: "Continue",
            cancel: "Cancel"
          })
          .then(() => {
            this.$q.loading.show({
            delay: 0, // ms
            spinnerColor: "purple-9",
            message: "Processing .."
          });
            this.REJECT_LEAD_EXCEPTION(formData)
              .then(() => {
                this.$emit("closeRejectLeadModel");
                this.$q.loading.hide()
                this.$q.notify({
                  color: "negative",
                  position: "bottom",
                  message: "Rejected lead #" + formData.leadId,
                  icon: "clear"
                });
                 this.$router.push('/sat/lead/validation');
                // this.$router.push('/sat/rejected/Lead/Details');
                
              })
              .catch(error => {
                this.$q.loading.hide();
                 this.$emit("closeRejectLeadModel");
                this.$q.notify({
                  color: "negative",
                  position: "bottom",
                  message: error.body.message == null ? "Please Try Again Later !" : error.body.message,
                  icon: "thumb_down"
                });
              });
          })
          // .catch(() => {
          //      this.$emit("closeRejectLeadModel");
          //   this.$q.notify({
          //     color: "negative",
          //     position: "bottom",
          //     message: "No changes made!",
          //     icon: "thumb_down"
          //   });
          // });
      }
    }
  }
};
</script>
