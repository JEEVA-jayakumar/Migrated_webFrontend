<template>
  <div>
    <q-modal 
       minimized 
       class="customModalOverlay"
        v-model="showCreateRoleToggle"  
        @hide="emitfnCreaterolePermissions(showCreateRoleToggle)" 
        @escape-key="emitfnCreaterolePermissions(showCreateRoleToggle)"  
        :content-css="{padding:'30px',minWidth: '40vw'}"
      >
        <form> 
          <div class="q-px-md">
              <div class="q-pa-sm">
                <div class="column gutter-sm q-py-sm items-center bottom-border">
                  <div class="col-md-8">
                    <div class="q-title text-weight-regular">Create Role/Permissions</div>
                  </div>
                  <div class="col-md-2">
                    <q-btn flat size="md" align="right" class="bg-white text-weight-regular text-grey-8" @click="emitfnCreaterolePermissions(showCreateRoleToggle)">Cancel
                    </q-btn>
                  </div>
                  <div class="col-md-2">
                    <q-btn size="md" align="right" @click="fnCreateRoleSubmit(formData.rolePermissions)" color="purple-9">Save
                    </q-btn>
                  </div>
                </div>
              </div>
            </div>

          <div class="q-px-md">
            <div class="q-pa-sm">
              <div class="column gutter-sm q-py-sm items-center">
                <div class="col-md-8">
                  <q-select
                  filter
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
            </div>  

            <div class="q-pa-sm">
              <div class="column gutter-sm q-py-sm items-center">
                <div class="col-md-8">
                   <q-input v-model.trim="formData.rolePermissions.name" 
                    @blur="$v.formData.rolePermissions.name.$touch"      
                    :error="$v.formData.rolePermissions.name.$error" 
                    class="text-weight-regular text-grey-8" color="grey-9" float-label="Role" placeholder="Role" />
                </div>
              </div>
            </div>  
            
            <div class="q-pa-sm">
              <div class="column gutter-sm q-py-sm items-center">
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
            </div>  
          </div>
        </form>
    </q-modal>
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
} from "vuelidate/lib/validators";
const custom = helpers.regex("custom", /^[a-zA-Z\s]*$/);
import { mapGetters, mapActions } from "vuex";
export default {
  props: [
    "propFilterRoles",
    "propFilterRolesPermissions",
    "propGetAllHierarchiesData",
  ],

  data() {
    return {
      showCreateRoleToggle: this.proprolePermissions,
      formData: {
        rolePermissions: {
          name: "",
          hierarchyId: "",
          roleColor: "",
        },
      },
    };
  },

  validations: {
    formData: {
      rolePermissions: {
        name: {
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

  methods: {
    ...mapActions("SuperAdminUsers", [
      "FEED_NEW_ROLE_WITH_PERMISSIONS",
      "FETCH_ALL_ROLES_PERMISSIONS_DATA",
    ]),

    //Emit functions
    emitfnCreaterolePermissions(showCreateRoleToggle) {
      this.$emit("emitCreaterolePermissions", showCreateRoleToggle);
    },

    //Role creation final submit
    fnCreateRoleSubmit(formData) {
      this.$v.formData.$touch();
      if (this.$v.formData.$error) {
        this.$q.notify("Please review fields again.");
      } else {
        let cookedRole = formData.name.toUpperCase().replace(/ /g, "_");
        this.$q.loading.show({
          delay: 100, // ms
          message: "Please Wait",
          spinnerColor: "purple-9",
          customClass: "shadow-none",
        });

        formData.role = cookedRole;

        this.FEED_NEW_ROLE_WITH_PERMISSIONS(formData)
          .then(response => {
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Successfully created!",
              icon: "thumb_up",
            });
            this.emitfnCreaterolePermissions(this.showCreateRoleToggle);
            this.FETCH_ALL_ROLES_PERMISSIONS_DATA();
            this.$q.loading.hide();
          })
          .catch(error => {
            this.$q.loading.hide();
            this.$q.notify({
              color: "negative",
              position: "bottom",
              message: "Something went wrong",
              icon: "thumb_down",
            });
          });
      }
    },
  },
};
</script>
