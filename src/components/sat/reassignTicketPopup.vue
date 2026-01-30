<template>
  <q-page>
    <q-modal
      minimized
      no-backdrop-dismiss
      class="customModalOverlay"
      v-model="toggleModel"
      :content-css="{ padding: '6px', minWidth: '60vw' }"
    >
      <div class="row q-pa-md">
        <div class="col-12 q-title text-weight-regular bottom-border">
          Action Bar
        </div>
        <q-card class="q-pa-md" style="width: 150%">
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
                  <div>{{this.propRowDetails.subTicketsList[0].moveToSatDate | moment("Do MMM Y")}}</div>
                </div>
                <br />
                <div class="q-mb-md">
                  <q-item-label><b>Reassign Remarks:</b></q-item-label>
                  <div>
                    <textarea
                      placeholder="Reason Type.."
                      class="q-my-md custom-textarea"
                      color="grey-9"
                      align="left"
                      v-model="formData.reason"
                      :style="{ width: '60%', height: '56px' }"
                    ></textarea>
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
                /><br /><br />
                <div class="q-mb-md row justify-end items-center">
                  <q-item-label><b>Reassign Count:</b></q-item-label>
                  <div class="q-ml-sm">{{count}}</div>
                </div>
                <br />
                <div class="q-mb-md row justify-end items-center">
                  <q-btn
                    label="Assign History"
                    @click="fnAssignHistoryPopup(props)"
                    color="purple-9"
                  />
                </div>
              </div>
            </div>
          </q-card-section>
          <q-card-actions align="center">
            <q-btn
              :disabled="!formData.so || !formData.reason"
              highlight
              push
              style="width: 90px"
              label="Re-Assign"
              @click="fnReassignTickets(formData)"
              color="blue"
            />
            <q-btn
              highlight
              push
              label="Close"
              style="width: 90px"
              align="center"
              @click="emitfnshowUpdateOpenedExternal()"
              color="negative"
            />
          </q-card-actions>
        </q-card>
      </div>
    </q-modal>
    <assignHistoryPopup
      v-if="propShowUpdateAssignHistoryPopup"
      :propShowUpdateAssignHistoryPopup="propShowUpdateAssignHistoryPopup"
      :propRowDetails="propRowDetails"
      @emitfnshowUpdateOpenedExternal="fnAssignHistoryPopup"
    ></assignHistoryPopup>
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
import { mapGetters, mapActions } from "vuex";
import assignHistoryPopup from "../../components/sat/assignHistoryPopup.vue";
export default {
  props: ["propShowUpdateReassignTicket", "propRowDetails"],
  name: "MDRdetails",
  components: {
    assignHistoryPopup
  },
  data() {
    return {
      /* START >> Modal props */
      toggleModel: this.propShowUpdateReassignTicket,
      showLeadSourceModal: false,
      showDeviceDetailModal: false,
      propShowUpdateAssignHistoryPopup: false,
      showMerchantModal: false,
      assignToOptions: [],
      ReasonListOptions: [],
        assignHistoryRemarks: [],
        count:"",
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
        this.assignHistoryList(this.propRowDetails)

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
        ...mapGetters("serviceRequestPhonepeSat", ["getassignHistoryLists"])
  },

  methods: {
    ...mapActions("ImplementationExecutive", ["IMPLEMENTATION_EXECUTIVE_LIST"]),
    ...mapActions("serviceRequestPhonepeSat", [
      "FETCH_PHONEPE_OPENED_TICKETS",
      "FETCH_PHONEPE_RESOLVED_TICKET",
      "PHONEPE_PICKUP_TICKET_ASSIGNED",
      "PHONEPE_REASSIGNED_MERCHANT_TICKETS"
    ]),
        ...mapActions("serviceRequestPhonepeSat", ["ASSIGN_HISTORY_REMARKS_LIST"]),
    emitfnshowUpdateOpenedExternal() {
      this.$emit("emitfnshowUpdateOpenedExternal");
    },
    fnReassignTickets(request) {
      console.log("fnReassignTickets ------>", JSON.stringify(request));

      this.$q
        .dialog({
          title: "Confirm",
          message: "Are you sure want to Re-Assign the lead?",
          ok: "Continue",
          cancel: "Cancel"
        })
        .then(() => {
          this.$q.loading.show({
            delay: 0, // ms
            spinnerColor: "purple-9",
            message: "Processing .."
          });
          let param = {
            userId: request.so,
            request: [
              {
                id: this.propRowDetails.id,
                tid: this.propRowDetails.tid,
                mid: this.propRowDetails.mid,
                leadId: this.propRowDetails.leadId,
                meName: this.propRowDetails.meName,
                address: this.propRowDetails.address,
                state: this.propRowDetails.state,
                city: this.propRowDetails.city,
                pincode: this.propRowDetails.pincode,
                contactNumber: this.propRowDetails.contactNumber,
                emailId: this.propRowDetails.emailId,
                deviceType: this.propRowDetails.deviceType,
                serviceReqTicketId: this.propRowDetails.serviceReqTicketId,
                serviceRequestTicketStatus: this.propRowDetails.serviceRequestTicketStatus,
                source: this.propRowDetails.source,
                serviceRequestMode: this.propRowDetails.serviceRequestMode,
                bpRegion: this.propRowDetails.bpRegion,
                assignedTo: this.propRowDetails.assignedTo,
                createdBy: this.propRowDetails.createdBy,
                crmRemark: this.propRowDetails.crmRemark,
                reAssignReason: request.Reassign,
                reAssignRemark: request.reason,
                createdDate: this.propRowDetails.createdDate,
                updatedDate: this.propRowDetails.updatedDate,
                subTicketsList: null
              }
            ]
          };
          console.log("param ------>", JSON.stringify(param));

          this.PHONEPE_REASSIGNED_MERCHANT_TICKETS(param)
            .then(() => {
              this.$emit("emitfnshowUpdateOpenedExternal");
              this.$q.loading.hide();
              this.$q.notify({
                color: "positive",
                position: "bottom",
                message: "Updated Successfully",
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

fnAssignHistoryPopup(rowDetails) {
      this.propShowUpdateAssignHistoryPopup = !this
        .propShowUpdateAssignHistoryPopup;
      this.ajaxLoadAllLeadInfo({
        pagination: this.paginationControl,
        filter: this.filterSearch
      });

  this.assignHistoryList(this.propRowDetails)
      // eslint-disable-next-line eqeqeq
      if (rowDetails != undefined) {
        this.propRowDetails = rowDetails;
      }
    },

assignHistoryList(request) {
  console.log("INSIDE",request)
 var data ={
    Id: request.id
  }
      this.ASSIGN_HISTORY_REMARKS_LIST(data)
        .then(response => {
          this.assignHistoryRemarks = this.getassignHistoryLists;
          console.log("Response",this.assignHistoryRemarks.length)
          this.count = this.assignHistoryRemarks.length
          // console.log(
          //   "ASSIGN_HISTORY_REMARKS_LIST ------->",
          //   JSON.stringify(this.assignHistoryRemarks)
          // );
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
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
