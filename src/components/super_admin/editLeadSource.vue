<template>
  <div>
    <q-dialog
      minimized
      v-model="propToggleModal"
      @hide="toggleModal"
      @escape-key="toggleModal"
      class="customModalOverlay"
      :content-css="{padding:'30px',minWidth: '30vw'}"
    >
      <form>
        <div class="row gutter-sm q-py-sm items-center">
          <div class="col-md-12">
            <div class="text-h6 text-weight-regular">Edit Lead Source</div>
          </div>
        </div>
        <div class="row gutter-sm q-py-sm items-center">
          <div class="col-md-12">
            <q-input
              v-model="formData.sourceName"
              @blur="$v.formData.sourceName.$touch"
              :error="$v.formData.sourceName.$error"
              class="text-weight-regular text-grey-8"
              color="grey-9"
              float-label="Lead Source"
              placeholder="Lead Source"
              @keyup.enter="submitLeadSourceData(formData)"
            />
          </div>
          <div class="col-md-12">
            <q-input
              v-model="formData.sourceCode"
              @blur="$v.formData.sourceCode.$touch"
              :error="$v.formData.sourceCode.$error"
              class="text-weight-regular text-grey-8"
              color="grey-9"
              float-label="Enter Source Code"
              placeholder="Enter Source Code"
              @keyup.enter="submitLeadSourceData(formData)"
              
            />
          </div>
          <div class="col-md-12">
            <p class="text-caption">Multi-TID</p>
              <q-radio
                    
                    :error="$v.formData.multiTidEnabled.$error"
                    v-for="(item, index) in multiTidFlagOptions"
                    :key="index"
                    color="grey-9"
                    v-model.trim="formData.multiTidEnabled"
                    :val="item.value"
                    :label="item.label"
                  />

           </div>
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
            <q-btn
              flat
              align="right"
              class="bg-white text-weight-regular text-grey-8"
              @click="toggleModal()"
            >Cancel</q-btn>
            <q-btn align="right" @click="submitLeadSourceData(formData)" color="purple-9">Save</q-btn>
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
  props: ["propShowEditLeadSources", "propRowDetails"],
  data() {
    return {
      multiTidFlagOptions:[
        {
          label: "Yes",
          value: true
        },
        {
          label: "No",
          value: false
        }
      ],
      propToggleModal: this.propShowEditLeadSources,
      formData: {
        id: this.propRowDetails.id,
        sourceCode:this.propRowDetails.sourceCode,
        sourceName: this.propRowDetails.sourceName,
        multiTidEnabled: this.propRowDetails.multiTidEnabled == true ,
        // baseTidMidPrefix: this.propRowDetails.baseTidMidPrefix,
        // lastBaseTid: this.propRowDetails.lastBaseTid == null ? "NA" : this.propRowDetails.lastBaseTid ,
        // lastBaseMid: this.propRowDetails.lastBaseMid == null ? "NA" : this.propRowDetails.lastBaseMid  
      }
    };
  },
  validations: {
    formData: {
      sourceName: {
        required
      },
      sourceCode:{
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
      multiTidEnabled:{
        required
      }
    }
  },
  beforeMount(){
    console.log("beforeMount Datas -------------->",JSON.stringify(this.propRowDetails))
  },

  methods: {
    ...mapActions("leadSource", ["UPDATE_LEAD_SOURCE"]),
    toggleModal() {
      this.$emit("emitfnshowLeadSources");
    },
    refreshListOnClose() {
      this.$emit("emitfnForLeadSourceTableRefresh");
    },
    submitLeadSourceData() {
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
        this.UPDATE_LEAD_SOURCE(this.formData)
          .then(() => {
            this.$q.loading.hide();
            this.$emit("emitfnshowLeadSources", "refresh");
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Lead Source successfully updated!",
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
