<template>
    <div>
        <q-modal 
        class="customModalOverlay"
        minimized
        v-model="toggleModel"  
        no-esc-dismiss
        no-backdrop-dismiss
        :content-css="{padding:'30px',minWidth: '30vw'}"
        >
          <div class="column group">
            <div class="col-md-12 col-sm-12 col-xs-12 q-py-sm bottom-border">
              <span class="q-title">User Mapping Information</span>
            </div>
            <div class="col-md-12 col-sm-12 col-xs-12">
              <q-select
              color="grey-9"
              float-label="Choose a region"
              v-model="userMapping.region.id"
              :error="$v.userMapping.region.id.$error"
              @blur="$v.userMapping.region.id.$touch"
              :options="propGetAllRegionsData"
              />
            </div>
            <div class="col-md-12 col-sm-12 col-xs-12">
              <q-select
              color="grey-9"
              @input="fnPopulateRolesByHeirarchy(userMapping.hierarchy.id)"
              float-label="Choose a hierarchy"
              v-model="userMapping.hierarchy.id"
              :error="$v.userMapping.hierarchy.id.$error"
              @blur="$v.userMapping.hierarchy.id.$touch"
              :options="propGetAllHierarchiesData"
              />
            </div>
            <div class="col-md-12 col-sm-12 col-xs-12">
              <q-select
              color="grey-9"
              :readonly=disableRolesSelection
              :disabled=disableRolesSelection
              :class="[disableRolesSelection?'no-pointer-events':'']"
              @input="fnPopulateUsersByRole"
              float-label="Choose a role"
              v-model="userMapping.role.id"
              :error="$v.userMapping.role.id.$error"
              @blur="$v.userMapping.role.id.$touch"
              :options="filterRoles"
              />
            </div>
            <div class="col-md-12 col-sm-12 col-xs-12">
              <q-select
              color="grey-9"
              :readonly=disablePreceederSelection
              :disabled=disablePreceederSelection
              :class="[disablePreceederSelection?'no-pointer-events':'']"
              float-label="Choose a predecessor"
              v-model="userMapping.predecessor.id"
              :error="$v.userMapping.predecessor.id.$error"
              @blur="$v.userMapping.predecessor.id.$touch"
              :options="filterUsers"
              />
            </div>
            <div class="col-md-12 col-sm-12 col-xs-12 group" align="right">
              <q-btn flat size="md" align="right" class="bg-white text-weight-regular text-grey-8" @click="emitfnToggleModelCancel">Cancel</q-btn>
              <q-btn size="md" align="right" color="purple-9" @click="emitfnToggleModel(userMapping)">Done</q-btn>
            </div>
          </div>

        <!-- <pre>{{getAllUsersForUserCreation}}</pre> -->

        </q-modal>
    </div>

</template>
<script>
import { mapGetters, mapActions } from "vuex";

import { required, requiredIf } from "vuelidate/lib/validators";
export default {
  props: [
    "propDynamicHierarchyRoleRegion",
    "propFilterRoles",
    "propGetAllRegionsData",
    "propGetAllHierarchiesData",
  ],
  data() {
    return {
      toggleModel: this.propDynamicHierarchyRoleRegion,
      filterRoles: [],
      filterUsers: [],
      disableRolesSelection: true,
      disablePreceederSelection: true,
      userMapping: {
        hierarchy: {
          id: "",
        },
        role: {
          id: "",
        },
        region: {
          id: "",
        },
        predecessor: {
          id: "",
        },
      },
    };
  },

  validations: {
    userMapping: {
      hierarchy: {
        id: { required },
      },
      role: {
        id: { required },
      },
      region: {
        id: { required },
      },
      predecessor: {
        id: { required },
      },
    },
  },

  computed: {
    ...mapGetters("SuperAdminUsers", [
      "getAllRolesForUserCreation",
      "getAllUsersForUserCreation",
    ]),
  },

  methods: {
    ...mapActions("SuperAdminUsers", [
      "FETCH_ROLES_BASED_ON_HEIRARCHY_ID_FOR_USER_CREATION",
      "FETCH_ALL_USERS_BY_ROLE_FOR_USER_CREATION_DATA",
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
      this.$emit("emitfnToggleModelCancel");
    },

    fnPopulateRolesByHeirarchy(hierarchyId) {
      this.disablePreceederSelection = true;
      this.disableRolesSelection = true;
      this.FETCH_ROLES_BASED_ON_HEIRARCHY_ID_FOR_USER_CREATION(hierarchyId)
        .then(response => {
          this.filterRoles = _.map(this.getAllRolesForUserCreation, function(
            o
          ) {
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
      this.FETCH_ALL_USERS_BY_ROLE_FOR_USER_CREATION_DATA(this.userMapping)
        .then(response => {
          let cookedUserArr = [];
          this.getAllUsersForUserCreation.map(function(value, index) {
            cookedUserArr.push({
              label: value.user.name,
              value: value.user.id,
            });
          });
          if (cookedUserArr.length > 0) {
            this.filterUsers = cookedUserArr;
            this.disablePreceederSelection = false;
          } else {
            this.disablePreceederSelection = true;
            this.$q.notify({
              color: "primary",
              position: "bottom",
              message: "Invalid selection! Predecessor is mandatory",
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

