<template>
  <div>
     <q-modal 
        position="right"
        class="customModalOverlay"
        maximized
        v-model="showEditUser"  
        @hide="emitfnShowEditUser(showEditUser)" 
        @escape-key="emitfnShowEditUser(showEditUser)"  
        :content-css="{paddingTop:'50px',paddingBottom:'50px',maxWidth: '50vw',minHeight:'100vh'}"
        >
          <form>  
            <div class="q-px-md">
             <div class="q-pa-sm">
                <div class="row gutter-sm q-py-sm items-center bottom-border">
                  <div class="col-md-8">
                    <div class="q-title text-weight-regular">Edit User</div>
                  </div>
                  <div class="col-md-2">
                    <q-btn flat size="md" align="right" class="bg-white text-weight-regular text-grey-8" @click="emitfnShowEditUser(showEditUser)">Cancel
                    </q-btn>
                  </div>
                  <div class="col-md-2">
                    <q-btn size="md" align="right" type="button" color="purple-9" @click="fnSubmitShowAddUser(showEditUser)">Save
                    </q-btn>
                  </div>
                </div>
              </div>
            </div>

            <div class="q-px-md">
              <!-- <div class="q-pa-md">
                <div class="row gutter-sm q-py-sm items-center bottom-border">
                  <div v-for="radioSale in propGetAllHierarchiesData" :key="radioSale.id">
                    <q-radio v-model="formData.addUserDetails.hierarchy.id"
                    class="no-pointer-events"  input="fnChangeRoleBasedOnHeirarchy(radioSale.value)" :val="radioSale.value" color="purple-9">
                      <q-chip color="blue-grey-2" class="text-weight-regular text-grey-8">
                        {{radioSale.label}}
                      </q-chip>
                    </q-radio>
                  </div>
                </div>
              </div>  -->

              <div class="q-pa-md">
                <div class="row gutter-sm q-py-sm">
                  <div class="col-md-12">
                    <div class="q-title text-weight-regular">User Details</div>
                  </div>
                  <div class="col-md-6">
                    <q-input v-model="formData.addUserDetails.name" 
                     @blur="$v.formData.addUserDetails.name.$touch"      
                    @keyup.enter="fnSubmitShowAddUser"
                    :error="$v.formData.addUserDetails.name.$error" 
                    class="text-weight-regular text-grey-8" color="grey-9" float-label="*Username" placeholder="Username" />
                  </div>

                  <div class="col-md-6">
                    <q-input v-model="formData.addUserDetails.employeeID" 
                     @blur="$v.formData.addUserDetails.employeeID.$touch"      
                    @keyup.enter="fnSubmitShowAddUser"
                    :error="$v.formData.addUserDetails.employeeID.$error" 
                    class="text-weight-regular text-grey-8" color="grey-9" float-label="*Employee ID" placeholder="Employee ID" />
                  </div>

                  <div class="col-md-6">
                    <q-input v-model="formData.addUserDetails.email" class="text-weight-regular text-grey-8" color="grey-9" 
                    @blur="$v.formData.addUserDetails.email.$touch"      
                    @keyup.enter="fnSubmitShowAddUser"
                    :error="$v.formData.addUserDetails.email.$error" 
                    float-label="*Email" placeholder="Email" />
                  </div>

                  <div class="col-md-6">
                    <q-input v-model="formData.addUserDetails.contactNumber" 
                      @blur="$v.formData.addUserDetails.contactNumber.$touch"      
                    @keyup.enter="fnSubmitShowAddUser"
                    :error="$v.formData.addUserDetails.contactNumber.$error" 
                    class="text-weight-regular text-grey-8" color="grey-9" float-label="*Contact Number" placeholder="Contact Number" />
                  </div>

                  <div class="col-md-6">
                    <q-input v-model="formData.addUserDetails.alternateContactNumber"
                     @blur="$v.formData.addUserDetails.alternateContactNumber.$touch"      
                    @keyup.enter="fnSubmitShowAddUser"
                    :error="$v.formData.addUserDetails.alternateContactNumber.$error" 
                     class="text-weight-regular text-grey-8" color="grey-9" float-label="Alt Contact Number" placeholder="Alt Contact Number" />
                  </div>

                  <div class="col-md-6">
                    <q-input v-model="formData.addUserDetails.userAddress"
                     @blur="$v.formData.addUserDetails.userAddress.$touch"      
                    @keyup.enter="fnSubmitShowAddUser"
                    :error="$v.formData.addUserDetails.userAddress.$error" 
                     class="text-weight-regular text-grey-8" color="grey-9" float-label="*Address" placeholder="Address" />
                  </div>

                  <div class="col-md-6">
                    <q-input v-model="formData.addUserDetails.city" 
                     @blur="$v.formData.addUserDetails.city.$touch"      
                    @keyup.enter="fnSubmitShowAddUser"
                    :error="$v.formData.addUserDetails.city.$error" 
                    class="text-weight-regular text-grey-8" color="grey-9" float-label="*City" placeholder="City" />
                  </div>

                  <div class="col-md-6">
                    <q-select
                      v-model="formData.addUserDetails.state.id"
                      float-label="*State"
                      radio
                      class="text-weight-regular text-grey-8" color="grey-9"
                      :options="propGetAllStatesData"
                    />
                  </div>

                </div>
              </div>

              <div class="q-pa-md">
                <div class="row gutter-sm q-py-md items-center">
                  <div class="col-md-12">
                    <div class="q-title text-weight-regular">Role*</div>
                  </div>
                  <div v-for="propFilterRole in propFilterRoles" :key="propFilterRole.value">
                      <q-checkbox 
                      v-model="formData.addUserDetails.tempRoles" 
                      @change="$v.formData.formData.addUserDetails.tempRoles.$touch()"
                      :error="$v.formData.addUserDetails.tempRoles.$error" 
                      :val="propFilterRole.label" 
                      color="purple-9">
                      <q-chip color="blue-grey-2" class="text-weight-regular text-grey-8">
                        {{propFilterRole.label}}
                      </q-chip>
                    </q-checkbox>
                  </div>  
                  <div class="col-md-12 text-red text-weight-medium q-caption" 
                  v-if="!$v.formData.addUserDetails.tempRoles.required">*Role is mandatory</div>
                </div>
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
  numeric
} from "vuelidate/lib/validators";
import { mapGetters, mapActions } from "vuex";
export default {
  props: [
    "propShowEditUser",
    "propFilterRoles",
    "propGetAllHierarchiesData",
    "propGetAllStatesData",
    "propExistingUserItems"
  ],

  data() {
    return {
      showEditUser: this.propShowEditUser,
      formData: {
        addUserDetails: {
          userId: this.propExistingUserItems.id,
          // hierarchy: {
          //   id: this.propExistingUserItems.hierarchy.id
          // },
          profilePicture: "uploads/c7818f74-9652-42f9-a902-9da6a692cdf3.png",
          tempRoles: [],
          roles: [],
          name: this.propExistingUserItems.name,
          employeeID: this.propExistingUserItems.employeeID,
          email: this.propExistingUserItems.email,
          contactNumber: this.propExistingUserItems.contactNumber,
          alternateContactNumber: this.propExistingUserItems
            .alternateContactNumber,
          userAddress: this.propExistingUserItems.userAddress,
          city: this.propExistingUserItems.city,
          password: "password",
          state: {
            id: this.propExistingUserItems.state.id
          }
        }
      }
    };
  },

  validations: {
    formData: {
      addUserDetails: {
        name: {
          alpha,
          required,
          minLength: minLength(4)
        },
        employeeID: {
          required,
          alphaNum,
          maxLength: maxLength(20),
          minLength: minLength(2)
        },
        email: {
          required,
          email
        },
        contactNumber: {
          required,
          minLength: minLength(10),
          maxLength: maxLength(10),
          numeric
        },
        alternateContactNumber: {
          minLength: minLength(10),
          maxLength: maxLength(10),
          numeric
        },
        userAddress: {
          required,
          maxLength: maxLength(20),
          minLength: minLength(2)
        },
        city: {
          required,
          alpha,
          maxLength: maxLength(20),
          minLength: minLength(2)
        },
        tempRoles: {
          required,
          minLength: minLength(1)
        }
      }
    }
  },
  computed: {
    ...mapGetters("SuperAdminUsers", [
      "getAPIStatusLog",
      "getRolesBasedHeirarchyId"
    ])
  },
  created() {
    this.makeTempRolesArr();
  },
  methods: {
    ...mapActions("SuperAdminUsers", [
      "FEED_USER_DATA",
      "FETCH_ALL_USERS_DATA",
      "FEED_UPDATE_USER_DATA",
      "FETCH_ROLES_BASED_ON_HEIRARCHY_ID"
    ]),

    emitfnShowEditUser(showEditUser) {
      this.$emit("emitfnShowEditUser", showEditUser);
    },

    fnSubmitShowAddUser(showEditUser) {
      this.$v.formData.addUserDetails.$touch();

      if (this.$v.formData.addUserDetails.$error) {
        this.$q.notify("Please review fields again.");
      } else {
        let arr = [];
        this.formData.addUserDetails.tempRoles.map(function(item) {
          arr.push({ role: item });
        });
        this.formData.addUserDetails.roles = arr;

        this.$q.loading.show({
          delay: 100, // ms
          message: "Please Wait",
          spinnerColor: "purple-9",
          customClass: "shadow-none"
        });

        this.FEED_UPDATE_USER_DATA(this.formData.addUserDetails)
          .then(() => {
            console.log("POST store >> AFTER >>", this.getAPIStatusLog);
            this.$q.loading.hide();
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Successfully updated!",
              icon: "thumb_up"
            });
            this.FETCH_ALL_USERS_DATA();
            this.$emit("emitfnShowEditUser", showEditUser);
          })
          .catch(error => {
            this.$q.loading.hide();
            this.$q.notify({
              color: "negative",
              position: "bottom",
              message: error.body.message == null ? "Please Try Again Later !" : error.body.message,
              icon: "thumb_down"
            });
          });
      }
    },

    makeTempRolesArr() {
      this.formData.addUserDetails.tempRoles = this.propExistingUserItems.roles.map(
        function(value, index) {
          return value.role;
        }
      );
    },

    fnChangeRoleBasedOnHeirarchy(heirarchyId) {
      console.log("heirarchyId >>", heirarchyId);
      console.log(
        "this.formData.addUserDetails.hierarchy.id >>",
        this.formData.addUserDetails.hierarchy.id
      );
      if (heirarchyId != this.propExistingUserItems.hierarchy.id) {
        this.formData.addUserDetails.tempRoles = [];
      } else {
        this.makeTempRolesArr();
      }
      this.$q.loading.show({
        delay: 100, // ms
        message: "Please Wait",
        spinnerColor: "purple-9",
        customClass: "shadow-none"
      });
      this.FETCH_ROLES_BASED_ON_HEIRARCHY_ID(heirarchyId)
        .then(() => {
          this.$q.loading.hide();
        })
        .catch(error => {
          this.$q.loading.hide();
        });
    }
  }
};
</script>
