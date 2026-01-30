<template>
    <div>
        <q-modal 
        minimized
        v-model="toggleModel"  
        @hide="emitfnShowAddNewCsSubIssue" 
        @escape-key="emitfnShowAddNewCsSubIssue"  
        class="customModalOverlay" 
        :content-css="{padding:'30px',minWidth: '30vw'}"
        >
            <form> 
                <div class="row gutter-sm q-py-sm items-center">
                    <div class="col-md-12">
                        <div class="q-title text-weight-regular">Add CS Sub Issue</div>
                    </div>
                </div>
                <div class="row gutter-sm q-py-sm items-center">
                     <div class="col-md-12">
                        <q-input
                          v-model="formData.name"   
                          :error="$v.formData.name.$error" 
                          class="text-weight-regular text-grey-8" 
                          color="grey-9" 
                          float-label="Enter CS Sub Issue" 
                          placeholder="Enter CS Sub Issue" 
                        />
                    </div>
                </div>
                <div class="row gutter-sm q-py-sm items-center">
                    <div class="col-md-12 group" align="right">
                        <q-btn flat align="right" class="bg-white text-weight-regular text-grey-8" @click="emitfnShowAddNewCsSubIssue()">Cancel</q-btn>
                        <q-btn align="right" @click="fnfinalsubmitAddCsSubIssue(formData)" color="purple-9">Save</q-btn>
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
  props: ["propShowAddCsSubIssue", "propRowDetails"],
  data() {
    return {
      toggleModel: this.propShowAddCsSubIssue,
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
     ...mapGetters("serviceRequest", ["getcsSubIssueDetails"])
},
created(){
    this.fnAddCsSubIssueDetails();
},

  methods: {
    ...mapActions("serviceRequest", ["FETCH_CS_SUB_ISSUE_DATAS","POST_CS_SUB_ISSUE"]),
    emitfnShowAddNewCsSubIssue() {
      this.$emit("emitfnShowAddNewCsSubIssue");
    },

    fnAddCsSubIssueDetails(){
     this.FETCH_CS_SUB_ISSUE_DATAS()
        .then(() => {
          let assumeArr = [];
          this.getcsSubIssueDetails.map(function(value, index) {
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

fnfinalsubmitAddCsSubIssue(formData) {
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
        this.POST_CS_SUB_ISSUE(formData)
        .then(() => {
             this.$q.loading.hide();
             this.$emit("emitfnShowAddNewCsSubIssue","refresh");
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
