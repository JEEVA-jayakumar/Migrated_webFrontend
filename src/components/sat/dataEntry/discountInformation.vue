<template>
  <div>
    <div class="row group items-center">
      <div class="col-md-12">
        <div class="row items-center">
          <div class="col-3">
            <div class="q-caption text-weight-medium">Domestic Debit Card below 2000</div>
          </div>
          <div class="col">
            <div class="q-caption text-weight-medium q-py-sm" align="center">Merchant Disc Fee</div>
            <div class="row group bg-green-2">
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.mdrPlan.domesticDebitUpTo2000.fixed.$touch"
                  :error="$v.merchant.mdrPlan.domesticDebitUpTo2000.fixed.$error"
                  v-model="merchant.mdrPlan.domesticDebitUpTo2000.fixed"
                  placeholder="Fixed"
                />
              </div>
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.mdrPlan.domesticDebitUpTo2000.percentage.$touch"
                  :error="$v.merchant.mdrPlan.domesticDebitUpTo2000.percentage.$error"
                  v-model="merchant.mdrPlan.domesticDebitUpTo2000.percentage"
                  placeholder="%"
                />
              </div>
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.mdrPlan.domesticDebitUpTo2000.minimum.$touch"
                  :error="$v.merchant.mdrPlan.domesticDebitUpTo2000.minimum.$error"
                  v-model="merchant.mdrPlan.domesticDebitUpTo2000.minimum"
                  placeholder="Max"
                />
              </div>
            </div>
          </div>
          <div class="col" v-if="showOnlyIfSharingModelIsEnabled">
            <div class="q-caption text-weight-medium q-py-sm" align="center">Sharing Disc Fee</div>
            <div class="row group bg-yellow-2">
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.SharingDiscountFee.domesticDebitUpTo2000.fixed.$touch"
                  :error="$v.merchant.SharingDiscountFee.domesticDebitUpTo2000.fixed.$error"
                  v-model="merchant.SharingDiscountFee.domesticDebitUpTo2000.fixed"
                  placeholder="Fixed"
                />
              </div>
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.SharingDiscountFee.domesticDebitUpTo2000.percentage.$touch"
                  :error="$v.merchant.SharingDiscountFee.domesticDebitUpTo2000.percentage.$error"
                  v-model="merchant.SharingDiscountFee.domesticDebitUpTo2000.percentage"
                  placeholder="%"
                />
              </div>
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.SharingDiscountFee.domesticDebitUpTo2000.minimum.$touch"
                  :error="$v.merchant.SharingDiscountFee.domesticDebitUpTo2000.minimum.$error"
                  v-model="merchant.SharingDiscountFee.domesticDebitUpTo2000.minimum"
                  placeholder="Max"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="row items-center">
          <div class="col-3">
            <div class="q-caption text-weight-medium">Domestic Debit Card above 2000</div>
          </div>
          <div class="col">
            <div class="row group bg-green-2">
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.mdrPlan.domesticDebitAbove2000.fixed.$touch"
                  :error="$v.merchant.mdrPlan.domesticDebitAbove2000.fixed.$error"
                  v-model="merchant.mdrPlan.domesticDebitAbove2000.fixed"
                  placeholder="Fixed"
                />
              </div>
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.mdrPlan.domesticDebitAbove2000.percentage.$touch"
                  :error="$v.merchant.mdrPlan.domesticDebitAbove2000.percentage.$error"
                  v-model="merchant.mdrPlan.domesticDebitAbove2000.percentage"
                  placeholder="%"
                />
              </div>
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.mdrPlan.domesticDebitAbove2000.minimum.$touch"
                  :error="$v.merchant.mdrPlan.domesticDebitAbove2000.minimum.$error"
                  v-model="merchant.mdrPlan.domesticDebitAbove2000.minimum"
                  placeholder="Max"
                />
              </div>
            </div>
          </div>
          <div class="col" v-if="showOnlyIfSharingModelIsEnabled">
            <div class="row group bg-yellow-2">
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.SharingDiscountFee.domesticDebitAbove2000.fixed.$touch"
                  :error="$v.merchant.SharingDiscountFee.domesticDebitAbove2000.fixed.$error"
                  v-model="merchant.SharingDiscountFee.domesticDebitAbove2000.fixed"
                  placeholder="Fixed"
                />
              </div>
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.SharingDiscountFee.domesticDebitAbove2000.percentage.$touch"
                  :error="$v.merchant.SharingDiscountFee.domesticDebitAbove2000.percentage.$error"
                  v-model="merchant.SharingDiscountFee.domesticDebitAbove2000.percentage"
                  placeholder="%"
                />
              </div>
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.SharingDiscountFee.domesticDebitAbove2000.minimum.$touch"
                  :error="$v.merchant.SharingDiscountFee.domesticDebitAbove2000.minimum.$error"
                  v-model="merchant.SharingDiscountFee.domesticDebitAbove2000.minimum"
                  placeholder="Max"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="row items-center">
          <div class="col-3">
            <div class="q-caption text-weight-medium">Standard/Classic (1st Stab)</div>
          </div>
          <div class="col">
            <div class="row group bg-green-2">
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.mdrPlan.standardOrClassic.fixed.$touch"
                  :error="$v.merchant.mdrPlan.standardOrClassic.fixed.$error"
                  v-model="merchant.mdrPlan.standardOrClassic.fixed"
                  placeholder="Fixed"
                />
              </div>
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.mdrPlan.standardOrClassic.percentage.$touch"
                  :error="$v.merchant.mdrPlan.standardOrClassic.percentage.$error"
                  v-model="merchant.mdrPlan.standardOrClassic.percentage"
                  placeholder="%"
                />
              </div>
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.mdrPlan.standardOrClassic.minimum.$touch"
                  :error="$v.merchant.mdrPlan.standardOrClassic.minimum.$error"
                  v-model="merchant.mdrPlan.standardOrClassic.minimum"
                  placeholder="Max"
                />
              </div>
            </div>
          </div>
          <div class="col" v-if="showOnlyIfSharingModelIsEnabled">
            <div class="row group bg-yellow-2">
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.SharingDiscountFee.standardOrClassic.fixed.$touch"
                  :error="$v.merchant.SharingDiscountFee.standardOrClassic.fixed.$error"
                  v-model="merchant.SharingDiscountFee.standardOrClassic.fixed"
                  placeholder="Fixed"
                />
              </div>
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.SharingDiscountFee.standardOrClassic.percentage.$touch"
                  :error="$v.merchant.SharingDiscountFee.standardOrClassic.percentage.$error"
                  v-model="merchant.SharingDiscountFee.standardOrClassic.percentage"
                  placeholder="%"
                />
              </div>
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.SharingDiscountFee.standardOrClassic.minimum.$touch"
                  :error="$v.merchant.SharingDiscountFee.standardOrClassic.minimum.$error"
                  v-model="merchant.SharingDiscountFee.standardOrClassic.minimum"
                  placeholder="Max"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="row items-center">
          <div class="col-3">
            <div class="q-caption text-weight-medium">Premium/Platinum (2nd Stab)</div>
          </div>
          <div class="col">
            <div class="row group bg-green-2">
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.mdrPlan.premiumOrPlatinum.fixed.$touch"
                  :error="$v.merchant.mdrPlan.premiumOrPlatinum.fixed.$error"
                  v-model="merchant.mdrPlan.premiumOrPlatinum.fixed"
                  placeholder="Fixed"
                />
              </div>
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.mdrPlan.premiumOrPlatinum.percentage.$touch"
                  :error="$v.merchant.mdrPlan.premiumOrPlatinum.percentage.$error"
                  v-model="merchant.mdrPlan.premiumOrPlatinum.percentage"
                  placeholder="%"
                />
              </div>
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.mdrPlan.premiumOrPlatinum.minimum.$touch"
                  :error="$v.merchant.mdrPlan.premiumOrPlatinum.minimum.$error"
                  v-model="merchant.mdrPlan.premiumOrPlatinum.minimum"
                  placeholder="Max"
                />
              </div>
            </div>
          </div>
          <div class="col" v-if="showOnlyIfSharingModelIsEnabled">
            <div class="row group bg-yellow-2">
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.SharingDiscountFee.premiumOrPlatinum.fixed.$touch"
                  :error="$v.merchant.SharingDiscountFee.premiumOrPlatinum.fixed.$error"
                  v-model="merchant.SharingDiscountFee.premiumOrPlatinum.fixed"
                  placeholder="Fixed"
                />
              </div>
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.SharingDiscountFee.premiumOrPlatinum.percentage.$touch"
                  :error="$v.merchant.SharingDiscountFee.premiumOrPlatinum.percentage.$error"
                  v-model="merchant.SharingDiscountFee.premiumOrPlatinum.percentage"
                  placeholder="%"
                />
              </div>
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.SharingDiscountFee.premiumOrPlatinum.minimum.$touch"
                  :error="$v.merchant.SharingDiscountFee.premiumOrPlatinum.minimum.$error"
                  v-model="merchant.SharingDiscountFee.premiumOrPlatinum.minimum"
                  placeholder="Max"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="row items-center">
          <div class="col-3">
            <div class="q-caption text-weight-medium">Super Premium/Signature (3rd Stab)</div>
          </div>
          <div class="col">
            <div class="row group bg-green-2">
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.mdrPlan.superPremiumOrSignature.fixed.$touch"
                  :error="$v.merchant.mdrPlan.superPremiumOrSignature.fixed.$error"
                  v-model="merchant.mdrPlan.superPremiumOrSignature.fixed"
                  placeholder="Fixed"
                />
              </div>
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.mdrPlan.superPremiumOrSignature.percentage.$touch"
                  :error="$v.merchant.mdrPlan.superPremiumOrSignature.percentage.$error"
                  v-model="merchant.mdrPlan.superPremiumOrSignature.percentage"
                  placeholder="%"
                />
              </div>
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.mdrPlan.superPremiumOrSignature.minimum.$touch"
                  :error="$v.merchant.mdrPlan.superPremiumOrSignature.minimum.$error"
                  v-model="merchant.mdrPlan.superPremiumOrSignature.minimum"
                  placeholder="Max"
                />
              </div>
            </div>
          </div>
          <div class="col" v-if="showOnlyIfSharingModelIsEnabled">
            <div class="row group bg-yellow-2">
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.SharingDiscountFee.superPremiumOrSignature.fixed.$touch"
                  :error="$v.merchant.SharingDiscountFee.superPremiumOrSignature.fixed.$error"
                  v-model="merchant.SharingDiscountFee.superPremiumOrSignature.fixed"
                  placeholder="Fixed"
                />
              </div>
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.SharingDiscountFee.superPremiumOrSignature.percentage.$touch"
                  :error="$v.merchant.SharingDiscountFee.superPremiumOrSignature.percentage.$error"
                  v-model="merchant.SharingDiscountFee.superPremiumOrSignature.percentage"
                  placeholder="%"
                />
              </div>
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.SharingDiscountFee.superPremiumOrSignature.minimum.$touch"
                  :error="$v.merchant.SharingDiscountFee.superPremiumOrSignature.minimum.$error"
                  v-model="merchant.SharingDiscountFee.superPremiumOrSignature.minimum"
                  placeholder="Max"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="row items-center">
          <div class="col-3">
            <div class="q-caption text-weight-medium">Commercial/Coporate 4th Stab</div>
          </div>
          <div class="col">
            <div class="row group bg-green-2">
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.mdrPlan.commercialOrCorporate.fixed.$touch"
                  :error="$v.merchant.mdrPlan.commercialOrCorporate.fixed.$error"
                  v-model="merchant.mdrPlan.commercialOrCorporate.fixed"
                  placeholder="Fixed"
                />
              </div>
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.mdrPlan.commercialOrCorporate.percentage.$touch"
                  :error="$v.merchant.mdrPlan.commercialOrCorporate.percentage.$error"
                  v-model="merchant.mdrPlan.commercialOrCorporate.percentage"
                  placeholder="%"
                />
              </div>
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.mdrPlan.commercialOrCorporate.minimum.$touch"
                  :error="$v.merchant.mdrPlan.commercialOrCorporate.minimum.$error"
                  v-model="merchant.mdrPlan.commercialOrCorporate.minimum"
                  placeholder="Max"
                />
              </div>
            </div>
          </div>
          <div class="col" v-if="showOnlyIfSharingModelIsEnabled">
            <div class="row group bg-yellow-2">
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.SharingDiscountFee.commercialOrCorporate.fixed.$touch"
                  :error="$v.merchant.SharingDiscountFee.commercialOrCorporate.fixed.$error"
                  v-model="merchant.SharingDiscountFee.commercialOrCorporate.fixed"
                  placeholder="Fixed"
                />
              </div>
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.SharingDiscountFee.commercialOrCorporate.percentage.$touch"
                  :error="$v.merchant.SharingDiscountFee.commercialOrCorporate.percentage.$error"
                  v-model="merchant.SharingDiscountFee.commercialOrCorporate.percentage"
                  placeholder="%"
                />
              </div>
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.SharingDiscountFee.commercialOrCorporate.minimum.$touch"
                  :error="$v.merchant.SharingDiscountFee.commercialOrCorporate.minimum.$error"
                  v-model="merchant.SharingDiscountFee.commercialOrCorporate.minimum"
                  placeholder="Max"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="row items-center">
          <div class="col-3">
            <div class="q-caption text-weight-medium">International Debit Card</div>
          </div>
          <div class="col">
            <div class="row group bg-green-2">
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.mdrPlan.internationalDebitCard.fixed.$touch"
                  :error="$v.merchant.mdrPlan.internationalDebitCard.fixed.$error"
                  v-model="merchant.mdrPlan.internationalDebitCard.fixed"
                  placeholder="Fixed"
                />
              </div>
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.mdrPlan.internationalDebitCard.percentage.$touch"
                  :error="$v.merchant.mdrPlan.internationalDebitCard.percentage.$error"
                  v-model="merchant.mdrPlan.internationalDebitCard.percentage"
                  placeholder="%"
                />
              </div>
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.mdrPlan.internationalDebitCard.minimum.$touch"
                  :error="$v.merchant.mdrPlan.internationalDebitCard.minimum.$error"
                  v-model="merchant.mdrPlan.internationalDebitCard.minimum"
                  placeholder="Max"
                />
              </div>
            </div>
          </div>
          <div class="col" v-if="showOnlyIfSharingModelIsEnabled">
            <div class="row group bg-yellow-2">
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.SharingDiscountFee.internationalDebitCard.fixed.$touch"
                  :error="$v.merchant.SharingDiscountFee.internationalDebitCard.fixed.$error"
                  v-model="merchant.SharingDiscountFee.internationalDebitCard.fixed"
                  placeholder="Fixed"
                />
              </div>
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.SharingDiscountFee.internationalDebitCard.percentage.$touch"
                  :error="$v.merchant.SharingDiscountFee.internationalDebitCard.percentage.$error"
                  v-model="merchant.SharingDiscountFee.internationalDebitCard.percentage"
                  placeholder="%"
                />
              </div>
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.SharingDiscountFee.internationalDebitCard.minimum.$touch"
                  :error="$v.merchant.SharingDiscountFee.internationalDebitCard.minimum.$error"
                  v-model="merchant.SharingDiscountFee.internationalDebitCard.minimum"
                  placeholder="Max"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="row items-center">
          <div class="col-3">
            <div class="q-caption text-weight-medium">International Credit Card</div>
          </div>
          <div class="col">
            <div class="row group bg-green-2">
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.mdrPlan.internationalCreditCard.fixed.$touch"
                  :error="$v.merchant.mdrPlan.internationalCreditCard.fixed.$error"
                  v-model="merchant.mdrPlan.internationalCreditCard.fixed"
                  placeholder="Fixed"
                />
              </div>
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.mdrPlan.internationalCreditCard.percentage.$touch"
                  :error="$v.merchant.mdrPlan.internationalCreditCard.percentage.$error"
                  v-model="merchant.mdrPlan.internationalCreditCard.percentage"
                  placeholder="%"
                />
              </div>
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.mdrPlan.internationalCreditCard.minimum.$touch"
                  :error="$v.merchant.mdrPlan.internationalCreditCard.minimum.$error"
                  v-model="merchant.mdrPlan.internationalCreditCard.minimum"
                  placeholder="Max"
                />
              </div>
            </div>
          </div>
          <div class="col" v-if="showOnlyIfSharingModelIsEnabled">
            <div class="row group bg-yellow-2">
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.SharingDiscountFee.internationalCreditCard.fixed.$touch"
                  :error="$v.merchant.SharingDiscountFee.internationalCreditCard.fixed.$error"
                  v-model="merchant.SharingDiscountFee.internationalCreditCard.fixed"
                  placeholder="Fixed"
                />
              </div>
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.SharingDiscountFee.internationalCreditCard.percentage.$touch"
                  :error="$v.merchant.SharingDiscountFee.internationalCreditCard.percentage.$error"
                  v-model="merchant.SharingDiscountFee.internationalCreditCard.percentage"
                  placeholder="%"
                />
              </div>
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.SharingDiscountFee.internationalCreditCard.minimum.$touch"
                  :error="$v.merchant.SharingDiscountFee.internationalCreditCard.minimum.$error"
                  v-model="merchant.SharingDiscountFee.internationalCreditCard.minimum"
                  placeholder="Max"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="row items-center">
          <div class="col-3">
            <div class="q-caption text-weight-medium">Onus</div>
          </div>
          <div class="col">
            <div class="row group bg-green-2">
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.mdrPlan.onus.fixed.$touch"
                  :error="$v.merchant.mdrPlan.onus.fixed.$error"
                  v-model="merchant.mdrPlan.onus.fixed"
                  placeholder="Fixed"
                />
              </div>
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.mdrPlan.onus.percentage.$touch"
                  :error="$v.merchant.mdrPlan.onus.percentage.$error"
                  v-model="merchant.mdrPlan.onus.percentage"
                  placeholder="%"
                />
              </div>
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.mdrPlan.onus.minimum.$touch"
                  :error="$v.merchant.mdrPlan.onus.minimum.$error"
                  v-model="merchant.mdrPlan.onus.minimum"
                  placeholder="Max"
                />
              </div>
            </div>
          </div>
          <div class="col" v-if="showOnlyIfSharingModelIsEnabled">
            <div class="row group bg-yellow-2">
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.SharingDiscountFee.onus.fixed.$touch"
                  :error="$v.merchant.SharingDiscountFee.onus.fixed.$error"
                  v-model="merchant.SharingDiscountFee.onus.fixed"
                  placeholder="Fixed"
                />
              </div>
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.SharingDiscountFee.onus.percentage.$touch"
                  :error="$v.merchant.SharingDiscountFee.onus.percentage.$error"
                  v-model="merchant.SharingDiscountFee.onus.percentage"
                  placeholder="%"
                />
              </div>
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.SharingDiscountFee.onus.minimum.$touch"
                  :error="$v.merchant.SharingDiscountFee.onus.minimum.$error"
                  v-model="merchant.SharingDiscountFee.onus.minimum"
                  placeholder="Max"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="row items-center">
          <div class="col-3">
            <div class="q-caption text-weight-medium">mVISA</div>
          </div>
          <div class="col">
            <div class="row group bg-green-2">
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.mdrPlan.mVisa.fixed.$touch"
                  :error="$v.merchant.mdrPlan.mVisa.fixed.$error"
                  v-model="merchant.mdrPlan.mVisa.fixed"
                  placeholder="Fixed"
                />
              </div>
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.mdrPlan.mVisa.percentage.$touch"
                  :error="$v.merchant.mdrPlan.mVisa.percentage.$error"
                  v-model="merchant.mdrPlan.mVisa.percentage"
                  placeholder="%"
                />
              </div>
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.mdrPlan.mVisa.minimum.$touch"
                  :error="$v.merchant.mdrPlan.mVisa.minimum.$error"
                  v-model="merchant.mdrPlan.mVisa.minimum"
                  placeholder="Max"
                />
              </div>
            </div>
          </div>
          <div class="col" v-if="showOnlyIfSharingModelIsEnabled">
            <div class="row group bg-yellow-2">
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.SharingDiscountFee.mVisa.fixed.$touch"
                  :error="$v.merchant.SharingDiscountFee.mVisa.fixed.$error"
                  v-model="merchant.SharingDiscountFee.mVisa.fixed"
                  placeholder="Fixed"
                />
              </div>
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.SharingDiscountFee.mVisa.percentage.$touch"
                  :error="$v.merchant.SharingDiscountFee.mVisa.percentage.$error"
                  v-model="merchant.SharingDiscountFee.mVisa.percentage"
                  placeholder="%"
                />
              </div>
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.SharingDiscountFee.mVisa.minimum.$touch"
                  :error="$v.merchant.SharingDiscountFee.mVisa.minimum.$error"
                  v-model="merchant.SharingDiscountFee.mVisa.minimum"
                  placeholder="Max"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="row items-center">
          <div class="col-3">
            <div class="q-caption text-weight-medium">Master Pass</div>
          </div>
          <div class="col">
            <div class="row group bg-green-2">
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.mdrPlan.masterPass.fixed.$touch"
                  :error="$v.merchant.mdrPlan.masterPass.fixed.$error"
                  v-model="merchant.mdrPlan.masterPass.fixed"
                  placeholder="Fixed"
                />
              </div>
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.mdrPlan.masterPass.percentage.$touch"
                  :error="$v.merchant.mdrPlan.masterPass.percentage.$error"
                  v-model="merchant.mdrPlan.masterPass.percentage"
                  placeholder="%"
                />
              </div>
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.mdrPlan.masterPass.fixed.$touch"
                  :error="$v.merchant.mdrPlan.masterPass.fixed.$error"
                  v-model="merchant.mdrPlan.masterPass.fixed"
                  placeholder="Max"
                />
              </div>
            </div>
          </div>
          <div class="col" v-if="showOnlyIfSharingModelIsEnabled">
            <div class="row group bg-yellow-2">
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.SharingDiscountFee.masterPass.fixed.$touch"
                  :error="$v.merchant.SharingDiscountFee.masterPass.fixed.$error"
                  v-model="merchant.SharingDiscountFee.masterPass.fixed"
                  placeholder="Fixed"
                />
              </div>
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.SharingDiscountFee.masterPass.percentage.$touch"
                  :error="$v.merchant.SharingDiscountFee.masterPass.percentage.$error"
                  v-model="merchant.SharingDiscountFee.masterPass.percentage"
                  placeholder="%"
                />
              </div>
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.SharingDiscountFee.masterPass.minimum.$touch"
                  :error="$v.merchant.SharingDiscountFee.masterPass.minimum.$error"
                  v-model="merchant.SharingDiscountFee.masterPass.minimum"
                  placeholder="Max"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="row items-center">
          <div class="col-3">
            <div class="q-caption text-weight-medium">Cash at POS</div>
          </div>
          <div class="col">
            <div class="row group bg-green-2">
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.mdrPlan.cashAtPos.fixed.$touch"
                  :error="$v.merchant.mdrPlan.cashAtPos.fixed.$error"
                  v-model="merchant.mdrPlan.cashAtPos.fixed"
                  placeholder="Fixed"
                />
              </div>
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.mdrPlan.cashAtPos.percentage.$touch"
                  :error="$v.merchant.mdrPlan.cashAtPos.percentage.$error"
                  v-model="merchant.mdrPlan.cashAtPos.percentage"
                  placeholder="%"
                />
              </div>
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.mdrPlan.cashAtPos.minimum.$touch"
                  :error="$v.merchant.mdrPlan.cashAtPos.minimum.$error"
                  v-model="merchant.mdrPlan.cashAtPos.minimum"
                  placeholder="Max"
                />
              </div>
            </div>
          </div>
          <div class="col" v-if="showOnlyIfSharingModelIsEnabled">
            <div class="row group bg-yellow-2">
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.SharingDiscountFee.cashAtPos.fixed.$touch"
                  :error="$v.merchant.SharingDiscountFee.cashAtPos.fixed.$error"
                  v-model="merchant.SharingDiscountFee.cashAtPos.fixed"
                  placeholder="Fixed"
                />
              </div>
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.SharingDiscountFee.cashAtPos.percentage.$touch"
                  :error="$v.merchant.SharingDiscountFee.cashAtPos.percentage.$error"
                  v-model="merchant.SharingDiscountFee.cashAtPos.percentage"
                  placeholder="%"
                />
              </div>
              <div class="col">
                <q-input
                  color="grey-9"
                  type="number"
                  @blur="$v.merchant.SharingDiscountFee.cashAtPos.minimum.$touch"
                  :error="$v.merchant.SharingDiscountFee.cashAtPos.minimum.$error"
                  v-model="merchant.SharingDiscountFee.cashAtPos.minimum"
                  placeholder="Max"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <q-stepper-navigation>
      <q-btn color="primary" class="q-ma-xs" icon="check" @click="validate" label="Continue"/>
      <q-btn
        color="amber-10"
        class="q-ma-xs"
        icon="save"
        label="Save Partial"
        @click="$emit('saveData','mdrPlan',merchant)"
      />
      <q-btn color="grey-7" class="q-ma-xs" icon="block" @click="$emit('goBack')" label="Back"/>
    </q-stepper-navigation>
    <div class="hidden">{{makePropsReactive}}</div>
  </div>
