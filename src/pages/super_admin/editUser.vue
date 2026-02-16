<template>
  <div>
    <form>
      <div class="q-px-md">
        <div class="q-pa-sm">
          <div class="row gutter-sm q-py-sm items-center bottom-border">
            <div>
              <div class="text-h6 text-weight-regular">Update User</div>
            </div>
          </div>
        </div>
        <!-- <pre>{{formData.addUserDetails}}</pre> -->
        <!-- <pre>{{formData.addUserDetails.userMapSets}}</pre> -->
        <div class="q-pa-md">
          <div class="row q-py-sm">
            <div class="group">
              <div>Permissions</div>
              <q-checkbox color="purple-9" label="Read" v-model="formData.addUserDetails.hasReadPermission" />
              <q-checkbox color="purple-9" label="Write" v-model="formData.addUserDetails.hasWritePermission" />
              <q-checkbox color="purple-9" label="Update" v-model="formData.addUserDetails.hasEditPermission" />
              <q-checkbox color="purple-9" label="Delete" v-model="formData.addUserDetails.hasDeletePermission" />
              <q-checkbox color="purple-9" label="Download" v-model="formData.addUserDetails.hasDownloadPermission" />
            </div>
          </div>
        </div>
        <div class="q-pa-md">
          <div class="row gutter-sm q-py-sm">
            <div class="col-md-6">
              <q-select :disabled="formData.disableRegionSelection"
                :class="[formData.disableRegionSelection ? 'no-pointer-events' : '']" color="grey-9"
                float-label="Choose a region" v-model="formData.addUserDetails.region.id"
                :error="$v.formData.addUserDetails.region.id.$error" @blur="$v.formData.addUserDetails.region.id.$touch"
                :options="getAllRegionsData" />
            </div>

            <div class="col-md-6">
              <q-input v-model.trim="formData.addUserDetails.name" @blur="$v.formData.addUserDetails.name.$touch"
                :error="$v.formData.addUserDetails.name.$error" class="text-weight-regular text-grey-8" color="grey-9"
                float-label="*Name" placeholder="Name" />
            </div>

            <div class="col-md-6">
              <q-input v-model.trim="formData.addUserDetails.employeeID"
                @blur="$v.formData.addUserDetails.employeeID.$touch"
                :error="$v.formData.addUserDetails.employeeID.$error" class="text-weight-regular text-grey-8"
                color="grey-9" float-label="*Employee ID" placeholder="Employee ID" />
            </div>

            <div class="col-md-6">
              <q-input disable v-model.trim="formData.addUserDetails.email" class="text-weight-regular text-grey-8"
                color="grey-9" @blur="$v.formData.addUserDetails.email.$touch"
                :error="$v.formData.addUserDetails.email.$error" float-label="*Email" placeholder="Email" />
            </div>

            <div class="col-md-6">
              <q-input v-model.trim="formData.addUserDetails.contactNumber"
                @blur="$v.formData.addUserDetails.contactNumber.$touch"
                :error="$v.formData.addUserDetails.contactNumber.$error" class="text-weight-regular text-grey-8"
                color="grey-9" float-label="*Contact Number" placeholder="Contact Number" />
            </div>

            <div class="col-md-6">
              <q-input v-model.trim="formData.addUserDetails.alternateContactNumber"
                @blur="$v.formData.addUserDetails.alternateContactNumber.$touch"
                :error="$v.formData.addUserDetails.alternateContactNumber.$error"
                class="text-weight-regular text-grey-8" color="grey-9" float-label="Alt Contact Number"
                placeholder="Alt Contact Number" />
            </div>

            <div class="col-md-6">
              <q-input v-model.trim="formData.addUserDetails.userAddress"
                @blur="$v.formData.addUserDetails.userAddress.$touch"
                :error="$v.formData.addUserDetails.userAddress.$error" class="text-weight-regular text-grey-8"
                color="grey-9" float-label="*Address" placeholder="Address" />
            </div>

            <div class="col-md-6">
              <q-input type="number" :error="$v.formData.addUserDetails.pincodeTemp.$error" clearable
                @clear="fnGetCityAndState" color="grey-9" v-model.trim="formData.addUserDetails.pincodeTemp"
                float-label="Pincode" placeholder="Pincode">
                <q-autocomplete @search="pincodeSearch" :debounce="500" :min-characters="1"
                  @selected="pincodeSelected" />
              </q-input>
            </div>
            <div class="col-md-6">
              <q-input disable v-model.trim="formData.addUserDetails.state" class="text-weight-regular text-grey-8"
                color="grey-9" float-label="*State" placeholder="State" />
            </div>

            <div class="col-md-6">
              <q-input disable v-model.trim="formData.addUserDetails.city" class="text-weight-regular text-grey-8"
                color="grey-9" float-label="*City" placeholder="City" />
            </div>
          </div>
          <div class="row group" v-for="(item, index) in getAllHierarchiesAndRolesData" :key="index">
            <div class="col">
              <q-checkbox color="purple-9" v-model="item.checked" @input="getRoleCheckedItem(item)"
                :label="item.hierarchy" />
            </div>
            <div class="col">
              <q-select :disable="!item.checked" color="grey-9" placeholder="Choose a role" v-model="item.roleChecked"
                :options="item.roles" @input="getPredecessorList(item)" />
            </div>
            <div class="col">
              <q-select :disable="!item.checked" disaply-value color="grey-9"
                :placeholder="item.predecessor.length == 0 ? 'No data available to display' : 'Choose a predecessor'"
                v-model="item.predecessorChecked" :options="item.predecessor" />
            </div>
          </div>
          <div v-if="formData.showBankOpsList" class="row gutter-sm q-py-sm">
            <!-- <pre>{{formData.addUserDetails.banksList}}</pre> -->
            <div class="col-md-6">
              <q-select multiple color="grey-9" float-label="Choose bank (can be multiple)"
                v-model="formData.addUserDetails.banksList" :error="$v.formData.addUserDetails.banksList.$error"
                @blur="$v.formData.addUserDetails.banksList.$touch" :options="leadSourceOptions" />
            </div>
          </div>
          <!-- {{this.hierarchyDetails}}  -->
          <!-- {{this.getAllUserByUserIdData}} -->
           <!--UAT ------: this.formData.showAllRoleDetails == 24 -->
          <!--Production ------: this.formData.showAllRoleDetails == 25 -->
          <div v-if="this.getAllUserByUserIdData.roles[0].id == 25" class="row gutter-sm q-py-sm" :disabled="this.getAllUserByUserIdData.serviceReqClients.sourceId != null">
            <label> Lead Source Enable? </label>
            <div class="col-md-9">

              <q-radio v-for="(item, index) in LeadSourceOptions1" :key="index" color="grey-9"
                v-model.trim="formData.addUserDetails.leadSource" @blur="$v.formData.addUserDetails.leadSource.$touch"
                :error="$v.formData.addUserDetails.leadSource.$error" :val="item.value" :label="item.label" />
            </div>
          </div>
          <div v-if="this.getAllUserByUserIdData.roles[0].hierarchy.hierarchyCode == 'SC'"
            class="row gutter-sm q-py-sm">
            <div class="col-md-6">
              <q-input float-label="Please enter authMethod....."
                v-model="formData.addUserDetails.serviceReqClients.authMethod"
                :error="$v.formData.addUserDetails.serviceReqClients.authMethod.$error"
                @blur="$v.formData.addUserDetails.serviceReqClients.authMethod.$touch" />

            </div>
            <div class="col-md-6">
              <q-input float-label="Please enter authKey....."
                v-model="formData.addUserDetails.serviceReqClients.authKey"
                :error="$v.formData.addUserDetails.serviceReqClients.authKey.$error"
                @blur="$v.formData.addUserDetails.serviceReqClients.authKey.$touch" />
            </div>
            <div class="col-md-6">
              <q-input float-label="Please enter authValue....."
                v-model="formData.addUserDetails.serviceReqClients.authValue"
                :error="$v.formData.addUserDetails.serviceReqClients.authValue.$error"
                @blur="$v.formData.addUserDetails.serviceReqClients.authValue.$touch" />
            </div>
            <div class="col-md-6">
              <q-input float-label="Please enter callBackUrl....."
                v-model="formData.addUserDetails.serviceReqClients.callBackUrl"
                :error="$v.formData.addUserDetails.serviceReqClients.callBackUrl.$error"
                @blur="$v.formData.addUserDetails.serviceReqClients.callBackUrl.$touch" />
            </div>

          </div>

        </div>
      </div>

      <div class="full-width group" align="right">
        <q-btn flat class="bg-white text-weight-regular text-grey-8" @click="GoToUsers()">Cancel</q-btn>
        <q-btn class="text-weight-regular" color="amber-9" @click="refreshData()">Reset</q-btn>
        <q-btn type="button" color="purple-9" @click="fnSubmitShowEditUser(formData.addUserDetails)">Submit</q-btn>
      </div>
    </form>
  </div>
