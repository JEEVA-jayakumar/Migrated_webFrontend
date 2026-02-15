<template>
  <q-dialog
    minimized
    position="right"
    v-model="toggleModal"
    no-backdrop-dismiss
    @escape-key="emitModalClose"
    class="customModalOverlay"
    :content-css="{padding:'60px 25px',minWidth:'40vw',minHeight:'100vh'}"
  >
    <div class="row items-center bottom-border q-py-sm">
      <div class="col">
        <div class="text-h6 text-weight-regular">Manage devices</div>
      </div>
      <div class="col" align="right">
        <q-btn outline round color="dark" size="sm" icon="clear" @click="emitModalClose"/>
      </div>
    </div>

    <!-- <q-card>
      <q-card-section class="q-pa-md">
        <div class="column group">
          <div>
            <q-input v-model="formData.device" 
              @blur="$v.formData.device.$touch"      
              :error="$v.formData.device.$error" 
              @keyup.enter="$v.formData.device.$touch"
              class="text-weight-regular text-grey-8" color="grey-9" float-label="Device" placeholder="Device" 
            />
          </div>
          <div align="right">
            <q-btn align="right" v-if="makeUpdateElementActive" @click="fnFinalUpdate(formData)" color="purple-9">Update</q-btn>
            <q-btn align="right" v-else @click="fnFinalCreate(formData)" color="purple-9">Save</q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>-->
    <q-table
      :rows="getAllDevicesInfo"
      table-class="customSATableClass"
      :columns="columns"
      :filter="filterSearch"
      :pagination="paginationControl"
      :filter-method="myCustomSearchFilter"
      row-key="name"
      color="grey-9"
    >
      <q-td v-slot:body-cell-action="props" :props="props">
        <div class="row no-wrap no-padding">
          <q-btn
            dense
            no-caps
            no-wrap
            label="Modify"
            icon="far fa-plus-square"
            size="md"
            @click="fnShowEditDeviceTypes(props.row)"
            flat
            class="text-light-blue"
          ></q-btn>
          <q-btn
            dense
            no-caps
            no-wrap
            label="Disable"
            icon="far fa-minus-square"
            size="md"
            @click="fnDeleteDeviceType(props.row.id)"
            flat
            class="text-negative"
          ></q-btn>
        </div>
      </q-td>

      <template v-slot:top="props">
        <!--START: table filter,search -->
        <div class="col-8">
          <q-input
            clearable
            color="grey-9"
            v-model="filterSearch"
            placeholder="Type.."
            float-label="Search by name, short name"
          />
        </div>
        <div class="col-4" align="right">
          <q-btn
            no-caps
            no-wrap
            label="Add New"
            class="text-weight-regular"
            color="purple-9"
            icon="far fa-plus-square"
            @click="fnshowCreateDeviceType()"
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
  </q-dialog>
</template>

<script>
import { required } from "@vuelidate/validators";
import showCreateDeviceType from "../../components/super_admin/showCreateDeviceTypes.vue";
import showEditDeviceType from "../../components/super_admin/showEditDeviceTypes.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["propToggleModal"],
  components: {
    showCreateDeviceType,
    showEditDeviceType
  },
  // name: 'ComponentName',
  data() {
    return {
      toggleModal: this.propToggleModal,
      makeUpdateElementActive: false,
      formData: {
        device: ""
      },

      propShowCreateDeviceTypes: false,
      propShowEditDeviceTypes: false,
      propRowDetails: "",

      filter: "",
      filterSearch: "",
      filter_values: "",
      multipleSelect: "",

      paginationControl: {
        rowsPerPage: 10
      },

      //table information
      columns: [
        {
          name: "deviceType",
          required: true,
          label: "Device Type",
          align: "left",
          field: "deviceName",
          sortable: true
        },
        {
          name: "action",
          required: true,
          label: "",
          align: "right",
          field: "action",
          sortable: true
        }
      ],

      /* START >>Table properties */
      filterSearch: "",
      paginationControl: {
        rowsPerPage: 5
      }
      /* END >>Table properties */
    };
  },

  validations: {
    formData: {
      device: {
        required
      }
    }
  },

  created() {
    /* START: Load user table data filter > DeviceTypes */
    this.ajaxLoadDataForDeviceTypeTable();
    /* End: Load user table data filter > DeviceTypes */
  },

  computed: {
    ...mapGetters("SA_Devices", ["getAllDevicesInfo"])
  },

  methods: {
    emitModalClose() {
      this.$emit("emitToggleModal");
    },

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
          cancel: "Cancel"
        })
        .then(() => {
          this.$q.loading.show({
            delay: 100, // ms
            message: "Please Wait",
            spinnerColor: "purple-9",
            customClass: "shadow-none"
          });
          this.DELETE_DEVICE_DATA(rowDetails)
            .then(response => {
              this.FETCH_DEVICES_DATA();
              this.$q.notify({
                color: "positive",
                position: "bottom",
                message: "Successfully removed",
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

    myCustomSearchFilter(rows, terms, cols, cellValue) {
      const lowerTerms = terms ? terms.toLowerCase() : "";
      return rows.filter(row =>
        cols.some(
          col =>
            (cellValue(col, row) + "").toLowerCase().indexOf(lowerTerms) !== -1
        )
      );
    }
  }
};
</script>

<style>
</style>
