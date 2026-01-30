<template>
  <q-page>
    <div class="row">
      <div class="col-12 q-title q-pa-md text-weight-regular bottom-border">Add New Hierarchy</div>
      <!-- START >> Setup MDR details -->
      <div class="col-md-5 col-sm-4 col-xs-12 q-pa-sm">
        <q-card style="width:100%">
          <q-card-main>
            <q-list no-border>
              
              <q-item>
                <q-item-main>
                  <q-input
                    color="grey-9"
                    type="text"
                    v-model="formData.hierarchy"
                     @blur="$v.formData.hierarchy.$touch"
                     :error="$v.formData.hierarchy.$error"
                    float-label="Enter New Hierarchy"
                    placeholder="Add New Hierarchy"
                  />
                   
                </q-item-main>
              </q-item>
                <q-item>
                <q-item-main>
                  <q-input
                    color="grey-9"
                    type="text"
                    v-model="formData.hierarchyCode"
                    @blur="$v.formData.hierarchyCode.$touch"
                    :error="$v.formData.hierarchyCode.$error"
                    float-label="Enter New Hierarchy Code"
                    placeholder="Add New Hierarchy Code"
                  />
                   
                </q-item-main>
              </q-item>
            </q-list>
          </q-card-main>
          <q-card-actions vertical align="end">
            <q-btn label="submit" @click="fnAddHierarchy(formData)" color="purple-9" />
            <!-- <q-btn label="submit" @click="fnsubmit(formData)" color="purple-9" /> -->
          </q-card-actions>
        </q-card>
      </div>
      <!-- END >> Setup MDR details -->
      <!-- START >> Table >> MDR details -->
   
      <!-- END >> Table >> MDR details -->
      <!--START: Show lead source -->
      <!-- <showLeadSourceModalComponent
        v-if="showLeadSourceModal"
        :propToggleModal="showLeadSourceModal"
        @emitToggleModal="fnManageLeadSource"
      ></showLeadSourceModalComponent> -->
      <!--END: Show lead source -->
      <!--START: Show device details -->
      <!-- <showDeviceDetailModalComponent
        v-if="showDeviceDetailModal"
        :propToggleModal="showDeviceDetailModal"
        @emitToggleModal="fnManageDevice"
      ></showDeviceDetailModalComponent> -->
      <!--END: Show device details-->
      <!--START: Show lead source -->
      <!-- <showMerchantModalComponent
        v-if="showMerchantModal"
        :propToggleModal="showMerchantModal"
        @emitToggleModal="fnManageMerchantType"
      ></showMerchantModalComponent> -->
      <!--END: Show lead source -->
    </div>
  </q-page>
</template>

<script>
import {
  required,
  minLength,
  maxLength,
  integer,
  email
} from "vuelidate/lib/validators";
/* START >> Modal components Lead source, device, merchant type */
import showLeadSourceModalComponent from "../../components/super_admin/showLeadSourceModalComponents.vue";
import showDeviceDetailModalComponent from "../../components/super_admin/showDeviceDetailModalComponents.vue";
import showMerchantModalComponent from "../../components/super_admin/merchantTypes.vue";
/* END >> Modal components Lead source, device, merchant type */

import { mapGetters, mapActions } from "vuex";
export default {
  name: "MDRdetails",
  components: {
    /* START >> Modal components Lead source, device, merchant type */
    // showLeadSourceModalComponent,
    // showDeviceDetailModalComponent,
    // showMerchantModalComponent
    /* END >> Modal components Lead source, device, merchant type */
  },
  data() {
    return {
      /* START >> Modal props */
    //   showLeadSourceModal: false,
    //   showDeviceDetailModal: false,
    //   showMerchantModal: false,
      /* END >> Modal props */

      /* START >> Rental charges */
      formData: {
        
        hierarchy: "",
        hierarchyCode: "",
      },
     
    
      /* END >> Rental charges */

      /* START >>Table properties */
    
      /* END >>Table properties */
     
      /* END >>Table data */
    };
      },
       validations: {
    formData: {
        hierarchy: { required },
        hierarchyCode: { required }
    }
  },
   error: {
    formData: {
    
        hierarchy: {
          alert: false,
          issue: "",
          value: ""
        },
         hierarchyCode: {
          alert: false,
          issue: "",
          value: ""
        }
    }
    
  },

computed: {
    ...mapGetters("SA_Devices", ["getAllDevicesInfo","getMarsDeviceModel"]),
},

  methods: {
    ...mapActions("SA_Devices", ["FETCH_DEVICES_DATA","FETCH_MARS_DEVICE_MODEL"]),
    ...mapActions("AddHierarchy",["SAVE_HIERARCHY"]),
    fnsubmit(request) {
      let requestParams = {
        url: {
          leadSource: request.leadSource,
          device: request.device,
          marsDevice:request.marsDevice,
          merchantType: request.merchantType
        },
        params: {
          debitLessthanAmount: request.debitLessthanAmount,
          debitGreaterthanAmount: request.debitGreaterthanAmount,
          stdCC: request.stdCC,
          premiumCC: request.premiumCC,
          corpCC: request.corpCC,
          intlCC: request.intlCC,
          superPremiumlCC: request.superPremiumlCC
        }
      };

      this.MDR_PLAN(requestParams)
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
    fnAddHierarchy(request){
      console.log(" Hierarchy------------------999999999999999", JSON.stringify(request))
      
      //  alert("INSIDE");
     //   this.downloadAttachment = !this.downloadAttachment;
       this.$v.formData.$touch();
       if(this.$v.formData.$error){
          this.$q.notify({
          color: "negative",
          position: "bottom",
          message: "Please fill all mandatory fields",
          icon: "info"
        });
      }else {
          let self = this;
          self.$q.loading.show({
          delay: 0, // ms
          spinnerColor: "purple-9",
          message: "Validating..."
         });
          this.SAVE_HIERARCHY(request)
         .then((response) => {
          this.$q.loading.hide();
              console.log(response);
              this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Successfully Created",
              icon: "thumb_up",
            });
            this.$router.push("/super/admin/hierarchy"); 
          })
          .catch((error) => {
            this.$q.loading.hide();
            this.$q.notify({
              type: "warning",
              color: "amber-9",
              position: "bottom",
              message:
              error.body.message == null
              ? "Please Try Again Later !"
              : error.body.message,
              icon: "thumb_down",
            });
            // this.$router.push("/sat/appHelpDesk");
          });        
      }
    },
  },
     
 
};
</script>

<style>
</style>
