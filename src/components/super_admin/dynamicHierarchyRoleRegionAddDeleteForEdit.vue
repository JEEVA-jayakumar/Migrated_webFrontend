<template>
    <div>
      <q-dialog
        class="customModalOverlay"
        minimized
        v-model="toggleModel"  
        no-esc-dismiss
        no-backdrop-dismiss
        :content-css="{padding:'30px',maxWidth: '30vw'}"
      >       
        <div class="row group">
          <div class="col-md-12 col-sm-12 col-xs-12 q-py-sm bottom-border">
              <span class="text-h6">User Mapping Information</span>
          </div>
          <pre>{{userMapping}}</pre>
            <div class="col-md-12 col-sm-12 col-xs-12">
              <q-select
                float-label="Choose a region"
                v-model="userMapping.regionId"
                :error="$v.userMapping.regionId.$error"
                :options="propGetAllRegionsData"
              />
          </div>
          <div class="col-md-12 col-sm-12 col-xs-12">
              <q-select
                @input="fnPopulateRolesByHeirarchy(userMapping.hierarchy)"
                float-label="Choose a hierarchy"
                v-model="userMapping.hierarchy"
                :error="$v.userMapping.hierarchy.$error"
                :options="propGetAllHierarchiesData"
              />
          </div>
          <div class="col-md-12 col-sm-12 col-xs-12">
              <q-select
                :readonly=disableRolesSelection
                :disabled=disableRolesSelection
                :class="[disableRolesSelection?'no-pointer-events':'']"
                @input="fnPopulateUsersByRole"
                float-label="Choose a role"
                v-model="userMapping.roleId"
                :error="$v.userMapping.roleId.$error"
                :options="filterRoles"
              />
          </div>
          <div class="col-md-12 col-sm-12 col-xs-12">
              <q-select
                :readonly=disablePreceederSelection
                :disabled=disablePreceederSelection
                :class="[disablePreceederSelection?'no-pointer-events':'']"
                float-label="Choose a predecessor"
                v-model="userMapping.predecessorId"
                :error="$v.userMapping.predecessorId.$error"
                :options="filterUsers"
              />
          </div>
          <div class="col-md-12 col-sm-12 col-xs-12" align="right">
            <q-btn flat size="md" align="right" class="bg-white text-weight-regular text-grey-8" @click="emitfnToggleModelCancel()"> Cancel </q-btn>
            <q-btn size="md" align="right" color="purple-9" @click="emitfnToggleModel(userMapping)"> Done </q-btn>
          </div>
        </div>
      </q-dialog>
    </div>

</template>
<script>
import { mapGetters, mapActions } from "vuex";

import { required, requiredIf } from "@vuelidate/validators";
export default {
  props: [
    "propDynamicHierarchyRoleRegion",
    "propFilterRoles",
    "propGetAllRegionsData",
    "propGetAllHierarchiesData",
    "propDetailsForEdit",
  ],
  data() {
    return {
      dynamicHierarchyRoleRegion: 1,
      toggleModel: this.propDynamicHierarchyRoleRegion,
      filterRoles: [],
      filterUsers: [],
      disableRolesSelection: true,
      disablePreceederSelection: true,
      userMapping: {
        index: this.propDetailsForEdit.index,
        hierarchy: this.propDetailsForEdit.hierarchy,
        roleId: this.propDetailsForEdit.roleId,
        regionId: this.propDetailsForEdit.regionId,
        predecessorId: this.propDetailsForEdit.predecessorId,
      },
    };
  },

  created() {
    //Start >> Modifying user mapping information in array
    this.fnPopulateRolesByHeirarchy();
    //End >> Modifying user mapping information in array

    //Start >> Modifying user mapping information in array
    this.fnPopulateUsersByRole();
    //End >> Modifying user mapping information in array
  },

  validations: {
    userMapping: {
      hierarchy: {
        required,
      },
      roleId: {
        required,
      },
      regionId: {
        required,
      },
      predecessorId: {
        required: requiredIf(function(filterUsers) {
          return filterUsers.length > 0;
        }),
      },
    },
  },

  computed: {
    ...mapGetters("SuperAdminUsers", ["getAllRoles", "getAllUsers"]),
  },

  methods: {
    ...mapActions("SuperAdminUsers", [
      "FETCH_ROLES_BASED_ON_HEIRARCHY_ID",
      "FETCH_ALL_USERS_BY_ROLE_DATA",
    ]),
    //Emit functions
    emitfnToggleModel(userMapping) {
      this.$v.userMapping.$touch();
      if (this.$v.userMapping.$error) {
        this.$q.notify("Please review fields again.");
      } else {
        this.$emit("emitfnToggleModelWithParams", userMapping);
      }
    },
    emitfnToggleModelCancel() {
      this.$emit("emitfnToggleModelCancelEdit");
    },

    fnPopulateRolesByHeirarchy() {
      let hierarchyId = this.userMapping.hierarchy;
      this.disablePreceederSelection = true;
      this.disableRolesSelection = true;
      this.FETCH_ROLES_BASED_ON_HEIRARCHY_ID(hierarchyId)
        .then(response => {
          this.filterRoles = _.map(this.getAllRoles, function(o) {
            if (o.hierarchy.id == hierarchyId) {
              let rolesArr = {
                label: o.role,
                value: o.id,
              };
              return rolesArr;
            }
          });
          if (this.filterRoles.length > 0) {
            this.disableRolesSelection = false;
          } else {
            this.filterRoles = [];
            this.userMapping.roleId = null;
            this.userMapping.predecessorId = null;
            this.disableRolesSelection = true;
          }
          this.$q.loading.hide();
        })
        .catch(error => {
          this.$q.loading.hide();
        });
    },

    fnPopulateUsersByRole() {
      this.disablePreceederSelection = true;
      this.FETCH_ALL_USERS_BY_ROLE_DATA(this.userMapping.roleId)
        .then(response => {
          let cookedUserArr = [];
          this.getAllUsers.map(function(value, index) {
            cookedUserArr.push({ label: value.name, value: value.id });
          });
          if (cookedUserArr.length > 0) {
            this.filterUsers = cookedUserArr;
            this.disablePreceederSelection = false;
          } else {
            this.userMapping.predecessorId = null;
            this.filterUsers = [];
            this.disablePreceederSelection = true;
            this.$q.notify({
              color: "primary",
              position: "bottom",
              message: "You can continue without predecessor selection",
              icon: "info",
            });
          }
          this.$q.loading.hide();
        })
        .catch(error => {
          this.$q.loading.hide();
        });
    },
  },
};
</script>

