<template>
  <div>
    <q-dialog minimized v-model="propToggleModal" @hide="toggleModal" @escape-key="toggleModal"
      class="customModalOverlay" :content-css="{ padding: '30px', minWidth: '30vw' }">
      <form>
        <div class="row gutter-sm q-py-sm items-center">
          <div class="col-md-12">
            <div class="text-h6 text-weight-regular">Edit Host</div>
          </div>
        </div>
        <div class="row gutter-sm q-py-sm items-center">
          <div class="col-md-12">
            <q-input v-model="formData.name" @blur="$v.formData.name.$touch" :error="$v.formData.name.$error"
              class="text-weight-regular text-grey-8" color="grey-9" float-label="Host Name" placeholder="Host Name"
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
          <div class="col-md-12">
            <q-input  v-model="formData.hostRRCode" @blur="$v.formData.hostRRCode.$touch"
              :error="$v.formData.hostRRCode.$error" class="text-weight-regular text-grey-8" color="grey-9"
              float-label="Host Code" placeholder="Host Code" @keyup.enter="submitLeadSourceData(formData)" />
          </div>
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
            </div> -->
          <!-- <div class="col-md-12">
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
            <q-btn align="right" @click="submitUpdatedHost(formData)" color="purple-9">Save</q-btn>
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
  props: ["propShowEditHost", "propRowDetails"],
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
      propToggleModal: this.propShowEditHost,
      formData: {
        name: this.propRowDetails.name,
        hostRRCode: this.propRowDetails.hostRRCode,
        id: this.propRowDetails.id,
        active: 1,
      },
      // formData: {
      //   id: this.propRowDetails.id,

      //   multiTidEnabled: this.propRowDetails.multiTidEnabled == true ,
      //   baseTidMidPrefix: this.propRowDetails.baseTidMidPrefix,
      //   lastBaseTid: this.propRowDetails.lastBaseTid == null ? "NA" : this.propRowDetails.lastBaseTid ,
      //   lastBaseMid: this.propRowDetails.lastBaseMid == null ? "NA" : this.propRowDetails.lastBaseMid  
      // }
    };
  },
  validations: {
    formData: {
      name: {
        required
      },
      hostRRCode: {
        required
      },
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
    ...mapActions("Host", ["UPDATE_HOST"]),
    toggleModal() {
      this.$emit("emitfnshowHost");
    },
    refreshListOnClose() {
      this.$emit("emitfnshowHost");
    },
    submitUpdatedHost() {
      // let param = {
      //   // this.formData
      //   name: this.formData.name,
      //   hostRRCode: this.formData.hostRRCode,
      //   active: 1,
      // };
      this.$v.formData.$touch();
      if (this.$v.formData.$error) {
      } else {
        this.$q.loading.show({
          delay: 100, // ms
          message: "Please Wait",
          spinnerColor: "purple-9",
          customClass: "shadow-none"
        });
        this.UPDATE_HOST(this.formData)
          .then(() => {
            this.$q.loading.hide();
            //   this.toggleModal();
            this.$emit("emitfnshowHost", "refresh");
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Host successfully updated!",
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
  