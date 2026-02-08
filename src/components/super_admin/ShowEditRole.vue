<template>
  <div>
    <q-dialog
        class="customModalOverlay"
        minimized no-backdrop-dismiss
        v-model="showEditRoleToggle"  
        @hide="emitfnEditrolePermissions(showEditRoleToggle)" 
        @escape-key="emitfnEditrolePermissions(showEditRoleToggle)"  
        :content-css="{padding:'30px',minWidth: '40vw'}"
      >
        <div class="column group q-py-sm bottom-border">
          <div>
            <div class="text-h6 text-weight-regular">Update Role/Permissions</div>
          </div>
        </div>

        <div class="column group q-py-sm ">
          <div class="col-md-8">
            <q-select
            disable
            v-model="formData.rolePermissions.hierarchyId"
            @blur="$v.formData.rolePermissions.hierarchyId.$touch"      
            :error="$v.formData.rolePermissions.hierarchyId.$error" 
            float-label="Hierarchy"
            placeholder="Select Hierarchy"
            class="text-weight-regular text-grey-8" color="grey-9"
            :options="propGetAllHierarchiesData"
              />
          </div>
        </div>
      
        <div class="column group q-py-sm">
          <div class="col-md-8">
            <q-input v-model="formData.rolePermissions.role" 
              @blur="$v.formData.rolePermissions.role.$touch"      
              @keyup.enter="fnSubmitShowAddUser"
              :error="$v.formData.rolePermissions.role.$error" 
              class="text-weight-regular text-grey-8" color="grey-9" float-label="Role" placeholder="Role" />
          </div>
        </div>
      
        <div class="column group q-py-sm">
          <div class="col-md-8">
            <q-color 
              clearable
              v-model="formData.rolePermissions.roleColor"
              @blur="$v.formData.rolePermissions.roleColor.$touch"      
              :error="$v.formData.rolePermissions.roleColor.$error" 
              popover float-label="Choose a role color" color="grey-9"
            />
          </div>
        </div>

        <div class="group" align="right">
          <q-btn flat size="md" align="right" class="bg-white text-weight-regular text-grey-8" @click="emitfnEditrolePermissions(showEditRoleToggle)">Cancel
          </q-btn>
          <q-btn size="md" align="right" @click="fnEditRoleSubmit(formData.rolePermissions)" color="purple-9">Save
          </q-btn>
        </div>
    </q-dialog>
  </div>
</template>

<script>
import {
  helpers,
  required,
  email,
  minLength,
  maxLength,
  alpha,
  alphaNum,
  numeric,
} from "@vuelidate/validators";
const custom = helpers.regex("custom", /^[a-zA-Z\s]*$/);
import { mapGetters, mapActions } from "vuex";
export default {
  props: [
    "propGetAllHierarchiesData",
    "proprolePermissions",
    "propRowDetails",
    "propFilterRolesPermissions",
  ],
  data() {
    return {
      showEditRoleToggle: this.proprolePermissions,
      formData: {
        rolePermissions: {
          roleId: this.propRowDetails.id,
          role: this.propRowDetails.role,
          hierarchyId: this.propRowDetails.hierarchy.id,
          roleColor: this.propRowDetails.roleColor,
        },
      },
    };
  },

  validations: {
    formData: {
      rolePermissions: {
        role: {
          custom,
          required,
          minLength: minLength(2),
        },
        hierarchyId: {
          required,
        },
        roleColor: {
          required,
        },
      },
    },
  },
  created() {},

  methods: {
    ...mapActions("SuperAdminUsers", [
      "FEED_ROLE_ORIGINAL_DATA",
      "FETCH_ALL_ROLES_PERMISSIONS_DATA",
    ]),

    //Emit functions
    emitfnEditrolePermissions(showEditRoleToggle) {
      this.$emit("emitfnEditrolePermissions", showEditRoleToggle);
    },

    //Role creation final submit
    fnEditRoleSubmit(formData) {
      this.$v.formData.$touch();

      if (this.$v.formData.$error) {
        this.$q.notify("Please review fields again.");
      } else {
        this.$q.loading.show({
          delay: 100, // ms
          message: "Please Wait",
          spinnerColor: "purple-9",
          customClass: "shadow-none",
        });
        this.FEED_ROLE_ORIGINAL_DATA(formData)
          .then(response => {
            this.FETCH_ALL_ROLES_PERMISSIONS_DATA();
            this.$q.loading.hide();
            this.emitfnEditrolePermissions(this.showEditRoleToggle);
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Successfully updated!",
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
