<template>
  <div>
    <!--padding:'30px',minWidth: '30vw'-->
    <!--minWidth:'50%',height:'auto',maxHeight:'50vh',margin:'20px',padding:'20px'-->
    <q-modal
      class="customModalOverlay"
      v-model="toggleModel"
      :content-css="{padding:'30px',minWidth: '30vw'}"
    >
      <div class="column">
        <div class="q-py-sm q-title bottom-border">Add New Configurations</div>
        <div class="q-py-sm">
          <div class="col-md-5 col-sm-4 col-xs-12 q-pa-sm">
          <q-card style="width:100%">
            <q-card-separator />
            <q-card-main>
              <q-item>
                <q-item-main>
                  <q-select
                    color="grey-9"
                    v-model="formData.leadSource"
                    :options="dropDown.leadSourceOptions"
                    float-label="Select lead source"
                    placeholder="Lead source"
                  />
                </q-item-main>
                <q-item-side right>
                  <q-btn
                    round
                    dense
                    no-caps
                    size="md"
                    @click="fnManageLeadSource"
                    color="purple-9"
                    icon="add"
                    class="no-margin"
                  />
                </q-item-side>
              </q-item>
              <q-item>
                  <!-- <p> VAS Types</p> -->
                  <!-- <div class="row">
                  <div class="row items-center" v-for="menu in sparePartsTypes" :key="menu.value.id" :to="menu.to">
                    <input style="width: 18px; height: 18px" type="checkbox" :id="menu.value.id + '_CB'"
                      :name="menu.value.spare_parts_types" @click="getSelectedDetails($event, menu.value)" />
                    <label>{{ menu.value.spare_parts_types }}</label>
                  </div>
                </div> -->
                <q-item-main>
                  <q-select
                    color="grey-9"
                    v-model="formData.vas"
                    :options="dropDown.vasOptions"
                    float-label="Select VAS"
                    placeholder="Select VAS"
                  />
                </q-item-main>
                <q-item-side right>
                  <q-btn
                    round
                    dense
                    no-caps
                    size="md"
                    @click="fnManageTxnType"
                    color="purple-9"
                    icon="add"
                    class="no-margin"
                  />
                </q-item-side>
                  <!-- <div class="col" align="right">
                    <q-btn
                    round
                    dense
                    no-caps
                    size="md"
                    @click="fnManageTxnType"
                    color="purple-9"
                    icon="add"
                    class="no-margin"
                  />
                  </div> -->
              </q-item>
              <q-item>
                <q-item-main>
                  <q-select
                    color="grey-9"
                    v-model="formData.masterHost"
                    :options="dropDown.hostOptions"
                    float-label="Select Host"
                    placeholder="Select Host"
                  />
                </q-item-main>
                <q-item-side right>
                  <q-btn
                    round
                    dense
                    no-caps
                    size="md"
                    @click="fnManageHost"
                    color="purple-9"
                    icon="add"
                    class="no-margin"
                  />
                </q-item-side>
              </q-item>
                <q-item>
              <q-item-main>
                <q-select
                  color="grey-9"
                  v-model="formData.institution"
                  :options="dropDown.marsinstitutionOptions"
                  float-label="Select Mars Instance"
                  placeholder="Select Mars Instance"
                />
              </q-item-main>
              <q-item-side right>
                <q-btn
                  round
                  dense
                  no-caps
                  size="md"
                  @click="fnManageInstance"
                  color="purple-9"
                  icon="add"
                  class="no-margin"
                />
              </q-item-side>
            </q-item>
            <!-- <q-item>
              <q-item-main>
                <q-select
                  color="grey-9"
                  v-model="formData.plan"
                  :options="dropDown.planOptions"
                  float-label="Select TID Group"
                  placeholder="Select TID Group"
                />
              </q-item-main>
              <q-item-side right>
                <q-btn
                  round
                  dense
                  no-caps
                  size="md"
                  @click="fnManageTIDGroup"
                  color="purple-9"
                  icon="add"
                  class="no-margin"
                />
              </q-item-side>
            </q-item> -->
            </q-card-main>
            <q-card-actions vertical align="end">
             <q-btn label="submit" @click="fnsubmit(formData)" color="purple-9" />
            </q-card-actions>
          </q-card>
        </div>
        </div>
      </div>
    </q-modal>
    
        <!-- END >> Table >> MDR details -->
  
        <!--START: Show lead source -->
        <showLeadSourceModalComponent
          v-if="showLeadSourceModal"
          :propToggleModal="showLeadSourceModal"
          @emitToggleModal="fnManageLeadSource"
        ></showLeadSourceModalComponent>
        <!--END: Show lead source -->

      <!--START: Show plan details -->
      <showMarsInstanceModalComponent
        v-if="showPlanDetailModal"
        :propToggleModal="showPlanDetailModal"
        @emitToggleModal="fnManageInstance"
      ></showMarsInstanceModalComponent>
      <!--END: Show plan details-->
      
      <!--fnManageTxnType-->
      <!--START: Show TXN Type details -->
      <showTxnTypeModalComponent
        v-if="showTxnDetailModal"
        :propToggleModal="showTxnDetailModal"
        @emitToggleModal="fnManageTxnType"
      ></showTxnTypeModalComponent>
      <!--END: Show TXN Type details-->
       
      
      <!--START: Show TID GROUP details -->
      <showTIDGroupModalComponent
        v-if="showTIDGroupDetailModal"
        :propToggleModal="showTIDGroupDetailModal"
        @emitToggleModal="fnManageTIDGroup"
      ></showTIDGroupModalComponent>
      <!--END: Show TID GROUP details--> 

        <!--START: Show device details -->
        <showHostDetailModalComponent
          v-if="showHostDetailModal"
          :propToggleModal="showHostDetailModal"
          @emitToggleModal="fnManageHost"
        ></showHostDetailModalComponent>
        <!--END: Show device details-->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
 /* START >> Modal components Lead source, device, merchant type */
 import showLeadSourceModalComponent from "../../components/super_admin/showLeadSourceModalComponents.vue";
  import showHostDetailModalComponent from "../../components/super_admin/showHostDetailModalComponent.vue";
  import showTxnTypeModalComponent from "../../components/super_admin/showTxnTypeModalComponent.vue";
