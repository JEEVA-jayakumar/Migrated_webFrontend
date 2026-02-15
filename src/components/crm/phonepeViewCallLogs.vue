<!-- <template>
  <div>
    <q-dialog
      v-model="toggleModal"
      class="q-mt-lg capitalize"
      @hide="emitToggleRemarks"
      @escape-key="emitToggleRemarks"
      :content-css="{ minWidth: '60vw', padding: '10px' }"
    >
      <div class="row items-center bottom-border q-py-sm">
        <div class="col">View Call Logs</div>
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

      <div class="row q-my-sm">
        <div class="col">
          <b>DATE:</b>
        </div>
        <div class="col">
          <b>REMARKS:</b>
        </div>
      </div>

      <div v-for="log in callLogs" :key="log.id" class="row q-py-xs">
        <div class="col">{{ formatDate(log.inputDate) }}</div>
        <div class="col">{{ log.remarks }}</div>
      </div>
    </q-dialog>
  </div>
</template>

<script>
import { required } from '@vuelidate/validators';
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ticketActionBar",
  props: ["propToggleViewCallLogs", "propToggleViewCallLogsPop", "callInfo"],
  data() {
    return {
      toggleModal: this.propToggleViewCallLogsPop,
      callLogs: [],
      selectedDate: null,
      formData: {
        serviceTicketId: this.callInfo.subTicketsList[0].id
      }
    };
  },
  computed: {
    ...mapGetters("phonePeCrm", ["getviewlogs"])
  },
  beforeMount() {
    this.fetchLogs();
  },
  methods: {
    ...mapActions("phonePeCrm", ["PHONE_PE_VIEW_CALL_LOGS"]),

    fetchLogs() {
      this.PHONE_PE_VIEW_CALL_LOGS(this.formData)
        .then(response => {
          this.callLogs = this.getviewlogs;
          this.$q.notify({
            color: "positive",
            position: "bottom",
            message: "Remarks updated successfully",
            icon: "thumb_up"
          });
        })
        .catch(error => {
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message: "Please try again later.",
            icon: "thumb_down"
          });
        });
    },
    emitToggleRemarks() {
      this.$emit("closeViewCallLogs");
    },
    reset() {
      this.selectedDate = null;
      this.callRemarks = "";
    },
    onDateChange(date) {
      this.selectedDate = new Date(date).toISOString();
    },
    formatDate(timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleDateString();
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
 -->

<template>
  <div>
    <q-dialog
      v-model="toggleModal"
      no-backdrop-dismiss
      class="q-mt-lg capitalize"
      @hide="emitToggleRemarks"
      @escape-key="emitToggleRemarks"
      :content-css="{ minWidth: '45vw', padding: '10px' }"
    >
      <div class="row items-center bottom-border q-py-sm">
        <div class="col">View Call Logs</div>
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

      <q-table :rows="callLogs" :columns="columns" @request="fetchLogs">
   
          <q-td v-slot:body-cell-inputDate="props" :props="props">
            {{ props.row.inputDate | moment("Do MMM Y") }}
          </q-td>
          <!-- <q-td :props="props" field="remarks">
            {{ props.row.remarks }}
          </q-td> -->
    
      </q-table>
    </q-dialog>
  </div>
</template>

<script>
import { required } from '@vuelidate/validators';
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ticketActionBar",
  props: ["propToggleViewCallLogs", "propToggleViewCallLogsPop", "callInfo"],
  data() {
    return {
      toggleModal: this.propToggleViewCallLogsPop,
      callLogs: [],
      selectedDate: null,
      formData: {
        serviceTicketId: this.callInfo.subTicketsList[0].id
      },
      columns: [
        {
          name: "inputDate",
          label: "Date",
          align: "left",
          field: "inputDate",
          required: true
        },
        {
          name: "remarks",
          label: "Remarks",
          align: "left",
          field: row => {
            return row.remarks;
          },
          required: true
        }
      ]
    };
  },
  computed: {
    ...mapGetters("phonePeCrm", ["getviewlogs"])
  },
  beforeMount() {
    this.fetchLogs();
  },
  methods: {
    ...mapActions("phonePeCrm", ["PHONE_PE_VIEW_CALL_LOGS"]),

    fetchLogs() {
      this.PHONE_PE_VIEW_CALL_LOGS(this.formData)
        .then(response => {
          this.callLogs = this.getviewlogs;
        })
        .catch(error => {
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message: "Please try again later.",
            icon: "thumb_down"
          });
        });
    },
    emitToggleRemarks() {
      this.$emit("closeViewCallLogs");
    },
    reset() {
      this.selectedDate = null;
      this.callRemarks = "";
    },
    onDateChange(date) {
      this.selectedDate = new Date(date).toISOString();
    },
    formatDate(timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleDateString();
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
