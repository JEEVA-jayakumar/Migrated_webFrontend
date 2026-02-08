<template>
    <div>
        <q-dialog
        minimized
        v-model="toggleModel"  
        @hide="emitfnShowEditAggregator" 
        @escape-key="emitfnShowEditAggregator"  
        class="customModalOverlay" 
        :content-css="{padding:'30px',minWidth: '30vw'}"
        >
            <form> 
                <div class="row gutter-sm q-py-sm items-center">
                    <div class="col-md-12">
                        <div class="text-h6 text-weight-regular">Modify Aggregators</div>
                    </div>
                </div>
                <div class="row gutter-sm q-py-sm items-center">
                  <!-- <div class="col-md-12">
                        <q-select
                          v-model="formData.regionGroup"   
                          :error="$v.formData.regionGroup.$error" 
                           :options="regionGroupOptions"
                        
                          class="text-weight-regular text-grey-8" 
                          color="grey-9" 
                          float-label="Region Group" 
                          placeholder="Region Group" 
                        />
                    </div> -->
                    <div class="col-md-12">
                        <q-input v-model="formData.name" 
                          @blur="$v.formData.name.$touch"      
                          :error="$v.formData.name.$error" 
                          @keyup.enter="$v.formData.name.$touch"
                          class="text-weight-regular text-grey-8" 
                          color="grey-9" 
                          float-label="Modify Aggregator Name" 
                          placeholder="Modify Aggregator Name" 
                        />
                    </div>
                </div>
                <div class="row gutter-sm q-py-sm items-center">
                    <div class="col-md-12 group" align="right">
                        <q-btn flat align="right" class="bg-white text-weight-regular text-grey-8" @click="emitfnShowEditAggregator()">Cancel</q-btn>
                        <q-btn align="right" @click="fnfinalsubmitEdittedList(formData)" color="purple-9">Save</q-btn>
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
  props: ["propShowEditAggregator", "propRowDetails"],
  data() {
    return {
      toggleModel: this.propShowEditAggregator,
    //   regionGroupOptions:[],
      // regionGroup: [],
      formData: {
        name:this.propRowDetails.name,
      },
    };
  },

  validations: {
    formData: {
        name: {
        required,
      },
    //   regionGroup: {
    //     required,
    //   },
    },
  },
  beforeMount(){
    //  console.log("Getter Region Name---------------->"+JSON.stringify(this.getAllRegionsData))
    // console.log("Prop details---------------->"+JSON.stringify(this.propShowEditRegionsGroup))
     console.log("Prop Row details---------------->"+JSON.stringify(this.propRowDetails))
    //   this.formData.regionName =this.propRowDetails.regionName
    // this.AllRegionName();
    //   console.log("Region Name---------------->"+JSON.stringify(this.formData.regionName))
  },
  computed:{
     ...mapGetters("SuperAdminUsers", ["getAllRegionsData"]),
      ...mapGetters("regionGroupDatas", ["getAllRegionGroupData"])
  },
//   created(){
//     this.fetchAllRegionGroupData();
//   },
  methods: {
    ...mapActions("SuperAdminUsers", [
      "FETCH_ALL_REGIONS_DATA",
      "FEED_EXISTING_REGION_DATA",
    ]),
    ...mapActions("SuperAdminUsers", ["FETCH_ALL_REGIONS_DATA"]),
    ...mapActions("regionGroupDatas", ["FETCH_REGION_GROUP_DATAS", "UPDATE_REGION_GROUP_DATAS"]),
    ...mapActions("superAdminAggregators", ["EDIT_CREATED_AGGREGATORS"]),
     ...mapActions("superAdminAggregators", ["GET_CREATED_AGGREGATORS_LIST"]),
    emitfnShowEditAggregator() {
      this.$emit("emitfnShowEditAggregator");
    },
    fnfinalsubmitEdittedList(reqData) {
      console.log("FINAL SUBMITRED-------->",JSON.stringify(reqData))
      
      this.$v.formData.$touch();
      if (this.$v.formData.$error) {
        this.$q.notify("Please review fields again.");
      } else {
        this.$q.loading.show();
        let param = {
            name: reqData.name,
            id: this.propRowDetails.id
      };
        this.EDIT_CREATED_AGGREGATORS(param)
          .then(() => {
            this.$q.loading.hide();
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Successfully updated!",
              icon: "thumb_up",
            });
            this.emitfnShowEditAggregator("refresh");
            // this.$emit("emitfnShowEditAggregator", "refresh")
            
          })
          .catch(error => {
            this.$q.loading.hide();
            this.$q.notify({
              color: "negative",
              position: "bottom",
              message:"Please Try Again Later !",
              icon: "thumb_down",
            });
          });
      }
    },
  },
};
</script>
