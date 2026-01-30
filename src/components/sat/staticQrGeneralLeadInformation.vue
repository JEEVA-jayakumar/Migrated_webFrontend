<template>
  <div>
    <q-modal v-model="opened" class="q-mt-lg capitalize" @hide="emitToggleRemarks" @escape-key="emitToggleRemarks"
      :content-css="{ minWidth: '30vw', padding: '20px' }">
      <div class="row items-center bottom-border q-py-sm">
        <div class="col"> QR Lead Information</div>
        <div class="col-auto">
          <q-btn round size="sm" @click="emitToggleRemarks" outline color="dark" icon="clear" />
        </div>
      </div>

      <!-- START >> Lead information -->
      <div class="row">
        <div>
          <q-scroll-area style="width: 400px; height: 375px;">
            <q-list multiline separator class="q-body-1">
              <q-item multiline>
                <q-item-main label="Merchant Name"
                  :sublabel="propLeadInformation.merchantName == null ? 'NA' : propLeadInformation.merchantName " />
              </q-item>
              <q-item multiline>
                <q-item-main label="Address"
                  :sublabel="propLeadInformation.contactAddress == null ? 'NA' : propLeadInformation.contactAddress " />
              </q-item>
              <q-item multiline>
                <q-item-main label="SO Name"
                  :sublabel="propLeadInformation.createdBy == null ? 'NA' : propLeadInformation.createdBy.name" />
              </q-item>
              <q-item multiline>
                <q-item-main label="Source" v-if="'leadSource' in propLeadInformation"
                  :sublabel="propLeadInformation.leadSource.sourceName" />
              </q-item>
              <q-item multiline>
                <q-item-main label="Contact Name" :sublabel="propLeadInformation.contactName" />
              </q-item>
              <q-item multiline>
                <q-item-main label="Contact Number" :sublabel="propLeadInformation.contactNumber" />
              </q-item>

              <q-item multiline>
                <q-item-main label="Contact Email" :sublabel="propLeadInformation.contactEmail || 'NA'" />
              </q-item>
              <q-item multiline>
                <q-item-main label="Bank Name"
                  :sublabel="propLeadInformation.bankName == null ? 'NA' : propLeadInformation.bankName" />
              </q-item>
              <q-item multiline>
                <q-item-main label="QR Lead Number" :sublabel="propLeadInformation.qrLeadNumber == null ? 'NA' : propLeadInformation.qrLeadNumber" />
              </q-item>
              <q-item multiline>
                <q-item-main label="Merchant Industry" :sublabel="propLeadInformation.merchantIndustry == null ? 'NA' : propLeadInformation.merchantIndustry.industryName" />
              </q-item>
              <q-item multiline>
                <q-item-main label="Plan" :sublabel="propLeadInformation.plan == null ? 'NA' : propLeadInformation.plan.planName" />
              </q-item>
              <q-item multiline>
                <q-item-main label="SetUp Fees" :sublabel="propLeadInformation.setupFees == null ? 'NA' : propLeadInformation.setupFees" />
              </q-item>
              <q-item multiline>
                <q-item-main label="Recurring Fees" :sublabel="propLeadInformation.recurringFees == null ? 'NA' : propLeadInformation.recurringFees" />
              </q-item>
              <q-item multiline>
                <q-item-main label="Merchant Type " :sublabel="propLeadInformation.qrMerchantType == null ? 'NA' : propLeadInformation.qrMerchantType.qrMerchantType" />
              </q-item>
              <q-item multiline>
                <q-item-main label="Small Merchant < 2000 % debit Card" :sublabel="propLeadInformation.smallMerchantLessThanTwoDebit == null ? 'NA' : propLeadInformation.smallMerchantLessThanTwoDebit + '%'" />
              </q-item>
              <q-item multiline>
                <q-item-main label="Small Merchant > 2000 % debit Card " :sublabel="propLeadInformation.smallMerchantGreaterThanTwoDebit == null ? 'NA' : propLeadInformation.smallMerchantGreaterThanTwoDebit + '%'" />
              </q-item>
              <q-item multiline>
                <q-item-main label="Small Merchant < 2000 % credit and prepaid card" :sublabel="propLeadInformation.smallMerchantLessThanTwoCreditAndPrepaid == null ? 'NA' : propLeadInformation.smallMerchantLessThanTwoCreditAndPrepaid + '%'" />
              </q-item>
              <q-item multiline>
                <q-item-main label="Small Merchant > 2000 % credit and prepaid card" :sublabel="propLeadInformation.smallMerchantGreaterThanTwoCreditAndPrepaid == null ? 'NA' : propLeadInformation.smallMerchantGreaterThanTwoCreditAndPrepaid + '%'" />
              </q-item>
              <q-item multiline>
                <q-item-main label="Large Merchant < 2000 % debit Card" :sublabel="propLeadInformation.largeMerchantLessThanTwoDebit == null ? 'NA' : propLeadInformation.largeMerchantLessThanTwoDebit + '%'" />
              </q-item>
              <q-item multiline>
                <q-item-main label="Large Merchant > 2000 % debit Card" :sublabel="propLeadInformation.largeMerchantGreaterThanTwoDebit == null ? 'NA' : propLeadInformation.largeMerchantGreaterThanTwoDebit + '%'" />
              </q-item>
              <q-item multiline>
                <q-item-main label="Large Merchant < 2000 % credit and prepaid card " :sublabel="propLeadInformation.largeMerchantLessThanTwoCreditandPrepaid == null ? 'NA' : propLeadInformation.largeMerchantLessThanTwoCreditandPrepaid + '%'" />
              </q-item>
              <q-item multiline>
                <q-item-main label="Large Merchant > 2000 % credit and prepaid card" :sublabel="propLeadInformation.largeMerchantGreaterThanTwoCreditandPrepaid == null ? 'NA' : propLeadInformation.largeMerchantGreaterThanTwoCreditandPrepaid + '%'" />
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
import { mapGetters, mapActions } from 'vuex'
export default {
  props: ['leadInformation', 'propToggleLeadInformationPop'],
  data () {
    return {
      search: '',
      propLeadInformation: {},
      opened: this.propToggleLeadInformationPop
    }
  },
  created () {
    this.ajaxLoadShortLeadInfo()
  },
  computed: {
    ...mapGetters('iciciStaticQr', ['getAllStaticQrShortLeadDatas'])
  },
  // beforeMount(){
  //   console.log("leadDetails ---------->",JSON.stringify(this.leadInformation));
  // },

  methods: {
    ...mapActions('iciciStaticQr', ['FETCH_STATIC_QR_SHORT_LEAD_DATA']),
    // Function to load all lead details
    ajaxLoadShortLeadInfo () {
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: 'purple-9',
        message: 'Fetching data ..'
      })
      this.FETCH_STATIC_QR_SHORT_LEAD_DATA(
        this.leadInformation.leadId
      )
        .then(response => {
          this.propLeadInformation = this.getAllStaticQrShortLeadDatas
          this.$q.loading.hide()
        })
        .catch(() => {
          this.$q.loading.hide()
        })
    },
    emitToggleRemarks () {
      this.$emit('closeLeadInformation')
    }
  }
}
</script>

<style>

</style>
