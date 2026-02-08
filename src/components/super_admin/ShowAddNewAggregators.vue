<template>
    <div>
        <q-dialog
        minimized
        v-model="toggleModel"  
        @hide="emitfnShowAddNewAggregators" 
        @escape-key="emitfnShowAddNewAggregators"  
        class="customModalOverlay" 
        :content-css="{padding:'30px',minWidth: '30vw'}"
        >
            <form> 
                <div class="row gutter-sm q-py-sm items-center">
                    <div class="col-md-12">
                        <div class="text-h6 text-weight-regular">Add New Aggregators </div>
                    </div>
                </div>
                <div class="row gutter-sm q-py-sm items-center">
                    <div class="col-md-12">
                        <q-input 
                        v-model="formData.name" 
                          :error="$v.formData.name.$error"
                          class="text-weight-regular text-grey-8" 
                          color="grey-9" 
                          float-label="Enter Aggregator *" 
                          placeholder="Enter Aggregator *" 
                        />
                    </div>
                </div>
                <div class="row gutter-sm q-py-sm items-center">
                    <div class="col-md-12 group" align="right">
                        <q-btn flat align="right" class="bg-white text-weight-regular text-grey-8" @click="emitfnShowAddNewAggregators()">Cancel</q-btn>
                        <q-btn align="right" @click="fnfinalsubmitAddNewAggregators(formData)" color="purple-9">Save</q-btn>
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
  props: ["propShowAddNewAggregators", "propRowDetails"],
  data() {
    return {
      toggleModel: this.propShowAddNewAggregators,
      formData: {
        name: "",
      },
    };
  },

  validations: {
    formData: {
        name: {
        required,
      },
    },
  },
computed:{
     ...mapGetters("SuperAdminUsers", ["getAllRegionsData"]),
     ...mapGetters("regionGroupDatas", ["getAllRegionGroupData"])

},

  methods: {
    ...mapActions("SuperAdminUsers", [
      "FETCH_ALL_REGIONS_DATA",
      "FEED_EXISTING_REGION_DATA",
    ]),
    ...mapActions("SuperAdminUsers", ["FETCH_ALL_REGIONS_DATA","FEED_REGION_DATA"]),
    ...mapActions("regionGroupDatas", ["FETCH_REGION_GROUP_DATAS", "CREATE_NEW_REGION_GROUP"]),
    ...mapActions("superAdminAggregators", ["CREATE_AGGREGATORS"]),
    emitfnShowAddNewAggregators() {
      this.$emit("emitfnShowAddNewAggregators");
    },
    fnfinalsubmitAddNewAggregators(formData){
console.log("FINAL SUBMITTED VALUES--------->",JSON.stringify(formData))
   this.$v.formData.$touch();
      if (this.$v.formData.$error) {
        this.$q.notify("Please review fields again.");
      } else {
        this.$q.loading.show();
        this.CREATE_AGGREGATORS(formData)
          .then(() => {
            this.$q.loading.hide();
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Successfully Created!",
              icon: "thumb_up",
            });
            // this.FETCH_ALL_REGIONS_DATA();
            this.emitfnShowAddNewAggregators();
            location.reload();
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
