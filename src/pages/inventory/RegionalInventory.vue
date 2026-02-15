LOST



<template>
  <q-page>
    <div>
      <q-table
        title="Change Management"
        table-class="customTableClass"
        class="q-py-none"
        :rows="tableData"
        :columns="columns"
        row-key="name"
        :filter="filter1"
        :pagination="paginationControlchange"
        :rows-per-page-options="[5,10,15]"
        :loading="toggleAjaxLoadFilter"
        @request="ajaxLoadAllCMS"
      >
        
        <!-- <q-td v-slot:body-cell-Status="props" :props="props">
          <span
            class="label text-positive"
            v-if="props.row.leadInformation.cmsLeadStatus== 23"
          >submitted to Mars</span>
          <span
            class="label text-amber"
            v-else-if="props.row.leadInformation.cmsLeadStatus== 11"
          >Mars Approved</span>
          <span
            class="label text-positive"
            v-else-if="props.row.leadInformation.cmsLeadStatus== 15"
          >NH Approved</span>
          <span
            class="label text-purple"
            v-else-if="props.row.leadInformation.cmsLeadStatus== 16"
          >CMS RSM Pending</span>
          <span
            class="label text-negative"
            v-else-if="props.row.leadInformation.cmsLeadStatus== 17"
          >CMS RSM Reject</span>
          <span
            class="label text-negative"
            v-else-if="props.row.leadInformation.cmsLeadStatus== 25"
          >MARS Reject</span>
          <span
            class="label text-amber"
            v-else-if="props.row.leadInformation.cmsLeadStatus== 18"
          >CMS NH Pending</span>
          <span
            class="label text-negative"
            v-else-if="props.row.leadInformation.cmsLeadStatus== 19"
          >CMS NH Reject</span>
          <span
            class="label text-purple"
            v-else-if="props.row.leadInformation.cmsLeadStatus== 20"
          >CMS Finance Pending</span>
          <span
            class="label text-negative"
            v-else-if="props.row.leadInformation.cmsLeadStatus== 21"
          >CMS Finance Rejected</span>
          <span
            class="label text-positive"
            v-else-if="props.row.leadInformation.cmsLeadStatus== 22"
          >CMS Finance Approved</span>
          <span
            class="label text-purple"
            v-else-if="props.row.leadInformation.cmsLeadStatus== 23"
          >Submitted to Mars</span>-->
          <!-- <span class="label text-negative" v-else>Pending</span>
        </q-td> -->
        <!-- <q-td v-slot:body-cell-action="props" :props="props">
          <q-btn
            v-if="props.row.leadInformation.cmsLeadStatus== 22 || props.row.leadInformation.cmsLeadStatus==15 || props.row.leadInformation.cmsLeadStatus==25 "
            highlight
            push
            outline
            color="purple-9"
            size="sm"
            @click="$router.push('/sat/change/management/'+ props.row.tid+'/edit/data')"
          >Data Entry</q-btn>
          <q-btn
            v-else-if="props.row.leadInformation.cmsLeadStatus== 21"
            highlight
            push
            outline
            color="purple-9"
            size="sm"
            @click="$router.push('/sat/change/management/'+ props.row.tid+'/edit/data/rejectfinance')"
          >Data Entry</q-btn>
          <q-btn
            v-else-if="props.row.leadInformation.cmsLeadStatus== 17"
            highlight
            push
            outline
            color="purple-9"
            size="sm"
            @click="$router.push('/sat/change/management/'+ props.row.tid+'/edit/data/reject')"
          >Data Entry</q-btn>
          <q-btn
            v-else-if="props.row.leadInformation.cmsLeadStatus== 19"
            highlight
            push
            outline
            color="purple-9"
            size="sm"
            @click="$router.push('/sat/change/management/'+ props.row.tid+'/edit/data/rejectrsm')"
          >Data Entry</q-btn>
          <q-btn
            disable
            v-else-if="props.row.leadInformation.cmsLeadStatus== 23"
            highlight
            push
            color="purple-9"
            size="sm"
            @click="$router.push('/sat/change/management/'+ props.row.tid+'/edit/data')"
          >Submitted To Mars</q-btn>
          <q-btn
            disabled
            v-else
            highlight
            outline
            push
            color="purple-9"
            size="sm"
            @click="$router.push('/sat/change/management/'+ props.row.tid+'/edit/data')"
          >Data Entry</q-btn>
        </q-td> --> 
        <template slot="top"  class="bottom-border">
          <!--START: table filter,search -->
          <div class="col-md-5">
            <q-input
              clearable
              color="grey-9"
              v-model="filter1"
              placeholder="Type.."
              :debounce="600"
              class="q-mr-lg q-py-sm"
              float-label="Search By MID/TID/Merchant Name "
            />
          </div>


        
          <!--END: table filter,search -->
        </template>
       
        

        <!-- END: table body modification -->
      </q-table>
      <!-- <template slot="top"  class="bottom-border">
       <div class="col">
          <q-input
            v-model="Add"
            color="grey-9"
            placeholder="Add"
            float-label="Enter Device Serial Number/TID"
            @keyup.enter="fnCookDispatchedHistoryDetails()"
            class="text-weight-regular text-grey-8 q-py-sm"
          />
        </div>
         <div class="col-auto" align="right">
          <q-btn
            :disabled="Add == ''"
            label="Add"
            class="text-white text-weight-regular common-dark-blue q-py-sm"
            @click="fnCookDispatchedHistoryDetails"
          />
        </div>
          </template> -->
        <template slot="top"  class="bottom-border"> 

          <div class="col-md-5">
          <q-input
            v-model="text"
            color="grey-9"
            placeholder="Add"
            float-label="Enter Device Serial Number/TID"
            @keyup.enter="fnCookDispatchedHistoryDetails()"
            class="text-weight-regular text-grey-8 q-py-sm"
          />
          </div>
            <div class="col-auto" align="right"> 
          <q-btn
            :disabled="Add == ''"
            label="Add"
            class="text-white text-weight-regular common-dark-blue q-py-sm"
            @click="fnCookDispatchedHistoryDetails"
          />
        </div>
       </template>
      <!-- <div>
        class="col-md-12 text-h6 q-px-lg q-py-md text-weight-regular bottom-border text-grey-9"
      >Enter Device Serial Number/TID</div> -->
      <q-table
        title="Change Management"
        class="q-py-none"
        :rows="tableData1"
        :columns="columns1"
        row-key="name"
        :filter="filter"
        :pagination="paginationControl"
        :rows-per-page-options="[5,10,15,20]"
        :loading="toggleAjaxLoadFilter1"
        @request="ajaxLoadAllLeadInfo"
      >
        <!-- <q-td v-slot:body-cell-action="props" :props="props">
          <q-btn @click="fnEdit(props.row.leadInformation.id)" flat class="text-negative">Edit</q-btn>
        </q-td>-->
        <q-td v-slot:body-cell-action="props" :props="props">
          <!-- <q-btn v-if="props.row.leadInformation.leadDocuments.length==0"
            highlight
            push
            outline
            color="purple-9"
            size="sm"
            @click="$router.push('/sat/change/management/'+ props.row.tid+'/edit/dataInfo')"
          >Data Entry</q-btn> -->
          <!-- <q-btn highlight
            push
            outline
            color="purple-9"
            size="sm"
            @click="$router.push('/sat/change/management/'+ props.row.tid+'/edit/data')"
          >Data Entry</q-btn> -->
        </q-td>
        <!-- END: table body modification -->
        <template slot="top"  class="bottom-border">
          <!--START: table filter,search -->
          <div class="col-md-5">
            <q-input
              clearable
              color="grey-9"
              v-model="filter"
              placeholder="Type.."
              :debounce="600"
              class="q-mr-lg q-py-sm"
              float-label="Search By MID/TID/Merchant Name"
            />
          </div>
          <div class="col">
            <q-btn
              @click="downloadBpRegionsMenu()"
              outline
              color="grey-9"
              label="Download as Excel"
              class="q-mr-lg q-py-sm float-right"
              size="md"
            />
          </div>
          <!--END: table filter,search -->
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import { required, or } from '@vuelidate/validators';
import { mapGetters, mapActions } from "vuex";
export default {
  name: "leadValidation",
  components: {},
  data() {
    return {
      propToggleLeadInformation: false,
      addtnLeadInformation: null,
      filter: "",
      filter1: "",
      toggleAjaxLoadFilter1: false,
      toggleAjaxLoadFilter: false,
      paginationControlchange: {
        rowsNumber: 5,
        page: 1,
        sortBy: "mid",
        descending: false,
        rowsPerPage: 5,
      },
      paginationControl: {
        rowsNumber: 5,
        page: 1,
        sortBy: "mid",
        descending: false,
        rowsPerPage: 5,
      },

      columns: [
        // {
        //   name: "id",
        //   required: true,
        //   label: "S.NO",
        //   align: "left",
        //   field: "id",
        //   sortable: false,
        // },
        {
          name: "S No",
          required: true,
          label: "S No",
          align: "left",
          field: "mid",
          sortable: true,
        },
          {
          name: "tid",
          required: true,
          label: "TID",
          align: "left",
          field: "mid",
          sortable: true,
        },
          {
          name: "Device Serial Number",
          required: true,
          label: "Device Serial Number",
          align: "left",
          field: "mid",
          sortable: true,
        },
        // {
        //   name: "Address",
        //   required: true,
        //   label: "Address",
        //   align: "left",
        //   field: (row) => {
        //     return row.leadInformation.leadAddress;
        //   },
        //   sortable: false,
        // },
        // {
        //   name: "leadInformation.device.deviceName",
        //   required: true,
        //   label: "Device",
        //   align: "left",
        //   field: (row) => {
        //     return row.leadInformation.device.deviceName;
        //   },
        //   sortable: true,
        // },
        // {
        //   name: "mid",
        //   required: true,
        //   label: "MID",
        //   align: "left",
        //   field: "mid",
        //   sortable: true,
        // },
        // {
        //   name: "tid",
        //   required: true,
        //   label: "TID",
        //   align: "left",
        //   field: "tid",
        //   sortable: true,
        // },
        // // {
        // //   name: "Aging",
        // //   required: true,
        // //   label: "Aging",
        // //   align: "left",
        // //   field: (row) => {
        // //     return row.leadInformation.leadStatus;
        // //   },
        // //   sortable: true,
        // // },
        // {
        //   name: "updatedAt",
        //   required: true,
        //   label: "Updated Date",
        //   align: "left",
        //   field: (row) => {
        //     return row.leadInformation.updatedAt;
        //   },
        //   sortable: true,
        // },
        // {
        //   name: "Status",
        //   required: true,
        //   label: "Status",
        //   align: "left",
        //   field: (row) => {
        //     return row.leadInformation.leadStatus;
        //   },
        //   sortable: true,
        // },
        // {
        //   name: "action",
        //   required: true,
        //   label: "",
        //   align: "left",
        //   field: "action",
        //   sortable: false,
        // },
      ],
      columns1: [
       {
          name: "S No",
          required: true,
          label: "S No",
          align: "left",
          field: "mid",
          sortable: true,
        },
          {
          name: "tid",
          required: true,
          label: "TID",
          align: "left",
          field: "mid",
          sortable: true,
        },
          {
          name: "Device Serial Number",
          required: true,
          label: "Device Serial Number",
          align: "left",
          field: "mid",
          sortable: true,
        },
      ],
      tableData: [],
      tableData1: [],
    };
  },
  computed: {
    ...mapGetters("ChangeManagementList", ["getChangeManagementList"]),
    ...mapGetters("CMSList", ["getCMSList"]),
    ...mapGetters("GetMarsData", ["getAllMarsData", "getImplementedQueue"]),
    ...mapGetters("SatLeadValidation", [
      "getShortLeadInfo",
      "getDeviceVerificationStatus",
    ]),
  },
  created() {
    this.$q.loading.show({
      delay: 0, // ms
      spinnerColor: "purple-9",
      message: "Fetching data ..",
    });
    this.IMPLEMENTED_QUEUE("BIB09598")

      // this.FETCH_MARS_DATA(this.getImplementedQueue.leadInformation.id)
      // this.FETCH_SHORT_LEAD_DATA(this.getImplementedQueue.leadInformation.id)
      .then((response) => {
        //  this.FETCH_MARS_DATA(this.getImplementedQueue.leadInformation.id)
        this.FETCH_SHORT_LEAD_DATA(this.getImplementedQueue.leadInformation.id);
        //  this.FETCH_SHORT_LEAD_DATA(this.getImplementedQueue.leadInformation.id)
        this.marsInfo();
        // this.fetchAndCookDocuments();

        (this.formdata.plan = this.getImplementedQueue.leadInformation.plan.id),
          (this.formdata.planCode = this.getImplementedQueue.leadInformation.plan.planName);
        this.formdata.setupFees = this.getImplementedQueue.leadInformation.setupFees;
        this.formdata.recurringFees = this.getImplementedQueue.leadInformation.recurringFees;
        this.formdata.contactName = this.getImplementedQueue.leadInformation.contactName;
        this.formdata.contactNumber = this.getImplementedQueue.leadInformation.contactName;
        this.formdata.alternateContactNumber = this.getImplementedQueue.leadInformation.alternateContactNumber;
        this.formdata.city = this.getImplementedQueue.leadInformation.city;
        this.formdata.device = this.getImplementedQueue.leadInformation.device;
        this.formdata.deviceCount = this.getImplementedQueue.leadInformation.deviceCount;
        this.formdata.leadAddress = this.getImplementedQueue.leadInformation.leadAddress;
        this.formdata.latitude = this.getImplementedQueue.leadInformation.latitude;
        this.formdata.longitude = this.getImplementedQueue.leadInformation.longitude;
        this.formdata.state = this.getImplementedQueue.leadInformation.state;
        // this.formdata.leadCategory=this.getImplementedQueue.leadInformation.leadCategory;
        this.formdata.kyc = this.getImplementedQueue.leadInformation.kyc;
        this.formdata.verifiedBanksubventionStatus = this.getImplementedQueue.leadInformation.verifiedBanksubventionStatus;
        this.formdata.reason = this.getImplementedQueue.leadInformation.reason;
        this.formdata.amountCollected = this.getImplementedQueue.leadInformation.amountCollected;
        this.formdata.merchantCategory = this.getImplementedQueue.leadInformation.merchantCategory;
        // this.formdata.corpCC=this.getImplementedQueue.leadInformation.corpCC;
        // this.formdata.debitGreaterthanAmount=this.getImplementedQueue.leadInformation.debitGreaterthanAmount;
        // this.formdata.debitLessthanAmount=this.getImplementedQueue.leadInformation.debitGreaterthanAmount;
        // this.formdata.premiumCC=this.getImplementedQueue.leadInformation.premiumCC;
        this.formdata.pricing = this.getImplementedQueue.leadInformation.pricing;
        this.formdata.leadStatus = this.getImplementedQueue.leadInformation.leadStatus;
        this.formdata.submittoRSMDate = this.getImplementedQueue.leadInformation.submittoRSMDate;
        this.formdata.posIncentive = this.getImplementedQueue.leadInformation.posIncentive;
        this.formdata.posEnable = this.getImplementedQueue.leadInformation.posEnable;
        this.formdata.leadName = this.getImplementedQueue.leadInformation.leadName;

        (this.formdata1.plan = this.getImplementedQueue.leadInformation.plan.id),
          (this.formdata1.planCode = this.getImplementedQueue.leadInformation.plan.planName);
        this.formdata1.setupFees = this.getImplementedQueue.leadInformation.setupFees;
        this.formdata1.recurringFees = this.getImplementedQueue.leadInformation.recurringFees;
        this.formdata1.contactName = this.getImplementedQueue.leadInformation.contactName;
        this.formdata1.contactNumber = this.getImplementedQueue.leadInformation.contactName;
        this.formdata1.alternateContactNumber = this.getImplementedQueue.leadInformation.alternateContactNumber;
        this.formdata1.city = this.getImplementedQueue.leadInformation.city;
        this.formdata1.device = this.getImplementedQueue.leadInformation.device;
        this.formdata1.deviceCount = this.getImplementedQueue.leadInformation.deviceCount;
        this.formdata1.leadAddress = this.getImplementedQueue.leadInformation.leadAddress;
        this.formdata1.latitude = this.getImplementedQueue.leadInformation.latitude;
        this.formdata1.longitude = this.getImplementedQueue.leadInformation.longitude;
        this.formdata1.state = this.getImplementedQueue.leadInformation.state;
        // this.formdata1.leadCategory=this.getImplementedQueue.leadInformation.leadCategory;
        this.formdata1.kyc = this.getImplementedQueue.leadInformation.kyc;
        this.formdata1.verifiedBanksubventionStatus = this.getImplementedQueue.leadInformation.verifiedBanksubventionStatus;
        this.formdata1.reason = this.getImplementedQueue.leadInformation.reason;
        this.formdata1.amountCollected = this.getImplementedQueue.leadInformation.amountCollected;
        this.formdata1.merchantCategory = this.getImplementedQueue.leadInformation.merchantCategory;
        // this.formdata1.corpCC=this.getShortLeadInfo.corpCC;
        // this.formdata1.debitGreaterthanAmount=this.getShortLeadInfo.debitGreaterthanAmount;
        // this.formdata1.debitLessthanAmount=this.getShortLeadInfo.debitGreaterthanAmount;
        // this.formdata1.premiumCC=this.getShortLeadInfo.premiumCC;
        this.formdata1.pricing = this.getImplementedQueue.leadInformation.pricing;
        this.formdata1.leadStatus = this.getImplementedQueue.leadInformation.leadStatus;
        this.formdata1.submittoRSMDate = this.getImplementedQueue.leadInformation.submittoRSMDate;
        this.formdata1.posIncentive = this.getImplementedQueue.leadInformation.posIncentive;
        this.formdata1.posEnable = this.getImplementedQueue.leadInformation.posEnable;
        this.formdata1.leadName = this.getImplementedQueue.leadInformation.leadName;
        this.merchant.mdrPlan.domesticDebitUpTo2000.percentage = this.getImplementedQueue.leadInformation.debitLessthanAmount;
        this.merchant.mdrPlan.domesticDebitAbove2000.percentage = this.getImplementedQueue.leadInformation.debitGreaterthanAmount;
        this.merchant.mdrPlan.standardOrClassic.percentage = this.getImplementedQueue.leadInformation.stdCC;
        this.merchant.mdrPlan.premiumOrPlatinum.percentage = this.getImplementedQueue.leadInformation.premiumCC;
        this.merchant.mdrPlan.superPremiumOrSignature.percentage = this.getImplementedQueue.leadInformation.superPremiumlCC;
        this.merchant.mdrPlan.commercialOrCorporate.percentage = this.getImplementedQueue.leadInformation.corpCC;
        this.merchant.mdrPlan.internationalCreditCard.percentage = this.getImplementedQueue.leadInformation.intlCC;
        this.merchantTypeSelection = this.getImplementedQueue.leadInformation.merchantType.merchantTypeName;
        // this.formdata.plan=this.getShortLeadInfo.plan.id,
        // this.formdata.planCode=this.getShortLeadInfo.plan.planName;
        // this.formdata.setupFees=this.getShortLeadInfo.setupFees;
        // this.formdata.recurringFees=this.getShortLeadInfo.recurringFees;
        // this.formdata.contactName=this.getShortLeadInfo.contactName;
        // this.formdata.contactNumber=this.getShortLeadInfo.contactName;
        // this.formdata.alternateContactNumber=this.getShortLeadInfo.alternateContactNumber;
        // this.formdata.city=this.getShortLeadInfo.city;
        // this.formdata.device=this.getShortLeadInfo.device;
        // this.formdata.deviceCount=this.getShortLeadInfo.deviceCount;
        // this.formdata.leadAddress=this.getShortLeadInfo.leadAddress;
        // this.formdata.latitude=this.getShortLeadInfo.latitude;
        // this.formdata.longitude=this.getShortLeadInfo.longitude;
        // this.formdata.state=this.getShortLeadInfo.state;
        // // this.formdata.leadCategory=this.getShortLeadInfo.leadCategory;
        // this.formdata.kyc=this.getShortLeadInfo.kyc;
        // this.formdata.verifiedBanksubventionStatus=this.getShortLeadInfo.verifiedBanksubventionStatus;
        // this.formdata.reason=this.getShortLeadInfo.reason;
        // this.formdata.amountCollected=this.getShortLeadInfo.amountCollected;
        // this.formdata.merchantCategory=this.getShortLeadInfo.merchantCategory;
        // this.formdata.corpCC=this.getShortLeadInfo.corpCC;
        // this.formdata.debitGreaterthanAmount=this.getShortLeadInfo.debitGreaterthanAmount;
        // this.formdata.debitLessthanAmount=this.getShortLeadInfo.debitGreaterthanAmount;
        // this.formdata.premiumCC=this.getShortLeadInfo.premiumCC;
        // // this.formdata.pricing=this.getShortLeadInfo.pricing;
        // this.formdata.leadStatus=this.getShortLeadInfo.leadStatus;
        // this.formdata.submittoRSMDate=this.getShortLeadInfo.submittoRSMDate;
        // this.formdata.posIncentive=this.getShortLeadInfo.posIncentive;
        // this.formdata.posEnable=this.getShortLeadInfo.posEnable;
        // this.formdata.leadName=this.getShortLeadInfo.leadName
        // this.merchant.companyinformation.pan=this.getAllMarsData.companyInformation.pan;
        // this.merchant.companyinformation.contactPhone=this.getAllMarsData.companyInformation.contactPhone;
        // this.merchant.companyinformation.legalName=this.getAllMarsData.companyInformation.legalName;
        // this.merchant.companyinformation.dbaName=this.getAllMarsData.companyInformation.dbaName;
        // this.merchant.companyinformation.registeredAddress=this.getAllMarsData.companyInformation.registeredAddress;
        // this.merchant.companyinformation.registeredPin=this.getAllMarsData.companyInformation.registeredPin;
        // this.merchant.companyinformation.registeredCityRefCode=this.getAllMarsData.companyInformation.registeredCityRefCode;
        // this.merchant.companyinformation.registeredCityName=this.getAllMarsData.companyInformation.registeredCityName;
        // this.merchant.companyinformation.registeredStateRefCode=this.getAllMarsData.companyInformation.registeredStateRefCode;
        // this.merchant.companyinformation.registeredStateName=this.getAllMarsData.companyInformation.registeredStateName;
        // this.merchant.companyinformation.contactName=this.getAllMarsData.companyInformation.contactName;
        // this.merchant.companyinformation.statementEmail=this.getAllMarsData.companyInformation.statementEmail;
        // this.merchant.companyinformation.applicationNumber=this.getAllMarsData.salesInformation.applicationNumber;
        // this.merchant.companyinformation.contactEmail=this.getAllMarsData.companyInformation.contactEmail;
        // this.merchant.companyinformation.contactMobile=this.getAllMarsData.companyInformation.contactMobile;
        // this.merchant.companyinformation.businessNature=this.getAllMarsData.companyInformation.businessNature;
        // // this.formdata.merchant.companyinformation.gst=this.getAllMarsData.companyInformation.gst
        // // this.merchant.businessInformation.gstId=this.getAllMarsData.businessInformation.gst
        // this.merchant.bankInformation.bankDetails.accountNumber=this.getAllMarsData.bankInformation.bankDetails.accountNumber
        // this.merchant.bankInformation.bankDetails.ifsc=this.getAllMarsData.bankInformation.bankDetails.ifsc
        // this.merchant.bankInformation.bankDetails.bankName=this.getAllMarsData.bankInformation.bankDetails.bankName
        // this.merchant.bankInformation.bankDetails.paymentMode=this.getAllMarsData.bankInformation.bankDetails.paymentMode
        // this.merchant.bankInformation.bankDetails.accountType=this.getAllMarsData.bankInformation.bankDetails.accountType
        // this.merchant.paymentDetails.settlementType=this.getAllMarsData.paymentDetails.settlementType
        // // this.merchant.paymentDetails.settlementType=this.getAllMarsData.paymentDetails.settlementType
        // this.merchant.paymentDetails.tipEnabled=this.getAllMarsData.paymentDetails.tipEnabled
        // this.merchant.paymentDetails.cashAtPosEnabled=this.getAllMarsData.paymentDetails.cashAtPosEnabled
        // this.merchant.paymentDetails.intlCardAcceptance=this.getAllMarsData.paymentDetails.intlCardAcceptance
        // this.merchant.paymentDetails.preAuth=this.getAllMarsData.paymentDetails.preAuth
        // this.merchant.paymentDetails.rentalPlanCode=this.getAllMarsData.paymentDetails.rentalPlanCode;
        // this.merchant.salesInformation.institutionCode=this.getAllMarsData.salesInformation.institutionCode

        this.$q.loading.hide();
      })
      .catch(() => {
        this.$q.loading.hide();
      });
    this.toggleAjaxLoadFilter = false;
  },
  mounted() {
    this.ajaxLoadAllLeadInfo({
      pagination: this.paginationControl,
      filter: this.filter,
    });
    this.ajaxLoadAllCMS({
      pagination: this.paginationControlchange,
      filter: this.filter1,
    });
  },
  methods: {
    ...mapActions("ChangeManagementList", ["CHANGE_MANAGEMENT_LIST"]),
    ...mapActions("CMSList", ["CMS_LIST"]),
    ...mapActions("SuperAdminUsers", ["EDIT_CMS"]),
    ...mapActions("GetMarsData", ["FETCH_MARS_DATA", "IMPLEMENTED_QUEUE"]),
    ...mapActions("SatLeadValidation", [
      "FEED_HAND_OVER_TO_SAT_DOCUMENT",
      "FEED_CHEQUE_FORM",
      "FEED_FULL_APPLICATION_FORM",
      "DELETE_DOCUMENT_FROM_BY_SAT",
      "FETCH_LEAD_DOCUMENT_TYPE_DATA",
      "FETCH_SHORT_LEAD_DATA",
    ]),

    //Load all short lead info while page loading
    ajaxLoadAllLeadInfo({ pagination, filter }) {
      // we set QTable to "loading" state
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data ..",
      });
      this.CHANGE_MANAGEMENT_LIST({ pagination, filter })
        .then((res) => {
          // updating pagination to reflect in the UI
          this.paginationControl = pagination;

          // we also set (or update) rowsNumber
          this.paginationControl.rowsNumber = this.getChangeManagementList.totalElements;
          this.paginationControl.page = this.getChangeManagementList.number + 1;

          // then we update the rows with the fetched ones
          this.tableData1 = this.getChangeManagementList.content;
          if (this.getChangeManagementList.sort != null) {
            this.paginationControl.sortBy = this.getChangeManagementList.sort[0].property;
            this.paginationControl.descending = this.getChangeManagementList.sort[0].ascending;
          }

          // finally we tell QTable to exit the "loading" state
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },
    ajaxLoadAllCMS({ pagination, filter }) {
      // we set QTable to "loading" state
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data ..",
      });
      this.CMS_LIST({ pagination, filter })
        .then((res) => {
          // updating pagination to reflect in the UI
          this.paginationControlchange = pagination;

          // we also set (or update) rowsNumber
          this.paginationControlchange.rowsNumber = this.getCMSList.totalElements;
          this.paginationControlchange.page = this.getCMSList.number + 1;

          // then we update the rows with the fetched ones
          this.tableData = this.getCMSList.content;
          // if (this.getCMSList.sortBy != null) {
          //   this.paginationControlchange.sortBy = this.getCMSList.sort[0].property;
          //   this.paginationControlchange.descending = this.getCMSList.sort[0].ascending;
          // }

          // finally we tell QTable to exit the "loading" state
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },
    dataInfo() {
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data ..",
      });
      this.IMPLEMENTED_QUEUE(BIB09598)

        // this.FETCH_MARS_DATA(this.getImplementedQueue.leadInformation.id)
        // this.FETCH_SHORT_LEAD_DATA(this.getImplementedQueue.leadInformation.id)
        .then((response) => {
          //  this.FETCH_MARS_DATA(this.getImplementedQueue.leadInformation.id)
          this.FETCH_SHORT_LEAD_DATA(
            this.getImplementedQueue.leadInformation.id
          );
          //  this.FETCH_SHORT_LEAD_DATA(this.getImplementedQueue.leadInformation.id)
          this.marsInfo();
          // this.fetchAndCookDocuments();

          (this.formdata.plan = this.getImplementedQueue.leadInformation.plan.id),
            (this.formdata.planCode = this.getImplementedQueue.leadInformation.plan.planName);
          this.formdata.setupFees = this.getImplementedQueue.leadInformation.setupFees;
          this.formdata.recurringFees = this.getImplementedQueue.leadInformation.recurringFees;
          this.formdata.contactName = this.getImplementedQueue.leadInformation.contactName;
          this.formdata.contactNumber = this.getImplementedQueue.leadInformation.contactName;
          this.formdata.alternateContactNumber = this.getImplementedQueue.leadInformation.alternateContactNumber;
          this.formdata.city = this.getImplementedQueue.leadInformation.city;
          this.formdata.device = this.getImplementedQueue.leadInformation.device;
          this.formdata.deviceCount = this.getImplementedQueue.leadInformation.deviceCount;
          this.formdata.leadAddress = this.getImplementedQueue.leadInformation.leadAddress;
          this.formdata.latitude = this.getImplementedQueue.leadInformation.latitude;
          this.formdata.longitude = this.getImplementedQueue.leadInformation.longitude;
          this.formdata.state = this.getImplementedQueue.leadInformation.state;
          // this.formdata.leadCategory=this.getImplementedQueue.leadInformation.leadCategory;
          this.formdata.kyc = this.getImplementedQueue.leadInformation.kyc;
          this.formdata.verifiedBanksubventionStatus = this.getImplementedQueue.leadInformation.verifiedBanksubventionStatus;
          this.formdata.reason = this.getImplementedQueue.leadInformation.reason;
          this.formdata.amountCollected = this.getImplementedQueue.leadInformation.amountCollected;
          this.formdata.merchantCategory = this.getImplementedQueue.leadInformation.merchantCategory;
          // this.formdata.corpCC=this.getImplementedQueue.leadInformation.corpCC;
          // this.formdata.debitGreaterthanAmount=this.getImplementedQueue.leadInformation.debitGreaterthanAmount;
          // this.formdata.debitLessthanAmount=this.getImplementedQueue.leadInformation.debitGreaterthanAmount;
          // this.formdata.premiumCC=this.getImplementedQueue.leadInformation.premiumCC;
          this.formdata.pricing = this.getImplementedQueue.leadInformation.pricing;
          this.formdata.leadStatus = this.getImplementedQueue.leadInformation.leadStatus;
          this.formdata.submittoRSMDate = this.getImplementedQueue.leadInformation.submittoRSMDate;
          this.formdata.posIncentive = this.getImplementedQueue.leadInformation.posIncentive;
          this.formdata.posEnable = this.getImplementedQueue.leadInformation.posEnable;
          this.formdata.leadName = this.getImplementedQueue.leadInformation.leadName;

          (this.formdata1.plan = this.getImplementedQueue.leadInformation.plan.id),
            (this.formdata1.planCode = this.getImplementedQueue.leadInformation.plan.planName);
          this.formdata1.setupFees = this.getImplementedQueue.leadInformation.setupFees;
          this.formdata1.recurringFees = this.getImplementedQueue.leadInformation.recurringFees;
          this.formdata1.contactName = this.getImplementedQueue.leadInformation.contactName;
          this.formdata1.contactNumber = this.getImplementedQueue.leadInformation.contactName;
          this.formdata1.alternateContactNumber = this.getImplementedQueue.leadInformation.alternateContactNumber;
          this.formdata1.city = this.getImplementedQueue.leadInformation.city;
          this.formdata1.device = this.getImplementedQueue.leadInformation.device;
          this.formdata1.deviceCount = this.getImplementedQueue.leadInformation.deviceCount;
          this.formdata1.leadAddress = this.getImplementedQueue.leadInformation.leadAddress;
          this.formdata1.latitude = this.getImplementedQueue.leadInformation.latitude;
          this.formdata1.longitude = this.getImplementedQueue.leadInformation.longitude;
          this.formdata1.state = this.getImplementedQueue.leadInformation.state;
          // this.formdata1.leadCategory=this.getImplementedQueue.leadInformation.leadCategory;
          this.formdata1.kyc = this.getImplementedQueue.leadInformation.kyc;
          this.formdata1.verifiedBanksubventionStatus = this.getImplementedQueue.leadInformation.verifiedBanksubventionStatus;
          this.formdata1.reason = this.getImplementedQueue.leadInformation.reason;
          this.formdata1.amountCollected = this.getImplementedQueue.leadInformation.amountCollected;
          this.formdata1.merchantCategory = this.getImplementedQueue.leadInformation.merchantCategory;
          // this.formdata1.corpCC=this.getShortLeadInfo.corpCC;
          // this.formdata1.debitGreaterthanAmount=this.getShortLeadInfo.debitGreaterthanAmount;
          // this.formdata1.debitLessthanAmount=this.getShortLeadInfo.debitGreaterthanAmount;
          // this.formdata1.premiumCC=this.getShortLeadInfo.premiumCC;
          this.formdata1.pricing = this.getImplementedQueue.leadInformation.pricing;
          this.formdata1.leadStatus = this.getImplementedQueue.leadInformation.leadStatus;
          this.formdata1.submittoRSMDate = this.getImplementedQueue.leadInformation.submittoRSMDate;
          this.formdata1.posIncentive = this.getImplementedQueue.leadInformation.posIncentive;
          this.formdata1.posEnable = this.getImplementedQueue.leadInformation.posEnable;
          this.formdata1.leadName = this.getImplementedQueue.leadInformation.leadName;
          this.merchant.mdrPlan.domesticDebitUpTo2000.percentage = this.getImplementedQueue.leadInformation.debitLessthanAmount;
          this.merchant.mdrPlan.domesticDebitAbove2000.percentage = this.getImplementedQueue.leadInformation.debitGreaterthanAmount;
          this.merchant.mdrPlan.standardOrClassic.percentage = this.getImplementedQueue.leadInformation.stdCC;
          this.merchant.mdrPlan.premiumOrPlatinum.percentage = this.getImplementedQueue.leadInformation.premiumCC;
          this.merchant.mdrPlan.superPremiumOrSignature.percentage = this.getImplementedQueue.leadInformation.superPremiumlCC;
          this.merchant.mdrPlan.commercialOrCorporate.percentage = this.getImplementedQueue.leadInformation.corpCC;
          this.merchant.mdrPlan.internationalCreditCard.percentage = this.getImplementedQueue.leadInformation.intlCC;
          this.merchantTypeSelection = this.getImplementedQueue.leadInformation.merchantType.merchantTypeName;
          // this.formdata.plan=this.getShortLeadInfo.plan.id,
          // this.formdata.planCode=this.getShortLeadInfo.plan.planName;
          // this.formdata.setupFees=this.getShortLeadInfo.setupFees;
          // this.formdata.recurringFees=this.getShortLeadInfo.recurringFees;
          // this.formdata.contactName=this.getShortLeadInfo.contactName;
          // this.formdata.contactNumber=this.getShortLeadInfo.contactName;
          // this.formdata.alternateContactNumber=this.getShortLeadInfo.alternateContactNumber;
          // this.formdata.city=this.getShortLeadInfo.city;
          // this.formdata.device=this.getShortLeadInfo.device;
          // this.formdata.deviceCount=this.getShortLeadInfo.deviceCount;
          // this.formdata.leadAddress=this.getShortLeadInfo.leadAddress;
          // this.formdata.latitude=this.getShortLeadInfo.latitude;
          // this.formdata.longitude=this.getShortLeadInfo.longitude;
          // this.formdata.state=this.getShortLeadInfo.state;
          // // this.formdata.leadCategory=this.getShortLeadInfo.leadCategory;
          // this.formdata.kyc=this.getShortLeadInfo.kyc;
          // this.formdata.verifiedBanksubventionStatus=this.getShortLeadInfo.verifiedBanksubventionStatus;
          // this.formdata.reason=this.getShortLeadInfo.reason;
          // this.formdata.amountCollected=this.getShortLeadInfo.amountCollected;
          // this.formdata.merchantCategory=this.getShortLeadInfo.merchantCategory;
          // this.formdata.corpCC=this.getShortLeadInfo.corpCC;
          // this.formdata.debitGreaterthanAmount=this.getShortLeadInfo.debitGreaterthanAmount;
          // this.formdata.debitLessthanAmount=this.getShortLeadInfo.debitGreaterthanAmount;
          // this.formdata.premiumCC=this.getShortLeadInfo.premiumCC;
          // // this.formdata.pricing=this.getShortLeadInfo.pricing;
          // this.formdata.leadStatus=this.getShortLeadInfo.leadStatus;
          // this.formdata.submittoRSMDate=this.getShortLeadInfo.submittoRSMDate;
          // this.formdata.posIncentive=this.getShortLeadInfo.posIncentive;
          // this.formdata.posEnable=this.getShortLeadInfo.posEnable;
          // this.formdata.leadName=this.getShortLeadInfo.leadName
          // this.merchant.companyinformation.pan=this.getAllMarsData.companyInformation.pan;
          // this.merchant.companyinformation.contactPhone=this.getAllMarsData.companyInformation.contactPhone;
          // this.merchant.companyinformation.legalName=this.getAllMarsData.companyInformation.legalName;
          // this.merchant.companyinformation.dbaName=this.getAllMarsData.companyInformation.dbaName;
          // this.merchant.companyinformation.registeredAddress=this.getAllMarsData.companyInformation.registeredAddress;
          // this.merchant.companyinformation.registeredPin=this.getAllMarsData.companyInformation.registeredPin;
          // this.merchant.companyinformation.registeredCityRefCode=this.getAllMarsData.companyInformation.registeredCityRefCode;
          // this.merchant.companyinformation.registeredCityName=this.getAllMarsData.companyInformation.registeredCityName;
          // this.merchant.companyinformation.registeredStateRefCode=this.getAllMarsData.companyInformation.registeredStateRefCode;
          // this.merchant.companyinformation.registeredStateName=this.getAllMarsData.companyInformation.registeredStateName;
          // this.merchant.companyinformation.contactName=this.getAllMarsData.companyInformation.contactName;
          // this.merchant.companyinformation.statementEmail=this.getAllMarsData.companyInformation.statementEmail;
          // this.merchant.companyinformation.applicationNumber=this.getAllMarsData.salesInformation.applicationNumber;
          // this.merchant.companyinformation.contactEmail=this.getAllMarsData.companyInformation.contactEmail;
          // this.merchant.companyinformation.contactMobile=this.getAllMarsData.companyInformation.contactMobile;
          // this.merchant.companyinformation.businessNature=this.getAllMarsData.companyInformation.businessNature;
          // // this.formdata.merchant.companyinformation.gst=this.getAllMarsData.companyInformation.gst
          // // this.merchant.businessInformation.gstId=this.getAllMarsData.businessInformation.gst
          // this.merchant.bankInformation.bankDetails.accountNumber=this.getAllMarsData.bankInformation.bankDetails.accountNumber
          // this.merchant.bankInformation.bankDetails.ifsc=this.getAllMarsData.bankInformation.bankDetails.ifsc
          // this.merchant.bankInformation.bankDetails.bankName=this.getAllMarsData.bankInformation.bankDetails.bankName
          // this.merchant.bankInformation.bankDetails.paymentMode=this.getAllMarsData.bankInformation.bankDetails.paymentMode
          // this.merchant.bankInformation.bankDetails.accountType=this.getAllMarsData.bankInformation.bankDetails.accountType
          // this.merchant.paymentDetails.settlementType=this.getAllMarsData.paymentDetails.settlementType
          // // this.merchant.paymentDetails.settlementType=this.getAllMarsData.paymentDetails.settlementType
          // this.merchant.paymentDetails.tipEnabled=this.getAllMarsData.paymentDetails.tipEnabled
          // this.merchant.paymentDetails.cashAtPosEnabled=this.getAllMarsData.paymentDetails.cashAtPosEnabled
          // this.merchant.paymentDetails.intlCardAcceptance=this.getAllMarsData.paymentDetails.intlCardAcceptance
          // this.merchant.paymentDetails.preAuth=this.getAllMarsData.paymentDetails.preAuth
          // this.merchant.paymentDetails.rentalPlanCode=this.getAllMarsData.paymentDetails.rentalPlanCode;
          // this.merchant.salesInformation.institutionCode=this.getAllMarsData.salesInformation.institutionCode

          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
      this.toggleAjaxLoadFilter = false;
    },
    fnEdit(rowDetails) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Are you sure want to Edit Lead?",
          ok: "Continue",
          cancel: "Cancel",
        })
        .then(() => {
          this.$q.loading.show({
            delay: 100, // ms
            message: "Please Wait",
            spinnerColor: "purple-9",
            customClass: "shadow-none",
          });
          this.EDIT_CMS(rowDetails)
            .then((response) => {
              // this.FETCH_ALL_REGIONS_DATA();
              this.ajaxLoadAllLeadInfo({
                pagination: this.paginationControl,
                filter: this.filter,
              });
              this.ajaxLoadAllCMS({
                pagination: this.paginationControlchange,
                filter: this.filter1,
              });
              this.$q.notify({
                color: "positive",
                position: "bottom",
                message: "Successfully Edited" + "-" + rowDetails,
                icon: "thumb_up",
              });
            })
            .catch((error) => {
              this.$q.notify({
                color: "negative",
                position: "bottom",
                message: "Please try again!",
                icon: "thumb_down",
              });
            });
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message: "No changes made!",
            icon: "thumb_down",
          });
        });
    },

    //Function pull to refresh
    PullToRefresh(done) {
      this.ajaxLoadAllLeadInfo({
        pagination: this.paginationControl,
        filter: this.filter,
      });
    },

    // Function to toggle lead information pop up screen
    toggleLeadInformation(leadDetails) {
      console.log(leadDetails);
      this.propToggleLeadInformation = !this.propToggleLeadInformation;
      if (leadDetails != undefined) {
        this.addtnLeadInformation = leadDetails;
      }
    },
  },
};
</script>

<style scoped>
.q-btn-flat,
.q-btn-outline {
  min-width: 100px !important;
}
</style>
