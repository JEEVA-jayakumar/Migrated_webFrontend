<template>
  <div>
    <q-modal
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
            <q-list multiline separator class="q-body-1">
              <q-item multiline>
                <q-item-main
                  label="Category"
                  :sublabel="propLeadInformation.leadCategory == 1? 'Normal':propLeadInformation.leadCategory == 2? 'Exception': 'NA'"
                />
              </q-item>
              <q-item multiline v-if="propLeadInformation.leadCategory == 2">
                <q-item-side v-if="propLeadInformation.kyc">
                  <q-chip icon="warning" color="primary">KYC</q-chip>
                </q-item-side>
                <q-item-side v-if="propLeadInformation.bankSubvention">
                  <q-chip icon="warning" color="primary">Bank Subvention</q-chip>
                </q-item-side>
                <q-item-side v-if="propLeadInformation.pricing">
                  <q-chip icon="warning" color="primary">Pricing</q-chip>
                </q-item-side>
              </q-item>
              <q-item multiline>
                <q-item-main
                  label="Document upload type"
                  :sublabel="propLeadInformation.documentUploadedType == 1? 'Handover to SAT': 'Full document upload'"
                />
              </q-item>
              <q-item multiline>
                <q-item-main
                  label="SO Name"
                  :sublabel="propLeadInformation.assignedTo== null?'NA':propLeadInformation.assignedTo.name"
                />
              </q-item>
              <q-item multiline>
                <q-item-main label="Merchant Name" :sublabel="propLeadInformation.leadName"/>
              </q-item>
              <q-item multiline>
                <q-item-main label="Source" :sublabel="propLeadInformation.leadSource.sourceName"/>
              </q-item>
              <q-item multiline>
                <q-item-main label="Contact Name" :sublabel="propLeadInformation.contactName"/>
              </q-item>
              <q-item multiline>
                <q-item-main label="Contact Number" :sublabel="propLeadInformation.contactNumber"/>
              </q-item>
              <q-item multiline>
                <q-item-main
                  label="Alternate Contact Number"
                  :sublabel="propLeadInformation.alternateContactNumber || 'NA'"
                />
              </q-item>
              <q-item multiline>
                <q-item-main label="Contact Email" :sublabel="propLeadInformation.email || 'NA'"/>
              </q-item>
              <q-item multiline>
                <q-item-main
                  lines="5"
                  label="Address"
                  :sublabel="propLeadInformation.leadAddress+', '+propLeadInformation.city+', '+propLeadInformation.state+', '+propLeadInformation.pincode"
                />
              </q-item>
              <q-item multiline>
                <q-item-main
                  label="Device Count"
                  :sublabel="propLeadInformation.device.deviceName+'-'+propLeadInformation.deviceCount"
                />
              </q-item>
              <q-item multiline>
                <q-item-main
                  label="Plan"
                  :sublabel="propLeadInformation.plan == null? 'NA':propLeadInformation.plan.planName"
                />
              </q-item>
              <q-item multiline>
                <q-item-main label="Setup Fees" :sublabel="'Rs. '+propLeadInformation.setupFees"/>
              </q-item>
              <q-item multiline>
                <q-item-main
                  label="Recurring Fees"
                  :sublabel="'Rs. '+propLeadInformation.recurringFees"
                />
              </q-item>
              <q-item multiline>
                <q-item-main
                  label="Amount Collected"
                  :sublabel="'Rs. '+propLeadInformation.amountCollected"
                />
              </q-item>
              <q-item multiline v-if="merchantType in propLeadInformation?true:false">
                <q-item-main
                  label="Merchant Type"
                  :sublabel="'Rs. '+propLeadInformation.merchantType.merchantTypeName"
                />
              </q-item>
              <q-item multiline>
                <q-item-main
                  label="Debit &lt;= 2000"
                  :sublabel="'Rs. '+propLeadInformation.debitLessthanAmount"
                />
              </q-item>
              <q-item multiline>
                <q-item-main
                  label="Debit > 2000"
                  :sublabel="propLeadInformation.debitGreaterthanAmount+' %'"
                />
              </q-item>
              <q-item multiline>
                <q-item-main label="Std CC" :sublabel="propLeadInformation.stdCC+' %'"/>
              </q-item>
              <q-item multiline>
                <q-item-main label="Premium CC" :sublabel="propLeadInformation.premiumCC+' %'"/>
              </q-item>
              <q-item multiline>
                <q-item-main label="Corp CC" :sublabel="propLeadInformation.corpCC+' %'"/>
              </q-item>
              <q-item multiline>
                <q-item-main
                  label="SuperPremium CC"
                  :sublabel="propLeadInformation.superPremiumlCC+' %'"
                />
              </q-item>
            </q-list>
          </q-scroll-area>
        </div>
      </div>
      <!-- END >> Lead information -->
    </q-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["leadInfo", "propToggleLeadInformationPop"],
  data() {
    return {
      search: "",
      propLeadInformation: {},
      opened: this.propToggleLeadInformationPop
    };
  },
  created() {
    this.ajaxLoadShortLeadInfo();
  },
  computed: {
    ...mapGetters("SatLeadValidation", ["getShortLeadInfo"])
  },

  methods: {
    ...mapActions("SatLeadValidation", ["FETCH_SHORT_LEAD_DATA"]),
    //Function to load all lead details
    ajaxLoadShortLeadInfo() {
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data .."
      });
      this.FETCH_SHORT_LEAD_DATA(this.leadInfo.leadId)
        .then(response => {
          this.propLeadInformation = this.getShortLeadInfo;
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
