<template>
  <div>
    <q-modal
      minimized
      v-model="toggleModel"
      @hide="emitfnshowEditServiceResolutionRemarks"
      @escape-key="emitfnshowEditServiceResolutionRemarks"
      class="customModalOverlay"
      :content-css="{ padding: '30px', minWidth: '30vw' }"
    >
      <form>
        <div class="row gutter-sm q-py-sm items-center">
          <div class="col-md-12">
            <div class="q-title text-weight-regular">
              Modify Service Resolution Remarks
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
              float-label="Enter Service Resolution Remarks"
              placeholder="Enter Service Resolution Remarks"
            />
          </div>
          <div>
            <q-radio
              class="alignsize"
              v-for="(item, index) in option.flagOptions"
              :key="index"
              color="grey-9"
              v-model.trim="formData.category"
              :val="item.value"
              :label="item.label"
            />
          </div>
        </div>
        <div class="row gutter-sm q-py-sm items-center">
          <div class="col-md-12 group" align="right">
            <q-btn
              flat
              align="right"
              class="bg-white text-weight-regular text-grey-8"
              @click="emitfnshowEditServiceResolutionRemarks()"
              >Cancel</q-btn
            >
            <q-btn
              align="right"
              @click="fnfinalsubmitServiceResolutionRemarks(formData)"
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
import showServiceSubTaskDetails from "../../components/super_admin/showServiceSubTaskDetails.vue";

export default {
  components: {
    showServiceSubTaskDetails
  },
  props: ["propShowEditServiceResolutionRemarks", "propRowDetails1"],
  data() {
    return {
      toggleModel: this.propShowEditServiceResolutionRemarks,
      propShowServiceSubTaskDetails: false,
      // regionGroup: [],
      formData: {
        name: JSON.stringify(this.propRowDetails1.issueReason),
        category: JSON.stringify(this.propRowDetails1.category)
      },
      option: {
        flagOptions: [
          {
            label: "APP",
            value: 1
          },
          {
            label: "PORTAL",
            value: 2
          }
        ]
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
      "Getter propShowEditSpareParts 123456Name---------------->" +JSON.stringify(this.propRowDetails1));
    console.log("category---------------->" +JSON.stringify(this.propRowDetails1.category));
    this.formData.name = this.propRowDetails1.name;
    this.formData.category = this.propRowDetails1.category;
  },
  // computed: {
  //   ...mapGetters("SuperAdminUsers", ["getAllRegionsData"])
  // },
  methods: {
    ...mapActions("serviceRequest", ["EDIT_SERVICE_RESOLUTION_REMARKS"]),
    emitfnshowEditServiceResolutionRemarks() {
      this.$emit("emitfnshowEditServiceResolutionRemarks");
    },
    fnShowSubTaskDetails(rowDetails) {
      this.propShowServiceSubTaskDetails = !this.propShowServiceSubTaskDetails;
      this.propRowDetails = rowDetails;
    },
    fnfinalsubmitServiceResolutionRemarks(formData) {
      this.$v.formData.$touch();
      if (this.$v.formData.$error) {
        this.$q.notify("Please review fields again.");
      } else {
        this.$q.loading.show();
        let param = {
          id: JSON.stringify(this.propRowDetails1.id),
          request: this.formData
        };
        this.EDIT_SERVICE_RESOLUTION_REMARKS(param)
          .then(() => {
            this.$q.loading.hide();
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Successfully Updated!",
              icon: "thumb_up"
            });
            this.emitfnshowEditServiceResolutionRemarks();
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
