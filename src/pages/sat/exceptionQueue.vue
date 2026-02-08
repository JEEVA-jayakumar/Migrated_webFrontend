    <template>
  <q-page>
    <q-pull-to-refresh :distance="30" :handler="PullToRefresh" inline>
      <div class="row">
        <div
          class="col-md-12 text-h6 q-px-lg q-py-md text-weight-regular text-grey-9 bottom-border"
        >Exception Queue</div>
        <div class="col-md-4 col-sm-12 col-xs-12">
          <!-- KYC exception queue header -->
          <q-card
            :class="[$route.params.id == 1?'seriousActive border-blue':'']"
            class="shadow-0 q-ma-md"
          >
            <div class="row">
              <div class="col-md-12 col-sm-12 col-xs-12">
                <q-item class="bg-light-blue relative-position">
                  <q-item-section>
                    <q-item-label label text-color="grey-12">KYC exceptions queue</q-item-label>
                  </q-item-section>
                  <q-item-section>
                    <q-btn
                      round
                      color="grey-12"
                      class="shadow-5"
                      style="border: 3px solid rgb(32, 169, 244);"
                      text-color="light-blue"
                    >{{getExceptionQueueInfo.KYCExceptionCount}}</q-btn>
                  </q-item-section>
                </q-item>
              </div>
            </div>

            <!-- KYC exception queue body -->
            <q-scroll-area
              :style="'height:'+customKycHeight+'px'"
              :thumb-style="{
                            right: '0px',
                            width: '5px',
                            background:'rgba(0,0,0,0.15)',
                            opacity: 1
                            }"
              :delay="500"
            >
              <div v-if="checkExcpetionQueueKyc">
                <div
                  class="bottom-border q-pa-sm cursor-pointer"
                  @mouseover="fnKycHighlighItem(index)"
                  @click="fnViewKycLeadDetails(item)"
                  :class="[kycActiveItemId === index ? 'bg-grey-4' : 'bg-white']"
                  v-for="(item,index) in getExceptionQueueInfo.KYCExceptionQueue"
                  :key="item.id"
                >
                  <div class="row">
                    <div class="gutter-xs col-md-5 col-sm-6 col-xs-12 text-weight-light">
                      <div
                        class="text-caption text-light-blue cursor-pointer"
                        @click.stop="toggleLeadInformation(item)"
                      >#{{item.leadNumber}}</div>
                      <div class="text-caption no-margin text-dark capitalize">{{item.leadName}}</div>
                    </div>
                    <div class="gutter-xs col-md-7 col-sm-6 col-xs-12 text-weight-light">
                      <div class="text-caption text-dark">{{item.SOName}}</div>
                      <div class="text-caption text-dark">
                        Date of Updation :
                        <span
                          class="text-primary"
                        >{{ item.submitteSATDate | moment("MMMM Do YYYY") }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bottom-border q-ma-sm" v-else>
                <div class="row">
                  <div class="col-md-12 col-sm-12 col-xs-12 text-weight-light" align="center">
                    <div class="text-caption text-dark q-pa-md">No data to display</div>
                  </div>
                </div>
              </div>
            </q-scroll-area>
          </q-card>
        </div>

        <div class="col-md-4 col-sm-12 col-xs-12">
          <!-- Bank subvention queue header -->
          <q-card
            :class="[$route.params.id == 2?'seriousActive border-green':'']"
            class="shadow-0 q-ma-md"
          >
            <div class="row">
              <div class="col-md-12 col-sm-12 col-xs-12">
                <q-item class="bg-green-7">
                  <q-item-section>
                    <q-item-label label text-color="grey-12">Bank Subvention Queue</q-item-label>
                  </q-item-section>
                  <q-item-section>
                    <q-btn
                      round
                      color="grey-12"
                      class="shadow-5"
                      style="border: 3px solid rgb(67, 159, 71);"
                      text-color="green-8"
                    >{{getExceptionQueueInfo.BankExceptionCount}}</q-btn>
                  </q-item-section>
                </q-item>
              </div>
            </div>
            <!-- Bank subvention queue body -->
            <q-scroll-area
              :style="'height:'+customBankSubventionHeight+'px'"
              :thumb-style="{
                            right: '0px',
                            width: '5px',
                            background:'rgba(0,0,0,0.15)',
                            opacity: 1
                            }"
              :delay="100"
            >
              <div v-if="checkExcpetionQueueBankSubvention">
                <div
                  class="bottom-border q-pa-sm cursor-pointer"
                  @mouseover="fnBankHighlighItem(index)"
                  @click="fnViewBankLeadDetails(item)"
                  :class="[bankActiveItemId === index ? 'bg-grey-4' : 'bg-white']"
                  v-for="(item,index) in getExceptionQueueInfo.BankSubventionQueue"
                  :key="index"
                >
                  <div class="row">
                    <div class="gutter-xs col-md-5 col-sm-6 col-xs-12 text-weight-light">
                      <div
                        class="text-caption text-light-blue cursor-pointer"
                        @click.stop="toggleLeadInformation(item)"
                      >#{{item.leadNumber}}</div>
                      <div class="text-caption no-margin text-dark capitalize">{{item.leadName}}</div>
                    </div>
                    <div class="gutter-xs col-md-7 col-sm-6 col-xs-12 text-weight-light">
                      <div class="text-caption text-dark">{{item.createdBy.name}}</div>
                      <div class="text-caption text-dark">
                        Date of Updation :
                        <span
                          class="text-primary"
                        >{{ item.submitteSATDate | moment("MMMM Do YYYY") }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bottom-border q-ma-sm" v-else>
                <div class="row">
                  <div class="col-md-12 col-sm-12 col-xs-12 text-weight-light" align="center">
                    <div class="text-caption text-dark q-pa-md">No data to display</div>
                  </div>
                </div>
              </div>
            </q-scroll-area>
          </q-card>
        </div>

        <div class="col-md-4 col-sm-12 col-xs-12">
          <!-- Pricing Exception Queue header -->
          <q-card
            :class="[$route.params.id == 3?'seriousActive border-red':'']"
            class="shadow-0 q-ma-md"
          >
            <div class="row">
              <div class="col-md-12 col-sm-12 col-xs-12">
                <q-item class="bg-red-7">
                  <q-item-section>
                    <q-item-label label text-color="grey-12">Pricing Exception Queue</q-item-label>
                  </q-item-section>
                  <q-item-section>
                    <q-btn
                      round
                      color="grey-12"
                      class="shadow-5"
                      style="border: 3px solid rgb(244, 67, 55);"
                      text-color="red-6"
                    >{{getExceptionQueueInfo.PricingExceptionCount}}</q-btn>
                  </q-item-section>
                </q-item>
              </div>
            </div>

            <!-- Pricing Exception Queue body -->
            <q-scroll-area
              :style="'height:'+customPricingHeight+'px'"
              :thumb-style="{
                            right: '0px',
                            width: '5px',
                            background:'rgba(0,0,0,0.15)',
                            opacity: 1
                            }"
              :delay="500"
            >
              <div v-if="checkExcpetionQueuePricing">
                <div
                  class="bottom-border q-pa-sm cursor-pointer"
                  @mouseover="fnPricingHighlighItem(index)"
                  @click="fnViewPricingLeadDetails(item)"
                  :class="[pricingActiveItemId === index ? 'bg-grey-4' : 'bg-white']"
                  v-for="(item,index) in getExceptionQueueInfo.PricingExceptionQueue"
                  :key="item.id"
                >
                  <div class="row gutter-sm">
                    <div class="gutter-xs col-md-5 col-sm-6 col-xs-12 text-weight-light">
                      <div
                        class="text-caption text-light-blue cursor-pointer"
                        @click.stop="toggleLeadInformation(item)"
                      >#{{item.leadNumber}}</div>
                      <div class="text-caption no-margin text-dark capitalize">{{item.leadName}}</div>
                    </div>
                    <div class="gutter-xs col-md-7 col-sm-6 col-xs-12 text-weight-light">
                      <div class="text-caption text-dark capitalize">{{item.createdBy.name}}</div>
                      <div class="text-caption text-dark capitalize">Assigned to : RSM {{item.name}}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bottom-border q-ma-sm" v-else>
                <div class="row">
                  <div class="col-md-12 col-sm-12 col-xs-12 text-weight-light" align="center">
                    <div class="text-caption text-dark q-pa-md">No data to display</div>
                  </div>
                </div>
              </div>
            </q-scroll-area>
          </q-card>
        </div>
      </div>
    </q-pull-to-refresh>
    <!-- Common component to view full lead information -->
    <generalLeadInformation
      v-if="propToggleLeadInformation"
      :leadInformation="addtnLeadInformation"
      :propToggleLeadInformationPop="propToggleLeadInformation"
      @closeLeadInformation="toggleLeadInformation"
    />
  </q-page>
