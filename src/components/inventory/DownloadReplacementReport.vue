<template>
  <div>
    <q-modal
      minimized no-backdrop-dismiss v-model="toggleModel"
      :content-css="{padding:'30px',minWidth: '40vw'}"
    > 
     <!-- @hide="emitfnshowAddPartner()"
      @escape-key="emitfnshowAddPartner()" -->
      <form>
        <div class="column group">
          <div class="col-md-12">
            <div class="q-title text-weight-regular"><p align="center"><strong>Download Replacement Report File</strong></p></div>
          </div>
          <div class="col-md-12">
             <q-datetime hide-underline class="q-mr-lg q-py-sm" v-model="formData.from" :min="yesterday" :max="tomorrow" type="date" float-label='From Date' />  
          </div>
        <div class="col-md-12">
           <q-datetime hide-underline class="q-mr-lg q-py-sm" v-model="formData.to" :min="yesterday" :max="tomorrow" type="date" float-label='To Date' /> 
           </div>
        <div class="col-md-12 group" align="right">
            <q-btn
              flat
              align="right"
              class="bg-white text-weight-regular text-grey-8"
              @click="emitfnshowReplacement()"
            >Cancel</q-btn>
            <q-btn align="right" @click="downloadReplacement(formData)" :disabled="submitDisabled" color="purple-9">Download</q-btn>
          </div>
        </div>
      </form>
    </q-modal>
  </div>
</template>

<script>
import Vue from "vue";
import Vuelidate from "vuelidate";
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
} from "vuelidate/lib/validators";
Vue.use(Vuelidate);
import { date } from "quasar";
const today = new Date();
const { startOfDate, addToDate, subtractFromDate } = date;
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["propReplacementReport"],
  data() {
    return {
      toggleModel: this.propReplacementReport,
      tomorrow: addToDate(today, { days: 0 }),
      yesterday: subtractFromDate(today, { days: 720 }),
      state: new Date(),
      defaultValue: startOfDate(today, "year"),
      formData:{
        from:"",
        to:""
      },
      }
      
    
  },

  computed: {
        submitDisabled: function () {

      return (this.formData.from !=0 || this.formData.to !=0 ) ? false : true;
      //|| (this.formData.from== 0 && this.formData.to == 0)
    },
  },
  methods: {
       ...mapActions("DownloadInventoryReplacementRecoveryReports",["FETCH_INVENTORY_REPLACEMENT_RECOVERY_DATAS"]),
      emitfnshowReplacement() {
      this.$emit("emitfnshowReplacement");
     },
    //Permission creation final submit
    downloadReplacement(request) {
     let params = {
        from: this.toTimestamp(request.from.toString()),
        to: this.toTimestamp(request.to.toString())
      };
      this.$q.loading.show({
          delay: 100, // ms
          spinnerColor: "purple-9",
          message: "Please wait.."
      });
      this.FETCH_INVENTORY_REPLACEMENT_RECOVERY_DATAS(params)
        .then(response => {
          this.$emit("emitfnshowReplacement");
          this.$q.loading.hide();
          this.$q.notify({
            color: "positive",
            position: "bottom",
            message: "Successfully Downloaded",
            icon: "thumb_up"
          });
          this.formData.from="",
          this.formData.to=""
    
          
        })
        .catch(error => {
          this.$q.loading.hide();
          if(error.status==400){
            this.$q.notify({
            color: "amber",
            position: "bottom",
            message: "Output file size is high,Select smaller date range",
            icon: "thumb_down"
          });
          }
          else if(error.status == 500){
            this.$q.notify({
            color: "amber",
            position: "bottom",
            message: "INTERNAL_SERVER_ERROR",
            icon: "thumb_down"
          });

          }
          else if(error.status == 403){
            this.$q.notify({
            color: "amber",
            position: "bottom",
            message:  "please choose some another date",
            icon: "thumb_down"
          });

          }
          else{
                       this.$q.notify({
            color: "amber",
            position: "bottom",
            message:  "Please select the field",
            icon: "thumb_down"
          });
          }

          this.formData.from="",
          this.formData.to=""

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
    },
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
