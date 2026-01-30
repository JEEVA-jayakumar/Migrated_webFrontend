<template>
  <q-page>
    <div>
      <!--START: table title -->
      <div
        class="col-md-12 q-title q-px-lg q-py-md text-weight-regular bottom-border text-grey-9"
      >Aging Tracker for Pending Leads</div>
      <!--END: table title -->
      <!--START: table lead validation -->
      <q-table
        title="Lead Validation"
        table-class="customTableClass"
        class="q-py-none"
        :data="tableData"
        :columns="columns"
        :filter="filter"
        :pagination.sync="paginationControl"
        row-key="name"
      >
        <template slot="top" slot-scope="props" class="bottom-border">
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
            <q-search
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
          name: "soName",
          required: true,
          label: "SO Name",
          align: "left",
          field: "soName",
          sortable: true
        },
        {
          name: "shortLead",
          required: true,
          label: "Short Lead",
          align: "center",
          field: "shortLead",
          sortable: true
        },
        {
          name: "fullLead",
          required: true,
          label: "Full Lead",
          align: "left",
          field: "fullLead",
          sortable: true
        },
        {
          name: "pendingDays",
          required: true,
          label: "Pending Days",
          align: "left",
          field: "pendingDays",
          sortable: true
        }
      ],
      loading: true,
      tableData: [
        {
          soName: "Arun Kumar",
          shortLead: 4,
          fullLead: 7,
          pendingDays: ">7 days"
        },
        {
          soName: "Arun Kumar",
          shortLead: 4,
          fullLead: 7,
          pendingDays: ">7 days"
        },
        {
          soName: "Arun Kumar",
          shortLead: 4,
          fullLead: 7,
          pendingDays: ">7 days"
        },
        {
          soName: "Arun Kumar",
          shortLead: 4,
          fullLead: 7,
          pendingDays: ">7 days"
        },
        {
          soName: "Arun Kumar",
          shortLead: 4,
          fullLead: 7,
          pendingDays: ">7 days"
        },
        {
          soName: "Arun Kumar",
          shortLead: 4,
          fullLead: 7,
          pendingDays: ">7 days"
        },
        {
          soName: "Arun Kumar",
          shortLead: 4,
          fullLead: 7,
          pendingDays: ">7 days"
        },
        {
          soName: "Arun Kumar",
          shortLead: 4,
          fullLead: 7,
          pendingDays: ">7 days"
        },
        {
          soName: "Arun Kumar",
          shortLead: 4,
          fullLead: 7,
          pendingDays: ">7 days"
        },
        {
          soName: "Arun Kumar",
          shortLead: 4,
          fullLead: 7,
          pendingDays: ">7 days"
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
