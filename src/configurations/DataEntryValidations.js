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
} from "@vuelidate/validators";
import { helpers } from "@vuelidate/validators";
const panCard = helpers.regex(
  "panCard",
  /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/
);

const gstn = helpers.regex(
  "gstn",
  // /^([0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-7]{1})([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9]{1})+$/
  /^([0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-7]{1})([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[1-9a-zA-Z]{1})+$/
);

// 4 alphabets, 5 numbers, 1 number
const tanValidate = helpers.regex("tanValidate", /[A-Za-z]{4}\d{5}[A-Za-z]{1}/);
const timeValidate = helpers.regex(
  "timeValidate",
  /^(?:\d|[01]\d|2[0-3])\.[0-5]\d$/
);

// const alphaNumericValidate = helpers.regex(
//   "alphaNumericValidate",
//   /^[a-zA-Z ]*$/
// );
const alphaNumericValidate = helpers.regex(
  "alphaNumericValidate",
  /^(?:[A-Za-z]+)(?:[A-Za-z0-9 _]*)$/
);
export const VALIDATION = {
  merchant: {
    salesInformation: {
      institutionCode: {
        required,
      },
      applicationType: {
        required,
      },
      applicationNumber: {
        required,
        alphaNum,
      },
      applicationDate: {
        required,
      },
      aggreementDate: {
        required,
      },
      salesPersonCode: {
        required,
      },
      region: {
        required,
      },
      merchantType: {
        required,
      },
      categoryType: {
        required,
      },
      leadFrom: {
        required,
      },
      sharingPartnerCode: {
        required: requiredIf(function() {
          return (
            this.getTransctionValueModel === true || this.getCashAtPos === true
          );
        }),
      },
      dailyFixedAmount: {
        required: requiredIf(function() {
          return this.getTransctionValueModel === true;
        }),
        decimal,
        minValue: minValue(0),
        maxValue: maxValue(99999.99),
        minLength: minLength(2),
        maxLength: maxLength(7),
      },
      loanDisbursementPercentage: {
        required: requiredIf(function() {
          return this.getTransctionValueModel === true;
        }),
        decimal,
        minValue: minValue(0),
        maxValue: maxValue(100),
      },
      loanDisbursementAmount: {
        required: requiredIf(function() {
          return this.getTransctionValueModel === true;
        }),
        decimal,
        minValue: minValue(0),
        maxValue: maxValue(99999999.99),
        maxLength: maxLength(10),
        minLength: minLength(2),
      },
      loanDisbursementDate: {
        required: requiredIf(function() {
          return this.getTransctionValueModel === true;
        }),
      },
      tenureMonth: {
        required: requiredIf(function() {
          return this.getTransctionValueModel === true;
        }),
        integer,
        minValue: minValue(0),
      },
      tenureDay: {
        required: requiredIf(function() {
          return this.getTransctionValueModel === true;
        }),
        integer,
        minValue: minValue(0),
      },
      tenureStartDate: {
        required: requiredIf(function() {
          return this.getTransctionValueModel === true;
        }),
      },
      rentPercentage: {
        required: requiredIf(function() {
          return this.getCashAtPos === true;
        }),
        maxValue: maxValue(100),
        decimal,
        minValue: minValue(0),
      },
      rentFixed: {
        required: requiredIf(function() {
          return this.getCashAtPos === true;
        }),
        decimal,
        minValue: minValue(0),
      },
    },
    companyInformation: {
      legalName: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(120),
        alphaNumericValidate,
      },
      dbaName: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(120),
        alphaNumericValidate,
      },
      registeredAddress: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(250),
      },
      registeredPin: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(6),
      },
      registeredCityRefCode: {
        required,
        integer,
      },
      registeredCityName: {
        required,
      },
      registeredStateRefCode: {
        required,
        integer,
      },
      registeredStateName: {
        required,
      },
      constitution: {
        required,
      },
      establishYear: {
        required,
      },
      registerNumber: {
        alphaNum,
        minLength: minLength(2),
        maxLength: maxLength(20),
      },

      mccname: {
        required,
      },
      mcc: {
        required,
      },
      residentialAddress: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(250),
      },
      residentialPin: {
        required,
        integer,
        minLength: minLength(6),
        maxLength: maxLength(6),
      },
      residentCityName: {
        required,
      },
      residentialCityRefCode: {
        required,
        integer,
      },
      residentStateName: {
        required,
      },
      residentialStateRefCode: {
        required,
        integer,
      },
      pan: {
        required,
        panCard,
        maxLength: maxLength(10),
        minLength: minLength(10),
      },
      tin: {
        required: false,
        integer,
        minLength: minLength(9),
        maxLength: maxLength(12),
      },
      tan: {
        required: false,
        maxLength: maxLength(10),
        minLength: minLength(10),
        tanValidate,
      },
      contactName: {
        required,
        alphaNumericValidate,
      },
      contactMobile: {
        numeric,
        required,
        minLength: minLength(10),
        maxLength: maxLength(10),
      },
      contactAlternateMobile: {
        numeric,
        minLength: minLength(10),
        maxLength: maxLength(10),
      },
      contactPhone: {
        numeric,
        required,
        minLength: minLength(12),
        maxLength: maxLength(12),
      },
      contactEmail: {
        required,
        email,
      },
      statementEmail: {
        required: requiredIf(function() {
          return this.getStatementType === true;
        }),
        email,
      },
      statementType: {
        required,
      },
      statementFrequency: {
        required,
      },
    },
    businessInformation: {
      gstId: {
        // required,
        // gstn,
        maxLength: maxLength(15),
        minLength: minLength(15),
      },
      weekendEndHour: {
        timeValidate,
      },
      weekendStartHour: {
        timeValidate,
      },
      weekdayEndHour: {
        timeValidate,
      },
      weekdayStartHour: {
        timeValidate,
      },
      memberSince: {
        // Removing the validation as per client request
        required: false,
      },
      debitCardMdr: {
        decimal,
        minValue: minValue(0),
        maxValue: maxValue(99.99),
      },
      creditCardMdr: {
        decimal,
        minValue: minValue(0),
        maxValue: maxValue(99.99),
      },
      expectedCardBusiness: {
        decimal,
        minValue: minValue(0),
        maxValue: maxValue(9999999999.99),
      },
      averageBillAmount: {
        decimal,
        minValue: minValue(0),
        maxValue: maxValue(9999999999.99),
      },
      lastTurnoverAmount: {
        decimal,
        minValue: minValue(0),
        maxValue: maxValue(9999999999.99),
      },
      lastTurnoverYear: {
        integer,
        minValue: minValue(0),
        maxValue: maxValue(2018),
        minLength: minLength(4),
        maxLength: maxLength(4),
      },
    },
    paymentDetails: {
      installationFee: {
        required: requiredIf(function() {
          return this.getRentalTypeVisibilityForRental === true;
        }),
        decimal,
        minValue: minValue(0),
        maxValue: maxValue(999999.99),
        minLength: minLength(1),
        maxLength: maxLength(12),
      },
      serviceProvider: {
        required,
      },
      networkPreferred: {
        required,
      },
      terminalModeCode: {
        required,
      },
      devicePrice: {
        decimal,
        minValue: minValue(0),
        maxValue: maxValue(999999.99),
        minLength: minLength(2),
        maxLength: maxLength(8),
      },
      otherCharges: {
        decimal,
        minValue: minValue(0),
        maxValue: maxValue(999999),
        minLength: minLength(2),
        maxLength: maxLength(8),
      },
      totalAmountPaid: {
        decimal,
        minValue: minValue(0),
        maxValue: maxValue(999999),
        minLength: minLength(2),
        maxLength: maxLength(12),
      },
      numberOfTerminals: {
        numeric,
        minValue: minValue(1),
        maxValue: maxValue(100),
      },
      deviceOwnedBy: {
        required,
      },
      cashAtPosEnabled: {
        required,
      },
      rentalType: {
        required,
      },
      advanceRentCollected: {
        required: requiredIf(function() {
          return this.getRentalTypeVisibilityForAdvanced === true;
        }),
        decimal,
        minValue: minValue(0),
        maxValue: maxValue(999999),
        minLength: minLength(2),
        maxLength: maxLength(8),
      },
      advanceRentMode: {
        required: requiredIf(function() {
          return this.getRentalTypeVisibilityForAdvanced === true;
        }),
      },
      noOfMonthRentPaidInAdvance: {
        required: requiredIf(function() {
          return this.getRentalTypeVisibilityForAdvanced === true;
        }),
        minValue: minValue(0),
        maxValue: maxValue(999999),
        minLength: minLength(1),
        maxLength: maxLength(8),
      },
      gracePeriod: {
        required: requiredIf(function() {
          return this.getRentalTypeVisibilityForRental === true;
        }),
        minValue: minValue(0),
        maxValue: maxValue(999999),
        minLength: minLength(1),
        maxLength: maxLength(8),
      },
    },
    bankInformation: {
      bankDetails: {
        ifsc: {
          required,
          alphaNum,
          maxLength: maxLength(11),
        },
        micr: {
          required,
          numeric,
          minLength: minLength(9),
          maxLength: maxLength(9),
        },
        branchName: {
          required,
        },
        bankName: {
          required,
        },
        bankCityName: {
          required,
        },
        bankCityRefCode: {
          required,
          numeric,
        },
        accountNumber: {
          required,
          numeric,
          minLength: minLength(6),
          maxLength: maxLength(19),
        },
        bankStateName: {
          required,
        },
        bankStateRefCode: {
          required,
          numeric,
        },
        paymentMode: {
          required,
        },
        accountType: {
          required,
        },
        settlementOrNeftFee: {
          required: requiredIf(function() {
            return this.getfeeTypeForSettlementVisibility === true;
          }),
          integer,
          maxValue: maxValue(999),
          minValue: minValue(0),
        },
      },
      collectionDetails: {
        collectedDate: {
          required: requiredIf(function() {
            return this.bankInfoSwipePayment === true;
          }),
        },
        swipeAmount: {
          decimal,
          required: requiredIf(function() {
            return this.bankInfoSwipePayment === true;
          }),
          minValue: minValue(0),
        },
        swipeTerminal: {
          required: requiredIf(function() {
            return this.bankInfoSwipePayment === true;
          }),
        },
        chequeAmount: {
          decimal,
          required: requiredIf(function() {
            return this.bankInfoChequePayment === true;
          }),
          minValue: minValue(0),
        },
        chequeNumber: {
          alphaNum,
          required: requiredIf(function() {
            return this.bankInfoChequePayment === true;
          }),
          minLength: minLength(6),
          maxLength: maxLength(25),
        },
        chequeDate: {
          required: requiredIf(function() {
            return this.bankInfoChequePayment === true;
          }),
        },
        chequeDepositedDate: {
          required: requiredIf(function() {
            return this.bankInfoChequePayment === true;
          }),
        },
      },
    },
    kyc: {
      documents: [],
    },
    mdrPlan: {
      domesticDebitUpTo2000: {
        fixed: {
          minValue: minValue(0),
          decimal,
          required,
        },
        percentage: {
          minValue: minValue(0),
          required,
          maxValue: maxValue(100),
        },
        minimum: {
          minValue: minValue(0),
          decimal,
          required,
        },
      },
      domesticDebitAbove2000: {
        fixed: {
          minValue: minValue(0),
          decimal,
          required,
        },
        percentage: {
          minValue: minValue(0),
          maxValue: maxValue(100),
          decimal,
          required,
        },
        minimum: {
          minValue: minValue(0),
          decimal,
          required,
        },
      },
      standardOrClassic: {
        fixed: {
          minValue: minValue(0),
          decimal,
          required,
        },
        percentage: {
          minValue: minValue(0),
          maxValue: maxValue(100),
          decimal,
          required,
        },
        minimum: {
          minValue: minValue(0),
          decimal,
          required,
        },
      },
      premiumOrPlatinum: {
        fixed: {
          minValue: minValue(0),
          decimal,
          required,
        },
        percentage: {
          minValue: minValue(0),
          maxValue: maxValue(100),
          decimal,
          required,
        },
        minimum: {
          minValue: minValue(0),
          decimal,
          required,
        },
      },
      superPremiumOrSignature: {
        fixed: {
          minValue: minValue(0),
          decimal,
          required,
        },
        percentage: {
          minValue: minValue(0),
          maxValue: maxValue(100),
          decimal,
          required,
        },
        minimum: {
          minValue: minValue(0),
          decimal,
          required,
        },
      },
      commercialOrCorporate: {
        fixed: {
          minValue: minValue(0),
          decimal,
          required,
        },
        percentage: {
          minValue: minValue(0),
          maxValue: maxValue(100),
          decimal,
          required,
        },
        minimum: {
          minValue: minValue(0),
          decimal,
          required,
        },
      },
      internationalDebitCard: {
        fixed: {
          minValue: minValue(0),
          decimal,
          required,
        },
        percentage: {
          minValue: minValue(0),
          maxValue: maxValue(100),
          decimal,
          required,
        },
        minimum: {
          minValue: minValue(0),
          decimal,
          required,
        },
      },
      internationalCreditCard: {
        fixed: {
          minValue: minValue(0),
          decimal,
          required,
        },
        percentage: {
          minValue: minValue(0),
          maxValue: maxValue(100),
          decimal,
          required,
        },
        minimum: {
          minValue: minValue(0),
          decimal,
          required,
        },
      },
      onus: {
        fixed: {
          minValue: minValue(0),
          decimal,
          required,
        },
        percentage: {
          minValue: minValue(0),
          maxValue: maxValue(100),
          decimal,
          required,
        },
        minimum: {
          minValue: minValue(0),
          decimal,
          required,
        },
      },
      mVisa: {
        fixed: {
          minValue: minValue(0),
          decimal,
          required,
        },
        percentage: {
          minValue: minValue(0),
          maxValue: maxValue(100),
          decimal,
          required,
        },
        minimum: {
          minValue: minValue(0),
          decimal,
          required,
        },
      },
      masterPass: {
        fixed: {
          minValue: minValue(0),
          decimal,
          required,
        },
        percentage: {
          minValue: minValue(0),
          maxValue: maxValue(100),
          decimal,
          required,
        },
        minimum: {
          minValue: minValue(0),
          decimal,
          required,
        },
      },
      cashAtPos: {
        fixed: {
          minValue: minValue(0),
          decimal,
          required,
        },
        percentage: {
          minValue: minValue(0),
          maxValue: maxValue(100),
          decimal,
          required,
        },
        minimum: {
          minValue: minValue(0),
          decimal,
          required,
        },
      },
    },
    SharingDiscountFee: {
      domesticDebitUpTo2000: {
        fixed: {
          minValue: minValue(0),
          decimal,
          required: requiredIf(function() {
            return this.showOnlyIfSharingModelIsEnabled === true;
          }),
        },
        percentage: {
          minValue: minValue(0),
          required: requiredIf(function() {
            return this.showOnlyIfSharingModelIsEnabled === true;
          }),
          maxValue: maxValue(100),
        },
        minimum: {
          minValue: minValue(0),
          decimal,
          required: requiredIf(function() {
            return this.showOnlyIfSharingModelIsEnabled === true;
          }),
        },
      },
      domesticDebitAbove2000: {
        fixed: {
          minValue: minValue(0),
          decimal,
          required: requiredIf(function() {
            return this.showOnlyIfSharingModelIsEnabled === true;
          }),
        },
        percentage: {
          minValue: minValue(0),
          maxValue: maxValue(100),
          decimal,
          required: requiredIf(function() {
            return this.showOnlyIfSharingModelIsEnabled === true;
          }),
        },
        minimum: {
          minValue: minValue(0),
          decimal,
          required: requiredIf(function() {
            return this.showOnlyIfSharingModelIsEnabled === true;
          }),
        },
      },
      standardOrClassic: {
        fixed: {
          minValue: minValue(0),
          decimal,
          required: requiredIf(function() {
            return this.showOnlyIfSharingModelIsEnabled === true;
          }),
        },
        percentage: {
          minValue: minValue(0),
          maxValue: maxValue(100),
          decimal,
          required: requiredIf(function() {
            return this.showOnlyIfSharingModelIsEnabled === true;
          }),
        },
        minimum: {
          minValue: minValue(0),
          decimal,
          required: requiredIf(function() {
            return this.showOnlyIfSharingModelIsEnabled === true;
          }),
        },
      },
      premiumOrPlatinum: {
        fixed: {
          minValue: minValue(0),
          decimal,
          required: requiredIf(function() {
            return this.showOnlyIfSharingModelIsEnabled === true;
          }),
        },
        percentage: {
          minValue: minValue(0),
          maxValue: maxValue(100),
          decimal,
          required: requiredIf(function() {
            return this.showOnlyIfSharingModelIsEnabled === true;
          }),
        },
        minimum: {
          minValue: minValue(0),
          decimal,
          required: requiredIf(function() {
            return this.showOnlyIfSharingModelIsEnabled === true;
          }),
        },
      },
      superPremiumOrSignature: {
        fixed: {
          minValue: minValue(0),
          decimal,
          required: requiredIf(function() {
            return this.showOnlyIfSharingModelIsEnabled === true;
          }),
        },
        percentage: {
          minValue: minValue(0),
          maxValue: maxValue(100),
          decimal,
          required: requiredIf(function() {
            return this.showOnlyIfSharingModelIsEnabled === true;
          }),
        },
        minimum: {
          minValue: minValue(0),
          decimal,
          required: requiredIf(function() {
            return this.showOnlyIfSharingModelIsEnabled === true;
          }),
        },
      },
      commercialOrCorporate: {
        fixed: {
          minValue: minValue(0),
          decimal,
          required: requiredIf(function() {
            return this.showOnlyIfSharingModelIsEnabled === true;
          }),
        },
        percentage: {
          minValue: minValue(0),
          maxValue: maxValue(100),
          decimal,
          required: requiredIf(function() {
            return this.showOnlyIfSharingModelIsEnabled === true;
          }),
        },
        minimum: {
          minValue: minValue(0),
          decimal,
          required: requiredIf(function() {
            return this.showOnlyIfSharingModelIsEnabled === true;
          }),
        },
      },
      internationalDebitCard: {
        fixed: {
          minValue: minValue(0),
          decimal,
          required: requiredIf(function() {
            return this.showOnlyIfSharingModelIsEnabled === true;
          }),
        },
        percentage: {
          minValue: minValue(0),
          maxValue: maxValue(100),
          decimal,
          required: requiredIf(function() {
            return this.showOnlyIfSharingModelIsEnabled === true;
          }),
        },
        minimum: {
          minValue: minValue(0),
          decimal,
          required: requiredIf(function() {
            return this.showOnlyIfSharingModelIsEnabled === true;
          }),
        },
      },
      internationalCreditCard: {
        fixed: {
          minValue: minValue(0),
          decimal,
          required: requiredIf(function() {
            return this.showOnlyIfSharingModelIsEnabled === true;
          }),
        },
        percentage: {
          minValue: minValue(0),
          maxValue: maxValue(100),
          decimal,
          required: requiredIf(function() {
            return this.showOnlyIfSharingModelIsEnabled === true;
          }),
        },
        minimum: {
          minValue: minValue(0),
          decimal,
          required: requiredIf(function() {
            return this.showOnlyIfSharingModelIsEnabled === true;
          }),
        },
      },
      onus: {
        fixed: {
          minValue: minValue(0),
          decimal,
          required: requiredIf(function() {
            return this.showOnlyIfSharingModelIsEnabled === true;
          }),
        },
        percentage: {
          minValue: minValue(0),
          maxValue: maxValue(100),
          decimal,
          required: requiredIf(function() {
            return this.showOnlyIfSharingModelIsEnabled === true;
          }),
        },
        minimum: {
          minValue: minValue(0),
          decimal,
          required: requiredIf(function() {
            return this.showOnlyIfSharingModelIsEnabled === true;
          }),
        },
      },
      mVisa: {
        fixed: {
          minValue: minValue(0),
          decimal,
          required: requiredIf(function() {
            return this.showOnlyIfSharingModelIsEnabled === true;
          }),
        },
        percentage: {
          minValue: minValue(0),
          maxValue: maxValue(100),
          decimal,
          required: requiredIf(function() {
            return this.showOnlyIfSharingModelIsEnabled === true;
          }),
        },
        minimum: {
          minValue: minValue(0),
          decimal,
          required: requiredIf(function() {
            return this.showOnlyIfSharingModelIsEnabled === true;
          }),
        },
      },
      masterPass: {
        fixed: {
          minValue: minValue(0),
          decimal,
          required: requiredIf(function() {
            return this.showOnlyIfSharingModelIsEnabled === true;
          }),
        },
        percentage: {
          minValue: minValue(0),
          maxValue: maxValue(100),
          decimal,
          required: requiredIf(function() {
            return this.showOnlyIfSharingModelIsEnabled === true;
          }),
        },
        minimum: {
          minValue: minValue(0),
          decimal,
          required: requiredIf(function() {
            return this.showOnlyIfSharingModelIsEnabled === true;
          }),
        },
      },
      cashAtPos: {
        fixed: {
          minValue: minValue(0),
          decimal,
          required: requiredIf(function() {
            return this.showOnlyIfSharingModelIsEnabled === true;
          }),
        },
        percentage: {
          minValue: minValue(0),
          maxValue: maxValue(100),
          decimal,
          required: requiredIf(function() {
            return this.showOnlyIfSharingModelIsEnabled === true;
          }),
        },
        minimum: {
          minValue: minValue(0),
          decimal,
          required: requiredIf(function() {
            return this.showOnlyIfSharingModelIsEnabled === true;
          }),
        },
      },
    },
  },
  viewBinding: {
    partnersArr: {
      required: requiredIf(function() {
        return this.getPartnersVisiblity;
      }),
      $each: {
        name: {
          required,
          minLength: minLength(2),
          maxLength: maxLength(120),
          alphaNumericValidate,
        },
        address: {
          minLength: minLength(2),
          maxLength: maxLength(120),
          required,
        },
        pan: {
          required,
          panCard,
          maxLength: maxLength(10),
          minLength: minLength(10),
        },
        pin: {
          required,
          integer,
          minLength: minLength(6),
          maxLength: maxLength(7),
        },
        stateRefCode: {
          required,
          integer,
        },
        stateRefLabel: {
          required,
        },
        cityRefCode: {
          required,
          integer,
        },
        cityRefLabel: {
          required,
        },
        contactMobile: {
          required,
          integer,
          minLength: minLength(10),
          maxLength: maxLength(10),
        },
        contactEmail: {
          required,
          email,
        },
      },
    },
  },
};
