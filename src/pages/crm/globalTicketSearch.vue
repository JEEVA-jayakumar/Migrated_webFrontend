<template>
  <q-page>
    <!-- content -->
    <div>
      <div class="col-md-12 q-title q-px-lg q-py-md text-weight-regular bottom-border text-grey-9" 
      > CRM Global Ticket Search</div>
      <div class="row gutter-x-xs gutter-y-xs q-pt-md  items-end">
        <div class="col-md-4">
          <q-search
            inverted-light
            color="light"
            clearable
            v-model="formData.searchTerm"
            placeholder="Search By Ticket ID..."
            @clear="handleClear"
          />
        </div>
        <div class="col-md-2">
          <q-btn
            class="auto"
            size="md"
            type="button"
            color="purple-9"
            @click="globalSearchSubmit(formData)"
            :disable="this.formData.searchTerm == ''"
            >Submit
          </q-btn>
        </div>
      </div>
    </div>

    <div v-if="tableData == ''"
      class="row gutter-x-xs gutter-y-xs justify-center q-pt-lg q-mr-lg q-ml-lg q-mt-lg q-mb-lg dFont" style="min-height: calc(80vh - 52px);" >
      <div class="row" align="center">
        <q-icon name="warning" color="warning" size="4rem" />
        <div class="q-subheading text-bold text-grey-9" style="align-self: center;" > No Data Available </div>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <div
          v-if="tableData != ''"
          class="row gutter-x-xs gutter-y-xs justify-center q-pt-lg q-mr-lg q-ml-lg q-mt-lg q-mb-lg dFont "
        >
          <div class="col-lg-4 col-md-6 col-sm-12">
            <q-card class="q-card q-py-md items-center round-borders q-pa-sm algn1">
              <q-card-title style="background-color: #680663;">
                <div class="q-subheading text-bold text-white">
                  Merchant Details </div>
              </q-card-title>
              <q-card-separator></q-card-separator>
              <q-card-main>
                <div v-if="tableData != ''">
                  <div class="col">
                    <div
                      class="row gutter-x-xs gutter-y-xs q-pa-sm text-grey-9" >
                      <span class="col-md-4 text-weight-medium">{{
                        fieldKeys.merchantDetails.meName.label
                      }}</span>
                      <span class="col-md-8 text-wrap text-primary">{{
                        tableData.meName
                      }}</span>
                    </div>
                    <div
                      class="row gutter-x-xs gutter-y-xs q-pa-sm text-grey-9" >
                      <span class="col-md-4 text-weight-medium">{{
                        fieldKeys.merchantDetails.leadId.label
                      }}</span>
                      <span class="col-md-8 text-wrap text-primary">{{
                        "# " + tableData.leadId
                      }}</span>
                    </div>
                    <div
                      class="row gutter-x-xs gutter-y-xs q-pa-sm text-grey-9"
                    >
                      <span class="col-md-4 text-weight-medium">{{
                        fieldKeys.merchantDetails.region.label
                      }}</span>
                      <span class="col-md-8 text-wrap text-primary">{{
                        tableData.bpRegion.regionAreaName
                      }}</span>
                    </div>
                    <div
                      class="row gutter-x-xs gutter-y-xs q-pa-sm text-grey-9"
                    >
                      <span class="col-md-4 text-weight-medium">{{
                        fieldKeys.merchantDetails.contactNumber.label
                      }}</span>
                      <span class="col-md-8 text-wrap text-primary">{{
                        tableData.contactNumber
                      }}</span>
                    </div>
                  </div>
                </div>
              </q-card-main>
            </q-card>
          </div>
          </div>
        </div>

      <div class="col">
        <div
          v-if="tableData != ''"
          class="row gutter-x-xs gutter-y-xs justify-center q-pt-lg q-mr-lg q-ml-lg q-mt-lg q-mb-lg dFont"
        >
          <div class="col-lg-4 col-md-6 col-sm-12 no-wrap	">
            <q-card class="q-card q-py-md round-borders q-pa-sm algn2">
              <q-card-title style="background-color: #680663;">
                <div class="q-subheading text-bold text-white">
                  Ticket Status
                </div>
              </q-card-title>
              <q-card-separator></q-card-separator>
              <q-card-main>
                <div v-if="tableData != ''">
                  <div class="row gutter-x-xs gutter-y-xs q-pa-sm text-grey-9">
                    <span class="col-md-4 text-weight-medium">{{
                      fieldKeys.ticketStatus.ticketNumber.label
                    }}</span>
                    <span class="col-md-8 text-wrap text-primary">{{
                      tableData.serviceReqTicketId
                    }}</span>
                  </div>
                  <div class="row gutter-x-xs gutter-y-xs q-pa-sm text-grey-9">
                    <span class="col-md-4 text-weight-medium">{{
                      fieldKeys.ticketStatus.ticketStatus.label
                    }}</span>
                    <span class="col-md-8 text-wrap text-primary">{{
                      tableData.subTicketsList[0].serviceRequestSubTicketStatus
                        .name
                    }}</span>
                  </div>
                  <div class="row gutter-x-xs gutter-y-xs q-pa-sm text-grey-9">
                    <span class="col-md-4 text-weight-medium">{{
                      fieldKeys.ticketStatus.createdDate.label
                    }}</span>
                    <span class="col-md-8 text-wrap text-primary">{{
                      tableData.createdDate | moment("Do MMM Y")
                    }}</span>
                  </div>
                  <div class="row gutter-x-xs gutter-y-xs q-pa-sm text-grey-9">
                    <span class="col-md-4 text-weight-medium">{{
                      fieldKeys.ticketStatus.updatedDate.label
                    }}</span>
                    <span class="col-md-8 text-wrap text-primary">{{
                      tableData.updatedDate | moment("Do MMM Y")
                    }}</span>
                  </div>
                  <div class="row gutter-x-xs gutter-y-xs q-pa-sm text-grey-9">
                    <span class="col-md-4 text-weight-medium">{{
                      fieldKeys.ticketStatus.serviceResolutionRemarks.label
                    }}</span>
                    <span class="col-md-8 text-wrap text-primary">{{
                      tableData.subTicketsList[0].serviceResolutionRemarks ==
                      null
                        ? "NA"
                        : tableData.subTicketsList[0].serviceResolutionRemarks.name
                    }}</span>
                  </div>
                  <div class="row gutter-x-xs gutter-y-xs q-pa-sm text-grey-9">
                    <span class="col-md-4 text-weight-medium">{{
                      fieldKeys.ticketStatus.resolutionRemark.label
                    }}</span>
                    <span class="col-md-8 text-wrap text-primary">{{
                      tableData.subTicketsList[0].resolutionRemark == null
                        ? "NA"
                        : tableData.subTicketsList[0].resolutionRemark
                    }}</span>
                  </div>
                </div>
              </q-card-main>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "globalSearchFilterValues",

  data() {
    return {
      tableData: "",
      fieldKeys: {
        merchantDetails: {
          meName: { label: "Merchant Name" },
          leadId: { label: "Lead Number" },
          region: { label: "Region" },
          contactNumber: { label: "Mobile Number" }
        },
        ticketStatus: {
          ticketNumber: { label: "Ticket Number" },
          ticketStatus: { label: "Ticket Status" },
          createdDate: { label: "Created Date" },
          updatedDate: { label: "Updated Date" },
          serviceResolutionRemarks: { label: "Service Resolution Remarks" },
          resolutionRemark: { label: "Resolution Remarks" }
        }
      },
      formData: {
        searchTerm: ""
      },
    };
  },

  computed: {
    ...mapGetters("crmGlobalSearchTicketId", ["getcrmGlobalSearchTicketId"])
  },
  mounted() {
    console.log("Merchant Details:", this.fieldKeys.merchantDetails);
    console.log("Table Data:", this.tableData);
  },

  methods: {
    ...mapActions("crmGlobalSearchTicketId", ["FETCH_CRM_GLOBAL_SEARCH_DATAS"]),
    globalSearchSubmit() {
      this.$q.loading.show();
      let params = {
        searchTerm: this.formData.searchTerm
      };
      this.FETCH_CRM_GLOBAL_SEARCH_DATAS(params)
        .then(res => {
          this.tableData = this.getcrmGlobalSearchTicketId;
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },
    handleClear() {
      this.tableData = "";
    }
  }
};
</script>
<style>
.text-wrap {
  overflow-wrap: anywhere;
  color: #242225;
}
.algn1{
  width: 268%;
  height: 124%;
  margin-left: -103%;
  border: 1px solid #5a5959;
}
.algn2{
  width: 281%;
  height: 97%;
  margin-left: -117%;
  border: 1px solid #5a5959;
}
</style>
