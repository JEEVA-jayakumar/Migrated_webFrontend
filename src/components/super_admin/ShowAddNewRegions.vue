<template>
    <div>
        <q-dialog
        minimized
        v-model="toggleModel"  
        @hide="emitfnShowAddNewRegions" 
        @escape-key="emitfnShowAddNewRegions"  
        class="customModalOverlay" 
        :content-css="{padding:'30px',minWidth: '30vw'}"
        >
            <form> 
                <div class="row gutter-sm q-py-sm items-center">
                    <div class="col-md-12">
                        <div class="text-h6 text-weight-regular">Add New Regions</div>
                    </div>
                </div>
                <div class="row gutter-sm q-py-sm items-center">
                     <div class="col-md-12">
                        <q-select
                          v-model="formData.regionGroup"   
                          :error="$v.formData.regionGroup.$error" 
                        
                          :options="regionGroupOptions"
                          class="text-weight-regular text-grey-8" 
                          color="grey-9" 
                          float-label="Region Group" 
                          placeholder="Region Group" 
                        />
                    </div>
                    <div class="col-md-12">
                        <q-input 
                        v-model="formData.regionAreaName" 
                          :error="$v.formData.regionAreaName.$error"
                          class="text-weight-regular text-grey-8" 
                          color="grey-9" 
                          float-label="Region" 
                          placeholder="Region" 
                        />
                    </div>
                </div>
                <div class="row gutter-sm q-py-sm items-center">
                    <div class="col-md-12 group" align="right">
                        <q-btn flat align="right" class="bg-white text-weight-regular text-grey-8" @click="emitfnShowAddNewRegions()">Cancel</q-btn>
                        <q-btn align="right" @click="fnfinalsubmitAddNewRegion(formData)" color="purple-9">Save</q-btn>
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
  props: ["propShowAddNewRegions", "propRowDetails"],
  data() {
    return {
      toggleModel: this.propShowAddNewRegions,
      regionGroupOptions:[],
      formData: {
           regionGroup: "",
           regionAreaName: "",
        //   regionAreaName
        // id: this.propRowDetails.value,
        // regionAreaName: this.propRowDetails.label,
        // regionGroup: this.propRowDetails.group,
      },
    };
  },

  validations: {
    formData: {
      regionAreaName: {
        required,
      },
      regionGroup: {
        required,
      },
    },
  },
computed:{
     ...mapGetters("SuperAdminUsers", ["getAllRegionsData"]),
     ...mapGetters("regionGroupDatas", ["getAllRegionGroupData"])

},
  created() {
    this.fetchAllRegionGroupData();
  },

  methods: {
    ...mapActions("SuperAdminUsers", [
      "FETCH_ALL_REGIONS_DATA",
      "FEED_EXISTING_REGION_DATA",
    ]),
    ...mapActions("SuperAdminUsers", ["FETCH_ALL_REGIONS_DATA","FEED_REGION_DATA"]),
    ...mapActions("regionGroupDatas", ["FETCH_REGION_GROUP_DATAS"]),
    emitfnShowAddNewRegions() {
      this.$emit("emitfnShowAddNewRegions");
    },
    fnfinalsubmitAddNewRegion(formData) {
      console.log("FINAL SUBMITTED VALUES--------->",JSON.stringify(formData))
      this.$v.formData.$touch();
      if (this.$v.formData.$error) {
        this.$q.notify("Please review fields again.");
      } else {
        this.$q.loading.show();
        this.FEED_REGION_DATA(formData)
          .then(() => {
            this.$q.loading.hide();
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Successfully updated!",
              icon: "thumb_up",
            });
            this.FETCH_ALL_REGIONS_DATA();
            this.emitfnShowAddNewRegions();
          })
          .catch(error => {
            this.$q.loading.hide();
            this.$q.notify({
              color: "negative",
              position: "bottom",
              message: error.body.message == null ? "Please Try Again Later !" : error.body.message,
              icon: "thumb_down",
            });
          });
      }
    },
    fetchAllRegionGroupData(){
      this.FETCH_REGION_GROUP_DATAS()
      .then((response)=>{
        console.log("response fetchAllRegionGroupData ====>",JSON.stringify(response))
        console.log("fetchAllRegionGroupData ====>",JSON.stringify(this.getAllRegionGroupData))
        return _.map(this.getAllRegionGroupData, item => {
             console.log("DEVICE GETTING API ITEM VALUES OF PLAN--------->"+JSON.stringify(item))
            this.regionGroupOptions.push({
              value: item,
              label: item.regionName
            });
          });
      })
    },
  },
};
</script>
