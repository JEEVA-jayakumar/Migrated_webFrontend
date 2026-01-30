<template>
  <div>
    <q-modal
      minimized
      v-model="toggleModel"
      @hide="emitfnshowEditSubTaskType"
      @escape-key="emitfnshowEditSubTaskType"
      class="customModalOverlay"
      :content-css="{ padding: '30px', minWidth: '30vw' }"
    >
      <form>
        <div class="row gutter-sm q-py-sm items-center">
          <div class="col-md-12">
            <div class="q-title text-weight-regular">
              Modify Service Request Info
            </div>
          </div>
          
        </div>
        <div class="row gutter-sm q-py-sm items-center">
          <div class="col-md-12">
            <q-input
              v-model="formData.name"
              :error="$v.formData.name.$error"
              class="text-weight-regular text-grey-8"
              color="grey-9"
              float-label="Service Sub Task Name"
              placeholder="Service Sub Task Name"
            />
          </div>
        </div>
        <div class="row gutter-sm q-py-sm items-center">
          <div class="col-md-12 group" align="right">
            <q-btn
              flat
              align="right"
              class="bg-white text-weight-regular text-grey-8"
              @click="emitfnshowEditSubTaskType()"
              >Cancel</q-btn
            >
            <q-btn
              align="right"
              @click="fnfinalsubmitEditedSpareParts(formData)"
              color="purple-9"
              >Save</q-btn
            >
          </div>
        </div>
      </form>
    </q-modal>
     <!--START: Show Sub Task Details-->
     <showServiceSubTaskDetails
        v-if="propShowServiceSubTaskDetails"
        :propShowServiceSubTaskDetails="propShowServiceSubTaskDetails"
        :propRowDetails="propRowDetails"
        @emitfnshowServiceSubTaskDetails="fnShowSubTaskDetails"
      />
       <!-- END: Show Sub Task Details -->
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { mapGetters, mapActions } from "vuex";
import showServiceSubTaskDetails from  "../../components/super_admin/showServiceSubTaskDetails.vue";

export default {
     components: {
    showServiceSubTaskDetails,
  },
  props: ["propShowEditSubTaskType", "propRowDetails1"],
  data() {
    return {
      toggleModel: this.propShowEditSubTaskType,
      propShowServiceSubTaskDetails: false,
      // regionGroup: [],
      formData: {
        
        name: JSON.stringify(this.propRowDetails1.issueReason)
      }
    };
  },

  validations: {
    formData: {
      // id: {
      //   required
      // },
      name: {
        required
      }
    }
  },
  beforeMount() {
    console.log(
      "Getter propShowEditSpareParts 123456Name---------------->" +
        JSON.stringify(this.propRowDetails1)
    );
    // console.log("Prop details---------------->"+JSON.stringify(this.propShowEditRegions))
    //  console.log("Prop Row details---------------->"+JSON.stringify(this.propRowDetails1))
    // this.formData.id = this.propRowDetails1.id;
    this.formData.name = this.propRowDetails1.name;
    // //  AllRegionName( this.formData.regionGroupName = this.propRowDetails.regionGroup.regionName)
    // this.AllRegionName();
    //   console.log("Region Name---------------->"+JSON.stringify(this.formData.regionGroupName))
  },
  computed: {
    ...mapGetters("SuperAdminUsers", ["getAllRegionsData"])
  },
  methods: {
    ...mapActions("SuperAdminUsers", [
      "FETCH_ALL_REGIONS_DATA",
      "FEED_EXISTING_REGION_DATA"
    ]),
    ...mapActions("SuperAdminUsers", ["FETCH_ALL_REGIONS_DATA"]),
    ...mapActions("sparePartsGetTypes", ["EDIT_service_req_data"]),
    ...mapActions("serviceRequest", ["EDIT_SERVICE_REQUEST_TYPES","EDIT_SUB_TASK_TYPES"]),
    emitfnshowEditSubTaskType() {
      this.$emit("emitfnshowEditSubTaskType");
    },
    // AllRegionName(){
    //   this.formData.regionGroupName = this.propRowDetails.regionGroup.regionName;
    //   console.log("BEFORE FUNCTION DATAS=---------------------->"+JSON.stringify(this.formData.regionGroupName))
    // },
    // fnShowSubTaskDetails(formData){
    //     console.log("SUB TASK DETAILS---------------->",JSON.stringify(formData))
    // },
     fnShowSubTaskDetails(rowDetails){
      this.propShowServiceSubTaskDetails = !this.propShowServiceSubTaskDetails;
      this.propRowDetails = rowDetails;
    },
    fnfinalsubmitEditedSpareParts(formData) {
      this.$v.formData.$touch();
      if (this.$v.formData.$error) {
        this.$q.notify("Please review fields again.");
      } else {
        this.$q.loading.show();
        let param = {
         id: JSON.stringify(this.propRowDetails1.id),
          request: this.formData
        };
        this.EDIT_SUB_TASK_TYPES(param)
          .then(() => {
            this.$q.loading.hide();
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Successfully updated!",
              icon: "thumb_up"
            });
            this.emitfnshowEditSubTaskType();
          })
          .catch(error => {
            this.$q.loading.hide();
            this.$q.notify({
              color: "negative",
              position: "bottom",
              message:
                error.body.message == null
                  ? "Please Try Again Later !"
                  : error.body.message,
              icon: "thumb_down"
            });
          });
      }
    }
  }
};
</script>
