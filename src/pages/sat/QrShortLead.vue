<template>
  <q-page>
    <div class="q-ma-md">
      <div class="row q-ma-xs">
        <div class="col-6 col-lg-3">
          <div class="q-title q-my-md capitalize">
            {{ formData.qrShortLead.legalName }}
          </div>
          <div
            class="text-light-blue cursor-pointer"
            @click="toggleLeadInformation(formData.shortLead)"
          >
            # {{ formData.qrShortLead.qrLeadNumber }}
          </div>
        </div>
        <div class="col-6 col-lg-3">
          <div class="q-title q-my-md">Contact</div>
          <div class="no-margin">{{ formData.qrShortLead.contactNumber }}</div>
        </div>
        <div class="col-12 col-lg-3">
          <div class="q-title q-my-md">Address</div>
          <div class="capitalize no-margin">
            {{ formData.qrShortLead.contactAddress }}
          </div>
          <div class="capitalize no-margin">
            {{ formData.qrShortLead.city }}, {{ formData.qrShortLead.state }}
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="d-flex align-items-center q-title q-my-md nowrap-text">
              Remarks
            </div>
            <q-btn
              square
              highlight
              push
              class="remarksbtn"
              color="purple-9"
              size="sm"
              @click="fnReassignData(formData.qrShortLead)"
              >Remarks</q-btn
            >
          </div>
        </div>
        <div class="col-12 col-lg-8">
          <div class="row">
            <div class="col-12">
              <q-card class="q-ma-xs border-1 q-custom-class" flat>
                <q-card-title class="q-pa-sm bottom-border title-bg">
                  <div class="row items-center">
                    <div class="col q-body-1 text-weight-medium">
                      MERCHANT DETAILS
                    </div>
                  </div>
                </q-card-title>
                <q-card-main class="q-pa-sm">
                  <q-list separator no-border class="no-padding q-body-1">
                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main>Application Number</q-item-main>
                      <q-input
                        disable
                        type="text"
                        style="width: 220px"
                        v-model="this.applicationNumber"
                      />
                    </q-item>
                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main style="display: flex; align-items: center">
                        <span
                          style="flex: 1"
                          :class="{
                            'error-highlight': $v.formData.qrShortLead.contactName.$error,
                          }"
                        >
                          Contact Person Name
                        </span>
                        <q-input
                          @blur="$v.formData.qrShortLead.contactName.$touch"
                          :error="$v.formData.qrShortLead.contactName.$error"
                          type="text"
                          style="width: 220px"
                          v-model="formData.qrShortLead.contactName"
                          @keydown="validateName"
                        />
                      </q-item-main>
                      <div
                        v-if="$v.formData.qrShortLead.contactName.$error"
                        class="error-tooltip"
                        :class="{
                          'error-highlight': $v.formData.qrShortLead.contactName.$error,
                        }"
                      >
                        <span v-if="!$v.formData.qrShortLead.contactName.$model">
                          Contact Person Name is required.
                        </span>
                      </div>
                    </q-item>
                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main style="display: flex; align-items: center;">
                        <span
                          style="flex: 1;"
                          :class="{
                            'error-highlight':
                              $v.formData.qrShortLead.legalName.$error
                          }"
                        >
                          Legal Name
                        </span>
                        <q-input
                          @blur="$v.formData.qrShortLead.legalName.$touch"
                          :error="$v.formData.qrShortLead.legalName.$error"
                          type="text"
                          style="width: 220px"
                          v-model="formData.qrShortLead.legalName"
                          @input="handlelegalname($event)"
                        />
                        <!-- @keydown="nameKeydown($event)" -->
                      </q-item-main>
                      <div
                        v-if="$v.formData.qrShortLead.legalName.$error"
                        class="error-tooltip"
                        :class="{
                          'error-highlight': $v.formData.qrShortLead.legalName.$error,
                        }"
                      >
                        <span v-if="!$v.formData.qrShortLead.legalName.$model">
                          Legal Name is required.
                        </span>
                        <span
                          v-if="
                            $v.formData.qrShortLead.legalName.$model &&
                            ($v.formData.qrShortLead.legalName.$model < 0 ||
                              $v.formData.qrShortLead.legalName.$model > 60)
                          "
                        >
                          Legal Name must be between 0 and 60.
                        </span>
                      </div>
                    </q-item>
                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main>Marketing Name</q-item-main>
                      <q-input
                        @blur="$v.formData.qrShortLead.marketingName.$touch"
                        :error="$v.formData.qrShortLead.marketingName.$error"
                        type="text"
                        style="width: 220px"
                        v-model="formData.qrShortLead.marketingName"
                        @input="handlemarketing($event)"
                      />
                      <!-- @keydown="nameKeydown($event)" -->
                      <div
                        v-if="$v.formData.qrShortLead.marketingName.$error"
                        class="error-tooltip"
                        :class="{
                          'error-highlight': $v.formData.qrShortLead.marketingName.$error,
                        }"
                      >
                        <span v-if="!$v.formData.qrShortLead.marketingName.$model">
                          Marketing Name is required.
                        </span>
                      </div>
                    </q-item>
                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main>GST Number</q-item-main>
                      <q-input
                        type="text"
                        style="width: 220px"
                        float-label="GST Number"
                        placeholder="GST Number"
                        v-model="formData.qrShortLead.gstNumber"
                        @keydown="nameKeydown($event)"
                      />
                      <div v-if="gstNumberError" class="error-tooltip">
                        GST Number is required.
                      </div>
                      <div v-if="gstNumberValidationError" class="error-tooltip">
                        GST Number must be exactly 15 digits.
                      </div>
                      <!-- <div
                        v-if="
                          $v.formData.qrShortLead.gstNumber.$model &&
                          $v.formData.qrShortLead.gstNumber.$model !== 15 
                        "
                        class="error-tooltip"
                      >
                        GST Number must be exactly 15 digits.
                      </div> -->

                      <!-- <q-item-main style="display: flex; align-items: center;">
                        <span style="flex: 1;">
                          GST Number
                        </span>
                        <q-input
                          @blur="$v.formData.qrShortLead.gstNumber.$touch"
                          :error="$v.formData.qrShortLead.gstNumber.$error"
                          type="text"
                          style="width: 220px"
                          float-label="GST Number"
                          placeholder="GST Number"
                          v-model="formData.qrShortLead.gstNumber"
                          @keydown="nameKeydown($event)"
                        />
                      </q-item-main> -->
                    </q-item>
                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main>Contact Email</q-item-main>
                      <q-input
                        type="text"
                        style="width: 220px"
                        float-label="Contact Email*"
                        placeholder="Contact Email*"
                        :error="$v.formData.qrShortLead.contactEmail.$error"
                        @blur="$v.formData.qrShortLead.contactEmail.$touch"
                        v-model="formData.qrShortLead.contactEmail"
                      />
                      <!-- <div
                        v-if="$v.formData.qrShortLead.contactEmail.$error"
                        class="error-tooltip"
                        :class="{
                          'error-highlight': $v.formData.qrShortLead.contactEmail.$error,
                        }"
                      > -->
                      <span
                        v-if="!$v.formData.qrShortLead.contactEmail.$model"
                        class="error-tooltip"
                      >
                        Contact Email is required.
                      </span>
                      <span
                        v-if="
                         !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                          formData.qrShortLead.contactEmail
    )
                        "
                        class="error-tooltip"
                      >
                       please enter valid email id
                      </span>
                      <!-- </div> -->
                    </q-item>
                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main>Contact Number</q-item-main>
                      <q-input
                        type="number"
                        style="width: 220px"
                        float-label="Contact Number*"
                        placeholder="Contact Number*"
                        :error="$v.formData.qrShortLead.contactNumber.$error"
                        @blur="$v.formData.qrShortLead.contactNumber.$touch"
                        v-model="formData.qrShortLead.contactNumber"
                        @keydown="nameKeydown($event)"
                        maxlength="10"
                      />
                      <div
                        v-if="$v.formData.qrShortLead.contactNumber.$error"
                        class="error-tooltip"
                        :class="{
                          'error-highlight':
                            $v.formData.qrShortLead.contactNumber.$error
                        }"
                      >
                        <span
                          v-if="!$v.formData.qrShortLead.contactNumber.$model"
                        >
                          Contact Number is required.
                        </span>
                        <span
                          v-if="
                            $v.formData.qrShortLead.contactNumber.$model &&
                              $v.formData.qrShortLead.contactNumber.$model
                                .length !== 10
                          "
                        >
                          Contact Number must be exactly 10 digits.
                        </span>
                      </div>
                    </q-item>
                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main>Alternate Number</q-item-main>
                      <q-input
                        type="number"
                        style="width: 220px"
                        float-label="Alternate Number"
                        placeholder="Alternate Number"
                        v-model="formData.qrShortLead.alternateContactNumber"
                        @keydown="nameKeydown($event)"
                      />
                      <div v-if="alternativeError" class="error-tooltip">
                        Alternate Number is required.
                      </div>
                      <div
                        v-if="alternativeValidatonError"
                        class="error-tooltip"
                      >
                        Alternate Number must be exactly 10 digits.
                      </div>
                    </q-item>
                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main style="display: flex; align-items: center;">
                        <span
                          style="flex: 1;"
                          :class="{
                            'error-highlight':
                              $v.formData.qrShortLead.contactAddress.$error
                          }"
                        >
                          Contact Address
                        </span>
                        <q-input
                          @blur="$v.formData.qrShortLead.contactAddress.$touch"
                          :error="$v.formData.qrShortLead.contactAddress.$error"
                          type="text"
                          style="width: 220px"
                          v-model="formData.qrShortLead.contactAddress"
                        />
                        <div
                          v-if="$v.formData.qrShortLead.contactAddress.$error"
                          class="error-tooltip"
                          :class="{
                            'error-highlight':
                              $v.formData.qrShortLead.contactAddress.$error
                          }"
                        >
                          <span
                            v-if="
                              !$v.formData.qrShortLead.contactAddress.$model
                            "
                          >
                            Contact Address is required.
                          </span>
                          <span
                            v-if="
                              $v.formData.qrShortLead.contactAddress.$model &&
                                ($v.formData.qrShortLead.contactAddress.$model <
                                  0 ||
                                  $v.formData.qrShortLead.contactAddress
                                    .$model > 120)
                            "
                          >
                            Contact Address must be between 0 and 120.
                          </span>
                        </div>
                      </q-item-main>
                    </q-item>
                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main style="display: flex; align-items: center;">
                        <span
                          style="flex: 1;"
                          :class="{
                            'error-highlight':
                              $v.formData.qrShortLead.pincode.$error
                          }"
                        >
                          Pincode
                        </span>
                        <q-input
                          type="number"
                          onkeydown="javascript: return event.keyCode === 8 ||
                        event.keyCode === 46 ? true : !isNaN(Number(event.key))"
                          :error="$v.formData.qrShortLead.pincode.$error"
                          @blur="validatePincode"
                          style="width: 220px"
                          clearable
                          color="grey-9"
                          v-model.trim="formData.qrShortLead.pincode"
                          float-label="Pincode"
                          placeholder="Pincode"
                        >
                          <q-autocomplete
                            @search="pincodeSearch"
                            :debounce="500"
                            :min-characters="1"
                            @selected="pincodeSelected1"
                          />
                        </q-input>
                        <div
                          v-if="$v.formData.qrShortLead.pincode.$error"
                          class="error-tooltip"
                          :class="{
                            'error-highlight': $v.formData.qrShortLead.pincode.$error,
                          }"
                        >
                          <span v-if="!$v.formData.qrShortLead.pincode.$model">
                            Pincode is required.
                          </span>
                          <span
                            v-if="
                              $v.formData.qrShortLead.pincode.$model &&
                                $v.formData.qrShortLead.pincode.$model
                                  .length !== 6
                            "
                          >
                            Pincode must be exactly 6 digits.
                          </span>
                        </div>
                      </q-item-main>
                    </q-item>
                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main style="display: flex; align-items: center;">
                        <span
                          style="flex: 1;"
                          :class="{
                            'error-highlight':
                              $v.formData.qrShortLead.state.$error
                          }"
                        >
                          State
                        </span>
                        <q-input
                          clearable
                          :error="$v.formData.qrShortLead.state.$error"
                          @blur="validateStateInput"
                          style="width: 220px"
                          color="grey-9"
                          v-model="formData.qrShortLead.state"
                          float-label="State*"
                        >
                          <q-autocomplete
                            separator
                            @search="residentStateSearch"
                            :debounce="10"
                            :min-characters="3"
                            @selected="registeredStateSelected1"
                          />
                        </q-input>
                        <div
                          v-if="$v.formData.qrShortLead.state.$error"
                          class="error-tooltip"
                          :class="{
                            'error-highlight': $v.formData.qrShortLead.state.$error,
                          }"
                        >
                          <span v-if="!$v.formData.qrShortLead.state.$model">
                            State is required.
                          </span>
                        </div>
                      </q-item-main>
                    </q-item>
                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main style="display: flex; align-items: center;">
                        <span
                          style="flex: 1;"
                          :class="{
                            'error-highlight':
                              $v.formData.qrShortLead.city.$error
                          }"
                        >
                          City
                        </span>
                        <q-input
                          clearable
                          @blur="validateCityInput"
                          :error="$v.formData.qrShortLead.city.$error"
                          style="width: 220px"
                          color="grey-9"
                          v-model="formData.qrShortLead.city"
                          float-label="City*"
                        >
                          <q-autocomplete
                            separator
                            @search="residentCitySearch"
                            :debounce="10"
                            :min-characters="3"
                            @selected="registeredCitySelected1"
                          />
                        </q-input>
                        <div
                          v-if="$v.formData.qrShortLead.city.$error"
                          class="error-tooltip"
                          :class="{
                            'error-highlight': $v.formData.qrShortLead.city.$error,
                          }"
                        >
                          <span v-if="!$v.formData.qrShortLead.city.$model">
                            City is required.
                          </span>
                        </div>
                      </q-item-main>
                    </q-item>
                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main>Lead Source</q-item-main>
                      <q-input
                        disable
                        type="text"
                        style="width: 220px"
                        v-model="formData.qrShortLead.leadSource.sourceName"
                      />
                    </q-item>
                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main>Merchant Type</q-item-main>
                      <q-input
                        type="text"
                        disable
                        style="width: 220px"
                        v-model="
                          formData.qrShortLead.qrMerchantType.merchantTypeName
                        "
                      />
                    </q-item>
                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main>Establishment Year</q-item-main>
                      <!-- <q-input
                        type="text"
                        style="width: 220px"
                        v-model="formData.qrShortLead.establishmentYear"
                      /> -->
                      <q-input
                        v-model="formData.qrShortLead.establishmentYear"
                        label="Establishment Year"
                        mask="##/##/####"
                        filled
                        type="text"
                        style="width: 220px"
                      />
                      <div v-if="!isEstablishmentYearValid" class="error-tooltip">
                        Establishment Year must a valid date in dd/mm/yyyy format.
                      </div>
                    </q-item>
                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main>Merchant Industry - MCC</q-item-main>
                      <q-input
                        clearable
                        @blur="validateMCCInput"
                        :error="
                          $v.formData.qrShortLead.merchantIndustry.industryName
                            .$error
                        "
                        style="width: 220px"
                        color="grey-9"
                        v-model="
                          formData.qrShortLead.merchantIndustry.industryName
                        "
                        float-label="MCC*"
                      >
                        <q-autocomplete
                          separator
                          @search="mccSearch"
                          :debounce="10"
                          :min-characters="3"
                          @selected="mccSelected"
                        />
                      </q-input>
                      <div
                        v-if="
                          $v.formData.qrShortLead.merchantIndustry.industryName.$error
                        "
                        class="error-tooltip"
                        :class="{
                          'error-highlight':
                            $v.formData.qrShortLead.merchantIndustry.industryName.$error,
                        }"
                      >
                        <span
                          v-if="
                            !$v.formData.qrShortLead.merchantIndustry.industryName.$model
                          "
                        >
                          Merchant Industry - MCC is required.
                        </span>
                      </div>
                    </q-item>
                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main>Nature of Business</q-item-main>
                      <q-input
                        type="text"
                        style="width: 220px"
                        v-model="formData.qrShortLead.natureOfBusiness"
                        @input="handleInput($event)"
                      />
                      <!-- @keydown="nameKeydown($event)" -->
                    </q-item>
                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main>Category Type</q-item-main>
                      <q-input
                        v-if="this.formData.qrShortLead.isMerchant == 1"
                        disable
                        type="text"
                        style="width: 220px;"
                        v-model="isactivemerchant"
                      />
                      <q-input
                        v-if="this.formData.qrShortLead.isMerchant == 2"
                        disable
                        type="text"
                        style="width: 220px;"
                        v-model="isactivemerchant1"
                      />
                    </q-item>
                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main>State</q-item-main>
                      <q-input
                        disable
                        type="text"
                        style="width: 220px"
                        v-model="formData.qrShortLead.merchantStateName"
                      />
                    </q-item>
                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main>District</q-item-main>
                      <q-input
                        disable
                        type="text"
                        style="width: 220px"
                        v-model="formData.qrShortLead.merchantDistrictName"
                      />
                    </q-item>
                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main>Sub District</q-item-main>
                      <q-input
                        disable
                        type="text"
                        style="width: 220px"
                        v-model="formData.qrShortLead.merchantSubDistrictName"
                      />
                    </q-item>
                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main>Village</q-item-main>
                      <q-input
                        disable
                        type="text"
                        style="width: 220px"
                        v-model="formData.qrShortLead.merchantVillageName"
                      />
                    </q-item>
                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main>Tier</q-item-main>
                      <q-input
                        disable
                        type="text"
                        style="width: 220px"
                        v-model="formData.qrShortLead.merchantTier"
                      />
                    </q-item>
                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main>Lat Log</q-item-main>
                      <q-input
                        disable
                        type="text"
                        style="width: 220px"
                        v-model="formData.qrShortLead.merchantLatLng"
                      />
                    </q-item>
                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main>Device Type</q-item-main>
                      <q-input
                        disable
                        type="text"
                        style="width: 220px"
                        v-model="formData.qrShortLead.device.deviceName"
                      />
                    </q-item>
                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main>Language</q-item-main>
                      <q-input
                        v-if="formData.qrShortLead.languageSoundbox != null"
                        type="text"
                        style="width: 220px"
                        v-model="formData.qrShortLead.languageSoundbox.language"
                      />
                    </q-item>
                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main style="display: flex; align-items: center;">
                        <span
                          style="flex: 1;"
                          :class="{
                            'error-highlight':
                              $v.formData.qrShortLead.salesPersonName.$error
                          }"
                        >
                          Sales Person Name
                        </span>
                        <q-select
                          filter
                          clearable
                          @blur="$v.formData.qrShortLead.salesPersonName.$touch"
                          :error="
                            $v.formData.qrShortLead.salesPersonName.$error
                          "
                          style="width: 220px"
                          color="grey-9"
                          v-model="formData.qrShortLead.salesPersonName"
                          float-label="Sales Person*"
                          :options="dropDown.salesPersonOptions"
                          @selected="salesSelected"
                          @input="saveFieldData"
                        />
                        <div
                          v-if="$v.formData.qrShortLead.salesPersonName.$error"
                          class="error-tooltip"
                          :class="{
                            'error-highlight':
                              $v.formData.qrShortLead.salesPersonName.$error,
                          }"
                        >
                          <span v-if="!$v.formData.qrShortLead.salesPersonName.$model">
                            Sales Person Name is required.
                          </span>
                        </div>
                      </q-item-main>
                    </q-item>
                    <!-- <q-item class="q-pa-sm q-body-1">
                        <q-item-main style="display: flex; align-items: center;">
                        <span style="flex: 1;"
                          :class="{'error-highlight': $v.formData.qrShortLead.regionCode.$error}">
                          Region
                        </span>
                      <q-select
                        @blur="$v.formData.qrShortLead.regionCode.$touch"
                        :error="$v.formData.qrShortLead.regionCode.$error"
                        style="width: 220px"
                        color="grey-9"
                        v-model="formData.qrShortLead.regionCode"
                        float-label="Region*"
                        :options="regionOptions"
                        @selected="regionSelected"
                        @input="saveFieldData"
                      />
                    </q-item-main>
                    </q-item> -->
                  </q-list>
                </q-card-main>
              </q-card>
            </div>
          </div>

          <div class="row">
            <div class="col-12">
              <q-card class="q-ma-xs border-1 q-custom-class" flat>
                <q-card-title class="q-pa-sm bottom-border title-bg">
                  <div class="row items-center">
                    <div class="col q-body-1 text-weight-medium">
                      PERSONAL INFO
                    </div>
                  </div>
                </q-card-title>
                <q-card-main class="q-pa-sm">
                  <q-list separator no-border class="no-padding q-body-1">
                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main style="display: flex; align-items: center;">
                        <span
                          style="flex: 1;"
                          :class="{
                            'error-highlight':
                              $v.formData.qrShortLead.personalAddress.$error
                          }"
                        >
                          Address
                        </span>
                        <q-input
                          @blur="$v.formData.qrShortLead.personalAddress.$touch"
                          :error="
                            $v.formData.qrShortLead.personalAddress.$error
                          "
                          type="text"
                          style="width: 220px"
                          float-label="Address*"
                          placeholder="Address*"
                          v-model="formData.qrShortLead.personalAddress"
                        />
                        <div
                          v-if="$v.formData.qrShortLead.personalAddress.$error"
                          class="error-tooltip"
                          :class="{
                            'error-highlight':
                              $v.formData.qrShortLead.personalAddress.$error,
                          }"
                        >
                          <span v-if="!$v.formData.qrShortLead.personalAddress.$model">
                            Address is required.
                          </span>
                          <span
                            v-if="
                              $v.formData.qrShortLead.personalAddress.$model &&
                              ($v.formData.qrShortLead.personalAddress.$model < 0 ||
                                $v.formData.qrShortLead.personalAddress.$model > 180)
                            "
                          >
                            Address must be between 0 and 180.
                          </span>
                        </div>
                      </q-item-main>
                    </q-item>
                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main style="display: flex; align-items: center;">
                        <span
                          style="flex: 1;"
                          :class="{
                            'error-highlight':
                              $v.formData.qrShortLead.personalInfoCity.$error
                          }"
                        >
                          City
                        </span>
                        <q-input
                          clearable
                          @blur="validatePersonalCityInput"
                          :error="
                            $v.formData.qrShortLead.personalInfoCity.$error
                          "
                          style="width: 220px"
                          color="grey-9"
                          v-model="formData.qrShortLead.personalInfoCity"
                          float-label="City*"
                        >
                          <q-autocomplete
                            separator
                            @search="residentCitySearch"
                            :debounce="10"
                            :min-characters="3"
                            @selected="registeredCitySelected"
                          />
                        </q-input>
                        <div
                          v-if="$v.formData.qrShortLead.personalInfoCity.$error"
                          class="error-tooltip"
                          :class="{
                            'error-highlight':
                              $v.formData.qrShortLead.personalInfoCity.$error,
                          }"
                        >
                          <span v-if="!$v.formData.qrShortLead.personalInfoCity.$model">
                            City is required.
                          </span>
                        </div>
                      </q-item-main>
                    </q-item>
                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main style="display: flex; align-items: center;">
                        <span
                          style="flex: 1;"
                          :class="{
                            'error-highlight':
                              $v.formData.qrShortLead.personalInfoState.$error
                          }"
                        >
                          State
                        </span>
                        <q-input
                          clearable
                          :error="$v.formData.qrShortLead.personalInfoState.$error"
                          @blur="validatePersonalStateInput"
                          style="width: 220px"
                          color="grey-9"
                          v-model="formData.qrShortLead.personalInfoState"
                          float-label="State*"
                        >
                          <q-autocomplete
                            separator
                            @search="residentStateSearch"
                            :debounce="10"
                            :min-characters="3"
                            @selected="registeredStateSelected"
                          />
                        </q-input>
                        <div
                          v-if="$v.formData.qrShortLead.personalInfoState.$error"
                          class="error-tooltip"
                          :class="{
                            'error-highlight':
                              $v.formData.qrShortLead.personalInfoState.$error,
                          }"
                        >
                          <span v-if="!$v.formData.qrShortLead.personalInfoState.$model">
                            State is required.
                          </span>
                        </div>
                      </q-item-main>
                    </q-item>

                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main style="display: flex; align-items: center;">
                        <span
                          style="flex: 1;"
                          :class="{
                            'error-highlight':
                              $v.formData.qrShortLead.personalInfoPincode.$error
                          }"
                        >
                          PIN
                        </span>
                        <q-input
                          type="number"
                          onkeydown="javascript: return event.keyCode === 8 ||
                             event.keyCode === 46 ? true : !isNaN(Number(event.key))"
                          :error="
                            $v.formData.qrShortLead.personalInfoPincode.$error
                          "
                          @blur="validatePin"
                          style="width: 220px"
                          clearable
                          color="grey-9"
                          v-model.trim="
                            formData.qrShortLead.personalInfoPincode
                          "
                          float-label="Pincode*"
                          placeholder="Pincode*"
                        >
                          <q-autocomplete
                            @search="pincodeSearch1"
                            :debounce="500"
                            :min-characters="1"
                            @selected="pincodeSelected"
                          />
                        </q-input>
                        <div
                          v-if="$v.formData.qrShortLead.personalInfoPincode.$error"
                          class="error-tooltip"
                          :class="{
                            'error-highlight':
                              $v.formData.qrShortLead.personalInfoPincode.$error,
                          }"
                        >
                          <span
                            v-if="!$v.formData.qrShortLead.personalInfoPincode.$model"
                          >
                            PIN is required.
                          </span>
                          <span
                            v-if="
                              $v.formData.qrShortLead.personalInfoPincode.$model &&
                              $v.formData.qrShortLead.personalInfoPincode.$model
                                .length !== 6
                            "
                          >
                            PIN must be exactly 6 digits.
                          </span>
                        </div>
                      </q-item-main>
                    </q-item>

                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main style="display: flex; align-items: center;">
                        <span
                          style="flex: 1;"
                          :class="{
                            'error-highlight':
                              $v.formData.qrShortLead.personalInfoMobile.$error
                          }"
                        >
                          Mobile
                        </span>
                        <q-input
                          type="number"
                          style="width: 220px"
                          float-label="Mobile*"
                          placeholder="Mobile*"
                          :error="
                            $v.formData.qrShortLead.personalInfoMobile.$error
                          "
                          @blur="
                            $v.formData.qrShortLead.personalInfoMobile.$touch
                          "
                          v-model="formData.qrShortLead.personalInfoMobile"
                          @keydown="nameKeydown($event)"
                          maxlength="10"
                        />
                        <div
                          v-if="$v.formData.qrShortLead.personalInfoMobile.$error"
                          class="error-tooltip"
                          :class="{
                            'error-highlight':
                              $v.formData.qrShortLead.personalInfoMobile.$error,
                          }"
                        >
                          <span v-if="!$v.formData.qrShortLead.personalInfoMobile.$model">
                            Mobile is required.
                          </span>
                          <span
                            v-if="
                              $v.formData.qrShortLead.personalInfoMobile.$model &&
                              $v.formData.qrShortLead.personalInfoMobile.$model.length !==
                                10
                            "
                          >
                            Mobile must be exactly 10 digits.
                          </span>
                        </div>
                      </q-item-main>
                    </q-item>
                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main style="display: flex; align-items: center;">
                        <span
                          style="flex: 1;"
                          :class="{
                            'error-highlight':
                              $v.formData.qrShortLead.personalInfoEmail.$error
                          }"
                        >
                          Email
                        </span>
                        <q-input
                          type="text"
                          style="width: 220px"
                          float-label="Email ID*"
                          placeholder="Email ID*"
                          :error="
                            $v.formData.qrShortLead.personalInfoEmail.$error
                          "
                          @blur="
                            $v.formData.qrShortLead.personalInfoEmail.$touch
                          "
                          v-model="formData.qrShortLead.personalInfoEmail"
                        />
                        <!-- <div
                          v-if="$v.formData.qrShortLead.personalInfoEmail.$error"
                          class="error-tooltip"
                          :class="{
                            'error-highlight':
                              $v.formData.qrShortLead.personalInfoEmail.$error,
                          }"
                        > -->
                        <span
                          v-if="!$v.formData.qrShortLead.personalInfoEmail.$model"
                          class="error-tooltip"
                        >
                          Email is required.
                        </span>
                        <span
                          v-if="
                            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                              formData.qrShortLead.personalInfoEmail
                            )
                          "
                          class="error-tooltip"
                        >
                           please enter valid email id
                        </span>
                        <!-- </div> -->
                      </q-item-main>
                    </q-item>
                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main style="display: flex; align-items: center;">
                        <span
                          style="flex: 1;"
                          :class="{
                            'error-highlight':
                              $v.formData.qrShortLead.panNumber.$error
                          }"
                        >
                          PAN
                        </span>
                        <q-input
                          @blur="$v.formData.qrShortLead.panNumber.$touch"
                          :error="$v.formData.qrShortLead.panNumber.$error"
                          float-label="PAN*"
                          placeholder="PAN*"
                          type="text"
                          style="width: 220px"
                          v-model="formData.qrShortLead.panNumber"
                          @keydown="nameKeydown($event)"
                          maxlength="10"
                        />
                        <div
                          v-if="$v.formData.qrShortLead.panNumber.$error"
                          class="error-tooltip"
                          :class="{
                            'error-highlight': $v.formData.qrShortLead.panNumber.$error,
                          }"
                        >
                          <span v-if="!$v.formData.qrShortLead.panNumber.$model">
                            PAN is required.
                          </span>
                          <span
                            v-if="
                              $v.formData.qrShortLead.panNumber.$model &&
                              $v.formData.qrShortLead.panNumber.$model.length !== 10
                            "
                          >
                            PAN must be exactly 10 digits.
                          </span>
                        </div>
                      </q-item-main>
                    </q-item>
                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main style="display: flex; align-items: center;">
                        <span
                          style="flex: 1;"
                          :class="{
                            'error-highlight':
                              $v.formData.qrShortLead.dateOfBirth.$error
                          }"
                        >
                          DOB
                        </span>
                        <!-- <q-datetime
                          :error="$v.formData.qrShortLead.dateOfBirth.$error"
                          @blur="$v.formData.qrShortLead.dateOfBirth.$touch"
                          v-model="formData.qrShortLead.dateOfBirth"
                          :max="tomorrow"
                          style="width: 220px"
                          float-label="DOB*"
                          placeholder="DOB*"
                          :format="'DD/MM/YYYY'"
                        /> -->
                        <q-input
                          :error="$v.formData.qrShortLead.dateOfBirth.$error"
                          @blur="$v.formData.qrShortLead.dateOfBirth.$touch"
                          v-model="formData.qrShortLead.dateOfBirth"
                          label="DOB*"
                          mask="##/##/####"
                          filled
                          type="text"
                          style="width: 220px"
                        />
                        <div
                          v-if="$v.formData.qrShortLead.dateOfBirth.$error"
                          class="error-tooltip"
                          :class="{
                            'error-highlight': $v.formData.qrShortLead.dateOfBirth.$error,
                          }"
                        >
                          <span v-if="!$v.formData.qrShortLead.dateOfBirth.$model">
                            DOB is required.
                          </span>
                        </div>

                        <div v-if="!isdobformatValid" class="error-tooltip">
                          DOB must a valid date in dd/mm/yyyy format.
                        </div>
                      </q-item-main>
                    </q-item>
                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main>Nationality</q-item-main>
                      <q-input
                        type="text"
                        style="width: 220px"
                        v-model="formData.qrShortLead.nationality"
                      />
                    </q-item>
                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main>Passport Number</q-item-main>
                      <q-input
                        type="text"
                        style="width: 220px"
                        float-label="Passport Number"
                        placeholder="Passport Number"
                        v-model="formData.qrShortLead.passportNumber"
                      />
                      <!-- <div v-if="!isPassportNumberValid" class="error-tooltip">
                        Passport Number format must be J8369854
                      </div> -->
                    </q-item>
                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main>Passport Expiry Date</q-item-main>
                      <q-input
                        type="text"
                        style="width: 220px"
                        float-label="Passport Expiry Date"
                        placeholder="Passport Expiry Date"
                        v-model="formData.qrShortLead.passportExpiryDate"
                      />
                      <!-- <q-input
                        v-model="formData.qrShortLead.passportExpiryDate"
                        label="Passport Expiry Date"
                        mask="##/##/####"
                        filled
                        type="text"
                        style="width: 220px"
                      />
                      <div v-if="!ispassportValid" class="error-tooltip">
                        Passport Expiry Date must a valid date in dd/mm/yyyy format.
                      </div> -->
                    </q-item>
                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main>Own House</q-item-main>
                      <!-- <q-input
                        v-if="this.formData.qrShortLead.ownHouse == true"
                        type="text"
                        style="width: 220px;"
                        v-model="isownHouse"
                      />
                      <q-input
                        v-if="this.formData.qrShortLead.ownHouse == false"
                        type="text"
                        style="width: 220px;"
                        v-model="isownHouse1"
                      /> -->

                      <q-select
                        v-model="formData.qrShortLead.ownHouse"
                        float-label="Own House*"
                        :options="ownHouseOptions"
                        style="width: 220px"
                        @selected="houseSelected"
                      />
                    </q-item>
                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main>Owner Age</q-item-main>
                      <q-input
                        :error="$v.formData.qrShortLead.ownerAge.$error"
                        @blur="$v.formData.qrShortLead.ownerAge.$touch"
                        type="text"
                        style="width: 220px"
                        v-model="formData.qrShortLead.ownerAge"
                      />
                      <div
                        v-if="$v.formData.qrShortLead.ownerAge.$error"
                        class="error-tooltip"
                        :class="{
                          'error-highlight': $v.formData.qrShortLead.ownerAge.$error,
                        }"
                      >
                        <span v-if="!$v.formData.qrShortLead.ownerAge.$model">
                          Owner Age is required.
                        </span>
                         <span v-if="
      $v.formData.qrShortLead.ownerAge.$model && 
      ($v.formData.qrShortLead.ownerAge.$model < 1 || $v.formData.qrShortLead.ownerAge.$model > 150)"
    >
      Owner Age must be between 1 and 150.
    </span>
                      </div>
                      <!-- <div v-if="!isownerage" class="error-tooltip">
                        Owner Age must be greater than 0 and less than 150.
                      </div> -->
                    </q-item>
                  </q-list>
                </q-card-main>
              </q-card>
            </div>
          </div>

          <div class="row">
            <div class="col-12">
              <q-card class="q-ma-xs border-1 q-custom-class" flat>
                <q-card-title class="q-pa-sm bottom-border title-bg">
                  <div class="row items-center">
                    <div class="col q-body-1 text-weight-medium">RISK</div>
                  </div>
                </q-card-title>
                <q-card-main class="q-pa-sm">
                  <q-list separator no-border class="no-padding q-body-1">
                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main>Business Hours WeekDay Start</q-item-main>
                      <q-input

                        style="width: 220px"
                        v-model="formData.qrShortLead.hoursWeekdayStart"
                        @keydown="nameKeydownhoursWeekdayStart"
                        @input="handleNumericInputhoursWeekdayStart"
                      />
                      <div
                        v-if="$v.formData.qrShortLead.hoursWeekdayStart.$error"
                        class="error-tooltip"
                        :class="{
                          'error-highlight':
                            $v.formData.qrShortLead.hoursWeekdayStart.$error,
                        }"
                      >
                        <span v-if="!$v.formData.qrShortLead.hoursWeekdayStart.$model">
                          Business Hours WeekDay Start is required.
                        </span>
                      </div>
                    </q-item>
                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main>Business Hours WeekDay End</q-item-main>
                      <q-input

                        style="width: 220px"
                        v-model="formData.qrShortLead.hoursWeekdayEnd"
                        @keydown="nameKeydownhoursWeekdayEnd"
                        @input="handleNumericInputhoursWeekdayEnd"
                      />

                      <div
                        v-if="$v.formData.qrShortLead.hoursWeekdayEnd.$error"
                        class="error-tooltip"
                        :class="{
                          'error-highlight':
                            $v.formData.qrShortLead.hoursWeekdayEnd.$error,
                        }"
                      >
                        <span v-if="!$v.formData.qrShortLead.hoursWeekdayEnd.$model">
                          Business Hours WeekDay End is required.
                        </span>
                      </div>
                    </q-item>
                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main>Business Hours Weekend Start</q-item-main>
                      <q-input

                        style="width: 220px"
                        v-model="formData.qrShortLead.hoursWeekendStart"
                        @keydown="nameKeydownhoursWeekendStart"
                        @input="handleNumericInputhoursWeekendStart"
                      />
                      <div
                        v-if="$v.formData.qrShortLead.hoursWeekendStart.$error"
                        class="error-tooltip"
                        :class="{
                          'error-highlight':
                            $v.formData.qrShortLead.hoursWeekendStart.$error,
                        }"
                      >
                        <span v-if="!$v.formData.qrShortLead.hoursWeekendStart.$model">
                          Business Hours Weekend Start is required.
                        </span>
                      </div>
                    </q-item>
                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main>Business Hours Weekend End</q-item-main>
                      <q-input

                        style="width: 220px"
                        v-model="formData.qrShortLead.hoursWeekendEnd"
                        @keydown="nameKeydownhoursWeekendEnd"
                        @input="handleNumericInputhoursWeekendEnd"
                      />
                      <div
                        v-if="$v.formData.qrShortLead.hoursWeekendEnd.$error"
                        class="error-tooltip"
                        :class="{
                          'error-highlight':
                            $v.formData.qrShortLead.hoursWeekendEnd.$error,
                        }"
                      >
                        <span v-if="!$v.formData.qrShortLead.hoursWeekendEnd.$model">
                          Business Hours Weekend End is required.
                        </span>
                      </div>
                    </q-item>
                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main>Average Bill Amount</q-item-main>
                      <q-input
                        type="number"
                        style="width: 220px"
                        v-model="formData.qrShortLead.averageBillAmount"
                      />
                      <div
                        v-if="$v.formData.qrShortLead.averageBillAmount.$error"
                        class="error-tooltip"
                        :class="{
                          'error-highlight':
                            $v.formData.qrShortLead.averageBillAmount.$error,
                        }"
                      >
                        <span v-if="!$v.formData.qrShortLead.averageBillAmount.$model">
                          Average Bill Amount is required.
                        </span>
                      </div>
                    </q-item>
                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main>Maximum Usage - Daily</q-item-main>
                      <q-input
                        type="number"
                        style="width: 220px"
                        v-model="formData.qrShortLead.maximumUsageDaily"
                      />
                      <div
                        v-if="$v.formData.qrShortLead.maximumUsageDaily.$error"
                        class="error-tooltip"
                        :class="{
                          'error-highlight':
                            $v.formData.qrShortLead.maximumUsageDaily.$error,
                        }"
                      >
                        <span v-if="!$v.formData.qrShortLead.maximumUsageDaily.$model">
                          Maximum Usage - Daily is required.
                        </span>
                      </div>
                    </q-item>
                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main>Maximum Usage - Weekly</q-item-main>
                      <q-input
                        type="number"
                        style="width: 220px"
                        v-model="formData.qrShortLead.maximumUsageWeekly"
                      />
                      <div
                        v-if="$v.formData.qrShortLead.maximumUsageWeekly.$error"
                        class="error-tooltip"
                        :class="{
                          'error-highlight':
                            $v.formData.qrShortLead.maximumUsageWeekly.$error,
                        }"
                      >
                        <span v-if="!$v.formData.qrShortLead.maximumUsageWeekly.$model">
                          Maximum Usage - Weekly is required.
                        </span>
                      </div>
                    </q-item>
                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main>Maximum Usage - Monthly</q-item-main>
                      <q-input
                        type="number"
                        style="width: 220px"
                        v-model="formData.qrShortLead.maximumUsageMonthly"
                      />
                      <div
                        v-if="$v.formData.qrShortLead.maximumUsageMonthly.$error"
                        class="error-tooltip"
                        :class="{
                          'error-highlight':
                            $v.formData.qrShortLead.maximumUsageMonthly.$error,
                        }"
                      >
                        <span v-if="!$v.formData.qrShortLead.maximumUsageMonthly.$model">
                          Maximum Usage - Monthly is required.
                        </span>
                      </div>
                    </q-item>
                  </q-list>
                </q-card-main>
              </q-card>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-8">
          <div class="row">
            <div class="col-12">
              <q-card class="q-ma-xs border-1 q-custom-class" flat>
                <q-card-title class="q-pa-sm bottom-border title-bg">
                  <div class="row items-center">
                    <div class="col q-body-1 text-weight-medium">RENTAL</div>
                  </div>
                </q-card-title>

                <q-card-main class="q-pa-sm">
                  <q-list separator no-border class="no-padding q-body-1">
                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main>SO Rental Plan Name</q-item-main>
                      <q-input
                        style="width: 220px"
                        disable
                        type="text"
                        v-model="formData.qrShortLead.plan.planName"
                      />
                    </q-item>
                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main style="display: flex; align-items: center;">
                        <span
                          style="flex: 1;"
                          :class="{
                            'error-highlight':
                              $v.formData.qrShortLead.marsRentalPlanName.$error
                          }"
                        >MARS Rental Plan Name</span>
                        <q-select
                          filter
                          clearable
                          @blur="
                            $v.formData.qrShortLead.marsRentalPlanName.$touch
                          "
                          :error="
                            $v.formData.qrShortLead.marsRentalPlanName.$error
                          "
                          color="grey-9"
                          style="width: 220px"
                          v-model="formData.qrShortLead.marsRentalPlanName"
                          :options="dropDown.rentalplan"
                          float-label="Select Plan*"
                          @selected="rentalPlanSelected"
                          @input="saveFieldData"
                        />
                      </q-item-main>
                      <div
                        v-if="$v.formData.qrShortLead.marsRentalPlanName.$error"
                        class="error-tooltip"
                        :class="{
                          'error-highlight':
                            $v.formData.qrShortLead.marsRentalPlanName.$error,
                        }"
                      >
                        <span v-if="!$v.formData.qrShortLead.marsRentalPlanName.$model">
                          MARS Rental Plan Name is required.
                        </span>
                      </div>
                    </q-item>

                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main style="display: flex; align-items: center;">
                        <span
                          style="flex: 1;"
                          :class="{
                            'error-highlight':
                              $v.formData.qrShortLead.rentalMode.$error
                          }"
                        >Rental Mode</span>
                        <q-select
                          @blur="$v.formData.qrShortLead.rentalMode.$touch"
                          :error="$v.formData.qrShortLead.rentalMode.$error"
                          placeholder="Choose from the below*"
                          color="grey-9"
                          style="width: 220px"
                          v-model="formData.qrShortLead.rentalMode"
                          float-label="Rental Mode*"
                          :options="rentalModeOptions"
                        />
                      </q-item-main>
                      <div
                        v-if="$v.formData.qrShortLead.rentalMode.$error"
                        class="error-tooltip"
                        :class="{
                          'error-highlight': $v.formData.qrShortLead.rentalMode.$error,
                        }"
                      >
                        <span v-if="!$v.formData.qrShortLead.rentalMode.$model">
                          Rental Mode is required.
                        </span>
                      </div>
                    </q-item>

                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main style="display: flex; align-items: center;">
                        <span
                          style="flex: 1;"
                          :class="{
                            'error-highlight':
                              $v.formData.qrShortLead.rentalType.$error
                          }"
                        >Rental Type</span>
                <div class="group">
                  <q-radio
                    @blur="$v.formData.qrShortLead.rentalType.$touch"
                    :error="$v.formData.qrShortLead.rentalType.$error"
                    v-for="(item, index) in rentalTypeOptions"
                    :key="index"
                    color="grey-9"
                    style="width: 103px"
                    v-model="formData.qrShortLead.rentalType"
                    :val="item.value"
                    :label="item.label"
                  />
              </div>
            </q-item-main>
                      <div
                        v-if="$v.formData.qrShortLead.rentalType.$error"
                        class="error-tooltip"
                        :class="{
                          'error-highlight': $v.formData.qrShortLead.rentalType.$error,
                        }"
                      >
                        <span v-if="!$v.formData.qrShortLead.rentalType.$model">
                          Rental Type is required.
                        </span>
                      </div>
                    </q-item>

                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main>Setup Fee</q-item-main>
                      <q-input
                        style="width: 220px"
                        type="number"
                        v-model="formData.qrShortLead.setupFees"
                      />
                      <div
                        v-if="$v.formData.qrShortLead.setupFees.$error"
                        class="error-tooltip"
                        :class="{
                          'error-highlight': $v.formData.qrShortLead.setupFees.$error,
                        }"
                      >
                        <span v-if="!$v.formData.qrShortLead.setupFees.$model">
                          Setup Fee is required.
                        </span>
                      </div>
                    </q-item>
                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main>Reccuring Fee</q-item-main>
                      <q-input
                        type="number"
                        style="width: 220px"
                        v-model="formData.qrShortLead.recurringFees"
                      />
                      <div
                        v-if="$v.formData.qrShortLead.recurringFees.$error"
                        class="error-tooltip"
                        :class="{
                          'error-highlight': $v.formData.qrShortLead.recurringFees.$error,
                        }"
                      >
                        <span v-if="!$v.formData.qrShortLead.recurringFees.$model">
                          Reccuring Fee is required.
                        </span>
                      </div>
                    </q-item>
                  </q-list>
                </q-card-main>
              </q-card>
            </div>
          </div>

          <div class="row">
            <div class="col-12">
              <q-card class="q-ma-xs border-1 q-custom-class" flat>
                <q-card-title class="q-pa-sm bottom-border title-bg">
                  <div class="row items-center">
                    <div class="col q-body-1 text-weight-medium">MDR</div>
                  </div>
                </q-card-title>

                <q-card-main class="q-pa-sm">
                  <q-list separator no-border class="no-padding q-body-1">
                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main>Merchant Category</q-item-main>
                      <q-input
                        disable
                        type="text"
                        style="width: 220px"
                        v-model="
                          formData.qrShortLead.merchantCategory
                            .merchantCategoryName
                        "
                      />
                    </q-item>
                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main>Select MDR Plan</q-item-main>
                      <q-input
                        disable
                        style="width: 220px"
                        type="text"
                        v-model="formData.qrShortLead.mdrPlanName"
                      />
                    </q-item>
                    <div v-if="this.formData.qrShortLead.isMerchant == 1">
                      <q-item class="q-pa-sm q-body-1">
                        <q-item-main
                          >Small Merchant - MDR <2K Debit Card</q-item-main
                        >
                        <q-input
                          style="width: 220px"
                          type="number"
                          v-model="
                            formData.qrShortLead.smallMerchantLessThanTwoDebit
                          "
                        />
                        <div
                          v-if="
                            $v.formData.qrShortLead.smallMerchantLessThanTwoDebit.$error
                          "
                          class="error-tooltip"
                          :class="{
                            'error-highlight':
                              $v.formData.qrShortLead.smallMerchantLessThanTwoDebit
                                .$error,
                          }"
                        >
                          <span
                            v-if="
                              !$v.formData.qrShortLead.smallMerchantLessThanTwoDebit
                                .$model
                            "
                          >
                            Small Merchant - MDR <2K Debit Card is required.
                          </span>
                        </div>
                      </q-item>
                      <q-item class="q-pa-sm q-body-1">
                        <q-item-main
                          >Small merchant - MDR >2K Debit Card</q-item-main
                        >
                        <q-input
                          style="width: 220px"
                          type="number"
                          v-model="
                            formData.qrShortLead
                              .smallMerchantGreaterThanTwoDebit
                          "
                        />
                        <div
                          v-if="
                            $v.formData.qrShortLead.smallMerchantGreaterThanTwoDebit
                              .$error
                          "
                          class="error-tooltip"
                          :class="{
                            'error-highlight':
                              $v.formData.qrShortLead.smallMerchantGreaterThanTwoDebit
                                .$error,
                          }"
                        >
                          <span
                            v-if="
                              !$v.formData.qrShortLead.smallMerchantGreaterThanTwoDebit
                                .$model
                            "
                          >
                            Small merchant - MDR >2K Debit Card is required.
                          </span>
                        </div>
                      </q-item>
                      <q-item class="q-pa-sm q-body-1">
                        <q-item-main
                          >Small merchant - MDR <2K Credit Card</q-item-main
                        >
                        <q-input
                          style="width: 220px"
                          type="number"
                          v-model="
                            formData.qrShortLead
                              .smallMerchantLessThanTwoCreditAndPrepaid
                          "
                        />
                        <div
                          v-if="
                            $v.formData.qrShortLead
                              .smallMerchantLessThanTwoCreditAndPrepaid.$error
                          "
                          class="error-tooltip"
                          :class="{
                            'error-highlight':
                              $v.formData.qrShortLead
                                .smallMerchantLessThanTwoCreditAndPrepaid.$error,
                          }"
                        >
                          <span
                            v-if="
                              !$v.formData.qrShortLead
                                .smallMerchantLessThanTwoCreditAndPrepaid.$model
                            "
                          >
                            Small merchant - MDR <2K Credit Card is required.
                          </span>
                        </div>
                      </q-item>
                      <q-item class="q-pa-sm q-body-1">
                        <q-item-main
                          >Small merchant - MDR >2K Credit Card</q-item-main
                        >
                        <q-input
                          style="width: 220px"
                          type="number"
                          v-model="
                            formData.qrShortLead
                              .smallMerchantGreaterThanTwoCreditAndPrepaid
                          "
                        />
                        <div
                          v-if="
                            $v.formData.qrShortLead
                              .smallMerchantGreaterThanTwoCreditAndPrepaid.$error
                          "
                          class="error-tooltip"
                          :class="{
                            'error-highlight':
                              $v.formData.qrShortLead
                                .smallMerchantGreaterThanTwoCreditAndPrepaid.$error,
                          }"
                        >
                          <span
                            v-if="
                              !$v.formData.qrShortLead
                                .smallMerchantGreaterThanTwoCreditAndPrepaid.$model
                            "
                          >
                            Small merchant - MDR >2K Credit Card is required.
                          </span>
                        </div>
                      </q-item>
                    </div>
                    <div v-else>
                      <q-item class="q-pa-sm q-body-1">
                        <q-item-main
                          >Large merchant - MDR <2K Debit Card</q-item-main
                        >
                        <q-input
                          style="width: 220px"
                          type="number"
                          v-model="
                            formData.qrShortLead.largeMerchantLessThanTwoDebit
                          "
                        />
                        <div
                          v-if="
                            $v.formData.qrShortLead.largeMerchantLessThanTwoDebit.$error
                          "
                          class="error-tooltip"
                          :class="{
                            'error-highlight':
                              $v.formData.qrShortLead.largeMerchantLessThanTwoDebit
                                .$error,
                          }"
                        >
                          <span
                            v-if="
                              !$v.formData.qrShortLead.largeMerchantLessThanTwoDebit
                                .$model
                            "
                          >
                            Large merchant - MDR <2K Debit Card is required.
                          </span>
                        </div>
                      </q-item>
                      <q-item class="q-pa-sm q-body-1">
                        <q-item-main
                          >Large merchant - MDR >2K Debit Card</q-item-main
                        >
                        <q-input
                          style="width: 220px"
                          type="number"
                          v-model="
                            formData.qrShortLead
                              .largeMerchantGreaterThanTwoDebit
                          "
                        />
                        <div
                          v-if="
                            $v.formData.qrShortLead.largeMerchantGreaterThanTwoDebit
                              .$error
                          "
                          class="error-tooltip"
                          :class="{
                            'error-highlight':
                              $v.formData.qrShortLead.largeMerchantGreaterThanTwoDebit
                                .$error,
                          }"
                        >
                          <span
                            v-if="
                              !$v.formData.qrShortLead.largeMerchantGreaterThanTwoDebit
                                .$model
                            "
                          >
                            Large merchant - MDR >2K Debit Card is required.
                          </span>
                        </div>
                      </q-item>
                      <q-item class="q-pa-sm q-body-1">
                        <q-item-main
                          >Large merchant - MDR <2K Credit Card</q-item-main
                        >
                        <q-input
                          style="width: 220px"
                          type="number"
                          v-model="
                            formData.qrShortLead
                              .largeMerchantLessThanTwoCreditandPrepaid
                          "
                        />
                        <div
                          v-if="
                            $v.formData.qrShortLead
                              .largeMerchantLessThanTwoCreditandPrepaid.$error
                          "
                          class="error-tooltip"
                          :class="{
                            'error-highlight':
                              $v.formData.qrShortLead
                                .largeMerchantLessThanTwoCreditandPrepaid.$error,
                          }"
                        >
                          <span
                            v-if="
                              !$v.formData.qrShortLead
                                .largeMerchantLessThanTwoCreditandPrepaid.$model
                            "
                          >
                            Large merchant - MDR <2K Credit Card is required.
                          </span>
                        </div>
                      </q-item>
                      <q-item class="q-pa-sm q-body-1">
                        <q-item-main
                          >Large merchant - MDR >2K Credit Card</q-item-main
                        >
                        <q-input
                          style="width: 220px"
                          type="number"
                          v-model="
                            formData.qrShortLead
                              .largeMerchantGreaterThanTwoCreditandPrepaid
                          "
                        />
                        <div
                          v-if="
                            $v.formData.qrShortLead
                              .largeMerchantGreaterThanTwoCreditandPrepaid.$error
                          "
                          class="error-tooltip"
                          :class="{
                            'error-highlight':
                              $v.formData.qrShortLead
                                .largeMerchantGreaterThanTwoCreditandPrepaid.$error,
                          }"
                        >
                          <span
                            v-if="
                              !$v.formData.qrShortLead
                                .largeMerchantGreaterThanTwoCreditandPrepaid.$model
                            "
                          >
                            Large merchant - MDR >2K Credit Card is required.
                          </span>
                        </div>
                      </q-item>
                    </div>
                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main>Fixed</q-item-main>
                      <q-input
                        style="width: 220px"
                        type="number"
                        v-model="formData.qrShortLead.mdrFixed"
                        float-label="Fixed"
                        placeholder="Fixed"
                      />
                      <div
                        v-if="$v.formData.qrShortLead.mdrFixed.$error"
                        class="error-tooltip"
                        :class="{
                          'error-highlight': $v.formData.qrShortLead.mdrFixed.$error,
                        }"
                      >
                        <span v-if="!$v.formData.qrShortLead.mdrFixed.$model">
                          Fixed is required.
                        </span>
                      </div>
                    </q-item>
                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main>Max MDR per transaction</q-item-main>
                      <q-input
                        type="number"
                        style="width: 220px"
                        v-model="formData.qrShortLead.maxMdrPerTransaction"
                        float-label="Max MDR per transaction"
                        placeholder="Max MDR per transaction"
                      />
                      <div
                        v-if="$v.formData.qrShortLead.maxMdrPerTransaction.$error"
                        class="error-tooltip"
                        :class="{
                          'error-highlight':
                            $v.formData.qrShortLead.maxMdrPerTransaction.$error,
                        }"
                      >
                        <span v-if="!$v.formData.qrShortLead.maxMdrPerTransaction.$model">
                          Max MDR per transaction is required.
                        </span>
                      </div>
                    </q-item>
                  </q-list>
                </q-card-main>
              </q-card>
            </div>
          </div>
        </div>

        <div class="col-12 col-lg-8">
          <div class="row">
            <div class="col-12">
              <q-card class="q-ma-xs border-1 q-custom-class" flat>
                <q-card-title class="q-pa-sm bottom-border title-bg">
                  <div class="row items-center">
                    <div class="col q-body-1 text-weight-medium">PAYMENT</div>
                  </div>
                </q-card-title>
                <q-card-main class="q-pa-sm">
                  <q-list separator no-border class="no-padding q-body-1">
                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main>Cheque Number</q-item-main>
                      <q-input
                        style="width: 220px"
                        type="text"
                        v-model="formData.qrShortLead.chequeNumber"
                        float-label="Cheque Number"
                        placeholder="Cheque Number"
                        @keydown="nameKeydown($event)"
                      />
                      <div v-if="chequeNumberError" class="error-tooltip">
                        Cheque Number is required when NEFT ID is not provided.
                      </div>
                      <div v-if="chequeNumberandneft" class="error-tooltip">
                        Enter any one Cheque Number or NEFT ID.
                      </div>
                    </q-item>

                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main>NEFT ID</q-item-main>
                      <q-input
                        style="width: 220px"
                        type="text"
                        v-model="formData.qrShortLead.neftId"
                        float-label="NEFT ID"
                        placeholder="NEFT ID"
                        @keydown="nameKeydown($event)"
                      />
                      <div v-if="neftIdError" class="error-tooltip">
                        NEFT ID is required when Cheque Number is not provided.
                      </div>
                      <div v-if="chequeNumberandneft" class="error-tooltip">
                        Enter any one Cheque Number or NEFT ID.
                      </div>
                    </q-item>
                  </q-list>
                </q-card-main>
              </q-card>
            </div>
          </div>

          <div class="row">
            <div class="col-12">
              <q-card class="q-ma-xs border-1 q-custom-class" flat>
                <q-card-title class="q-pa-sm bottom-border title-bg">
                  <div class="row items-center">
                    <div class="col q-body-1 text-weight-medium">
                      ACCOUNT INFORMATION
                    </div>
                  </div>
                </q-card-title>
                <q-card-main class="q-pa-sm">
                  <q-list separator no-border class="no-padding q-body-1">
                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main style="display: flex; align-items: center;">
                        <span
                          style="flex: 1;"
                          :class="{
                            'error-highlight':
                              $v.formData.qrShortLead.accountNumber.$error
                          }"
                        >
                          Account Number
                        </span>
                       
                        <q-input
                          @blur="$v.formData.qrShortLead.accountNumber.$touch"
                          :error="$v.formData.qrShortLead.accountNumber.$error"
                          style="width: 220px"
                          float-label="Account Number"
                          placeholder="Account Number"
                          v-model="formData.qrShortLead.accountNumber"
                          @keydown="nameKeydownacc($event)"
                        />
                        <div
                          v-if="$v.formData.qrShortLead.accountNumber.$error"
                          class="error-tooltip"
                          :class="{
                            'error-highlight':
                              $v.formData.qrShortLead.accountNumber.$error,
                          }"
                        >
                          <span v-if="!$v.formData.qrShortLead.accountNumber.$model">
                            Account Number is required.
                          </span>
                          <span
                            v-if="
                              $v.formData.qrShortLead.accountNumber.$model &&
                              ($v.formData.qrShortLead.accountNumber.$model < 8 ||
                                $v.formData.qrShortLead.accountNumber.$model > 19)
                            "
                          >
                            Account Number must be between 8 and 19.
                          </span>
                        </div>
                      </q-item-main>
                    </q-item>
                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main style="display: flex; align-items: center;">
                        <span
                          style="flex: 1;"
                          :class="{
                            'error-highlight':
                              $v.formData.qrShortLead.ifscCode.$error
                          }"
                        >
                          IFSC
                        </span>
                        <q-input
                          @blur="$v.formData.qrShortLead.ifscCode.$touch"
                          :error="$v.formData.qrShortLead.ifscCode.$error"
                          style="width: 220px"
                          type="text"
                          float-label="IFSC Code"
                          placeholder="IFSC Code"
                          v-model="formData.qrShortLead.ifscCode"
                          @keydown="nameKeydown($event)"
                        />
                        <div
                          v-if="$v.formData.qrShortLead.ifscCode.$error"
                          class="error-tooltip"
                          :class="{
                            'error-highlight': $v.formData.qrShortLead.ifscCode.$error,
                          }"
                        >
                          <span v-if="!$v.formData.qrShortLead.ifscCode.$model">
                            IFSC is required.
                          </span>
                          <span
                            v-if="
                              $v.formData.qrShortLead.ifscCode.$model &&
                              $v.formData.qrShortLead.ifscCode.$model.length !== 11
                            "
                          >
                            IFSC must be exactly 11 digits.
                          </span>
                        </div>
                      </q-item-main>
                    </q-item>

                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main style="display: flex; align-items: center;">
                        <span
                          style="flex: 1;"
                          :class="{
                            'error-highlight':
                              $v.formData.qrShortLead.bankName.$error
                          }"
                        >
                          Bank Name
                        </span>
                        <q-input
                          @blur="$v.formData.qrShortLead.bankName.$touch"
                          :error="$v.formData.qrShortLead.bankName.$error"
                          style="width: 220px"
                          type="text"
                          float-label="Bank Name"
                          placeholder="Bank Name"
                          v-model="formData.qrShortLead.bankName"
                        />
                        <div
                          v-if="$v.formData.qrShortLead.bankName.$error"
                          class="error-tooltip"
                          :class="{
                            'error-highlight': $v.formData.qrShortLead.bankName.$error,
                          }"
                        >
                          <span v-if="!$v.formData.qrShortLead.bankName.$model">
                            Bank Name is required.
                          </span>
                          <span
                            v-if="
                              $v.formData.qrShortLead.bankName.$model &&
                              ($v.formData.qrShortLead.bankName.$model < 0 ||
                                $v.formData.qrShortLead.bankName.$model > 100)
                            "
                          >
                            Bank Name must be between 0 and 100.
                          </span>
                        </div>
                      </q-item-main>
                    </q-item>
                    <!-- <q-item class="q-pa-sm q-body-1">
                      <q-item-main style="display: flex; align-items: center;">
                        <span style="flex: 1;"
                          :class="{'error-highlight': $v.formData.qrShortLead.branchCode.$error}">
                          Branch Code
                        </span>
                      <q-input
                        disable
                        @blur="$v.formData.qrShortLead.branchCode.$touch"
                        :error="$v.formData.qrShortLead.branchCode.$error"
                        style="width: 220px"
                        type="text"
                        v-model="formData.qrShortLead.branchCode"
                      />
                    </q-item-main>
                    </q-item>
                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main style="display: flex; align-items: center;">
                        <span style="flex: 1;"
                          :class="{'error-highlight': $v.formData.qrShortLead.branchZone.$error}">
                          Branch Zone
                        </span>
                      <q-input
                        disable
                        @blur="$v.formData.qrShortLead.branchZone.$touch"
                        :error="$v.formData.qrShortLead.branchZone.$error"
                        style="width: 220px"
                        type="text"
                        v-model="formData.qrShortLead.branchZone"
                      />
                    </q-item-main>
                    </q-item> -->
                  </q-list>
                </q-card-main>
              </q-card>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <q-card class="q-ma-xs border-1 q-custom-class" flat>
                <q-card-title class="q-pa-sm bottom-border title-bg">
                  <div class="row items-center">
                    <div class="col q-body-1 text-weight-medium">
                      REMARKS
                    </div>
                  </div>
                </q-card-title>
                <q-card-main class="q-pa-sm">
                  <q-list separator no-border class="no-padding q-body-1">
                    <q-item class="q-pa-sm q-body-1">
                      <q-item-main style="display: flex; align-items: center;">
                        <span
                          style="flex: 1;"
                          :class="{
                            'error-highlight':
                              $v.formData.qrShortLead.satToMarsRemarks.$error
                          }"
                        >
                          Remarks
                        </span>
                        <q-input
                          @blur="onBlur"
                          :error="
                            $v.formData.qrShortLead.satToMarsRemarks.$error
                          "
                          style="width: 220px"
                          type="text"
                          float-label="Remarks"
                          placeholder="Remarks"
                          v-model="formData.qrShortLead.satToMarsRemarks"
                        />
                        <div
                          v-if="$v.formData.qrShortLead.satToMarsRemarks.$error"
                          class="error-tooltip"
                          :class="{
                            'error-highlight':
                              $v.formData.qrShortLead.satToMarsRemarks.$error,
                          }"
                        >
                          <span v-if="!$v.formData.qrShortLead.satToMarsRemarks.$model">
                            Remarks is required.
                          </span>
                        </div>
                      </q-item-main>
                    </q-item>
                    <!-- <q-item class="q-pa-sm q-body-1">
                      <q-item-main style="display: flex; align-items: center;">
                        <span style="flex: 1;"
                        :class="{'error-highlight': $v.formData.qrShortLead.satToMarsRemarks.$error}">
                        SAT to SO
                        </span>
                      <q-input
                        @blur="$v.formData.qrShortLead.satToMarsRemarks.$touch"
                        :error="$v.formData.qrShortLead.satToMarsRemarks.$error"
                        style="width: 220px"
                        type="text"
                        float-label="Remarks"
                        placeholder="Remarks"
                        v-model="formData.qrShortLead.satToMarsRemarks"
                      />
                    </q-item-main>
                    </q-item> -->
                  </q-list>
                </q-card-main>
              </q-card>
            </div>
          </div>
        </div>

        <div class="col-12">
          <q-card class="q-ma-xs border-1" flat>
            <q-card-title class="q-pa-sm title-bg bottom-border">
              <span class="q-body-1 text-weight-medium">DOCUMENTS </span>
              <span class="q-body-1 text-weight-medium"
                >(Merchant Type:
                {{
                  formData.qrShortLead.qrMerchantType.merchantTypeName
                }})</span
              >
            </q-card-title>
            <q-card-main class="no-padding">
              <q-list no-border class="no-padding">
                <viewQrLeadDocument
                  v-if="formData.qrShortLead.qrLeadStatus == 4 || 9"
                  :propLeadDocumentInformation.sync="
                    formData.qrShortLead.qrLeadDocuments
                  "
                  :propGetShortInfo="getAllStaticQrShortLeadDatas"
                  @emitTriggerComponentHotLoad="loadUpdate"
                />
              </q-list>
             
            </q-card-main>
          </q-card>
        </div>
        <div v-if="formData.qrShortLead.qrLeadCategory">
          <q-alert
            color="purple-9"
            icon="notifications_active"
            enter="bounceInLeft"
            leave="bounceOutRight"
            appear
            v-model="visible"
            dismissible
          >
            No Documents For Existing Merchant
          </q-alert>
        </div>
        <div class="alignbtn">
          <q-stepper-navigation>
            <q-btn
              icon="arrow_back"
              color="dark"
              class="q-ma-xs"
              @click="$router.go(-1)"
              label="Back"
            />
            <q-btn
              icon="clear"
              class="q-ma-xs"
              color="negative"
              label="REJECT"
              @click="fnToggleQrRejectLeadComp()"
            />
            <q-btn
              :disable="formData.qrShortLead.qrLeadStatus == 9"
              color="blue"
              class="q-ma-xs"
              icon="inbox"
              label="Refer Back"
              @click="referBackAndEnableProceed"
            />
            <q-btn
              color="amber-10"
              class="q-ma-xs"
              icon="inbox"
              label="Save Partial"
              @click="savePartialAndEnableProceed"
            />
            <q-btn
              v-if="
                formData.qrShortLead.documentUploadedType == 2 &&
                formData.qrShortLead.qrLeadCategory != true
              "
              :disable="this.flag || !partialSaved"
              icon="send"
              class="q-ma-xs"
              color="green"
              label="Proceed To mars"
              @click="documentValidation()"
            />
            <q-btn
              v-else-if="formData.qrShortLead.qrLeadCategory"
              :disable="this.flag || !partialSaved"
              icon="send"
              class="q-ma-xs"
              color="green"
              label="Proceed To mars"
              @click="proceedToMars()"
            />
            <q-btn
              v-else
              :disable="!partialSaved"
              icon="send"
              class="q-ma-xs"
              color="green"
              label="Proceed To mars"
              @click="documentValidation()"
            />
          </q-stepper-navigation>
        </div>
        <showFinalRejectQrLeadRemarksComponent
          v-if="toggleLeadRejectModal"
          :propToggleLeadModal="toggleLeadRejectModal"
          :propLeadDetails="getAllStaticQrShortLeadDatas"
          @toggleLeadModal="fnToggleQrRejectLeadComp"
        />
        <ReferBackRemarks
          v-if="propShowUpdateOpenedExternal"
          :propShowUpdateOpenedExternal="propShowUpdateOpenedExternal"
          :propRowDetails="propRowDetails"
          @emitfnshowUpdateOpenedExternal="fnReassignData"
        ></ReferBackRemarks>
      </div>
    </div>
  </q-page>
