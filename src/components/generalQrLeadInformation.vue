<template>
    <div>
      <q-dialog
        v-model="opened"
        class="q-mt-lg capitalize"
        @hide="emitToggleRemarks"
        @escape-key="emitToggleRemarks"
        :content-css="{minWidth:'30vw',padding:'20px'}"
      >
        <div class="row items-center bottom-border q-py-sm">
          <div class="col">Lead Information</div>
          <div class="col-auto">
            <q-btn round size="sm" @click="emitToggleRemarks" outline color="dark" icon="clear"/>
          </div>
        </div>
  
        <!-- START >> Lead information -->
        <div class="row">
          <div>
            <q-scroll-area style="width: 400px; height: 375px;">
              <q-list multiline separator class="text-body1">
                <!-- <q-item multiline>
                  <q-item-section
                    label="Category"
                    :sublabel="propLeadInformation.leadCategory == 1? 'Normal':propLeadInformation.leadCategory == 2? 'Exception': propLeadInformation.leadCategory == 3? 'Aggregator': 'NA'"
                  />
                </q-item> -->
                <!-- <q-item multiline v-if="propLeadInformation.leadCategory == 2">
                  <q-item-section v-if="propLeadInformation.kyc">
                    <q-chip icon="warning" color="primary">KYC</q-chip>
                  </q-item-section>
                  <q-item-section v-if="propLeadInformation.bankSubvention">
                    <q-chip icon="warning" color="primary">Bank Subvention</q-chip>
                  </q-item-section>
                  <q-item-section v-if="propLeadInformation.pricing">
                    <q-chip icon="warning" color="primary">Pricing</q-chip>
                  </q-item-section>
                </q-item> -->
                <!-- <q-item multiline>
                  <q-item-section
                    label="Document upload type"
                    :sublabel="propLeadInformation.documentUploadedType == 1? 'Handover to SAT': 'Full document upload'"
                  />
                </q-item> -->
                <q-item multiline>
                  <q-item-section
                    label="SO Name"
                    :sublabel="propLeadInformation.createdBy== null?'NA':propLeadInformation.createdBy.name"
                  />
                </q-item>
                <q-item multiline>
                  <q-item-section label="Merchant Name" :sublabel="propLeadInformation.merchantName"/>
                </q-item>
                <q-item multiline>
                  <q-item-section
                    label="Source"
                    v-if="'leadSource' in propLeadInformation"
                    :sublabel="propLeadInformation.leadSource.sourceName"
                  />
                </q-item>
                <q-item multiline>
                  <q-item-section label="Contact Name" :sublabel="propLeadInformation.contactName"/>
                </q-item>
                <q-item multiline>
                  <q-item-section label="Contact Number" :sublabel="propLeadInformation.contactNumber"/>
                </q-item>
                <!-- <q-item multiline>
                  <q-item-section
                    label="Alternate Contact Number"
                    :sublabel="propLeadInformation.alternateContactNumber || 'NA'"
                  />
                </q-item> -->
                <q-item multiline>
                  <q-item-section label="Contact Email" :sublabel="propLeadInformation.contactEmail || 'NA'"/>
                </q-item>
                <q-item multiline>
                  <q-item-section
                    lines="5"
                    label="Address"
                    :sublabel="propLeadInformation.contactAddress+', '+propLeadInformation.city+', '+propLeadInformation.state+', '+propLeadInformation.pincode"
                  />
                </q-item>
                <q-item multiline>
                  <q-item-section
                    label="Device Type"
                    v-if="'device' in propLeadInformation"
                    :sublabel="propLeadInformation.device.deviceName"
                  />
                </q-item>
                <q-item multiline>
                  <q-item-section
                    label="Plan"
                    :sublabel="propLeadInformation.plan == null? 'NA':propLeadInformation.plan.planName"
                  />
                </q-item>
                <q-item multiline>
                  <q-item-section label="Setup Fees" :sublabel="'Rs. '+propLeadInformation.setupFees"/>
                </q-item>
                <q-item multiline>
                  <q-item-section
                    label="Recurring Fees"
                    :sublabel="'Rs. '+propLeadInformation.recurringFees"
                  />
                </q-item>
                <!-- <q-item multiline>
                  <q-item-section
                    label="Amount Collected"
                    :sublabel="'Rs. '+propLeadInformation.amountCollected"
                  />
                </q-item> -->
                <q-item
                  multiline
                  v-if="propLeadInformation.qrMerchantType != null && 'qrMerchantType' in propLeadInformation.qrMerchantType"
                >
                  <q-item-section
                    label="Merchant Type"
                    :sublabel="propLeadInformation.qrMerchantType.qrMerchantType"
                  />
                </q-item>
                <!-- <q-item multiline>
                  <q-item-section
                    label="Static UPI > 2000"
                    :sublabel="propLeadInformation.staticUpigreaterThanTwo+' %'"
                  />
                </q-item>
                <q-item multiline>
                  <q-item-section
                    label="Static UPI < 2000"
                    :sublabel="propLeadInformation.staticUpiLessThanTwo+' %'"
                  />
                </q-item>
                <q-item multiline>
                  <q-item-section label="Static UPI debit Card" :sublabel="propLeadInformation.staticUpiDebitCard+' %'"/>
                </q-item>
                <q-item multiline>
                  <q-item-section label="Static UPI Credit Card and Prepaid" :sublabel="propLeadInformation.staticUpicreditCardAndPrepaid+' %'"/>
                </q-item> -->
              </q-list>
            </q-scroll-area>
          </div>
        </div>
        <!-- END >> Lead information -->
      </q-dialog>
    </div>
  </template>
  
  <script>
import { and } from '@vuelidate/validators';
  import { mapGetters, mapActions } from "vuex";
  export default {
    props: ["QrleadInformation", "propToggleQrLeadInformationPop"],
    data() {
      return {
        search: "",
        propLeadInformation: {},
        opened: this.propToggleQrLeadInformationPop
      };
    },
    created() {
      this.ajaxLoadShortLeadInfo();
    },
    computed: {
      ...mapGetters("iciciStaticQr", ["getAllStaticQrShortLeadDatas"])
    },
    methods: {
      ...mapActions("iciciStaticQr", ["FETCH_STATIC_QR_SHORT_LEAD_DATA"]),
      //Function to load all lead details
      ajaxLoadShortLeadInfo() {
        this.$q.loading.show({
          delay: 0, // ms
          spinnerColor: "purple-9",
          message: "Fetching data .."
        });
        this.FETCH_STATIC_QR_SHORT_LEAD_DATA(
          this.QrleadInformation.leadId || this.QrleadInformation.id
        )
          .then(response => {
            this.propLeadInformation = this.getAllStaticQrShortLeadDatas;
            this.$q.loading.hide();
          })
          .catch(() => {
            this.$q.loading.hide();
          });
      },
      emitToggleRemarks() {
        this.$emit("closeLeadInformation");
      }
    }
  };
  </script>
  
  <style>
  </style>
  