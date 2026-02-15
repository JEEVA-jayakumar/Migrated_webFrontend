<template>
  <q-page>
    <div>
      <!--STARTv-model: table title -->
      <div
        class="col-md-12 text-h6 q-px-lg q-py-md text-weight-regular bottom-border text-grey-9"
      >Leads Pending Assignment</div>
      <!--END: table title -->
      <!--START: table lead validation -->
      <q-table
        title="Lead Validation"
        table-class="customTableClass"
        class="q-py-none"
        :rows="tableData"
        :columns="columns"
        :filter="filter"
        :pagination="paginationControl"
        row-key="name"
      >
        <template v-slot:top="props" class="bottom-border">
          <!--START: table fullscreen mode -->
          <!-- <div class="col-md-4" align="right">
            <q-btn
              :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
              @click="props.toggleFullscreen"
              class="q-mt-lg"
              color="grey-9"
              size="sm"
            />
          </div>-->
          <!--END: table fullscreen mode -->
          <!--START: table filter,search -->
          <div class="col-md-5">
            <q-input
              clearable
              color="grey-9"
              v-model="filter"
              placeholder="Type.."
              float-label="Search by SO name, Merchant Name, Lead ID"
              class="q-mr-lg q-py-sm"
            />
          </div>
          <!--END: table filter,search -->
        </template>
      </q-table>
      <!--END: table lead validation -->
      <!--START >>  Show Ajax Spinner -->
      <div v-if="toggleAjaxLoadFilter" class="fullscreen spinner-overlay">
        <q-spinner-bars class="absolute-center" style="color:#61116a" :size="35"/>
      </div>
      <!--END >>  Show Ajax Spinner -->
    </div>
  </q-page>
</template>

<script>
import { required } from '@vuelidate/validators';
export default {
  name: "leadsPendingAssignment",
  data() {
    return {
      filter: "",
      toggleAjaxLoadFilter: false,
      paginationControl: {
        rowsPerPage: 10
      },
      columns: [
        {
          name: "dateCreated",
          required: true,
          label: "Date Created",
          align: "left",
          field: "dateCreated",
          sortable: true
        },
        {
          name: "submittedOn",
          required: true,
          label: "Submitted On",
          align: "center",
          field: "submittedOn",
          sortable: true
        },
        {
          name: "leadId",
          required: true,
          label: "Lead ID",
          align: "left",
          field: "leadId",
          sortable: true
        },
        {
          name: "merchant_name",
          required: true,
          label: "Merchant Name",
          align: "left",
          field: "merchant_name",
          sortable: true
        },
        {
          name: "location",
          required: true,
          label: "Location",
          align: "left",
          field: "location",
          sortable: true
        },
        {
          name: "so_name",
          required: true,
          label: "SO Name",
          align: "left",
          field: "so_name",
          sortable: true
        }
      ],
      loading: true,
      tableData: [
        {
          dateCreated: "29 Apr, 2018",
          submittedOn: "29 Apr, 2018",
          leadId: 545454,
          merchant_name: "Bombay Fries",
          location: "Chennai",
          so_name: "Dinesh"
        },
        {
          dateCreated: "29 Apr, 2018",
          submittedOn: "29 Apr, 2018",
          leadId: 545454,
          merchant_name: "Bombay Fries",
          location: "Chennai",
          so_name: "Dinesh"
        },
        {
          dateCreated: "29 Apr, 2018",
          submittedOn: "29 Apr, 2018",
          leadId: 545454,
          merchant_name: "Bombay Fries",
          location: "Chennai",
          so_name: "Dinesh"
        },
        {
          dateCreated: "29 Apr, 2018",
          submittedOn: "29 Apr, 2018",
          leadId: 545454,
          merchant_name: "Bombay Fries",
          location: "Chennai",
          so_name: "Dinesh"
        },
        {
          dateCreated: "29 Apr, 2018",
          submittedOn: "29 Apr, 2018",
          leadId: 545454,
          merchant_name: "Bombay Fries",
          location: "Chennai",
          so_name: "Dinesh"
        },
        {
          dateCreated: "29 Apr, 2018",
          submittedOn: "29 Apr, 2018",
          leadId: 545454,
          merchant_name: "Bombay Fries",
          location: "Chennai",
          so_name: "Dinesh"
        },
        {
          dateCreated: "29 Apr, 2018",
          submittedOn: "29 Apr, 2018",
          leadId: 545454,
          merchant_name: "Bombay Fries",
          location: "Chennai",
          so_name: "Dinesh"
        },
        {
          dateCreated: "29 Apr, 2018",
          submittedOn: "29 Apr, 2018",
          leadId: 545454,
          merchant_name: "Bombay Fries",
          location: "Chennai",
          so_name: "Dinesh"
        },
        {
          dateCreated: "29 Apr, 2018",
          submittedOn: "29 Apr, 2018",
          leadId: 545454,
          merchant_name: "Bombay Fries",
          location: "Chennai",
          so_name: "Dinesh"
        },
        {
          dateCreated: "29 Apr, 2018",
          submittedOn: "29 Apr, 2018",
          leadId: 545454,
          merchant_name: "Bombay Fries",
          location: "Chennai",
          so_name: "Dinesh"
        }
      ],
      lazy: [],
      select: "fb",
      multipleSelect: ["goog", "twtr"],
      error: true,
      warning: false,
      options: [
        {
          label: "Google",
          value: "goog"
        },
        {
          label: "Facebook",
          value: "fb"
        },
        {
          label: "Twitter",
          value: "twtr"
        },
        {
          label: "Apple Inc.",
          value: "appl"
        },
        {
          label: "Oracle",
          value: "ora"
        }
      ]
    };
  }
};
</script>

<style>
</style>