</template>

<script>
import _ from "lodash";
import { mapGetters, mapActions } from "vuex";
import generalLeadInformation from "../../components/generalLeadInformation.vue";

export default {
  name: "leadValidation",
  components: {
    generalLeadInformation
  },
  data() {
    return {
      propToggleLeadInformation: false,
      addtnLeadInformation: null,

      customPricingHeight: 100,
      customBankSubventionHeight: 100,
      customKycHeight: 100,

      kycActiveItemId: "",
      bankActiveItemId: "",
      pricingActiveItemId: "",

      uploadFileName: null,
      attachedFileName: "Attach",
      toggleProgress: false,
      tempFiles: null,
      tempFileBoolean: false,
      model: "",
      toggleExceptionQueueKyc: false,
      toggleExceptionQueueBank: false,
      toggleExceptionQueuePricing: false,
      exceptionDetails: {
        exceptionQueueData: this.getExceptionQueueInfo,
        KYCExceptionCount: 0,
        BankExceptionCount: 0,
        PricingExceptionCount: 0
      },
      customHeader: []
    };
  },

  created() {
    /* START: Load user table data */
    this.ajaxLoadDataForAllExceptionList();
    /* END: Load user table data */
  },

  computed: {
    ...mapGetters("ExceptionQueue", ["getExceptionQueueInfo"]),
    ...mapGetters("commonLoader", ["getToggleCommonLoader"]),
    ...mapGetters("GlobalVariables", ["GLOBAL_FILE_UPLOAD_URL"]),
    // Function to check , if kyc exception data are present
    checkExcpetionQueueKyc() {
      if (
        _.has(this.getExceptionQueueInfo, "KYCExceptionQueue") &&
        this.getExceptionQueueInfo.KYCExceptionQueue.length > 0
      ) {
        return true;
      } else {
        return false;
      }
    },

    // Function to check, if bank subvention data are present
    checkExcpetionQueueBankSubvention() {
      if (
        _.has(this.getExceptionQueueInfo, "BankSubventionQueue") &&
        this.getExceptionQueueInfo.BankSubventionQueue.length > 0
      ) {
        return true;
      } else {
        return false;
      }
    },

    // Function to check, if pricing data are present
    checkExcpetionQueuePricing() {
      if (
        _.has(this.getExceptionQueueInfo, "PricingExceptionQueue") &&
        this.getExceptionQueueInfo.PricingExceptionQueue.length > 0
      ) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    ...mapActions("ExceptionQueue", [
      "FETCH_ALL_EXCEPTIONS_DATA",
      "UPLOAD_EXCEPTION_FILE",
      "FEED_SAT_EQ_BANK_FEEDBACK"
    ]),
    ...mapActions("commonLoader", ["TOGGLE_COMMON_LOADER"]),

    // Function to toggle lead information pop up screen
    toggleLeadInformation(leadDetails) {
      this.propToggleLeadInformation = !this.propToggleLeadInformation;
      if (leadDetails != undefined) {
        this.addtnLeadInformation = leadDetails;
      }
    },

    //Function pull to refresh
    PullToRefresh(done) {
      this.FETCH_ALL_EXCEPTIONS_DATA()
        .then(() => {
          done();
        })
        .catch(() => {
          done();
        });
    },

    //Function as API to fetch ALL EXCEPTIONS data
    ajaxLoadDataForAllExceptionList() {
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data .."
      });
      this.FETCH_ALL_EXCEPTIONS_DATA()
        .then(response => {
          if (this.getExceptionQueueInfo.PricingExceptionQueue.length > 0) {
            this.customPricingHeight =
              this.getExceptionQueueInfo.PricingExceptionQueue.length * 100;
            if (this.customPricingHeight <= 500) {
              this.customPricingHeight =
                this.getExceptionQueueInfo.PricingExceptionQueue.length * 100;
            } else {
              this.customPricingHeight = 500;
            }
          } else {
            this.customPricingHeight = 100;
          }
          if (this.getExceptionQueueInfo.BankSubventionQueue.length > 0) {
            this.customBankSubventionHeight =
              this.getExceptionQueueInfo.BankSubventionQueue.length * 100;
            if (this.customBankSubventionHeight <= 500) {
              this.customBankSubventionHeight =
                this.getExceptionQueueInfo.BankSubventionQueue.length * 100;
            } else {
              this.customBankSubventionHeight = 500;
            }
          } else {
            this.customBankSubventionHeight = 100;
          }
          if (this.getExceptionQueueInfo.KYCExceptionQueue.length > 0) {
            this.customKycHeight =
              this.getExceptionQueueInfo.KYCExceptionQueue.length * 100;
            if (this.customKycHeight <= 500) {
              this.customKycHeight =
                this.getExceptionQueueInfo.KYCExceptionQueue.length * 100;
            } else {
              this.customKycHeight = 500;
            }
          } else {
            this.customKycHeight = 100;
          }
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },

    // Function to hover effect on kyc item
    fnKycHighlighItem(currentIndex) {
      this.kycActiveItemId = currentIndex;
    },

    // Function to hover effect on bank subvention item
    fnBankHighlighItem(currentIndex) {
      this.bankActiveItemId = currentIndex;
    },

    // Function to hover effect on pricing item
    fnPricingHighlighItem(currentIndex) {
      this.pricingActiveItemId = currentIndex;
    },

    // Function to hover effect on kyc item in detail
    fnViewKycLeadDetails(item) {
      this.$router.push("/sat/exception/queue/kyc/lead/details/" + item.id);
    },

    // Function to hover effect on bank subvention item in detail
    fnViewBankLeadDetails(item) {
      this.$router.push(
        "/sat/exception/queue/bank/subvention/lead/details/" + item.id
      );
    },

    // Function to hover effect on pricing item in detail
    fnViewPricingLeadDetails(item) {
      this.$router.push("/sat/exception/queue/pricing/lead/details/" + item.id);
    }
  }
};
</script>

<style scoped>
label {
  padding: 5px;
  background: #ccc;
  display: table;
  color: #555;
}

input[type="file"] {
  display: none;
}

.seriousActive {
  box-shadow: 0px 0px 15px #3a3a3aa8 !important;
}
.border-blue {
  border: 3px solid #20a9f4;
}
.border-green {
  border: 3px solid #43a047;
}
.border-red {
  border: 3px solid #e53835;
}
</style>