<template>
  <q-page>
    <div class="row">
      <!-- START >> Setup MDR details -->
      <div class="col-md-6 col-sm-4 col-xs-12 q-pa-sm">
        <div>
          <strong>Select the Lead Bank to add List of Banks to implement QR</strong>
        </div>
        <q-card style="width:100%">
          <q-card-separator />
          <q-card-main>
            <q-item>
              <q-item-main>
                <q-select
                  color="grey-9"
                  v-model="formData.leadSource"
                  :options="dropDown.leadSourceOptions"
                  float-label="Select Lead bank"
                />
              </q-item-main>
              <q-item-side right>
                <q-btn
                  :disabled="formData.leadSource.length == 0"
                  no-caps
                  size="md"
                  @click="fnAddLeadSource(formData)"
                  color="purple-9"
                  label="Add Lead Source"
                  class="no-margin"
                />
              </q-item-side>
            </q-item>
          </q-card-main>
        </q-card>
      </div>
    </div>
    <br />
    <br />

    <div align="center">
      <strong>List of Bank to implement QR Code</strong>
    </div>
    <q-table
      table-class="customTableClass"
      :data="getActiveandDeactiveLeadSource"
      :columns="columns"
      :pagination.sync="paginationControl"
      row-key="id"
    >
      <q-td slot="body-cell-action" slot-scope="props" :props="props">
        <div class="row no-wrap no-padding">
          <!-- <q-btn
            dense
            no-caps
            no-wrap
            label="Delete"
            size="md"
            @click="fnDownload(props.row.id)"
            flat
            class="text-red"
          ></q-btn>-->
          <q-btn
            dense
            no-caps
            no-wrap
            label="Delete"
            icon="far fa-minus-square"
            size="md"
            @click="fnDownload(props.row.id)"
            flat
            class="text-negative"
          ></q-btn>
        </div>
      </q-td>
    </q-table>

    <!-- <showPlanModalComponent
      v-if="showPlanDetailModal"
      :propToggleModal="showPlanDetailModal"
      @emitToggleModal="fnManagePlan"
    ></showPlanModalComponent>-->
    <!--END: Show plan details-->
  </q-page>
</template>

<script>
/* START >> Modal components Lead source, device, merchant type */
// import showPlanModalComponent from "../../components/super_admin/showPlanModalComponent.vue";
/* END >> Modal components Lead source, device, plan */

