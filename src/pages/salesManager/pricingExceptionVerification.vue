<template>
  <q-page>
    <div>
      <!-- //Common lead information in popup -->
      <generalLeadInformation
        v-if="propToggleLeadInformation"
        :leadInformation="addtnLeadInformation"
        :propToggleLeadInformationPop="propToggleLeadInformation"
        @closeLeadInformation="toggleLeadInformation"
      />

      <div
        class="row bottom-border items-center"
        :class="getRoleForTableToggleRsmList == true? 'q-py-sm':'q-py-md'"
      >
        <!--START: table title -->
        <div class="col q-title q-px-lg text-weight-regular text-grey-9">Pricing Exception Approval</div>
        <div class="col-auto">
          <q-btn
            flat
            icon="arrow_left"
            @click="toggleTabs"
            v-if="getRoleForTableToggleRsmList == true"
            label="Go back"
          />
        </div>
      </div>
      <!--END: table title -->
      <div v-if="shouldShowGivenPricefield">
        <q-tabs inverted color="purple-9">
          <!-- Tabs - notice slot="title" -->
          <q-tab
            default
            :count="pricingExceptionCountForTab"
            slot="title"
            name="tab-1"
            label="Pending"
          />
          <q-tab slot="title" name="tab-2" label="History" />
          <!-- Targets -->
          <q-tab-pane name="tab-1">
            <!--START: table lead validation -->
            <q-table
              table-class="customTableClass"
              :data="getPricingExceptionList"
              :columns="columns"
              :filter="filter"
              :pagination.sync="paginationControl"
              row-key="name"
            >
              <!--START: table body modification -->
              <q-td
                slot="body-cell-leadNumber"
                slot-scope="props"
                :props="props"
                class="cursor-pointer"
                @click.native="toggleLeadInformation(props.row)"
              >
                <span class="label text-primary"># {{props.row.leadNumber}}</span>
              </q-td>
              <q-td
                slot="body-cell-submittoRSMDate"
                slot-scope="props"
                :props="props"
              >{{ props.row.submittoRSMDate | moment("Do MMM Y") }}</q-td>
              <q-td slot="body-cell-action" slot-scope="props" :props="props">
                <q-btn
                  highlight
                  push
                  outline
                  color="purple-9"
                  size="sm"
                  @click="pushToDetailedScreenRsm(props.row.id)"
                >Review</q-btn>
              </q-td>
              <!--END: table body modification -->
              <template slot="top" slot-scope="props" class="bottom-border">
                <!--START: table filter,search -->
                <div class="col-md-5">
                  <q-search
                    clearable
                    color="grey-9"
                    v-model="filter"
                    placeholder="Type.."
                    float-label="Search by Merchant Name, Lead ID"
                    class="q-mr-lg q-py-sm"
                  />
                </div>
                <!--END: table filter,search -->
              </template>
            </q-table>
            <!--END: table lead validation -->
          </q-tab-pane>
          <q-tab-pane name="tab-2">
            <!--START: table data -->
            <q-table
              v-if=" getRoleForTableToggleRsmList == false"
              table-class="customTableClass"
              :data="getPricingRsmList"
              :columns="rsmcolumns"
              :filter="filter"
              :pagination.sync="paginationControl"
              row-key="name"
            >
              <q-tr
                slot="body"
                slot-scope="props"
                :class="[rowActiveId == props.row.__index? 'bg-grey-4 text-dark':'']"
                :props="props"
                @mouseover.native="rowHover(props.row.__index)"
                @click.native="rowClick(props.row)"
                class="cursor-pointer"
              >
                <q-td v-for="col in props.cols" :key="col.name" :props="props">{{ col.value }}</q-td>
              </q-tr>
            </q-table>
            <!--END: table data -->
            <!--START: table data -->
            <!--START: table lead validation -->
            <q-table
              v-if=" getRoleForTableToggleRsmList == true"
              table-class="customTableClass"
              :data="pricingExceptionByRsmIDList"
              :columns="rsmcolumnsLeads"
              :filter="filter"
              :pagination.sync="paginationControl"
              row-key="name"
            >
              <!--START: table body modification -->
              <q-td
                slot="body-cell-leadNumber"
                slot-scope="props"
                :props="props"
                class="cursor-pointer"
                @click.native="toggleLeadInformation(props.row)"
              >
                <span class="label text-primary"># {{props.row.leadNumber}}</span>
              </q-td>
              <!-- <q-td slot="body-cell-Status" slot-scope="props" :props="props">
                <span
                  class="label text-positive"
                  v-if="props.row.leadInformation.verifpropiedCmsPricingStatus==2"
                >ChangeManagement</span>

                <span class="label text-amber" v-else>New Lead</span>
              </q-td>-->
              <q-td slot="body-cell-action" slot-scope="props" :props="props">
                <q-btn
                  highlight
                  push
                  outline
                  color="purple-9"
                  size="sm"
                  @click="pushToDetailedScreen(props.row.id)"
                >Review</q-btn>
              </q-td>
              <!--END: table body modification -->
              <template slot="top" slot-scope="props" class="bottom-border">
                <!--START: table filter,search -->
                <div class="col-md-5">
                  <q-search
                    clearable
                    color="grey-9"
                    v-model="filter"
                    placeholder="Type.."
                    float-label="Search by Merchant Name, Lead ID"
                    class="q-mr-lg q-py-sm"
                  />
                </div>
                <!--END: table filter,search -->
              </template>
            </q-table>
            <!--END: table lead validation -->
            <!--END: table data -->
          </q-tab-pane>
        </q-tabs>
      </div>
      <div v-else>
        <!--START: table lead validation -->
        <q-table
          table-class="customTableClass"
          :data="getPricingExceptionList"
          :columns="columns"
          :filter="filter"
          :pagination.sync="paginationControl"
          row-key="name"
        >
          <q-td
            slot="body-cell-submittoRSMDate"
            slot-scope="props"
            :props="props"
          >{{ props.row.submittoRSMDate | moment("Do MMM Y") }}</q-td>
          <!--START: table body modification -->
          <q-td
            slot="body-cell-leadNumber"
            slot-scope="props"
            :props="props"
            class="cursor-pointer"
            @click.native="toggleLeadInformation(props.row)"
          >
            <span class="label text-primary"># {{props.row.leadNumber}}</span>
          </q-td>
          <q-td slot="body-cell-action" slot-scope="props" :props="props">
            <q-btn
              highlight
              push
              outline
              color="purple-9"
              size="sm"
              @click="pushToDetailedScreenRsm(props.row.id)"
            >Review</q-btn>
          </q-td>
          <!--END: table body modification -->
          <template slot="top" slot-scope="props" class="bottom-border">
            <!--START: table filter,search -->
            <div class="col-md-5">
              <q-search
                clearable
                color="grey-9"
                v-model="filter"
                placeholder="Type.."
                float-label="Search by Merchant Name, Lead ID"
                class="q-mr-lg q-py-sm"
              />
            </div>
            <!--END: table filter,search -->
          </template>
        </q-table>
        <!--END: table lead validation -->
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import generalLeadInformation from "../../components/generalLeadInformation.vue";

