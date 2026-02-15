<template>
  <div>
    <q-dialog
      minimized no-backdrop-dismiss v-model="toggleModel"
      :content-css="{padding:'30px',minWidth: '40vw'}"
    > 
     <!-- @hide="emitfnshowAddPartner()"
      @escape-key="emitfnshowAddPartner()" -->
      <form>
        <div class="column group">
          <div class="col-md-12">
            <div class="text-h6 text-weight-regular"><p align="center"><strong>Download Master Tracker File</strong></p></div>
          </div>
          <div class="col-md-12">
             <q-input hide-underline class="q-mr-lg q-py-sm" v-model="formData.fromDate" :min="yesterday" :max="tomorrow" type="date" float-label='From Date' />
          </div>
        <div class="col-md-12">
           <q-input hide-underline class="q-mr-lg q-py-sm" v-model="formData.toDate" :min="yesterday" :max="tomorrow" type="date" float-label='To Date' />
           </div>
        <div class="col-md-12 group" align="right">
            <q-btn
              flat
              align="right"
              class="bg-white text-weight-regular text-grey-8"
              @click="emitfnshowMasterTrackerList()"
            >Cancel</q-btn>
            <q-btn align="right" @click="downloadMasterTrackerList(formData)" :disabled="submitDisabled" color="purple-9">Download</q-btn>
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
  props: ["propMasterTrackerList"],
  data() {
    return {
      toggleModel: this.propMasterTrackerList,
      tomorrow: addToDate(today, { days: 0 }),
      yesterday: subtractFromDate(today, { days: 7720 }),
      state: new Date(),
      defaultValue: startOfDate(today, "year"),
      formData:{
        fromDate:"",
        toDate:""
      },
      }
      
    
  },

  computed: {
    //     submitDisabled: function () {

    //   return (this.formData.fromDate !=0 || this.formData.toDate !=0) ;
    // },
     submitDisabled: function () {

      return (this.formData.fromDate !=0 || this.formData.toDate !=0 || (this.formData.fromDate== 0 && this.formData.toDate == 0)) ;
    },
  },
  methods: {
       ...mapActions("DownloadMasterTrackerData",["MASTER_TRACKER_LIST_ALL_DATAS"]),
      emitfnshowMasterTrackerList() {
      this.$emit("emitfnshowMasterTrackerList");
     },
     downloadMasterTrackerList(request) {
     let params = {
        fromDate: this.toTimestamp(request.fromDate.toString()),
        toDate: this.toTimestamp(request.toDate.toString())
      };
      this.$q.loading.show({
          delay: 100, // ms
          spinnerColor: "purple-9",
          message: "Please wait.."
      });
      this.MASTER_TRACKER_LIST_ALL_DATAS(params)
        .then(response => {
          this.$emit("emitfnshowMasterTrackerList");
          this.$q.loading.hide();
          this.$q.notify({
            color: "positive",
            position: "bottom",
            message: "Successfully Downloaded",
            icon: "thumb_up"
          });
          this.formData.fromDate="",
          this.formData.toDate=""
    
          
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
          
          else if(error.status == 404){
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

          this.formData.fromDate="",
          this.formData.toDate=""
          

        });

    },
    toTimestamp(strDate) {
      var date = strDate.split("T")[0]
      var curDate = new Date();      
      var mnth = curDate.getMonth()+1;
      var chDate = curDate.getFullYear()+"-"+(mnth < 10 ? "0"+mnth : mnth)+"-"+curDate.getDate();
      var datum = null
      if (chDate == date) 
        datum = Date.now();
      else
        datum = Date.parse(strDate);
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
