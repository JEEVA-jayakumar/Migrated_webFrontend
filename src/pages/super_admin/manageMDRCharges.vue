<template>
  <q-page>
    <div class="row">
      <div class="col-12 q-title q-pa-md text-weight-regular bottom-border">
        Add MDR Details
      </div>
      <!-- START >> Setup MDR details -->
      <div class="col-md-5 col-sm-4 col-xs-12 q-pa-sm">
        <q-card style="width:100%">
          <q-card-main>
            <q-list no-border>
              <q-item>
                <q-item-main>
                  <q-select
                    color="grey-9"
                    v-model="formData.leadSource"
                    :options="dropDown.leadSourceOptions"
                    float-label="Select lead source"
                    :error="$v.formData.leadSource.$error"
                    @blur="$v.formData.leadSource.$touch"
                  />
                </q-item-main>
                <q-item-side right>
                  <q-btn
                    round
                    @click="fnManageLeadSource"
                    size="sm"
                    icon="add"
                    color="purple-9"
                  />
                </q-item-side>
              </q-item>
              <q-item>
                <q-item-main>
                  <q-select
                    color="grey-9"
                    v-model="formData.device"
                    @input="onChange(formData.device)"
                    :options="dropDown.deviceOptions"
                    float-label="Select device"
                    :error="$v.formData.device.$error"
                    @blur="$v.formData.device.$touch"
                  />
                </q-item-main>
                <q-item-side right>
                  <q-btn
                    round
                    @click="fnManageDevice"
                    size="sm"
                    icon="add"
                    color="purple-9"
                  />
                </q-item-side>
              </q-item>
              <q-item>
                <q-item-main>
                  <q-select
                    color="grey-9"
                    v-model="formData.marsDeviceModel"
                    :options="dropDown.marsDeviceOptions"
                    float-label="Mars Device Model"
                    :error="$v.formData.marsDeviceModel.$error"
                    @blur="$v.formData.marsDeviceModel.$touch"
                  />
                </q-item-main>
                <!-- <q-item-side right>
                  <q-btn round @click="fnManageDevice" size="sm" icon="add" color="purple-9" />
                </q-item-side>-->
              </q-item>
              <q-item>
                <q-item-main>
                  <q-select
                    color="grey-9"
                    v-model="formData.merchantType"
                    :options="dropDown.merchantTypesOptions"
                    float-label="Select merchant category type"
                    @input="fnCategoryBasedMdr(formData)"
                    :error="$v.formData.merchantType.$error"
                    @blur="$v.formData.merchantType.$touch"
                  />
                </q-item-main>
                <!-- <q-item-side right>
                  <q-btn round @click="fnManageMerchantType" size="sm" icon="add" color="purple-9"/>
                </q-item-side>-->
              </q-item>
              <q-item>
                <q-item-main>
                  <q-input
                    color="grey-9"
                    type="text"
                    v-model="formData.mdrPlanName"
                    placeholder="Mdr Plan Name"
                    float-label="Mdr Plan Name"
                    :error="$v.formData.mdrPlanName.$error"
                    @blur="$v.formData.mdrPlanName.$touch"
                  />
                </q-item-main>
              </q-item>
              <div v-if="deviceId == 1">
                <q-item>
                  <q-item-main>
                    <q-input
                      color="grey-9"
                      type="number"
                      v-model="formData.debitLessthanAmount"
                      placeholder="Debit <= 2000 %"
                      float-label="Debit <= 2000 %"
                      :error="$v.formData.debitLessthanAmount.$error"
                      @blur="$v.formData.debitLessthanAmount.$touch"
                    />
                  </q-item-main>
                  <div
                    v-if="$v.formData.debitLessthanAmount.$error"
                    class="error-tooltip"
                    :class="{
                      'error-highlight': $v.formData.debitLessthanAmount.$error,
                    }"
                  >
                    <span
                      v-if="
                        $v.formData.debitLessthanAmount.$model &&
                        ($v.formData.debitLessthanAmount.$model < 0 ||
                          $v.formData.debitLessthanAmount.$model > 100)
                      "
                    >
                      Debit <= 2000 % must be between 0 and 100.
                    </span>
                  </div>
                </q-item>
                <q-item>
                  <q-item-main>
                    <q-input
                      color="grey-9"
                      type="number"
                      v-model="formData.debitGreaterthanAmount"
                      float-label="Debit > 2000 %"
                      placeholder="Debit > 2000 %"
                      :error="$v.formData.debitGreaterthanAmount.$error"
                      @blur="$v.formData.debitGreaterthanAmount.$touch"
                    />
                  </q-item-main>
                  <div
                    v-if="$v.formData.debitGreaterthanAmount.$error"
                    class="error-tooltip"
                    :class="{
                      'error-highlight': $v.formData.debitGreaterthanAmount.$error,
                    }"
                  >
                    <span
                      v-if="
                        $v.formData.debitGreaterthanAmount.$model &&
                        ($v.formData.debitGreaterthanAmount.$model < 0 ||
                          $v.formData.debitGreaterthanAmount.$model > 100)
                      "
                    >
                      Debit > 2000 % must be between 0 and 100.
                    </span>
                  </div>
                </q-item>
                <q-item>
                  <q-item-main>
                    <q-input
                      color="grey-9"
                      type="number"
                      v-model="formData.stdCC"
                      float-label="Std CC %"
                      placeholder="Std CC %"
                      :error="$v.formData.stdCC.$error"
                      @blur="$v.formData.stdCC.$touch"
                    />
                  </q-item-main>
                  <div
                    v-if="$v.formData.stdCC.$error"
                    class="error-tooltip"
                    :class="{
                      'error-highlight': $v.formData.stdCC.$error,
                    }"
                  >
                    <span
                      v-if="
                        $v.formData.stdCC.$model &&
                        ($v.formData.stdCC.$model < 0 || $v.formData.stdCC.$model > 100)
                      "
                    >
                      Std CC % must be between 0 and 100.
                    </span>
                  </div>
                </q-item>
                <q-item>
                  <q-item-main>
                    <q-input
                      color="grey-9"
                      type="number"
                      v-model="formData.premiumCC"
                      float-label="Premium CC %"
                      placeholder="Premium CC %"
                      :error="$v.formData.premiumCC.$error"
                      @blur="$v.formData.premiumCC.$touch"
                    />
                  </q-item-main>
                  <div
                    v-if="$v.formData.premiumCC.$error"
                    class="error-tooltip"
                    :class="{
                      'error-highlight': $v.formData.premiumCC.$error,
                    }"
                  >
                    <span
                      v-if="
                        $v.formData.premiumCC.$model &&
                        ($v.formData.premiumCC.$model < 0 ||
                          $v.formData.premiumCC.$model > 100)
                      "
                    >
                      Premium CC % must be between 0 and 100.
                    </span>
                  </div>
                </q-item>
                <q-item>
                  <q-item-main>
                    <q-input
                      color="grey-9"
                      type="number"
                      v-model="formData.corpCC"
                      float-label="Corp Pre CC %"
                      placeholder="Corp Pre CC %"
                      :error="$v.formData.corpCC.$error"
                      @blur="$v.formData.corpCC.$touch"
                    />
                  </q-item-main>
                  <div
                    v-if="$v.formData.corpCC.$error"
                    class="error-tooltip"
                    :class="{
                      'error-highlight': $v.formData.corpCC.$error,
                    }"
                  >
                    <span
                      v-if="
                        $v.formData.corpCC.$model &&
                        ($v.formData.corpCC.$model < 0 || $v.formData.corpCC.$model > 100)
                      "
                    >
                      Corp Pre CC % must be between 0 and 100.
                    </span>
                  </div>
                </q-item>
                <q-item>
                  <q-item-main>
                    <q-input
                      color="grey-9"
                      type="number"
                      v-model="formData.intlCC"
                      float-label="Intl Pre CC %"
                      placeholder="Intl Pre CC %"
                      :error="$v.formData.intlCC.$error"
                      @blur="$v.formData.intlCC.$touch"
                    />
                  </q-item-main>
                  <div
                    v-if="$v.formData.intlCC.$error"
                    class="error-tooltip"
                    :class="{
                      'error-highlight': $v.formData.intlCC.$error,
                    }"
                  >
                    <span
                      v-if="
                        $v.formData.intlCC.$model &&
                        ($v.formData.intlCC.$model < 0 || $v.formData.intlCC.$model > 100)
                      "
                    >
                      Intl Pre CC % must be between 0 and 100.
                    </span>
                  </div>
                </q-item>
                <q-item>
                  <q-item-main>
                    <q-input
                      color="grey-9"
                      type="number"
                      v-model="formData.superPremiumlCC"
                      float-label="Super Pre CC %"
                      placeholder="Super Pre CC %"
                      :error="$v.formData.superPremiumlCC.$error"
                      @blur="$v.formData.superPremiumlCC.$touch"
                    />
                  </q-item-main>
                  <div
                    v-if="$v.formData.superPremiumlCC.$error"
                    class="error-tooltip"
                    :class="{
                      'error-highlight': $v.formData.superPremiumlCC.$error,
                    }"
                  >
                    <span
                      v-if="
                        $v.formData.superPremiumlCC.$model &&
                        ($v.formData.superPremiumlCC.$model < 0 ||
                          $v.formData.superPremiumlCC.$model > 100)
                      "
                    >
                      Super Pre CC % must be between 0 and 100.
                    </span>
                  </div>
                </q-item>
                <q-item>
                  <q-item-main>
                    <q-input
                      color="grey-9"
                      type="number"
                      v-model="formData.amexDomestic"
                      float-label="amex Domestic %"
                      placeholder="amex Domestic %"
                      :error="$v.formData.amexDomestic.$error"
                      @blur="$v.formData.amexDomestic.$touch"
                    />
                  </q-item-main>
                  <div
                    v-if="$v.formData.amexDomestic.$error"
                    class="error-tooltip"
                    :class="{
                      'error-highlight': $v.formData.amexDomestic.$error,
                    }"
                  >
                    <span
                      v-if="
                        $v.formData.amexDomestic.$model &&
                        ($v.formData.amexDomestic.$model < 0 ||
                          $v.formData.amexDomestic.$model > 100)
                      "
                    >
                      amex Domestic % must be between 0 and 100.
                    </span>
                  </div>
                </q-item>
                <q-item>
                  <q-item-main>
                    <q-input
                      color="grey-9"
                      type="number"
                      v-model="formData.amexInternational"
                      float-label="amex International %"
                      placeholder="amex International %"
                      :error="$v.formData.amexInternational.$error"
                      @blur="$v.formData.amexInternational.$touch"
                    />
                  </q-item-main>
                  <div
                    v-if="$v.formData.amexInternational.$error"
                    class="error-tooltip"
                    :class="{
                      'error-highlight': $v.formData.amexInternational.$error,
                    }"
                  >
                    <span
                      v-if="
                        $v.formData.amexInternational.$model &&
                        ($v.formData.amexInternational.$model < 0 ||
                          $v.formData.amexInternational.$model > 100)
                      "
                    >
                      amex International % must be between 0 and 100.
                    </span>
                  </div>
                </q-item>
                <q-item>
                  <q-item-main>
                    <q-input
                      color="grey-9"
                      type="number"
                      v-model="formData.upiDebitCardUpTo2000"
                      float-label="UPI Debit Card UpTo 2000 %"
                      placeholder="UPI Debit Card UpTo 2000 %"
                      :error="$v.formData.upiDebitCardUpTo2000.$error"
                      @blur="$v.formData.upiDebitCardUpTo2000.$touch"
                    />
                  </q-item-main>
                  <div
                    v-if="$v.formData.upiDebitCardUpTo2000.$error"
                    class="error-tooltip"
                    :class="{
                      'error-highlight': $v.formData.upiDebitCardUpTo2000.$error,
                    }"
                  >
                    <span
                      v-if="
                        $v.formData.upiDebitCardUpTo2000.$model &&
                        ($v.formData.upiDebitCardUpTo2000.$model < 0 ||
                          $v.formData.upiDebitCardUpTo2000.$model > 100)
                      "
                    >
                      UPI Debit Card UpTo 2000 % must be between 0 and 100.
                    </span>
                  </div>
                </q-item>
                <q-item>
                  <q-item-main>
                    <q-input
                      color="grey-9"
                      type="number"
                      v-model="formData.upiDebitCardAbove2000"
                      float-label="UPI Debit Card Above 2000 %"
                      placeholder="UPI Debit Card Above 2000 %"
                      :error="$v.formData.upiDebitCardAbove2000.$error"
                      @blur="$v.formData.upiDebitCardAbove2000.$touch"
                    />
                  </q-item-main>
                  <div
                    v-if="$v.formData.upiDebitCardAbove2000.$error"
                    class="error-tooltip"
                    :class="{
                      'error-highlight': $v.formData.upiDebitCardAbove2000.$error,
                    }"
                  >
                    <span
                      v-if="
                        $v.formData.upiDebitCardAbove2000.$model &&
                        ($v.formData.upiDebitCardAbove2000.$model < 0 ||
                          $v.formData.upiDebitCardAbove2000.$model > 100)
                      "
                    >
                      UPI Debit Card Above 2000 % must be between 0 and 100.
                    </span>
                  </div>
                </q-item>
                <q-item>
                  <q-item-main>
                    <q-input
                      color="grey-9"
                      type="number"
                      v-model="formData.upiPrepaidCreditCardsUpTo2000"
                      float-label="UPI Prepaid Credit Cards UpTo 2000 %"
                      placeholder="UPI Prepaid Credit Cards UpTo 2000 %"
                      :error="$v.formData.upiPrepaidCreditCardsUpTo2000.$error"
                      @blur="$v.formData.upiPrepaidCreditCardsUpTo2000.$touch"
                    />
                  </q-item-main>
                  <div
                    v-if="$v.formData.upiPrepaidCreditCardsUpTo2000.$error"
                    class="error-tooltip"
                    :class="{
                      'error-highlight': $v.formData.upiPrepaidCreditCardsUpTo2000.$error,
                    }"
                  >
                    <span
                      v-if="
                        $v.formData.upiPrepaidCreditCardsUpTo2000.$model &&
                        ($v.formData.upiPrepaidCreditCardsUpTo2000.$model < 0 ||
                          $v.formData.upiPrepaidCreditCardsUpTo2000.$model > 100)
                      "
                    >
                      UPI Prepaid Credit Cards UpTo 2000 % must be between 0 and 100.
                    </span>
                  </div>
                </q-item>
                <q-item>
                  <q-item-main>
                    <q-input
                      color="grey-9"
                      type="number"
                      v-model="formData.upiPrepaidCreditCardsAbove2000"
                      float-label="UPI Prepaid Credit Cards Above 2000 %"
                      placeholder="UPI Prepaid Credit Cards Above 2000 %"
                      :error="$v.formData.upiPrepaidCreditCardsAbove2000.$error"
                      @blur="$v.formData.upiPrepaidCreditCardsAbove2000.$touch"
                    />
                  </q-item-main>
                  <div
                    v-if="$v.formData.upiPrepaidCreditCardsAbove2000.$error"
                    class="error-tooltip"
                    :class="{
                      'error-highlight':
                        $v.formData.upiPrepaidCreditCardsAbove2000.$error,
                    }"
                  >
                    <span
                      v-if="
                        $v.formData.upiPrepaidCreditCardsAbove2000.$model &&
                        ($v.formData.upiPrepaidCreditCardsAbove2000.$model < 0 ||
                          $v.formData.upiPrepaidCreditCardsAbove2000.$model > 100)
                      "
                    >
                      UPI Prepaid Credit Cards Above 2000 % must be between 0 and 100.
                    </span>
                  </div>
                </q-item>
              </div>

              <div v-else>
                <q-item>
                  <q-item-main>
                    <q-input
                      color="grey-9"
                      type="number"
                      v-model="formData.smallMerchantLessThanTwoDebit"
                      float-label="Small Merchant < 2000 % debit Card"
                      placeholder="Small Merchant < 2000 % debit Card"
                      :error="$v.formData.smallMerchantLessThanTwoDebit.$error"
                      @blur="$v.formData.smallMerchantLessThanTwoDebit.$touch"
                    />
                    <div
                      v-if="$v.formData.smallMerchantLessThanTwoDebit.$error"
                      class="error-tooltip"
                      :class="{
                        'error-highlight':
                          $v.formData.smallMerchantLessThanTwoDebit.$error,
                      }"
                    >
                      <span
                        v-if="
                          $v.formData.smallMerchantLessThanTwoDebit.$model &&
                          ($v.formData.smallMerchantLessThanTwoDebit.$model < 0 ||
                            $v.formData.smallMerchantLessThanTwoDebit.$model > 100)
                        "
                      >
                        Small Merchant < 2000 % debit Card must be between 0 and 100.
                      </span>
                    </div>
                  </q-item-main>
                </q-item>
                <q-item>
                  <q-item-main>
                    <q-input
                      color="grey-9"
                      type="number"
                      v-model="formData.smallMerchantGreaterThanTwoDebit"
                      float-label="Small Merchant > 2000 % debit Card"
                      placeholder="Small Merchant > 2000 % debit Card"
                      :error="$v.formData.smallMerchantGreaterThanTwoDebit.$error"
                      @blur="$v.formData.smallMerchantGreaterThanTwoDebit.$touch"
                    />
                  </q-item-main>
                  <div
                    v-if="$v.formData.smallMerchantGreaterThanTwoDebit.$error"
                    class="error-tooltip"
                    :class="{
                      'error-highlight':
                        $v.formData.smallMerchantGreaterThanTwoDebit.$error,
                    }"
                  >
                    <span
                      v-if="
                        $v.formData.smallMerchantGreaterThanTwoDebit.$model &&
                        ($v.formData.smallMerchantGreaterThanTwoDebit.$model < 0 ||
                          $v.formData.smallMerchantGreaterThanTwoDebit.$model > 100)
                      "
                    >
                      Small Merchant > 2000 % debit Card must be between 0 and 100.
                    </span>
                  </div>
                </q-item>
                <q-item>
                  <q-item-main>
                    <q-input
                      color="grey-9"
                      type="number"
                      v-model="formData.smallMerchantLessThanTwoCreditAndPrepaid"
                      float-label="Small Merchant < 2000 % credit and prepaid card"
                      placeholder="Small Merchant < 2000 % credit and prepaid card"
                      :error="$v.formData.smallMerchantLessThanTwoCreditAndPrepaid.$error"
                      @blur="$v.formData.smallMerchantLessThanTwoCreditAndPrepaid.$touch"
                    />
                  </q-item-main>
                  <div
                    v-if="$v.formData.smallMerchantLessThanTwoCreditAndPrepaid.$error"
                    class="error-tooltip"
                    :class="{
                      'error-highlight':
                        $v.formData.smallMerchantLessThanTwoCreditAndPrepaid.$error,
                    }"
                  >
                    <span
                      v-if="
                        $v.formData.smallMerchantLessThanTwoCreditAndPrepaid.$model &&
                        ($v.formData.smallMerchantLessThanTwoCreditAndPrepaid.$model <
                          0 ||
                          $v.formData.smallMerchantLessThanTwoCreditAndPrepaid.$model >
                            100)
                      "
                    >
                      Small Merchant < 2000 % credit and prepaid card must be between 0
                      and 100.
                    </span>
                  </div>
                </q-item>
                <q-item>
                  <q-item-main>
                    <q-input
                      color="grey-9"
                      type="number"
                      v-model="formData.smallMerchantGreaterThanTwoCreditAndPrepaid"
                      float-label="Small Merchant > 2000 % credit and prepaid card"
                      placeholder="Small Merchant > 2000 % credit and prepaid card"
                      :error="
                        $v.formData.smallMerchantGreaterThanTwoCreditAndPrepaid.$error
                      "
                      @blur="
                        $v.formData.smallMerchantGreaterThanTwoCreditAndPrepaid.$touch
                      "
                    />
                  </q-item-main>
                  <div
                    v-if="$v.formData.smallMerchantGreaterThanTwoCreditAndPrepaid.$error"
                    class="error-tooltip"
                    :class="{
                      'error-highlight':
                        $v.formData.smallMerchantGreaterThanTwoCreditAndPrepaid.$error,
                    }"
                  >
                    <span
                      v-if="
                        $v.formData.smallMerchantGreaterThanTwoCreditAndPrepaid.$model &&
                        ($v.formData.smallMerchantGreaterThanTwoCreditAndPrepaid.$model <
                          0 ||
                          $v.formData.smallMerchantGreaterThanTwoCreditAndPrepaid.$model >
                            100)
                      "
                    >
                      Small Merchant > 2000 % credit and prepaid card must be between 0
                      and 100.
                    </span>
                  </div>
                </q-item>
                <q-item>
                  <q-item-main>
                    <q-input
                      color="grey-9"
                      type="number"
                      v-model="formData.largeMerchantLessThanTwoDebit"
                      float-label="Large Merchant < 2000 % debit Card"
                      placeholder="Large Merchant < 2000 % debit Card"
                      :error="$v.formData.largeMerchantLessThanTwoDebit.$error"
                      @blur="$v.formData.largeMerchantLessThanTwoDebit.$touch"
                    />
                  </q-item-main>
                  <div
                    v-if="$v.formData.largeMerchantLessThanTwoDebit.$error"
                    class="error-tooltip"
                    :class="{
                      'error-highlight': $v.formData.largeMerchantLessThanTwoDebit.$error,
                    }"
                  >
                    <span
                      v-if="
                        $v.formData.largeMerchantLessThanTwoDebit.$model &&
                        ($v.formData.largeMerchantLessThanTwoDebit.$model < 0 ||
                          $v.formData.largeMerchantLessThanTwoDebit.$model > 100)
                      "
                    >
                      Large Merchant < 2000 % debit Card must be between 0 and 100.
                    </span>
                  </div>
                </q-item>
                <q-item>
                  <q-item-main>
                    <q-input
                      color="grey-9"
                      type="number"
                      v-model="formData.largeMerchantGreaterThanTwoDebit"
                      float-label="Large Merchant > 2000 % debit Card"
                      placeholder="Large Merchant > 2000 % debit Card"
                      :error="$v.formData.largeMerchantGreaterThanTwoDebit.$error"
                      @blur="$v.formData.largeMerchantGreaterThanTwoDebit.$touch"
                    />
                  </q-item-main>
                  <div
                    v-if="$v.formData.largeMerchantGreaterThanTwoDebit.$error"
                    class="error-tooltip"
                    :class="{
                      'error-highlight': $v.formData.largeMerchantGreaterThanTwoDebit.$error,
                    }"
                  >
                    <span
                      v-if="
                        $v.formData.largeMerchantGreaterThanTwoDebit.$model &&
                        ($v.formData.largeMerchantGreaterThanTwoDebit.$model < 0 ||
                          $v.formData.largeMerchantGreaterThanTwoDebit.$model > 100)
                      "
                    >
                      Large Merchant > 2000 % debit Card must be between 0 and 100.
                    </span>
                  </div>
                </q-item>
                <q-item>
                  <q-item-main>
                    <q-input
                      color="grey-9"
                      type="number"
                      v-model="formData.largeMerchantLessThanTwoCreditandPrepaid"
                      float-label="Large Merchant < 2000 % credit and prepaid card"
                      placeholder="Large Merchant < 2000 % credit and prepaid card"
                      :error="$v.formData.largeMerchantLessThanTwoCreditandPrepaid.$error"
                      @blur="$v.formData.largeMerchantLessThanTwoCreditandPrepaid.$touch"
                    />
                  </q-item-main>
                  <div
                    v-if="$v.formData.largeMerchantLessThanTwoCreditandPrepaid.$error"
                    class="error-tooltip"
                    :class="{
                      'error-highlight': $v.formData.largeMerchantLessThanTwoCreditandPrepaid.$error,
                    }"
                  >
                    <span
                      v-if="
                        $v.formData.largeMerchantLessThanTwoCreditandPrepaid.$model &&
                        ($v.formData.largeMerchantLessThanTwoCreditandPrepaid.$model < 0 ||
                          $v.formData.largeMerchantLessThanTwoCreditandPrepaid.$model > 100)
                      "
                    >
                     Large Merchant < 2000 % credit and prepaid card must be between 0 and 100.
                    </span>
                  </div>
                </q-item>
                <q-item>
                  <q-item-main>
                    <q-input
                      color="grey-9"
                      type="number"
                      v-model="formData.largeMerchantGreaterThanTwoCreditandPrepaid"
                      float-label="Large Merchant > 2000 % credit and prepaid card"
                      placeholder="Large Merchant > 2000 % credit and prepaid card"
                      :error="
                        $v.formData.largeMerchantGreaterThanTwoCreditandPrepaid.$error
                      "
                      @blur="
                        $v.formData.largeMerchantGreaterThanTwoCreditandPrepaid.$touch
                      "
                    />
                  </q-item-main>
                  <div
                    v-if="$v.formData.largeMerchantGreaterThanTwoCreditandPrepaid.$error"
                    class="error-tooltip"
                    :class="{
                      'error-highlight': $v.formData.largeMerchantGreaterThanTwoCreditandPrepaid.$error,
                    }"
                  >
                    <span
                      v-if="
                        $v.formData.largeMerchantGreaterThanTwoCreditandPrepaid.$model &&
                        ($v.formData.largeMerchantGreaterThanTwoCreditandPrepaid.$model < 0 ||
                          $v.formData.largeMerchantGreaterThanTwoCreditandPrepaid.$model > 100)
                      "
                    >
                      Large Merchant > 2000 % credit and prepaid card must be between 0 and 100.
                    </span>
                  </div>
                </q-item>
              </div>
            </q-list>
          </q-card-main>
          <q-card-actions vertical align="end">
            <!-- <q-btn label="EXSITING MDR PLAN" @click="fnEditMdrPlan(formData)" color="purple-9" /> -->
            <q-btn
              :disabled="Submitdata"
              label="submit"
              @click="fnsubmit(formData)"
              color="purple-9"
            />
          </q-card-actions>
        </q-card>
      </div>
      <!-- END >> Setup MDR details -->
      <!-- START >> Table >> MDR details -->
      <div class="col-md-7 col-sm-8 col-xs-12">
        <!-- <q-table
          :data="tableData"
          table-class="customSATableClass"
          :columns="columns"
          :filter="filterSearch"
          :pagination.sync="paginationControl"
          row-key="name"
          color="grey-9"
        >
          <q-td slot="body-cell-action" slot-scope="props" :props="props">
            <div class="row no-wrap no-padding">
              <q-btn
                dense
                no-caps
                no-wrap
                label="Modify"
                icon="far fa-plus-square"
                size="md"
                @click="fnShowEditPermission(props.row)"
                flat
                class="text-light-blue"
              ></q-btn>
              <q-btn
                dense
                no-caps
                no-wrap
                label="Disable"
                icon="far fa-minus-square"
                size="md"
                @click="fnDisablePermission(props.row.id)"
                flat
                class="text-negative"
              ></q-btn>
            </div>
          </q-td>

          <template slot="top" slot-scope="props">
        <--START: table filter,search-->
        <!-- <div class="col"> -->
        <!-- <q-search
                clearable
                color="grey-9"
                v-model="filterSearch"
                placeholder="Type.."
                float-label="Search by name, short name"
        class="q-mr-lg"-->
        <!-- /> -->
        <!-- </div> -->
        <!--END: table filter,search -->
        <!-- </template> -->
        <!-- </q-table> -->
        <!-- -->
      </div>
      <!-- END >> Table >> MDR details -->
      <!--START: Show lead source -->
      <showLeadSourceModalComponent
        v-if="showLeadSourceModal"
        :propToggleModal="showLeadSourceModal"
        @emitToggleModal="fnManageLeadSource"
      ></showLeadSourceModalComponent>
      <!--END: Show lead source -->
      <!--START: Show device details -->
      <showDeviceDetailModalComponent
        v-if="showDeviceDetailModal"
        :propToggleModal="showDeviceDetailModal"
        @emitToggleModal="fnManageDevice"
      ></showDeviceDetailModalComponent>
      <!--END: Show device details-->
      <!--START: Show lead source -->
      <showMerchantModalComponent
        v-if="showMerchantModal"
        :propToggleModal="showMerchantModal"
        @emitToggleModal="fnManageMerchantType"
      ></showMerchantModalComponent>
      <!--END: Show lead source -->
    </div>
  </q-page>
