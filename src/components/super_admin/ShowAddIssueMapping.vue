<template>
    <div>
      <q-dialog minimized v-model="toggleModel" @hide="emitfnShowAddNewIssueMapping"
        @escape-key="emitfnShowAddNewIssueMapping" class="customModalOverlay"
        :content-css="{ padding: '30px', minWidth: '50vw' }">
        <form>
          <div class="row gutter-sm q-py-sm items-center">
            <div class="col-md-12">
              <div class="text-h6 text-weight-regular">Add Issue Mapping</div>
            </div>
          </div>
          <div class="row gutter-sm q-py-sm items-center">
            <div class="col-md-12">
              <q-input v-model="formData.name" :error="$v.formData.name.$error"
                class="text-weight-regular text-grey-8" color="grey-9" float-label="Enter Issue Mapping Name"
                placeholder="Enter Issue Mapping Name" />
            </div>
          </div>
          
          <div class="row">
            <div class="col">
            <p>CS Sub Issue*</p>
            <div class="col-md-12">
              <div class="row items-center" v-for="menu in csSubIssueType" :key="menu.id" :to="menu.to">
                <input style="width: 18px; height: 18px" type="checkbox" :value="menu" v-model="selectedItem" @input="getSelectedDetails($event, menu)" />
                <label>{{ menu.name}}</label>
                </div>
              </div>
            </div>
          </div>
  
          <div class="row gutter-sm q-py-sm items-center">
            <div class="col-md-12 group" align="right">
              <q-btn flat align="right" class="bg-white text-weight-regular text-grey-8"
                @click="emitfnShowAddNewIssueMapping()">Cancel</q-btn>
              <q-btn :disable="this.selectedItem == ''" align="right" @click="fnfinalsubmitIssueMapping(formData)" color="purple-9">Save</q-btn>
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
    props: ["propShowAddIssueMapping", "propRowDetails"],
    data() {
      return {
        toggleModel: this.propShowAddIssueMapping,
        csSubIssueType: [],
        selectedItem:[],
        reqData: [],
        formData: {
            name:"",
        },
      };
    },
  
    validations: {
      formData: {
  
          name:{
             required,
          }
      },
    },
    computed: {
      ...mapGetters("serviceRequest", ["getcsActiveSubIssueDetails"]),
    },
    created(){
      this.getcsSubIssueTypes();
    },
  
    methods: {
      ...mapActions("serviceRequest", ["UPDATE_ISSUE_MAPPING","FETCH_ACTIVE_CS_SUB_ISSUE_DATAS"]),
      emitfnShowAddNewIssueMapping() {
        this.$emit("emitfnShowAddNewIssueMapping");
      },
       getSelectedDetails(event, request){
    // console.log("event SUBMITTED VALUES----------->",JSON.stringify(event));
    // console.log("request SUBMITTED VALUES----------->",JSON.stringify(request))
      this.reqData.push({"serviceReqIssueType": request});
     console.log("VALUES----------->",JSON.stringify(this.reqData))
     this.formData.csSubIssueTypeSets= this.reqData;
    //  console.log("csSubIssueTypeSets SUBMITTED VALUES----------->",JSON.stringify(this.formData.csSubIssueTypeSets ))
      },
      getcsSubIssueTypes(){
        let self = this;
        self.FETCH_ACTIVE_CS_SUB_ISSUE_DATAS().then(() => {
          return _.map(self.getcsActiveSubIssueDetails, item => {
            console.log("getcsSubIssueTypes----------->",JSON.stringify(self.getcsActiveSubIssueDetails ))
            self.csSubIssueType.push(item);
          });
        });
      },
      fnfinalsubmitIssueMapping(formData) {
        // console.log("SUBMITTED VALUES_----------------->",JSON.stringify(formData))
        this.$v.formData.$touch();
        if (this.$v.formData.$error) {
          this.$q.notify("Please review fields again.");
        } else {
            this.$q.loading.show({
            delay: 100, // ms
            message: "Please Wait",
            spinnerColor: "purple-9",
            customClass: "shadow-none"
          });
        let list=[]
        list = this.selectedItem.map(item => ({ id: item.id }));
        let param={
            name: formData.name,
            csSubIssue:list
           };
        console.log("FINAL PARAM SUBMIT--------->",JSON.stringify(param))
          this.UPDATE_ISSUE_MAPPING(param)
          .then(() => {
               this.$q.loading.hide();
               this.$emit("emitfnShowAddNewIssueMapping","refresh");
              this.$q.notify({
                color: "positive",
                position: "bottom",
                message: "Added Successfully",
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
  