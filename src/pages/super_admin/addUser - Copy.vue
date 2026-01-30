<template>
  <div>
    <form>
      <div class="q-px-md">
        <div class="q-pa-sm">
          <div class="row gutter-sm q-py-sm items-center bottom-border">
            <div>
              <div class="q-title text-weight-regular">Add New User</div>
            </div>
          </div>
        </div>

        <div class="q-pa-sm">
          <div class="row gutter-sm q-py-sm items-center">
            <div class="full-width q-body-1 text-weight-medium">Mapping Information:</div>
            <div
              class="col-md-4 group"
              v-for="(value,index) in formData.addUserDetails.userMapSets"
              :key="index"
            >
              <q-card class="q-pa-sm group shadow-6 text-dark" color="grey-3">
                <div class="row bottom-border q-pa-xs capitalize">
                  <div class="col-md-6">Hierarchy</div>
                  <div class="capitalize">{{fnGetHierarchyTitle(value.hierarchy)}}</div>
                </div>
                <div class="row bottom-border q-pa-xs">
                  <div class="col-md-6">Role</div>
                  <div class="capitalize">{{fnGetRoleTitle(value.roleId)}}</div>
                </div>
                <div class="row bottom-border q-pa-xs">
                  <div class="col-md-6">Region</div>
                  <div class="capitalize">{{fnGetRegionTitle(value.regionId)}}</div>
                </div>
                <div class="row bottom-border q-pa-xs">
                  <div class="col-md-6">Predecessor</div>
                  <div class="capitalize">{{fnGetUserTitle(value.predecessorId)}}</div>
                </div>
                <div class="row">
                  <div class="group">
                    <q-btn
                      size="sm"
                      round
                      color="negative"
                      v-if="formData.addUserDetails.userMapSets.length >0"
                      @click="deleteDynamicComponentDeletion(index)"
                      icon="clear"
                      label="Remove"
                    />

                    <q-btn
                      size="sm"
                      round
                      color="amber-9"
                      v-if="formData.addUserDetails.userMapSets.length >0"
                      @click="fnShowDynamicHierarchyRoleRegionAddDeleteForEdit(value,index)"
                      icon="edit"
                      label="Edit"
                    />
                  </div>
                </div>
              </q-card>
            </div>
          </div>
        </div>

        <div class="q-pa-sm">
          <div class="row gutter-sm q-py-sm items-center">
            <div class="group">
              <q-btn
                outline
                color="dark"
                :class="[isRoleEmpty? 'animate-scale':'']"
                @click="fnShowDynamicHierarchyRoleRegionAddDelete"
                icon="add"
                label="Add Mapping"
              />
            </div>
          </div>
        </div>

        <div class="q-pa-md">
          <div class="row gutter-sm q-py-sm">
            <div class="col-md-12">
              <div class="q-title text-weight-regular">User Details</div>
            </div>
            <div class="col-md-6">
              <q-input
                v-model.trim="formData.addUserDetails.name"
                @blur="$v.formData.addUserDetails.name.$touch"
                :error="$v.formData.addUserDetails.name.$error"
                class="text-weight-regular text-grey-8"
                color="grey-9"
                float-label="*Name"
                placeholder="Name"
              />
            </div>

            <div class="col-md-6">
              <q-input
                v-model.trim="formData.addUserDetails.employeeID"
                @blur="$v.formData.addUserDetails.employeeID.$touch"
                :error="$v.formData.addUserDetails.employeeID.$error"
                class="text-weight-regular text-grey-8"
                color="grey-9"
                float-label="*Employee ID"
                placeholder="Employee ID"
              />
            </div>

            <div class="col-md-6">
              <q-input
                v-model.trim="formData.addUserDetails.email"
                class="text-weight-regular text-grey-8"
                color="grey-9"
                @blur="$v.formData.addUserDetails.email.$touch"
                :error="$v.formData.addUserDetails.email.$error"
                float-label="*Email"
                placeholder="Email"
              />
            </div>

            <div class="col-md-6">
              <q-input
                v-model.trim="formData.addUserDetails.contactNumber"
                @blur="$v.formData.addUserDetails.contactNumber.$touch"
                :error="$v.formData.addUserDetails.contactNumber.$error"
                class="text-weight-regular text-grey-8"
                color="grey-9"
                float-label="*Contact Number"
                placeholder="Contact Number"
              />
            </div>

            <div class="col-md-6">
              <q-input
                v-model.trim="formData.addUserDetails.alternateContactNumber"
                @blur="$v.formData.addUserDetails.alternateContactNumber.$touch"
                :error="$v.formData.addUserDetails.alternateContactNumber.$error"
                class="text-weight-regular text-grey-8"
                color="grey-9"
                float-label="Alt Contact Number"
                placeholder="Alt Contact Number"
              />
            </div>

            <div class="col-md-6">
              <q-input
                v-model.trim="formData.addUserDetails.userAddress"
                @blur="$v.formData.addUserDetails.userAddress.$touch"
                :error="$v.formData.addUserDetails.userAddress.$error"
                class="text-weight-regular text-grey-8"
                color="grey-9"
                float-label="*Address"
                placeholder="Address"
              />
            </div>

            <!-- <q-input color="amber" v-model="terms" placeholder="Type 'fre'">
                <q-autocomplete
                  @search="fnSearchPincode"
                  :min-characters="3"
                  @selected="selected"
                />
            </q-input>-->

            <div class="col-md-6">
              <pre>{{formData.addUserDetails.pincodeTemp}}</pre>
              <q-select
                filter
                v-model.trim="formData.addUserDetails.pincodeTemp"
                float-label="*Pincode"
                radio
                :error="$v.formData.addUserDetails.pincodeTemp.$error"
                @input="fnGetCityAndState()"
                class="text-weight-regular text-grey-8"
                color="grey-9"
                :options="getAllStatesData"
              />
            </div>
            <div class="col-md-6">
              <q-input
                disable
                v-model.trim="formData.addUserDetails.state"
                class="text-weight-regular text-grey-8"
                color="grey-9"
                float-label="*State"
                placeholder="State"
              />
            </div>

            <div class="col-md-6">
              <q-input
                disable
                v-model.trim="formData.addUserDetails.city"
                class="text-weight-regular text-grey-8"
                color="grey-9"
                float-label="*City"
                placeholder="City"
              />
            </div>
          </div>
        </div>

        <div class="full-width group" align="right">
          <q-btn
            flat
            size="md"
            class="bg-white text-weight-regular text-grey-8"
            @click="$router.go(-1)"
          >Cancel</q-btn>
          <q-btn size="md" type="button" color="purple-9" @click="fnSubmitShowAddUser()">Submit</q-btn>
        </div>
      </div>
    </form>
    <dynamicHierarchyRoleRegionAddDelete
      v-if="showDynamicHierarchyRoleRegionAddDelete"
      :propDynamicHierarchyRoleRegion="showDynamicHierarchyRoleRegionAddDelete"
      @emitfnToggleModelWithParams="fnShowDynamicHierarchyRoleRegionAddDeleteWithParams"
      @emitfnToggleModelCancel="fnShowDynamicHierarchyRoleRegionAddDeleteWithoutParams"
      :propFilterRoles="getAllRoles"
      :propGetAllRegionsData="getAllRegionsData"
      :propGetAllHierarchiesData="getAllHierarchiesData"
    />
    <dynamicHierarchyRoleRegionAddDeleteForEdit
      v-if="showDynamicHierarchyRoleRegionAddDeleteForEdit"
      :propDynamicHierarchyRoleRegion="showDynamicHierarchyRoleRegionAddDeleteForEdit"
      :propDetailsForEdit="editTempProp"
      @emitfnToggleModelWithParams="fnShowDynamicHierarchyRoleRegionAddDeleteWithParamsEdit"
      @emitfnToggleModelCancelEdit="fnShowDynamicHierarchyRoleRegionAddDeleteWithoutParamsEdit"
      :propFilterRoles="getAllRoles"
      :propGetAllRegionsData="getAllRegionsData"
      :propGetAllHierarchiesData="getAllHierarchiesData"
    />
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
import dynamicHierarchyRoleRegionAddDelete from "../../components/super_admin/dynamicHierarchyRoleRegionAddDelete.vue";
import dynamicHierarchyRoleRegionAddDeleteForEdit from "../../components/super_admin/dynamicHierarchyRoleRegionAddDeleteForEdit.vue";
export default {
  components: {
    dynamicHierarchyRoleRegionAddDelete,
    dynamicHierarchyRoleRegionAddDeleteForEdit
  },

  data() {
    return {
      showDynamicHierarchyRoleRegionAddDelete: false,
      showDynamicHierarchyRoleRegionAddDeleteForEdit: false,
      editTempProp: "",
      EditCurrentIndex: "",
      customizedHirarchyFilter: [],
      dynamicHierarchyRoleRegion: 1,
      isRoleEmpty: false,
      formData: {
        addUserDetails: {
          dynamicDataBinding: "",
          profilePicture: "uploads/c7818f74-9652-42f9-a902-9da6a692cdf3.png",
          password: "password",
          name: "",
          employeeID: "",
          email: "",
          contactNumber: "",
          alternateContactNumber: "",
          userAddress: "",
          city: "",
          state: "",
          pincode: "",
          pincodeTemp: "",
          password: "password",
          stateTemp: [],
          userMapSetsTemp: [],
          userMapSets: [],

          //**** TODO change it has static values brooo
          latitude: 13.25,
          longitude: 80.25
          //************** */
        }
      }
    };
  },

  validations: {
    formData: {
      addUserDetails: {
        name: {
          required,
          minLength: minLength(4)
        },
        employeeID: {
          required,
          alphaNum,
          minLength: minLength(2)
        },
        email: {
          required,
          email
        },
        contactNumber: {
          required,
          minLength: minLength(7),
          maxLength: maxLength(10),
          numeric
        },
        alternateContactNumber: {
          minLength: minLength(7),
          maxLength: maxLength(10),
          numeric
        },
        userAddress: {
          required,
          minLength: minLength(2)
        },
        pincodeTemp: {
          required
        }
      }
    }
  },

  created() {
    /* START: Load user table data filter > Roles */
    this.ajaxLoadDataForRolesFilter();
    /* End: Load user table data filter > Roles */

    /* START: Load all States */
    this.ajaxLoadDataForAllStatesList();
    /* End: Load all States */

    /* START: Load user table data filter > Hierarchy */
    this.ajaxLoadDataForHeirarchyFilter();
    /* End: Load user table data filter > Hierarchy */

    /* START: Load user table data filter > Regions */
    this.ajaxLoadDataForRegionsFilter();
    /* End: Load user table data filter > Regions */

    /* START: Load user table data filter > Users */
    this.ajaxLoadDataForUsersFilter();
    /* End: Load user table data filter > Users */
  },

  computed: {
    ...mapGetters("SuperAdminUsers", [
      "getAllRoles",
      "getAllUsers",
      "getAllRegionsData",
      "getAllHierarchiesData",
      "getAllStatesData"
    ])
  },

  methods: {
    ...mapActions("SuperAdminUsers", [
      "FETCH_ALL_USERS_DATA",
      // "FEED_USER_DATA",
      "FETCH_ALL_STATES_DATA",
      "FETCH_ALL_ROLES_DATA",
      "FETCH_ALL_HIERARCHIES_DATA",
      "FETCH_ALL_REGIONS_DATA"
    ]),
    ...mapActions("SuperAdminUsersCRUD", ["FEED_USER_DATA"]),

    ajaxLoadDataForHeirarchyFilter() {
      this.FETCH_ALL_HIERARCHIES_DATA();
    },

    ajaxLoadDataForAllStatesList() {
      this.FETCH_ALL_STATES_DATA();
    },

    //API to fetch roles
    ajaxLoadDataForRolesFilter() {
      this.FETCH_ALL_ROLES_DATA();
    },

    //API to fetch hierarchy
    ajaxLoadDataForRegionsFilter() {
      this.FETCH_ALL_REGIONS_DATA();
    },

    //API to fetch all users info
    ajaxLoadDataForRegionsFilter() {
      this.FETCH_ALL_REGIONS_DATA();
    },
    //API to fetch all users info
    ajaxLoadDataForUsersFilter() {
      this.FETCH_ALL_USERS_DATA();
    },

    fnSubmitShowAddUser() {
      if (this.formData.addUserDetails.userMapSets.length < 1) {
        this.isRoleEmpty = true;
        this.$q.notify({
          color: "amber-9",
          position: "bottom",
          message: "User must have atleast one role to continue",
          icon: "warning"
        });
        return false;
      }
      this.$v.formData.addUserDetails.$touch();
      if (this.$v.formData.addUserDetails.$error) {
        this.$q.notify("Please review fields again.");
      } else {
        // this.$q.loading.show({
        //   delay: 100, // ms
        //   message: "Please Wait",
        //   spinnerColor: "purple-9",
        //   customClass: "shadow-none"
        // });

        let response = this.FEED_USER_DATA(this.formData.addUserDetails);

        console.log("response >> >> >> >", response);
        // .then(response => {
        //   console.log("success >>??", response);
        //   // this.$q.loading.hide();
        //   // this.$q.notify({
        //   //   color: "positive",
        //   //   position: "bottom",
        //   //   message: "User successfully created",
        //   //   icon: "thumb_up"
        //   // });
        //   // this.$router.push("/sat/exception/queue");
        // })
        // .catch(error => {
        //   console.log("failed>>??", error);
        //   // this.$q.loading.hide();
        //   // this.$q.notify({
        //   //   color: "negative",
        //   //   position: "bottom",
        //   //   message: error.body.message == null ? "Please Try Again Later !" : error.body.message,
        //   //   icon: "thumb_down"
        //   // });
        // });
      }
    },

    //Start >> Adding new user mapping information in array
    fnShowDynamicHierarchyRoleRegionAddDelete(mappingInfo) {
      this.showDynamicHierarchyRoleRegionAddDelete = !this
        .showDynamicHierarchyRoleRegionAddDelete;
    },

    fnShowDynamicHierarchyRoleRegionAddDeleteWithParams(mappingInfo) {
      this.formData.addUserDetails.userMapSetsTemp.push(mappingInfo);
      let uniqueSortedArrSet = _.map(
        _.uniq(
          _.map(this.formData.addUserDetails.userMapSetsTemp, function(obj) {
            return JSON.stringify(obj);
          })
        ),
        function(obj) {
          return JSON.parse(obj);
        }
      );
      this.$set(
        this.formData.addUserDetails,
        "userMapSets",
        uniqueSortedArrSet
      );

      this.showDynamicHierarchyRoleRegionAddDelete = !this
        .showDynamicHierarchyRoleRegionAddDelete;
    },

    fnShowDynamicHierarchyRoleRegionAddDeleteWithoutParams() {
      this.showDynamicHierarchyRoleRegionAddDelete = !this
        .showDynamicHierarchyRoleRegionAddDelete;
    },
    //End >> Adding new user mapping information in array

    //Start >> Modifying user mapping information in array
    fnShowDynamicHierarchyRoleRegionAddDeleteForEdit(mappingInfo, index) {
      // Setting index to find which the values belongs to
      this.$set(mappingInfo, "index", index);
      this.editTempProp = mappingInfo;
      this.showDynamicHierarchyRoleRegionAddDeleteForEdit = !this
        .showDynamicHierarchyRoleRegionAddDeleteForEdit;
    },

    fnShowDynamicHierarchyRoleRegionAddDeleteWithParamsEdit(mappingInfo) {
      this.$set(
        this.formData.addUserDetails.userMapSets,
        mappingInfo.index,
        mappingInfo
      );
      this.showDynamicHierarchyRoleRegionAddDeleteForEdit = !this
        .showDynamicHierarchyRoleRegionAddDeleteForEdit;
    },

    fnShowDynamicHierarchyRoleRegionAddDeleteWithoutParamsEdit() {
      this.showDynamicHierarchyRoleRegionAddDeleteForEdit = !this
        .showDynamicHierarchyRoleRegionAddDeleteForEdit;
    },
    //END >> Modifying user mapping information in array

    fnGetCityAndState() {
      this.formData.addUserDetails.pincode = this.formData.addUserDetails.pincodeTemp.pincode;
      this.formData.addUserDetails.state = this.formData.addUserDetails.pincodeTemp.stateName;
      this.formData.addUserDetails.city = this.formData.addUserDetails.pincodeTemp.cityName;
    },

    //Start >> Modifying user mapping information in array
    deleteDynamicComponentDeletion(value) {
      this.$delete(this.formData.addUserDetails.userMapSets, value);
    },
    //End >>deleting user mapping information in array

    //START >> Function to return mapping information
    fnGetHierarchyTitle(filterValue) {
      var finalReturnValue = _.filter(this.getAllHierarchiesData, function(
        item
      ) {
        return item.value == filterValue;
      });
      return finalReturnValue[0].label;
    },
    fnGetRoleTitle(filterValue) {
      var finalReturnValue = _.filter(this.getAllRoles, function(item) {
        return item.value == filterValue;
      });
      return finalReturnValue[0].label;
    },
    fnGetRegionTitle(filterValue) {
      var finalReturnValue = _.filter(this.getAllRegionsData, function(item) {
        return item.value == filterValue;
      });
      return finalReturnValue[0].label;
    },
    fnGetUserTitle(filterValue) {
      if (filterValue == null) {
        return "NA";
      } else {
        var finalReturnValue = _.filter(this.getAllUsers, function(item) {
          return item.id == filterValue;
        });
        return finalReturnValue;
      }
    }
    //END >> Function to return mapping information
  }
};
</script>