import showMarsInstanceModalComponent from "../../components/super_admin/showMarsInstanceModalComponent.vue";
import showTIDGroupModalComponent from "../../components/super_admin/showTIDGroupModalComponent.vue";

export default {
  props: ["propShowAddNewConfigurarions"],
  components: {
      /* START >> Modal components Lead source, device, plan */
      showLeadSourceModalComponent,
      showHostDetailModalComponent,
      showMarsInstanceModalComponent,
      showTIDGroupModalComponent,
      showTxnTypeModalComponent
      /* END >> Modal components Lead source, device, plan */
    },
    data() {
      return {
        /* START >> Modal props */
        showLeadSourceModal: false,
        showHostDetailModal: false,
        showPlanDetailModal: false,
        showTxnDetailModal: false,
        showTIDGroupDetailModal: false,
        activeLeadSourceList: [],
        activeDeviceList: [],
        toggleModel: this.propShowAddNewConfigurarions,
  
        /* END >> Modal props */
  
        /* START >> Rental charges */
        formData: {
          leadSource: "",
          vas: "",
          masterHost:"",
          institution:"",
        },
        dropDown: {
          hostOptions: [],
          leadSourceOptions: [],
          vasOptions: [],
          marsDeviceOptions:[],
          marsinstitutionOptions: []
        },
        selectOptions: [
          {
            label: "Option 01",
            value: 1
          },
          {
            label: "Option 02",
            value: 2
          }
        ],
        /* END >>Table properties */
  
        /* START >>Table properties */
        filterSearch: "",
        paginationControl: {
          rowsPerPage: 5
        }
        
      };
    },
    created() {
      /* START: Load user table data filter > DeviceTypes */
      this.ajaxLoadDataForDeviceTypeTable();
    },
    computed: {
      ...mapGetters("SA_Devices", ["getAllDevicesInfo","getMarsDeviceModel"]),
      ...mapGetters("leadSource", ["getActiveLeadSource"]),
      ...mapGetters("merchantTypes", ["getActiveMerchantTypes"]),
      ...mapGetters("plan", ["getActivePlan"]),
      ...mapGetters("categoryBasedRental", ["categoryBasedRental"]),
      ...mapGetters("Host", ["getAllHostDetails"]),
      ...mapGetters("MarsInstance", ["getMarsInstanceDetails"]),
      ...mapGetters("vasCreation", ["getAllVasDetails"])

    },
    methods: {
      ...mapActions("SA_Devices", ["FETCH_DEVICES_DATA","FETCH_MARS_DEVICE_MODEL"]),
      ...mapActions("leadSource", ["LEAD_SOURCE_ACTIVE_LIST"]),
      ...mapActions("plan", ["PLAN_ACTIVE_LIST"]),
      ...mapActions("RentalPlan", ["RENTAL_PLAN"]),
      ...mapActions("categoryBasedRental", [
        "CATEGORY_BASED_RENTAL_PLAN",
        "EDIT_RENTAL_PLAN"
      ]),
      ...mapActions("Host", ["GET_HOST_DETAILS"]),
      ...mapActions("vasCreation", ["GET_ALL_VAS_DETAILS"]),
      ...mapActions("MarsInstance", ["GET_MARS_INSTITUTION_DETAILS"]),
      ...mapActions("lsVasHostInstance", ["CREATE_LS_VAS_HOST_INSTANCE_DETAILS"]),
      //  marsDeviceModelDatasLoading(){CREATE_LS_VAS_HOST_INSTANCE_DETAILS
      //   let self = this;
      //   self.FETCH_MARS_DEVICE_MODEL()
      //       .then(() => {
      //         return _.map(self.getMarsDeviceModel, item => {
      //           console.log("GETTING API ITEM VALUES OF PLAN--------->"+JSON.stringify(item))
      //           item.map(oo => {
      //             console.log("mapping mars device options : " + oo.code + ", name : " + oo.name)
      //             self.dropDown.marsDeviceOptions.push({ 
      //               label: oo.name, 
      //               value: oo.code 
      //             });
      //           });
      //         });
      //       });
            
      // },
      // ajaxLoadDataForHostTable(){
      //   let self = this;
      //   self.GET_HOST_DETAILS()
      //       .then(() => {
      //         return _.map(self.getAllHostDetails, item => {
      //           console.log("GETTING API ITEM VALUES OF PLAN--------->"+JSON.stringify(item))
      //           item.map(oo => {
      //             console.log("mapping mars device options : " + oo.code + ", name : " + oo.name)
      //             self.dropDown.hostOptions.push({ 
      //               label: oo.name, 
      //               value: oo.code 
      //             });
      //           });
      //         });
      //       });
      // },
      ajaxLoadDataForDeviceTypeTable() {
        let self = this;
        self
          .GET_HOST_DETAILS()
          .then(() => {
            return _.map(self.getAllHostDetails, item => {
              
              self.dropDown.hostOptions.push({
                value: item,
                label: item.name
              });
            });
          })
          .then(() => {
            self.LEAD_SOURCE_ACTIVE_LIST().then(() => {
              return _.map(self.getActiveLeadSource, item => {
                self.dropDown.leadSourceOptions.push({
                  value: item,
                  label: item.sourceName
                });
              });
            });
          })
          .then(() => {
            self.GET_ALL_VAS_DETAILS().then(() => {
              return _.map(self.getAllVasDetails, item => {
                console.log("GET_ALL_VAS_DETAILS, item: --->",JSON.stringify(item))
                self.dropDown.vasOptions.push({
                  value: item,
                  label: item.name
                });
              });
            });
          })
          // vasOptions
          .then(() => {
            self.GET_MARS_INSTITUTION_DETAILS().then(() => {
              return _.map(self.getMarsInstanceDetails, item => {
                // console.log("GET_MARS_INSTITUTION_DETAILS, item: --->",JSON.stringify(item))
                self.dropDown.marsinstitutionOptions.push({
                  value: item,
                  label: item.institutionName
                });
              });
            });
          });
      },
      fnsubmit(request) {
         
           this.CREATE_LS_VAS_HOST_INSTANCE_DETAILS(request)
          .then(response => {
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "data",
              icon: "thumb_up",
              message: response.data.message
            });
            var self = this;
            Object.keys(this.formData).forEach(function(key, index) {
              self.formData[key] = "";
            });
          })
          .catch(error => {
            console.log(error);
            this.$q.notify({
              color: "positive",
              position: "bottom",
              icon: "thumb_up",
              message: error.data.message
            });
            var self = this;
            Object.keys(this.formData).forEach(function(key, index) {
              self.formData[key] = "";
            });
          });
      },
  
      /* START >> Manage lead source, device, merchant type */
      fnManageLeadSource() {
        this.showLeadSourceModal = !this.showLeadSourceModal;
        // this.$router.push({name: "addLeadSource"})
      },
    //   fnManageInstance(){
    //       this.showInstanceDetailModal = !this.showInstanceDetailModal;
    //   },
      activeDevice() {
        this.FETCH_DEVICES_DATA().then(() => {
          this.activeDeviceList = this.getAllDevicesInfo;
        });
      },
      fnManageHost(token) {
        this.showHostDetailModal = !this.showHostDetailModal;
        if (token == "refresh") {
          this.activeDevice();
        }
      },
      
      // showInstanceDetailModal
      activePincode() {
        this.PLAN_ACTIVE_LIST().then(() => {
          this.activeLeadSourceList = this.getActivePlan;
        });
      },
      fnManageInstance(token) {
      this.showPlanDetailModal = !this.showPlanDetailModal;
      if (token == "refresh") {
        this.activePincode();
      }
    },
    fnManageTIDGroup(){
        this.showTIDGroupDetailModal =!this.showTIDGroupDetailModal;
    },
    fnManageTxnType(){
        this.showTxnDetailModal =! this.showTxnDetailModal;
    },
    },
    /* END >> Manage lead source, device, merchant type */
  
    /* START >> Manage MDR charges */
    fnShowEditPermission() {},
    fnDisablePermission() {},
    /* END >> Manage MDR charges */
  
    myCustomSearchFilter(rows, terms, cols, cellValue) {
      const lowerTerms = terms ? terms.toLowerCase() : "";
      return rows.filter(row =>
        cols.some(
          col =>
            (cellValue(col, row) + "").toLowerCase().indexOf(lowerTerms) !== -1
        )
      );
    }
};
</script>
<style scoped>
label {
  padding: 10px;
  display: table;
}

input[type="file"] {
  display: none;
}
</style>
