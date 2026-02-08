<template>
  <div>
    <q-dialog v-model="opened" class="q-mt-lg capitalize" @hide="emitToggleRemarks" @escape-key="emitToggleRemarks"
      :content-css="{ minWidth: '40vw', padding: '20px' }">

      <div class="row items-center bottom-border q-py-sm">
        <div class="col">Lead Information</div>
        <div class="col-auto">
          <q-btn round size="sm" @click="emitToggleRemarks" outline color="dark" icon="clear" />
        </div>
      </div>

      <!-- START >> Lead information -->
      <div class="row">
        <div>
          <q-scroll-area style="width: 600px; height: 400px;">
            <q-list multiline separator class="text-body1">

              <div class="col">
              <q-item multiline>
                <q-td>
                  <div class="text-left text-caption text-grey-8 text-weight-medium">Request Type
                  </div>
                  <div class="text-left" v-if="ServiceRequest.subTicketsList.length > 0">
                    <div v-for="col in ServiceRequest.subTicketsList" :key="col.serviceRequestType.id" >
                      <span>
                        {{ col.serviceRequestType != null ? col.serviceRequestType.name : "NA" }}
                      </span><br />
                    </div>
                  </div>
                </q-td>
              </q-item>
              </div>

              <div class="col">
              <q-item multiline>
                <q-td>
                  <div class="text-left text-caption text-grey-8 text-weight-medium">IssueType
                  </div>
                  <div class="text-left" v-if="ServiceRequest.subTicketsList.length > 0">
                    <div v-for="col in ServiceRequest.subTicketsList" :key="col.serviceRequestType.id">
                      <span>
                        {{ col.serviceRequestIssueType != null ? col.serviceRequestIssueType : "NA" }}
                      </span><br />
                    </div>
                  </div>
                </q-td>
              </q-item>
              </div>

              <div class="col">
              <q-item multiline>
              <q-td>
                <div class="text-left text-caption text-grey-8 text-weight-medium">SubTicket Status</div>
                <div class="text-left" v-if="ServiceRequest.subTicketsList.length > 0">
                  <div v-for="col in ServiceRequest.subTicketsList" :key="col.serviceRequestType.id">
                    <span>
                      {{ col.serviceRequestSubTicketStatus != null ? col.serviceRequestSubTicketStatus.name : "NA" }}
                    </span><br />
                  </div>
                </div>
              </q-td>
            </q-item>
            </div>

            <div class="col">
              <q-item multiline>
                <q-td>
                  <div class="text-left text-caption text-grey-8 text-weight-medium">Schedule Date</div>
                  <div class="text-left" v-if="ServiceRequest.subTicketsList.length > 0">
                    <div v-for="col in ServiceRequest.subTicketsList" :key="col.serviceRequestType.id">
                      <span>{{ col.scheduleDate != null ? col.scheduleDate : "NA" }}</span><br />
                    </div>
                  </div>
                </q-td>
              </q-item>
              </div>

              <div class="col">
              <q-item multiline>
              <q-td>
                <div class="text-left text-caption text-grey-8 text-weight-medium">Pod Number</div>
                <div class="text-left" v-if="ServiceRequest.subTicketsList.length > 0">
                  <div v-for="col in ServiceRequest.subTicketsList" :key="col.serviceRequestType.id" >
                    <span>{{ col.podNumber != null ? col.podNumber : "NA" }}</span><br />
                  </div>
                </div>
              </q-td>
            </q-item>
            </div>

            <div class="col">
              <q-item multiline>
                <q-td>
                  <div class="text-left text-caption text-grey-8 text-weight-medium">Service Remarks
                  </div>
                  <div class="text-left" v-if="ServiceRequest.subTicketsList.length > 0">
                    <div v-for="col in ServiceRequest.subTicketsList" :key="col.serviceRequestType.id" >
                      <span>{{ col.serviceRemarks != null ? col.serviceRemarks : "NA" }}</span><br />
                    </div>
                  </div>
                </q-td>
              </q-item>
              </div>

              <div class="col">
              <q-item multiline>
              <q-td>
                <div class="text-left text-caption text-grey-8 text-weight-medium">Cancel Reason</div>
                <div class="text-left" v-if="ServiceRequest.subTicketsList.length > 0">
                  <div v-for="col in ServiceRequest.subTicketsList" :key="col.serviceRequestType.id">
                    <span>{{ col.cancelReason != null ? col.cancelReason : "NA" }}</span><br />
                  </div>
                </div>
              </q-td>
            </q-item>
            </div>

            <div class="col">
              <q-item multiline>
                <q-td>
                  <div class="text-left text-caption text-grey-8 text-weight-medium">Issue Remark</div>
                  <div class="text-left" v-if="ServiceRequest.subTicketsList.length > 0">
                    <div v-for="col in ServiceRequest.subTicketsList" :key="col.serviceRequestType.id">
                      <span>{{ col.issueRemark != null ? col.issueRemark : "NA" }}</span><br />
                    </div>
                  </div>
                </q-td>
              </q-item>
              </div>
              
              <div class="col">
              <q-item multiline>
              <q-td>
                <div class="text-left text-caption text-grey-8 text-weight-medium">Remark</div>
                <div class="text-left" v-if="ServiceRequest.subTicketsList.length > 0">
                  <div v-for="col in ServiceRequest.subTicketsList" :key="col.serviceRequestType.id">
                    <span>{{ col.remark != null ? col.remark : "NA" }}</span><br />
                  </div>
                </div>
              </q-td>
            </q-item>
            </div>

            <div class="col">
              <q-item multiline>
                <q-td>
                  <div class="text-left text-caption text-grey-8 text-weight-medium">Latitude</div>
                  <div class="text-left" v-if="ServiceRequest.subTicketsList.length > 0">
                    <div v-for="col in ServiceRequest.subTicketsList" :key="col.serviceRequestType.id" >
                      <span>{{ col.latitude != null ? col.latitude : "NA" }}</span><br />
                    </div>
                  </div>
                </q-td>
              </q-item>
              </div>

              <div class="col">
              <q-item multiline>
                <q-td>
                  <div class="text-left text-caption text-grey-8 text-weight-medium">Longitude</div>
                  <div class="text-left" v-if="ServiceRequest.subTicketsList.length > 0">
                    <div v-for="col in ServiceRequest.subTicketsList" :key="col.serviceRequestType.id">
                      <span>{{ col.longitude != null ? col.longitude : "NA" }}</span><br />
                    </div>
                  </div>
                </q-td>
              </q-item>
              </div>

              <div class="col">
              <q-item multiline>
                <q-td>
                  <div class="text-left text-caption text-grey-8 text-weight-medium">Implementation Form</div>
                  <div class="text-left" v-if="ServiceRequest.subTicketsList.length > 0">
                    <div v-for="col in ServiceRequest.subTicketsList" :key="col.serviceRequestType.id" >
                      <span>{{ col.implementationForm != null ? col.implementationForm : "NA" }}</span><br />
                    </div>
                  </div>
                </q-td>
              </q-item>
              </div>

              <div class="col">
              <q-item multiline>
                <q-td>
                  <div class="text-left text-caption text-grey-8 text-weight-medium">Picture Of Shop</div>
                  <div class="text-left" v-if="ServiceRequest.subTicketsList.length > 0">
                    <div v-for="col in ServiceRequest.subTicketsList" :key="col.serviceRequestType.id" >
                      <span>{{ col.pictureOfShop != null ? col.pictureOfShop : "NA" }}</span><br />
                    </div>
                  </div>
                </q-td>
              </q-item>
              </div>

              <div class="col">
              <q-item multiline>
                <q-td>
                  <div class="text-left text-caption text-grey-8 text-weight-medium">Old Sim Number</div>
                  <div class="text-left" v-if="ServiceRequest.subTicketsList.length > 0">
                    <div v-for="col in ServiceRequest.subTicketsList" :key="col.serviceRequestType.id" >
                      <span>{{ col.oldSimNumber != null ? col.oldSimNumber : "NA" }}</span><br />
                    </div>
                  </div>
                </q-td>
              </q-item>
              </div>

              <div class="col">
              <q-item multiline>
                <q-td>
                  <div class="text-left text-caption text-grey-8 text-weight-medium">Old Sim Network</div>
                  <div class="text-left" v-if="ServiceRequest.subTicketsList.length > 0">
                    <div v-for="col in ServiceRequest.subTicketsList" :key="col.serviceRequestType.id">
                      <span>{{ col.oldSimNetwork != null ? col.oldSimNetwork : "NA" }}</span><br />
                    </div>
                  </div>
                </q-td>
              </q-item>
              </div>

              <div class="col">
              <q-item multiline>
                <q-td>
                  <div class="text-left text-caption text-grey-8 text-weight-medium">New Sim Number</div>
                  <div class="text-left" v-if="ServiceRequest.subTicketsList.length > 0">
                    <div v-for="col in ServiceRequest.subTicketsList" :key="col.serviceRequestType.id">
                      <span>{{ col.newSimNumber != null ? col.newSimNumber : "NA" }}</span><br />
                    </div>
                  </div>
                </q-td>
              </q-item>
              </div>

              <div class="col">
              <q-item multiline>
                <q-td>
                  <div class="text-left text-caption text-grey-8 text-weight-medium">New Sim Network</div>
                  <div class="text-left" v-if="ServiceRequest.subTicketsList.length > 0">
                    <div v-for="col in ServiceRequest.subTicketsList" :key="col.serviceRequestType.id">
                      <span>{{ col.newSimNetwork != null ? col.newSimNetwork : "NA" }}</span><br />
                    </div>
                  </div>
                </q-td>
              </q-item>
              </div>

              <div class="col">
              <q-item multiline>
                <q-td>
                  <div class="text-left text-caption text-grey-8 text-weight-medium">Scan Sim Number</div>
                  <div class="text-left" v-if="ServiceRequest.subTicketsList.length > 0">
                    <div v-for="col in ServiceRequest.subTicketsList" :key="col.serviceRequestType.id" >
                      <span>{{ col.scanSimNumber != null ? col.scanSimNumber : "NA" }}</span><br />
                    </div>
                  </div>
                </q-td>
              </q-item>
              </div>

              <div class="col">
              <q-item multiline>
                <q-td>
                  <div class="text-left text-caption text-grey-8 text-weight-medium">Scan Device</div>
                  <div class="text-left" v-if="ServiceRequest.subTicketsList.length > 0">
                    <div v-for="col in ServiceRequest.subTicketsList" :key="col.serviceRequestType.id" >
                      <span>{{ col.scanDeviceSerialNumber != null ? col.scanDeviceSerialNumber : "NA" }}</span><br />
                    </div>
                  </div>
                </q-td>
              </q-item>
            </div>

              <div class="col">
              <q-item multiline>
                <q-td>
                  <div class="text-left text-caption text-grey-8 text-weight-medium">Part Type</div>
                  <div class="text-left" v-if="ServiceRequest.subTicketsList.length > 0">
                    <div v-for="col in ServiceRequest.subTicketsList" :key="col.serviceRequestType.id">
                      <span>{{ col.partType != null ? col.partType : "NA" }}</span><br />
                    </div>
                  </div>
                </q-td>
              </q-item>
              </div>

              <div class="col">
              <q-item multiline>
                <q-td>
                  <div class="text-left text-caption text-grey-8 text-weight-medium">Paper Roll Count</div>
                  <div class="text-left" v-if="ServiceRequest.subTicketsList.length > 0">
                    <div v-for="col in ServiceRequest.subTicketsList" :key="col.serviceRequestType.id">
                      <span>{{ col.paperRollCount != null ? col.paperRollCount : "NA" }}</span><br />
                    </div>
                  </div>
                </q-td>
              </q-item>
              </div>
            </q-list>
          </q-scroll-area>
        </div>
      </div>
      <!-- END >> Lead information -->
    </q-dialog>
  </div>
