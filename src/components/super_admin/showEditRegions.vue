<template>
    <div>
        <q-dialog
        minimized
        v-model="toggleModel"  
        @hide="emitfnshowEditRegions" 
        @escape-key="emitfnshowEditRegions"  
        class="customModalOverlay" 
        :content-css="{padding:'30px',minWidth: '30vw'}"
        >
            <form> 
                <div class="row gutter-sm q-py-sm items-center">
                    <div class="col-md-12">
                        <div class="text-h6 text-weight-regular">Modify Region Info</div>
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
                        <q-input v-model="formData.regionAreaName" 
                          @blur="$v.formData.regionAreaName.$touch"      
                          :error="$v.formData.regionAreaName.$error" 
                          @keyup.enter="$v.formData.regionAreaName.$touch"
                          class="text-weight-regular text-grey-8" 
                          color="grey-9" 
                          float-label="Region" 
                          placeholder="Region" 
                        />
                    </div>
                </div>
                <div class="row gutter-sm q-py-sm items-center">
                    <div class="col-md-12 group" align="right">
                        <q-btn flat align="right" class="bg-white text-weight-regular text-grey-8" @click="emitfnshowEditRegions()">Cancel</q-btn>
                        <q-btn align="right" @click="fnfinalsubmitRegion(formData)" color="purple-9">Save</q-btn>
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
  props: ["propShowEditRegions", "propRowDetails"],
  data() {
    return {
      toggleModel: this.propShowEditRegions,
      regionGroupOptions:[],
      // regionGroup: [],
      formData: {
        regionGroup:JSON.stringify(this.propRowDetails.regionGroup.regionName),
        regionAreaName:this.propRowDetails.regionAreaName,
         id: this.propRowDetails.id
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
  beforeMount(){
    //  console.log("Getter Region Name---------------->"+JSON.stringify(this.getAllRegionsData))
    // console.log("Prop details---------------->"+JSON.stringify(this.propShowEditRegions))
     console.log("Prop Row details---------------->"+JSON.stringify(this.propRowDetails))
    //  this.formData.regionGroup =JSON.stringify(this.propRowDetails.regionGroup.regionName),
    this.AllRegionName();
      console.log("Region Name---------------->"+JSON.stringify(this.formData.regionGroup))
  },
  computed:{
     ...mapGetters("SuperAdminUsers", ["getAllRegionsData"]),
      ...mapGetters("regionGroupDatas", ["getAllRegionGroupData"])
  },
  created(){
    this.fetchAllRegionGroupData();
  },
  methods: {
    ...mapActions("SuperAdminUsers", [
      "FETCH_ALL_REGIONS_DATA",
      "FEED_EXISTING_REGION_DATA",
    ]),
    ...mapActions("SuperAdminUsers", ["FETCH_ALL_REGIONS_DATA"]),
    ...mapActions("regionGroupDatas", ["FETCH_REGION_GROUP_DATAS"]),
    emitfnshowEditRegions() {
      this.$emit("emitfnshowRegions");
    },
    AllRegionName(){
      this.formData.regionGroup = this.propRowDetails.regionGroup.regionName;
      console.log("BEFORE FUNCTION DATAS=---------------------->"+JSON.stringify(this.formData.regionGroup))
    },
     fetchAllRegionGroupData(){
      this.FETCH_REGION_GROUP_DATAS()
      .then((response)=>{
        console.log("response fetchAllRegionGroupData ====>",JSON.stringify(response))
        console.log("fetchAllRegionGroupData ====>",JSON.stringify(this.getAllRegionGroupData))
        return _.map(this.getAllRegionGroupData, item => {
             console.log("DEVICE GETTING API ITEM VALUES OF PLAN--------->"+JSON.stringify(item))
            this.regionGroupOptions.push({
              //  console.log("REGION GROUPS------------->" +"label"+label);
              value: item,
              label: item.regionName
            });
          
          });
          //  console.log("REGION GROUPS------------->" +regionGroupOptions);
      })
    },
    fnfinalsubmitRegion(formData) {
      console.log("FINAL SUBMITRED-------->",JSON.stringify(formData))
      this.$v.formData.$touch();
      if (this.$v.formData.$error) {
        this.$q.notify("Please review fields again.");
      } else {
        this.$q.loading.show();
        // let param={
        //   request: formData.regionGroup
        // };
         console.log("FINAL SUBMITRED-------->",JSON.stringify(formData))
        this.FEED_EXISTING_REGION_DATA(formData)
          .then(() => {
            this.$q.loading.hide();
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Successfully updated!",
              icon: "thumb_up",
            });
            this.FETCH_ALL_REGIONS_DATA();
            this.emitfnshowEditRegions();
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
  },
};
</script>
