<template>
  <q-page>
    <!-- content -->
    <div>
      <q-table :data="getAllDevicesInfo" table-class="customSATableClass" :columns="columns" :filter="filterSearch" :pagination.sync="paginationControl" :filter-method="myCustomSearchFilter" row-key="name" color="grey-9">
        <q-td slot="body-cell-action" slot-scope="props" :props="props">
          <pre>{{props.row}}  </pre>
          <div class="row no-wrap no-padding">
            <q-btn dense no-caps no-wrap label="Modify" icon="far fa-plus-square" size="md" @click="fnShowEditDeviceTypes(props.row)" flat class="text-light-blue">
            </q-btn>
            <q-btn  dense no-caps no-wrap label="Disable" icon="far fa-minus-square" size="md" @click="fnDeleteDeviceType(props.row.id)" flat class="text-negative">
            </q-btn>
          </div>
        </q-td>

        <template slot="top" slot-scope="props">
          <div class="col-md-6 q-my-md" align="right">
            <q-btn no-caps no-wrap label="Add New Device" class="q-mt-lg text-weight-regular" color="purple-9" icon="far fa-plus-square" size="md" @click="fnshowCreateDeviceType()"/>
          </div>
          <!--END: table title -->

          <!--START: table filter,search -->
          <div class="col-md-5">
              <q-search
                clearable
                color="grey-9"
                v-model="filterSearch"
                placeholder="Type.."
                float-label="Search by name, short name"
                class="q-mr-lg"
              />
          </div>
          <!--END: table filter,search -->

        </template>
      </q-table>
     
      <!--START: Show create DeviceTypes -->
      <showCreateDeviceType 
      v-if="propShowCreateDeviceTypes" 
      :propShowCreateDeviceTypes="propShowCreateDeviceTypes"  
      @emitfnshowDeviceTypes="fnshowCreateDeviceType"
      @emitfnForDeviceTypeTable="ajaxLoadDataForDeviceTypeTable"
      ></showCreateDeviceType>
      <!--END: Show create DeviceTypes -->

      <!--START: Show edit DeviceTypes -->
      <showEditDeviceType 
      v-if="propShowEditDeviceTypes" 
      :propShowEditDeviceTypes="propShowEditDeviceTypes"  
      :propRowDetails="propRowDetails"
      @emitfnshowDeviceTypes="fnShowEditDeviceTypes"
      @emitfnForDeviceTypeTable="ajaxLoadDataForDeviceTypeTable"
      ></showEditDeviceType>
      <!--END: Show edit DeviceTypes -->

    </div>
  </q-page>
</template>

<script>
import showCreateDeviceType from "../../components/super_admin/showCreateDeviceTypes.vue";
import showEditDeviceType from "../../components/super_admin/showEditDeviceTypes.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "deviceTypes",
  components: {
    showCreateDeviceType,
    showEditDeviceType,
  },
  data() {
    return {
      propShowCreateDeviceTypes: false,
      propShowEditDeviceTypes: false,
      propRowDetails: "",

      filter: "",
      filterSearch: "",
      filter_values: "",
      multipleSelect: "",

      paginationControl: {
        rowsPerPage: 10,
      },

      //table information
      columns: [
        {
          name: "deviceType",
          required: true,
          label: "Device Type",
          align: "left",
          field: "deviceName",
          sortable: true,
        },
        {
          name: "action",
          required: true,
          label: "",
          align: "left",
          field: "action",
          sortable: true,
        },
      ],
    };
  },

  created() {
    /* START: Load user table data filter > DeviceTypes */
    this.ajaxLoadDataForDeviceTypeTable();
    /* End: Load user table data filter > DeviceTypes */
  },

  computed: {
    ...mapGetters("SA_Devices", ["getAllDevicesInfo"]),
  },

  methods: {
    ...mapActions("SA_Devices", ["FETCH_DEVICES_DATA", "DELETE_DEVICE_DATA"]),

    ajaxLoadDataForDeviceTypeTable() {
      this.FETCH_DEVICES_DATA();
    },
    fnshowCreateDeviceType() {
      this.propShowCreateDeviceTypes = !this.propShowCreateDeviceTypes;
    },

    fnShowEditDeviceTypes(rowDetails) {
      this.propShowEditDeviceTypes = !this.propShowEditDeviceTypes;
      this.propRowDetails = rowDetails;
    },

    fnDeleteDeviceType(rowDetails) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Are you sure want to delete device type?",
          ok: "Continue",
          cancel: "Cancel",
        })
        .then(() => {
          this.$q.loading.show({
            delay: 100, // ms
            message: "Please Wait",
            spinnerColor: "purple-9",
            customClass: "shadow-none",
          });
          this.DELETE_DEVICE_DATA(rowDetails)
            .then(response => {
              this.FETCH_DEVICES_DATA();
              this.$q.notify({
                color: "positive",
                position: "bottom",
                message: "Successfully removed",
                icon: "thumb_up",
              });
            })
            .catch(error => {
              this.$q.notify({
                color: "negative",
                position: "bottom",
                message: "Please try again!",
                icon: "thumb_down",
              });
            });
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message: "No changes made!",
            icon: "thumb_down",
          });
        });
    },

    myCustomSearchFilter(rows, terms, cols, cellValue) {
      const lowerTerms = terms ? terms.toLowerCase() : "";
      return rows.filter(row =>
        cols.some(
          col =>
            (cellValue(col, row) + "").toLowerCase().indexOf(lowerTerms) !== -1
        )
      );
    },
  },
};
</script>

<style>
</style>
