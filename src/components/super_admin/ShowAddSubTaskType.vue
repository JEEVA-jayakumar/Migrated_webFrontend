<template>
    <div>
        <q-dialog
        minimized
        v-model="toggleModel"  
        @hide="emitfnShowAddNewSubTaskType" 
        @escape-key="emitfnShowAddNewSubTaskType"  
        class="customModalOverlay" 
        :content-css="{padding:'30px',minWidth: '30vw'}"
        >
            <form> 
                <div class="row gutter-sm q-py-sm items-center">
                    <div class="col-md-12">
                        <div class="text-h6 text-weight-regular">Add Sub Task Types</div>
                    </div>
                </div>
                <!-- <div class="row gutter-sm q-py-sm items-center">
                <div class="col-md-12">
                        <q-select
                          v-model="formData."   
                          :error="$v.formData.issue_req_type.$error" 
                          class="text-weight-regular text-grey-8" 
                          color="grey-9" 
                          float-label="Select Service Request" 
                          :options="selectServiceReqType"
                          placeholder="Select Service Request" 
                        />
                    </div>
                </div> -->
                <div class="row gutter-sm q-py-sm items-center">
                     <div class="col-md-12">
                        <q-input
                          v-model="formData.name"   
                          :error="$v.formData.name.$error" 
                          class="text-weight-regular text-grey-8" 
                          color="grey-9" 
                          float-label="Enter Sub Task Name" 
                          placeholder="Enter Sub Task Name" 
                        />
                    </div>
                </div>
                <div class="row gutter-sm q-py-sm items-center">
                    <div class="col-md-12 group" align="right">
                        <q-btn flat align="right" class="bg-white text-weight-regular text-grey-8" @click="emitfnShowAddNewSubTaskType()">Cancel</q-btn>
                        <q-btn align="right" @click="fnfinalsubmitAddSubTaskType(formData)" color="purple-9">Save</q-btn>
                    </div>
                </div>
            </form>
        </q-dialog>
    </div>
</template>

<script>
import { required } from "@vuelidate/validators";
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["propShowAddSubTaskType", "propRowDetails"],
  data() {
    return {
      toggleModel: this.propShowAddSubTaskType,
      selectServiceReqType: [],
      formData: {
          // issue_req_type:"",
           name: "",
   
        //   regionAreaName
        // id: this.propRowDetails.value,
        // regionAreaName: this.propRowDetails.label,
        // regionGroupName: this.propRowDetails.group,
      },
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
    },
  },
computed:{
     ...mapGetters("SuperAdminUsers", ["getAllRegionsData"]),
     ...mapGetters("serviceRequest", ["getsubTaskDetails"])
},
created(){
    this.fnAddSubTaskDetails();
},

  methods: {
    ...mapActions("SuperAdminUsers", [
      "FETCH_ALL_REGIONS_DATA",
      "FEED_EXISTING_REGION_DATA",
    ]),
    ...mapActions("SuperAdminUsers", ["FETCH_ALL_REGIONS_DATA"]),
    ...mapActions("sparePartsGetTypes", ["UPDATE_service_req_data"]),
    ...mapActions("serviceRequest", ["FETCH_SUB_TASK_DATAS","POST_SUB_TASK_TYPES"]),
    emitfnShowAddNewSubTaskType() {
      this.$emit("emitfnShowAddNewSubTaskType");
    },

fnAddSubTaskDetails(){
     this.FETCH_SUB_TASK_DATAS()
        .then(() => {
          let assumeArr = [];
          this.getsubTaskDetails.map(function(value, index) {
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

    fnfinalsubmitAddSubTaskType(formData) {
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
        this.POST_SUB_TASK_TYPES(formData)
        .then(() => {
             this.$q.loading.hide();
             this.$emit("emitfnShowAddNewSubTaskType","refresh");
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Sub Task Added Successfully",
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
