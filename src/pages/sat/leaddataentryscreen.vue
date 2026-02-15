<template>
  <q-page>
    <div class="text-grey-9">
      <div class="row bottom-border q-pa-sm items-center">
        <div class="col">
          <q-tabs class="shadow-1" color="white" align="justify" v-model="shortlead"  @select="goToSelectedTab">
            <q-tab name="shortlead" color="black" label="Short Lead" slot="title" />
            <q-tab name="wiplead" color="black" label="WIP Lead" slot="title" @input="fetchappData" />
            <q-tab-panel name="shortlead">
              <div>
                <div class="col-md-6 q-my-md" align="right">
                  <div class="col group"></div>
                </div>
                <div class="col-12 text-h6 q-my-lg text-weight-regular">
                  Lead Information
                </div>
                <form>
                  <div class="q-px-md">
                    <div class="q-pa-md">
                      <div class="row gutter-sm q-py-sm">
                        <div class="col-md-6">
                          <q-input v-model.trim="formData.leadName" @blur="$v.formData.leadName.$touch"
                            :error="$v.formData.leadName.$error" class="text-weight-regular text-grey-8" color="grey-9"
                            float-label="*Merchant Name" placeholder="Merchant Name" />
                        </div>
                        <div class="col-md-6">
                          <q-input v-model.trim="formData.contactName" @blur="$v.formData.contactName.$touch"
                            :error="$v.formData.contactName.$error" class="text-weight-regular text-grey-8"
                            float-label="*Contact Name" placeholder="Contact Name" />
                        </div>
                        <div class="col-md-6">
                          <q-input type="number" onkeydown="javascript: return event.keyCode === 8 ||
                            event.keyCode === 46 ? true : !isNaN(Number(event.key))"
                            v-model.trim="formData.contactNumber" class="text-weight-regular text-grey-8" color="grey-9"
                            @blur="$v.formData.contactNumber.$touch" :error="$v.formData.contactNumber.$error"
                            float-label="*Contact Number" placeholder="Contact Number" />
                        </div>

                        <div class="col-md-6">
                          <q-input type="number" onkeydown="javascript: return event.keyCode === 8 ||
                             event.keyCode === 46 ? true : !isNaN(Number(event.key))"
                            v-model.trim="formData.alternateContactNumber" class="text-weight-regular text-grey-8"
                            color="grey-9" float-label="*Alternate Contact Number"
                            placeholder="Alternate Contact Number" />
                        </div>
                        <!-- @blur="$v.formData.alternateContactNumber.$touch"
                        :error="$v.formData.alternateContactNumber.$error"-->

                        <div class="col-md-6">
                          <q-input v-model.trim="formData.email" @blur="$v.formData.email.$touch"
                            :error="$v.formData.email.$error" class="text-weight-regular text-grey-8" color="grey-9"
                            float-label="*Mail_Id" placeholder="Mail_Id" />
                        </div>
                        <div class="col-md-6">
                          <q-input v-model.trim="formData.leadAddress" @blur="$v.formData.leadAddress.$touch"
                            :error="$v.formData.leadAddress.$error" class="text-weight-regular text-grey-8"
                            color="grey-9" float-label="*Merchant Address" placeholder="Merchant Address" />
                        </div>
                        <div class="col-md-6">
                          <q-input type="number" onkeydown="javascript: return event.keyCode === 8 ||
                             event.keyCode === 46 ? true : !isNaN(Number(event.key))"
                            :error="$v.formData.pincodeTemp.$error"
                            @blur="fnClrPin"
                            clearable color="grey-9" v-model.trim="formData.pincodeTemp" float-label="Pincode"
                            placeholder="Pincode">
                            <q-autocomplete @search="pincodeSearch" :debounce="500" :min-characters="1"
                              @selected="pincodeSelected" />
                          </q-input>
                        </div>
                        <!-- @clear="fnGetCityAndState" -->
                        <div class="col-md-6">
                          <q-input disable v-model.trim="formData.state" @blur="$v.formData.state.$touch"
                            :error="$v.formData.state.$error" class="text-weight-regular text-grey-8" color="grey-9"
                            float-label="State" placeholder="State" />
                        </div>
                        <div class="col-md-6">
                          <q-input disable v-model.trim="formData.city" @blur="$v.formData.city.$touch"
                            :error="$v.formData.city.$error" class="text-weight-regular text-grey-8" color="grey-9"
                            float-label="City/Down" placeholder="City/Down" />
                        </div>
                        <div class="col-md-6">
                          <q-select v-model.trim="formData.region" @blur="$v.formData.region.$touch"
                            :error="$v.formData.region.$error" class="text-weight-regular text-grey-8" color="grey-9"
                            float-label="Select Region" placeholder="Select Region" :options="dropDown.regionOptions" />
                        </div>
                        <div class="col-md-6">
                          <q-select v-model.trim="formData.leadSource" @blur="$v.formData.leadSource.$touch"
                            :error="$v.formData.leadSource.$error" class="text-weight-regular text-grey-8"
                            color="grey-9" float-label="Lead Source" placeholder="Lead Source"
                            :options="dropDown.leadSourceOptions" @input="getDevice" />
                        </div>
                        <div class="col-md-6">
                          <q-select v-model.trim="formData.device" @input="devSelected"
                            :error="$v.formData.device.$error" class="text-weight-regular text-grey-8" color="grey-9"
                            float-label="Device Type" placeholder="Device Type" :options="dropDown.deviceOptions" />
                        </div>

                        <div class="col-md-6">
                          <q-option-group inline type="checkbox"     :value="selectedVas"
                              @input="handleVasChange" :disable = "vasDisableFlag"
                            class="text-weight-regular text-grey-8" color="grey-9" float-label="VAS"
                            :options="selectBankEnableOptions" />
                        </div>
                        <!-- <div
                             v-if="this.selectedVas == 'AMEX'"
                             class="row gutter-sm q-my-xs col-md-6 "
                             > -->
                        <div v-if="this.selectedVas == 'AMEX'" class="col-md-6">
                          <q-input v-model.trim="formData.ownerFirstName" @blur="$v.formData.ownerFirstName.$touch"
                            :error="$v.formData.ownerFirstName.$error" class="text-weight-regular text-grey-8"
                            color="grey-9" float-label="Owner 1 First Name*" placeholder="Owner 1 First Name*" />
                        </div>
                        <div v-if="this.selectedVas == 'AMEX'" class="col-md-6">
                          <q-input v-model.trim="formData.ownerLastName" @blur="$v.formData.ownerLastName.$touch"
                            :error="$v.formData.ownerLastName.$error" class="text-weight-regular text-grey-8"
                            color="grey-9" float-label="Owner 1 Last Name*" placeholder="Owner 1 Last Name*" />
                        </div>
                        <div v-if="this.selectedVas == 'AMEX'" class="col-md-6">
                          <!-- <q-input
                                format="DD/MM/YYYY"
                                 format-model="number"
                                 color="grey-9"
                                 modal
                                v-model.trim="formData.ownerDOB"
                            @blur="$v.formData.ownerDOB.$touch"
                            :error="$v.formData.ownerDOB.$error"
                               float-label="Owner 1 DOB*"
                    placeholder="Owner 1 DOB*"
                  /> -->
                          <q-input v-model.trim="formData.ownerDOB" @blur="$v.formData.ownerDOB.$touch"
                            :error="$v.formData.ownerDOB.$error" class="text-weight-regular text-grey-8" color="grey-9"
                            float-label="Owner 1 DOB*" placeholder="Owner 1 DOB*" />
                        </div>

                        <!-- </div> -->
                        <div class="col-md-6">
                          <q-input v-model.trim="formData.deviceCount" @blur="$v.formData.deviceCount.$touch" 
                          :disable="deviceFlag"
                            :error="$v.formData.deviceCount.$error" class="text-weight-regular text-grey-8"
                            color="grey-9" @keydown="nameKeydown($event)" @keyup="trackChange" float-label="Device Count" placeholder="Device Count" />
                        </div>

                      </div>
                    </div>
                  </div>
                  <div class="full-width group" align="center">
                    <q-btn size="md" type="button" color="purple-9" @click="fnSubmitBankDetails(formData)">Submit
                    </q-btn>
                  </div>
                </form>
              </div>
            </q-tab-panel>
            <q-tab-panel name="wiplead" @input="fetchappData">
              <div>
                <!-- <q-pull-to-refresh :distance="30" :handler="PullToRefresh" inline> -->
                <q-table class="my-sticky-header-table" title="Wip Lead Information" :rows="getShortLead"
                  :columns="columns" row-key="name">
                  <q-td v-slot:body-cell-shortleadDate="props" :props="props">{{ props.row.shortleadDate |
                      moment("Do MMM Y")
                  }}</q-td>

                  <!-- <q-td v-slot:body-cell-action="props" :props="props">
                    <div class="row no-wrap no-padding">
                      <q-btn
                        dense
                        no-caps
                        no-wrap
                        label="Convert Wip Lead"
                        icon="far fa-plus-square"
                        size="md"
                        @click="fnShowEditShortLead(props.row)"
                        flat
                        class="text-light-blue"
                  ></q-btn>-->
                  <!-- <q-btn  dense no-caps no-wrap label="Disable" icon="far fa-minus-square" size="md" @click="fnDisablePermission(props.row.id)" flat class="text-negative">
                  </q-btn>-->
                  <!-- </div>
                  </q-td>-->
                  <q-td v-slot:body-cell-update="props" :props="props">
                    <div class="row no-wrap no-padding">
                      <q-btn dense no-caps no-wrap label="update" icon="far fa-plus-square" size="md"
                        @click="fnShowConvertToSat(props.row)" flat class="text-light-blue"></q-btn>
                      <!-- <q-btn  dense no-caps no-wrap label="Disable" icon="far fa-minus-square" size="md" @click="fnDisablePermission(props.row.id)" flat class="text-negative">
                      </q-btn>-->
                    </div>
                  </q-td>
                  <!-- <q-td v-slot:body-cell-status="props" :props="props">
            <span class="label text-negative" v-if="props.row.status == $TRANSACTION_STATUS">Pending</span>
            <span class="label text-positive" v-else-if="props.row.status">Success</span>
            <span class="label text-amber" v-else>NA</span>
                  </q-td>-->
                </q-table>
                <editShortLead v-if="propShowEditShortLead" :propShowEditShortLead="propShowEditShortLead"
                  :propRowDetails="propRowDetails" @emitfnshowEditShortLead="fnShowEditShortLead"></editShortLead>
                <convertToSat 
                v-if="propShowConvertToSat" 
                :propShowConvertToSat="propShowConvertToSat"
                  :propRowDetails="propRowDetails" 
                  @emitEditshowConvertToSat="fnShowConvertToSat"
                  ></convertToSat>
                <!-- </q-pull-to-refresh> -->
              </div>
            </q-tab-panel>
          </q-tabs>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import editShortLead from '../../components/sat/editShortLead.vue'
