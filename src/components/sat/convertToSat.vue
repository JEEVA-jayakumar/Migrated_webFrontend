<template>
  <div>
    <q-modal
     minimized class="customModalOverlay" 
    v-model="toggleModel"
     @hide="emitfnzEditshowConvertToSat(toggleModel)"
     @escape-key="emitfnzEditshowConvertToSat(toggleModel)" 
      :content-css="{ padding: '25px', minWidth: '40vw' }">
      <form>
        <div class="column group">
          <div class="col-md-12">
            <div class="q-title text-weight-regular">Edit WIP List</div>
          </div>
          <!-- <div class="q-title text-weight-regular">Edit WIP List</div>
            <q-chip square color="secondary">{{ formData}}</q-chip> -->

          <div class="col-md-12">
            <q-input @keyup.enter="submitShortLead(formData)" v-model="formData.id"
              class="text-weight-regular text-grey-8" disable color="grey-9" float-label="leadId" placeholder="leadId" />
          </div>
          <div class="col-md-12">
            <q-input @keyup.enter="submitShortLead(formData)" v-model="formData.leadName"
              :error="$v.formData.leadName.$error" class="text-weight-regular text-grey-8" color="grey-9"
              float-label="leadName" placeholder="leadName" />
          </div>
          <div class="col-md-12">
            <q-input @keyup.enter="submitShortLead(formData)" v-model="formData.leadNumber"
              :error="$v.formData.leadNumber.$error" class="text-weight-regular text-grey-8" color="grey-9"
              float-label="leadNumber" placeholder="leadNumber" disable />
          </div>
          <!-- <div class="col-md-12">
            <q-input
              @keyup.enter="submitShortLead(formData)"
              v-model="formData.ownerFirstName"
              :error="$v.formData.ownerFirstName.$error"
              class="text-weight-regular text-grey-8"
              color="grey-9"
              float-label="Owner 1 First Name*"
              placeholder="Owner 1 First Name*"
            />
          </div> -->
          <!-- <div class="col-md-12">
            <q-input
              @keyup.enter="submitShortLead(formData)"
              v-model="formData.shortleadDate"
              :error="$v.formData.shortleadDate.$error"
              class="text-weight-regular text-grey-8"
              color="grey-9"
              float-label="shortleadDate"
              placeholder="shortleadDate"
            />
          </div>-->
          <div class="col-md-12">
            <q-input type="number" onkeydown="javascript: return event.keyCode === 8 ||
              event.keyCode === 46 ? true : !isNaN(Number(event.key))" @keyup.enter="submitShortLead(formData)"
              v-model="formData.contactNumber" :error="$v.formData.contactNumber.$error"
              class="text-weight-regular text-grey-8" color="grey-9" float-label="contactNumber"
              placeholder="contactNumber" />
          </div>
          <div class="col-md-12">
            <q-input type="number" onkeydown="javascript: return event.keyCode === 8 ||
               event.keyCode === 46 ? true : !isNaN(Number(event.key))" @keyup.enter="submitShortLead(formData)"
              v-model="formData.alternateContactNumber" class="text-weight-regular text-grey-8" color="grey-9"
              float-label="alternateContactNumber" placeholder="alternateContactNumber" />
            <!-- :error="$v.formData.alternateContactNumber.$error" -->
          </div>
          <div class="col-md-12">
            <q-input @keyup.enter="submitShortLead(formData)" v-model="formData.email" :error="$v.formData.email.$error"
              class="text-weight-regular text-grey-8" color="grey-9" float-label="email" placeholder="email" />
          </div>
          <div class="col-md-12">
            <q-input @keyup.enter="submitShortLead(formData)" v-model="formData.leadAddress"
              :error="$v.formData.leadAddress.$error" class="text-weight-regular text-grey-8" color="grey-9"
              float-label="leadAddress" placeholder="leadAddress" />
          </div>
          <div class="col-md-12">
            <q-input type="number" onkeydown="javascript: return event.keyCode === 8 ||
            event.keyCode === 46 ? true : !isNaN(Number(event.key))" @keyup.enter="submitShortLead(formData)"
              v-model="formData.pincode" :error="$v.formData.pincode.$error" class="text-weight-regular text-grey-8"
              color="grey-9" float-label="pincode" placeholder="pincode" />
          </div>
          <div class="col-md-12">
            <q-input @keyup.enter="submitShortLead(formData)" disable v-model="formData.city"
              :error="$v.formData.city.$error" class="text-weight-regular text-grey-8" color="grey-9" float-label="city"
              placeholder="city" />
          </div>
          <div class="col-md-12">
            <q-input @keyup.enter="submitShortLead(formData)" disable v-model="formData.state"
              :error="$v.formData.state.$error" class="text-weight-regular text-grey-8" color="grey-9"
              float-label="state" placeholder="state" />
          </div>
          <div class="col-md-12">Merchant Tier Mapping</div>
          <div class="col-md-12">
            <q-select color="grey-9" v-model="formData.merchantState" :error="$v.formData.merchantState.$error"
              :options="dropDown.merchantState" float-label="Select Merchant State*" @input="getdistrict" />
          </div>
          <!--  @blur="fnClrPin"  @search="searchingDistrict" :options="dropDown.merchantDistrict" :options="getMerchantTierMappingDistrictDetails" -->
          <div class="col-md-12">
            <q-select :error="$v.formData.district.$error" color="grey-9" v-model="formData.district"
              float-label="Select Merchant District*" placeholder="Select Merchant District*"
              :options="dropDown.merchantDistrict" @input="getSubDistrict">
            </q-select>
          </div>
          <!--:options="getMerchantTierMappingSubDistrictDetails" -->
          <div class="col-md-12">
            <q-select :error="$v.formData.subDistrict.$error" color="grey-9" v-model="formData.subDistrict"
              float-label="Select Merchant Sub District*" placeholder="Select Merchant Sub District*"
              :options="dropDown.merchantSubDistrict" @input="getTownOrVillage">
            </q-select>
          </div>
          <!--:options="getMerchantTierMappingTownOrVillageDetails"-->
          <div class="col-md-12">
            <q-select type="text" :error="$v.formData.village.$error" color="grey-9" v-model="formData.village"
              float-label="Select Merchant Town/Village*" placeholder="Select Merchant Town/Village*"
              :options="dropDown.merchantTownOrVillageDetails" @input="getVillageTier">
            </q-select>
          </div>
          <!--:options="getMerchantTierMappingVillageTierDetails"  :options="dropDown.merchantTierDetails"-->
          <div class="col-md-12">
            <q-input disable v-model="formData.tier" class="text-weight-regular text-grey-8" color="grey-9"
              float-label="Merchant Tier" placeholder="Merchant Tier"  />
          </div>
          <!-- <div class="col-md-12">
            <q-input v-model="formData.leadCategory" label="Lead Category" />
          </div>-->
          <div class="col-md-12">
            <q-select color="grey-9" v-model="formData.leadSource" :error="$v.formData.leadSource.$error"
              :options="dropDown.leadSourceOptions" float-label="Select lead source" @input="fnleadSource" />
          </div>
          <!-- {{formData.leadSource}} -->
          <div class="col-md-12">
            <q-select color="grey-9" v-model="formData.device" :error="$v.formData.device.$error"
              :options="dropDown.deviceOptions" float-label="Select device" @input="fnDevice" />
          </div>
          <div class="col-md-12">
            <q-input color="grey-9" v-model="formData.deviceCount"  :error="$v.formData.deviceCount.$error"
              float-label="Device Count"  :disable="deviceFlag"/>
          </div>
          <div v-if="this.plan == 'mATM'">
            <div class="col-md-12">
              <q-select color="grey-9" v-model="formData.mAtmOnboardingPlan" :options="dropDown.planNameOptions"
                float-label="Select MATM Plans" @input="fnPlanName" />
            </div>
            <div class="col-md-12">
              <q-input disable v-model.trim="formData.incentivePercentage" class="text-weight-regular text-grey-8"
                color="grey-9" float-label="*percentage" placeholder="percentage" />
            </div>
            <div class="col-md-12">
              <q-input disable v-model.trim="formData.minTxnVal" class="text-weight-regular text-grey-8" color="grey-9"
                float-label="*minimum" placeholder="minimum" />
            </div>

            <div class="col-md-12">
              <q-input disable v-model.trim="formData.maxIncPerTxn" class="text-weight-regular text-grey-8"
                color="grey-9" float-label="*maximumTxnValue" placeholder="maximumTxnValue" />
            </div>
          </div>

          <div class="col-md-12">
            <q-select color="grey-9" v-model="formData.merchantCategory" :error="$v.formData.merchantCategory.$error"
              :options="dropDown.merchantCategory" float-label="Select merchant category type"
              @input="fnMerchantCategory" />
          </div>
           <div class="col-md-12">
            <q-select color="grey-9" 
            v-model="mdrPlan"
              :options="dropDown.mdrOptions" float-label="Select MDR Plan"
              @input="fnFillMdr(mdrPlan)" />
          </div>

          <div class="col-md-12">
            <q-input disable v-model.trim="formData.debitLessthanAmount" :error="$v.formData.debitLessthanAmount.$error"
              class="text-weight-regular text-grey-8" color="grey-9" float-label="*debitLessthanAmount"
              placeholder="debitLessthanAmount" />
          </div>
          <div class="col-md-12">
            <q-input disable v-model.trim="formData.debitGreaterthanAmount"
              :error="$v.formData.debitGreaterthanAmount.$error" class="text-weight-regular text-grey-8" color="grey-9"
              float-label="*debitGreaterthanAmount" placeholder="debitGreaterthanAmount" />
          </div>
          <div class="col-md-12">
            <q-input disable v-model.trim="formData.stdCC" :error="$v.formData.stdCC.$error"
              class="text-weight-regular text-grey-8" color="grey-9" float-label="*stdCC" placeholder="stdCC" />
          </div>
          <div class="col-md-12">
            <q-input disable v-model.trim="formData.premiumCC" :error="$v.formData.premiumCC.$error"
              class="text-weight-regular text-grey-8" color="grey-9" float-label="*premiumCC" placeholder="premiumCC" />
          </div>
          <div class="col-md-12">
            <q-input disable v-model.trim="formData.corpCC" :error="$v.formData.corpCC.$error"
              class="text-weight-regular text-grey-8" color="grey-9" float-label="*corpCC" placeholder="corpCC" />
          </div>
          <div class="col-md-12">
            <q-input disable v-model.trim="formData.intlCC" :error="$v.formData.intlCC.$error"
              class="text-weight-regular text-grey-8" color="grey-9" float-label="*intlCC" placeholder="intlCC" />
          </div>
          <div class="col-md-12">
            <q-input disable v-model.trim="formData.superPremiumlCC" :error="$v.formData.superPremiumlCC.$error"
              class="text-weight-regular text-grey-8" color="grey-9" float-label="*superPremiumlCC"
              placeholder="superPremiumlCC" />
          </div>
          <div class="col-md-12">
            <q-input disable v-model.trim="formData.amexDomestic" :error="$v.formData.amexDomestic.$error"
              class="text-weight-regular text-grey-8" color="grey-9" float-label="*amexDomestic"
              placeholder="amexDomestic" />
          </div>
          <div class="col-md-12">
            <q-input disable v-model.trim="formData.amexInternational" :error="$v.formData.amexInternational.$error"
              class="text-weight-regular text-grey-8" color="grey-9" float-label="*amexInternational"
              placeholder="amexInternational" />
          </div>
           <div class="col-md-12">
            <q-input disable v-model.trim="formData.upiDebitCardUpTo2000" :error="$v.formData.upiDebitCardUpTo2000.$error"
              class="text-weight-regular text-grey-8" color="grey-9" float-label="*upiDebitCardUpTo2000"
              placeholder="upiDebitCardUpTo2000" />
          </div>
          <div class="col-md-12">
            <q-input disable v-model.trim="formData.upiDebitCardAbove2000" :error="$v.formData.upiDebitCardAbove2000.$error"
              class="text-weight-regular text-grey-8" color="grey-9" float-label="*upiDebitCardAbove2000"
              placeholder="upiDebitCardAbove2000" />
          </div>

           <div class="col-md-12">
            <q-input disable v-model.trim="formData.upiPrepaidCreditCardsUpTo2000" :error="$v.formData.upiPrepaidCreditCardsUpTo2000.$error"
              class="text-weight-regular text-grey-8" color="grey-9" float-label="*upiPrepaidCreditCardsUpTo2000"
              placeholder="upiPrepaidCreditCardsUpTo2000" />
          </div>
          <div class="col-md-12">
            <q-input disable v-model.trim="formData.upiPrepaidCreditCardsAbove2000" :error="$v.formData.upiPrepaidCreditCardsAbove2000.$error"
              class="text-weight-regular text-grey-8" color="grey-9" float-label="*upiPrepaidCreditCardsAbove2000"
              placeholder="upiPrepaidCreditCardsAbove2000" />
          </div>
          <div class="col-md-12">
            <q-select color="grey-9" v-model="formData.plan" :error="$v.formData.plan.$error"
              :options="getLeadSourceRental" float-label="Select plan" placeholder="Plan" @input="fnPlan" />
          </div>

          <div class="col-md-12">
            <q-input disable v-model.trim="formData.setupFees" :error="$v.formData.setupFees.$error"
              class="text-weight-regular text-grey-8" color="grey-9" float-label="*setUp fees"
              placeholder="setUp fees" />
          </div>
          <div class="col-md-12">
            <q-input disable v-model.trim="formData.recurringFees" :error="$v.formData.recurringFees.$error"
              class="text-weight-regular text-grey-8" color="grey-9" float-label="*Recurring Fees"
              placeholder="Recurring Fees" />
          </div>
          <div class="col-md-12">
            <q-radio v-model="formData.posEnable" val="true" label="Enable Cash Pos" />
            <q-radio v-model="formData.posEnable" val="false" label="Disable Cash Pos" />
          </div>

          <div class="col-md-12">Payement Option</div>
          <div class="col-md-12">
            <q-input v-model.trim="formData.amountCollected" :error="$v.formData.amountCollected.$error"
              class="text-weight-regular text-grey-8" color="grey-9" float-label="*Amout Collected"
              placeholder="Amout Collected" />
          </div>
          <div class="col-md-12">
            <q-datetime v-model.trim="formData.paymentMadeon" :error="$v.formData.paymentMadeon.$error"
              class="text-weight-regular text-grey-8" color="grey-9" float-label="*Transaction Made ON"
              placeholder="Transaction Made ON" />
          </div>
          <div class="col-md-12">Payement Type</div>
          <div class="col-md-12">
            <q-select color="grey-9" v-model="formData.paymentOption" :error="$v.formData.paymentOption.$error"
              :options="paymentType" float-label="paymentType" placeholder="paymentType" />
          </div>
          <div class="col-md-12" v-if="formData.paymentOption == 1">
            <q-input v-model.trim="formData.referenceNumber" :error="$v.formData.referenceNumber.$error"
              class="text-weight-regular text-grey-8" color="grey-9" float-label="*NEFT Number"
              placeholder="Enter the NEFT Number" />
          </div>
          <div class="col-md-12" v-if="formData.paymentOption == 2">
            <q-input v-model.trim="formData.referenceNumber" :error="$v.formData.referenceNumber.$error"
              class="text-weight-regular text-grey-8" color="grey-9" float-label="*CHEQUE Number"
              placeholder="Enter the Cheque Number" />
          </div>
          <div class="col-xs-12" v-if="formData.paymentOption == 2">
            <p></p>
            <q-item>
              <q-item-main>Upload the Cheque File :</q-item-main>
              <label class="cursor-pointer text-white" style="background-color: #202c3f;">
                <span>Attach</span>
                <input type="file" name="file" @change="fnUploadApplicationForm($event, document)"
                  accept=".png, .jpg, .pdf" />
              </label>
              &nbsp;{{ this.formData.paymentDocumentFile }}
            </q-item>
          </div>
          <div class="col-md-12" v-if="formData.paymentOption == 3">
            <q-input v-model.trim="formData.referenceNumber" :error="$v.formData.referenceNumber.$error"
              class="text-weight-regular text-grey-8" color="grey-9" float-label="*SWIPE Number"
              placeholder="Enter the SWIPE Number" />
          </div>
          <div class="col-md-12">
            <q-select color="grey-9" v-model="formData.merchantType" :error="$v.formData.merchantType.$error"
              :options="dropDown.merchantType" float-label="Select merchant type" />
          </div>

          <div class="col-md-12 group" align="right">
            <q-btn flat align="right" class="bg-white text-weight-regular text-grey-8"
              @click="emitfnzEditshowConvertToSat(toggleModel)">Cancel</q-btn>
            <q-btn align="right" @click="submitShortLead(formData)" color="purple-9">submit to sat</q-btn>
          </div>
        </div>
      </form>
    </q-modal>
  </div>
