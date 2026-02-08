<template>
  <div>
    <q-dialog v-model="toggleModal" no-backdrop-dismiss class="q-mt-lg capitalize" @hide="emitToggleRemarks" @escape-key="emitToggleRemarks"
      :content-css="{ minWidth: '50vw', padding: '10px' }">
      <div class="row items-center bottom-border q-py-sm">
        <div class="col"><b>Ticket</b></div>
        <div class="col-auto">
          <q-btn round size="sm" @click="emitToggleRemarks" outline color="dark" icon="clear" />
        </div>
      </div>

      <form>
        <div class="column group">
          <div class="text-h6"></div>
          <div class="q-pa-sm flex justify-between">
            <div>
              <b>Ticket ID:{{serviceReqTicketId}}</b>
            </div>

            <div>
              <b>Attempts:{{callAttempts}}</b>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-9">
              <!-- <q-option-group v-model="selectedOption" :options="options" type="radio" class="radio" inline
                color="purple-9" /> -->
              <q-option-group v-model="selectedOption" :options="optionsData" type="radio" class="radio" inline @input="getselectedOptionBasedData($event)"
                color="purple-9" />
            </div>
        
            <div class="col-sm-3">
              <q-btn icon="call_received" color="purple-9" label="Add Call Log" @click="callLogs()" />
            </br>
            </br>
              <q-btn icon="phone" color="purple-9" label="View Call Logs" @click="viewcallLogs()" />
            </div>
            <!-- <div class="col-sm-3">
              
            </div> -->
          </div>
          <div v-if="selectedOption == 1">
            <div class="row">
              <div class="col-sm-5">
                <q-select stack-label="Resolved Status" inverted-light color="none"
                  v-model="issueResolved.resolvedStatus"  separator :options="resolutionOptionList" @input="issueresolvedAction($event)"  />
              </div>
            </div>
            <div class="row">
              <div class="col-sm-5">
                <q-select stack-label="Actual Issue"  inverted-light color="none" v-model="issueResolved.actualIssue" 
                  separator :options="issueOptionList"  />
              </div>
            </div>
            <div class="row">
              <div class="col-sm-5">
                <q-select stack-label="Action Taken" :disable="issueResolved.actualIssue == '' " inverted-light color="none" v-model="issueResolved.actionTaken"
                  separator :options="issueActionList" />
              </div>
            </div>
            </br>
            <!-- <div class="row">
              <b>Resolved Status:</b>
            </div> -->


            <div class="row q-gutter-sm" style="display: flex; justify-content: flex-end">

              <q-btn @click="issueResolveSave(issueResolved)" color="purple-9" icon="save" label="Save" />
              &nbsp;
              <q-btn @click="fnIssueResolveSubmit(formData)" :disabled="disableFlag" color="purple-9" icon="send" label="submit" />
            </div>
          </div>

          <div v-if="selectedOption == 2">
            <div class="row">
              <div class="col-sm-5">
                <q-select stack-label="Resolved Status" inverted-light color="none"
                  v-model="IssueNotResolved.resolvedStatus" separator :options="resolutionOptionList" @input="issueNotresolvedFetchAction($event)" />
              </div>
            </div>
            <div class="row">
              <div class="col-sm-5">
                <q-select stack-label="Actual Issue" inverted-light color="none" v-model="IssueNotResolved.actualIssue" 
                  separator :options="issueOptionList" />
              </div>
            </div>
            <div class="row">
              <div class="col-sm-5">
                <q-select stack-label="Action Taken" :disable="IssueNotResolved.actualIssue == '' " inverted-light color="none" v-model="IssueNotResolved.actiontaken"
                  separator :options="issueActionList" />
              </div>
            </div>


            <div class="row q-gutter-sm" style="display: flex; justify-content: flex-end">

              <q-btn @click="fnIssueNotResolved(formData)" color="purple-9" icon="save" label="Save" />
              &nbsp;
              <q-btn @click="fnIssueNotResolveSubmit(formData)" :disabled="disableFlag" color="purple-9" icon="send" label="submit" />






            </div>
          </div>
          <div v-if="selectedOption == 3">
            <div class="q-pa-sm flex justify-between">
              <div>
                <b>Region:{{region}}</b>
              </div>

            </div>


            <div class="row q-gutter-sm" style="display: flex; justify-content: flex-end">

              <q-btn @click="fnMovedToSat()" color="purple-9" icon="save" label="Save" />
              &nbsp;
              <q-btn @click="fnmoveToSatRemarks(formData)" color="purple-9" icon="send" :disabled="disableFlag" label="Move to SAT" />






            </div>
          </div>




        </div>
      </form>

      <phonepeCallLogs v-if="propToggleCallLogs"   :callInfo="addActionBarInformation"
        :propToggleCallLogsPop="propToggleCallLogs" @closeCallLogs="callLogs" />

        <phonepeViewCallLogs v-if="propToggleViewCallLogs" :callInfo="addActionBarInformation" :propToggleViewCallLogsPop="propToggleViewCallLogs"
         @closeViewCallLogs="viewcallLogs" />


      <issueResolvingRemarks v-if="propToggleResolveRemarks" :resolveRemarksInfo="addResolveRemarksInformation"
        :propToggleResolveRemarksPop="propToggleResolveRemarks" @closeResolveRemarks="fnIssueResolveSubmit" />

      <phonepeCrmToSatRemarks v-if="propToggleCrmToSatRemarks" :resolveCrmToSatInfo="addcrmToSatRemarksInformation"
        :propToggleCrmToSatRemarksPop="propToggleCrmToSatRemarks" @closeCrmToSatRemarks="fnmoveToSatRemarks" />

    </q-dialog>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  import { required } from "@vuelidate/validators";
  import phonepeCallLogs from "./phonepeCallLogs.vue"
  import phonepeViewCallLogs from "./phonepeViewCallLogs.vue"
  import issueResolvingRemarks from "./issueResolvingRemarks.vue"
  import phonepeCrmToSatRemarks from "./phonepeCrmToSatRemarks.vue"
  export default {
    name: "ticketActionBar",

    props: ["ActionBarInfo", "propToggleActionBarPop", "propToggleActionBar"],
    components: {
      phonepeCallLogs,
      issueResolvingRemarks,
      phonepeCrmToSatRemarks,
      phonepeViewCallLogs
    },
    data() {
      return {
        toggleModal: this.propToggleActionBarPop,
        selectedOption: 1,
        callAttempts: "",
        disableFlag:true,
        serviceReqTicketId: "",
        propToggleCallLogs: false,
        propToggleViewCallLogs: false,
        propToggleResolveRemarks: false,
        propToggleCrmToSatRemarks: false,
        addCallInformation: {
          data: null
        },
        addResolveRemarksInformation: {
          data: null,
          ticketId:null
        },
        addcrmToSatRemarksInformation: {
          data: null
        },
        optionsData: [],
        resolutionOptionList:[],
        issueOptionList:[],
        issueActionList:[],

        options: [
          { label: "Issue Resolved", value: "1" },
          { label: "Issue Not Resolved", value: "2" },
          { label: "Move to SAT", value: "3" }
        ],
        formData: {
          data: this.ActionBarInfo.data,
           resolution:'',
           issueList:'',
           issueAction:'',
        },
        addActionBarInformation : this.ActionBarInfo.data,
        issueResolved: {
          resolvedStatus:"",
          actionTaken: "",
          actualIssue: "",
        },
        IssueNotResolved: {
          resolvedStatus: "",
          actualIssue: '',
          actiontaken: "",
        },
        moveToSat: {

        }
        //   formData: {
        //     serviceRequest: this.remarksInfo.remarks.serviceReqTicketId,
        //     crmRemark: this.remarksInfo.remarks.crmRemark,
        //     action: this.remarksInfo.action
        //   },
      };
    },

    //   validations: {
    //     formData: {
    //       crmRemark: { required },
    //     }
    //   },
    validations: {
      issueResolved: {
        resolvedStatus: { required },
        actionTaken: { required },
        actualIssue: { required },
      },
      IssueNotResolved: {
          resolvedStatus: { required },
          actualIssue:{ required },
          actiontaken:{ required },
        },
    },



    computed: {
      ...mapGetters("phonePeCrm", ["getattemptLog", "getoptionsList","getResolutionStatus","getFetchIssueList","getIssueAction"])
    },

    beforeMount() {

 
      this.callLogAttempts(this.formData.data.subTicketsList[0].id);
      console.log("DATA PP", JSON.stringify(this.callAttempts));
      this.getOptionList();
      this.resolutionList(this.selectedOption)
      this.serviceReqTicketId = this.formData.data.serviceReqTicketId
      this.region = this.formData.data.bpRegion.regionAreaName
      this.IssueCategory();
    },
    

    methods: {
      ...mapActions("phonePeCrm", ["PHONEPE_CRM_CALL_LOG_ATTEMPTS", "PHONEPE_CRM_OPTION_LIST_DETAILS","PHONEPE_CRM_RESOLUTION_STATUS","PHONEPE_CRM_FETCH_ISSUE_STATUS","PHONEPE_CRM_ISSUE_ACTION_STATUS","ISSUE_NOT_RESOLVED_BY_CRM"]),


      callLogAttempts(request) {
        console.log("CRM DATE ------>", JSON.stringify(request));
        this.$q.loading.show({
          delay: 0,
          spinnerColor: "purple-9",
          message: "Fetching data .."
        });
        this.PHONEPE_CRM_CALL_LOG_ATTEMPTS(request)
          .then(response => {
            this.callAttempts = this.getattemptLog
if(this.callAttempts > 0){
this.disableFlag = false
}
            console.log("RSPONSE", this.getattemptLog);
            this.$q.loading.hide();
          })
          .catch(() => {
            this.$q.loading.hide();
          });
      },
     
      getselectedOptionBasedData(event) {
        if(event != 3){
          this.resolutionList(event)
        }
     

      },
    
      getOptionList() {
        console.log("OPTION LIST")
        this.$q.loading.show({
          delay: 0,
          spinnerColor: "purple-9",
          message: "Fetching data .."
        });
        this.PHONEPE_CRM_OPTION_LIST_DETAILS()
          .then(response => {
            this.optionsList = this.getoptionsList.map(option => {
              let label;
              if (option.issueOptions === "ISSUE RESOLVED") {
                label = "ISSUE RESOLVED";
              } else if (option.issueOptions === "ISSUE NOT RESOLVED") {
                label = "ISSUE NOT RESOLVED";
              }
              return { ...option, label };
            });
            this.optionsList.push({
              id: 3,
              issueOptions: "move_to_sat",
              label: "MOVE TO SAT"
            });
            this.optionsData = this.optionsList.map(option => ({
              label: option.label,
              value: option.id
            }));
            console.log("this.optionsData", this.optionsData);
            this.$q.loading.hide();
          })
          .catch(() => {
            this.$q.loading.hide();
          });
      },

      // IssueCategory(request) {
      //   console.log("CRM DATE ------>", JSON.stringify(request));
      //   this.$q.loading.show({
      //     delay: 0,
      //     spinnerColor: "purple-9",
      //     message: "Fetching data .."
      //   });
      //   this.PHONEPE_CRM_CALL_LOG_ATTEMPTS(request)
      //     .then(response => {
      //       this.callAttempts = this.getattemptLog
      //       console.log("RSPONSE", this.getattemptLog);
      //       this.$q.loading.hide();
      //     })
      //     .catch(() => {
      //       this.$q.loading.hide();
      //     });
      // },

      resolutionList(selectedOption) {
        console.log("resolutionList ------>", JSON.stringify(selectedOption));
        this.$q.loading.show({
          delay: 0,
          spinnerColor: "purple-9",
          message: "Fetching data .."
        });
        this.PHONEPE_CRM_RESOLUTION_STATUS(selectedOption)
          .then(response => {
            console.log("RESOLUTION RESOLVE",JSON.stringify( this.getResolutionStatus))
            
            // this.resolutionOptionList = this.getResolutionStatus
            let cookedArr = [];
            this.getResolutionStatus.map(function(value, index) {
          cookedArr.push({
          label: value.resolution,
          value: value.id
        });
      });
      this.formData.resolution = cookedArr[0].value;
      if(selectedOption == 1){
     console.log("LIST",JSON.stringify(cookedArr))
     this.resolutionOptionList = cookedArr.filter(resolution => resolution.value !== 2);
    //  this.resolutions = this.resolutions.filter(resolution => resolution.value !== value);
     console.log("AFTR LIST",cookedArr)
      }else {
        this.resolutionOptionList = cookedArr;
      }

      // this.resolutionOptionList = cookedArr;
      console.log("RESOLUTION",this.formData.resolution);
            this.$q.loading.hide();
          })
          .catch(() => {
            this.$q.loading.hide();
          });
      },


      issueresolvedAction(event){
       
        this.$q.loading.show({
          delay: 0,
          spinnerColor: "purple-9",
          message: "Fetching data .."
        });
        this.PHONEPE_CRM_FETCH_ISSUE_STATUS(event)
          .then(response => {
            this.issueAction(event)
            // this.resolutionOptionList = this.getResolutionStatus
            let cookedArr = [];
            this.getFetchIssueList.map(function(value, index) {
          cookedArr.push({
          label: value.issue,
          value: value.id
        });
      });
      this.formData.issueList = cookedArr[0].value;
      this.issueOptionList = cookedArr;
      console.log("RESOLUTION",this.formData.issueList);
      

            this.$q.loading.hide();
          })
          .catch(() => {
            this.$q.loading.hide();
          });
        
      },
    

      issueNotresolvedFetchAction(event){
              
        this.$q.loading.show({
          delay: 0,
          spinnerColor: "purple-9",
          message: "Fetching data .."
        });
        this.PHONEPE_CRM_FETCH_ISSUE_STATUS(event)
          .then(response => {
            this.issueNotResolvedAction(event)
            // this.resolutionOptionList = this.getResolutionStatus
            let cookedArr = [];
            this.getFetchIssueList.map(function(value, index) {
          cookedArr.push({
          label: value.issue,
          value: value.id
        });
      });
      this.formData.issueList = cookedArr[0].value;
      this.issueOptionList = cookedArr;
      console.log("RESOLUTION",this.formData.issueList);
      

            this.$q.loading.hide();
          })
          .catch(() => {
            this.$q.loading.hide();
          });
      },


      issueAction(event){
        this.$q.loading.show({
          delay: 0,
          spinnerColor: "purple-9",
          message: "Fetching data .."
        });
        this.PHONEPE_CRM_ISSUE_ACTION_STATUS(event)
          .then(response => {
            
            // this.resolutionOptionList = this.getResolutionStatus
            let cookedArr = [];
            this.getIssueAction.map(function(value, index) {
          cookedArr.push({
          label: value.action,
          value: value.id
        });
      });
      this.formData.issueAction = cookedArr[0].value;
      this.issueActionList = cookedArr;
    
      

            this.$q.loading.hide();
          })
          .catch(() => {
            this.issueActionList = []
            this.$q.loading.hide();
          });
        
      },
    
      issueNotResolvedAction(event){
        this.$q.loading.show({
          delay: 0,
          spinnerColor: "purple-9",
          message: "Fetching data .."
        });
        this.PHONEPE_CRM_ISSUE_ACTION_STATUS(event)
          .then(response => {
            
            // this.resolutionOptionList = this.getResolutionStatus
            let cookedArr = [];
            this.getIssueAction.map(function(value, index) {
          cookedArr.push({
          label: value.action,
          value: value.id
        });
      });
      this.formData.issueAction = cookedArr[0].value;
      this.issueActionList = cookedArr;
      console.log("ACTION",this.formData.issueAction);
      

            this.$q.loading.hide();
          })
          .catch(() => {
            this.issueActionList = [];
            this.$q.loading.hide();
          });
      },

      
      callLogs() {
        this.propToggleCallLogs = !this.propToggleCallLogs
        this.callLogAttempts(this.formData.data.subTicketsList[0].id)

      },
      
      fnIssueResolveSubmit(data) {
        console.log("CHILD DATA",data);
        if(data == 1){
          this.$emit("closeActionBarInfo");
        }
        this.$v.issueResolved.$touch();
      if (this.$v.issueResolved.$error) {
        this.$q.notify("Please review fields again.");
      } else {
        this.propToggleResolveRemarks = !this.propToggleResolveRemarks
        this.addResolveRemarksInformation.data = this.issueResolved
        this.addResolveRemarksInformation.ticketId = this.ActionBarInfo.data
      }
      },

      fnIssueNotResolveSubmit(){
        this.$v.IssueNotResolved.$touch();
      if (this.$v.IssueNotResolved.$error) {
        this.$q.notify("Please review fields again.");

      } else {
        
          let notResolvedData = {
        crmRemark:"",
        issueOptionsId:2,
        resolutionId:this.IssueNotResolved.resolvedStatus,
        servicingId:this.IssueNotResolved.actualIssue,
        actionsId:this.IssueNotResolved.actiontaken,
        issue:null,
        subIssue:null,
        resolutionRemarks:null,
        ticketId:this.formData.data.serviceReqTicketId,
        
}
       this.$q.loading.show({
        delay: 0,
        spinnerColor: "purple-9",
        message: "Data submitting.."
      });

        this.ISSUE_NOT_RESOLVED_BY_CRM(notResolvedData)
          .then(() => {
            this.$emit("closeActionBarInfo");
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Successfully Updated",
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



      fnmoveToSatRemarks(data) {

        if(data == 1){
          this.$emit("closeActionBarInfo");
        }
        this.propToggleCrmToSatRemarks = !this.propToggleCrmToSatRemarks

        this.addcrmToSatRemarksInformation.data = this.ActionBarInfo.data
      },
      
      emitToggleRemarks() {
        this.$emit("closeActionBarInfo");
      },
    
      viewcallLogs(){
        this.propToggleViewCallLogs = !this.propToggleViewCallLogs
      },
    
      issueResolveSave(data){
     this.$emit("closeActionBarInfo");
      },
        fnIssueNotResolved(data){

     this.$emit("closeActionBarInfo");
      },
        fnMovedToSat(){
     this.$emit("closeActionBarInfo");
      },
    }
  };
</script>

<style></style>
