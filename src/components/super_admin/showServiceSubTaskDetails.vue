<template>
  <div>
    <q-dialog
      minimized
      v-model="toggleModel"
      @hide="emitfnshowServiceSubTaskDetails"
      @escape-key="emitfnshowServiceSubTaskDetails"
      class="customModalOverlay"
      :content-css="{ padding: '30px', minWidth: '30vw' }"
    >
      <form>
        <div class="row gutter-sm q-py-sm items-center">
          <div class="col-md-12">
            <div class="text-h6 text-weight-regular">Add Sub Task</div>
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
              float-label="Service Request Id"
              placeholder="Service Request Id"
            />
          </div>
          <div class="col-md-12">
            <q-input
              disable
              v-model="service_req_data"
              class="text-weight-regular text-grey-8"
              color="grey-9"
              float-label="Service Request "
              placeholder="Service Request "
            />
          </div>
          <div class="col-md-12">
            <q-select
              v-model="formData.issue_reason"
              :error="$v.formData.issue_reason.$error"
              float-label="Select Subtask"
              radio
              color="grey-9"
              :options="subtaskDetails"
            />
          </div>
        </div>
        <div class="row gutter-sm q-py-sm items-center">
          <div class="col-md-12 group" align="right">
            <q-btn
              flat
              align="right"
              class="bg-white text-weight-regular text-grey-8"
              @click="emitfnshowServiceSubTaskDetails()"
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
    </q-dialog>
  </div>
</template>

<script>
import { required } from "@vuelidate/validators";
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["propShowServiceSubTaskDetails", "propRowDetails"],
  data() {
    return {
      toggleModel: this.propShowServiceSubTaskDetails,
      subtaskDetails: [],
      // regionGroup: [],
      service_req_data: JSON.stringify(this.propRowDetails.service_req_data),
      formData: {
        id: JSON.stringify(this.propRowDetails.id),
      
        issue_reason:"",
      }
    };
  },

  validations: {
    formData: {
      id: {
        required
      },
      issue_reason:{
        required
      }
    }
  },
  beforeMount() {
    console.log(
      "Getter propShowEditSpareParts Name---------------->" +
        JSON.stringify(this.propRowDetails)
    );
    // console.log("Prop details---------------->"+JSON.stringify(this.propShowEditRegions))
    //  console.log("Prop Row details---------------->"+JSON.stringify(this.propRowDetails))
    this.formData.id = this.propRowDetails.id;
    this.formData.service_req_data = this.propRowDetails.service_req_data;
    // //  AllRegionName( this.formData.regionGroupName = this.propRowDetails.regionGroup.regionName)
    // this.AllRegionName();
    //   console.log("Region Name---------------->"+JSON.stringify(this.formData.regionGroupName))
  },
  computed: {
    ...mapGetters("SuperAdminUsers", ["getAllRegionsData"]),
    ...mapGetters("serviceRequest", ["getsubTaskDetails"])
  },
  created(){
    this.fnsubTaskLoader();
  },
  methods: {
    ...mapActions("SuperAdminUsers", [
      "FETCH_ALL_REGIONS_DATA",
      "FEED_EXISTING_REGION_DATA"
    ]),
    ...mapActions("SuperAdminUsers", ["FETCH_ALL_REGIONS_DATA"]),
    ...mapActions("sparePartsGetTypes", ["EDIT_SPARE_PARTS_TYPES"]),
   ...mapActions("serviceRequest", ["FETCH_SUB_TASK_DATAS"]),

   fnsubTaskLoader() {
      this.FETCH_SUB_TASK_DATAS()
        .then(() => {
          let assumeArr = [];
          this.getsubTaskDetails.map(function(value, index) {
            assumeArr.push({
              label: value.issue_reason,
              value: value.id
            });
          });
          this.subtaskDetails = assumeArr;
        })
        .catch(error => {
          this.subtaskDetails = [];
        });
    },

    emitfnshowServiceSubTaskDetails() {
      this.$emit("emitfnshowServiceSubTaskDetails");
    },
    // AllRegionName(){
    //   this.formData.regionGroupName = this.propRowDetails.regionGroup.regionName;
    //   console.log("BEFORE FUNCTION DATAS=---------------------->"+JSON.stringify(this.formData.regionGroupName))
    // },
    fnfinalsubmitEditedSpareParts(formData) {
      console.log("FORMDATA DETAILS----------",JSON.stringify(formData));
      this.$v.formData.$touch();
      if (this.$v.formData.$error) {
        this.$q.notify("Please review fields again.");
      } else {
        this.$q.loading.show();
        let param = {
          id: this.formData.id,
          service_req_data: this.formData.service_req_data
        };
        this.EDIT_SPARE_PARTS_TYPES(param)
          .then(() => {
            this.$q.loading.hide();
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Successfully updated!",
              icon: "thumb_up"
            });
            this.emitfnshowServiceSubTaskDetails();
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
