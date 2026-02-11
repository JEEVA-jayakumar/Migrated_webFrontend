<template>
    <div>
      <q-dialog
        v-model="toggleModal"
        no-backdrop-dismiss
        class="q-mt-lg capitalize"
        @hide="emitToggleResolve"
        @escape-key="emitToggleResolve"
        :content-css="{ minWidth: '48vw', padding: '20px' }"
      >
        <div class="row items-center bottom-border q-py-sm">
          <div class="col">PPE</div>
          <div class="col-auto">
            <q-btn
              round
              size="sm"
              @click="emitToggleResolve"
              outline
              color="dark"
              icon="clear"
            />
          </div>
        </div>
        <br />
        <div class="row">
          <div class="col-sm-5">
            <q-select
              stack-label="Issues"
              inverted-light
              color="light"
              v-model.trim="formData.issue"
              separator
              :options="dropDown.issueOptions"
              @input="issueDocumentType"
            />
          </div>
  
          <div class="col-sm-5" style="margin-left: 20px;">
            <q-select
              :disable="this.formData.issue == ''"
              stack-label="Sub Issues"
              inverted-light
              color="light"
              v-model.trim="formData.subIssue"
              separator
              :options="dropDown.subIssueOptions"
            />
          </div>
        </div>
        <br />
        <div class="row">
          <div class="col-sm-5">
            <q-select
            :disable="this.formData.subIssue == ''"
              stack-label="Default Remarks"
              inverted-light
              color="light"
              v-model.trim="formData.remarks"
              separator
              :options="dropDown.remarksOptions"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-sm-5"></div>
          <div class="col-sm-5">
            <q-btn color="purple" :disable="this.formData.remarks == '' || this.formData.subIssue == ''" style="margin-top: 20px;" label="Submit" @click="fnPPE(resolveDataCallback)" />
          </div>
        </div>
      </q-dialog>
    </div>
  </template>
  
  <script>
import { or } from '@vuelidate/validators';
  import { mapGetters, mapActions } from "vuex";
  export default {
    name: "phonepeTicketResolve",
    // props: [ "escalateToSatData","propToggleEscalateToSat","propToggleEscalatetoSatPop" ],
    props: ["resolveDataCallback", "propToggleResolveCallback", "proptoggleTicketCallback"],
    data() {
      return {
        value1: null,
        issueOptions: [],
        subIssueOptions: [],
        remarksOptions: [],
        toggleModal: this.propToggleResolveCallback,
        formData: {
          issue: "",
          subIssue: "",
          remarks: ""
        },
        dropDown: {
          issueOptions: [],
          subIssueOptions: [],
          remarksOptions: []
        }
      };
    },
  
    computed: {
      ...mapGetters("crmAction", [
        "getissueDatasDetails",
        "getsubIssueDatasDetails",
        "getremarksDatasDetails"
      ]),
      ...mapGetters("phonePeCrm", ["getPhonepeMerchantDetails", "getPhonepeCompletedData", "getphonepeDate"])
    },
  
    beforeMount() {
      console.log("resolveDataCallback---------->>>>",JSON.stringify(this.resolveDataCallback))
    },
  
    created() {
      this.issueLoadData();
      this.remarksDatas();
    },
  
    methods: {
  
      ...mapActions("crmAction", [
        "FETCH_ISSUE_DATAS",
        "FETCH_SUB_ISSUE_DATAS",
        "FETCH_REMARKS_ISSUE_DATAS"
      ]),
  
      ...mapActions("phonePeCrm", ["PPE_CALLBACK_RESOLVED"]),
  
      issueLoadData() {
        let self = this;
        self.FETCH_ISSUE_DATAS().then(() => {
          return _.map(self.getissueDatasDetails, item => {
            self.dropDown.issueOptions.push({
              value: item,
              label: item.name
            });
            self.value1 =
              self.dropDown.issueOptions.length > 0
                ? self.dropDown.issueOptions[0].value
                : null;
            // self.issueDocumentType(self.value1);
          });
        });
      },
  
      // issueDocumentType(selectedValue) {
      //   console.log("Drop down value is changed !: {}", selectedValue.id);
      //   console.log("EVENTS", selectedValue);
      //   let self = this;
      //   let value = selectedValue;
      //   console.log("VALUE DATA", value);
      //   self.FETCH_SUB_ISSUE_DATAS(value.id).then(() => {
      //     // Clearing the drop down values before assigning data
      //     self.dropDown.subIssueOptions.splice(0);
      //     return _.map(this.getsubIssueDatasDetails, item => {
      //       self.dropDown.subIssueOptions.push({
      //         value: item,
      //         label: item.name
      //       });
      //     });
      //   });
      // },
  
      issueDocumentType(selectedValue) {
      console.log("Drop down value is changed !: {}", selectedValue.id);
      console.log("EVENTS", selectedValue);
      let self = this;
      let value = selectedValue;
      console.log("VALUE DATA", value);
      self.FETCH_SUB_ISSUE_DATAS(value.id).then(() => {
        self.dropDown.subIssueOptions.splice(0);
        _.map(this.getsubIssueDatasDetails, item => {
          self.dropDown.subIssueOptions.push({
            value: item,
            label: item.name
          });
        });
  
        // Update formData.subIssue here
        self.formData.subIssue = ""; // or set it to a default value if needed
      });
    },
  
      remarksDatas() {
        let self = this;
        self.FETCH_REMARKS_ISSUE_DATAS().then(() => {
          return _.map(self.getremarksDatasDetails, item => {
            self.dropDown.remarksOptions.push({
              value: item,
              label: item.name
            });
            // console.log("remarksOptions========>",JSON.stringify(self.getremarksDatasDetails));
          });
        });
      },
      fnPPE(request) {
        console.log("REQUEST------------------>>>>",request)
              this.$q
                  .dialog({
                      title: "Confirm",
                      message: "Are you sure ?",
                      ok: "Yes",
                      cancel: "Cancel",
                  })
                  .then(() => {
                    this.$q.loading.show({
                          delay: 0, // ms
                          spinnerColor: "purple-9",
                          message: "Processing .."
                      });
  
                      let ticketId = {
                          ticketId: request.serviceReqTicketId,
                          pagination: this.paginationControl,
                          filter: this.filter,
                          issue : this.formData.issue,
                          subIssue : this.formData.subIssue,
                          resolutionRemarksPPE : this.formData.remarks.name
                      }
                      this.PPE_CALLBACK_RESOLVED(ticketId)
                          .then(response => {
                              this.$q.notify({
                                  color: "positive",
                                  position: "bottom",
                                  message: "Successfully Resolved!",
                                  icon: "thumb_up",
                              });
                          //     this.loadingData({
                          //     pagination: this.paginationControl,
                          //     filter: this.filter,
                          //     date: this.addBasicInformation.action,
                          // });
                          this.emitToggleResolve();
                          this.$q.loading.hide();
                          })
  
                  })
                  .catch(() => {
                      this.$q.notify({
                          color: "negative",
                          position: "bottom",
                          message: "No changes made!",
                          icon: "thumb_down",
                      });
                      this.$q.loading.hide();
                  });
          },
  
      emitToggleResolve() {
        this.$emit("closeResolveCallback");
      }
    }
  };
  </script>
  
  <style></style>
  
