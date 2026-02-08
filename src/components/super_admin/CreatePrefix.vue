<template>
    <div>
      <q-dialog
        minimized
        v-model="propShowCreatePrefix"
        @hide="toggleModal"
        @escape-key="toggleModal"
        class="customModalOverlay"
        :content-css="{padding:'30px',minWidth: '30vw'}"
      >
        <form>
          <div class="row gutter-sm q-py-sm items-center">
            <div class="col-md-12">
              <div class="text-h6 text-weight-regular">Add Prefix</div>
            </div>
          </div>
          <div class="row gutter-sm q-py-sm items-center">
            <div class="col-md-12">
              <q-input
                v-model="formData.name"
                @blur="$v.formData.name.$touch"
                :error="$v.formData.name.$error"
                class="text-weight-regular text-grey-8"
                color="grey-9"
                float-label="Enter Prefix"
                placeholder="Enter Prefix"
                @keyup.enter="submitLeadSourceData(formData)"
              />
            </div>
            <!-- <div class="col-md-12">
            <q-input
              v-model="formData.hostCode"
              @blur="$v.formData.hostCode.$touch"
              :error="$v.formData.hostCode.$error"
              class="text-weight-regular text-grey-8"
              color="grey-9"
              float-label="Enter VAS Code"
              placeholder="Enter VAS Code"
              @keyup.enter="submitLeadSourceData(formData)"
              
            />
          </div> -->
            <!-- <div class="col-md-12">
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
  
             </div> -->
             <!-- <div class="col-md-12">
              <q-input
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
  
          </div>
          <div class="row gutter-sm q-py-sm items-center">
            <div class="col-md-12 group" align="right">
              <q-btn
                flat
                align="right"
                class="bg-white text-weight-regular text-grey-8"
                @click="toggleModal()"
              >Cancel</q-btn>
              <q-btn align="right" @click="submitHostData(formData)" color="purple-9">Save</q-btn>
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
    props: ["propShowCreatePrefix"],
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
        propShowCreatePrefix: this.propShowCreatePrefix,
        formData: {
        //   bank_enable: "False",
        name: "",
        hostCode:"",
        //   multiTidEnabled: false,
        //   baseTidMidPrefix:"",
        }
      };
    },
    validations: {
      formData: {
        name: {
          required
        },
        hostCode:{
          required
        }
        // multiTidEnabled:{
        //   required
        // },
        // baseTidMidPrefix:{
        //   required
        // },
      }
    },
  
    methods: {
      ...mapActions("leadSource", ["ADD_NEW_LEAD_SOURCE"]),
      ...mapActions("Host", ["ADD_NEW_HOST"]),
      toggleModal() {
        this.$emit("emitfnshowPrefix");
      },
      submitHostData() {
        this.$v.formData.$touch();
        if (this.$v.formData.$error) {
        } else {
          this.$q.loading.show({
            delay: 100, // ms
            message: "Please Wait",
            spinnerColor: "purple-9",
            customClass: "shadow-none"
          });
          this.ADD_NEW_HOST(this.formData)
            .then(() => {
              this.$q.loading.hide();
              this.$emit("emitfnshowHost", "refresh");
              this.$q.notify({
                color: "positive",
                position: "bottom",
                message: "Host successfully created!",
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
  