</template>

<script>
/* START >> Modal components Lead source, device, merchant type */
import showLeadSourceModalComponent from "../../components/super_admin/showLeadSourceModalComponents.vue";
import showDeviceDetailModalComponent from "../../components/super_admin/showDeviceDetailModalComponents.vue";
import showMerchantModalComponent from "../../components/super_admin/merchantTypes.vue";
/* END >> Modal components Lead source, device, merchant type */
import Vue from "vue";
import {
  required,
  requiredIf,
  alphaNum,
  integer,
  numeric,
  minLength,
  maxLength,
  email,
  maxValue,
  minValue,
  decimal,
} from "vuelidate/lib/validators";
Vue.use(Vuelidate);
import Vuelidate from "vuelidate";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "MDRdetails",
  components: {
    /* START >> Modal components Lead source, device, merchant type */
    showLeadSourceModalComponent,
    showDeviceDetailModalComponent,
    showMerchantModalComponent,
    /* END >> Modal components Lead source, device, merchant type */
  },
  data() {
    return {
      /* START >> Modal props */
      showLeadSourceModal: false,
      showDeviceDetailModal: false,
      showMerchantModal: false,
      Submitdata: false,
      /* END >> Modal props */

      /* START >> Rental charges */
      formData: {
        leadSource: "",
        device: "",
        marsDeviceModel: "",
        merchantType: "",
        mdrPlanName: "",
        debitLessthanAmount: "",
        debitGreaterthanAmount: "",
        stdCC: "",
        premiumCC: "",
        corpCC: "",
        intlCC: "",
        superPremiumlCC: "",
        amexDomestic: "",
        amexInternational: "",
        smallMerchantLessThanTwoDebit: "",
        smallMerchantGreaterThanTwoDebit: "",
        smallMerchantLessThanTwoCreditAndPrepaid: "",
        smallMerchantGreaterThanTwoCreditAndPrepaid: "",
        largeMerchantLessThanTwoDebit: "",
        largeMerchantGreaterThanTwoDebit: "",
        largeMerchantLessThanTwoCreditandPrepaid: "",
        largeMerchantGreaterThanTwoCreditandPrepaid: "",
        upiDebitCardUpTo2000: "",
        upiDebitCardAbove2000: "",
        upiPrepaidCreditCardsUpTo2000: "",
        upiPrepaidCreditCardsAbove2000: "",
      },
      dropDown: {
        deviceOptions: [],
        leadSourceOptions: [],
        marsDeviceOptions: [],
        merchantTypesOptions: [],
      },
      /* END >> Rental charges */

      /* START >>Table properties */
      filterSearch: "",
      paginationControl: {
        rowsPerPage: 5,
      },
      /* END >>Table properties */
      deviceId: "",
      /* START >>Table data */
      // columns: [
      //   {
      //     name: "leadSource",
      //     required: true,
      //     label: "Lead source",
      //     align: "left",
      //     field: "leadSource",
      //     sortable: true
      //   },
      //   {
      //     name: "device",
      //     required: true,
      //     label: "Device",
      //     align: "left",
      //     field: "device",
      //     sortable: true
      //   },
      //   {
      //     name: "merchant",
      //     required: true,
      //     label: "Merchant Type",
      //     align: "left",
      //     field: "merchant",
      //     sortable: true
      //   },
      //   {
      //     name: "action",
      //     required: true,
      //     label: "",
      //     align: "left",
      //     field: "action",
      //     sortable: true
      //   }
      // ],
      // tableData: [
      //   {
      //     leadSource: "AB",
      //     device: "mPOS",
      //     merchant: "Sandiwich Shop"
      //   },
      //   {
      //     leadSource: "IB",
      //     device: "mPOS",
      //     merchant: "Burger Shop"
      //   }
      // ]
      /* END >>Table data */
    };
  },
  validations: {
    formData: {
      leadSource: {
        required,
      },
      device: {
        required,
      },
      marsDeviceModel: {
        required,
      },
      merchantType: {
        required,
      },
      mdrPlanName: {
        required,
      },
      debitLessthanAmount: {
        minValue: minValue(0),
        maxValue: maxValue(100),
      },
      debitGreaterthanAmount: {
        minValue: minValue(0),
        maxValue: maxValue(100),
      },
      stdCC: {
        minValue: minValue(0),
        maxValue: maxValue(100),
      },
      premiumCC: {
        minValue: minValue(0),
        maxValue: maxValue(100),
      },
      corpCC: {
        minValue: minValue(0),
        maxValue: maxValue(100),
      },
      intlCC: {
        minValue: minValue(0),
        maxValue: maxValue(100),
      },
      superPremiumlCC: {
        minValue: minValue(0),
        maxValue: maxValue(100),
      },
      amexDomestic: {
        minValue: minValue(0),
        maxValue: maxValue(100),
      },
      amexInternational: {
        minValue: minValue(0),
        maxValue: maxValue(100),
      },
      upiDebitCardUpTo2000: {
        minValue: minValue(0),
        maxValue: maxValue(100),
      },
      upiDebitCardAbove2000: {
        minValue: minValue(0),
        maxValue: maxValue(100),
      },
      upiPrepaidCreditCardsUpTo2000: {
        minValue: minValue(0),
        maxValue: maxValue(100),
      },
      upiPrepaidCreditCardsAbove2000: {
        minValue: minValue(0),
        maxValue: maxValue(100),
      },
      smallMerchantLessThanTwoDebit: {
        minValue: minValue(0),
        maxValue: maxValue(100),
      },
      smallMerchantGreaterThanTwoDebit: {
        minValue: minValue(0),
        maxValue: maxValue(100),
      },
      smallMerchantLessThanTwoCreditAndPrepaid: {
        minValue: minValue(0),
        maxValue: maxValue(100),
      },
      smallMerchantGreaterThanTwoCreditAndPrepaid: {
        minValue: minValue(0),
        maxValue: maxValue(100),
      },
      largeMerchantLessThanTwoDebit: {
        minValue: minValue(0),
        maxValue: maxValue(100),
      },
      largeMerchantGreaterThanTwoDebit: {
        minValue: minValue(0),
        maxValue: maxValue(100),
      },
      largeMerchantLessThanTwoCreditandPrepaid: {
        minValue: minValue(0),
        maxValue: maxValue(100),
      },
      largeMerchantGreaterThanTwoCreditandPrepaid: {
        minValue: minValue(0),
        maxValue: maxValue(100),
      },
    },
  },
  created() {
    /* START: Load user table data filter > DeviceTypes */
    this.ajaxLoadDataForDeviceTypeTable();
    this.marsDeviceModelDatasLoading();
    /* End: Load user table data filter > DeviceTypes */
  },

  computed: {
    ...mapGetters("SA_Devices", ["getAllDevicesInfo", "getMarsDeviceModel"]),
    ...mapGetters("leadSource", ["getActiveLeadSource"]),
    ...mapGetters("merchantCategory", ["getActiveMerchantCategory"]),
    ...mapGetters("CategoryBasedMdr", ["categoryBasedMdr"]),
  },

  methods: {
    ...mapActions("SA_Devices", ["FETCH_DEVICES_DATA", "FETCH_MARS_DEVICE_MODEL"]),
    ...mapActions("leadSource", ["LEAD_SOURCE_ACTIVE_LIST"]),
    ...mapActions("merchantCategory", ["MERCHANT_CATEGORY_ACTIVE_LIST"]),
    ...mapActions("MdrPlan", ["MDR_PLAN"]),
    ...mapActions("CategoryBasedMdr", ["CATEGORY_BASED_MDR_PLAN", "EDIT_MDR_PLAN"]),

    onChange(request) {
      this.deviceId = request.isDevice;
    },

    marsDeviceModelDatasLoading() {
      let self = this;
      self.FETCH_MARS_DEVICE_MODEL().then(() => {
        return _.map(self.getMarsDeviceModel, (item) => {
          item.map((oo) => {
            self.dropDown.marsDeviceOptions.push({
              label: oo.name,
              value: JSON.stringify(oo),
              // value: oo.code
            });
          });
        });
      });
    },

    /* START >> Fetch table data for MDR charges */
    ajaxLoadDataForDeviceTypeTable() {
      let self = this;
      self
        .FETCH_DEVICES_DATA()
        .then(() => {
          return _.map(self.getAllDevicesInfo, (item) => {
            self.dropDown.deviceOptions.push({
              value: item,
              label: item.deviceName,
            });
          });
        })
        .then(() => {
          self.LEAD_SOURCE_ACTIVE_LIST().then(() => {
            return _.map(self.getActiveLeadSource, (item) => {
              self.dropDown.leadSourceOptions.push({
                value: item.id,
                label: item.sourceName,
              });
            });
          });
        })
        .then(() => {
          self.MERCHANT_CATEGORY_ACTIVE_LIST().then(() => {
            return _.map(self.getActiveMerchantCategory, (item) => {
              self.dropDown.merchantTypesOptions.push({
                value: item.id,
                label: item.merchantCategoryName,
              });
            });
          });
        });
    },
    fnsubmit(request) {
      this.$v.formData.$touch();
      if (this.$v.formData.$error) {
        this.$q.notify("Please review fields again.");
      } else {
        this.$q.loading.show({
          delay: 100,
          spinnerColor: "purple-9",
          message: "Please wait..",
        });
        this.Submitdata = true;
        let requestParams = {
          url: {
            leadSource: request.leadSource,
            device: request.device.id,
            merchantType: request.merchantType,
          },

          params: {
            marsDeviceModel: JSON.parse(request.marsDeviceModel),
            mdrPlanName: request.mdrPlanName,
            debitLessthanAmount: request.debitLessthanAmount,
            debitGreaterthanAmount: request.debitGreaterthanAmount,
            stdCC: request.stdCC,
            premiumCC: request.premiumCC,
            corpCC: request.corpCC,
            intlCC: request.intlCC,
            superPremiumlCC: request.superPremiumlCC,
            amexDomestic: request.amexDomestic,
            amexInternational: request.amexInternational,
            smallMerchantLessThanTwoDebit: request.smallMerchantLessThanTwoDebit,
            smallMerchantGreaterThanTwoDebit: request.smallMerchantGreaterThanTwoDebit,
            smallMerchantLessThanTwoCreditAndPrepaid:
              request.smallMerchantLessThanTwoCreditAndPrepaid,
            smallMerchantGreaterThanTwoCreditAndPrepaid:
              request.smallMerchantGreaterThanTwoCreditAndPrepaid,
            largeMerchantLessThanTwoDebit: request.largeMerchantLessThanTwoDebit,
            largeMerchantGreaterThanTwoDebit: request.largeMerchantGreaterThanTwoDebit,
            largeMerchantLessThanTwoCreditandPrepaid:
              request.largeMerchantLessThanTwoCreditandPrepaid,
            largeMerchantGreaterThanTwoCreditandPrepaid:
              request.largeMerchantGreaterThanTwoCreditandPrepaid,
            upiDebitCardUpTo2000: request.upiDebitCardUpTo2000,
            upiDebitCardAbove2000: request.upiDebitCardAbove2000,
            upiPrepaidCreditCardsUpTo2000: request.upiPrepaidCreditCardsUpTo2000,
            upiPrepaidCreditCardsAbove2000: request.upiPrepaidCreditCardsAbove2000,
          },
        };
        this.MDR_PLAN(requestParams)
          .then((response) => {
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "data",
              icon: "thumb_up",
              message: response.data.message,
            });
            this.Submitdata = false;
            var self = this;
            Object.keys(this.formData).forEach(function (key, index) {
              self.formData[key] = "";
            });
            this.$q.loading.hide();
          })
          .catch((error) => {
            this.$q.notify({
              color: "negative",
              position: "bottom",
              icon: "thumb_down",
              message: error.data.message,
            });
            var self = this;
            Object.keys(this.formData).forEach(function (key, index) {
              self.formData[key] = "";
            });
            this.$q.loading.hide();
            this.Submitdata = false;
          });
      }
    },
    // fnEditMdrPlan(request) {
    //   let requestParams = {
    //     id: this.categoryBasedMdr.id,
    //     debitLessthanAmount: request.debitLessthanAmount,
    //     debitGreaterthanAmount: request.debitGreaterthanAmount,
    //     stdCC: request.stdCC,
    //     premiumCC: request.premiumCC,
    //     corpCC: request.corpCC,
    //     intlCC: request.intlCC,
    //     superPremiumlCC: request.superPremiumlCC
    //   };
    //   this.EDIT_MDR_PLAN(requestParams)
    //     .then(response => {
    //       this.$q.notify({
    //         color: "positive",
    //         position: "bottom",
    //         message: "data",
    //         icon: "thumb_up",
    //         message: response.data.message
    //       });
    //       var self = this;
    //       Object.keys(this.formData).forEach(function(key, index) {
    //         self.formData[key] = "";
    //       });
    //     })
    //     .catch(error => {
    //       this.$q.notify({
    //         color: "positive",
    //         position: "bottom",
    //         icon: "thumb_up",
    //         message: error.data.message
    //       });
    //       var self = this;
    //       Object.keys(this.formData).forEach(function(key, index) {
    //         self.formData[key] = "";
    //       });
    //     });
    // },

    fnCategoryBasedMdr(request) {
      let formData = {
        leadSource: request.leadSource,
        device: request.device.id,
        merchantType: request.merchantType,
      };
      let self = this;
      self.CATEGORY_BASED_MDR_PLAN(formData).then((response) => {
        if (response.status == 200) {
          this.formData.debitLessthanAmount = self.categoryBasedMdr.debitLessthanAmount;
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
          this.formData.upiDebitCardAbove2000 =
            self.categoryBasedMdr.upiDebitCardAbove2000;
          this.formData.upiPrepaidCreditCardsUpTo2000 =
            self.categoryBasedMdr.upiPrepaidCreditCardsUpTo2000;
          this.formData.upiPrepaidCreditCardsAbove2000 =
            self.categoryBasedMdr.upiPrepaidCreditCardsAbove2000;
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
    /* END >> Fetch table data for MDR charges */

    /* START >> Manage lead source, device, merchant type */
    fnManageLeadSource() {
      this.showLeadSourceModal = !this.showLeadSourceModal;
    },
    fnManageDevice() {
      this.showDeviceDetailModal = !this.showDeviceDetailModal;
    },
    fnManageMerchantType() {
      this.showMerchantModal = !this.showMerchantModal;
    },
    /* END >> Manage lead source, device, merchant type */

    /* START >> Manage MDR charges */
    fnShowEditPermission() {},
    fnDisablePermission() {},
    /* END >> Manage MDR charges */
  },
};
</script>

<style>
.error-tooltip {
  position: absolute;
  top: 10%;
  left: 100%;
  background: #d32f2f;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  margin-top: 5px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
}

.error-tooltip::before {
  content: "";
  position: absolute;
  top: -5px;
  left: 10px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent red transparent;
}
</style>
