<template>
  <div>
    <q-dialog
      minimized
      class="customModalOverlay"
      v-model="showCreateHierarchyToggle"
      @hide="emitfnCreateHierarchyDetails(showCreateHierarchyToggle)"
      @escape-key="emitfnCreateHierarchyDetails(showCreateHierarchyToggle)"
      :content-css="{padding:'30px',minWidth: '30vw'}"
    >
      <form>
        <div class="row q-pa-md bottom-border">
          <div class="col-md-12">
            <div class="text-h6 text-weight-regular">Create Hierarchy</div>
          </div>
        </div>
        <div class="row q-pa-md">
          <div class="col-md-12">
            <q-input
              v-model="formData.HierarchyDetails.hierarchy"
              @blur="$v.formData.HierarchyDetails.hierarchy.$touch"
              :error="$v.formData.HierarchyDetails.hierarchy.$error"
              class="text-weight-regular text-grey-8 q-my-sm"
              color="grey-9"
              float-label="Hierarchy"
              placeholder="Hierarchy"
            />
          </div>
          <div class="col-md-12">
            <q-input
              v-model="formData.HierarchyDetails.hierarchyCode"
              @blur="$v.formData.HierarchyDetails.hierarchyCode.$touch"
              :error="$v.formData.HierarchyDetails.hierarchyCode.$error"
              class="text-weight-regular text-grey-8 q-my-sm"
              color="grey-9"
              float-label="Hierarchy Code"
              placeholder="Hierarchy Code"
            />
          </div>
        </div>
        <div class="row gutter-sm q-pa-md">
          <div class="col-md-12" align="right">
            <q-btn
              flat
              size="md"
              align="right"
              class="bg-white q-mr-sm text-weight-regular text-grey-8"
              @click="emitfnCreateHierarchyDetails(showCreateHierarchyToggle)"
            >Cancel</q-btn>
            <q-btn
              size="md"
              align="right"
              @click="fnCreateHierarchySubmit(formData.HierarchyDetails)"
              color="purple-9"
            >Save</q-btn>
          </div>
        </div>
      </form>
    </q-dialog>
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
  numeric
} from "@vuelidate/validators";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["propGetAllHierarchiesData", "propShowCreateHierarchy"],

  data() {
    return {
      showCreateHierarchyToggle: this.propShowCreateHierarchy,
      formData: {
        HierarchyDetails: {
          hierarchy: "",
          hierarchyCode: ""
        }
      }
    };
  },

  validations: {
    formData: {
      HierarchyDetails: {
        hierarchy: {
          required
        },
        hierarchyCode: {
          required
        }
      }
    }
  },

  methods: {
    ...mapActions("SuperAdminUsers", [
      "FETCH_ALL_HIERARCHIES_DATA",
      "FEED_NEW_HIERARCHY_DATA"
    ]),

    //Emit functions
    emitfnCreateHierarchyDetails(showCreateHierarchyToggle) {
      this.$emit("emitCreateHierarchyDetails", showCreateHierarchyToggle);
    },

    //Hierarchy creation final submit
    fnCreateHierarchySubmit(formData) {
      this.$v.formData.HierarchyDetails.$touch();

      if (this.$v.formData.HierarchyDetails.$error) {
        this.$q.notify("Please review fields again.");
      } else {
        console.log("formData >> ", formData);
        this.$q.loading.show({
          delay: 100, // ms
          message: "Please Wait",
          spinnerColor: "purple-9",
          customClass: "shadow-none"
        });

        this.FEED_NEW_HIERARCHY_DATA(formData)
          .then(response => {
            this.FETCH_ALL_HIERARCHIES_DATA();
            this.emitfnCreateHierarchyDetails(this.showCreateHierarchyToggle);
            this.$q.loading.hide();
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Successfully created!",
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