import convertToSat from '../../components/sat/convertToSat.vue'
import {
  required,
  requiredIf,
  minLength,
  maxLength,
  email
} from '@vuelidate/validators'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'inventoryAllocation',
  components: {
    editShortLead,
    convertToSat
  },
  data() {
    return {
      propShowEditShortLead: false,
      propShowConvertToSat: false,
      vasDisableFlag:false,
      propRowDetails: '',
      shortlead: 'shortlead',
      propShowCreateUploadFile: false,
      deviceFlag:false,
      leadSourceOptions: [],
      regionOptions: [],
      deviceSet: [],
      cashAtPosEnabled: 1,
      upiFlag: '',
      intlCardACardAcceptance: 1,
      preauthEnabled: 'N',
      linkpaymentFlag: '',
      categoryType: '',
      matmEnabled: '',
      txnEmiAllowed: 1,
      sodexoEnabled: 1,
      amexEnabled: 1,
      bqrEnabled: 1,
      vasInstanceMapping: '',
      selectBankEnableOptions: [],
      selectedVas: [],
      // ownerFirstName:[],
      pinSelected: false,
      formData: {
        leadName: '',
        contactName: '',
        contactNumber: '',
        alternateContactNumber: '',
        email: '',
        deviceSelected: '',
        leadAddress: '',
        region: '',
        pincode: '',
        pincodeTemp: '',
        state: '',
        city: '',
        leadSource: '',
        device: '',
        vasInstanceMapping: '',
        deviceCount: '',
        ownerFirstName: '',
        ownerLastName: '',
        ownerDOB: '',

        data: ''
        //  vas:"Y",
        //   vas1:"Y",
        //     ICA:"Y",
        //      PREAUTH:"Y",
        //      device:"",
      },
      columns: [
        {
          name: 'leadName',
          label: 'leadName',
          field: 'leadName',
          align: 'center',
          sortable: true
        },
        {
          name: 'leadNumber',
          label: 'leadNumber',
          field: 'leadNumber',
          align: 'center',
          sortable: true
        },
        {
          name: 'contactNumber',
          label: 'contactNumber',
          field: 'contactNumber',
          align: 'center',
          sortable: true
        },
        // {
        //   name: "id",
        //   label: "id",
        //   field: "id",
        //   align: "center",
        //   sortable: true
        // },
        {
          name: 'shortleadDate',
          label: 'shortleadDate',
          field: 'shortleadDate',
          align: 'center',
          sortable: true
        },

        // {
        //   name: "action",
        //   required: true,
        //   label: "Convert Wip Lead",
        //   align: "left",
        //   field: "action",
        //   sortable: false
        // },
        {
          name: 'update',
          required: true,
          label: 'submit to sat',
          align: 'left',
          field: 'action',
          sortable: false
        }
      ],
      dropDown: {
        deviceOptions: [],
        leadSourceOptions: [],
        regionOptions: [],
      }
    }
  },
  validations: {
    formData: {
      leadName: {
        required
      },
      contactName: {
        required
      },
      region: {
        required
      },
      contactNumber: {
        required,
        minLength: minLength(10),
        maxLength: maxLength(10)
      },
      // alternateContactNumber: {
      //   required
      // },
      email: {
        email,
        required
      },
      leadAddress: {
        required
      },
      cashAtPosEnabled: {
        // required,
      },
      upiFlag: {
        // required,
      },
      intlCardACardAcceptance: {
        // required,
      },
      preauthEnabled: {
        // required,
      },
      linkpaymentFlag: {
        // required,
      },
      categoryType: {
        // required,
      },
      matmEnabled: {
        // required,
      },
      txnEmiAllowed: {
        // required,
      },
      sodexoEnabled: {
        // required,
      },
      amexEnabled: {
        //  required
      },
      bqrEnabled: {
        //  required
      },
      pincodeTemp: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(6)
      },
      // pincode: {
      //   required
      // },
      state: {
        required
      },
      city: {
        required
      },
      leadSource: {
        required
      },
      device: {
        required
      },
      ownerFirstName: {
        required: requiredIf(function () {
          return this.selectedVas == 'AMEX' ;
        })
      },
      ownerDOB: {
        required: requiredIf(function () {
          return this.selectedVas == 'AMEX' ;
        })
      },
      ownerLastName: {
        required: requiredIf(function () {
          return this.selectedVas == 'AMEX' ;
        })
      },
      vasInstanceMapping: {
        //  required,
      },

      deviceCount: {
        required
      }
    }
  },

  computed: {
    ...mapGetters('appDevice', ['getAllAppDevicesInfo']),
    ...mapGetters('Appvas', ['getVasDeviceMapping']),
    ...mapGetters('appLeadSource', ['getAllAppLeadSource']),
    ...mapGetters('shortLeadInfo', ['getShortLead']),
    ...mapGetters('SuperAdminUsers', ['getAllStatesData']),
    ...mapGetters("InventoryCentral", [
      "getAllInventoryDevicesTypesData",
      "getAllRegionsData",
      "getRegionBasedSO"
    ])
  },

  created() {
    /* START: Load user table data filter > DeviceTypes */
    this.appLoadData()
    this.fetchappData()
    this.trackChange()



    // this.ajaxLoadDataForAllStatesList();

    /* End: Load user table data filter > DeviceTypes */
  },


  methods: {
    ...mapActions('appDevice', ['FETCH_APP_DEVICES_DATA']),
    ...mapActions('Appvas', ['FETCH_VAS_DATAS']),
    ...mapActions('appLeadSource', ['FETCH_APP_LEADSOURCE_DATA']),
    ...mapActions('shortLead', ['STATE_SHORT_LEAD']),
    ...mapActions('shortLeadInfo', ['FETCH_SHORT_LEAD']),
    ...mapActions('SuperAdminUsers', [
      'FETCH_ALL_STATES_DATA',
      'FETCH_PINCODE_WITH_TERM'
    ]),
    ...mapActions("InventoryCentral", [
      "FETCH_ALL_INVENTORY_DEVICES_TYPES_DATA",
      "FETCH_ALL_REGIONS_DATA",
      "FETCH_REGION_BASED_SO"
    ]),
    
    trackChange() {
      this.formData.deviceCount = parseInt(this.formData.deviceCount) === 0  ? null : this.formData.deviceCount
    },
  handleVasChange(newVal) {
      let updated = [...newVal];

      const has = val => updated.includes(val);
      const had = val => this.selectedVas.includes(val); // previously selected

      // === Case 1: Unselecting EMI → remove Bank EMI + Brand EMI
      if (had('EMI') && !has('EMI')) {
        updated = updated.filter(v => v !== 'Bank EMI' && v !== 'Brand EMI');
      }

      // === Case 2: Selecting EMI → ensure Bank EMI is selected
      if (has('EMI') && !has('Bank EMI')) {
        updated.push('Bank EMI');
      }

      // === Case 3: Selecting Bank EMI → ensure EMI is selected
      if (has('Bank EMI') && !has('EMI')) {
        updated.push('EMI');
      }

      // === Case 4: Selecting Brand EMI → ensure EMI is selected (not Bank EMI)
      if (has('Brand EMI') && !has('EMI')) {
        updated.push('EMI');
      }

      this.selectedVas = [...new Set(updated)];
    },

    nameKeydown(e) {
      if (/^\W$/.test(e.key)) {
        e.preventDefault();
      }
    },

    getDevice(val) {
      self = this;
      self.FETCH_APP_DEVICES_DATA(val.id)
        .then(() => {
          // Clearing the drop down values before assigning data
          self.dropDown.deviceOptions.splice(0);
          return _.map(this.getAllAppDevicesInfo, (item) => {
            self.dropDown.deviceOptions.push({
              value: item,
              label: item.deviceName
            })
          })
        })
    },
    fnSubmitBankDetails(formData) {
      this.$v.formData.$touch()
      if (this.$v.formData.$error) {
        this.$q.notify('Please review fields again.')
      } else {
        if(this.formData.leadSource.multiTidEnabled == true){
          this.formData.deviceCount = 1;
        }
        this.formData.vasInstanceMapping = JSON.stringify(this.selectedVas)
        this.formData.region = JSON.parse(formData.region);
        // this.formData.ownerFirstName = JSON.stringify(this.formData.ownerFirstName)
        this.STATE_SHORT_LEAD(formData)
        this.shortlead = 'wiplead'
        this.fetchappData()
      }
    },
    // apploaddatas
    devSelected() {
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: 'purple-9',
        message: 'Fetching data ..'
      })
      let self = this
      let deviceArr = []
      this.FETCH_VAS_DATAS(this.formData.device.id).then((response) => {
        // eslint-disable-next-line eqeqeq
        if (response.status == 200) {
          this.$q.loading.hide()
          self.getVasDeviceMapping.map(function (value, key) {
            deviceArr.push({
              label: value.vas.name,
              value: value.vas.name
            })
          })
          this.selectBankEnableOptions = deviceArr
          console.log("Q161_PRO_DQR",JSON.stringify(this.selectBankEnableOptions))
       if(this.formData.device.deviceName == "Q161_PRO_DQR"){        
        const upiOption = this.selectBankEnableOptions.find(opt => opt.label === "UPI QR");
        this.vasDisableFlag = true
        if (upiOption) {
          this.selectedVas = [upiOption.value]; // Must be array for checkbox
           console.log("DEVICE TYPE=================>>>>>>>>>",this.selectedVas)
        }
      } else {
        this.selectedVas = [];
         this.vasDisableFlag = false
      }
      if(this.formData.device.deviceName == "Q161_PRO_SQR"){
         this.formData.deviceCount = ""
         this.formData.deviceCount = 1
         this.deviceFlag = true
      }else {
       this.deviceFlag = false
      }
        
        } else {
          this.$q.loading.hide()
          this.$q.notify({
            color: 'negative',
            position: 'bottom-left',
            message: 'Invalid VAS!',
            icon: 'clear'
          })
          //  this.formData.vasInstanceMapping = "";
          this.formData.device = ''
        }
      })
    },

    pincodeSearch(terms, done) {
      this.formData.cityName = ''
      this.formData.stateName = ''
      this.FETCH_PINCODE_WITH_TERM(terms)
        .then(() => {
          done(this.COMMON_FILTER_FUNCTION(this.getAllStatesData, terms))
        })
        .catch(() => {
          done([])
        })
    },
    pincodeSelected(item) {
      this.pinSelected = true;
      this.formData.state = item.value.stateName
      this.formData.city = item.value.cityName
      this.formData.pincode = item.value.pincode
      this.formData.pincodeTemp = item.value.pincode
    },
    fnClrPin() {
      if (!this.pinSelected)
        this.formData.pincodeTemp = ''
    },
    //  deviceSelected(item) {
    //  this.formData.deviceSelected = item.id;
    //   },
    ajaxLoadDataForAllStatesList() {
      this.FETCH_ALL_STATES_DATA()
    },
    COMMON_FILTER_FUNCTION(arraySet, terms) {
      // eslint-disable-next-line no-undef
      return _.filter(arraySet, function (oo) {
        return oo.label.toString().includes(terms.toLowerCase())
      })
    },
    fnShowEditShortLead(rowDetails) {
      this.propShowEditShortLead = !this.propShowEditShortLead
      // eslint-disable-next-line eqeqeq
      if (rowDetails != undefined) {
        this.propRowDetails = rowDetails
      }
    },
    fnShowConvertToSat(rowDetails) {
      this.propShowConvertToSat = !this.propShowConvertToSat
      // eslint-disable-next-line eqeqeq
      if (rowDetails != undefined) {
        this.propRowDetails = rowDetails
      }
    },
    appLoadData() {
      let self = this
      self.FETCH_ALL_REGIONS_DATA().then(() => {
        return _.map(self.getAllRegionsData, (item) => {
          self.dropDown.regionOptions.push({
            value: JSON.stringify(item),
            label: item.regionAreaName
          })
        })
      })

      self.FETCH_APP_LEADSOURCE_DATA().then(() => {
        if(JSON.parse(localStorage.getItem("u_i")).region.regionAreaName == 'VARANEEK'){
          return _.map(self.getAllAppLeadSource, (item) => {
          if (item.active && item.sourceName == 'VARANEEK')
          self.dropDown.leadSourceOptions.push({
          value: item,
          label: item.sourceName
     })
        })
        }else{
          return _.map(self.getAllAppLeadSource, (item) => {
          if (item.active)
          self.dropDown.leadSourceOptions.push({
          value: item,
          label: item.sourceName
     })
        })
        }
      })
    },

    fetchappData() {
      this.FETCH_SHORT_LEAD()
    },
    goToSelectedTab(tab){
      if(tab == "wiplead"){
        this.fetchappData()
      }
      else if(tab == "shortlead"){
        this.formData.leadName = ''
        this.formData.contactName = ''
        this.formData.contactNumber = '',
        this.formData.alternateContactNumber = ''
        this.formData.email = ''
        this.formData.deviceSelected = ''
        this.formData.leadAddress = ''
        this.formData.region = ''
        this.formData.pincode = ''
        this.formData.pincodeTemp = ''
        this.formData.state = ''
        this.formData.city = ''
        this.formData.leadSource = ''
        this.formData.device = ''
        this.formData.vasInstanceMapping = ''
        this.formData.deviceCount = ''
        this.formData.ownerFirstName = ''
        this.formData.ownerLastName = ''
        this.formData.ownerDOB = ''
        this.formData.data = ''     
      }
    }
  }
}
</script>

<style>
.border-1 {
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.border-2 {
  border: 3px solid rgba(48, 48, 48, 0.5);
}
</style>
