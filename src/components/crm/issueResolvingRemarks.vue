<template>
  <div>
    <q-dialog
      v-model="toggleModal"
      no-backdrop-dismiss
      class="q-mt-lg capitalize"
      @hide="emitToggleRemarks"
      @escape-key="emitToggleRemarks"
      :content-css="{ minWidth: '30vw', padding: '10px' }"
    >
      <div class="row items-center bottom-border q-py-sm">
        <div class="col">Closing Remarks</div>
        <div class="col-auto">
          <q-btn
            round
            size="sm"
            @click="emitToggleRemarks"
            outline
            color="dark"
            icon="clear"
          />
        </div>
      </div>  
    
      <form>
        <div class="column group">
          <div class="text-h6"></div>
          <div>
            <div class="row">
                <div class="col-sm-2"></div>

                  <div class="col-sm-8">

                    <q-input
                    filled
                    v-model="formData.crmRemark"
                    label="Enter your text"
                    aria-placeholder="enter remarks"
                    type="textarea"
                    rows="5"
                    maxlength="500"
                    counter
                    class="textarea-box"
                  />
                  </div>
            </div>
            <div class="row items-center bottom-border q-py-sm">
              </div>  
            </br>
              <div class="row q-gutter-sm" style="display: flex; justify-content: flex-end">
   
                <q-btn
                  @click="fnsubmit(formData)"
                  color="purple-9"
                  icon="check"
                  label="Confirm"
                />
                         
          
      
          
               
            
          
          </div>
           
          </div>
          <!-- <div class="row">
            <div class="col-sm-9">
              <q-option-group
                v-model="selectedOption"
                :options="options"
                type="radio"
                inline
              />
            </div>
            <div class="col-sm-1"></div>
            <div class="col-sm-2">
              <q-btn icon="call_received" color="primary" label="Call Log"  @click="callLogs()" />
            </div>
          </div> -->

          <!-- <div class="row">
            <div class="col-sm-5">
              <q-select
                stack-label="Issues"
                inverted-light
                color="none"
                v-model="formData.issue"
                separator
                :options="options"
                @input="issueDocumentType"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-sm-5">
              <q-select
                stack-label="Sub Issues"
                inverted-light
                color="none"
                v-model="formData.issue"
                separator
                :options="options"
              />
            </div>
          </div> -->
        
        </div>
   
    
      </form>

    </q-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { required } from "@vuelidate/validators";
import phonepeCallLogs from "./phonepeCallLogs.vue"
export default {
  name: "issueResolvingRemarks",

  props: ["resolveRemarksInfo", "propToggleResolveRemarksPop", "propToggleResolveRemarks"],

  data() {
    return {
      toggleModal: this.propToggleResolveRemarksPop,
      selectedDate: null,
      closingtoggleValue:null,
      formData: {
        crmRemark:"",
        issueOptionsId:1,
        resolutionId:this.resolveRemarksInfo.data.resolvedStatus,
        servicingId:this.resolveRemarksInfo.data.actualIssue,
        actionsId:this.resolveRemarksInfo.data.actionTaken,
        issue:null,
        subIssue:null,
        resolutionRemarks:null,
        ticketId:this.resolveRemarksInfo.ticketId.serviceReqTicketId
                }
                
    //   formData: {
    //     data: this.ActionBarInfo.data,
    //     issue: ""
    //   }
      //   formData: {
      //     serviceRequest: this.remarksInfo.remarks.serviceReqTicketId,
      //     crmRemark: this.remarksInfo.remarks.crmRemark,
      //     action: this.remarksInfo.action
      //   },
    };
  },

    validations: {
      formData: {
        crmRemark: { required },
      }
    },
  computed: {
    ...mapGetters("phonePeCrm", ["getupdateRemarks"])
  },

  beforeMount() {
    console.log("DATA PP CHECK", JSON.stringify(this.resolveRemarksInfo));
  },

  methods: {
    ...mapActions("phonePeCrm", ["ISSUE_RESOLVED_BY_CRM"]),
    // emitToggleRelod(propToggleRemarks) {
    //   this.$emit("closeRemarksInfo", "reloadPhonepePendingDetails")
    // },
    // closeModal() {
    //   this.$emit("toggleModal");

    // },
    fnsubmit(formData) {
      this.$v.formData.$touch();
      if (this.$v.formData.$error) {
        this.$q.notify("Please review fields again.");
      } else {

        this.$q.loading.show({
        delay: 0,
        spinnerColor: "purple-9",
        message: "Data submitting.."
      });
        this.ISSUE_RESOLVED_BY_CRM(formData)
          .then(() => {
            this.closingtoggleValue = 1
            this.emitToggleRemarks(this.closingtoggleValue)
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Remarks updated successfully",
              icon: "thumb_up"
            });
            this.$q.loading.hide();
          })
          .catch(error => {
            this.$q.notify({
              color: "negative",
              position: "bottom",
              message: error.body.message == null ? "Please Try Again Later !" : error.body.message,
              icon: "thumb_down"
            });
            this.$q.loading.hide();
          });
      }
    },
    // callLogs(){
    // this.propToggleCallLogs =! this.propToggleCallLogs
    // },

    onDateChange(date) {
      console.log("Selected date:", date);
    },
    emitToggleRemarks() {
      if(this.closingtoggleValue == 1){
        this.$emit("closeResolveRemarks",this.closingtoggleValue);
      }else{
        this.closingtoggleValue = 2
        this.$emit("closeResolveRemarks",this.closingtoggleValue);
      }
  
    }
  }
};
</script>


<style scoped>
    .textarea-box {
      border: 1px solid #c0c0c0; /* Gray border around the textarea */
      border-radius: 4px; /* Rounded corners for a box-like appearance */
      padding: 8px; /* Padding inside the box */
      background-color: #f9f9f9; /* Light background color */
    }
    </style>