</template>
<script>
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
  between
} from "vuelidate/lib/validators";
import { LocalStorage } from "quasar";
import Vuelidate from "vuelidate";
import { date } from "quasar";
import { ref } from "vue";
// import { QDate } from 'quasar'

import { mapGetters, mapActions } from "vuex";
import viewQrLeadDocument from "../../components/sat/viewQrLeadDocument.vue";
import showFinalRejectQrLeadRemarksComponent from "../../components/sat/showFinalRejectQrLeadRemarksComponent.vue";
import ReferBackRemarks from "../../components/sat/ReferBackRemarks.vue";
const today = new Date();
const { startOfDate, addToDate, subtractFromDate } = date;
export default {
  name: "qrLeadVadlidate",
  components: {
    viewQrLeadDocument,
    showFinalRejectQrLeadRemarksComponent,
    ReferBackRemarks
  },
  data() {
    return {
      applicationNumber: "",
      cityOptions: [],
      stateOptions: [],
      propShowUpdateOpenedExternal: false,
      // regionOptions: [],
      formData: {
        qrShortLead: "",
        documentType: []
      },
      validPincodes: [], // To store the list of valid pincodes
      validPin: [], // To store the list of valid pincodes
      partialSaved: false,
      mccSearchSet: [],
      isactivemerchant: "Small",
      isactivemerchant1: "Large",
      // isownHouse: "Yes",
      // isownHouse1: "No",
      leadSourceOptions: [],
      propLeadDeatils: [],
      count: 0,
      terminalCodeValue: "",
      terminalModelSet: [],
      flag: false,
      MarsData: [],
      tomorrow: addToDate(today, { days: 0 }),
      alternativeError: false,
      gstNumberError: false,
      PassportExpiryError: false,
      emailError: false,
      // gstNumberValidationError: false,
      rentalModeOptions: [
        {
          label: "Standing instructions",
          value: "S"
        },
        {
          label: "Normal",
          value: "N"
        },
        {
          label: "Nabad",
          value: "B"
        },
        {
          label: "Invoice for EPRS",
          value: "I"
        },
        {
          label: "Equitas Rental",
          value: "E"
        },
        {
          label: "Big merchant",
          value: "M"
        },
        {
          label: "Invoice to Trade",
          value: "IT"
        },
        {
          label: "Rental Fee Waiver",
          value: "RW"
        },
        {
          label: "Advance Rental",
          value: "AR"
        },
        {
          label: "Settlement",
          value: "SE"
        },
        {
          label: "Exibition",
          value: "EX"
        },
        {
          label: "Clix",
          value: "CX"
        },
        {
          label: "Subvention",
          value: "SB"
        },
        {
          label: "EMI Rental",
          value: "EM"
        },
        {
          label: "BPCL",
          value: "BP"
        },
        {
          label: "Demo Device",
          value: "DD"
        },
        {
          label: "Invoice to Bank",
          value: "IB"
        },
        {
          label: "Finetree Finance LTD",
          value: "FF"
        },
        {
          label: "Deactivated",
          value: "DT"
        },
        {
          label: "APAC FINANCIAL SERVICES PVT LTD",
          value: "AP"
        },
        {
          label: "NEO GROWTH",
          value: "NG"
        },
        {
          label: "Capital Float",
          value: "CF"
        },
        {
          label: "KBL Rent Settlement",
          value: "KS"
        },
        {
          label: "KBL Rent Invoice to Bank",
          value: "KI"
        }
      ],
      rentalTypeOptions: [
        {
          label: "Advanced",
          value: "A"
        },
        {
          label: "Regular",
          value: "R"
        },
        // {
        //   label: "EMI",
        //   value: "E"
        // }
      ],
      iciciMarsRequest: {
        merchant: {
          device: "",
          salesInformation: {
            institutionCode: 101,
            applicationType: "D",
            applicationNumber: "",
            applicationDate: "",
            aggreementDate: "",
            merchantType: "P",
            categoryType: "O",
            region: "",
            salesPersonName: "",
            leadFrom: "",
            sharingModelCode: "N",
            sharingPartnerCode: "",
            dailyFixedAmount: "",
            loanDisbursementPercentage: "",
            loanDisbursementAmount: "",
            loanDisbursementDate: "04/03/2023",
            tenureMonth: "",
            tenureDay: "",
            tenureStartDate: "04/03/2023",
            rentPercentage: 2,
            rentFixed: ""
          },
          additionalInfo: {
            installationBranchCode: null,
            iaLocation: null,
            iaDistrict: null,
            branchZone: null,
            raDistrict: null,
            od1District: null,
            od2District: null,
            lorState: null,
            iaSalutation: null,
            iaGender: null,
            od1Salutation: null,
            od1Gender: null,
            od2Salutation: null,
            od2Gender: null,
            state: "",
            city: "",
            fillingType: "",
            category: null,
            subCategory: null,
            ownerDOB: null,
            pin: "",
            states: null,
            fillingTypes: null
          },
          companyInformation: {
            legalName: "",
            dbaName: "",
            smsFlag: "N",
            registeredAddress: "",
            registeredPin: "",
            registeredCityRefCode: "",
            registeredStateRefCode: "",
            constitution: "",
            constitutionName: "",
            constitutionDescription: "",
            establishYear: "",
            pan: "",
            registerNumber: "test",
            tin: "",
            tan: "",
            businessNature: "",
            businessType: "R",
            mcc: "",
            residentialAddress: "",
            residentialPin: "",
            statezone: "90",
            cityzone: "",
            residentialCityRefCode: "",
            residentialStateRefCode: "",
            contactName: "",
            contactMobile: "",
            contactAlternateMobile: "",
            contactPhone: "",
            contactEmail: "",
            statementType: "E",
            statementFrequency: "M",
            statementEmail: "",
            registeredCityName: "",
            registeredStateName: "",
            mccname: "",
            residentCityName: "",
            residentStateName: ""
          },
          businessInformation: {
            weekdayStartHour: "",
            weekdayEndHour: "",
            weekendStartHour: "",
            weekendEndHour: "",
            lastTurnoverYear: "2022",
            maximumMonthlyUsage: "",
            merchantTypeCode: "S",
            lastTurnoverAmount: "100",
            expectedCardBusiness: 12,
            averageBillAmount: "",
            gstId: null,
            currentPosName: "",
            debitCardMdr: "",
            creditCardMdr: "",
            memberSince: "04/03/2023",
            businessIncome: "100"
          },
          partnerInformation: [
            {
              name: "",
              address: "",
              pan: "",
              pin: "",
              cityRefCode: "",
              cityRefLabel: "",
              stateRefCode: "",
              stateRefLabel: "",
              contactMobile: "",
              contactEmail: "",
              dob: ""
            }
          ],
          customIncentiveRates: [
            {
              minValue: 200,
              maxValue: 999,
              mechantFixed: 0.5,
              merchantPercent: 0,
              sharingFixed: 0,
              sharingPercent: 0
            },
            {
              minValue: 1000,
              maxValue: 1999,
              mechantFixed: 2,
              merchantPercent: 0,
              sharingFixed: 1,
              sharingPercent: 0
            },
            {
              minValue: 2000,
              maxValue: 2999,
              mechantFixed: 5,
              merchantPercent: 0,
              sharingFixed: 1,
              sharingPercent: 0
            },
            {
              minValue: 3000,
              maxValue: 3499,
              mechantFixed: 9.5,
              merchantPercent: 0,
              sharingFixed: 1,
              sharingPercent: 0
            },
            {
              minValue: 3500,
              maxValue: 10000,
              mechantFixed: 5,
              merchantPercent: 0,
              sharingFixed: 2,
              sharingPercent: 0
            }
          ],
          paymentDetails: {
            deviceOwnedBy: "S",
            installationFee: 0,
            terminalModeCode: "",
            terminalType: "POS",
            cardAcceptance: "1",
            numberOfTerminals: 1,
            emiStartDate: null,
            omcEnabled: false,
            intlCardAcceptance: "N",
            creditCardBlock: "N",
            tipPercentage: "20",
            rentalPlanCode: "",
            recurringFees: "",
            serviceProvider: "1",
            networkPreferred: "1",
            rentalMode: "",
            rentalType: "",
            advanceRentCollected: 0,
            advanceRentMode: "NEFT",
            noOfMonthRentPaidInAdvance: "0",
            gracePeriod: 0,
            totalEmiAmount: "",
            emiTenure: "",
            otherCharges: "",
            totalAmountPaid: "",
            cashAtPosEnabled: "N",
            vpa: []
          },
          bankInformation: {
            bankDetails: {
              ifsc: "",
              micr: "250240302",
              bankName: "",
              branchName: "",
              branchCode: "",
              branchZone: "",
              bankCityRefCode: "",
              bankStateRefCode: "",
              paymentMode: "D",
              accountType: "C",
              accountdetails: "90",
              accountNumber: "",
              bankStatementAttached: "Y",
              cancelChequeAttached: "Y",
              feeType: "N",
              settlementOrNeftFee: "0",
              bankCityName: "",
              bankStateName: ""
            },
            collectionDetails: {
              collectedDate: null,
              swipeAmount: "",
              swipeTerminal: "",
              chequeAmount: "",
              chequeDate: null,
              chequeDepositedDate: null,
              chequeNumber: "",
              neftId: "",
              upiLink: "",
              acquirerBank: ""
            }
          },
          kyc: {
            documents: []
          },
          remarks: "",
          mdrPlan: {
            code: 9,
            upiUpto2000: {
              percentage: 0,
              fixed: 0,
              minimum: 0
            },
            upiAbove2000: {
              percentage: 0,
              fixed: 0,
              minimum: 0
            },
            upiCreditUpto2000: {
              percentage: 0,
              fixed: 0,
              minimum: 0,
              minimumTxnValue: 0.0
            },
            upiCreditAbove2000: {
              percentage: 0,
              fixed: 0,
              minimum: 0,
              minimumTxnValue: 0.0
            },
            domesticDebitUpTo2000: {
              fixed: 0,
              percentage: 0.0,
              minimum: 0
            },
            incentive: {
              percentage: null,
              minimum: null,
              minimumTxnValue: null
            },
            domesticDebitAbove2000: {
              fixed: 0,
              percentage: 0.0,
              minimum: 0
            },
            standardOrClassic: {
              fixed: 0,
              percentage: 0,
              minimum: 0
            },
            premiumOrPlatinum: {
              fixed: 0,
              percentage: 0,
              minimum: 0
            },
            superPremiumOrSignature: {
              fixed: 0,
              percentage: 0,
              minimum: 0
            },
            commercialOrCorporate: {
              fixed: 0,
              percentage: 0,
              minimum: 0
            },
            internationalDebitCard: {
              fixed: 0,
              percentage: 0,
              minimum: 0
            },
            internationalCreditCard: {
              fixed: 0,
              percentage: 0,
              minimum: 0
            },
            onus: {
              fixed: 0,
              percentage: 0,
              minimum: 0
            },
            mVisa: {
              fixed: 0,
              percentage: 0,
              minimum: 0
            },
            masterPass: {
              fixed: 0,
              percentage: 0,
              minimum: 0
            },
            cashAtPos: {
              fixed: 0,
              percentage: 0,
              minimum: 0
            },
            convenientFee: {
              fixed: 0,
              percentage: 0,
              minimum: 0
            },
            diners: {
              fixed: 0,
              percentage: 0,
              minimum: 0
            }
          },
          revParameters: {
            cashAtPosEnabled: "N",
            tipEnabled: "N",
            saleFlag: "1",
            notificationRecipient: null,
            preAuth: "N",
            settlementType: "A",
            txnEmiAllowed: "0",
            sodexoEnabled: "0",
            amexEnabled: "0",
            bqrEnabled: "0",
            upichargeslipEnabled: "0",
            linkpaymentFlag: "0",
            matmAllowed: "N",
            upiFlag: "1",
            isMTIDEnabled: "0",
            combinedSettlementFlag: 0,
            ONBOARDING_REQD: 0,
            scheme: "UPI",
            baseInstitution: 110,
            bTID: "",
            baseMid: ""
          }
        }
      },
      ownHouseOptions: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
      toggleData: false,
      toggleLeadRejectModal: false,
      qrshortLeadInformation: "",
      Data: "",

      dropDown: {
        deviceOptions: [],
        merchantDistrict: [],
        merchantState: [],
        leadSourceOptions: [],
        merchantCategory: [],
        merchantSubDistrict: [],
        merchantTownOrVillageDetails: [],
        merchantTierDetails: [],
        merchantNameType: [],
        rentalplan: [],
        salesPersonOptions: []
      }
    };
  },
  validations: {
    iciciMarsRequest: {
      merchant: {
        // salesInformation:{
        //   salesPersonCode:
        //   {
        //         required
        //     },
        // },
        // paymentDetails: {
        //   rentalPlanCode: {
        //     required
        //   },
        // },
        // remarks: {
        //     required
        //   },
      }
    },
    formData: {
      qrShortLead: {
        merchantIndustry: {
          industryName: {
            required
          }
        },
        contactName: {
          required,
        },
        city: {
          required
        },
        state: {
          required
        },
        personalInfoCity: {
          required
        },
        personalInfoState: {
          required
        },
        salesPersonName: {
          required
        },
        contactEmail: {
          required,
          email,
        },
        marketingName: {
          required,
        },
        // regionCode: {
        //     required
        // },
        marsRentalPlanName: {
          required
        },
        rentalMode: {
          required
        },
        rentalType: {
          required
        },
        legalName: {
          maxLength: maxLength(60),
          required
        },
        contactAddress: {
          maxLength: maxLength(120),
          required
        },
        personalAddress: {
          maxLength: maxLength(180),
          required
        },
        personalInfoPincode: {
          minLength: minLength(6),
          maxLength: maxLength(6),
          required
        },
        pincode: {
          minLength: minLength(6),
          maxLength: maxLength(6),
          required
        },
        personalInfoMobile: {
          minLength: minLength(10),
          maxLength: maxLength(10),
          required
        },
        natureOfBusiness: {
          required,
        },
        personalInfoEmail: {
          email,
          required
        },
        dateOfBirth: {
          required
        },
        gstNumber: {
          maxLength: function(value) {
            if (value) {
              return value.length === 15;
            }
            return true;
          }
        },
        panNumber: {
          minLength: minLength(10),
          maxLength: maxLength(10),
          required
        },
        contactNumber: {
          minLength: minLength(10),
          maxLength: maxLength(10),
          required
        },
        accountNumber: {
          minLength: minLength(8),
          maxLength: maxLength(19),
          required
        },
        ifscCode: {
          minLength: minLength(11),
          maxLength: maxLength(11),
          required
        },
        bankName: {
          maxLength: maxLength(100),
          required
        },
        hoursWeekdayStart: {
          required,
        },
        hoursWeekdayEnd: {
          required,
        },
        hoursWeekendStart: {
          required,
        },
        hoursWeekendEnd: {
          required,
        },
        averageBillAmount: {
          required,
        },
        maximumUsageDaily: {
          required,
        },
        maximumUsageWeekly: {
          required,
        },
        maximumUsageMonthly: {
          required,
        },
        setupFees: {
          required,
        },
        recurringFees: {
          required,
        },
        smallMerchantLessThanTwoDebit: {
          required,
        },
        smallMerchantGreaterThanTwoDebit: {
          required,
        },
        smallMerchantLessThanTwoCreditAndPrepaid: {
          required,
        },
        smallMerchantGreaterThanTwoCreditAndPrepaid: {
          required,
        },
        largeMerchantLessThanTwoDebit: {
          required,
        },
        largeMerchantGreaterThanTwoDebit: {
          required,
        },
        largeMerchantLessThanTwoCreditandPrepaid: {
          required,
        },
        largeMerchantGreaterThanTwoCreditandPrepaid: {
          required,
        },
        mdrFixed: {
          required,
        },
        maxMdrPerTransaction: {
          required,
        },
        satToMarsRemarks: {
          required
        },
        ownerAge: {
          required,
          between: between(1, 150),
        },
        // branchCode: {
        //   maxLength: maxLength(8),
        //   required
        // },
        // branchZone: {
        //   maxLength: maxLength(30),
        //   required
        // },
      },
    },
  },
  created() {
    // this.ajaxQrLoadShortLeadInfo();
    this.ajaxQrLoadShortLeadInfoInitialLoad();
    // this.appLoadData();
    this.ajaxLoadDataForDeviceTypeTable();
  },

  computed: {
    ...mapGetters("GlobalVariables", ["GLOBAL_FILE_FETCH_URL"]),
    ...mapGetters("iciciStaticQr", [
      "getAllStaticQrShortLeadDatas",
      "getStaicQrExistingMerchantMarsId"
    ]),
    ...mapGetters("SA_Devices", ["getAllDevicesInfo"]),
    ...mapGetters("appDevice", ["getAllAppDevicesInfo"]),
    ...mapGetters("merchantCategory", ["getActiveMerchantCategory"]),
    ...mapGetters("appMerchantType", [
      "getappMerchantDocumentType",
      "getsorentalplan"
    ]),
    ...mapGetters("mars_city", ["cityFromMars"]),
    ...mapGetters("appLeadSource", ["getAllAppLeadSource"]),
    ...mapGetters("mars_state", ["stateFromMars"]),
    ...mapGetters("SuperAdminUsers", ["getAllStatesData"]),
    ...mapGetters("mars_deviceModel", ["deviceModelFromMars"]),
    ...mapGetters("mars_salesPerson", ["qrsalesPersonFromMars"]),
    // ...mapGetters("mars_regions", ["regionsFromMars"]),
    ...mapGetters("mars_mcc", ["mccFromMarsQr"]),
    ...mapGetters("merchantTierMapping", [
      "getMerchantTierMappingStateDetails",
      "getMerchantTierMappingVillageTierDetails",
      "getMerchantTierMappingDistrictDetails",
      "getMerchantTierMappingTownOrVillageDetails",
      "getMerchantTierMappingSubDistrictDetails",
      "getMerchantTierMappingVillageBasedTierAndLocationDetails"
    ]),
    businessNature() {
      return this.formData.qrShortLead.natureOfBusiness.trim()
        ? this.formData.qrShortLead.natureOfBusiness
        : "NA";
    },
    chequeNumberError() {
      return (
        this.formData.qrShortLead.chequeNumber === "" &&
        this.formData.qrShortLead.neftId === ""
      );
    },
    neftIdError() {
      return (
        this.formData.qrShortLead.neftId === "" &&
        this.formData.qrShortLead.chequeNumber === ""
      );
    },
    chequeNumberandneft() {
      return (
        this.formData.qrShortLead.neftId !== "" &&
        this.formData.qrShortLead.chequeNumber !== ""
      );
    },
    alternativeError() {
      if (
        this.getAllStaticQrShortLeadDatas.alternateContactNumber == "" ||
        this.getAllStaticQrShortLeadDatas.alternateContactNumber == null
      ) {
        return false;
      } else {
        return true;
      }
    },
    alternativeValidatonError() {
      if (
        this.getAllStaticQrShortLeadDatas.alternateContactNumber == "" ||
        this.getAllStaticQrShortLeadDatas.alternateContactNumber == null
      ) {
        return false;
      } else {
        if (
          this.formData.qrShortLead.alternateContactNumber.toString().length !==
          10
        ) {
          return true;
        } else {
          this.alternativeError = false;
          return false;
        }
      }
    },
    // gstNumberError() {
    //   return this.formData.qrShortLead.gstNumber !== "";
    // },
    gstNumberError() {
      if (
        this.getAllStaticQrShortLeadDatas.gstNumber == "" ||
        this.getAllStaticQrShortLeadDatas.gstNumber == null
      ) {
        return false;
      } else {
        return true;
      }
    },
    gstNumberValidationError() {
      if (
        this.getAllStaticQrShortLeadDatas.gstNumber == "" ||
        this.getAllStaticQrShortLeadDatas.gstNumber == null
      ) {
        return false;
      } else {
        if (this.formData.qrShortLead.gstNumber.length !== 15) {
          return true;
        } else {
          this.gstNumberError = false;
          return false;
        }
      }
    },
    // PassportExpiryError() {
    //   if (
    //     this.getAllStaticQrShortLeadDatas.passportExpiryDate == "" ||
    //     this.getAllStaticQrShortLeadDatas.passportExpiryDate == null
    //   ) {
    //     return false;
    //   } else {
    //     return true;
    //   }
    // },
    isEstablishmentYearValid() {
      const regex = /^\d{2}\/\d{2}\/\d{4}$/;
      return regex.test(this.formData.qrShortLead.establishmentYear);
    },
    isdobformatValid() {
      const regex = /^\d{2}\/\d{2}\/\d{4}$/;
      return regex.test(this.formData.qrShortLead.dateOfBirth);
    },
    ispassportValid() {
      const regex = /^\d{2}\/\d{2}\/\d{4}$/;
      return regex.test(this.formData.qrShortLead.passportExpiryDate);
    },
    isPassportNumberValid() {
      const regex = /^[A-Z][1-9][0-9]\s?[0-9]{4}[1-9]$/;
      const passportNumber = this.formData.qrShortLead.passportNumber.toUpperCase(); // Ensure case insensitivity
      return regex.test(passportNumber);
    },
    disableProceedButton() {
      return this.successCount < 200;
    },
    isownerage() {
      return age > 0 && age < 150;
    }
  },

  watch: {
    "formData.qrShortLead.marketingName": function(newVal, oldVal) {
      // Check if the marketingName has been changed
      if (newVal !== oldVal) {
        // Disable the Proceed to Mars button
        this.partialSaved = false;
      }
    },
    "formData.qrShortLead.legalName": function(newVal, oldVal) {
      // Check if the legalName has been changed
      if (newVal !== oldVal) {
        // Disable the Proceed to Mars button
        this.partialSaved = false;
      }
    },
    "formData.qrShortLead.contactName": function(newVal, oldVal) {
      // Check if the contactName has been changed
      if (newVal !== oldVal) {
        // Disable the Proceed to Mars button
        this.partialSaved = false;
      }
    },
    "formData.qrShortLead.contactEmail": function(newVal, oldVal) {
      // Check if the contactEmail has been changed
      if (newVal !== oldVal) {
        // Disable the Proceed to Mars button
        this.partialSaved = false;
      }
    },
    "formData.qrShortLead.contactAddress": function(newVal, oldVal) {
      // Check if the contactAddress has been changed
      if (newVal !== oldVal) {
        // Disable the Proceed to Mars button
        this.partialSaved = false;
      }
    },
    "formData.qrShortLead.personalAddress": function(newVal, oldVal) {
      // Check if the personalAddress has been changed
      if (newVal !== oldVal) {
        // Disable the Proceed to Mars button
        this.partialSaved = false;
      }
    },
    "formData.qrShortLead.personalInfoCity": function(newVal, oldVal) {
      // Check if the personalInfoCity has been changed
      if (newVal !== oldVal) {
        // Disable the Proceed to Mars button
        this.partialSaved = false;
      }
    },
    "formData.qrShortLead.city": function(newVal, oldVal) {
      // Check if the city has been changed
      if (newVal !== oldVal) {
        // Disable the Proceed to Mars button
        this.partialSaved = false;
      }
    },
    "formData.qrShortLead.personalInfoState": function(newVal, oldVal) {
      // Check if the personalInfoState has been changed
      if (newVal !== oldVal) {
        // Disable the Proceed to Mars button
        this.partialSaved = false;
      }
    },
    "formData.qrShortLead.personalInfoPincode": function(newVal, oldVal) {
      // Check if the personalInfoPincode has been changed
      if (newVal !== oldVal) {
        // Disable the Proceed to Mars button
        this.partialSaved = false;
      }
    },
    "formData.qrShortLead.pincode": function(newVal, oldVal) {
      // Check if the pincode has been changed
      if (newVal !== oldVal) {
        // Disable the Proceed to Mars button
        this.partialSaved = false;
      }
    },
    "formData.qrShortLead.personalInfoMobile": function(newVal, oldVal) {
      // Check if the personalInfoMobile has been changed
      if (newVal !== oldVal) {
        // Disable the Proceed to Mars button
        this.partialSaved = false;
      }
    },
    "formData.qrShortLead.personalInfoEmail": function(newVal, oldVal) {
      // Check if the personalInfoEmail has been changed
      if (newVal !== oldVal) {
        // Disable the Proceed to Mars button
        this.partialSaved = false;
      }
    },
    "formData.qrShortLead.panNumber": function(newVal, oldVal) {
      // Check if the panNumber has been changed
      if (newVal !== oldVal) {
        // Disable the Proceed to Mars button
        this.partialSaved = false;
      }
    },
    "formData.qrShortLead.dateOfBirth": function(newVal, oldVal) {
      // Check if the dateOfBirth has been changed
      if (newVal !== oldVal) {
        // Disable the Proceed to Mars button
        this.partialSaved = false;
      }
    },
    "formData.qrShortLead.setupFees": function(newVal, oldVal) {
      // Check if the setupFees has been changed
      if (newVal !== oldVal) {
        // Disable the Proceed to Mars button
        this.partialSaved = false;
      }
    },
    "formData.qrShortLead.recurringFees": function(newVal, oldVal) {
      // Check if the recurringFees has been changed
      if (newVal !== oldVal) {
        // Disable the Proceed to Mars button
        this.partialSaved = false;
      }
    },
    "formData.qrShortLead.smallMerchantLessThanTwoDebit": function(
      newVal,
      oldVal
    ) {
      // Check if the smallMerchantLessThanTwoDebit has been changed
      if (newVal !== oldVal) {
        // Disable the Proceed to Mars button
        this.partialSaved = false;
      }
    },
    "formData.qrShortLead.smallMerchantGreaterThanTwoDebit": function(
      newVal,
      oldVal
    ) {
      // Check if the smallMerchantGreaterThanTwoDebit has been changed
      if (newVal !== oldVal) {
        // Disable the Proceed to Mars button
        this.partialSaved = false;
      }
    },
    "formData.qrShortLead.smallMerchantLessThanTwoCreditAndPrepaid": function(
      newVal,
      oldVal
    ) {
      // Check if the smallMerchantLessThanTwoCreditAndPrepaid has been changed
      if (newVal !== oldVal) {
        // Disable the Proceed to Mars button
        this.partialSaved = false;
      }
    },
    "formData.qrShortLead.smallMerchantGreaterThanTwoCreditAndPrepaid": function(
      newVal,
      oldVal
    ) {
      // Check if the smallMerchantGreaterThanTwoCreditAndPrepaid has been changed
      if (newVal !== oldVal) {
        // Disable the Proceed to Mars button
        this.partialSaved = false;
      }
    },

    "formData.qrShortLead.largeMerchantLessThanTwoDebit": function(
      newVal,
      oldVal
    ) {
      // Check if the largeMerchantLessThanTwoDebit has been changed
      if (newVal !== oldVal) {
        // Disable the Proceed to Mars button
        this.partialSaved = false;
      }
    },
    "formData.qrShortLead.largeMerchantGreaterThanTwoDebit": function(
      newVal,
      oldVal
    ) {
      // Check if the largeMerchantGreaterThanTwoDebit has been changed
      if (newVal !== oldVal) {
        // Disable the Proceed to Mars button
        this.partialSaved = false;
      }
    },
    "formData.qrShortLead.largeMerchantLessThanTwoCreditandPrepaid": function(
      newVal,
      oldVal
    ) {
      // Check if the largeMerchantLessThanTwoCreditandPrepaid has been changed
      if (newVal !== oldVal) {
        // Disable the Proceed to Mars button
        this.partialSaved = false;
      }
    },
    "formData.qrShortLead.largeMerchantGreaterThanTwoCreditandPrepaid": function(
      newVal,
      oldVal
    ) {
      // Check if the largeMerchantGreaterThanTwoCreditandPrepaid has been changed
      if (newVal !== oldVal) {
        // Disable the Proceed to Mars button
        this.partialSaved = false;
      }
    },
    "formData.qrShortLead.rentalMode": function(newVal, oldVal) {
      // Check if the rentalMode has been changed
      if (newVal !== oldVal) {
        // Disable the Proceed to Mars button
        this.partialSaved = false;
      }
    },
    "formData.qrShortLead.rentalType": function(newVal, oldVal) {
      // Check if the rentalType has been changed
      if (newVal !== oldVal) {
        // Disable the Proceed to Mars button
        this.partialSaved = false;
      }
    },
    "formData.qrShortLead.mdrFixed": function(newVal, oldVal) {
      // Check if the mdrFixed has been changed
      if (newVal !== oldVal) {
        // Disable the Proceed to Mars button
        this.partialSaved = false;
      }
    },
    "formData.qrShortLead.maxMdrPerTransaction": function(newVal, oldVal) {
      // Check if the maxMdrPerTransaction has been changed
      if (newVal !== oldVal) {
        // Disable the Proceed to Mars button
        this.partialSaved = false;
      }
    },
    "formData.qrShortLead.satToMarsRemarks": function(newVal, oldVal) {
      // Check if the satToMarsRemarks has been changed
      if (newVal !== oldVal) {
        // Disable the Proceed to Mars button
        this.partialSaved = false;
      }
    }
  },

  beforeMount() {
    this.getstate();
    this.getMerchantType();
    this.getMerchantCategory();
    this.getrentalplan();
    this.getSalesPerson();
    this.getmccNameCode();
    this.getcityNameCode();
    this.getstateNameCode();
    // this.getRegionCode();
  },

  mounted() {
    console.log("Child mounted");
    this.$emit("custom-event-from-child");
    // console.log(
    //   "self.propLeadDeatils.chequeNumber-------->>>>",
    //   JSON.stringify(this.propLeadDeatils.chequeNumber)
    // );
  },
  methods: {
    ...mapActions("SatLeadValidation", [
      "VERIFY_QR_REJECT_LEAD_DOCUMENTS",
      "VERIFY_QR_LEAD_DOCUMENTS"
    ]),
    ...mapActions("mars_dataSubmit", ["MARS_STATIC_QR_DATA_SUBMIT"]),
    ...mapActions("SuperAdminUsers", [
      "FETCH_ALL_STATES_DATA",
      "FETCH_PINCODE_WITH_TERM"
    ]),
    ...mapActions("SA_Devices", ["FETCH_DEVICES_DATA"]),
    ...mapActions("appDevice", ["FETCH_APP_DEVICES_DATA"]),
    ...mapActions("merchantCategory", ["MERCHANT_CATEGORY_ACTIVE_LIST"]),
    ...mapActions("appLeadSource", ["FETCH_APP_LEADSOURCE_DATA"]),
    ...mapActions("InventoryCentral", [
      "FETCH_ALL_INVENTORY_DEVICES_TYPES_DATA",
      "FETCH_ALL_REGIONS_DATA",
      "FETCH_REGION_BASED_SO"
    ]),
    ...mapActions("mars_salesPerson", ["QR_SALES_PERSON_FROM_MARS"]),
    ...mapActions("mars_mcc", ["QR_MCC_FROM_MARS"]),
    // ...mapActions("mars_regions", ["REGION_FROM_MARS"]),
    ...mapActions("appMerchantType", [
      "APP_MERCHANT_DOCUMENT_TYPE",
      "SO_RENTAL_PLAN"
    ]),
    ...mapActions("mars_city", ["CITY_FROM_MARS"]),
    ...mapActions("mars_state", ["STATE_FROM_MARS"]),
    ...mapActions("iciciStaticQr", [
      "FETCH_STATIC_QR_SHORT_LEAD_DATA",
      "PROCEED_TO_MARS",
      "FETCH_MARS_ID_DATA",
      "UPDATE_QR_DETAILS",
      "REFERBACK_SAT_TO_SO_QR_DETAILS"
    ]),
    ...mapActions("merchantTierMapping", [
      "MERCHANT_TIER_MAPPING_GET_STATE_DETAILS",
      "MERCHANT_TIER_MAPPING_SEARCH_DISTRICT",
      "MERCHANT_TIER_MAPPING_SUB_DISTRICT_DETAILS",
      "MERCHANT_TIER_MAPPING_TOWN_OR_VILLAGE_DETAILS",
      "MERCHANT_TIER_MAPPING_VILLAGE_TIER_DETAILS",
      "MERCHANT_TIER_MAPPING_VILLAGE_BASED_TIER_AND_LOCATION_DETAILS"
    ]),
    ...mapActions("mars_deviceModel", ["DEVICE_MODEL_FROM_MARS"]),

    pincodeSelected(item) {
      this.pinSelected = true;
      this.formData.qrShortLead.personalInfoPincode = item.value.pincode;
    },
    pincodeSelected1(item) {
      this.pinSelected = true;
      this.formData.qrShortLead.pincode = item.value.pincode;
    },
    fnClrPin() {
      if (!this.pinSelected) this.formData.qrShortLead.personalInfoPincode = "";
      if (!this.pinSelected) this.formData.qrShortLead.pincode = "";
    },
    pincodeSearch(terms, done) {
      this.formData.qrShortLead.cityName = "";
      this.formData.qrShortLead.stateName = "";
      this.FETCH_PINCODE_WITH_TERM(terms)
        .then(() => {
          const results = this.COMMON_FILTER_FUNCTION(
            this.getAllStatesData,
            terms
          );
          this.validPincodes = results.map(item => item.value.pincode); // Store valid pincodes
          done(results);
        })
        .catch(() => {
          done([]);
        });
    },

    pincodeSearch1(terms, done) {
      this.formData.qrShortLead.cityName = "";
      this.formData.qrShortLead.stateName = "";
      this.FETCH_PINCODE_WITH_TERM(terms)
        .then(() => {
          const results = this.COMMON_FILTER_FUNCTION(
            this.getAllStatesData,
            terms
          );
          this.validPin = results.map(item => item.value.pincode); // Store valid pincodes
          done(results);
        })
        .catch(() => {
          done([]);
        });
    },
    saveFieldData() {
      this.saveCurrentLeadChanges(this.formData);
      console.log(
        "saveFieldData------------->>>>>",
        JSON.stringify(this.formData)
      );
    },

    getDevice(val) {
      self = this;
      self.FETCH_APP_DEVICES_DATA(val.id).then(() => {
        // Clearing the drop down values before assigning data
        self.dropDown.deviceOptions.splice(0);
        return _.map(this.getAllAppDevicesInfo, item => {
          self.dropDown.deviceOptions.push({
            value: item,
            label: item.deviceName
          });
        });
      });
    },
    ajaxLoadDataForDeviceTypeTable() {
      let self = this;
      self.FETCH_DEVICES_DATA().then(() => {
        return _.map(self.getAllDevicesInfo, item => {
          self.dropDown.deviceOptions.push({
            value: JSON.stringify(item),
            label: item.deviceName
          });
        });
      });

      // .then(() => {
      //   self.LEAD_SOURCE_ACTIVE_LIST().then(() => {
      //     return _.map(self.getActiveLeadSource, (item) => {
      //       self.dropDown.leadSourceOptions.push({
      //         value: JSON.stringify(item),
      //         label: item.sourceName,
      //       });
      //     });
      //   });
      // })

      // .then(() => {
      //   self.PLAN_ACTIVE_LIST().then(() => {
      //     return _.map(self.getActivePlan, (item) => {
      //       self.dropDown.planOptions.push({
      //         value: item,
      //         label: item.planName,
      //       });
      //     });
      //   });
      // })
    },

    // appLoadData() {
    //   let self = this;
    //   self.FETCH_APP_LEADSOURCE_DATA().then(() => {
    //     return _.map(self.getAllAppLeadSource, (item) => {
    //       if (item.active) {
    //         self.leadSourceOptions.push({
    //           value: item,
    //           label: item.sourceName,
    //         });
    //       }
    //     });
    //   });
    // },
    nameKeydown(e) {
      if (/^\W$/.test(e.key)) {
        e.preventDefault();
      }
    },

    handleInput(e) {
      if (this.formData.qrShortLead.natureOfBusiness.startsWith(" ")) {
        this.formData.qrShortLead.natureOfBusiness = this.formData.qrShortLead.natureOfBusiness.trimStart();
      }
    },
    handlelegalname(e) {
      if (this.formData.qrShortLead.legalName.startsWith(" ")) {
        this.formData.qrShortLead.legalName = this.formData.qrShortLead.legalName.trimStart();
      }
    },
    handlemarketing(e) {
      if (this.formData.qrShortLead.marketingName.startsWith(" ")) {
        this.formData.qrShortLead.marketingName = this.formData.qrShortLead.marketingName.trimStart();
      }
    },
    nameKeydownacc(e) {
      if (/^[A-Za-z\W]$/.test(e.key)) {
        e.preventDefault();
      }
    },

    validateName(event) {
      const char = String.fromCharCode(event.keyCode);
      const regex = /^[a-zA-Z\s]*$/;
      if (
        !regex.test(char) &&
        !["Backspace", "ArrowLeft", "ArrowRight", "Tab"].includes(event.key)
      ) {
        event.preventDefault();
      }
    },

    COMMON_FILTER_FUNCTION(arraySet, terms) {
      // eslint-disable-next-line no-undef
      return _.filter(arraySet, function(oo) {
        return oo.label.toString().includes(terms.toLowerCase());
      });
    },

  
loadUpdate(){
  this.saveCurrentLeadChangesUpdate(this.formData).then(()=>{
  // ajaxQrLoadShortLeadInfo() {
  //     this.$q.loading.show({
  //       delay: 0, // ms
  //       spinnerColor: "purple-9",
  //       message: "Fetching data .."
  //     });
      this.FETCH_STATIC_QR_SHORT_LEAD_DATA(this.$route.params.id)
        .then(response => {
          this.propLeadDeatils = response.data.data;
          this.$set(
            this.formData,
            "qrShortLead",
            this.getAllStaticQrShortLeadDatas
          );
          console.log("INSIDE SHORT LEAD");
          // console.log("FORM DATA FIX",JSON.stringify(this.formData.qrShortLead.isMerchant.satToMarsRemarks));
          this.formData.qrShortLead.isMerchant == 1 ? "Small" : "Large";
   
          // console.log("QR SHORT LEAD111111", JSON.stringify(this.getAllStaticQrShortLeadDatas.qrMerchantType.merchantTypeName));
          this.iciciMarsRequest.merchant.salesInformation.applicationNumber =
            this.getAllStaticQrShortLeadDatas.applicationNumber != null
              ? this.getAllStaticQrShortLeadDatas.applicationNumber
              : new Date().getTime();
          this.applicationNumber = this.iciciMarsRequest.merchant.salesInformation.applicationNumber;
          this.iciciMarsRequest.merchant.salesInformation.applicationDate = this.getCurrentDate();
          this.iciciMarsRequest.merchant.salesInformation.aggreementDate = this.getCurrentDate();
          // this.iciciMarsRequest.merchant.paymentDetails.numberOfTerminals = this.getAllStaticQrShortLeadDatas.qrVpas.length;
          this.iciciMarsRequest.merchant.companyInformation.constitution = this.getAllStaticQrShortLeadDatas.qrMerchantType.marsMappingId;
          this.count++;

          if (this.getAllStaticQrShortLeadDatas.salesPersonName == null) {
            this.getSalesPerson();
            // this.iciciMarsRequest.merchant.salesInformation.salesPersonName = this.getAllStaticQrShortLeadDatas.createdBy.name + "-" + this.getAllStaticQrShortLeadDatas.createdBy.employeeID
            this.formData.qrShortLead.salesPersonName =
              this.getAllStaticQrShortLeadDatas.createdBy.name +
              "-" +
              this.getAllStaticQrShortLeadDatas.createdBy.employeeID;
          } else if (
            this.getAllStaticQrShortLeadDatas.salesPersonName != null
          ) {
            this.getSalesPerson();
            this.formData.qrShortLead.salesPersonName = this.getAllStaticQrShortLeadDatas.salesPersonName;
          } // console.log("FORMDATA------> SATREMARKS",JSON.stringify(this.formData.qrShortLead.satToMarsRemarks));
          // const vpa = this.getAllStaticQrShortLeadDatas.qrVpas.map(
          //   ({ vpa }) => vpa
          // );

          if (this.getAllStaticQrShortLeadDatas.qrLeadCategory == true) {
            this.existingMerchantTid(this.getAllStaticQrShortLeadDatas.marsId);
          }
          this.fetchAndCookDocuments();
          // this.setMarsData();
          this.category();
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    // },
  })
},
    ajaxQrLoadShortLeadInfoInitialLoad() {
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data .."
      });
      this.FETCH_STATIC_QR_SHORT_LEAD_DATA(this.$route.params.id)
        .then(response => {
          this.propLeadDeatils = response.data.data;
          this.$set(
            this.formData,
            "qrShortLead",
            this.getAllStaticQrShortLeadDatas
          );
          // console.log("FORM DATA FIX",JSON.stringify(this.formData.qrShortLead.isMerchant.satToMarsRemarks));
          this.formData.qrShortLead.isMerchant == 1 ? "Small" : "Large";
          console.log(
            "QR SHORT LEAD",
            JSON.stringify(this.getAllStaticQrShortLeadDatas)
          );
          // console.log("QR SHORT LEAD111111", JSON.stringify(this.getAllStaticQrShortLeadDatas.qrMerchantType.merchantTypeName));
          this.iciciMarsRequest.merchant.salesInformation.applicationNumber =
            this.getAllStaticQrShortLeadDatas.applicationNumber != null
              ? this.getAllStaticQrShortLeadDatas.applicationNumber
              : new Date().getTime();
          this.applicationNumber = this.iciciMarsRequest.merchant.salesInformation.applicationNumber;
          this.iciciMarsRequest.merchant.salesInformation.applicationDate = this.getCurrentDate();
          this.iciciMarsRequest.merchant.salesInformation.aggreementDate = this.getCurrentDate();
          // this.iciciMarsRequest.merchant.paymentDetails.numberOfTerminals = this.getAllStaticQrShortLeadDatas.qrVpas.length;
          this.iciciMarsRequest.merchant.companyInformation.constitution = this.getAllStaticQrShortLeadDatas.qrMerchantType.marsMappingId;
          this.count++;

          if (this.getAllStaticQrShortLeadDatas.salesPersonName == null) {
            this.getSalesPerson();
            // this.iciciMarsRequest.merchant.salesInformation.salesPersonName = this.getAllStaticQrShortLeadDatas.createdBy.name + "-" + this.getAllStaticQrShortLeadDatas.createdBy.employeeID
            this.formData.qrShortLead.salesPersonName =
              this.getAllStaticQrShortLeadDatas.createdBy.name +
              "-" +
              this.getAllStaticQrShortLeadDatas.createdBy.employeeID;
          } else if (
            this.getAllStaticQrShortLeadDatas.salesPersonName != null
          ) {
            this.getSalesPerson();
            this.formData.qrShortLead.salesPersonName = this.getAllStaticQrShortLeadDatas.salesPersonName;
          } // console.log("FORMDATA------> SATREMARKS",JSON.stringify(this.formData.qrShortLead.satToMarsRemarks));
          // const vpa = this.getAllStaticQrShortLeadDatas.qrVpas.map(
          //   ({ vpa }) => vpa
          // );

          if (this.getAllStaticQrShortLeadDatas.qrLeadCategory == true) {
            this.existingMerchantTid(this.getAllStaticQrShortLeadDatas.marsId);
          }
          this.fetchAndCookDocuments();
          // this.setMarsData();
          this.category();
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },
    getstate() {
      let self = this;
      self.MERCHANT_TIER_MAPPING_GET_STATE_DETAILS().then(() => {
        return _.map(self.getMerchantTierMappingStateDetails, item => {
          self.dropDown.merchantState.push({
            value: item.stateName,
            label: item.stateName
          });
        });
      });
    },

    getMerchantType() {
      let self = this;
      self.APP_MERCHANT_DOCUMENT_TYPE().then(() => {
        return _.map(self.getappMerchantDocumentType, item => {
          self.dropDown.merchantNameType.push({
            value: item,
            label: item.merchantTypeName
          });
        });
      });
    },

    getrentalplan() {
      let self = this;
      self
        .SO_RENTAL_PLAN(
          this.iciciMarsRequest.merchant.paymentDetails.rentalPlanCode
        )
        .then(() => {
          return _.map(self.getsorentalplan, item => {
            self.dropDown.rentalplan.push({
              value: item.code,
              label: item.name
            });
          });
        });
    },

    getSalesPerson() {
      let self = this;
      self
        .QR_SALES_PERSON_FROM_MARS(
          this.iciciMarsRequest.merchant.salesInformation.institutionCode
        )
        .then(() => {
          if (this.getAllStaticQrShortLeadDatas.salesPersonName == null) {
            self.dropDown.salesPersonOptions = [
              {
                label:
                  this.getAllStaticQrShortLeadDatas.createdBy.name +
                  "-" +
                  this.getAllStaticQrShortLeadDatas.createdBy.employeeID,
                value:
                  this.getAllStaticQrShortLeadDatas.createdBy.name +
                  "-" +
                  this.getAllStaticQrShortLeadDatas.createdBy.employeeID
              }
            ];
          } else if (
            this.getAllStaticQrShortLeadDatas.salesPersonName != null
          ) {
            self.dropDown.salesPersonOptions = [
              {
                label: this.getAllStaticQrShortLeadDatas.salesPersonName,
                value: this.getAllStaticQrShortLeadDatas.salesPersonName
              }
            ];
          }

          // console.log("dropDown.salesPersonOptions",dropDown.salesPersonOptions)
          return _.map(self.qrsalesPersonFromMars, item => {
            self.dropDown.salesPersonOptions.push({
              label: item.name + " - " + item.empCode,
              value: item.name + " - " + item.empCode
            });
          });
        });
    },
    // getRegionCode() {
    //   let self = this;
    //   self
    //     .REGION_FROM_MARS(this.iciciMarsRequest.merchant.salesInformation.institutionCode)
    //     .then(() => {
    //       self.regionOptions = [];
    //       return self.regionsFromMars.items.map(oo => {
    //         console.log("Region Item:", oo);
    //         self.regionOptions.push({
    //           label: oo.name,
    //           value: oo.code
    //           });
    //       });
    //     })
    // },
    getmccNameCode() {
      let self = this;
      return self.QR_MCC_FROM_MARS().then(response => {
        self.mccSearchSet = [];
        self.mccFromMarsQr.items.map(oo => {
          self.mccSearchSet.push({
            label: oo.code + "-" + oo.name,
            value: oo.code
          });
        });
      });
    },
    getcityNameCode() {
      let self = this;
      return self.CITY_FROM_MARS().then(response => {
        self.cityOptions = [];
        self.cityFromMars.items.map(oo => {
          self.cityOptions.push({
            label: oo.name,
            value: oo.code
          });
        });
      });
    },
    getstateNameCode() {
      let self = this;
      return self.STATE_FROM_MARS().then(response => {
        self.stateOptions = [];
        self.stateFromMars.items.map(oo => {
          self.stateOptions.push({
            label: oo.name,
            value: oo.code
          });
        });
      });
    },

    getMerchantCategory() {
      let self = this;
      self.MERCHANT_CATEGORY_ACTIVE_LIST().then(() => {
        return _.map(self.getActiveMerchantCategory, item => {
          self.dropDown.merchantCategory.push({
            value: item,
            label: item.merchantCategoryName
          });
        });
      });
    },

    getdistrict(terms) {
      let self = this;
      let param = {
        Statename: terms
      };

      self.MERCHANT_TIER_MAPPING_SEARCH_DISTRICT(param).then(() => {
        self.dropDown.merchantDistrict.splice(0);
        return _.map(self.getMerchantTierMappingDistrictDetails, item => {
          self.dropDown.merchantDistrict.push({
            value: item.districtName,
            label: item.districtName
          });
        });
      });
    },
    getSubDistrict(terms) {
      let self = this;
      let param = {
        Statename: this.formData.qrShortLead.state,
        Districtname: terms
      };
      self.MERCHANT_TIER_MAPPING_SUB_DISTRICT_DETAILS(param).then(() => {
        self.dropDown.merchantSubDistrict.splice(0);
        return _.map(self.getMerchantTierMappingSubDistrictDetails, item => {
          self.dropDown.merchantSubDistrict.push({
            value: item.subDistrictName,
            label: item.subDistrictName
          });
        });
      });
    },

    getTownOrVillage(terms) {
      let self = this;
      let param = {
        Statename: this.formData.qrShortLead.state,
        Districtname: this.formData.qrShortLead.merchantSubDistrictName,
        SubDistrictname: terms
      };
      self.MERCHANT_TIER_MAPPING_TOWN_OR_VILLAGE_DETAILS(param).then(() => {
        self.dropDown.merchantTownOrVillageDetails.splice(0);
        return _.map(self.getMerchantTierMappingTownOrVillageDetails, item => {
          self.dropDown.merchantTownOrVillageDetails.push({
            value: item.townVillageName,
            label: item.townVillageName
          });
        });
      });
    },
    getVillageTier(terms) {
      let self = this;
      let param = {
        Statename: this.formData.qrShortLead.state,
        Districtname: this.formData.qrShortLead.merchantDistrictName,
        SubDistrictname: this.formData.qrShortLead.merchantSubDistrictName,
        Villagename: terms
      };
      self.MERCHANT_TIER_MAPPING_VILLAGE_TIER_DETAILS(param).then(() => {
        return _.map(self.getMerchantTierMappingVillageTierDetails, item => {
          this.formData.qrShortLead.merchantTier =
            self.dropDown.merchantTierDetails;
          this.formData.qrShortLead.merchantTier = item;
        });
      });
    },
    getCurrentDate() {
      const currentDate = new Date();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const day = String(currentDate.getDate()).padStart(2, "0");
      const year = currentDate.getFullYear();
      const formattedDate = `${day}/${month}/${year}`;
      return formattedDate;
    },

    fetchMarsDeviceDetails() {
      let param = {
        leadSource: this.propLeadDeatils.leadSource.id,
        device: this.propLeadDeatils.device.id,
        plan: this.propLeadDeatils.plan.id
      };
      this.DEVICE_MODEL_FROM_MARS(param).then(response => {
        let obj = response.body.data.marsDeviceModel;
        this.terminalModelSet = [];
        this.terminalModelSet.push({
          label: obj.name,
          value: obj.code
        });

        this.terminalCodeValue = obj.code;
        console.log("terminalCodeValue----------->>>>", this.terminalCodeValue);
      });
    },
    existingMerchantTid(request) {
      this.FETCH_MARS_ID_DATA(request).then(response => {
        this.iciciMarsRequest.merchant.revParameters.bTID = this.getStaicQrExistingMerchantMarsId.tid;
        this.iciciMarsRequest.merchant.revParameters.baseMid = this.getStaicQrExistingMerchantMarsId.mid;
      });
    },
    fnReassignData(rowDetails) {
      this.propShowUpdateOpenedExternal = !this.propShowUpdateOpenedExternal;
      if (rowDetails != undefined) {
        this.propRowDetails = rowDetails;
      }
    },
    mccSelected(item) {
      this.formData.qrShortLead.merchantIndustry.industryName = item.label;
      this.formData.qrShortLead.merchantIndustry.mccCode = item.value;
    },
    // regionSelected(item) {
    //   console.log("Selected Region:", item.value);
    //   this.formData.qrShortLead.regionCode = item.value;
    //   // this.iciciMarsRequest.merchant.salesInformation.region = item.code;
    // },
    salesSelected(item) {
      // console.log("item",item)
      this.formData.qrShortLead.salesPersonName = item.value;
    },
    houseSelected(item) {
      this.formData.qrShortLead.ownHouse = item;
    },

    rentalPlanSelected(item) {
      this.formData.qrShortLead.marsRentalPlanName = item.value;
    },

    mccSearch(terms, done) {
      done(this.COMMON_FILTER_FUNCTION(this.mccSearchSet, terms));
    },

    autoCompleteError(val1, val2) {
      val1.$touch();
      val2.$touch();
      if (val1.$anyError || val2.$anyError) {
        return true;
      } else {
        return false;
      }
    },
    COMMON_FILTER_FUNCTION(arraySet, terms) {
      return _.filter(arraySet, function(oo) {
        return (
          oo.label.toLowerCase().includes(terms.toLowerCase()) ||
          oo.value.toString().includes(terms.toString())
        );
      });
    },
    emitToggleRemarks() {
      this.$emit("closeLeadInformation");
    },
    fnToggleQrRejectLeadComp() {
      this.VERIFY_QR_REJECT_LEAD_DOCUMENTS(this.$route.params.id)
        .then(response => {
          this.$q.loading.show({
            delay: 0, // ms
            spinnerColor: "purple-9",
            message: "Processing .."
          });
          this.toggleLeadRejectModal = !this.toggleLeadRejectModal;
          this.$q.loading.hide();
        })
        .catch(error => {
          let arrayMessage = "";
          _.map(error.data.data, oo => {
            arrayMessage += `${oo}, `;
          });
          this.$q.notify({
            color: "amber-9",
            position: "bottom-left",
            message: `${error.data.message}`,
            detail: arrayMessage,
            timeout: 8000,
            icon: "warning",
            actions: [
              {
                icon: "clear", // optional
                noDismiss: false // optional, v0.15.11+
              }
            ]
          });
          this.$q.loading.hide();
        });
    },
    residentCitySearch(terms, done) {
      done(this.COMMON_FILTER_FUNCTION(this.cityOptions, terms));
    },
    registeredCitySelected(item) {
      this.formData.qrShortLead.personalInfoCity = item.label;
      this.formData.qrShortLead.personalCityRefCode = item.value;
    },
    registeredCitySelected1(item) {
      this.formData.qrShortLead.city = item.label;
      this.formData.qrShortLead.merchantCityRefCode = item.value;
    },
    residentStateSearch(terms, done) {
      done(this.COMMON_FILTER_FUNCTION(this.stateOptions, terms));
    },

    registeredStateSelected(item) {
      this.formData.qrShortLead.personalInfoState = item.label;
      this.formData.qrShortLead.personalStateRefCode = item.value;
    },
    registeredStateSelected1(item) {
      this.formData.qrShortLead.state = item.label;
      this.formData.qrShortLead.merchantStateRefCode = item.value;
    },

    validateStateInput() {
      const validState = this.stateOptions.some(
        option => option.label === this.formData.qrShortLead.state
      );
      if (!validState) {
        this.formData.qrShortLead.state = "";
      }
    },
    validatePersonalStateInput() {
      const validPersonalState = this.stateOptions.some(
        option => option.label === this.formData.qrShortLead.personalInfoState
      );
      if (!validPersonalState) {
        this.formData.qrShortLead.personalInfoState = "";
      }
    },
    validateCityInput() {
      const validCity = this.cityOptions.some(
        option => option.label === this.formData.qrShortLead.city
      );
      if (!validCity) {
        this.formData.qrShortLead.city = "";
      }
    },
    validatePersonalCityInput() {
      const validPersonalCity = this.cityOptions.some(
        option => option.label === this.formData.qrShortLead.personalInfoCity
      );
      if (!validPersonalCity) {
        this.formData.qrShortLead.personalInfoCity = "";
      }
    },
    validateMCCInput() {
      const validMCC = this.mccSearchSet.some(
        option =>
          option.label ===
          this.formData.qrShortLead.merchantIndustry.industryName
      );
      if (!validMCC) {
        this.formData.qrShortLead.merchantIndustry.industryName = "";
      }
    },
    validatePincode() {
      if (!this.validPincodes.includes(this.formData.qrShortLead.pincode)) {
        this.formData.qrShortLead.pincode = ""; // Clear the input field if the pincode is not valid
      }
    },
    validatePin() {
      if (
        !this.validPin.includes(this.formData.qrShortLead.personalInfoPincode)
      ) {
        this.formData.qrShortLead.personalInfoPincode = ""; // Clear the input field if the pincode is not valid
      }
    },
    documentValidation() {
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Validating .."
      });
      this.VERIFY_QR_LEAD_DOCUMENTS({ id: this.$route.params.id, params: [] })
        .then(response => {
          this.$q.loading.show({
            delay: 0, // ms
            spinnerColor: "purple-9",
            message: "Processing .."
          });
          this.$q.loading.hide();
          this.proceedToMars();
        })
        .catch(error => {
          if (error.data.data.toBeVerifiedDocuments.length > 0) {
            this.$q.loading.hide();
            let arrayMessage = "";
            _.map(error.data.data.toBeVerifiedDocuments, oo => {
              arrayMessage += `${oo}, `;
            });
            this.$q.notify({
              color: "amber-9",
              position: "bottom-left",
              message: `${error.data.message}`,
              detail: arrayMessage,
              timeout: 8000,
              icon: "warning",
              actions: [
                {
                  icon: "clear", // optional
                  noDismiss: false // optional, v0.15.11+
                }
              ]
            });
          } else {
            this.$q.loading.hide();
            this.$delete(error.data.data, "toBeVerifiedDocuments");
            for (var key in error.data.data) {
              let arrayMessage = "";
              _.map(error.data.data[key], oo => {
                arrayMessage += `${oo}, `;
              });
              this.$q.notify({
                color: "amber-9",
                position: "bottom-left",
                message: `${error.data.message} for key`,
                detail: arrayMessage,
                timeout: 8000,
                icon: "warning",
                actions: [
                  {
                    icon: "clear", // optional
                    noDismiss: false // optional, v0.15.11+
                  }
                ]
              });
            }
          }
          this.$q.loading.hide();
        });
    },

    proceedToMars() {
      console.log("Proceed to Mars button clicked");
      this.$v.formData.$touch();
      this.$v.iciciMarsRequest.merchant.$touch();
      if (this.$v.formData.$error || this.$v.iciciMarsRequest.merchant.$error) {
        this.$q.notify({
          color: "negative",
          position: "bottom",
          message: "Please fill all mandatory fields",
          icon: "info"
        });
      } else {
        this.$q.loading.show({
          delay: 0, // ms
          spinnerColor: "purple-9",
          message: "Sending data to mars"
        });
        let deviceName = this.propLeadDeatils.device.deviceName.toLowerCase();
        this.iciciMarsRequest.merchant.paymentDetails.terminalModeCode = this.terminalCodeValue;

        var find = "q161";
        if (deviceName.includes(find)) {
          this.iciciMarsRequest.merchant.salesInformation.institutionCode = 106;
          let key = 106;
          this.$q.localStorage.set("bb_t", key);
          let request = this.iciciMarsRequest;
          console.log(
            "PROCEED TO MARS RESPONCE ----------->",
            this.iciciMarsRequest
          );
          this.$delete(request.merchant.paymentDetails, "vpa");
          this.MARS_STATIC_QR_DATA_SUBMIT({
            params: request,

            refNumber: this.propLeadDeatils.merchantRefCode,
            qrLeadStatus: this.propLeadDeatils.qrLeadStatus
          })
            .then(response => {
              let feed_paramaters;
              if (response.status == 204) {
                feed_paramaters = {
                  applicationNumber: this.propLeadDeatils.applicationNumber,
                  merchantRefCode: this.propLeadDeatils.merchantRefCode
                };
              } else {
                feed_paramaters = response.body;
              }
              this.PROCEED_TO_MARS({
                request: feed_paramaters,
                leadId: this.$route.params.id
              })
                .then(response => {
                  this.$router.push("/sat/staticQrLeads");
                  this.$q.notify({
                    color: "positive",
                    position: "bottom",
                    message: "Successfully Submitted To Mars!",
                    icon: "thumb_up"
                  });
                  this.$q.loading.hide();
                })
                .catch(() => {
                  this.$q.notify({
                    color: "negative",
                    position: "bottom",
                    message: "No changes made!",
                    icon: "thumb_down"
                  });
                  this.$q.loading.hide();
                });
            })
            .catch(error => {
              this.$q.notify({
                color: "negative",
                position: "bottom",
                message: `${error.data.message}`,
                icon: "thumb_down"
              });
              this.$q.loading.hide();
            });
        } else {
          this.$q.loading.show({
            delay: 0, // ms
            spinnerColor: "purple-9",
            message: "Sending data to mars"
          });
          let key = 110;
          this.$q.localStorage.set("bb_t", key);
          this.iciciMarsRequest.merchant.salesInformation.institutionCode = 110;
          const vpa = this.getAllStaticQrShortLeadDatas.qrVpas[0];
          this.iciciMarsRequest.merchant.paymentDetails.vpa = [];
          let qrVpa = vpa.vpa;
          this.iciciMarsRequest.merchant.paymentDetails.vpa.push(qrVpa);

          let request = this.iciciMarsRequest;
          this.MARS_STATIC_QR_DATA_SUBMIT({
            params: request,
            refNumber: this.propLeadDeatils.merchantRefCode,
            qrLeadStatus: this.propLeadDeatils.qrLeadStatus
          })
            .then(response => {
              let feed_paramaters;
              if (response.status == 204) {
                feed_paramaters = {
                  applicationNumber: this.propLeadDeatils.applicationNumber,
                  merchantRefCode: this.propLeadDeatils.merchantRefCode
                };
              } else {
                feed_paramaters = response.body;
              }
              this.PROCEED_TO_MARS({
                request: feed_paramaters,
                leadId: this.$route.params.id
              })
                .then(response => {
                  this.$router.push("/sat/staticQrLeads");
                  this.$q.notify({
                    color: "positive",
                    position: "bottom",
                    message: "Successfully Submitted To Mars!",
                    icon: "thumb_up"
                  });
                  this.$q.loading.hide();
                })
                .catch(() => {
                  this.$q.notify({
                    color: "negative",
                    position: "bottom",
                    message: "No changes made!",
                    icon: "thumb_down"
                  });
                  this.$q.loading.hide();
                });
            })
            .catch(error => {
              this.$q.notify({
                color: "negative",
                position: "bottom",
                message: `${error.data.message}`,
                icon: "thumb_down"
              });
              this.$q.loading.hide();
            });
        }
      }
    },

    category() {
      if (
        this.getAllStaticQrShortLeadDatas.qrMerchantType.marsMappingId == "PL"
      ) {
        this.iciciMarsRequest.merchant.companyInformation.constitutionName =
          "60";
      } else if (
        this.getAllStaticQrShortLeadDatas.qrMerchantType.marsMappingId == "IN"
      ) {
        this.iciciMarsRequest.merchant.companyInformation.constitutionName =
          "90";
      } else if (
        this.getAllStaticQrShortLeadDatas.qrMerchantType.marsMappingId == "SP"
      ) {
        this.iciciMarsRequest.merchant.companyInformation.constitutionName =
          "80";
      } else if (
        this.getAllStaticQrShortLeadDatas.qrMerchantType.marsMappingId == "PB"
      ) {
        this.iciciMarsRequest.merchant.companyInformation.constitutionName =
          "60";
      } else if (
        this.getAllStaticQrShortLeadDatas.qrMerchantType.marsMappingId == "SO"
      ) {
        this.iciciMarsRequest.merchant.companyInformation.constitutionName =
          "40";
      } else if (
        this.getAllStaticQrShortLeadDatas.qrMerchantType.marsMappingId == "TR"
      ) {
        this.iciciMarsRequest.merchant.companyInformation.constitutionName =
          "50";
      } else if (
        this.getAllStaticQrShortLeadDatas.qrMerchantType.marsMappingId == "PV"
      ) {
        this.iciciMarsRequest.merchant.companyInformation.constitutionName =
          "70";
      } else if (
        this.getAllStaticQrShortLeadDatas.qrMerchantType.marsMappingId == "GV"
      ) {
        this.iciciMarsRequest.merchant.companyInformation.constitutionName =
          "30";
      } else {
        this.iciciMarsRequest.merchant.companyInformation.constitutionName = "";
      }
    },

    nameKeydownhoursWeekdayStart(e) {
  const value = this.formData.qrShortLead.hoursWeekdayStart;

      if (
        [
          "Backspace",
          "Tab",
          "Escape",
          "Enter",
          "ArrowLeft",
          "ArrowRight",
          "Home",
          "End"
        ].indexOf(e.key) !== -1 ||
        (e.key === "." && !value.includes(".")) ||
        // Allow Ctrl/cmd + A, C, V, X
        ((e.ctrlKey === true || e.metaKey === true) &&
          ["a", "c", "v", "x"].indexOf(e.key.toLowerCase()) !== -1) ||
        (e.key >= "0" && e.key <= "9") ||
        (e.key >= "Numpad0" && e.key <= "Numpad9")
      ) {
        // Prevent entering more than 2 digits after the decimal
        const dotIndex = value.indexOf(".");
        if (dotIndex !== -1 && e.key !== "Backspace") {
          const decimals = value.substring(dotIndex + 1);
          if (decimals.length >= 2 && value.length - dotIndex <= 3) {
            e.preventDefault();
            return;
          }
        }
        return;
      }

      e.preventDefault();
    },

    handleNumericInputhoursWeekdayStart(event) {
      let value = event.target.value;

      // Allow only valid number input with up to two digits before and after the dot
      const formattedValue = value
        .replace(/[^0-9.]/g, "")
        .replace(/(\..*)\./g, "$1"); // Remove all non-digit/non-dot characters, and keep only the first dot if multiple are present

      const parts = formattedValue.split(".");
      let integerPart = parts[0] || "";
      let decimalPart = parts[1] || "";

      // Trim the integer part to a maximum of 2 digits
      if (integerPart.length > 2) {
        integerPart = integerPart.slice(0, 2);
      }

      // Trim the decimal part to a maximum of 2 digits
      if (decimalPart.length > 2) {
        decimalPart = decimalPart.slice(0, 2);
      }

      // Reconstruct the value
      const newValue = integerPart + (decimalPart ? "." + decimalPart : "");

      // Only update if the new value differs from the original to prevent unnecessary updates
      if (this.formData.qrShortLead.hoursWeekdayStart !== newValue) {
        this.formData.qrShortLead.hoursWeekdayStart = newValue;
      }
    },

    nameKeydownhoursWeekdayEnd(e) {
      const value = this.formData.qrShortLead.hoursWeekdayEnd;

      if (
        [
          "Backspace",
          "Tab",
          "Escape",
          "Enter",
          "ArrowLeft",
          "ArrowRight",
          "Home",
          "End"
        ].indexOf(e.key) !== -1 ||
        (e.key === "." && !value.includes(".")) ||
        // Allow Ctrl/cmd + A, C, V, X
        ((e.ctrlKey === true || e.metaKey === true) &&
          ["a", "c", "v", "x"].indexOf(e.key.toLowerCase()) !== -1) ||
        (e.key >= "0" && e.key <= "9") ||
        (e.key >= "Numpad0" && e.key <= "Numpad9")
      ) {
        // Prevent entering more than 2 digits after the decimal
        const dotIndex = value.indexOf(".");
        if (dotIndex !== -1 && e.key !== "Backspace") {
          const decimals = value.substring(dotIndex + 1);
          if (decimals.length >= 2 && value.length - dotIndex <= 3) {
            e.preventDefault();
            return;
          }
        }
        return;
      }

      e.preventDefault();
    },

    handleNumericInputhoursWeekdayEnd(event) {
      let value = event.target.value;

      // Allow only valid number input with up to two digits before and after the dot
      const formattedValue = value
        .replace(/[^0-9.]/g, "")
        .replace(/(\..*)\./g, "$1"); // Remove all non-digit/non-dot characters, and keep only the first dot if multiple are present

      const parts = formattedValue.split(".");
      let integerPart = parts[0] || "";
      let decimalPart = parts[1] || "";

      // Trim the integer part to a maximum of 2 digits
      if (integerPart.length > 2) {
        integerPart = integerPart.slice(0, 2);
      }

      // Trim the decimal part to a maximum of 2 digits
      if (decimalPart.length > 2) {
        decimalPart = decimalPart.slice(0, 2);
      }

      // Reconstruct the value
      const newValue = integerPart + (decimalPart ? "." + decimalPart : "");

      // Only update if the new value differs from the original to prevent unnecessary updates
      if (this.formData.qrShortLead.hoursWeekdayEnd !== newValue) {
        this.formData.qrShortLead.hoursWeekdayEnd = newValue;
      }
    },

    nameKeydownhoursWeekendStart(e) {
      const value = this.formData.qrShortLead.hoursWeekendStart;

      if (
        [
          "Backspace",
          "Tab",
          "Escape",
          "Enter",
          "ArrowLeft",
          "ArrowRight",
          "Home",
          "End"
        ].indexOf(e.key) !== -1 ||
        (e.key === "." && !value.includes(".")) ||
        // Allow Ctrl/cmd + A, C, V, X
        ((e.ctrlKey === true || e.metaKey === true) &&
          ["a", "c", "v", "x"].indexOf(e.key.toLowerCase()) !== -1) ||
        (e.key >= "0" && e.key <= "9") ||
        (e.key >= "Numpad0" && e.key <= "Numpad9")
      ) {
        // Prevent entering more than 2 digits after the decimal
        const dotIndex = value.indexOf(".");
        if (dotIndex !== -1 && e.key !== "Backspace") {
          const decimals = value.substring(dotIndex + 1);
          if (decimals.length >= 2 && value.length - dotIndex <= 3) {
            e.preventDefault();
            return;
          }
        }
        return;
      }

      e.preventDefault();
    },

    handleNumericInputhoursWeekendStart(event) {
      let value = event.target.value;

      // Allow only valid number input with up to two digits before and after the dot
      const formattedValue = value
        .replace(/[^0-9.]/g, "")
        .replace(/(\..*)\./g, "$1"); // Remove all non-digit/non-dot characters, and keep only the first dot if multiple are present

      const parts = formattedValue.split(".");
      let integerPart = parts[0] || "";
      let decimalPart = parts[1] || "";

      // Trim the integer part to a maximum of 2 digits
      if (integerPart.length > 2) {
        integerPart = integerPart.slice(0, 2);
      }

      // Trim the decimal part to a maximum of 2 digits
      if (decimalPart.length > 2) {
        decimalPart = decimalPart.slice(0, 2);
      }

      // Reconstruct the value
      const newValue = integerPart + (decimalPart ? "." + decimalPart : "");

      // Only update if the new value differs from the original to prevent unnecessary updates
      if (this.formData.qrShortLead.hoursWeekendStart !== newValue) {
        this.formData.qrShortLead.hoursWeekendStart = newValue;
      }
    },

    nameKeydownhoursWeekendEnd(e) {
      const value = this.formData.qrShortLead.hoursWeekendEnd;

      if (
        [
          "Backspace",
          "Tab",
          "Escape",
          "Enter",
          "ArrowLeft",
          "ArrowRight",
          "Home",
          "End"
        ].indexOf(e.key) !== -1 ||
        (e.key === "." && !value.includes(".")) ||
        // Allow Ctrl/cmd + A, C, V, X
        ((e.ctrlKey === true || e.metaKey === true) &&
          ["a", "c", "v", "x"].indexOf(e.key.toLowerCase()) !== -1) ||
        (e.key >= "0" && e.key <= "9") ||
        (e.key >= "Numpad0" && e.key <= "Numpad9")
      ) {
        // Prevent entering more than 2 digits after the decimal
        const dotIndex = value.indexOf(".");
        if (dotIndex !== -1 && e.key !== "Backspace") {
          const decimals = value.substring(dotIndex + 1);
          if (decimals.length >= 2 && value.length - dotIndex <= 3) {
            e.preventDefault();
            return;
          }
        }
        return;
      }

      e.preventDefault();
    },

    handleNumericInputhoursWeekendEnd(event) {
      let value = event.target.value;

      // Allow only valid number input with up to two digits before and after the dot
      const formattedValue = value
        .replace(/[^0-9.]/g, "")
        .replace(/(\..*)\./g, "$1"); // Remove all non-digit/non-dot characters, and keep only the first dot if multiple are present

      const parts = formattedValue.split(".");
      let integerPart = parts[0] || "";
      let decimalPart = parts[1] || "";

      // Trim the integer part to a maximum of 2 digits
      if (integerPart.length > 2) {
        integerPart = integerPart.slice(0, 2);
      }

      // Trim the decimal part to a maximum of 2 digits
      if (decimalPart.length > 2) {
        decimalPart = decimalPart.slice(0, 2);
      }

      // Reconstruct the value
      const newValue = integerPart + (decimalPart ? "." + decimalPart : "");

      // Only update if the new value differs from the original to prevent unnecessary updates
      if (this.formData.qrShortLead.hoursWeekendEnd !== newValue) {
        this.formData.qrShortLead.hoursWeekendEnd = newValue;
      }
    },

    savePartialAndEnableProceed() {
      // Call the method to save changes
      this.saveCurrentLeadChanges(this.formData);
    },

    saveCurrentLeadChanges(formData) {
      this.partialSaved = true;
      console.log("Save Partial button clicked");
      this.$v.formData.$touch();
      this.$v.iciciMarsRequest.merchant.$touch();
      if (this.$v.formData.$error || this.$v.iciciMarsRequest.merchant.$error) {
        this.$q.notify({
          color: "negative",
          position: "bottom",
          message: "Please fill all mandatory fields",
          icon: "info"
        });
        this.partialSaved = false;
      } else {
        this.$q.loading.show();
        let param = {
          id: this.formData.qrShortLead.id,
          request: this.formData.qrShortLead
        };

     return this.UPDATE_QR_DETAILS(param)
          .then(() => {
            this.setMarsData(this.formData);
            this.$q.loading.hide();
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Successfully Updated!",
              icon: "thumb_up"
            });
          })
          .catch(error => {
            this.$q.loading.hide();
            this.$q.notify({
              color: "negative",
              position: "bottom",
              message:
                error.body.message == null
                  ? "Please Try Again Later !"
                  : error.body.message,
              icon: "thumb_down"
            });
          });
      }
    },

      saveCurrentLeadChangesUpdate(formData) {
      this.partialSaved = true;
      // console.log("Save Partial button clicked");
      // this.$v.formData.$touch();
      // this.$v.iciciMarsRequest.merchant.$touch();
      // if (this.$v.formData.$error || this.$v.iciciMarsRequest.merchant.$error) {
      //   this.$q.notify({
      //     color: "negative",
      //     position: "bottom",
      //     message: "Please fill all mandatory fields",
      //     icon: "info"
      //   });
      //   this.partialSaved = false;
      // } else {
        this.$q.loading.show();
        let param = {
          id: this.formData.qrShortLead.id,
          request: this.formData.qrShortLead
        };

     return this.UPDATE_QR_DETAILS(param)
          .then(() => {
            this.setMarsData(this.formData);
            this.$q.loading.hide();
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Successfully Updated!",
              icon: "thumb_up"
            });
          })
          .catch(error => {
            this.$q.loading.hide();
            this.$q.notify({
              color: "negative",
              position: "bottom",
              message:
                error.body.message == null
                  ? "Please Try Again Later !"
                  : error.body.message,
              icon: "thumb_down"
            });
          });
      // }
    },
    onBlur() {
      this.$v.formData.qrShortLead.satToMarsRemarks.$touch();
      this.saveFieldData();
    },
    referBackAndEnableProceed() {
      this.referBackCurrentLeadChanges(this.formData);
    },
    referBackCurrentLeadChanges(formData) {
      this.partialSaved = true;
      console.log("Save Partial button clicked");
      this.$v.formData.$touch();
      this.$v.iciciMarsRequest.merchant.$touch();
      if (this.$v.formData.$error || this.$v.iciciMarsRequest.merchant.$error) {
        this.$q.notify({
          color: "negative",
          position: "bottom",
          message: "Please fill all mandatory fields",
          icon: "info"
        });
        this.partialSaved = false;
      } else {
        this.$q.loading.show();
        let param = {
          id: this.formData.qrShortLead.id,
          request: this.formData.qrShortLead
        };
        console.log("FORMDATA", JSON.stringify(this.formData));
        this.REFERBACK_SAT_TO_SO_QR_DETAILS(param)
          .then(() => {
            this.$router.push("/sat/staticQrLeads");
            this.setMarsData(this.formData);
            this.$q.loading.hide();
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Successfully Updated!",
              icon: "thumb_up"
            });
          })
          .catch(error => {
            this.$q.loading.hide();
            this.$q.notify({
              color: "negative",
              position: "bottom",
              message:
                error.body.message == null
                  ? "Please Try Again Later !"
                  : error.body.message,
              icon: "thumb_down"
            });
          });
      }
    },

    setMarsData(res) {
      console.log("setMarsData REQUEST ---->", res);
      console.log("setMarsData1 ---->", JSON.stringify(res));
      // self = this;
      // console.log("MARS DATA", JSON.stringify(self.propLeadDeatils));
      if (res.qrShortLead.isMerchant == 1) {
        this.iciciMarsRequest.merchant.mdrPlan.upiUpto2000.percentage =
          res.qrShortLead.smallMerchantLessThanTwoDebit;
        this.iciciMarsRequest.merchant.mdrPlan.upiAbove2000.percentage =
          res.qrShortLead.smallMerchantGreaterThanTwoDebit;
        this.iciciMarsRequest.merchant.mdrPlan.upiCreditUpto2000.percentage =
          res.qrShortLead.smallMerchantLessThanTwoCreditAndPrepaid;
        this.iciciMarsRequest.merchant.mdrPlan.upiCreditAbove2000.percentage =
          res.qrShortLead.smallMerchantGreaterThanTwoCreditAndPrepaid;
      } else if (res.qrShortLead.isMerchant == 2) {
        this.iciciMarsRequest.merchant.mdrPlan.upiUpto2000.percentage =
          res.qrShortLead.largeMerchantLessThanTwoDebit;
        this.iciciMarsRequest.merchant.mdrPlan.upiAbove2000.percentage =
          res.qrShortLead.largeMerchantGreaterThanTwoDebit;
        this.iciciMarsRequest.merchant.mdrPlan.upiCreditUpto2000.percentage =
          res.qrShortLead.largeMerchantLessThanTwoCreditandPrepaid;
        this.iciciMarsRequest.merchant.mdrPlan.upiCreditAbove2000.percentage =
          res.qrShortLead.largeMerchantGreaterThanTwoCreditandPrepaid;
      }
      this.fetchMarsDeviceDetails();
      this.iciciMarsRequest.merchant.companyInformation.mccname =
        res.qrShortLead.merchantIndustry.industryName;
      this.iciciMarsRequest.merchant.companyInformation.mcc =
        res.qrShortLead.merchantIndustry.mccCode;
      // console.log("GET SALES",this.getAllStaticQrShortLeadDatas.salesPersonName);
      //  console.log("GET RESS",res.qrShortLead.salesPersonName);

      this.iciciMarsRequest.merchant.salesInformation.salesPersonName =
        res.qrShortLead.salesPersonName;

      this.getAllStaticQrShortLeadDatas.createdBy.name +
        "-" +
        this.getAllStaticQrShortLeadDatas.createdBy.employeeID;
      this.iciciMarsRequest.merchant.salesInformation.region =
        res.qrShortLead.region.code;
      this.iciciMarsRequest.merchant.paymentDetails.rentalPlanCode =
        res.qrShortLead.marsRentalPlanName;
      this.iciciMarsRequest.merchant.paymentDetails.rentalMode =
        res.qrShortLead.rentalMode;
      this.iciciMarsRequest.merchant.paymentDetails.rentalType =
        res.qrShortLead.rentalType;
      this.iciciMarsRequest.merchant.companyInformation.contactEmail =
        res.qrShortLead.contactEmail;
      this.iciciMarsRequest.merchant.companyInformation.statementEmail =
        res.qrShortLead.contactEmail;
      this.iciciMarsRequest.merchant.companyInformation.contactMobile =
        res.qrShortLead.contactNumber;
      this.iciciMarsRequest.merchant.companyInformation.contactName =
        res.qrShortLead.contactName;
      this.iciciMarsRequest.merchant.companyInformation.contactPhone =
        "91" + res.qrShortLead.contactNumber;
      this.iciciMarsRequest.merchant.companyInformation.dbaName =
        res.qrShortLead.marketingName;
      this.iciciMarsRequest.merchant.companyInformation.legalName =
        res.qrShortLead.legalName;
      this.iciciMarsRequest.merchant.companyInformation.pan =
        res.qrShortLead.panNumber;
      this.iciciMarsRequest.merchant.companyInformation.registeredAddress =
        res.qrShortLead.contactAddress;
      this.iciciMarsRequest.merchant.companyInformation.registeredCityName =
        res.qrShortLead.city;
      this.iciciMarsRequest.merchant.companyInformation.registeredStateName =
        res.qrShortLead.state;

      this.iciciMarsRequest.merchant.companyInformation.residentCityName =
        res.qrShortLead.personalInfoCity;
      this.iciciMarsRequest.merchant.companyInformation.residentStateName =
        res.qrShortLead.personalInfoState;
      this.iciciMarsRequest.merchant.companyInformation.residentialPin =
        res.qrShortLead.personalInfoPincode;

      this.iciciMarsRequest.merchant.companyInformation.registeredCityRefCode =
        res.qrShortLead.merchantCityRefCode;
      this.iciciMarsRequest.merchant.companyInformation.registeredStateRefCode =
        res.qrShortLead.merchantStateRefCode;
      this.iciciMarsRequest.merchant.companyInformation.residentialCityRefCode =
        res.qrShortLead.merchantCityRefCode;
      this.iciciMarsRequest.merchant.companyInformation.residentialStateRefCode =
        res.qrShortLead.merchantStateRefCode;
      this.iciciMarsRequest.merchant.companyInformation.businessNature = this.businessNature;

      this.iciciMarsRequest.merchant.partnerInformation[0].cityRefCode =
        res.qrShortLead.personalCityRefCode;
      this.iciciMarsRequest.merchant.partnerInformation[0].stateRefCode =
        res.qrShortLead.personalStateRefCode;

      this.iciciMarsRequest.merchant.bankInformation.bankDetails.bankCityRefCode =
        res.qrShortLead.bankCityRefCode;
      this.iciciMarsRequest.merchant.bankInformation.bankDetails.bankStateRefCode =
        res.qrShortLead.bankStateRefCode;
      this.iciciMarsRequest.merchant.bankInformation.bankDetails.bankCityName =
        res.qrShortLead.bankCity;
      this.iciciMarsRequest.merchant.bankInformation.bankDetails.bankStateName =
        res.qrShortLead.bankState;

      this.iciciMarsRequest.merchant.companyInformation.registeredPin =
        res.qrShortLead.pincode;
      this.iciciMarsRequest.merchant.companyInformation.residentialAddress =
        res.qrShortLead.contactAddress;
      this.iciciMarsRequest.merchant.salesInformation.leadFrom =
        res.qrShortLead.leadSource.sourceName;
      this.iciciMarsRequest.merchant.bankInformation.bankDetails.accountNumber =
        res.qrShortLead.accountNumber;
      this.iciciMarsRequest.merchant.businessInformation.gstId =
        res.qrShortLead.gstNumber == "" ? null : res.qrShortLead.gstNumber;
      this.iciciMarsRequest.merchant.businessInformation.weekdayStartHour =
        res.qrShortLead.hoursWeekdayStart;
      this.iciciMarsRequest.merchant.businessInformation.weekdayEndHour =
        res.qrShortLead.hoursWeekdayEnd;
      this.iciciMarsRequest.merchant.businessInformation.weekendStartHour =
        res.qrShortLead.hoursWeekendStart;
      this.iciciMarsRequest.merchant.businessInformation.weekendEndHour =
        res.qrShortLead.hoursWeekendEnd;
      this.iciciMarsRequest.merchant.businessInformation.averageBillAmount =
        res.qrShortLead.averageBillAmount;
      this.iciciMarsRequest.merchant.businessInformation.maximumMonthlyUsage =
        res.qrShortLead.maximumUsageMonthly;
      this.iciciMarsRequest.merchant.companyInformation.contactAlternateMobile =
        res.qrShortLead.merchantIndustry.alternateContactNumber;
      this.iciciMarsRequest.merchant.paymentDetails.recurringFees =
        res.qrShortLead.recurringFees;
      this.iciciMarsRequest.merchant.companyInformation.establishYear =
        res.qrShortLead.establishmentYear;
      this.iciciMarsRequest.merchant.partnerInformation[0].address =
        res.qrShortLead.personalAddress;
      this.iciciMarsRequest.merchant.partnerInformation[0].pan =
        res.qrShortLead.panNumber;
      this.iciciMarsRequest.merchant.partnerInformation[0].pin =
        res.qrShortLead.personalInfoPincode;
      this.iciciMarsRequest.merchant.partnerInformation[0].dob =
        res.qrShortLead.dateOfBirth;
      this.iciciMarsRequest.merchant.partnerInformation[0].contactMobile =
        res.qrShortLead.personalInfoMobile;
      this.iciciMarsRequest.merchant.partnerInformation[0].contactEmail =
        res.qrShortLead.personalInfoEmail;
      this.iciciMarsRequest.merchant.partnerInformation[0].cityRefLabel =
        res.qrShortLead.personalInfoCity;
      this.iciciMarsRequest.merchant.partnerInformation[0].stateRefLabel =
        res.qrShortLead.personalInfoState;
      this.iciciMarsRequest.merchant.partnerInformation[0].name =
        res.qrShortLead.firstName;
      this.iciciMarsRequest.merchant.bankInformation.bankDetails.ifsc =
        res.qrShortLead.ifscCode;
      this.iciciMarsRequest.merchant.bankInformation.bankDetails.bankName =
        res.qrShortLead.bankName;
      this.iciciMarsRequest.merchant.bankInformation.bankDetails.branchName =
        res.qrShortLead.branchName;
      this.iciciMarsRequest.merchant.bankInformation.bankDetails.branchCode =
        res.qrShortLead.branchCode;
      this.iciciMarsRequest.merchant.bankInformation.bankDetails.branchZone =
        res.qrShortLead.branchZone;
      this.iciciMarsRequest.merchant.bankInformation.collectionDetails.chequeNumber =
        res.qrShortLead.chequeNumber == ""
          ? res.qrShortLead.utrNumber
          : res.qrShortLead.chequeNumber;
      this.iciciMarsRequest.merchant.bankInformation.collectionDetails.neftId =
        res.qrShortLead.neftId == "" ? "" : res.qrShortLead.neftId;
      this.iciciMarsRequest.merchant.remarks = res.qrShortLead.satToMarsRemarks;
      this.iciciMarsRequest.merchant.bankInformation.collectionDetails.chequeAmount =
        res.qrShortLead.amountCollected;
      this.iciciMarsRequest.merchant.bankInformation.collectionDetails.acquirerBank =
        res.qrShortLead.paymentBankName;
      // console.log( "this.iciciMarsRequest.merchant.bankInformation.collectionDetails.chequeNumber -----qwe122323454",
      //   this.iciciMarsRequest.merchant.bankInformation.collectionDetails.chequeNumber);
    },
    // verfifiedStatus(){
    // },

    // fetchAndCookDocuments() {
    //   let self = this;
    //   let leadData = self.propLeadDeatils;
    //   _.map(leadData.qrLeadDocuments, function(oo) {
    //     if (oo.uploadedDocuments.length > 0) {
    //       let assumeArr = [];
    //       _.map(oo.uploadedDocuments, function(doc) {
    //         assumeArr.push(self.GLOBAL_FILE_FETCH_URL + "/" + doc.fileName);
    //       });
    //       if (self.count <= 1) {
    //         self.iciciMarsRequest.merchant.kyc.documents.push({
    //           documentName: oo.subDocumentType,
    //           documentType: oo.marsDocumentId,
    //           documentImage: assumeArr
    //         });
    //       }
    //       console.log(
    //         "KYC LOG",
    //         JSON.stringify(self.iciciMarsRequest.merchant.kyc.documents)
    //       );
    //     }
    //   });
    //   if (self.propLeadDeatils != null) {
    //     leadData.qrLeadDocuments.forEach(function(val) {
    //       console.log("LOG STATUS", JSON.stringify(val.documentVerifiedStatus));
    //       if (val.documentVerifiedStatus != 1) {
    //         self.flag = true;
    //         console.log("CHECK FLAG1", self.flag);
    //       } else {
    //         self.flag = false;
    //         console.log("CHECK FLAG3", self.flag);
    //       }
    //     });
    //   }
    // }

    // fetchAndCookDocuments() {
    //   let self = this;

    //   let leadData = self.propLeadDeatils;
    //   _.map(leadData.qrLeadDocuments, function (oo) {
    //     if (oo.uploadedDocuments.length > 0) {
    //       let assumeArr = [];
    //       _.map(oo.uploadedDocuments, function (doc) {
    //         assumeArr.push(self.GLOBAL_FILE_FETCH_URL + "/" + doc.fileName);
    //       });
    //       if (self.count <= 1) {
    //         self.iciciMarsRequest.merchant.kyc.documents.push({
    //           documentName: oo.subDocumentType,
    //           documentType: oo.marsDocumentId,
    //           documentImage: assumeArr,
    //         });
    //       }
    //       console.log(
    //         "KYC LOG",
    //         JSON.stringify(self.iciciMarsRequest.merchant.kyc.documents)
    //       );
    //     }
    //   });
    //   self.iciciMarsRequest.merchant.kyc.documents.push({
    //     documentName: "Agreement",
    //     documentType: this.propLeadDeatils.qrMerchantType.marsAgreementId,
    //     documentImage: [
    //       self.GLOBAL_FILE_FETCH_URL + "/" + self.propLeadDeatils.aggrementForm,
    //     ],
    //   });
    //   self.iciciMarsRequest.merchant.kyc.documents.push({
    //     documentName: "Cheque",
    //     documentType: 7,
    //     documentImage: [
    //       self.GLOBAL_FILE_FETCH_URL + "/" + self.propLeadDeatils.chequeLeafForm,
    //     ],
    //   });
    //   if (self.propLeadDeatils != null) {
    //     leadData.qrLeadDocuments.forEach(function (val) {
    //       console.log("LOG STATUS", JSON.stringify(val.documentVerifiedStatus));
    //       if (val.documentVerifiedStatus != 1) {
    //         self.flag = true;
    //         console.log("CHECK FLAG1", self.flag);
    //       } else {
    //         self.flag = false;
    //         console.log("CHECK FLAG3", self.flag);
    //       }
    //     });
    //   }
    //   this.setMarsData();
    // },

    fetchAndCookDocuments() {
      let self = this;
      self.iciciMarsRequest.merchant.kyc.documents = []; // Reset documents array

      let leadData = self.propLeadDeatils;
      console.log(
        "iciciMarsRequest.merchant.kyc.documents-------->>>>",
        this.leadData
      );
      console.log(
        "this.propLeadDeatils.qrMerchantType.marsAgreementId-------->>>>",
        this.propLeadDeatils.qrMerchantType.marsAgreementId
      );

      leadData.qrLeadDocuments.forEach(oo => {
        if (oo.uploadedDocuments.length > 0) {
          let assumeArr = oo.uploadedDocuments.map(
            doc => self.GLOBAL_FILE_FETCH_URL + "/" + doc.fileName
          );
          self.iciciMarsRequest.merchant.kyc.documents.push({
            documentName: oo.subDocumentType,
            documentType: oo.marsDocumentId,
            documentImage: assumeArr
          });
        }
      });
      // Add Agreement document
      self.iciciMarsRequest.merchant.kyc.documents.push({
        documentName: "Agreement",
        documentType: this.propLeadDeatils.qrMerchantType.marsAgreementId,
        documentImage: [
          self.GLOBAL_FILE_FETCH_URL + "/" + self.propLeadDeatils.aggrementForm
        ]
      });
      // Add Cheque document
      if (
        this.getAllStaticQrShortLeadDatas.qrMerchantType.merchantTypeName ==
        "Individuals"
      ) {
        self.iciciMarsRequest.merchant.kyc.documents.push({
          documentName: "Cheque",
          documentType: 7,
          documentImage: [
            self.GLOBAL_FILE_FETCH_URL +
              "/" +
              self.propLeadDeatils.chequeLeafForm
          ]
        });
      } else if (
        this.getAllStaticQrShortLeadDatas.qrMerchantType.merchantTypeName ==
        "Sole Proprietorship"
      ) {
        self.iciciMarsRequest.merchant.kyc.documents.push({
          documentName: "Cheque",
          documentType: 33,
          documentImage: [
            self.GLOBAL_FILE_FETCH_URL +
              "/" +
              self.propLeadDeatils.chequeLeafForm
          ]
        });
      } else if (
        this.getAllStaticQrShortLeadDatas.qrMerchantType.merchantTypeName ==
        "Partnership / LLP"
      ) {
        self.iciciMarsRequest.merchant.kyc.documents.push({
          documentName: "Cheque",
          documentType: 45,
          documentImage: [
            self.GLOBAL_FILE_FETCH_URL +
              "/" +
              self.propLeadDeatils.chequeLeafForm
          ]
        });
      } else if (
        this.getAllStaticQrShortLeadDatas.qrMerchantType.merchantTypeName ==
        "Public & Private"
      ) {
        self.iciciMarsRequest.merchant.kyc.documents.push({
          documentName: "Cheque",
          documentType: 73,
          documentImage: [
            self.GLOBAL_FILE_FETCH_URL +
              "/" +
              self.propLeadDeatils.chequeLeafForm
          ]
        });
      } else if (
        this.getAllStaticQrShortLeadDatas.qrMerchantType.merchantTypeName ==
        "Society"
      ) {
        self.iciciMarsRequest.merchant.kyc.documents.push({
          documentName: "Cheque",
          documentType: 88,
          documentImage: [
            self.GLOBAL_FILE_FETCH_URL +
              "/" +
              self.propLeadDeatils.chequeLeafForm
          ]
        });
      } else if (
        this.getAllStaticQrShortLeadDatas.qrMerchantType.merchantTypeName ==
        "Trust"
      ) {
        self.iciciMarsRequest.merchant.kyc.documents.push({
          documentName: "Cheque",
          documentType: 104,
          documentImage: [
            self.GLOBAL_FILE_FETCH_URL +
              "/" +
              self.propLeadDeatils.chequeLeafForm
          ]
        });
      } else if (
        this.getAllStaticQrShortLeadDatas.qrMerchantType.merchantTypeName ==
        "Private & Public"
      ) {
        self.iciciMarsRequest.merchant.kyc.documents.push({
          documentName: "Cheque",
          documentType: 138,
          documentImage: [
            self.GLOBAL_FILE_FETCH_URL +
              "/" +
              self.propLeadDeatils.chequeLeafForm
          ]
        });
      } else if (
        this.getAllStaticQrShortLeadDatas.qrMerchantType.merchantTypeName ==
        "GOVT"
      ) {
        self.iciciMarsRequest.merchant.kyc.documents.push({
          documentName: "Cheque",
          documentType: 161,
          documentImage: [
            self.GLOBAL_FILE_FETCH_URL +
              "/" +
              self.propLeadDeatils.chequeLeafForm
          ]
        });
      }

      // else {
      //   self.iciciMarsRequest.merchant.kyc.documents.push({
      //     documentName: "Cheque",
      //     documentType: 33,
      //     documentImage: [
      //       self.GLOBAL_FILE_FETCH_URL +
      //         "/" +
      //         self.propLeadDeatils.chequeLeafForm
      //     ]
      //   });
      // }
      // Check document verification status
      if (self.propLeadDeatils != null) {
        leadData.qrLeadDocuments.forEach(val => {
          if (val.documentVerifiedStatus != 1) {
            self.flag = true;
          } else {
            self.flag = false;
          }
        });
      }
      this.setMarsData();
    }
  }
};
</script>
<style>
.error-highlight {
  background-color: #ffffff;
  color: red;
}
.remarksbtn {
  width: 84px;
}
.alignbtn {
  margin-right: 313px;
}
/* .cardsizealign {
  width: 130%;
}
.cardsizealign1 {
  width: 130%;
} */
.description-header,
.description-cell {
  font-size: smaller;
  padding-right: 197px;
}
.description-header1,
.description-cell {
  font-size: smaller;
  padding-right: 181px;
}
.description-header2,
.description-cell {
  font-size: smaller;
}
.description-header {
  padding-right: 100px; /* Adjust the padding as needed */
}
.mdr-header {
  color: rgb(19, 18, 18);
  white-space: nowrap;
}
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
