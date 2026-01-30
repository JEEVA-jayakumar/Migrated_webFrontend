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
              <q-input v-model.trim="formData.addUserDetails.email" class="text-weight-regular text-grey-8"
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
              <q-select :disable="item.id>7" display-value  color="grey-9"
                :placeholder="item.predecessor.length == 0 ? 'No data available to display' : 'Choose a predecessor'"
                v-model="item.predecessorChecked" :options="item.predecessor" />
            </div>
          </div>
          <div v-if="formData.showBankOpsList" class="row gutter-sm q-py-sm">
            <div class="col-md-6">
              <q-select multiple color="grey-9" float-label="Choose bank (can be multiple)"
                v-model="formData.addUserDetails.banksList" :error="$v.formData.addUserDetails.banksList.$error"
                @blur="$v.formData.addUserDetails.banksList.$touch" :options="leadSourceOptions" />
            </div>
          </div>
          <!-- {{item.predecessor}} -->
          <!-- {{item}} && item.roles[0].value == 28-->
          <!--UAT ------: this.formData.showAllRoleDetails == 24 -->
          <!--Production ------: this.formData.showAllRoleDetails == 25 -->
          <div v-if="this.formData.showAllRoleDetails == 25" class="row gutter-sm q-py-sm">
            <label> Lead Source Enable? </label>
            <div class="col-md-9">

              <q-radio v-for="(item, index) in LeadSourceOptions1" :key="index" color="grey-9"
                v-model.trim="formData.addUserDetails.leadSource.sourceName"
                @blur="$v.formData.addUserDetails.leadSource.sourceName.$touch"
                :error="$v.formData.addUserDetails.leadSource.sourceName.$error" :val="item.value"
                :label="item.label" />
            </div>
          </div>
          <div v-if="formData.showLeadSource" class="row gutter-sm q-py-sm">
            <div class="col-md-6">
             <q-field helper="Token, Basic, Barrier" >
              <q-input v-model.trim="formData.addUserDetails.serviceReqClients.authMethod"
                @blur="$v.formData.addUserDetails.serviceReqClients.authMethod.$touch"
                :error="$v.formData.addUserDetails.serviceReqClients.authMethod.$error"
                class="text-weight-regular text-grey-8" color="grey-9" float-label="Auth Method"
                placeholder="Auth Method" /></q-field>
            </div>
            <div class="col-md-6">
            <q-field helper="Authorization">
              <q-input v-model.trim="formData.addUserDetails.serviceReqClients.authKey"
                @blur="$v.formData.addUserDetails.serviceReqClients.authKey.$touch"
                :error="$v.formData.addUserDetails.serviceReqClients.authKey.$error"
                class="text-weight-regular text-grey-8" color="grey-9" float-label="Auth Key " placeholder="Auth Key" />
            </q-field>
            </div>
            <div class="col-md-6">
            <q-field helper="Encrypted Data">
              <q-input v-model.trim="formData.addUserDetails.serviceReqClients.authValue"
                @blur="$v.formData.addUserDetails.serviceReqClients.authValue.$touch"
                :error="$v.formData.addUserDetails.serviceReqClients.authValue.$error"
                class="text-weight-regular text-grey-8" color="grey-9" float-label="Auth Value" placeholder="Auth Value" />
            </q-field>
            </div>
            <div class="col-md-6">
            <q-field helper="callBackUrl">
              <q-input v-model.trim="formData.addUserDetails.serviceReqClients.callBackUrl"
                @blur="$v.formData.addUserDetails.serviceReqClients.callBackUrl.$touch"
                :error="$v.formData.addUserDetails.serviceReqClients.callBackUrl.$error"
                class="text-weight-regular text-grey-8" color="grey-9" float-label="URL" placeholder="URL" />
            </q-field>
            </div>
          </div>
        </div>
        <!-- <pre>{{leadSourceOptions}}</pre> -->
        <div class="full-width group" align="right">
          <q-btn flat size="md" class="bg-white text-weight-regular text-grey-8" @click="$router.go(-1)">Cancel</q-btn>
          <q-btn size="md" type="button" color="purple-9" @click="fnSubmitShowAddUser(formData.addUserDetails)">Submit
          </q-btn>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import {
  required,
  requiredIf,
  email,
  minLength,
  maxLength,
  alpha,
  alphaNum,
  numeric
} from "vuelidate/lib/validators";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      leadSourceOptions: [],
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
      // showAllRoleDetails: {},


      formData: {
        showBankOpsList: false,
        showLeadSource: false,
        showAllRoleDetails: false,
        disableRegionSelection: false,

        addUserDetails: {
          hasReadPermission: false,
          hasWritePermission: false,
          hasDeletePermission: false,
          hasEditPermission: false,
          hasDownloadPermission: false,

          banksList: [],
          banksListTitle: [],
          region: {
            id: ""
          },
          leadSource: {
            sourceName: null
          },
          dynamicDataBinding: "",
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
          stateTemp: [],
          //**** TODO change it has static values brooo
          latitude: 13.25,
          longitude: 80.25,
          serviceReqClients: {
            authMethod: null,
            authKey: null,
            authValue: null,
            callBackUrl: null,
          },
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
        region: {
          id: {
            required: requiredIf(function () {
              return this.formData.disableRegionSelection === false;
            })
          }
        },
        banksList: {
          required: requiredIf(function () {
            return this.formData.showBankOpsList;
          }),
          minLength: minLength(1)
        },
        leadSource: {
          sourceName: {
            required: requiredIf(function () {
              return (this.formData.showAllRoleDetails == 25) === true;
            })
          }


        },
        serviceReqClients: {
          authMethod: {
            required: requiredIf(function () {
              return this.formData.showLeadSource === true;
            })
          },
          authKey: {
            required: requiredIf(function () {
              return this.formData.showLeadSource === true;
            })
          },
          authValue: {
            required: requiredIf(function () {
              return this.formData.showLeadSource === true;
            })
          },
          callBackUrl: {
            required: requiredIf(function () {
              return this.formData.showLeadSource === true;
            })
          },
        },
      }
    }
  },

  created() {
    /* START: Load all States */
    this.ajaxLoadDataForAllStatesList();
    /* End: Load all States */

    /* START: Load user table data filter > Hierarchy */
    this.ajaxLoadDataForHeirarchyFilter();
    /* End: Load user table data filter > Hierarchy */

    /* START: Load user table data filter > Regions */
    this.ajaxLoadDataForRegionsFilter();
    this.ajaxLoadDataForBankListFilter();
    /* End: Load user table data filter > Regions */
  },

  computed: {
    ...mapGetters("SuperAdminUsers", [
      "getAllRoles",
      "getAllUsers",
      "getAllRegionsData",
      "getAllHierarchiesData",
      "getAllStatesData",
      "getAllHierarchiesAndRolesData",
      "getPredecessorByRoleHierarchyData"
    ]),
    ...mapGetters("BankOpsShortLead", ["getSelectOptionsLeadSourceInfo"]),

    //  fndisable: function(){
    //             console.log("this.getAllHierarchiesAndRolesData --->",JSON.stringify(this.getAllHierarchiesAndRolesData))
    //             let size = this.getAllHierarchiesAndRolesData.length;
    //            console.log("this.getAllHierarchiesAndRolesData.length --------->", JSON.stringify(this.getAllHierarchiesAndRolesData.length))
    //         if(this.getAllHierarchiesAndRolesData.checked == true ){
    //                     console.log("this.enable details --------->", JSON.stringify(this.getAllHierarchiesAndRolesData))
    //                     return false;
    //                 } else{
    //                     console.log("this.disable details --------->", JSON.stringify(this.getAllHierarchiesAndRolesData))
    //                     return true;
    //                       }
               
            //   for(var i=0; i<this.getAllHierarchiesAndRolesData.length; i++){
            //   console.log("this.getAllHierarchiesAndRolesData.length --------->", JSON.stringify(this.getAllHierarchiesAndRolesData.length))
            //   //  if(this.getAllHierarchiesAndRolesData[i].checked == true){
            //         if(this.getAllHierarchiesAndRolesData[7].checked == true || this.getAllHierarchiesAndRolesData[8].checked == true){
            //             console.log("this.enable details --------->", JSON.stringify(this.getAllHierarchiesAndRolesData[i]))
            //             return true;
            //         } else{
            //             console.log("this.enable details --------->", JSON.stringify(this.getAllHierarchiesAndRolesData[i]))
            //             return false;
            //               }
               
    //         //     // }else{
    //         //     // console.log("this. disable --------->", JSON.stringify(this.getAllHierarchiesAndRolesData[i]))
    //         //     //     return false
    //         //     // }
    //         // }
    //           //  if(this.item.predecessorChecked > 0){
    //           //   console.log("this.listAllSubTidDetails[i] details --------->", JSON.stringify(this.getAllHierarchiesAndRolesData[i]))
    //           //      return true
    //           //   }else{
    //           //       return false
    //           //   }
            // }
  },

  methods: {
    ...mapActions("SuperAdminUsers", [
      "FETCH_ALL_USERS_DATA",
      "FEED_USER_DATA",
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

    /* Pincode search result */
    bankListSearch(terms, done) {
      done(this.COMMON_FILTER_FUNCTION(this.leadSourceOptions, terms));
    },
    bankListSelected(item) {
      let self = this;
      self.formData.addUserDetails.banksListTitle = [];
      self.formData.addUserDetails.banksList.push(item);
      _.map(self.formData.addUserDetails.banksList, function (oo) {
        self.formData.addUserDetails.banksListTitle.push(oo.label);
      });
    },
    /* Pincode search result */

    ajaxLoadDataForHeirarchyFilter() {
      this.FETCH_ALL_HIERARCHIES_ROLES_DATA();
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
    //item.predecessor
    fnSubmitShowAddUser(reqData) {
      console.log("fnSubmitShowAddUser--------->", JSON.stringify(reqData));
      let requestParams = this.formData.addUserDetails;
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
            }
          };
          cookedArr.push(assumeObj);
        }
      });

      requestParams.userMapSets = cookedArr;
      console.log("cookedArr----------->", JSON.stringify(requestParams))
      if (requestParams.userMapSets.length == 0) {
        this.$q.notify({
          color: "amber-9",
          position: "bottom",
          message: "Role mapping is mandatory",
          icon: "warning"
        });
        return false;
      } else {
        console.log("SUBMITTING THE CHECKSUM VALUES-1234------->", JSON.stringify(requestParams.userMapSets))
        let checkSum = _.find(requestParams.userMapSets, function (oo) {
          // console.log("SUBMITTING THE CHECKSUM VALUES-------->",JSON.stringify(oo))
          return (oo.hierarchy.id == 0 || oo.role.id == 0 || oo.predecessor.id == 0);
        });
        console.log(" THE CHECKSUM VALUES-------->", JSON.stringify(checkSum))
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
          this.$v.formData.addUserDetails.$touch();
          if (this.$v.formData.addUserDetails.$error) {
            this.$q.notify("Please review fields again.");
          } else {
            // let param={
            //   sourceName: this.formData.addUserDetails.name
            // };
            // console.log("SOURCE NAME------------>",JSON.stringify(param))
            // this.CREATE_LEAD_SOURCE(param);
            let banksListArr = [];
            _.map(requestParams.banksList, function (oo) {
              banksListArr.push({ id: oo });
            });
            requestParams.banksList = banksListArr;
            console.log(" before requestParams ----------->", JSON.stringify(requestParams))
            // requestParams.leadSource = requestParams.leadSource.sourceName == "Yes" ? this.formData.addUserDetails.name : null;
            requestParams.leadSource = requestParams.leadSource.sourceName == "Yes" ? {
              sourceName: requestParams.name,
              sourceCode: requestParams.name
            } : null;
            requestParams.serviceReqClients = requestParams.serviceReqClients.authMethod != null && requestParams.serviceReqClients.authKey != null && requestParams.serviceReqClients.authValue != null && requestParams.serviceReqClients.callBackUrl != null ? {
              authMethod: requestParams.serviceReqClients.authMethod,
              authKey: requestParams.serviceReqClients.authKey,
              authValue: requestParams.serviceReqClients.authValue,
              callBackUrl: requestParams.serviceReqClients.callBackUrl,
            } : null;
            console.log(" after requestParams ----------->", JSON.stringify(requestParams))
            //TO-DO Make sure when selecting hierarchy Service Clients, No other Hierarchy is selectable.
             // UAT SERVICE REQUEST(HIERARCHY ID -- 8) AND CRM USER (HIERARCHY ID -- 10)
        // PRODUCTION SERVICE REQUEST(HIERARCHY ID -- 9) AND CRM USER (HIERARCHY ID -- 10)
            let checkSum = _.find(requestParams.userMapSets, function (oo) {
              // console.log("SUBMITTING THE CHECKSUM VALUES-------->",JSON.stringify(oo))
              return (oo.hierarchy.id == 9 || oo.hierarchy.id == 10 || oo.hierarchy.id == 11);
            });
            if (checkSum != undefined)
              requestParams.userMapSets[0].predecessor = null;

            // requestParams.serviceReqClients.name = this.formData.addUserDetails.name;
            // console.log("addUserDetails userMapSets -------->", JSON.stringify(requestParams.userMapSets))
            // requestParams.serviceReqClients.clientType =requestParams.userMapSets[0].role.id == 28 ? "External" : "Internal";
            this.$q.loading.show({
              delay: 100, // ms
              message: "Please Wait",
              spinnerColor: "purple-9",
              customClass: "shadow-none"
            });
            this.FEED_USER_DATA(requestParams)
              .then(() => {
                this.$q.loading.hide();
                this.$q.notify({
                  color: "positive",
                  position: "bottom",
                  message: "User successfully created",
                  icon: "thumb_up"
                });
                this.$router.push("/super/admin/users/");
                this.$q.loading.hide();
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
    },

    // Function to get all predeccsor list
    getPredecessorList(item) {
      console.log("ROLE DETAILS--------->", JSON.stringify(item))

      let formData = {
        region: {
          id: this.formData.addUserDetails.region.id
        },
        role: {
          id: item.roleChecked
        }
      };
      this.formData.showAllRoleDetails = formData.role.id;
      // this.showAllRoleDetails = formData
      console.log("ROLE formData-------->", JSON.stringify(formData))
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
            color: "negative",
            position: "bottom",
            message: error.body.message == null ? "Please Try Again Later !" : error.body.message,
            icon: "thumb_down"
          });
        });
    },
    getRoleCheckedItem(request) {
       this.$q.loading.hide();
      console.log("checksum request : ---------->", JSON.stringify(request))
      let self = this;
      let checksum = _.find(self.getAllHierarchiesAndRolesData, function (oo) {
        return oo.hierarchyCode == self.$HIERARCHY_BANKS_OPS && oo.checked;
      });
      console.log("checksum : ---------->", JSON.stringify(checksum))
      let checksum1 = _.find(self.getAllHierarchiesAndRolesData, function (oo) {
        console.log("checksum 1  : ---------->", oo)
        return oo.hierarchyCode == self.$HIERARCHY_SERVICE_CLIENTS && oo.checked;
      });
      console.log("checksum 1 : ---------->", JSON.stringify(checksum1))
      let checksum2 = _.find(self.getAllHierarchiesAndRolesData, function (oo) {
        console.log("checksum 2  : ---------->", oo)
        return oo.hierarchyCode == self.$HIERARCHY_CRM && oo.checked;
      });
      console.log("checksum 2 : ---------->", JSON.stringify(checksum2))
      if (checksum == undefined && checksum1 == undefined && checksum2 == undefined) {
        this.formData.showBankOpsList = false;
        this.formData.disableRegionSelection = false;
        this.formData.showLeadSource = false;
         this.$q.loading.hide(this.getRoleCheckedItem);
      }
      else if (checksum != undefined && checksum1 == undefined && checksum2 == undefined) {
        this.formData.showBankOpsList = true;
        this.formData.disableRegionSelection = true;
        this.formData.showLeadSource = false;
         this.$q.loading.hide(this.getRoleCheckedItem);
      }
       else if (checksum == undefined && checksum1 != undefined && checksum2 == undefined ) {
        this.formData.showBankOpsList = false;
        this.formData.disableRegionSelection = true;
        this.formData.showLeadSource = true;
         this.$q.loading.hide(this.getRoleCheckedItem);
      }
      else if (checksum == undefined && checksum1 == undefined && checksum2 != undefined ) {
        this.formData.showBankOpsList = false;
        this.formData.disableRegionSelection = true;
        this.formData.showLeadSource = false;
         this.$q.loading.hide(this.getRoleCheckedItem);
      }
      else if (checksum != undefined && checksum1 != undefined && checksum2 == undefined ) {
        this.formData.showBankOpsList = true;
        this.formData.disableRegionSelection = true;
        this.formData.showLeadSource = true;
         this.$q.loading.hide(this.getRoleCheckedItem);
      }
      else if (checksum == undefined && checksum1 != undefined && checksum2 != undefined ) {
        this.formData.showBankOpsList = false;
        this.formData.disableRegionSelection = true;
        this.formData.showLeadSource = true;
         this.$q.loading.hide(this.getRoleCheckedItem);
      }
      else if (checksum != undefined && checksum1 == undefined && checksum2 != undefined ) {
        this.formData.showBankOpsList = true;
        this.formData.disableRegionSelection = true;
        this.formData.showLeadSource = false;
         this.$q.loading.hide(this.getRoleCheckedItem);
      }
      else if (checksum != undefined && checksum1 != undefined && checksum2 != undefined ) {
        this.formData.showBankOpsList = true;
        this.formData.disableRegionSelection = true;
        this.formData.showLeadSource = true;
         this.$q.loading.hide(this.getRoleCheckedItem);
      }

      // else {
      //   if (checksum != undefined) {
      //      this.$q.loading.hide(this.getRoleCheckedItem);
      //     this.formData.showBankOpsList = true;
      //   } else if (checksum1 != undefined) {
      //      this.$q.loading.hide(this.getRoleCheckedItem);
      //     this.formData.showLeadSource = true;
      //   }
      //    else if (checksum2 != undefined) {

      //     this.formData.disableRegionSelection = true;
      //   } 

      //   this.formData.disableRegionSelection = true;
      // }
      // else {
      //     this.formData.disableRegionSelection = false;
      //   }
    }
  }
};
</script>
