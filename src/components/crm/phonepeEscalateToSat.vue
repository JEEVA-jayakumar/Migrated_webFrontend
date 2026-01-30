<template>
  <div>
    <q-modal
      v-model="toggleModal"
      class="q-mt-lg capitalize"
      @hide="emitToggleEscalateToSat"
      @escape-key="emitToggleEscalateToSat"
      :content-css="{ minWidth: '48vw', padding: '20px' }"
    >
      <div class="row items-center bottom-border q-py-sm">
        <div class="col">Escalate To SAT</div>
        <div class="col-auto">
          <q-btn
            round
            size="sm"
            @click="emitToggleEscalateToSat"
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
            v-model="formData.issue"
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
            v-model="formData.subIssue"
            separator
            :options="dropDown.subIssueOptions"
          />
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col-sm-5"></div>
        <div class="col-sm-5">
          <q-btn color="purple" :disable="this.formData.subIssue == ''" style="margin-top: 20px;" label="Submit" @click="fnEscalateToSat(escalateToSatData)" />
        </div>
      </div>
    </q-modal>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "PhonepeEscalateToSat",
  props: ["escalateToSatData","propToggleEscalatetoSatPop","propToggleEscalateToSat" ],
  data() {
    return {
      value1: null,
      issueOptions: [],
      subIssueOptions: [],
      toggleModal: this.propToggleEscalatetoSatPop,
      formData: {
        issue: "",
        subIssue: "",
      },
      dropDown: {
        issueOptions: [],
        subIssueOptions: [],
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
    console.log("escalateToSatData---------->>>>",JSON.stringify(this.escalateToSatData))
  },
  
  created() {
    this.issueLoadData();
  },
  methods: {
    ...mapActions("crmAction", [
      "FETCH_ISSUE_DATAS",
      "FETCH_SUB_ISSUE_DATAS",
      "FETCH_REMARKS_ISSUE_DATAS"
    ]),

    ...mapActions("phonePeCrm", ["ESCALATE_TO_SAT"]),

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
  
    fnEscalateToSat(request) {
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
                    let TicketId = {
                        ticketId: request.serviceReqTicketId,
                        issue : this.formData.issue,
                        subIssue : this.formData.subIssue,
                        // resolutionRemarks : this.formData.remarks
                    };
                    this.ESCALATE_TO_SAT(TicketId)
                        .then(response => {
                            this.$q.notify({
                                color: "positive",
                                position: "bottom",
                                message: "Escalated To SAT!",
                                icon: "thumb_up",
                            });
                            this.emitToggleEscalateToSat();
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
        emitToggleEscalateToSat() {
      this.$emit("closeEscalateToSat");
    }
  }
};
</script>
<style>
</style>
