<template>
  <div>
    <div class="col-md-6 q-my-md" align="right">
      <div class="col group">
        <!-- <q-btn no-caps no-wrap label="Bank List" class="q-mt-lg text-weight-regular" color="purple-9" size="md" @click="fnshowBankList()"/> -->
        <q-btn
          no-caps
          no-wrap
          label="Upload Bank List"
          class="q-mt-lg text-weight-regular"
          color="purple-9"
          icon="add"
          size="md"
          @click="
fnShowCreateUploadFile()"
        />
        <!-- <q-btn
          icon="cloud_upload"
          class="q-ma-sm"
          color="positive"
          label="Upload Bank List"
          @click="fnUploadDocumentAndSubmit"
        />-->
      </div>
    </div>
    <div class="col-12 text-h6 q-my-lg text-weight-regular">Bank SO Details</div>
    <form>
      <div class="q-px-md">
        <div class="q-pa-md">
          <div class="row gutter-sm q-py-sm">
            <div class="col-md-6">
              <q-input
                v-model.trim="formData.location"
                @blur="$v.formData.location.$touch"
                :error="$v.formData.location.$error"
                class="text-weight-regular text-grey-8"
                color="grey-9"
                float-label="*Location"
                placeholder="Location"
              />
            </div>
            <div class="col-md-6">
              <q-select
                v-model.trim="formData.bank"
                @blur="$v.formData.bank.$touch"
                :error="$v.formData.bank.$error"
                class="text-weight-regular text-grey-8"
                :options="dropDown.leadSourceOptions"
                float-label="*Bank"
                placeholder="Bank"
              />
            </div>
            <div class="col-md-6">
              <q-input
                v-model.trim="formData.branch_code"
                class="text-weight-regular text-grey-8"
                color="grey-9"
                @blur="$v.formData.branch_code.$touch"
                :error="$v.formData.branch_code.$error"
                float-label="*Branch_Code"
                placeholder="Branch_Code"
              />
            </div>

            <div class="col-md-6">
              <q-input
                v-model.trim="formData.so_name"
                @blur="$v.formData.so_name.$touch"
                :error="$v.formData.so_name.$error"
                class="text-weight-regular text-grey-8"
                color="grey-9"
                float-label="*So_Name"
                placeholder="So_Name"
              />
            </div>

            <div class="col-md-6">
              <q-input
                v-model.trim="formData.mail_id"
                @blur="$v.formData.mail_id.$touch"
                :error="$v.formData.mail_id.$error"
                class="text-weight-regular text-grey-8"
                color="grey-9"
                float-label="*Mail_Id"
                placeholder="Mail_Id"
              />
            </div>
            <div class="col-md-6">
              <q-input
                v-model.trim="formData.emp_id"
                @blur="$v.formData.emp_id.$touch"
                :error="$v.formData.emp_id.$error"
                class="text-weight-regular text-grey-8"
                color="grey-9"
                float-label="*Emp_Id"
                placeholder="Emp_Id"
              />
            </div>
            <div class="col-md-6">
              <q-select
                v-model.trim="formData.bank_enable"
                @blur="$v.formData.bank_enable.$touch"
                :error="$v.formData.bank_enable.$error"
                class="text-weight-regular text-grey-8"
                color="grey-9"
                float-label="Bank_Enable"
                placeholder="Bank_Enable"
                :options="selectBankEnableOptions"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="full-width group" align="center">
        <q-btn
          size="md"
          type="button"
          color="purple-9"
          @click="fnSubmitBankDetails(formData)"
        >Submit</q-btn>
      </div>
    </form>
    <uploadFile
      v-if="propShowCreateUploadFile"
      :propShowUploadFile="propShowCreateUploadFile"
      @emitfnshowUploadFile="propShowCreateUploadFile"
    ></uploadFile>
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
} from "@vuelidate/validators";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    uploadFile
  },
  data() {
    return {
      propShowCreateUploadFile: false,
      leadSourceOptions: [],
      dropDown: {
        leadSourceOptions: []
      },
      selectBankEnableOptions: [
        {
          label: "Yes",
          value: "True"
        },
        {
          label: "No",
          value: "False"
        }
      ],

      formData: {
        location: "",
        bank: "",
        branch_code: "",
        so_name: "",
        mail_id: "",
        emp_id: "",
        bank_enable: ""
      }
    };
  },

  validations: {
    formData: {
      location: {
        required
      },
      bank: {
        required
      },
      branch_code: {
        required
      },
      so_name: {
        required
      },
      mail_id: {
        required
      },
      emp_id: {
        required,
        email
      },
      bank_enable: {
        required
      }
    }
  },
  computed: {
    ...mapGetters("leadSource", ["getActiveLeadSource"])
  },
  created() {
    this.ajaxLoadLeadSource();
  },
  methods: {
    ...mapActions("leadSource", ["LEAD_SOURCE_ACTIVE_LIST"]),
    ...mapActions("Bank_SO", ["SAVE_BANK_SO"]),
    fnSubmitBankDetails(formData) {
      this.$v.formData.$touch();
      if (this.$v.formData.$error) {
        this.$q.notify("Please review fields again.");
        return;
      } else {
        this.SAVE_BANK_SO(formData)
          .then(response => {
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: response.data.message,
              icon: "thumb_up"
            });
            this.formData.location = "";
            this.formData.bank = "";
            this.formData.branch_code = "";
            this.formData.so_name = "";
            this.formData.mail_id = "";
            this.formData.emp_id = "";
            this.formData.bank_enable = "";
          })
          .catch(error => {
            this.$q.loading.hide();
            this.$q.notify({
              type: "warning",
              color: "amber-9",
              position: "bottom",
              message: error.data.message
            });
          });
      }
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
    fnShowCreateUploadFile() {
      this.propShowCreateUploadFile = !this.propShowCreateUploadFile;
    }
  }
};
</script>
