<template>
    <div>
        <q-modal 
        minimized
        v-model="propShowCreateRegions"  
        @hide="emitfnshowAddRegions" 
        @escape-key="emitfnshowAddRegions"  
        class="customModalOverlay" 
        :content-css="{padding:'30px',minWidth: '30vw'}"
        >
            <form> 
                <div class="row gutter-sm q-py-sm items-center">
                    <div class="col-md-12">
                        <div class="q-title text-weight-regular">Add Region Info</div>
                    </div>
                </div>
                <div class="row gutter-sm q-py-sm items-center">
                    <div class="col-md-12">
                        <q-input v-model="formData.regionAreaName" 
                            @blur="$v.formData.regionAreaName.$touch"      
                            :error="$v.formData.regionAreaName.$error" 
                            class="text-weight-regular text-grey-8" color="grey-9" float-label="Region" placeholder="Region" 
                        />
                    </div>
                </div>
                <div class="row gutter-sm q-py-sm items-center">
                    <div class="col-md-12 group" align="right">
                        <q-btn flat align="right" class="bg-white text-weight-regular text-grey-8" @click="emitfnshowAddRegions()">Cancel</q-btn>
                        <q-btn align="right" @click="fnfinalsubmitRegion(formData)" color="purple-9">Save</q-btn>
                    </div>
                </div>
            </form>
        </q-modal>
    </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["propShowCreateRegions"],
  data() {
    return {
      model: "",
      formData: {
        regionAreaName: "",
      },
    };
  },

  validations: {
    formData: {
      regionAreaName: {
        required,
      },
    },
  },

  methods: {
    ...mapActions("SuperAdminUsers", [
      "FETCH_ALL_REGIONS_DATA",
      "FEED_REGION_DATA",
    ]),
    emitfnshowAddRegions() {
      this.$emit("emitfnshowRegions", "emitfnForRegionTable");
    },
    fnfinalsubmitRegion(formData) {
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
              message: "Successfully created!",
              icon: "thumb_up",
            });
            this.FETCH_ALL_REGIONS_DATA();
            this.emitfnshowAddRegions();
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
