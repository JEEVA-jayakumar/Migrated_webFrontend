<template>
  <div>
    <q-dialog
      minimized
      v-model="toggleModel"
      @hide="emitfnshowEditServiceType"
      @escape-key="emitfnshowEditServiceType"
      class="customModalOverlay"
      :content-css="{ padding: '30px', minWidth: '50vw'}"
    >
      <form>
        <div class="row gutter-sm q-py-sm items-center">
          <div class="col-md-12">
            <div class="text-h6 text-weight-regular">
              Modify Service Request Info
            </div>
          
          </div>
          
        </div>
        <div class="row gutter-sm q-py-sm items-center">
          <div class="col-md-12">
            <q-input
              v-model="formData.serviceReqType.name"
              :error="$v.formData.serviceReqType.name.$error"
              class="text-weight-regular text-grey-8"
              color="grey-9"
              float-label="Service Req Data"
              placeholder="Service Req Data"
            />
          </div>
        </div >

        <div class="row">
          <div class="col">
          <p>Service Req Issue Type*</p>
          <div class="col-md-12">
            <div class="row items-center" v-for="menu in serviceReqIssueTypeSetsPro" :to="menu.to">
              <input style="width: 18px; height: 18px" type="checkbox" @click="getSelectedDetails($event, menu)" />
              <label>{{ menu.serviceReqIssueType.name}}</label>
              </div>
            </div>
          </div>
          <div class="col">
          <p>Service Status*</p>
          <div class="col-md-12">
            <div class="row items-center" v-for="menu in serviceRequestStatus" :to="menu.to">
              <input style="width: 18px; height: 18px" type="checkbox" @click="getSelectedStatusDetails($event, menu.serviceRequestStatus)" />
              <label>{{ menu.serviceRequestStatus.name}}</label>
            </div>
            </div>
          </div>
        </div>
      
        <div class="row gutter-sm q-py-sm items-center">
          <div class="col-md-12 group" align="right">
            <q-btn
              flat
              align="right"
              class="bg-white text-weight-regular text-grey-8"
              @click="emitfnshowEditServiceType()"
              >Cancel</q-btn
            >
            <q-btn
              align="right"
              @click="fnfinalsubmitEditedSpareParts(formData)"
              color="purple-9"
              >Save</q-btn
            >
          </div>
        </div>
      </form>
    </q-dialog>
     <!--START: Show Sub Task Details-->
     <showServiceSubTaskDetails
        v-if="propShowServiceSubTaskDetails"
        :propShowServiceSubTaskDetails="propShowServiceSubTaskDetails"
        :propRowDetails2="propRowDetails2"
        @emitfnshowServiceSubTaskDetails="fnShowSubTaskDetails"
      />
       <!-- END: Show Sub Task Details -->
  </div>
</template>

<script>
import { required } from "@vuelidate/validators";
import { mapGetters, mapActions } from "vuex";
import showServiceSubTaskDetails from  "../../components/super_admin/showServiceSubTaskDetails.vue";

export default {
     components: {
    showServiceSubTaskDetails,
  },
  props: ["propShowEditServiceType", "propRowDetails2"],
  data() {
    return {
      toggleModel: this.propShowEditServiceType,
      serviceReqIssueTypeSetsPro:[],
      serviceRequestStatus: [],
      serviceRequestStatusSets: [],
       reqData: [],
       reqdata: [],
       name: [],
      propShowServiceSubTaskDetails: false,
      // regionGroup: [],
      formData: {
        serviceReqType:{
           name: JSON.stringify(this.propRowDetails2.serviceReqType.name)
        },
       
      }
    };
  },

  validations: {
    formData: {
      serviceReqType: {
        name:{
          required
        },
        
      }
    }
  },
  beforeMount() {
    console.log(
      "Getter propShowEditSpareParts Name---------------->" +
        JSON.stringify(this.propRowDetails2)
    );
    // console.log("Prop details---------------->"+JSON.stringify(this.propShowEditRegions))
    //  console.log("Prop Row details---------------->"+JSON.stringify(this.propRowDetails2))
    // this.formData.id = this.propRowDetails2.id;
    this.formData.serviceReqType.name= this.propRowDetails2.serviceReqType.name;
    this.serviceReqIssueTypeSetsPro= this.propRowDetails2.serviceReqIssueTypeSets;
    this.serviceRequestStatus= this.propRowDetails2.serviceRequestStatusSets;

    // //  AllRegionName( this.formData.regionGroupName = this.propRowDetails2.regionGroup.regionName)
    // this.AllRegionName();
    //   console.log("Region Name---------------->"+JSON.stringify(this.formData.regionGroupName))
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
      "FEED_EXISTING_REGION_DATA"
    ]),
    ...mapActions("SuperAdminUsers", ["FETCH_ALL_REGIONS_DATA"]),
    ...mapActions("sparePartsGetTypes", ["EDIT_service_req_data"]),
    ...mapActions("serviceRequest", ["EDIT_SERVICE_REQUEST_TYPES","GET_SERVICE_ISSUE_TYPES"]),
    ...mapActions("ServiceRequestStatus", ["EDIT_SERVICE_STATUS_TYPES","FETCH_SERVICE_REQUEST_STATUS_DETAILS"]),
    emitfnshowEditServiceType() {
      this.$emit("emitfnshowEditServiceType");
    },

    getSelectedDetails(event, request){
 console.log("event SUBMITTED VALUES----------->",JSON.stringify(event));
  console.log("request SUBMITTED VALUES----------->",JSON.stringify(request))
   this.reqData.push(request);
   console.log("VALUES----------->",JSON.stringify(this.reqData))
   this.formData.serviceReqIssueTypeSets = this.reqData;
   console.log("serviceReqIssueTypeSets SUBMITTED VALUES----------->",JSON.stringify(this.formData.serviceReqIssueTypeSets ))
    },

    getSelectedStatusDetails(event, serviceRequestStatus){
  //  console.log("event SUBMITTED VALUES getSelectedStatusDetailsSTATUS----------->",JSON.stringify(event));
   console.log("request SUBMITTED VALUES getSelectedStatusDetailsSTATUS----------->",JSON.stringify(request))
    this.reqdata.push({serviceRequestStatus});
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

     fnShowSubTaskDetails(rowDetails){
      this.propShowServiceSubTaskDetails = !this.propShowServiceSubTaskDetails;
      this.propRowDetails2 = rowDetails;
    },
    fnfinalsubmitEditedSpareParts(formData) {
      console.log("FINAL SUBMITTED VALUES----------->",JSON.stringify(formData))
      let param={
        id:this.propRowDetails2.serviceReqType.id,
        request: {
          serviceReqType: formData.serviceReqType,
          serviceReqIssueTypeSets: formData.serviceReqIssueTypeSets,
          serviceRequestStatusSets: formData.serviceRequestStatusSets,
         }
         };
         
      console.log("FINAL PARAM SUBMIT--------->",JSON.stringify(param))
        this.$q.loading.show();
        this.EDIT_SERVICE_REQUEST_TYPES(param)
          .then(() => {
            this.$q.loading.hide();
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Successfully updated!",
              icon: "thumb_up"
            });
            this.emitfnshowEditServiceType();
          })
          .catch(error => {
            this.$q.loading.hide();
            this.$q.notify({
              color: "negative",
              position: "bottom",
              message:
                error.body.message == null
                  ? "Please Try Again Later !"
                  : error.body.message,
              icon: "thumb_down"
            });
          });
    
    }
  }
};
</script>
