<template>
    <div>
        <q-modal 
        minimized
        v-model="toggleModel"  
        @hide="emitfnShowAddServiceResolutionRemarks" 
        @escape-key="emitfnShowAddServiceResolutionRemarks"  
        class="customModalOverlay" 
        :content-css="{padding:'30px',minWidth: '30vw'}"
        >
            <form> 
                <div class="row gutter-sm q-py-sm items-center">
                    <div class="col-md-12">
                        <div class="q-title text-weight-regular">Add Service Resolution Remarks</div>
                    </div>
                </div>
                <div class="row gutter-sm q-py-sm items-center">
                     <div class="col-md-12">
                        <q-input
                          v-model="formData.name"   
                          :error="$v.formData.name.$error" 
                          class="text-weight-regular text-grey-8" 
                          color="grey-9" 
                          float-label="Enter Service Resolution Remarks" 
                          placeholder="Enter Service Resolution Remarks" 
                        />
                    </div>
                    <div>
            <q-radio class="alignsize" v-for="(item, index) in option.flagOptions" :key="index" color="grey-9" v-model.trim="formData.category"
            @blur="$v.formData.category.$touch"
              :error="$v.formData.category.$error"
          :val="item.value" :label="item.label" />
          </div>
                </div>
                <div class="row gutter-sm q-py-sm items-center">
                    <div class="col-md-12 group" align="right">
                        <q-btn flat align="right" class="bg-white text-weight-regular text-grey-8" @click="emitfnShowAddServiceResolutionRemarks()">Cancel</q-btn>
                        <q-btn align="right" @click="fnfinalsubmitAddServiceResolutionRemarks(formData)" color="purple-9">Save</q-btn>
                    </div>
                </div>
            </form>
        </q-modal>
    </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["propShowAddServiceResolutionRemarks", "propRowDetails"],
  data() {
    return {
      toggleModel: this.propShowAddServiceResolutionRemarks,
      selectServiceReqType: [],
      formData: {
          // issue_req_type:"",
           name: "",
           category:null
        //   regionAreaName
        // id: this.propRowDetails.value,
        // regionAreaName: this.propRowDetails.label,
        // regionGroupName: this.propRowDetails.group,
      },

      option:{
      flagOptions: [
          {
            label: 'APP',
            value: 1
          },
          {
            label: 'PORTAL',
            value: 2
          }

        ],
      
     }
    };
  },

  validations: {
    formData: {
      // issue_req_type:{
      //     required
      // },
      name: {
        required,
      },
      category:{
        required,
      }
    },
  },
computed:{
     ...mapGetters("serviceRequest", ["getserviceResolutionDeatils"])
},
created(){
    this.fnAddSubTaskDetails();
},

  methods: {
    ...mapActions("serviceRequest", ["FETCH_SERVICE_RESOLUTION_DATAS","POST_SERVICE_RESOLUTION_REMARKS"]),
    emitfnShowAddServiceResolutionRemarks() {
      this.$emit("emitfnShowAddServiceResolutionRemarks");
    },

fnAddSubTaskDetails(){
     this.FETCH_SERVICE_RESOLUTION_DATAS()
        .then(() => {
          let assumeArr = [];
          this.getserviceResolutionDeatils.map(function(value, index) {
            assumeArr.push({
              label: value.issue_req_type.service_req_data,
              value: value.id
            });
          });
          this.selectServiceReqType = assumeArr;
        })
        .catch(error => {
          this.selectServiceReqType = [];
        });
},

fnfinalsubmitAddServiceResolutionRemarks(formData) {
         console.log("SUBMIT Sub Task RESPONSE",JSON.stringify(formData))
      this.$v.formData.$touch();
      if (this.$v.formData.$error) {
        this.$q.notify("Please review fields again.");
      } else {
          console.log("SUBMIT RESPONSE",JSON.stringify(formData))
           this.$q.loading.show({
              delay: 100, // ms
              message: "Please Wait",
              spinnerColor: "purple-9",
              customClass: "shadow-none"
            });
        this.POST_SERVICE_RESOLUTION_REMARKS(formData)
        .then(() => {
             this.$q.loading.hide();
             this.$emit("emitfnShowAddServiceResolutionRemarks","refresh");
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Remarks Added Successfully",
              icon: "thumb_up"
            });
             
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
  },
};
</script>
<style>
.alignsize{
  margin-left: 10px;
}
</style>