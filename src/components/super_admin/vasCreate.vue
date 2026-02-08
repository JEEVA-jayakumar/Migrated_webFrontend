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
              <div class="text-h6 text-weight-regular">Add New VAS</div>
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
                float-label="Enter VAS"
                placeholder="Enter VAS"
                @keyup.enter="submitLeadSourceData(formData)"
              />
            </div>
            <div class="col-md-12">
            <q-input
              v-model="formData.vasCode"
              @blur="$v.formData.vasCode.$touch"
              :error="$v.formData.vasCode.$error"
              class="text-weight-regular text-grey-8"
              color="grey-9"
              float-label="Enter VAS Code"
              placeholder="Enter VAS Code"
              @keyup.enter="submitLeadSourceData(formData)"
              
            />
          </div>
            
  
          </div>
          <div class="row gutter-sm q-py-sm items-center">
            <div class="col-md-12 group" align="right">
              <q-btn
                flat
                align="right"
                class="bg-white text-weight-regular text-grey-8"
                @click="toggleModal()"
              >Cancel</q-btn>
              <q-btn align="right" @click="submitVasData(formData)" color="purple-9">Save</q-btn>
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
    props: ["propShowVasCreate"],
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
        propToggleModal: this.propShowVasCreate,
        formData: {
        //   bank_enable: "False",
        name: "",
        vasCode:"",
        active:1
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
        vasCode:{
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
      // ...mapActions("leadSource", ["ADD_NEW_LEAD_SOURCE"]),
      ...mapActions("vasCreation", ["CREATE_VAS_DETAILS"]),
      toggleModal() {
        this.$emit("emitfnshowVas");
      },
      submitVasData(request) {
        this.$v.formData.$touch();
        if (this.$v.formData.$error) {
        } else {
          this.$q.loading.show({
            delay: 100, // ms
            message: "Please Wait",
            spinnerColor: "purple-9",
            customClass: "shadow-none"
          });
          this.CREATE_VAS_DETAILS(request)
            .then(() => {
              this.$q.loading.hide();
              this.$emit("emitfnshowVas", "refresh");
              this.$q.notify({
                color: "positive",
                position: "bottom",
                message: "Vas successfully created!",
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
  