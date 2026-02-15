<template>
    <div>
      <q-dialog
        minimized
        v-model="toggleModel"
        @hide="emitfnshowEditIssueMapping"
        @escape-key="emitfnshowEditIssueMapping"
        class="customModalOverlay"
        :content-css="{ padding: '30px', minWidth: '50vw'}"
      >
        <form>
          <div class="row gutter-sm q-py-sm items-center">
            <div class="col-md-12">
              <div class="text-h6 text-weight-regular">
                Modify Issue Mapping Info
              </div>
            
            </div>
            
          </div>
          <div class="row gutter-sm q-py-sm items-center">
            <div class="col-md-12">
              <q-input
                v-model="formData.name"
                :error="$v.formData.name.$error"
                class="text-weight-regular text-grey-8"
                color="grey-9"
                float-label="Issue Mapping"
                placeholder="Issue Mapping"
              />
            </div>
          </div >
  
          <div class="row">
            <div class="col">
            <p>CS Sub Issue*</p>
            <div class="col-md-12">
              <div class="row items-center" v-for="menu in csSubIssueType" :to="menu.to">
                <input style="width: 18px; height: 18px" type="checkbox" :value="menu" v-model="selectedItem" @input="getSelectedDetails($event, menu)" />
                <label>{{ menu.name}}</label>
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
                @click="emitfnshowEditIssueMapping()"
                >Cancel</q-btn
              >
              <q-btn
              :disable="this.selectedItem == ''"
                align="right"
                @click="fnfinalsubmitIssueMapping(formData)"
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
    props: ["propShowEditIssueMapping", "propRowDetails2"],
    data() {
      return {
        toggleModel: this.propShowEditIssueMapping,
        csSubIssueType:[],
         reqData: [],
         separatedObjects: [],
         name: [],
         selectedItem:[],
         csSubIssue: [],
         list:[],
        propShowServiceSubTaskDetails: false,
        formData: {
             name: JSON.stringify(this.propRowDetails2.name)
         
        }
      };
    },
  
    validations: {
      formData: {
          name:{
            required
          },
      }
    },
    beforeMount() {
      console.log(
        "Getter propShowEditSpareParts Name---------------->" +
          JSON.stringify(this.propRowDetails2)
      );
      this.formData.name= this.propRowDetails2.name;
    },
    computed: {
      ...mapGetters("serviceRequest", ["getcsActiveSubIssueDetails"]),
    },
  
    created(){
      this.getcsSubIssueTypes();
    },
  
    methods: {
      ...mapActions("serviceRequest", ["EDIT_ISSUE_MAPPING","FETCH_ACTIVE_CS_SUB_ISSUE_DATAS"]),
      ...mapActions("ServiceRequestStatus", ["EDIT_SERVICE_STATUS_TYPES","FETCH_SERVICE_REQUEST_STATUS_DETAILS"]),
      emitfnshowEditIssueMapping() {
        this.$emit("emitfnshowEditIssueMapping");
      },
  
      getSelectedDetails(event, request){
    console.log("event SUBMITTED VALUES----------->",event);
    console.log("request SUBMITTED VALUES----------->",JSON.stringify(request.id))
     this.reqData.push(request);
     console.log("VALUES----------->",JSON.stringify(this.reqData))
     this.formData.csSubIssueTypeSets = this.reqData;
     console.log("csSubIssueTypeSets SUBMITTED VALUES----------->",JSON.stringify(this.formData.csSubIssueTypeSets ))
      },
  
      getcsSubIssueTypes(){
        let self = this;
        self.FETCH_ACTIVE_CS_SUB_ISSUE_DATAS().then(() => {
          return _.map(self.getcsActiveSubIssueDetails, item => {
            console.log("getcsSubIssueTypes----------->",JSON.stringify(self.getcsActiveSubIssueDetails))
            self.csSubIssueType.push(item);
          });
        });
      },
  
       fnShowSubTaskDetails(rowDetails){
        this.propShowServiceSubTaskDetails = !this.propShowServiceSubTaskDetails;
        this.propRowDetails2 = rowDetails;
      },
      fnfinalsubmitIssueMapping(formData) {
         console.log("FINAL SUBMITTED VALUES----------->",JSON.stringify(this.reqData))
       console.log("SELECTED ITEM",JSON.stringify(this.selectedItem));
       let list=[]
        list = this.selectedItem.map(item => ({ id: item.id }));
       console.log("FINAL",JSON.stringify(list) );
        let param={
          id:this.propRowDetails2.id,
          request: {
            name: formData.name,
            csSubIssue:list
           }
           };
        console.log("FINAL PARAM SUBMIT--------->",JSON.stringify(param))
          this.$q.loading.show();
          this.EDIT_ISSUE_MAPPING(param)
            .then(() => {
              this.$q.notify({
                color: "positive",
                position: "bottom",
                message: "Successfully updated!",
                icon: "thumb_up"
              });
              this.emitfnshowEditIssueMapping();
              this.$q.loading.hide();
            })
            .catch(error => {
              this.$q.notify({
                color: "negative",
                position: "bottom",
                message:
                  error.body.message == null
                    ? "Please Try Again Later !"
                    : error.body.message,
                icon: "thumb_down"
              });
              this.$q.loading.hide();
            });
      
      }
    }
  };
  </script>
  