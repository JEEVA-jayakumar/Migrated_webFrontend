<template>
  <div>
    <q-dialog minimized v-model="toggleModel" @hide="emitfnShowAddNewServiceType"
      @escape-key="emitfnShowAddNewServiceType" class="customModalOverlay"
      :content-css="{ padding: '30px', minWidth: '50vw' }">
      <form>
        <div class="row gutter-sm q-py-sm items-center">
          <div class="col-md-12">
            <div class="text-h6 text-weight-regular">Add Service Types</div>
          </div>
        </div>
        <div class="row gutter-sm q-py-sm items-center">
          <div class="col-md-12">
            <q-input v-model="formData.serviceReqType.name" :error="$v.formData.serviceReqType.name.$error"
              class="text-weight-regular text-grey-8" color="grey-9" float-label="Enter Service Type Name"
              placeholder="Enter Service Type Name" />
          </div>
        </div>
        
        <div class="row">
          <div class="col">
          <p>Service Req Issue Type*</p>
          <div class="col-md-12">
            <div class="row items-center" v-for="menu in serviceReqIssueTypeSetsPro" :key="menu.id" :to="menu.to">
              <input style="width: 18px; height: 18px" type="checkbox" @click="getSelectedDetails($event, menu)" />
              <label>{{ menu.name}}</label>
              </div>
            </div>
          </div>
          <div class="col">
          <p>Service Status*</p>
          <div class="col-md-12">
            <div class="row items-center" v-for="menu in serviceRequestStatus" :key="menu.id" :to="menu.to">
              <input style="width: 18px; height: 18px" type="checkbox" @click="getSelectedStatusDetails($event, menu)" />
              <label>{{ menu.name}}</label>
            </div>
            </div>
          </div>
        </div>

        <div class="row gutter-sm q-py-sm items-center">
          <div class="col-md-12 group" align="right">
            <q-btn flat align="right" class="bg-white text-weight-regular text-grey-8"
              @click="emitfnShowAddNewServiceType()">Cancel</q-btn>
            <q-btn align="right" @click="fnfinalsubmitAddSpareParts(formData)" color="purple-9">Save</q-btn>
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
  props: ["propShowAddServiceType", "propRowDetails"],
  data() {
    return {
      toggleModel: this.propShowAddServiceType,
      serviceReqIssueTypeSetsPro: [],
      serviceRequestStatus: [],
      reqData: [],
      reqdata:[],
      formData: {
        serviceReqType: {
          name:"",
        },
      
        //   regionAreaName
        // id: this.propRowDetails.value,
        // regionAreaName: this.propRowDetails.label,
        // regionGroupName: this.propRowDetails.group,
      },
    };
  },

  validations: {
    formData: {

      serviceReqType: {
        name:{
           required,
        }
       
      },
    },
  },
  computed: {
    ...mapGetters("SuperAdminUsers", ["getAllRegionsData"]),
    ...mapGetters("serviceRequest", ["getserviceRequestIssueTypes"]),
    ...mapGetters("ServiceRequestStatus", ["getserviceRequestStatusDetails"])
  },
  created(){
    this.getIssueTypes();
    this.getStatusTypes();
  },

  methods: {
    ...mapActions("SuperAdminUsers", [
      "FETCH_ALL_REGIONS_DATA",
      "FEED_EXISTING_REGION_DATA",
    ]),
    ...mapActions("SuperAdminUsers", ["FETCH_ALL_REGIONS_DATA"]),
    ...mapActions("sparePartsGetTypes", ["UPDATE_service_req_data"]),
    ...mapActions("serviceRequest", ["UPDATE_SERVICE_REQUEST_TYPES","GET_SERVICE_ISSUE_TYPES"]),
    ...mapActions("ServiceRequestStatus", ["FETCH_SERVICE_REQUEST_STATUS_DETAILS"]),
    emitfnShowAddNewServiceType() {
      this.$emit("emitfnShowAddNewServiceType");
    },
     getSelectedDetails(event, request){
  // console.log("event SUBMITTED VALUES----------->",JSON.stringify(event));
  // console.log("request SUBMITTED VALUES----------->",JSON.stringify(request))
    this.reqData.push({"serviceReqIssueType": request});
   console.log("VALUES----------->",JSON.stringify(this.reqData))
   this.formData.serviceReqIssueTypeSets= this.reqData;
  //  console.log("serviceReqIssueTypeSets SUBMITTED VALUES----------->",JSON.stringify(this.formData.serviceReqIssueTypeSets ))
    },

    getSelectedStatusDetails(event, request){
   console.log("event SUBMITTED VALUES getSelectedStatusDetailsSTATUS----------->",JSON.stringify(event));
   console.log("request SUBMITTED VALUES getSelectedStatusDetailsSTATUS----------->",JSON.stringify(request))
    this.reqdata.push({"serviceRequestStatus": request});
   console.log("VALUES----------->",JSON.stringify(this.reqdata))
   this.formData.serviceRequestStatusSets= this.reqdata;
  //  console.log("serviceRequestStatusSets SUBMITTED VALUES----------->",JSON.stringify(this.serviceRequestStatusSets ))
    },

    getIssueTypes(){
      let self = this;
      self.GET_SERVICE_ISSUE_TYPES().then(() => {
        return _.map(self.getserviceRequestIssueTypes, item => {
          // console.log("getIssueTypes----------->",JSON.stringify(self.getserviceRequestIssueTypes ))
          self.serviceReqIssueTypeSetsPro.push(item);
        });
      });
    },

    getStatusTypes(){
      let self = this;
      self.FETCH_SERVICE_REQUEST_STATUS_DETAILS().then(() => {
        return _.map(self.getserviceRequestStatusDetails, item => {
          console.log("FETCH_SERVICE_REQUEST_STATUS_DETAILS----------->>>>>>",JSON.stringify(self.getserviceRequestStatusDetails))
          self.serviceRequestStatus.push(item);
        });
      });
    },

    fnfinalsubmitAddSpareParts(formData) {
      // console.log("SUBMITTED VALUES_----------------->",JSON.stringify(formData))
      this.$v.formData.$touch();
      if (this.$v.formData.$error) {
        this.$q.notify("Please review fields again.");
      } else {
        // console.log("SUBMIT RESPONSE", JSON.stringify(formData))
        this.$q.loading.show({
          delay: 100, // ms
          message: "Please Wait",
          spinnerColor: "purple-9",
          customClass: "shadow-none"
        });
        this.UPDATE_SERVICE_REQUEST_TYPES(formData)
        .then(() => {
             this.$q.loading.hide();
             this.$emit("emitfnShowAddNewServiceType","refresh");
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