</template>
  
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["ServiceRequest", "propToggleServiceRequestPop"],
  data() {
    return {
      search: "",
      propLeadInformation: {},
      opened: this.propToggleServiceRequestPop
    };
  },

  // created() {
  //   this.ajaxLoadShortLeadInfo();
  // },
  computed: {
    ...mapGetters("SatLeadValidation", ["getShortLeadInfo"])
  },
  beforeMount() {

    // let size = this.ServiceRequest.subTicketsList.length
    // const lists = this.ServiceRequest.subTicketsList;
    // for (var i = 0; i < size; i++) {
    //   document.write("List of Datas"+lists[i]);
    //   ServiceRequest.subTicketsList[i] = this.ServiceRequest.subTicketsList[i]
    // }
  },

  methods: {
    ...mapActions("SatLeadValidation", ["FETCH_SHORT_LEAD_DATA"]),
    // Function to load all lead details
    ajaxLoadShortLeadInfo() {
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data .."
      });
      this.FETCH_SHORT_LEAD_DATA(
        this.ServiceRequest.leadInformation.id || this.ServiceRequest.leadInformation.leadName
      )
        .then(response => {
          this.propLeadInformation = this.getShortLeadInfo;
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },
    emitToggleRemarks() {
      this.$emit("closeServiceRequest");
    }
  }
};
</script>
  
<style>

</style>
  
