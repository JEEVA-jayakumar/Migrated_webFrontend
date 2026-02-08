<template>
    <div>
        <q-dialog
        minimized
        v-model="toggleModel"  
        @hide="emitfnShowAddNewSpares" 
        @escape-key="emitfnShowAddNewSpares"  
        class="customModalOverlay" 
        :content-css="{padding:'30px',minWidth: '30vw'}"
        >
            <form> 
                <div class="row gutter-sm q-py-sm items-center">
                    <div class="col-md-12">
                        <div class="text-h6 text-weight-regular">Add New Spars</div>
                    </div>
                </div>
                <div class="row gutter-sm q-py-sm items-center">
                     <div class="col-md-12">
                        <q-input
                          v-model="formData.spareName"   
                          :error="$v.formData.spareName.$error" 
                        
                        
                          class="text-weight-regular text-grey-8" 
                          color="grey-9" 
                          float-label="Enter Spare Parts Name*" 
                          placeholder="Enter Spare Parts Name*" 
                        />
                    </div>
                    <!-- <div class="col-md-12">
                        <q-input 
                        v-model="formData.regionAreaName" 
                          :error="$v.formData.regionAreaName.$error"
                          class="text-weight-regular text-grey-8" 
                          color="grey-9" 
                          float-label="Region" 
                          placeholder="Region" 
                        />
                    </div> -->
                </div>
                <div class="row gutter-sm q-py-sm items-center">
                    <div class="col-md-12 group" align="right">
                        <q-btn flat align="right" class="bg-white text-weight-regular text-grey-8" @click="emitfnShowAddNewSpares()">Cancel</q-btn>
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
  props: ["propShowAddNewSpares", "propRowDetails"],
  data() {
    return {
      toggleModel: this.propShowAddNewSpares,
      formData: {
           regionGroupName: "",
           regionAreaName: "",
        //   regionAreaName
        // id: this.propRowDetails.value,
        // regionAreaName: this.propRowDetails.label,
        // regionGroupName: this.propRowDetails.group,
      },
    };
  },

  validations: {
    formData: {
      spareName: {
        required,
      },
    },
  },
computed:{
     ...mapGetters("SuperAdminUsers", ["getAllRegionsData"]),
},

  methods: {
    ...mapActions("SuperAdminUsers", [
      "FETCH_ALL_REGIONS_DATA",
      "FEED_EXISTING_REGION_DATA",
    ]),
    ...mapActions("SuperAdminUsers", ["FETCH_ALL_REGIONS_DATA"]),
    emitfnShowAddNewSpares() {
      this.$emit("emitfnShowAddNewSpares");
    },
    fnfinalsubmitAddNewRegion(formData) {
      this.$v.formData.$touch();
      if (this.$v.formData.$error) {
        this.$q.notify("Please review fields again.");
      } else {
        this.$q.loading.show();
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
            this.emitfnShowAddNewSpares();
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
