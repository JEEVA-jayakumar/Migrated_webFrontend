<template>
    <div>
        <q-dialog
        minimized
        v-model="toggleModel"  
        @hide="emitfnshowEditSpareParts" 
        @escape-key="emitfnshowEditSpareParts"  
        class="customModalOverlay" 
        :content-css="{padding:'30px',minWidth: '30vw'}"
        >
            <form> 
                <div class="row gutter-sm q-py-sm items-center">
                    <div class="col-md-12">
                        <div class="text-h6 text-weight-regular">Modify Spare Parts Info</div>
                    </div>
                </div>
                <div class="row gutter-sm q-py-sm items-center">
                 
                   <div class="col-md-12">
                        <q-input
                          disable
                          v-model="formData.id"   
                          :error="$v.formData.id.$error" 
                          class="text-weight-regular text-grey-8" 
                          color="grey-9" 
                          float-label="Spare Parts Id" 
                          placeholder="Spare Parts Id" 
                        />
                    </div>
                    <div class="col-md-12">
                        <q-input
                          v-model="formData.spare_parts_types"   
                          :error="$v.formData.spare_parts_types.$error" 
                          class="text-weight-regular text-grey-8" 
                          color="grey-9" 
                          float-label="Spare Parts Id" 
                          placeholder="Spare Parts Id" 
                        />
                    </div>
                </div>
                <div class="row gutter-sm q-py-sm items-center">
                    <div class="col-md-12 group" align="right">
                        <q-btn flat align="right" class="bg-white text-weight-regular text-grey-8" @click="emitfnshowEditSpareParts()">Cancel</q-btn>
                        <q-btn align="right" @click="fnfinalsubmitEditedSpareParts(formData)" color="purple-9">Save</q-btn>
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
  props: ["propShowEditSpareParts", "propRowDetails"],
  data() {
    return {
      toggleModel: this.propShowEditSpareParts,
      // regionGroup: [],
      formData: {
        id:JSON.stringify(this.propRowDetails.id),
     spare_parts_types:JSON.stringify(this.propRowDetails.spare_parts_types)
      },
    };
  },

  validations: {
    formData: {
      id: {
        required,
      },
      spare_parts_types: {
        required,
      },
    },
  },
  beforeMount(){
     console.log("Getter propShowEditSpareParts Name---------------->"+JSON.stringify(this.propRowDetails))
    // console.log("Prop details---------------->"+JSON.stringify(this.propShowEditRegions))
    //  console.log("Prop Row details---------------->"+JSON.stringify(this.propRowDetails))
      this.formData.id = this.propRowDetails.id;
      this.formData.spare_parts_types = this.propRowDetails.spare_parts_types;
    // //  AllRegionName( this.formData.regionGroupName = this.propRowDetails.regionGroup.regionName)
    // this.AllRegionName();
    //   console.log("Region Name---------------->"+JSON.stringify(this.formData.regionGroupName))
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
    ...mapActions("sparePartsGetTypes", ["EDIT_SPARE_PARTS_TYPES"]),
    emitfnshowEditSpareParts() {
      this.$emit("emitfnshowEditSpareParts");
    },
    // AllRegionName(){
    //   this.formData.regionGroupName = this.propRowDetails.regionGroup.regionName;
    //   console.log("BEFORE FUNCTION DATAS=---------------------->"+JSON.stringify(this.formData.regionGroupName))
    // },
    fnfinalsubmitEditedSpareParts(formData) {
      this.$v.formData.$touch();
      if (this.$v.formData.$error) {
        this.$q.notify("Please review fields again.");
      } else {
        this.$q.loading.show();
        let param = {
            id: this.formData.id,
            spare_parts_types: this.formData.spare_parts_types,
        };
        this.EDIT_SPARE_PARTS_TYPES(param)
          .then(() => {
            this.$q.loading.show();
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Successfully updated!",
              icon: "thumb_up",
            });
            this.emitfnshowEditSpareParts();
            this.$q.loading.hide();
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