</template>
<script>
import { nullLiteral } from "babel-types";
import {
  required,
  requiredIf,
  email,
  minLength,
  maxLength,
  alpha,
  alphaNum,
  numeric
} from "@vuelidate/validators";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      leadSourceOptions: [],
      hierarchyDetails: [],
      LeadSourceOptions1: [
        {
          label: "Yes",
          value: "Yes"
        },
        {
          label: "No",
          value: "No"
        },
      ],
      formData: {
        showBankOpsList: false,
        disableRegionSelection: false,
        addUserDetails: {
          hasReadPermission: false,
          hasWritePermission: false,
          hasDeletePermission: false,
          hasEditPermission: false,
          hasDownloadPermission: false,

          banksList: [],
          region: {
            id: ""
          },
          // leadSource: "Yes",
          leadSource: {
            sourceName: null,
            sourceCode: null
          },
          // Auth:"",
          // AuthValues: "",
          serviceReqClients: {
            authMethod: "",
            authKey: "",
            authValue: "",
            callBackUrl: ""
          },


          profilePicture: "uploads/c7818f74-9652-42f9-a902-9da6a692cdf3.png",
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
          pincodeDisplayValue: "",
          stateTemp: [],
          userMapSets: [],

          //**** TODO change it has dynamic values brooo
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
        region: {
          id: {
            required: requiredIf(function () {
              return this.formData.disableRegionSelection === false;
            })
          }
        },
        name: {
          required,
          minLength: minLength(2)
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
        },
        banksList: {
          required: requiredIf(function () {
            return this.formData.showBankOpsList;
          }),
          minLength: minLength(1)
        },
        leadSource: {
          required: requiredIf(function () {
            return (this.getAllUserByUserIdData.roles[0].id == '25') === true;
          })
        },
        //  leadSource: {
        //   sourceName: {
        //     required: requiredIf(function () {
        //       return (this.getAllUserByUserIdData.roles[0].id == '28')=== true;
        //     })
        //   }
        //   },
        serviceReqClients: {
          authMethod: {
            required: requiredIf(function () {
              return (this.getAllUserByUserIdData.roles[0].hierarchy.hierarchyCode == 'SC') === true;
            }),
          },
          authKey: {
            required: requiredIf(function () {
              return (this.getAllUserByUserIdData.roles[0].hierarchy.hierarchyCode == 'SC') === true;
            }),
          },
          authValue: {
            required: requiredIf(function () {
              return (this.getAllUserByUserIdData.roles[0].hierarchy.hierarchyCode == 'SC') === true;
            }),
          },
          callBackUrl: {
            required: requiredIf(function () {
              return (this.getAllUserByUserIdData.roles[0].hierarchy.hierarchyCode == 'SC') === true;
            }),
          },
        }
      }
    }
  },

  created() {
    /* START: Load user > User info */
    this.ajaxLoadUserInfo();
    /* End: Load user > User info */

    /* START: Load all States */
    this.ajaxLoadDataForAllStatesList();
    /* End: Load all States */

    /* START: Load user table data filter > Hierarchy */
    // this.ajaxLoadDataForHeirarchyFilter();
    /* End: Load user table data filter > Hierarchy */

    /* START: Load user table data filter > Regions */
    this.ajaxLoadDataForRegionsFilter();
    this.ajaxLoadDataForBankListFilter();
    
    /* End: Load user table data filter > Regions */
  },

  computed: {
    ...mapGetters("SuperAdminUsers", [
      "getAllUserByUserIdData",
      "getAllRoles",
      "getAllUsers",
      "getAllRegionsData",
      "getAllHierarchiesData",
      "getAllStatesData",
      "getAllHierarchiesAndRolesData",
      "getPredecessorByRoleHierarchyData"
    ]),
    ...mapGetters("BankOpsShortLead", ["getSelectOptionsLeadSourceInfo"]),


  },

  methods: {
    ...mapActions("SuperAdminUsers", [
      "FETCH_ALL_USERS_BY_USER_ID_DATA",
      "FETCH_ALL_USERS_DATA",
      "FEED_UPDATE_USER_DATA",
      "FETCH_ALL_STATES_DATA",
      "FETCH_PINCODE_WITH_TERM",
      "FETCH_ALL_ROLES_DATA",
      "FETCH_ALL_HIERARCHIES_ROLES_DATA",
      "FETCH_ALL_REGIONS_DATA",
      "FETCH_PREDECESSOR_ON_ROLE"
    ]),
    ...mapActions("BankOpsShortLead", ["FETCH_ALL_LEAD_SOURCE_DATA"]),

    /* Pincode search result */
    pincodeSearch(terms, done) {
      this.formData.addUserDetails.cityName = "";
      this.formData.addUserDetails.stateName = "";
      this.FETCH_PINCODE_WITH_TERM(terms)
        .then(() => {
          done(this.COMMON_FILTER_FUNCTION(this.getAllStatesData, terms));
        })
        .catch(() => {
          done([]);
        });
    },
    pincodeSelected(item) {
      this.formData.addUserDetails.state = item.value.stateName;
      this.formData.addUserDetails.city = item.value.cityName;
      this.formData.addUserDetails.pincode = item.value.pincode;
      this.formData.addUserDetails.pincodeTemp = item.value.pincode;
    },
    /* Pincode search result */

    COMMON_FILTER_FUNCTION(arraySet, terms) {
      return _.filter(arraySet, function (oo) {
        return oo.label.toString().includes(terms.toLowerCase());
      });
    },

    refreshData() {
      this.ajaxLoadUserInfo();
    },

    ajaxLoadUserInfo() {
      let innerSelf = this;
      innerSelf
        .FETCH_ALL_USERS_BY_USER_ID_DATA(innerSelf.$route.params.id)
        .then(() => {
          console.log("innerSelf.getAllUserByUserIdData.TEST ----------->", JSON.stringify(this.getAllUserByUserIdData))
                    let formData = {
                      
                    
            showBankOpsList:
            
              innerSelf.getAllUserByUserIdData.bankOpsUser == null
                ,
             disableRegionSelection: innerSelf.getAllUserByUserIdData.roles[0].hierarchy.hierarchyCode == "CU" && innerSelf.getAllUserByUserIdData.serviceReqClients == null ,
            //  -UAT ------: this.formData.showAllRoleDetails == 24 
          // Production ------: this.formData.showAllRoleDetails == 25 
          // UAT SERVICE REQUEST(HIERARCHY ID -- 8) AND CRM USER (HIERARCHY ID -- 10)
        // PRODUCTION SERVICE REQUEST(HIERARCHY ID -- 9) AND CRM USER (HIERARCHY ID -- 10)
             disableRegionSelection: innerSelf.getAllUserByUserIdData.bankOpsUser != null ? true : (innerSelf.getAllUserByUserIdData.roles[0].hierarchy.id == 10 ),
             disableRegionSelection: innerSelf.getAllUserByUserIdData.serviceReqClients == null  && innerSelf.getAllUserByUserIdData.roles[0].hierarchy.hierarchyCode != "CU" ,
            
            // disableRegionSelection:(innerSelf.getAllUserByUserIdData.bankOpsUser == null || innerSelf.getAllUserByUserIdData.serviceReqClients == null ),
            // leadSource: innerSelf.getAllUserByUserIdData.serviceReqClients != null ? innerSelf.getAllUserByUserIdData.serviceReqClients.sourceId == null ? "No" : "Yes" : null,
            addUserDetails: {
              hasReadPermission:
                innerSelf.getAllUserByUserIdData.user.hasReadPermission,
              hasWritePermission:
                innerSelf.getAllUserByUserIdData.user.hasWritePermission,
              hasDeletePermission:
                innerSelf.getAllUserByUserIdData.user.hasDeletePermission,
              hasEditPermission:
                innerSelf.getAllUserByUserIdData.user.hasEditPermission,
              hasDownloadPermission:
                innerSelf.getAllUserByUserIdData.user.hasDownloadPermission,
              banksList:
                innerSelf.getAllUserByUserIdData.bankOpsUser == null
                  ? []
                  : innerSelf.getAllUserByUserIdData.bankOpsUser,
              userId: innerSelf.getAllUserByUserIdData.user.id,
              profilePicture:
                "uploads/c7818f74-9652-42f9-a902-9da6a692cdf3.png",
              region: {
                id:
                  innerSelf.getAllUserByUserIdData.region == null
                    ? ""
                    : innerSelf.getAllUserByUserIdData.region.id
              },
             // predecessor: innerSelf.getAllUserByUserIdData.role[0].predecessor == null ? "" :innerSelf.getAllUserByUserIdData.role[0].predecessor,
              name: innerSelf.getAllUserByUserIdData.user.name,
            //  id:innerSelf.getAllUserByUserIdData.serviceReqClients.sourceId.id != null? null :innerSelf.getAllUserByUserIdData.serviceReqClients.sourceId.id,
              employeeID: innerSelf.getAllUserByUserIdData.user.employeeID,
              email: innerSelf.getAllUserByUserIdData.user.email,
              contactNumber:
                innerSelf.getAllUserByUserIdData.user.contactNumber,
              alternateContactNumber:
                innerSelf.getAllUserByUserIdData.user.alternateContactNumber,
              leadSource: innerSelf.getAllUserByUserIdData.serviceReqClients != null ? innerSelf.getAllUserByUserIdData.serviceReqClients.sourceId == null ? "No" : "Yes" : null,
              serviceReqClients: innerSelf.getAllUserByUserIdData.serviceReqClients != null ? {
                authMethod: innerSelf.getAllUserByUserIdData.serviceReqClients.authMethod,
                authKey: innerSelf.getAllUserByUserIdData.serviceReqClients.authKey,
                authValue: innerSelf.getAllUserByUserIdData.serviceReqClients.authValue,
                callBackUrl: innerSelf.getAllUserByUserIdData.serviceReqClients.callBackUrl,
              } : null,
              userAddress: innerSelf.getAllUserByUserIdData.user.userAddress,
              city: innerSelf.getAllUserByUserIdData.user.city,
              state: innerSelf.getAllUserByUserIdData.user.state,
              pincode: innerSelf.getAllUserByUserIdData.user.pincode,
              pincodeTemp: innerSelf.getAllUserByUserIdData.user.pincode,
              pincodeDisplayValue: String(
                innerSelf.getAllUserByUserIdData.user.pincode
              ),
              userMapSets: []
            }
            
          };
          
          innerSelf.formData = formData;

          this.FETCH_ALL_HIERARCHIES_ROLES_DATA().then(() => {
            _.map(innerSelf.getAllUserByUserIdData.roles, function (o, i) {
              let cookedObj = _.map(
                innerSelf.getAllHierarchiesAndRolesData,
                function (oo, i) {
                  if (o.hierarchy.id == oo.id) {
                    innerSelf.getAllHierarchiesAndRolesData[i]["checked"] = true;
                    innerSelf.getAllHierarchiesAndRolesData[i]["roleChecked"] = o.id;

                    let predecessorCookUp = {
                      region: {
                        id: innerSelf.formData.addUserDetails.region.id
                      },
                      role:  {
                        id: o.id
                      },       
                     // id:innerSelf.formData.addUserDetails.id
                    };

                    innerSelf
                      .FETCH_PREDECESSOR_ON_ROLE(predecessorCookUp)
                      .then(() => {

                        let cookedArr = [];
                        let actualArr = innerSelf.getPredecessorByRoleHierarchyData.map(
                          function (value) {
                            cookedArr.push({
                              label: value.user.name,
                              value: value.user.id
                            });
                          }
                        );
                        innerSelf.getAllHierarchiesAndRolesData[i]["predecessor"] = cookedArr;
                        innerSelf.getAllHierarchiesAndRolesData[i]["predecessorChecked"] = o.predecessor.id;
                      });
                  }
                }
              );
            });

            innerSelf.$q.loading.hide();
          });
        })
        .catch(() => {
          this.$q.notify({
            // only required parameter is the message:
            message: `Oops! Something went wrong`,

            /*
             * All parameters below are optional:
             */

            timeout: 5000, // in milliseconds; 0 means no timeout

            // "type" adds a color and icon,
            // so you don't need to specify them.
            // Available values: 'positive', 'negative', 'warning', 'info'
            type: "negative",
            // or

            detail: "Please ensure you have good network connectivity.",
            position: "bottom", // 'top', 'left', 'bottom-left' etc

            actions: [
              {
                label: "Go back",
                handler: () => {
                  this.$router.push({ name: "users" });
                }
              }
            ],

            onDismiss() {
              // v0.15.11+
              //...
            }
          });
          innerSelf.$q.loading.hide();
        });
    },

    ajaxLoadDataForAllStatesList() {
      this.FETCH_ALL_STATES_DATA();
    },

    // //API to fetch hierarchy
    ajaxLoadDataForRegionsFilter() {
      this.FETCH_ALL_REGIONS_DATA();
    },

    // //API to fetch hierarchy
    ajaxLoadDataForBankListFilter() {
      this.FETCH_ALL_LEAD_SOURCE_DATA().then(() => {
        let assumeArr = [];
        _.map(this.getSelectOptionsLeadSourceInfo, function (oo) {
          assumeArr.push({ label: oo.sourceName, value: oo.id });
        });
        this.leadSourceOptions = assumeArr;
      });
    },

    fnGetCityAndState() {
      this.formData.addUserDetails.pincode = this.formData.addUserDetails.pincodeTemp.pincode;
      this.formData.addUserDetails.state = this.formData.addUserDetails.pincodeTemp.stateName;
      this.formData.addUserDetails.city = this.formData.addUserDetails.pincodeTemp.cityName;
    },

    GoToUsers() {
      this.$router.push("/super/admin/users/");
    },

    getRoleCheckedItem() {
      let self = this;
      let checksum = _.find(this.getAllHierarchiesAndRolesData, function (oo) {
        return oo.hierarchyCode == self.$HIERARCHY_BANKS_OPS && oo.checked;
      });    
    let checksum1 = _.find(self.getAllHierarchiesAndRolesData, function (oo) {
        return oo.hierarchyCode == self.$HIERARCHY_CRM && oo.checked;
      });
      console.log("checksum request : ---------->", JSON.stringify(checksum))
      if (checksum == undefined) {
        this.formData.showBankOpsList = false;
        this.formData.disableRegionSelection = false;
      }   else if(checksum1 != undefined){
      this.formData.disableRegionSelection = true;
    }else {
      this.formData.showBankOpsList = true;
        // this.formData.disableRegionSelection = true;
      } 

    },

    // Function to get all predeccsor list
    getPredecessorList(item) {
      console.log("ROLE DETAILS--------->",JSON.stringify(item))
      let formData = {
        region: {
          id: this.formData.addUserDetails.region.id
        },
        role: {
          id: item.roleChecked
        },
     
           // id:innerSelf.formData.addUserDetails.id 
        
      
      };
      this.formData.showAllRoleDetails= formData.role.id;
      // this.hierarchyDetails = this.formData;
      console.log("formData getAllHierarchiesAndRolesData ---------->", JSON.stringify(this.formData))
      this.$q.loading.show({
        delay: 100, // ms
        message: "Please Wait",
        spinnerColor: "purple-9",
        customClass: "shadow-none"
      });
      this.FETCH_PREDECESSOR_ON_ROLE(formData)
        .then(() => {
          this.$q.loading.hide();
          let cookedArr = [];
          let actualArr = this.getPredecessorByRoleHierarchyData.map(function (
            value
          ) {
            cookedArr.push({ label: value.user.name, value: value.user.id });
          });
          item.predecessor = cookedArr;
        })
        .catch(() => {
          this.$q.loading.hide();
          this.$q.notify({
            type: "warning",
            color: "amber-9",
            position: "bottom",
            message: error.data.message
          });
        });
    },

    // Function final submit
    fnSubmitShowEditUser(requestParams) {
      let cookedArr = [];
      let innerSelf = this;
      let assumeArr = this.getAllHierarchiesAndRolesData.map(function (value) {
        if (
          value.checked == true &&
          value.roleChecked != null &&
          value.predecessorChecked != null
        ) {
          let assumeObj = {
            hierarchy: {
              id: value.id
            },
            role: {
              id: value.roleChecked
            },
            region: {
              id: innerSelf.formData.addUserDetails.region.id
            },
            predecessor: {
              id: value.predecessorChecked
            },
          
          // id:innerSelf.formData.addUserDetails.id
                      
          };
          cookedArr.push(assumeObj);
        }
      });
      requestParams.userMapSets = cookedArr;

      if (requestParams.userMapSets.length == 0) {
        this.$q.notify({
          color: "amber-9",
          position: "bottom",
          message: "Role mapping is mandatory",
          icon: "warning"
        });
        return false;
      } else {
        // console.log("SUBMITTING THE CHECKSUM VALUES-1234------->", JSON.stringify(requestParams.userMapSets))
        let checkSum = _.find(requestParams.userMapSets, function (oo) {
          return (
            oo.hierarchy.id == 0 || oo.role.id == 0 || oo.predecessor.id == 0
          );
        });
         //  -UAT ------: this.formData.showAllRoleDetails == 24 
          // Production ------: this.formData.showAllRoleDetails == 25 
          // UAT SERVICE REQUEST(HIERARCHY ID -- 8) AND CRM USER (HIERARCHY ID -- 10)
        // PRODUCTION SERVICE REQUEST(HIERARCHY ID -- 9) AND CRM USER (HIERARCHY ID -- 10)
       
        if (checkSum != undefined && checkSum.hierarchy.id != 9 && checkSum.hierarchy.id != 10 && checkSum.hierarchy.id != 11) {
          if (checkSum.hierarchy.id == 0) {
            this.$q.notify({
              type: "negative",
              color: "amber-9",
              position: "bottom",
              message: "Hierarchy is mandatory"
            });
          } else if (checkSum.role.id == 0) {
            this.$q.notify({
              type: "negative",
              color: "amber-9",
              position: "bottom",
              message: "Role is mandatory"
            });
             //  -UAT ------: this.formData.showAllRoleDetails == 24 
          // Production ------: this.formData.showAllRoleDetails == 25 
          // UAT SERVICE REQUEST(HIERARCHY ID -- 8) AND CRM USER (HIERARCHY ID -- 10)
        // PRODUCTION SERVICE REQUEST(HIERARCHY ID -- 9) AND CRM USER (HIERARCHY ID -- 10)
          } else if (checkSum.predecessor.id == 0 && checkSum.hierarchy.id != 9 && checkSum.hierarchy.id != 10 && checkSum.hierarchy.id != 11) {
            this.$q.notify({
              type: "negative",
              color: "amber-9",
              position: "bottom",
              message: "Predecessor is mandatory"
            });
          }
          return;
        } else {
          console.log("Please review fields again. ----->",JSON.stringify(this.$v.formData.addUserDetails))
          this.$v.formData.addUserDetails.$touch();
          if (this.$v.formData.addUserDetails.$error) {
            this.$q.notify("Please review fields again.");
          } else {
            this.$q.loading.show({
              delay: 100, // ms
              message: "Please Wait",
              spinnerColor: "purple-9",
              customClass: "shadow-none"
            });
            let banksListArr = [];
            _.map(this.formData.addUserDetails.banksList, function (value) {
              banksListArr.push({ id: value });
            });
            // return;
            requestParams.banksList = banksListArr;
         
            //TO-DO Make sure when selecting hierarchy Service Clients, No other Hierarchy is selectable.
            let checkSum = _.find(requestParams.userMapSets, function (oo) {
               //  -UAT ------: this.formData.showAllRoleDetails == 24 
          // Production ------: this.formData.showAllRoleDetails == 25 
          // UAT SERVICE REQUEST(HIERARCHY ID -- 8) AND CRM USER (HIERARCHY ID -- 10)
        // PRODUCTION SERVICE REQUEST(HIERARCHY ID -- 9) AND CRM USER (HIERARCHY ID -- 10)
              return (oo.hierarchy.id == 9 || oo.hierarchy.id == 10 || oo.hierarchy.id == 11);
            });
            if (checkSum != undefined) {
              requestParams.userMapSets[0].predecessor = null;
              requestParams.userMapSets[0].region = null;
            }
              if(innerSelf.getAllUserByUserIdData.serviceReqClients != null){
                if(innerSelf.getAllUserByUserIdData.serviceReqClients.sourceId == null){
                  console.log(" after requestParams..1 ----------->", JSON.stringify(innerSelf.getAllUserByUserIdData.serviceReqClients))
                  requestParams.leadSource = this.formData.addUserDetails.leadSource == "Yes" ?{
                       sourceName:this.formData.addUserDetails.name,
                       sourceCode: this.formData.addUserDetails.name,
                       id:0
                  }:null
                } else if(innerSelf.getAllUserByUserIdData.serviceReqClients.sourceId != null){
                console.log(" after requestParams..2 ----------->", JSON.stringify(innerSelf.getAllUserByUserIdData.serviceReqClients.sourceId))
                requestParams.leadSource = this.formData.addUserDetails.leadSource == "Yes" ? {
                      sourceName: this.formData.addUserDetails.name,
                      sourceCode: this.formData.addUserDetails.name,
                      id:innerSelf.getAllUserByUserIdData.serviceReqClients.sourceId.id
                   } : null
              }
              }
            console.log("FEED_UPDATE_USER_DATA ----------->", JSON.stringify(requestParams))
            this.FEED_UPDATE_USER_DATA(requestParams)
              .then(() => {
                this.$q.loading.hide();
                this.$q.notify({
                  color: "positive",
                  position: "bottom",
                  message: "User successfully updated",
                  icon: "thumb_up"
                });
                this.$router.push("/super/admin/users/");
              })
              .catch(error => {
                this.$q.loading.hide();
                this.$q.notify({
                  type: "warning",
                  color: "amber-9",
                  position: "bottom",
                  message: error.data.message
                });
              });
          }
        }
      }
    }
  }
};
</script>