</template>

<script>
import {
  required,
  numeric,
  email,
  maxLength,
  minLength,
} from "vuelidate/lib/validators";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["propShowConvertToSat", "propRowDetails"],
  data() {
    return {
      toggleModel: this.propShowConvertToSat,
      viewBinding: {},

      paymentType: [
        {
          label: "Cheque",
          value: 2,
        },
        {
          label: "NEFT",
          value: 1,
        },
        {
          label: "SWIPE",
          value: 3,
        },
        // {
        //   label: "Paper statement",
        //   value: "P"
        // }
      ],
      mdrPlan:"",
      formData: {
        id: this.propRowDetails.id,
        leadNumber: this.propRowDetails.leadNumber,

        leadName: this.propRowDetails.leadName,
        shortleadDate: this.propRowDetails.shortleadDate,
        contactNumber: this.propRowDetails.contactNumber,
        alternateContactNumber: this.propRowDetails.alternateContactNumber,
        email: this.propRowDetails.email,
        leadAddress: this.propRowDetails.leadAddress,
        pincode: this.propRowDetails.pincode,
        city: this.propRowDetails.city,
        state: this.propRowDetails.state,
        // alternateContactNumber: "",
        // email: "",
        // leadAddress: "",
        // pincode: "",
        // city: "",
        // state: "",
        leadCategory: 1,
        merchantState: "",
        district: "",
        village: "",
        subDistrict: "",
        tier: "",
        // location:"",
        leadSource: JSON.stringify(this.propRowDetails.leadSource),
        device: JSON.stringify(this.propRowDetails.device),
        deviceId: this.propRowDetails.device.id,
        deviceCount: this.propRowDetails.deviceCount,
        debitLessthanAmount: 0,
        debitGreaterthanAmount: 0,
        stdCC: 0,
        premiumCC: 0,
        corpCC: 0,
        intlCC: 0,
        superPremiumlCC: 0,
        amexDomestic: 0,
        amexInternational: 0,
        upiDebitCardUpTo2000: 0,
        upiDebitCardAbove2000: 0,
        upiPrepaidCreditCardsUpTo2000: 0,
        upiPrepaidCreditCardsAbove2000 : 0,
        plan: "",
        planId: "",
        setupFees: 0,
        recurringFees: 0,
        posEnable: "",
        amountCollected: "",
        paymentMadeon: "",
        paymentOption: 1,
        applicationFile: "475_FirstPageofApplicationForm_1571124179606",
        applicationFileMimeType: "image/*",
        documentUploadedType: 1,
        kyc: false,
        leadDocuments: [],
        latitude: 0.0,
        leadVerificationStatus: [],
        longitude: 0.0,
        marsDeviceDetails: [],
        paymentDocumentFile: "",
        posIncentive: 0,
        pricing: false,
        priority: false,
        deviceFlag:false,
        reason: "",
        referenceNumber: "",
        paymentDocumentFile: "",
        paymentDocumentMimeType: "",
        tidReleaseDate: 0,
        updatedAt: 0,
        verificationStatusReason: "",
        verifiedSATDate: 0,
        wipLeadDate: 0,
        branch: "",
        merchantType: "",
        leadSource1: this.propRowDetails.leadSource.id,
        leadSource2: "",
        merchantCategory1: "",
        // minTxnVal:"",
        // maxIncPerTxn:"",
        // incentivePercentage:"",
        id: "",
        mAtmOnboardingPlan: null,
        minTxnVal: 0,
        maxIncPerTxn: 0,
        incentivePercentage: 0,
        // qrCodelist: []      
        vasInstanceMapping: this.propRowDetails.vasInstanceMapping,
        bijlipaySwitch: this.propRowDetails.bijlipaySwitch,
        ownerFirstName: this.propRowDetails.ownerFirstName,
        ownerLastName: this.propRowDetails.ownerLastName,
        ownerDOB: this.propRowDetails.ownerDOB,
      },
      dropDown: {
        deviceOptions: [],
        leadSourceOptions: [],
        merchantState: [],
        merchantDistrict: [],
        merchantSubDistrict:[],
        merchantTownOrVillageDetails: [],
        merchantTierDetails:[],
        merchantCategory: [],
        planNameOptions: [],
        planOptions: [],
        merchantType: [],
        mdrOptions: [],
      },
    };
  },
  validations: {
    formData: {
      leadNumber: {
        required,
        // maxLength: maxLength(7),
        // minLength: minLength(5)
      },
      // ownerFirstName:{
      //   required,
      // },
      leadName: {
        required,
      },
      // shortleadDate: {
      //   required
      // },
      contactNumber: {
        required,
        minLength: minLength(10),
        maxLength: maxLength(10),
      },
      // alternateContactNumber: {
      //   required
      // },
      email: {
        email,
        required,
      },
      leadAddress: {
        required,
      },
      pincode: {
        required,
      },
      city: {
        required,
      },
      state: {
        required,
      },
      merchantState: {
        required,
      },
      district: {
        required,
      },
      village: {
        required,
      },
      subDistrict: {
        required,
      },
      leadSource: {
        required,
      },
      device: {
        required,
      },
      deviceCount: {
        required,
      },
      debitLessthanAmount: {
        required,
      },
      debitGreaterthanAmount: {
        required,
      },
      stdCC: {
        required,
      },
      premiumCC: {
        required,
      },
      corpCC: {
        required,
      },
      intlCC: {
        required,
      },
      superPremiumlCC: {
        required,
      },
      amexDomestic: {
        required
      },
      amexInternational: {
        required
      },
      upiDebitCardUpTo2000: {
        required
      },
      upiDebitCardAbove2000: {
        required
      },
      upiPrepaidCreditCardsUpTo2000: {
        required
      },
      upiPrepaidCreditCardsAbove2000: {
        required
      },
      referenceNumber: {
        required,
      },
      plan: {
        required,
      },
      setupFees: {
        required,
      },
      recurringFees: {
        required,
      },
      amountCollected: {
        required,
      },
      paymentMadeon: {
        required,
      },
      paymentOption: {
        numeric,
        required,
      },
      merchantType: {
        required,
      },
      merchantCategory: {
        required,
      },
      // mAtmOnboardingPlan:{
      //  required,
      // },
      //  incentivePercentage:{
      //   required,
      // },
      // minTxnVal:{
      //   required,
      // },
      // maxIncPerTxn:{
      //   required,
      // },
    },
  },
  beforeMount() {
    this.vasInstanceMapping = this.propRowDetails.vasInstanceMapping
    // this.ownerFirstName = this.propRowDetails.ownerFirstName
    this.plan = this.propRowDetails.vasInstanceMapping.replaceAll('"', "")
      .replace("[", "")
      .replace("]", "");

  if(this.propRowDetails.device.deviceName == "Q161_PRO_SQR"){
        this.formData.deviceCount = ""
        this.formData.deviceCount = 1
       this.deviceFlag = true
      }else{
         this.deviceFlag = false
      }



  },
  computed: {
    ...mapGetters("SA_Devices", ["getAllDevicesInfo"]),
    ...mapGetters("leadSource", ["getActiveLeadSource"]),
    ...mapGetters("merchantCategory", ["getActiveMerchantCategory"]),
    ...mapGetters("mAtmPlanDropdown", ["getMatmPlanDropdownDetails", "getMAtmPlanDropdown"]),

    ...mapGetters("CategoryBasedMdr", ["categoryBasedMdr"]),
    ...mapGetters("plan", ["getActivePlan"]),
    ...mapGetters("appMerchantType", ["getappMerchantDocumentType"]),
    ...mapGetters("shortLeadInfo", ["getShortLead"]),
    ...mapGetters("categoryBasedRental", ["categoryBasedRental"]),
    ...mapGetters("LeadSourceBasedRental", ["getLeadSourceRental"]),
    ...mapGetters('Appvas', ['getVasDeviceMapping']),
    ...mapGetters("merchantTierMapping", ["getMerchantTierMappingStateDetails", "getMerchantTierMappingVillageTierDetails", "getMerchantTierMappingDistrictDetails", "getMerchantTierMappingTownOrVillageDetails", "getMerchantTierMappingSubDistrictDetails", "getMerchantTierMappingVillageBasedTierAndLocationDetails"])

  },
  created() {
    this.ajaxLoadDataForDeviceTypeTable();
    this.ajaxLoadDataForMatmPlanDetails();
    this.ajaxLeadsourceDevicePlanLoading();
    this.LEAD_BASED_RENTAL(this.formData.leadSource1);
    this.ajaxVasDatas();
  },

  methods: {
    ...mapActions("pincodes", ["FETCH_ALL_PINCODES", "EDIT_NEW_PINCODE"]),
    ...mapActions("convertToWip", ["CONVERT_TO_WIP"]),
    ...mapActions("SA_Devices", ["FETCH_DEVICES_DATA"]),
    ...mapActions("leadSource", ["LEAD_SOURCE_ACTIVE_LIST"]),
    ...mapActions("merchantCategory", ["MERCHANT_CATEGORY_ACTIVE_LIST"]),
    ...mapActions("mAtmPlanDropdown", ["MATM_PLAN_DROPDOWN_DETAILS", "FETCH_ALL_PLAN_DETAILS"]),
    ...mapActions('Appvas', ['FETCH_VAS_DATAS']),
    ...mapActions("MdrPlan", ["MDR_PLAN"]),
    ...mapActions("CategoryBasedMdr", [
      "CATEGORY_BASED_MDR_PLAN",
      "EDIT_MDR_PLAN",
    ]),

    ...mapActions("plan", ["PLAN_ACTIVE_LIST"]),
    ...mapActions("LeadSourceBasedRental", ["LEAD_BASED_RENTAL", "LEAD_AND_DEVICE_BASED_RENTAL", "LEAD_AND_DEVICE_BASED_RENTAL1"]),
    ...mapActions("soTosat", ["SO_TO_SAT"]),
    ...mapActions("appMerchantType", ["APP_MERCHANT_DOCUMENT_TYPE"]),
    ...mapActions("shortLeadInfo", ["FETCH_SHORT_LEAD"]),
    ...mapActions("categoryBasedRental", ["CATEGORY_BASED_RENTAL_PLAN"]),
    ...mapActions("SatLeadValidation", ["FEED_CHEQUE_FORM"]),
    ...mapActions("merchantTierMapping", ["MERCHANT_TIER_MAPPING_GET_STATE_DETAILS", "MERCHANT_TIER_MAPPING_SEARCH_DISTRICT", "MERCHANT_TIER_MAPPING_SUB_DISTRICT_DETAILS", "MERCHANT_TIER_MAPPING_TOWN_OR_VILLAGE_DETAILS", "MERCHANT_TIER_MAPPING_VILLAGE_TIER_DETAILS", "MERCHANT_TIER_MAPPING_VILLAGE_BASED_TIER_AND_LOCATION_DETAILS"]),
     //Emit functions
    emitfnzEditshowConvertToSat(toggleModel) {
      this.$emit("emitEditshowConvertToSat", toggleModel);
    },
     ajaxVasDatas() {
    },

    ajaxLeadsourceDevicePlanLoading() {
      let param = {
        leadSource: this.propRowDetails.leadSource,
        device: this.propRowDetails.device
      };
      this.LEAD_AND_DEVICE_BASED_RENTAL(param);

    },
    //Permission creation final submit
    submitShortLead(request) {
      this.$v.formData.$touch();
      if (this.$v.formData.$error) {
        this.$q.notify("Please review fields again.");
      } else if (
        this.formData.paymentOption == 2 &&
        this.formData.paymentDocumentFile == ""
      ) {
        this.$q.notify({
          color: "amber",
          position: "bottom",
          message: "data",
          icon: "attachment",
          message: "Please attach the Cheque File",
        });
      } else {
        let params = {
          data1: {
            id: request.id,
            leadNumber: request.leadNumber,
            leadName: request.leadName,

            shortleadDate: request.shortleadDate,
            contactNumber: request.contactNumber,
            alternateContactNumber: request.alternateContactNumber,
            email: request.email,
            leadAddress: request.leadAddress,
            pincode: request.pincode,
            city: request.city,
            state: request.state,
            leadCategory: request.leadCategory,
            leadSource: JSON.parse(request.leadSource),
            leadSource1: request.leadSource1,
            // leadSource1: this.getActiveLeadSource.id,
            device: JSON.parse(request.device),
            deviceCount: request.deviceCount,
            merchantType: request.merchantType,
            // qrCodelist: request.qrCodelist,
            merchantCategory: request.merchantCategory,
            debitLessthanAmount: request.debitLessthanAmount,
            debitGreaterthanAmount: request.debitGreaterthanAmount,
            stdCC: request.stdCC,
            premiumCC: request.premiumCC,
            corpCC: request.corpCC,
            intlCC: request.intlCC,
            superPremiumlCC: request.superPremiumlCC,
            amexDomestic: request.amexDomestic,
            amexInternational: request.amexInternational,
            upiDebitCardUpTo2000: request.upiDebitCardUpTo2000,
            upiDebitCardAbove2000: request.upiDebitCardAbove2000,
            upiPrepaidCreditCardsUpTo2000: request.upiPrepaidCreditCardsUpTo2000,
            upiPrepaidCreditCardsAbove2000: request.upiPrepaidCreditCardsAbove2000,
            plan: request.plan,
            setupFees: request.setupFees,
            recurringFees: request.recurringFees,
            posEnable: request.posEnable,
            amountCollected: request.amountCollected,
            paymentMadeon: request.paymentMadeon,
            paymentOption: request.paymentOption,
            applicationFile: request.applicationFile,
            applicationFileMimeType: request.applicationFileMimeType,
            documentUploadedType: request.documentUploadedType,
            kyc: request.kyc,
            leadDocuments: request.leadDocuments,
            latitude: request.latitude,
            leadVerificationStatus: request.leadVerificationStatus,
            longitude: request.longitude,
            marsDeviceDetails: request.marsDeviceDetails,
            paymentDocumentFile: request.paymentDocumentFile,
            posIncentive: request.posIncentive,
            pricing: request.pricing,
            priority: request.priority,
            reason: request.reason,
            referenceNumber: request.referenceNumber,
            paymentDocumentFile: request.paymentDocumentFile,
            paymentDocumentMimeType: request.paymentDocumentMimeType,
            shortleadDate: request.shortleadDate,
            tidReleaseDate: request.tidReleaseDate,
            updatedAt: request.updatedAt,
            verificationStatusReason: request.verificationStatusReason,
            verifiedSATDate: request.verifiedSATDate,
            wipLeadDate: request.wipLeadDate,
            branch: request.branch,
            merchantType: request.merchantType,
            mAtmOnboardingPlan: request.mAtmOnboardingPlan,
            // MAtmPlanId: request.MAtmPlanId,
            minTxnVal: request.minTxnVal,
            maxIncPerTxn: request.maxIncPerTxn,
            incentivePercentage: request.incentivePercentage,

            vasInstanceMapping: request.vasInstanceMapping,
            bijlipaySwitch: request.bijlipaySwitch,
            ownerFirstName: request.ownerFirstName,
            ownerLastName: request.ownerLastName,
            ownerDOB: request.ownerDOB,

            // Merchant Tier Mapping Object Details
            //     merchantState: "",
            // district: "",
            // village:"",
            // subDistrict:"",
            // tier:"",
            merchantDistrictName: request.district,
            merchantStateName: request.merchantState,
            merchantVillageName: request.village,
            merchantSubDistrictName: request.subDistrict,
            merchantTier: request.tier
          },
          url: {
            id: this.propRowDetails.id,
            action: 2,
          },
        };

        this.$q.loading.show({
          delay: 100, // ms
          message: "Please Wait",
          spinnerColor: "purple-9",
          customClass: "shadow-none",
        });
        this.SO_TO_SAT(params)
          .then((response) => {
            this.FETCH_SHORT_LEAD();
            this.emitfnzEditshowConvertToSat(this.toggleModel);
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Wip Lead successfully created!",
              icon: "thumb_up",
            });
            this.$q.loading.hide();
            this.$router.push("/sat/lead/validation");
          })
          .catch(() => {
            this.$q.notify({
              color: "negative",
              position: "bottom",
              message: error.body.message == null ? "Please Try Again Later !" : error.body.message,
              icon: "thumb_down",
            });
            this.$q.loading.hide();
          });
      }
    },
    leadSourceRental() {
      this.LEAD_BASED_RENTAL(this.formData.leadSource1);
    },
    fnUploadApplicationForm(event, documentDetails) {
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Uploading file ..",
      });
      let formData = new FormData();
      formData.append("file", event.target.files[0]);
      formData.append("fileNameOriginal", "Cheque");
      let requestParams = {
        files: formData,
        fileNameOriginal: "Cheque",
      };
      this.FEED_CHEQUE_FORM(requestParams)
        .then((response) => {
          this.$q.loading.hide();
          this.$q.notify({
            color: "positive",
            position: "bottom",
            message: "data",
            icon: "thumb_up",
            message: "File Successfully Uploaded" + "-" + response.fileName,
          });
          this.formData.paymentDocumentFile = response.fileName;
          this.formData.paymentDocumentMimeType = response.mimeType;
          // this.ajaxLoadLeadDataEntryInfo()
        })
        .catch((error) => {
          this.$q.loading.hide();
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message: "Failed to upload document",
            icon: "thumb_down",
          });
        });
    },
    ajaxLoadDataForMatmPlanDetails() {
      let self = this;
      self
        .MATM_PLAN_DROPDOWN_DETAILS()
        .then(() => {
          return _.map(self.getMatmPlanDropdownDetails, (item) => {
            self.dropDown.planNameOptions.push({
              value: item,
              label: item.planName,
            });
          });
        });

    },
    // villageSelected(item){
    //   this.formData.tier = item.value.tier
    //   this.formData.location = item.value.location
    // },
    // villageSearch(terms, done){
    //   this.formData.tier = ''
    //   this.formData.location = ''
    //   this.MERCHANT_TIER_MAPPING_VILLAGE_BASED_TIER_AND_LOCATION_DETAILS(terms)
    //     .then(() => {
    //       done(this.COMMON_FILTER_FUNCTION1(this.getMerchantTierMappingVillageBasedTierAndLocationDetails, terms))
    //     })
    //     .catch(() => {
    //       done([])
    //     })
    // },
    COMMON_FILTER_FUNCTION1(arraySet, terms) {
      // eslint-disable-next-line no-undef
      return _.filter(arraySet, function (oo) {
        return oo.label.toString().includes(terms.toLowerCase())
      })
    },
    getdistrict(terms) {
      let self= this;
      let param = {
        Statename: terms
      };
      
      self.MERCHANT_TIER_MAPPING_SEARCH_DISTRICT(param)
        .then(() => {
          self.dropDown.merchantDistrict.splice(0);
          return _.map(self.getMerchantTierMappingDistrictDetails, (item) => {
          self.dropDown.merchantDistrict.push({
            value: item.districtName,
            label: item.districtName
          })
         })
        }) 

    },
    getSubDistrict(terms) {
      let self= this;
      let param = {
        Statename: this.formData.merchantState,
        Districtname: terms,
      
      };
      self.MERCHANT_TIER_MAPPING_SUB_DISTRICT_DETAILS(param)
      .then(() => {
        self.dropDown.merchantSubDistrict.splice(0);
          return _.map(self.getMerchantTierMappingSubDistrictDetails, (item) => {
          self.dropDown.merchantSubDistrict.push({
            value: item.subDistrictName,
            label: item.subDistrictName,

          })
         })
        })
    },
    //getMerchantTierMappingTownOrVillageDetails
    getTownOrVillage(terms) {
      let self= this;
      let param = {
        Statename: this.formData.merchantState,
        Districtname: this.formData.district,
        SubDistrictname: terms,

      };
      self.MERCHANT_TIER_MAPPING_TOWN_OR_VILLAGE_DETAILS(param)
      .then(() => {
        self.dropDown.merchantTownOrVillageDetails.splice(0);
          return _.map(self.getMerchantTierMappingTownOrVillageDetails, (item) => {
          self.dropDown.merchantTownOrVillageDetails.push({
            value: item.townVillageName,
            label: item.townVillageName
          })
         })
        })
    },
    getVillageTier(terms) {
      let self= this;
      let param = {
        Statename: this.formData.merchantState,
        Districtname: this.formData.district,
        SubDistrictname: this.formData.subDistrict,
        Villagename: terms,
     
      };
      self.MERCHANT_TIER_MAPPING_VILLAGE_TIER_DETAILS(param)
      .then(() => {
        // self.formData.tier.splice(0);
          return _.map(self.getMerchantTierMappingVillageTierDetails, (item) => {
            this.formData.tier = self.dropDown.merchantTierDetails
          // self.dropDown.merchantTierDetails.push({
          //   value: item,
          //   label: item
          // })
          this.formData.tier = item
         })
        })
    },
    ajaxLoadDataForDeviceTypeTable() {
      let self = this;
      self
        .FETCH_DEVICES_DATA()
        .then(() => {
          return _.map(self.getAllDevicesInfo, (item) => {
            self.dropDown.deviceOptions.push({
              value: JSON.stringify(item),
              label: item.deviceName,
            });
          });
        })

        .then(() => {
          self.LEAD_SOURCE_ACTIVE_LIST().then(() => {
            return _.map(self.getActiveLeadSource, (item) => {
              self.dropDown.leadSourceOptions.push({
                value: JSON.stringify(item),
                label: item.sourceName,
              });
            });
          });
        })
        .then(() => {
          self.MERCHANT_TIER_MAPPING_GET_STATE_DETAILS().then(() => {
            return _.map(self.getMerchantTierMappingStateDetails, (item) => {

              self.dropDown.merchantState.push({
                value: item.stateName,
                label: item.stateName,
              });
            });
          });
        })
        // MERCHANT_TIER_MAPPING_GET_STATE_DETAILS
        .then(() => {
          self.MERCHANT_CATEGORY_ACTIVE_LIST().then(() => {
            return _.map(self.getActiveMerchantCategory, (item) => {
              self.dropDown.merchantCategory.push({
                value: item,
                label: item.merchantCategoryName,
              });
            });
          });
        })
        .then(() => {
          self.PLAN_ACTIVE_LIST().then(() => {
            return _.map(self.getActivePlan, (item) => {
              self.dropDown.planOptions.push({
                value: item,
                label: item.planName,
              });
            });
          });
        })
        .then(() => {
          self.APP_MERCHANT_DOCUMENT_TYPE().then(() => {
            return _.map(self.getappMerchantDocumentType, (item) => {
              self.dropDown.merchantType.push({
                value: item,
                label: item.merchantTypeName,
              });
            });
          });
        });
    },
    //  let value = item;
    //   let data = JSON.parse(JSON.stringify(value));

    //   this.formData.MAtmPlanId1 = data.MAtmPlanId;
    //    this.formData.planName = item;

    //   let formData = {
    //     leadSource: this.formData.leadSource1,
    //     device: this.formData.deviceId,
    //     plan: this.formData.MAtmPlanId1,
    //   };
    fnleadSource(item) {
      let value = item;
      let data = JSON.parse(value);
      this.formData.leadSource1 = data.id;
      this.formData.leadSource = item;
      let formData = {
        leadSource: this.formData.leadSource1,
        device: this.formData.deviceId,
        merchantType: this.formData.merchantCategory1,
      };
      let self = this;
      this.LEAD_BASED_RENTAL(this.formData.leadSource1);
      self.CATEGORY_BASED_MDR_PLAN(formData).then((response) => {
        if (response.status == 200) {
          this.formData.debitLessthanAmount =
            self.categoryBasedMdr.debitLessthanAmount;
          this.formData.debitGreaterthanAmount =
            self.categoryBasedMdr.debitGreaterthanAmount;
          this.formData.stdCC = self.categoryBasedMdr.stdCC;
          this.formData.premiumCC = self.categoryBasedMdr.premiumCC;
          this.formData.corpCC = self.categoryBasedMdr.corpCC;
          this.formData.intlCC = self.categoryBasedMdr.intlCC;
          this.formData.superPremiumlCC = self.categoryBasedMdr.superPremiumlCC;
          this.formData.amexDomestic = self.categoryBasedMdr.amexDomestic;
          this.formData.amexInternational = self.categoryBasedMdr.amexInternational;
          this.formData.upiDebitCardUpTo2000 = self.categoryBasedMdr.upiDebitCardUpTo2000;
          this.formData.upiDebitCardAbove2000 = self.categoryBasedMdr.upiDebitCardAbove2000;
          this.formData.upiPrepaidCreditCardsUpTo2000 = self.categoryBasedMdr.upiPrepaidCreditCardsUpTo2000;
          this.formData.upiPrepaidCreditCardsAbove2000 = self.categoryBasedMdr.upiPrepaidCreditCardsAbove2000;
        } else {
          this.$q.notify({
            color: "negative",
            position: "bottom-left",
            message: "Invalid IFSC code",
            icon: "clear",
          });
          this.formData.debitLessthanAmount = "";
          this.formData.debitGreaterthanAmount = "";
          this.formData.stdCC = "";
          this.formData.premiumCC = "";
          this.formData.corpCC = "";
          this.formData.intlCC = "";
          this.formData.superPremiumlCC = "";
          this.formData.amexDomestic ="";
          this.formData.amexInternational ="";
          this.formData.upiDebitCardUpTo2000 ="";
          this.formData.upiDebitCardAbove2000 ="";
          this.formData.upiPrepaidCreditCardsUpTo2000 ="";
          this.formData.upiPrepaidCreditCardsAbove2000 ="";
        }
      });
    },
    fnDevice(item) {
      let value = item;
      let data = JSON.parse(value);
      this.formData.deviceId = data.id;
      // this.formData.deviceId = item.id;
      this.formData.device = item;
      let formData = {
        leadSource: this.formData.leadSource1,
        device: this.formData.deviceId,
        merchantType: this.formData.merchantCategory1,
      };
      let self = this;
      let formData1 = {
        leadSource : this.formData.leadSource1,
        device: this.formData.deviceId
      };
      
        if(data.deviceName == "Q161_PRO_SQR"){
      
        self.formData.deviceCount = ""
        self.formData.deviceCount = 1
       self.deviceFlag = true
      }else{
         self.deviceFlag = false
      }

      self.LEAD_AND_DEVICE_BASED_RENTAL1(formData1);
      self.CATEGORY_BASED_MDR_PLAN(formData).then((response) => {
        if (response.status == 200) {
          this.formData.debitLessthanAmount =
            self.categoryBasedMdr.debitLessthanAmount;
          this.formData.debitGreaterthanAmount =
            self.categoryBasedMdr.debitGreaterthanAmount;
          this.formData.stdCC = self.categoryBasedMdr.stdCC;
          this.formData.premiumCC = self.categoryBasedMdr.premiumCC;
          this.formData.corpCC = self.categoryBasedMdr.corpCC;
          this.formData.intlCC = self.categoryBasedMdr.intlCC;
          this.formData.superPremiumlCC = self.categoryBasedMdr.superPremiumlCC;
          this.formData.amexDomestic = self.categoryBasedMdr.amexDomestic;
          this.formData.amexInternational = self.categoryBasedMdr.amexInternational;
          this.formData.upiDebitCardUpTo2000 = self.categoryBasedMdr.upiDebitCardUpTo2000;
          this.formData.upiDebitCardAbove2000 = self.categoryBasedMdr.upiDebitCardAbove2000;
          this.formData.upiPrepaidCreditCardsUpTo2000 = self.categoryBasedMdr.upiPrepaidCreditCardsUpTo2000;
          this.formData.upiPrepaidCreditCardsAbove2000 = self.categoryBasedMdr.upiPrepaidCreditCardsAbove2000;
        } else {
          this.$q.notify({
            color: "negative",
            position: "bottom-left",
            message: "Invalid IFSC code",
            icon: "clear",
          });
          this.formData.debitLessthanAmount = "";
          this.formData.debitGreaterthanAmount = "";
          this.formData.stdCC = "";
          this.formData.premiumCC = "";
          this.formData.corpCC = "";
          this.formData.intlCC = "";
          this.formData.superPremiumlCC = "";
          this.formData.amexDomestic = "";
          this.formData.amexInternational = "";
          this.formData.upiDebitCardUpTo2000 = "";
          this.formData.upiDebitCardAbove2000 = "";
          this.formData.upiPrepaidCreditCardsUpTo2000 = "";
          this.formData.upiPrepaidCreditCardsAbove2000 = "";
        }
      });
    },

    fnPlanName(item) {
      let value = item;
      let data = JSON.parse(JSON.stringify(value));

      this.formData.id = data.id;
      this.formData.mAtmOnboardingPlan = item;

      let formData = {
        leadSource: this.formData.leadSource1,
        device: this.formData.deviceId,
        plan: this.formData.id,
      };
      let self = this;
      self.FETCH_ALL_PLAN_DETAILS(formData).then((response) => {
        if (response.status == 200) {

          this.formData.incentivePercentage = self.getMAtmPlanDropdown.incentivePercentage;
          this.formData.minTxnVal = self.getMAtmPlanDropdown.minTxnVal;
          this.formData.maxIncPerTxn = self.getMAtmPlanDropdown.maxIncPerTxn;
        } else {
          this.$q.notify({
            color: "negative",
            position: "bottom-left",
            message: "Invalid  Plan Code",
            icon: "clear",
          });
          this.formData.incentivePercentage = "";
          this.formData.minTxnVal = "";
          this.formData.maxIncPerTxn = ""
        }
      });
    },
    fnPlan(item) {
      this.formData.planId = item.id;
      this.formData.plan = item;
      let formData = {
        leadSource: this.formData.leadSource1,
        device: this.formData.deviceId,
        plan: this.formData.planId,
      };
      let self = this;
      self.CATEGORY_BASED_RENTAL_PLAN(formData).then((response) => {
        if (response.status == 200) {
          this.formData.setupFees = self.categoryBasedRental.setupFees * self.formData.deviceCount;
          this.formData.recurringFees = self.categoryBasedRental.monthlyFees * self.formData.deviceCount;
        } else {
          this.$q.notify({
            color: "negative",
            position: "bottom-left",
            message: "Invalid MDR Plan Code",
            icon: "clear",
          });
          this.formData.setupFees = "";
          this.formData.monthlyFees = "";
        }
      });
    },
    fnFillMdr(item) {
      let mdrData = JSON.parse(item);
      this.formData.debitLessthanAmount =
        mdrData.debitLessthanAmount;
      this.formData.debitGreaterthanAmount =
        mdrData.debitGreaterthanAmount;
      this.formData.stdCC = mdrData.stdCC;
      this.formData.premiumCC = mdrData.premiumCC;
      this.formData.corpCC = mdrData.corpCC;
      this.formData.intlCC = mdrData.intlCC;
      this.formData.superPremiumlCC = mdrData.superPremiumlCC;
      this.formData.amexDomestic = mdrData.amexDomestic;
      this.formData.amexInternational = mdrData.amexInternational;
      this.formData.upiDebitCardUpTo2000 = mdrData.upiDebitCardUpTo2000;
      this.formData.upiDebitCardAbove2000 = mdrData.upiDebitCardAbove2000;
      this.formData.upiPrepaidCreditCardsUpTo2000 = mdrData.upiPrepaidCreditCardsUpTo2000;
      this.formData.upiPrepaidCreditCardsAbove2000 = mdrData.upiPrepaidCreditCardsAbove2000;
    },
    fnMerchantCategory(item) {
      this.formData.merchantCategory1 = item.id;
      this.formData.merchantCategory = item;
      let formData = {
        leadSource: this.formData.leadSource1,
        device: this.formData.deviceId,
        merchantType: this.formData.merchantCategory1,
      };
      let self = this;
      self.CATEGORY_BASED_MDR_PLAN(formData).then((response) => {
        if (response.status == 200) {
          let assumeArr = [];
          this.categoryBasedMdr.map(function (value) {
            assumeArr.push({ label: value.mdrPlanName, value: JSON.stringify(value) });
          });
          this.dropDown.mdrOptions = assumeArr;
          // this.formData.debitLessthanAmount =
          //   self.categoryBasedMdr.debitLessthanAmount;
          // this.formData.debitGreaterthanAmount =
          //   self.categoryBasedMdr.debitGreaterthanAmount;
          // this.formData.stdCC = self.categoryBasedMdr.stdCC;
          // this.formData.premiumCC = self.categoryBasedMdr.premiumCC;
          // this.formData.corpCC = self.categoryBasedMdr.corpCC;
          // this.formData.intlCC = self.categoryBasedMdr.intlCC;
          // this.formData.superPremiumlCC = self.categoryBasedMdr.superPremiumlCC;
        } else {
          this.$q.notify({
            color: "negative",
            position: "bottom-left",
            message: "Invalid IFSC code",
            icon: "clear",
          });
          this.formData.debitLessthanAmount = "";
          this.formData.debitGreaterthanAmount = "";
          this.formData.stdCC = "";
          this.formData.premiumCC = "";
          this.formData.corpCC = "";
          this.formData.intlCC = "";
          this.formData.superPremiumlCC = "";
          this.formData.amexDomestic ="";
          this.formData.amexInternational ="";
          this.formData.upiDebitCardUpTo2000 ="";
          this.formData.upiDebitCardAbove2000 ="";
          this.formData.upiPrepaidCreditCardsUpTo2000 ="";
          this.formData.upiPrepaidCreditCardsAbove2000 ="";
        }
      });
    },
    fnCategoryBasedMdr(request) {
      let formData = {
        leadSource: this.getActiveLeadSource.id,
        device: request.device,
        merchantType: request.merchantType,
      };
      let self = this;
      self.CATEGORY_BASED_MDR_PLAN(formData).then((response) => {
        if (response.status == 200) {
          this.formData.debitLessthanAmount =
            self.categoryBasedMdr.debitLessthanAmount;
          this.formData.debitGreaterthanAmount =
            self.categoryBasedMdr.debitGreaterthanAmount;
          this.formData.stdCC = self.categoryBasedMdr.stdCC;
          this.formData.premiumCC = self.categoryBasedMdr.premiumCC;
          this.formData.corpCC = self.categoryBasedMdr.corpCC;
          this.formData.intlCC = self.categoryBasedMdr.intlCC;
          this.formData.superPremiumlCC = self.categoryBasedMdr.superPremiumlCC;
          this.formData.amexDomestic = self.categoryBasedMdr.amexDomestic;
          this.formData.amexInternational = self.categoryBasedMdr.amexInternational;
          this.formData.upiDebitCardUpTo2000 = self.categoryBasedMdr.upiDebitCardUpTo2000;
          this.formData.upiDebitCardAbove2000 = self.categoryBasedMdr.upiDebitCardAbove2000;
          this.formData.upiPrepaidCreditCardsUpTo2000 = self.categoryBasedMdr.upiPrepaidCreditCardsUpTo2000;
          this.formData.upiPrepaidCreditCardsAbove2000 = self.categoryBasedMdr.upiPrepaidCreditCardsAbove2000;
        } else {
          this.$q.notify({
            color: "negative",
            position: "bottom-left",
            message: "Invalid IFSC code",
            icon: "clear",
          });
          this.formData.debitLessthanAmount = "";
          this.formData.debitGreaterthanAmount = "";
          this.formData.stdCC = "";
          this.formData.premiumCC = "";
          this.formData.corpCC = "";
          this.formData.intlCC = "";
          this.formData.superPremiumlCC = "";
          this.formData.amexDomestic = "";
          this.formData.amexInternational = "";
          this.formData.upiDebitCardUpTo2000 = "";
          this.formData.upiDebitCardAbove2000 = "";
          this.formData.upiPrepaidCreditCardsUpTo2000 = "";
          this.formData.upiPrepaidCreditCardsAbove2000 = "";
        }
      });
    },
    fnCategoryBasedRental(request) {
      let formData = {
        leadSource: request.leadSource,
        device: request.device,
        plan: request.plan,
      };
      let self = this;
      self.CATEGORY_BASED_RENTAL_PLAN(formData).then((response) => {
        if (response.status == 200) {
          this.formData.setupFees = self.categoryBasedRental.setupFees;
          this.formData.monthlyFees = self.categoryBasedRental.monthlyFees;
        } else if (response.data == null) {
          this.formData.setupFees = 0;
          this.formData.monthlyFees = 0;
        } else {
          this.$q.notify({
            color: "negative",
            position: "bottom-left",
            message: "Invalid MDR Plan Code",
            icon: "clear",
          });
          this.formData.setupFees = "";
          this.formData.monthlyFees = "";
        }
      });
    },
  },
};
</script>