export default {
  name: "revenueApproval",
  components: {
    generalLeadInformation,
  },
  data() {
    return {
      shouldShowGivenPricefield: false,
      toggleAjaxLoadFilter: false,
      pricingExceptionCountForTab: 0,
      shouldShowNHscreen: true,
      getRoleForTableToggleRsmList: false,
      rowActiveId: 0,

      propToggleLeadInformation: false,
      addtnLeadInformation: null,

      filter: "",
      paginationControl: {
        rowsPerPage: 10,
      },
      columns: [
        {
          name: "createdBy",
          required: true,
          label: "SO name",
          align: "left",
          field: (row) => {
            return row.createdBy.name;
          },
          sortable: false,
        },
        {
          name: "submittoRSMDate",
          required: true,
          label: "Submitted to RSM date",
          align: "left",
          field: (row) => {
            return row.submittoRSMDate;
          },
          // field: "submittoRSMDate",
          sortable: false,
        },
        {
          name: "leadNumber",
          required: true,
          label: "Lead ID",
          align: "left",
          field: "leadNumber",
          sortable: true,
        },
        {
          name: "Status",
          required: true,
          label: "Type",
          align: "left",
          field: "verifiedCmsPricingStatus",
          field: (row) => {
            return row.verifiedCmsPricingStatus == 2 ||
              row.verifiedCmsPricingStatus == 6
              ? "Change Request"
              : "New Lead";
          },
          sortable: true,
        },
        {
          name: "leadName",
          required: true,
          label: "Merchant name",
          align: "left",
          field: "leadName",
          sortable: false,
        },
        {
          name: "plan",
          required: true,
          label: "Regular plan",
          align: "left",
          field: (row) => {
            return row.plan.planName;
          },
          sortable: false,
        },
        {
          name: "merchantCategory",
          required: true,
          label: "Merchant category",
          align: "left",
          field: (row) => {
            return row.merchantCategory.merchantCategoryName;
          },
          sortable: false,
        },
        {
          name: "action",
          required: true,
          label: "",
          align: "left",
          field: "action",
          sortable: false,
        },
      ],
      rsmcolumnsLeads: [
        {
          name: "createdBy",
          required: true,
          label: "SO name",
          align: "left",
          field: (row) => {
            return row.createdBy != undefined ? row.createdBy.name : "";
          },
          sortable: false,
        },
        {
          name: "submittoRSMDate",
          required: true,
          label: "Submitted to RSM date",
          align: "left",
          // field: "submittoRSMDate",
          field: (row) => {
            return row.submittoRSMDate;
          },
          sortable: false,
        },
        {
          name: "leadNumber",
          required: true,
          label: "Lead ID",
          align: "left",
          field: "leadNumber",
          sortable: true,
        },
        {
          name: "leadName",
          required: true,
          label: "Merchant name",
          align: "left",
          field: "leadName",
          sortable: false,
        },
        {
          name: "plan",
          required: true,
          label: "Regular plan",
          align: "left",
          field: (row) => {
            return row.plan != undefined ? row.plan.planName : "";
          },
          sortable: false,
        },
        {
          name: "merchantCategory",
          required: true,
          label: "Merchant category",
          align: "left",
          field: (row) => {
            return row.merchantCategory != undefined
              ? row.merchantCategory.merchantCategoryName
              : "";
          },
          sortable: false,
        },
        {
          name: "action",
          required: true,
          label: "",
          align: "left",
          field: "action",
          sortable: false,
        },
      ],
      rsmcolumns: [
        {
          name: "name",
          required: true,
          label: "RSM name",
          align: "left",
          field: "name",
          sortable: false,
        },
      ],
      loading: true,
      lazy: [],
      select: "fb",
      multipleSelect: ["goog", "twtr"],
      error: true,
      warning: false,
      options: [
        {
          label: "Google",
          value: "goog",
        },
        {
          label: "Facebook",
          value: "fb",
        },
        {
          label: "Twitter",
          value: "twtr",
        },
        {
          label: "Apple Inc.",
          value: "appl",
        },
        {
          label: "Oracle",
          value: "ora",
        },
      ],
    };
  },

  created() {
    this.pricingExceptionList();
  },

  computed: {
    ...mapGetters("rsmPricingExceptionVerification", [
      "getPricingExceptionList",
      "pricingExceptionByRsmIDList",
      "getPricingRsmList",
    ]),
  },

  methods: {
    ...mapActions("rsmPricingExceptionVerification", [
      "PRICING_EXCEPTION_LIST",
      "PRICING_RSM_LIST",
      "PRICING_EXCEPTION_LIST_WHERE_RSMID",
    ]),

    pricingExceptionList() {
      // let self = this;
      // let finalObj = _.find(
      //   JSON.parse(localStorage.getItem("u_i")).roles,
      //   function(oo) {
      //     return (
      //       oo.hierarchyRoleLevel == self.$ROLE_HIERARCHY_SALES_NATIONAL_HEAD
      //     );
      //   }
      // );
      // if (finalObj == undefined) {
      //   this.PRICING_EXCEPTION_LIST();
      //   this.shouldShowNHscreen = false;
      // } else {
      //   this.PRICING_RSM_LIST();
      //   this.shouldShowNHscreen = true;
      //   this.getRoleForTableToggleRsmList = false;
      // }
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching list..",
      });
      let self = this;
      let finalObj = _.find(
        JSON.parse(localStorage.getItem("u_i")).roles,
        function (oo) {
          return (
            oo.hierarchyRoleLevel == self.$ROLE_HIERARCHY_SALES_NATIONAL_HEAD
          );
        }
      );
      if (finalObj == undefined) {
        this.shouldShowGivenPricefield = false;
      } else {
        this.shouldShowGivenPricefield = true;
      }
      this.PRICING_EXCEPTION_LIST()
        .then(() => {
          this.pricingExceptionCountForTab = this.getPricingExceptionList.length;
        })
        .then(() => {
          this.PRICING_RSM_LIST();
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },
    // Function to toggle lead information pop up screen
    toggleLeadInformation(leadDetails) {
      this.propToggleLeadInformation = !this.propToggleLeadInformation;
      if (leadDetails != undefined) {
        this.addtnLeadInformation = leadDetails;
      }
    },
    rowHover(index) {
      this.rowActiveId = index;
    },
    rowClick(item, index) {
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching list..",
      });
      this.rowActiveId = index;
      this.getRoleForTableToggleRsmList = true;
      this.PRICING_EXCEPTION_LIST_WHERE_RSMID(item)
        .then(() => {
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },

    pushToDetailedScreen(leadId) {
      this.$router.push(
        "/sales/manager/pricing/exception/verification/lead/" +
          leadId +
          "/details/" +
          leadId
      );
    },
    pushToDetailedScreenRsm(leadId) {
      this.$router.push(
        "/sales/manager/pricing/exception/verification/lead/" +
          leadId +
          "/details/"
      );
    },

    toggleTabs() {
      this.getRoleForTableToggleRsmList = false;
    },
  },
};
</script>

<style>
</style>