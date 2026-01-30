<template>
  <div>
    <q-modal
      v-model="toggleModal"
      no-backdrop-dismiss
      class="q-mt-lg capitalize"
      @hide="emitToggleRemarks"
      @escape-key="emitToggleRemarks"
      :content-css="{ minWidth: '40vw', padding: '10px' }"
    >
      <div class="row items-center bottom-border q-py-sm">
        <div class="col">Call Logs</div>
        <div class="col-auto">
          <q-btn
            round
            size="sm"
            @click="emitToggleRemarks"
            outline
            color="dark"
            icon="clear"
          />
        </div>
      </div>

      <form>
        <div class="column group">
          <div class="q-title"></div>
          <div>
            <div class="row">
              <div class="col-sm-4">
                <q-datetime
                  v-model="selectedDate"
                  float-label="From Date"
                  color="purple-9"
                  :max="maxDate"
                  @input="onDateChange"
                  type="datetime"
                  format24h
                />
              </div>
              <div class="col-sm-1"></div>
              <div class="col-sm-7">
                <q-input
                  filled
                  v-model="callRemarks"
                  label="Enter your text"
                  aria-placeholder="enter remarks"
                  type="textarea"
                  rows="5"
                  maxlength="500"
                  counter
                  class="textarea-box"
                />
              </div>
            </div>
            <div class="row items-center bottom-border q-py-sm"></div>
            <div
              class="row q-gutter-sm"
              style="display: flex; justify-content: flex-end"
            >
              <q-btn
                @click="reset"
                color="purple-9"
                icon="refresh"
                label="Reset"
              />
              &nbsp;
              <q-btn
                @click="fnsubmit"
                color="purple-9"
                icon="save"
                label="Save"
              />
            </div>
          </div>
        </div>
      </form>
    </q-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { required } from "vuelidate/lib/validators";
import phonepeCallLogs from "./phonepeCallLogs.vue";

export default {
  name: "ticketActionBar",
  props: [
    "callInfo",
    "propToggleCallLogsPop",
    "propToggleCallLogs",
    "ActionBarInfo"
  ],

  data() {
    return {
      toggleModal: this.propToggleCallLogsPop,
      selectedDate: null,
      callRemarks: "",
      maxDate: new Date().toISOString(),
      formData: {
        // serviceTicketId: this.callInfo.subTicketsList.id,
        serviceTicketId: this.callInfo.subTicketsList[0].id,
        inputDate: this.selectedDate,
        remarks: this.callRemarks
      }
    };
  },

  watch: {
    selectedDate(newDate) {
      this.formData.inputDate = new Date(newDate).getTime(); // Convert to Unix timestamp (milliseconds)
    },

    computed: {
      ...mapGetters("phonePeCrm", ["getupdateRemarks"]),

    },

    callRemarks(newRemarks) {
      this.formData.remarks = newRemarks;
    }
  },

  methods: {
    ...mapActions("phonePeCrm", ["UPDATE_CALL_LOG_CRM_REMARKS"]),

    fnsubmit() {
      this.$q.loading.show({
        delay: 0,
        spinnerColor: "purple-9",
        message: "Data submitting.."
      });

      this.UPDATE_CALL_LOG_CRM_REMARKS(this.formData)
        .then(() => {
          this.$q.notify({
            color: "positive",
            position: "bottom",
            message: "Remarks updated successfully",
            icon: "thumb_up"
          });
          this.$q.loading.hide();
          this.emitToggleRemarks();
        })
        .catch(error => {
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message: error.body.message || "Please try again later.",
            icon: "thumb_down"
          });
          this.$q.loading.hide();
        });
    },

    emitToggleRemarks() {
      this.$emit("closeCallLogs");
    },

    reset() {
      this.selectedDate = null;
      this.callRemarks = "";
    },

    onDateChange(date) {

     this.selectedDate = new Date(date).getTime()
         
    }
  }
};
</script>

<style scoped>
.textarea-box {
  border: 1px solid #c0c0c0;
  border-radius: 4px;
  padding: 8px;
  background-color: #f9f9f9;
}
</style>