import { mapGetters, mapActions } from "vuex";
export default {
  name: "deviceTypes",
  components: {
    /* START >> Modal components Lead source, device, plan */
    // showPlanModalComponent
    /* END >> Modal components Lead source, device, plan */
  },
  data() {
    return {
      /* START >> Modal props */
      /* END >> Modal props */

      /* START >> Rental charges */
      paginationControl: {
        rowsPerPage: 5
      },
      formData: {
        leadSource: ""
      },
      dropDown: {
        leadSourceOptions: []
      },
      columns: [
        // {
        //   name: "ModifyDate",
        //   required: true,
        //   label: "Modify Date",
        //   align: "center",
        //   field: row => {
        //     return row.device.modifyDate;
        //   }
        // },
        {
          name: "sourceName",
          required: true,
          label: "QR Bank",
          align: "center",
          field: row => {
            return row.sourceName;
          }
        },
        {
          name: "action",
          required: true,
          label: "",
          align: "left",
          field: "action"
        }
      ]
    };
  },

  created() {
    /* START: Load user table data filter > DeviceTypes */

    this.fetch();

    /* End: Load user table data filter > DeviceTypes */
  },
  computed: {
    ...mapGetters("ACTIVE_DEACTIVE_LEAD_SOURCE", ["getDeactiveLeadSource"]),

    ...mapGetters("QRList", ["getAllQRList"]),

    ...mapGetters("ACTIVE_DEACTIVE_LEAD_SOURCE", [
      "getActiveandDeactiveLeadSource"
    ])
  },

  methods: {
    ...mapActions("ACTIVE_DEACTIVE_LEAD_SOURCE", [
      "LEAD_SOURCE_DEACTIVE_LIST",
      "EDIT_LEAD_SOURCE",
      "LEAD_SOURCE_ACTIVE_DEACTIVE_LIST1",
      "DELETE_LEAD_SOURCE"
    ]),
    ...mapActions("QRList", ["FETCH_QR_LIST"]),
    ajaxLoadDataForDeviceTypeTable() {
      let self = this;
      self.LEAD_SOURCE_DEACTIVE_LIST().then(() => {
        return _.map(self.getDeactiveLeadSource, item => {
          self.dropDown.leadSourceOptions.push({
            value: item.id,
            label: item.sourceName
          });
        });
      });
    },
    // fnCategoryBasedRental(request) {
    //   let formData = {
    //     leadSource: request.leadSource,
    //     device: request.device,
    //     plan: request.plan
    //   };
    //   let self = this;
    //   self.CATEGORY_BASED_RENTAL_PLAN(formData).then(response => {
    //     if (response.status == 200) {
    //       this.formData.setupFees = self.categoryBasedRental.setupFees;
    //       this.formData.monthlyFees = self.categoryBasedRental.monthlyFees;
    //     } else if (response.data == null) {
    //       this.formData.setupFees = 0;
    //       this.formData.monthlyFees = 0;
    //     } else {
    //       this.$q.notify({
    //         color: "negative",
    //         position: "bottom-left",
    //         message: "Invalid MDR Plan Code",
    //         icon: "clear"
    //       });
    //       this.formData.setupFees = "";
    //       this.formData.monthlyFees = "";
    //     }
    //   });
    // },

    /* START >> Manage lead source, device, merchant type */

    fnManagePlan() {
      this.showPlanDetailModal = !this.showPlanDetailModal;
    },
    fnAddLeadSource(request) {
      let requestParams = {
        lead: {
          leadId: this.formData.leadSource
        }
      };
      this.EDIT_LEAD_SOURCE(requestParams).then(response => {
        console.log("Respone the lead source", response);

        this.LEAD_SOURCE_ACTIVE_DEACTIVE_LIST1();

        this.$q.notify({
          color: "positive",
          position: "bottom",
          message: response.data.message,
          icon: "thumb_up"
        });
        this.formData.leadSource = "";
        this.LEAD_SOURCE_DEACTIVE_LIST();
      });
      // leadSourceCreate(token) {
      //   this.propShowCreateLeadSource = !this.propShowCreateLeadSource;
      //   if (token == "refresh") {
      //     this.leadSourceActiveList();
      //   }

      /* END >> Manage lead source, device, merchant type */

      /* START >> Manage MDR charges */
    },
    // fnDownload(id) {
    //   this.DELETE_LEAD_SOURCE(id);

    //   this.fetch();
    //   this.$q.notify({
    //     color: "positive",
    //     position: "bottom",
    //     message: "Successfully Deleted",
    //     icon: "thumb_up"
    //   });
    // },
    fnDownload(rowDetails) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Are you sure want to delete QR Bank?",
          ok: "Continue",
          cancel: "Cancel"
        })
        .then(() => {
          this.$q.loading.show({
            delay: 100, // ms
            message: "Please Wait",
            spinnerColor: "purple-9",
            customClass: "shadow-none"
          });
          this.DELETE_LEAD_SOURCE(rowDetails)
            .then(response => {
              this.fetch();
              this.$q.notify({
                color: "positive",
                position: "bottom",
                message: "Successfully Deleted",
                icon: "thumb_up"
              });
            })
            .catch(error => {
              this.$q.notify({
                color: "negative",
                position: "bottom",
                message: "Please try again!",
                icon: "thumb_down"
              });
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
        });
    },

    fetch() {
      this.LEAD_SOURCE_ACTIVE_DEACTIVE_LIST1();
      this.LEAD_SOURCE_DEACTIVE_LIST();
      this.ajaxLoadDataForDeviceTypeTable();
      this.FETCH_QR_LIST();
    }
  }
};
</script>

<style>
</style>
