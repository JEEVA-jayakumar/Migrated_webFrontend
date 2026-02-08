<template>
  <div>
    <q-dialog minimized v-model="propToggleModal" @hide="toggleModal" @escape-key="toggleModal"
      class="customModalOverlay" :content-css="{ padding: '30px', minWidth: '30vw' }">
      <form>
        <div class="row gutter-sm q-py-sm items-center">
          <div class="col-md-12">
            <div class="text-h6 text-weight-regular">Edit Mars Instance</div>
          </div>
        </div>
        <div class="row gutter-sm q-py-sm items-center">
          <div class="col-md-12">
            <q-input v-model="formData.institutionName" @blur="$v.formData.institutionName.$touch"
              :error="$v.formData.institutionName.$error" class="text-weight-regular text-grey-8" color="grey-9"
              float-label="Institution Name" placeholder="Institution Name"
              @keyup.enter="submitLeadSourceData(formData)" />
          </div>
          <div class="col-md-12">
            <q-input v-model="formData.institutionRRCode" @blur="$v.formData.institutionRRCode.$touch"
              :error="$v.formData.institutionRRCode.$error" class="text-weight-regular text-grey-8" color="grey-9"
              float-label="Institution RR Code" placeholder="Institution RR Code"
              @keyup.enter="submitLeadSourceData(formData)" />
          </div>
          <div class="col-md-12">
            <q-input disable v-model="formData.institutionCode" @blur="$v.formData.institutionCode.$touch"
              :error="$v.formData.institutionCode.$error" class="text-weight-regular text-grey-8" color="grey-9"
              float-label="Institution  Code" placeholder="Institution  Code"
              @keyup.enter="submitLeadSourceData(formData)" />
          </div>
          <!-- <div class="col-md-12">
              <p class="text-caption">Multi-TID</p>
                <q-radio
                       disable
                      :error="$v.formData.multiTidEnabled.$error"
                      v-for="(item, index) in multiTidFlagOptions"
                      :key="index"
                      color="grey-9"
                      v-model.trim="formData.multiTidEnabled"
                      :val="item.value"
                      :label="item.label"
                    />
  
             </div> -->
          <!-- <div class="col-md-12">
              <q-input
                disable
                v-model="formData.baseTidMidPrefix"
                @blur="$v.formData.baseTidMidPrefix.$touch"
                :error="$v.formData.baseTidMidPrefix.$error"
                class="text-weight-regular text-grey-8"
                color="grey-9"
                float-label="Tid/Mid Prefix"
                placeholder="Tid/Mid Prefix"
                @keyup.enter="submitLeadSourceData(formData)"
              />
            </div> -->
          <!-- <div class="col-md-12">
              <q-input
                disable
                v-model="formData.lastBaseTid"
                @blur="$v.formData.lastBaseTid.$touch"
                :error="$v.formData.lastBaseTid.$error"
                class="text-weight-regular text-grey-8"
                color="grey-9"
                float-label="last Base Tid"
                placeholder="last Base Tid"
                @keyup.enter="submitLeadSourceData(formData)"
              />
            </div>
            <div class="col-md-12">
              <q-input
                disable
                v-model="formData.lastBaseMid"
                @blur="$v.formData.lastBaseMid.$touch"
                :error="$v.formData.lastBaseMid.$error"
                class="text-weight-regular text-grey-8"
                color="grey-9"
                float-label="last Base Mid"
                placeholder="last Base Mid"
                @keyup.enter="submitLeadSourceData(formData)"
              />
            </div> -->
        </div>
        <div class="row gutter-sm q-py-sm items-center">
          <div class="col-md-12 group" align="right">
            <q-btn flat align="right" class="bg-white text-weight-regular text-grey-8" @click="toggleModal()">Cancel
            </q-btn>
            <q-btn align="right" @click="submitMarsInstanceData(formData)" color="purple-9">Save</q-btn>
          </div>
        </div>
      </form>
    </q-dialog>
  </div>
</template>
  
<script>
import { integer, required } from "@vuelidate/validators";
import { mapGetters, mapActions } from "vuex";
export default {
  // name: 'ComponentName',
  props: ["propShowEditMarsInstance", "propRowDetails"],
  data() {
    return {
      multiTidFlagOptions: [
        {
          label: "Yes",
          value: true
        },
        {
          label: "No",
          value: false
        }
      ],
      propToggleModal: this.propShowEditMarsInstance,
      formData: {
        institutionName: this.propRowDetails.institutionName,
        institutionRRCode: this.propRowDetails.institutionRRCode,
        institutionCode: this.propRowDetails.institutionCode,
        id: this.propRowDetails.id,
        institutionActive: 1,
        // baseTidMidPrefix: this.propRowDetails.baseTidMidPrefix,
        // lastBaseTid: this.propRowDetails.lastBaseTid == null ? "NA" : this.propRowDetails.lastBaseTid ,
        // lastBaseMid: this.propRowDetails.lastBaseMid == null ? "NA" : this.propRowDetails.lastBaseMid  
      }
    };
  },
  validations: {
    formData: {
      institutionName: {
        required
      },
      institutionCode: {
        required
      },
      institutionRRCode: {
        required
      },
      // baseTidMidPrefix: {
      //   required
      // },
      // lastBaseTid: {
      //   required
      // },
      // lastBaseMid:{
      //   required
      // },
      // multiTidEnabled:{
      //   required
      // }
    }
  },
  beforeMount() {
    console.log("beforeMount Datas -------------->", JSON.stringify(this.propRowDetails))
  },

  methods: {
    ...mapActions("leadSource", ["UPDATE_LEAD_SOURCE"]),
    ...mapActions("MarsInstance", ["UPDATE_INSTANCE"]),
    toggleModal() {
      this.$emit("emitfnshowMarsInstance");
    },
    refreshListOnClose() {
      this.$emit("emitfnForLeadSourceTableRefresh");
    },
    submitMarsInstanceData() {
      this.$v.formData.$touch();
      if (this.$v.formData.$error) {
      } else {
        this.$q.loading.show({
          delay: 100, // ms
          message: "Please Wait",
          spinnerColor: "purple-9",
          customClass: "shadow-none"
        });
        // delete this.formData.lastBaseTid;
        // delete this.formData.lastBaseMid;
        this.UPDATE_INSTANCE(this.formData)
          .then(() => {
            this.$q.loading.hide();
            this.$emit("emitfnshowMarsInstance", "refresh");
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Instance successfully updated!",
              icon: "thumb_up"
            });
          })
          .catch(() => {
            this.$q.loading.hide();
            this.$q.notify({
              color: "negative",
              position: "bottom",
              message: error.body.message == null ? "Please Try Again Later !" : error.body.message,
              icon: "thumb_down"
            });
          });
      }
    }
  }
};
</script>
  
<style>

</style>
  