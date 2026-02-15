<template>
  <div>
    <q-dialog
      minimized
      no-backdrop-dismiss
      v-model="toggleModel"
      :content-css="{ padding: '33px', minWidth: '33vw' }"
    >
      <!-- @hide="emitfnshowAddPartner()"
        @escape-key="emitfnshowAddPartner()" -->
      <form>
        <div class="column group">
          <div class="col-md-12">
            <div class="text-h6 text-weight-regular">
              <p align="center">
                <strong>Download Implementation Report File</strong>
              </p>
            </div>
          </div>
          <div class="col-md-12">
            <q-input
              hide-underline
              class="q-mr-lg q-py-sm"
              v-model="formData.from"
              :min="yesterday"
              :max="tomorrow"
              type="date"
              float-label="From Date"
            />
          </div>
          <div class="col-md-12">
            <q-input
              hide-underline
              class="q-mr-lg q-py-sm"
              v-model="formData.to"
              :min="yesterday"
              :max="tomorrow"
              type="date"
              float-label="To Date"
            />
          </div>
          <div class="col-md-12 group" align="right">
            <q-btn
              align="right"
              color="negative"
              @click="emitfnHitachiIndianBank()"
              >Cancel</q-btn
            >
            <q-btn
              align="right"
              color="positive"
              @click="downloadIndianBankReport(formData)"
              >Download</q-btn
            >
          </div>
        </div>
      </form>
    </q-dialog>
  </div>
</template>

<script>


import {
  required,
  email,
  password,
  minLength,
  maxLength,
  alpha,
  alphaNum,
  numeric,
  sameAs
} from "@vuelidate/validators";

import { date } from "quasar";
const today = new Date();
const { startOfDate, addToDate, subtractFromDate } = date;
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["propHitachiReport"],
  data() {
    return {
      toggleModel: this.propHitachiReport,
      tomorrow: addToDate(today, { days: 0 }),
      yesterday: subtractFromDate(today, { days: 720 }),
      state: new Date(),
      defaultValue: startOfDate(today, "year"),
      formData: {
        from: "",
        to: ""
      }
    };
  },

  computed: {
    submitDisabled: function() {
      return this.formData.from != 0 || this.formData.to != 0 ;
      //|| (this.formData.from== 0 && this.formData.to == 0)
    }
  },
  methods: {
    ...mapActions("DownloadImplementationIndianBankReport", [
      "FETCH_IMPLEMENTATION_REPORT_FILE"
    ]),
    emitfnHitachiIndianBank() {
      this.$emit("emitfnHitachiIndianBank");
    },
    //Permission creation final submit
    downloadIndianBankReport(request) {
      let params = {
        from: this.toTimestamp(request.from.toString()),
        to: this.toTimestamp(request.to.toString())
      };
      this.$q.loading.show({
        delay: 100, // ms
        spinnerColor: "purple-9",
        message: "Please wait.."
      });
      this.FETCH_IMPLEMENTATION_REPORT_FILE(params)
        .then(response => {
          this.$emit("emitfnHitachiIndianBank");
          this.$q.loading.hide();
          this.$q.notify({
            color: "positive",
            position: "bottom",
            message: "Successfully Downloaded",
            icon: "thumb_up"
          });
          (this.formData.from = ""), (this.formData.to = "");
        })
        .catch(error => {
          this.$q.loading.hide();
          if (error.status == 400) {
            this.$q.notify({
              color: "amber",
              position: "bottom",
              message: "Output file size is high,Select smaller date range",
              icon: "thumb_down"
            });
          } else if (error.status == 500) {
            this.$q.notify({
              color: "amber",
              position: "bottom",
              message: "INTERNAL_SERVER_ERROR",
              icon: "thumb_down"
            });
          } else if (error.status == 403) {
            this.$q.notify({
              color: "amber",
              position: "bottom",
              message: "please choose some another date",
              icon: "thumb_down"
            });
          } else {
            this.$q.notify({
              color: "amber",
              position: "bottom",
              message: "Please select the field",
              icon: "thumb_down"
            });
          }

          (this.formData.from = ""), (this.formData.to = "");
        });
    },
    toTimestamp(strDate) {
      var datum = Date.parse(strDate);
      return datum;
    },
    COMMON_FILTER_FUNCTION(arraySet, terms) {
      return _.filter(arraySet, function(oo) {
        return oo.label.toString().includes(terms.toLowerCase());
      });
    }
  }
};
</script>
<style scoped>
.error {
  color: red;
  font-size: 12px;
  position: absolute;
  text-transform: lowercase;
}
</style>