</template>

<script>
import {
  helpers,
  required,
  requiredIf,
  integer,
  minLength,
  maxLength,
  minValue,
  email,
  decimal,
  between,
  numeric
} from "vuelidate/lib/validators";
export default {
  // name: 'ComponentName',
  props: [
    "sharingModelCode",
    "mdrPlan",
    "SharingDiscountFee",
    "mdrAddtionalDetails"
  ],
  data() {
    return {
      merchant: {
        mdrPlan: {},
        sharingDiscountFee: {}
      }
    };
  },
  validations: {
    merchant: {
      mdrPlan: {
        domesticDebitUpTo2000: {
          fixed: { minValue: minValue(0), decimal, required },
          percentage: { required, between: between(0, 100) },
          minimum: { minValue: minValue(0), decimal, required }
        },
        domesticDebitAbove2000: {
          fixed: { minValue: minValue(0), decimal, required },
          percentage: { between: between(0, 100), decimal, required },
          minimum: { minValue: minValue(0), decimal, required }
        },
        standardOrClassic: {
          fixed: { minValue: minValue(0), decimal, required },
          percentage: { between: between(0, 100), decimal, required },
          minimum: { minValue: minValue(0), decimal, required }
        },
        premiumOrPlatinum: {
          fixed: { minValue: minValue(0), decimal, required },
          percentage: { between: between(0, 100), decimal, required },
          minimum: { minValue: minValue(0), decimal, required }
        },
        superPremiumOrSignature: {
          fixed: { minValue: minValue(0), decimal, required },
          percentage: { between: between(0, 100), decimal, required },
          minimum: { minValue: minValue(0), decimal, required }
        },
        commercialOrCorporate: {
          fixed: { minValue: minValue(0), decimal, required },
          percentage: { between: between(0, 100), decimal, required },
          minimum: { minValue: minValue(0), decimal, required }
        },
        internationalDebitCard: {
          fixed: { minValue: minValue(0), decimal, required },
          percentage: { between: between(0, 100), decimal, required },
          minimum: { minValue: minValue(0), decimal, required }
        },
        internationalCreditCard: {
          fixed: { minValue: minValue(0), decimal, required },
          percentage: { between: between(0, 100), decimal, required },
          minimum: { minValue: minValue(0), decimal, required }
        },
        onus: {
          fixed: { minValue: minValue(0), decimal, required },
          percentage: { between: between(0, 100), decimal, required },
          minimum: { minValue: minValue(0), decimal, required }
        },
        mVisa: {
          fixed: { minValue: minValue(0), decimal, required },
          percentage: { between: between(0, 100), decimal, required },
          minimum: { minValue: minValue(0), decimal, required }
        },
        masterPass: {
          fixed: { minValue: minValue(0), decimal, required },
          percentage: { between: between(0, 100), decimal, required },
          minimum: { minValue: minValue(0), decimal, required }
        },
        cashAtPos: {
          fixed: { minValue: minValue(0), decimal, required },
          percentage: { between: between(0, 100), decimal, required },
          minimum: { minValue: minValue(0), decimal, required }
        }
      },
      SharingDiscountFee: {
        domesticDebitUpTo2000: {
          fixed: {
            minValue: minValue(0),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled;
            })
          },
          percentage: {
            between: between(0, 100),
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled;
            })
          },
          minimum: {
            minValue: minValue(0),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled;
            })
          }
        },
        domesticDebitAbove2000: {
          fixed: {
            minValue: minValue(0),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled;
            })
          },
          percentage: {
            between: between(0, 100),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled;
            })
          },
          minimum: {
            minValue: minValue(0),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled;
            })
          }
        },
        standardOrClassic: {
          fixed: {
            minValue: minValue(0),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled;
            })
          },
          percentage: {
            between: between(0, 100),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled;
            })
          },
          minimum: {
            minValue: minValue(0),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled;
            })
          }
        },
        premiumOrPlatinum: {
          fixed: {
            minValue: minValue(0),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled;
            })
          },
          percentage: {
            between: between(0, 100),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled;
            })
          },
          minimum: {
            minValue: minValue(0),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled;
            })
          }
        },
        superPremiumOrSignature: {
          fixed: {
            minValue: minValue(0),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled;
            })
          },
          percentage: {
            between: between(0, 100),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled;
            })
          },
          minimum: {
            minValue: minValue(0),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled;
            })
          }
        },
        commercialOrCorporate: {
          fixed: {
            minValue: minValue(0),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled;
            })
          },
          percentage: {
            between: between(0, 100),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled;
            })
          },
          minimum: {
            minValue: minValue(0),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled;
            })
          }
        },
        internationalDebitCard: {
          fixed: {
            minValue: minValue(0),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled;
            })
          },
          percentage: {
            between: between(0, 100),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled;
            })
          },
          minimum: {
            minValue: minValue(0),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled;
            })
          }
        },
        internationalCreditCard: {
          fixed: {
            minValue: minValue(0),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled;
            })
          },
          percentage: {
            between: between(0, 100),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled;
            })
          },
          minimum: {
            minValue: minValue(0),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled;
            })
          }
        },
        onus: {
          fixed: {
            minValue: minValue(0),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled;
            })
          },
          percentage: {
            between: between(0, 100),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled;
            })
          },
          minimum: {
            minValue: minValue(0),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled;
            })
          }
        },
        mVisa: {
          fixed: {
            minValue: minValue(0),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled;
            })
          },
          percentage: {
            between: between(0, 100),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled;
            })
          },
          minimum: {
            minValue: minValue(0),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled;
            })
          }
        },
        masterPass: {
          fixed: {
            minValue: minValue(0),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled;
            })
          },
          percentage: {
            between: between(0, 100),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled;
            })
          },
          minimum: {
            minValue: minValue(0),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled;
            })
          }
        },
        cashAtPos: {
          fixed: {
            minValue: minValue(0),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled;
            })
          },
          percentage: {
            between: between(0, 100),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled;
            })
          },
          minimum: {
            minValue: minValue(0),
            decimal,
            required: requiredIf(function() {
              return this.showOnlyIfSharingModelIsEnabled;
            })
          }
        }
      }
    }
  },
  computed: {
    makePropsReactive() {
      this.merchant.mdrPlan = this.mdrPlan;
      this.merchant.sharingDiscountFee = this.sharingDiscountFee;
    },
    showOnlyIfSharingModelIsEnabled() {
      // N => No sharing
      return this.sharingModelCode != "N";
    }
  },
  methods: {
    validate() {
      this.$v.merchant.$touch();
      if (this.$v.merchant.$error) {
        this.$q.notify("Please review fields again.");
      } else {
        this.$emit("goNext", "mdr", this.merchant);
      }
    }
  }
};
</script>

<style>
</style>
