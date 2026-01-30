<template>
  <q-page>
    <q-modal
      minimized
      no-backdrop-dismiss
      class="customModalOverlay"
      v-model="toggleModel"
      :content-css="{ padding: '30px', minWidth: '60vw' }"
    >
      <div class="row q-pa-md">
        <div class="col-12 q-title text-weight-regular bottom-border">
          Action Bar
        </div>
        <q-card class="q-pa-md" style="width: 100%">
          <q-card-section>
            <div class="row q-gutter-md q-justify-between">
              <div class="col">
                <div class="q-mb-md">
                  <q-item-label><b>Reported Status:</b></q-item-label>
                  <div>{{ propRowDetails.subTicketsList[0].serviceRequestType.name }}</div>
                </div>
                <div class="q-mb-md">
                  <q-item-label><b>TID:</b></q-item-label>
                  <div>{{ this.propRowDetails.tid }}</div>
                </div>
                <div class="q-mb-md">
                  <q-item-label><b>Ticket ID:</b></q-item-label>
                  <div>{{ this.propRowDetails.serviceReqTicketId }}</div>
                </div>
                <div class="q-mb-md">
                  <q-item-label><b>SAT forwarded date:</b></q-item-label>
                  <div>
                    {{this.propRowDetails.subTicketsList[0].moveToSatDate | moment("Do MMM Y")}}
                  </div>
                </div>
              </div>
              <!-- Right side Q-Select -->
              <div class="col-auto">
                <q-select
                  style="width: 300px"
                  filter
                  clearable
                  color="grey-9"
                  v-model="formData.so"
                  :options="assignToOptions"
                  float-label="Select FSE Name*"
                />
              </div>
            </div>
          </q-card-section>
          <q-card-actions align="center">
            <q-btn
              :disabled="!formData.so"
              highlight
              push
              class="q-mx-sm"
              label="Assign"
              style="width: 90px"
              @click="fnAssignTickets(formData)"
              color="blue"
            />
            <q-btn
              highlight
              push
              label="Close"
              style="width: 90px"
              class="q-mx-sm"
              align="center"
              @click="emitfnshowUpdateOpenedExternal()"
              color="negative"
            />
          </q-card-actions>
        </q-card>
      </div>
    </q-modal>
  </q-page>
</template>

<script>
/* START >> Modal components Lead source, device, merchant type */
import { request } from "http";
import {
  required,
  requiredIf,
  email,
  minLength,
  maxLength,
  alpha,
  alphaNum,
  numeric
} from "vuelidate/lib/validators";
import { req } from "vuelidate/lib/validators/common";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["propShowUpdatePickTicket", "propRowDetails"],
  name: "MDRdetails",
  data() {
    return {
      /* START >> Modal props */
      toggleModel: this.propShowUpdatePickTicket,
      showLeadSourceModal: false,
      showDeviceDetailModal: false,
      showMerchantModal: false,
      assignToOptions: [],
      ReasonListOptions: [],
      formData: {
        so: "",
        Reassign: "",
        reason: null
      }
      // validations: {
      //     formData: {
      //         so:{
      //             required
      //         },
      //         Reassign:{
      //             required
      //         },
      //         reason: {
      //             required: requiredIf(function (formData) {
      //                 return formData.reason == "Other reason";
      //             })
      //         }

      //     }
      // },
      /* END >> Modal props */

      /* END >>Table properties */

      /* END >>Table data */
    };
  },

  created() {},
  beforeMount() {
    console.log("propRowDetails ------->", JSON.stringify(this.propRowDetails));
    this.implementationExecutiveList();
  },
  // beforeMount() {
  //   this.ajaxLoadDataForDeviceTypeTable(
  //     this.formData.sourceName,
  //     this.formData.device,
  //     this.formData.merchantType
  //   );
  //   // this.ajaxMarsDeviceModelDatasLoading(this.formData.marsDeviceModel);
  //   this.ajaxMarsDeviceModelDatasLoading();
  // },

  computed: {
    ...mapGetters("ImplementationExecutive", [
      "getImplementationExecutiveList"
    ]),
    ...mapGetters("serviceRequestPhonepeSat", [
      "getphonepeOpenedTickets",
      "getphonepeResolvedTickets"
    ]),
  },

  methods: {
    ...mapActions("ImplementationExecutive", ["IMPLEMENTATION_EXECUTIVE_LIST"]),
    ...mapActions("serviceRequestPhonepeSat", [
      "FETCH_PHONEPE_OPENED_TICKETS",
      "FETCH_PHONEPE_RESOLVED_TICKET",
      "PHONEPE_PICKUP_TICKET_ASSIGNED",
      "PHONEPE_REASSIGNED_MERCHANT_TICKETS",
      "PHONEPE_SERVICE_REQUEST_UNASSIGED_TO_ASSIGNED_STATE"
    ]),
    emitfnshowUpdateOpenedExternal() {
      this.$emit("emitfnshowUpdateOpenedExternal");
    },


    fnAssignTickets(request) {
      console.log("Request Assign Tickets List---------->>>>",JSON.stringify(request))
      let self = this;
      if (self.formData.so == "") {
        self.$q.notify({
          color: "negative",
          position: "bottom",
          message: "Request Mode cannot be empty!",
          icon: "thumb_down"
        });
      } 
      else {
        this.$q.loading.show({
          delay: 100, // ms
          spinnerColor: "purple-9",
          message: "Please wait.."
        });
        let postValues = {
          userId: self.formData.so,
          request: [this.propRowDetails]
        };
        self.PHONEPE_PICKUP_TICKET_ASSIGNED(postValues)
          .then(() => {
              this.$emit("emitfnshowUpdateOpenedExternal");
              this.$q.notify({
                color: "positive",
                position: "bottom",
                message: "Updated Successfully",
                icon: "thumb_up"
              });
              this.$q.loading.hide();
              this.ajaxLoadAllLeadInfo1({
                pagination: this.paginationControl,
                filter: this.filterSearch
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

    implementationExecutiveList() {
      this.IMPLEMENTATION_EXECUTIVE_LIST().then(response => {
        let assumeArr = [];
        this.getImplementationExecutiveList.map(function(value) {
          assumeArr.push({
            label: value.name + " | " + value.employeeID + " | " + value.email,
            value: value.id
          });
        });
        this.assignToOptions = assumeArr;
      });
    },
  }
};
</script>

<style></style>
