<template>
  <div>
    <q-modal
      minimized
      class="customModalOverlay"
      v-model="toggleModel"
      @hide="emitfnshowEditRegion()"
      @escape-key="emitfnshowEditRegion()"
      :content-css="{padding:'30px',minWidth: '40vw'}"
    >
      <form>
        <div class="column group">
          <div class="col-md-12">
            <div class="q-title text-weight-regular">Edit POD</div>
          </div>
          <div class="col-md-12">
            <q-input
              v-model="formData.pod"
              :error="$v.formData.pod.$error"
              class="text-weight-regular text-grey-8"
              color="grey-9"
              float-label="Pod Number"
              placeholder="Pod NUmber"
            />
          </div>
          <div class="col-md-12">
            <q-select
              v-model="formData.region"
              color="grey-9"
              :options="inventoryData.regionFilterOptions"
              placeholder="Region"
              float-label="Region"
            />
          </div>
          <div class="col-md-12 group" align="right">
            <q-btn
              flat
              align="right"
              class="bg-white text-weight-regular text-grey-8"
              @click="emitfnshowEditRegion()"
            >Cancel</q-btn>
            <q-btn align="right" @click="submitRegion(formData)" color="purple-9">Save</q-btn>
          </div>
        </div>
      </form>
    </q-modal>
  </div>
</template>

<script>
import { required, maxLength, minLength } from "vuelidate/lib/validators";

import { mapGetters, mapActions } from "vuex";
export default {
  props: ["propShowEditRegion", "propRowDetails"],
  data() {
    return {
      toggleModel: this.propShowEditRegion,
      formData: {
        pod: this.propRowDetails.podNumber,
        region: this.propRowDetails.region.regionAreaName
      },
      inventoryData: {
        regionFilterOptions: []
      }
    };
  },
  validations: {
    formData: {
      pod: {
        required
      },
      region: {
        required
      }
    }
  },
  computed: {
    ...mapGetters("SuperAdminUsers", ["getAllRegionsData"]),
    ...mapGetters("PodList", ["getAllPodList"])
  },
  created() {
    this.getAllRegion();
  },

  methods: {
    ...mapActions("SuperAdminUsers", ["FETCH_ALL_REGIONS_DATA"]),
    ...mapActions("SuperAdminUsers", ["EDIT_POD_REGION"]),
    ...mapActions("PodList", ["FETCH_POD_LIST"]),

    emitfnshowEditRegion() {
      this.$emit("emitfnshowEditRegion");
    },
    //Permission creation final submit
    submitRegion(request) {
      this.$v.formData.$touch();
      if (this.$v.formData.$error) {
        this.$q.notify("Please review fields again.");
      } else {
        let params = {
          pod: request.pod,
          region: request.region
        };
        this.$q.loading.show({
          delay: 100, // ms
          message: "Please Wait",
          spinnerColor: "purple-9",
          customClass: "shadow-none"
        });

        this.EDIT_POD_REGION(params)
          .then(response => {
            this.FETCH_POD_LIST();
            this.$emit("emitfnshowEditRegion");
            this.$q.loading.hide();
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: response.data.message,
              icon: "thumb_up"
            });
          })
          .catch(error => {
            this.$q.loading.hide();
            this.$q.notify({
              color: "amber",
              position: "bottom",
              message: error.body.message == null ? "Please Try Again Later !" : error.body.message,
              icon: "thumb_down"
            });
          });
      }
    },
    getAllRegion() {
      this.FETCH_ALL_REGIONS_DATA()
        .then(() => {
          this.inventoryData.regionFilterOptions = this.getAllRegionsData;
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    }
  }
};
</script>
