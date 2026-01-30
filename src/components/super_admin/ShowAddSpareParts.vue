<template>
    <div>
        <q-modal 
        minimized
        v-model="toggleModel"  
        @hide="emitfnShowAddNewSpareParts" 
        @escape-key="emitfnShowAddNewSpareParts"  
        class="customModalOverlay" 
        :content-css="{padding:'30px',minWidth: '30vw'}"
        >
            <form> 
                <div class="row gutter-sm q-py-sm items-center">
                    <div class="col-md-12">
                        <div class="q-title text-weight-regular">Add Spare Types</div>
                    </div>
                </div>
                <div class="row gutter-sm q-py-sm items-center">
                     <div class="col-md-12">
                        <q-input
                          v-model="formData.spare_parts_types"   
                          :error="$v.formData.spare_parts_types.$error" 
                          class="text-weight-regular text-grey-8" 
                          color="grey-9" 
                          float-label="Enter Spare Parts Name" 
                          placeholder="Enter Spare Parts Name" 
                        />
                    </div>
                </div>
                <div class="row gutter-sm q-py-sm items-center">
                    <div class="col-md-12 group" align="right">
                        <q-btn flat align="right" class="bg-white text-weight-regular text-grey-8" @click="emitfnShowAddNewSpareParts()">Cancel</q-btn>
                        <q-btn align="right" @click="fnfinalsubmitAddSpareParts(formData)" color="purple-9">Save</q-btn>
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
  props: ["propShowAddSpareParts", "propRowDetails"],
  data() {
    return {
      toggleModel: this.propShowAddSpareParts,
      formData: {
           spare_parts_types: "",
   
        //   regionAreaName
        // id: this.propRowDetails.value,
        // regionAreaName: this.propRowDetails.label,
        // regionGroupName: this.propRowDetails.group,
      },
    };
  },

  validations: {
    formData: {

      spare_parts_types: {
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
    ...mapActions("sparePartsGetTypes", ["UPDATE_SPARE_PARTS_TYPES"]),
    emitfnShowAddNewSpareParts() {
      this.$emit("emitfnShowAddNewSpareParts");
    },
    fnfinalsubmitAddSpareParts(formData) {
      this.$v.formData.$touch();
      if (this.$v.formData.$error) {
        this.$q.notify("Please review fields again.");
      } else {
          console.log("SUBMIT RESPONSE",JSON.stringify(formData))
           this.$q.loading.show({
              delay: 100, // ms
              message: "Please Wait",
              spinnerColor: "purple-9",
              customClass: "shadow-none"
            });
        this.UPDATE_SPARE_PARTS_TYPES(formData)
         .then(() => {
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Spares Added Successfully",
              icon: "thumb_up"
            });
            this.emitfnShowAddNewSpareParts()
            this.$q.loading.hide();
              this.$router.push("/super/admin/sparePartsTypes");
            // self.$router.push("/super/admin/sparePartsTypes");
            // self.$q.loading.hide();
           
          })
          .catch(error => {
            this.$q.loading.hide();
            this.$q.notify({
              type: "warning",
              color: "amber-9",
              position: "bottom",
              message: error.data.message
            });
          });
      }
    },
  },
};
</script>
