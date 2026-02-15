<template>
  <div class="q-pa-md">
    <q-card>
      <q-card-section>
        <div class="row">
          <!--START: table title -->
          <div class="col-md-6">
            <strong>
              <q-chip color="primary">
                <span align="center">Batch number : BatchNo_000{{getAllQRList1.batchCount}}</span>
              </q-chip>
            </strong>
            <br />
          </div>
        </div>
        <br />
        <div class="row">
          <!--START: table title -->
          <div class="col-md-3">
            <strong>
              <span>Select QR</span>
            </strong>
            <br />
            <strong>
              <span>Bank</span>
            </strong>
          </div>

          <div class="col-md-6">
            <q-select
              clearable
              float-label="Select QR API"
              v-model.trim="formdata.leadSource"
              color="grey-9"
              :options="dropDown.leadSourceOptions"
            />
            <!--   :error="$v.formdata.leadSource.$error" -->
          </div>
        </div>
        <br />
        <div class="row">
          <div class="col-md-3">
            <strong>
              <span>Enter numbers of QR</span>
            </strong>
            <br />
            <strong>
              <span>Ref numbers to be created</span>
            </strong>
          </div>
          <div class="col-md-6">
            <q-input
              type="number"
              onkeydown="javascript: return event.keyCode === 8 ||
              event.keyCode === 46 ? true : !isNaN(Number(event.key))"
              float-label="Enter numbers of QR count"
              v-model.trim="formdata.count"
              color="grey-9"
            />
            <!-- :error="$v.formdata.count.$error" -->
          </div>
        </div>
        <div class="row group">
          <div class="col" align="right">
            <q-btn
              :disabled="submitDisabled"
              color="light-blue"
              class="q-py-xs"
              label="Create QR"
              @click="fnsubmit(formdata)"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
    <!--END: table title -->

    <!--START >>  Show Add Device Component -->

    <!--END >>  Show Add Device Component -->
  </div>
</template>

<script>
import {
  required,
  numeric,
  email,
  maxLength,
  minLength
} from "@vuelidate/validators";


import { mapGetters, mapActions } from "vuex";
export default {
  name: "damagedDevices",
  components: {},
  data() {
    return {
      formdata: {
        leadSource: "",
        count: ""
      },
      dropDown: {
        leadSourceOptions: []
      }
    };
  },
  validations: {
    formdata: {
      leadSource: {
        required
        // maxLength: maxLength(7),
        // minLength: minLength(5)
      },

      count: {
        required
      }
    }
  },

  computed: {
    ...mapGetters("leadSource", ["getActiveLeadSource"]),
    ...mapGetters("ACTIVE_DEACTIVE_LEAD_SOURCE", [
      "getActiveandDeactiveLeadSource"
    ]),
    ...mapGetters("QRList", ["getAllQRList1"]),
    submitDisabled: function() {
      return this.formdata.leadSource != "" && this.formdata.count != ""
        ;
    }
  },

  created() {
    this.ajaxLoadDataForDeviceTypeTable();
    this.FETCH_QR_LIST1();
  },

  methods: {
    ...mapActions("leadSource", ["LEAD_SOURCE_ACTIVE_LIST"]),
    ...mapActions("createQRCode", ["CREATE_QR_CODE"]),
    ...mapActions("ACTIVE_DEACTIVE_LEAD_SOURCE", [
      "LEAD_SOURCE_ACTIVE_DEACTIVE_LIST"
    ]),
    ...mapActions("QRList", ["FETCH_QR_LIST1"]),
    ajaxLoadDataForDeviceTypeTable() {
      let self = this;
      self.LEAD_SOURCE_ACTIVE_DEACTIVE_LIST().then(() => {
        return _.map(self.getActiveandDeactiveLeadSource, item => {
          self.dropDown.leadSourceOptions.push({
            value: item.instance_id,
            label: item.apiInstanceName
          });
        });
      });
    },
    fnsubmit(request) {
      this.$v.formdata.$touch();
      // if (this.formdata.leadSource == "" && this.formdata.count == "") {
      //   this.$q.notify("Please enter all fields");
      // } else {
      this.$q.loading.show({
        delay: 100, // ms
        message: "Please Wait",
        spinnerColor: "purple-9",
        customClass: "shadow-none"
      });

      let requestParams = {
        url: {
          leadSource: request.leadSource,
          count: request.count
        }
      };

      this.CREATE_QR_CODE(requestParams)
        .then(response => {
          this.FETCH_QR_LIST1();
          this.$q.loading.hide();
          this.$q.notify({
            color: "positive",
            position: "bottom",
            message: "data",
            icon: "thumb_up",
            message: response.data.message
          });

          (this.formdata.leadSource = ""), (this.formdata.count = "");
        })
        .catch(error => {
          this.$q.loading.hide();
          console.log(error);
          this.$q.notify({
            color: "positive",
            position: "bottom",
            icon: "thumb_up",
            message: error.data.message
          });
        });
    }
  }
};
// };
</script>