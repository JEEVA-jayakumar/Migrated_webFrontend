<template>
  <div>
    <q-modal 
        minimized
        class="customModalOverlay"
        v-model="showEditHierarchyToggle"  
        @hide="emitfnEditHierarchyDetails(showEditHierarchyToggle)" 
        @escape-key="emitfnEditHierarchyDetails(showEditHierarchyToggle)"
        :content-css="{padding:'30px',minWidth: '30vw'}"
      >
        <form> 
            <div class="row q-pa-md bottom-border">
                <div class="col-md-12">
                    <div class="q-title text-weight-regular">Edit Hierarchy</div>
                </div>
            </div>
             <div class="row q-pa-md">
                <div class="col-md-12">
                    <q-input v-model="formData.HierarchyDetails.hierarchy" 
                    @blur="$v.formData.HierarchyDetails.hierarchy.$touch"      
                    :error="$v.formData.HierarchyDetails.hierarchy.$error" 
                    class="text-weight-regular text-grey-8 q-my-sm" color="grey-9" float-label="Hierarchy" placeholder="Hierarchy" />
                </div>
                <div class="col-md-12">
                    <q-input v-model="formData.HierarchyDetails.hierarchyCode" 
                    @blur="$v.formData.HierarchyDetails.hierarchyCode.$touch"      
                    :error="$v.formData.HierarchyDetails.hierarchyCode.$error" 
                    class="text-weight-regular text-grey-8 q-my-sm" color="grey-9" float-label="Hierarchy Code" placeholder="Hierarchy Code" />
                </div>
            </div>
             <div class="row gutter-sm q-pa-md">
                <div class="col-md-12" align="right">
                    <q-btn flat size="md" align="right" class="bg-white q-mr-sm text-weight-regular text-grey-8" @click="emitfnEditHierarchyDetails(showEditHierarchyToggle)">Cancel
                    </q-btn>
                    <q-btn size="md" align="right" @click="fnEditHierarchySubmit(formData.HierarchyDetails)" color="purple-9">Save
                    </q-btn>
                </div>
            </div>
        </form>
    </q-modal>
  </div>
</template>

<script>
import {
  required,
  email,
  minLength,
  maxLength,
  alpha,
  alphaNum,
  numeric,
} from "vuelidate/lib/validators";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["propRowDetails", "propShowEditHierarchy"],

  data() {
    return {
      showEditHierarchyToggle: this.propShowEditHierarchy,
      formData: {
        HierarchyDetails: {
          hierarchy: this.propRowDetails.label,
          hierarchyCode: this.propRowDetails.shortCode,
          hierarchyId: this.propRowDetails.value,
        },
      },
    };
  },

  validations: {
    formData: {
      HierarchyDetails: {
        hierarchy: {
          required,
        },
        hierarchyCode: {
          required,
        },
      },
    },
  },

  methods: {
    ...mapActions("SuperAdminUsers", [
      "FETCH_ALL_HIERARCHIES_DATA",
      "FEED_EXISTING_HIERARCHY_DATA",
    ]),

    //Emit functions
    emitfnEditHierarchyDetails(showEditHierarchyToggle) {
      this.$emit("emitEditHierarchyDetails", showEditHierarchyToggle);
    },

    //Hierarchy creation final submit
    fnEditHierarchySubmit(formData) {
      this.$v.formData.HierarchyDetails.$touch();

      if (this.$v.formData.HierarchyDetails.$error) {
        this.$q.notify("Please review fields again.");
      } else {
        console.log("formData >> ", formData);
        this.$q.loading.show({
          delay: 100, // ms
          message: "Please Wait",
          spinnerColor: "purple-9",
          customClass: "shadow-none",
        });

        this.FEED_EXISTING_HIERARCHY_DATA(formData)
          .then(response => {
            this.FETCH_ALL_HIERARCHIES_DATA();
            this.emitfnEditHierarchyDetails(this.showEditHierarchyToggle);
            this.$q.loading.hide();
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Successfully Updated!",
              icon: "thumb_up",
            });
          })
          .catch(() => {
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
