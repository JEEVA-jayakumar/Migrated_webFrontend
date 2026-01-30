<template>
  <q-page>
    <!-- content -->
    <div>

      <q-tabs v-model="selectedTab" class="shadow-1" color="grey-1" @select="changeTabs">
        <q-tab default color="dark" name="active" slot="title" label="Active" />
        <!--:data="activeTableData"-->
        <q-tab-pane name="active">
          <q-table :data="activeTableData" table-class="customSATableClass" :columns="columns" :filter="filterSearch"
            :pagination.sync="paginationControl" :filter-method="myCustomSearchFilter" row-key="name" color="grey-9"
            @request="ajaxLoadData">

            <q-td slot="body-cell-vas" slot-scope="props" :props="props">
              <div inline color="light" class="row no-wrap group text-dark" v-for="vas in props.row.vasList">{{vas.name}}</div>
            </q-td>
            <q-td slot="body-cell-action" slot-scope="props" :props="props">
              <div class="row no-wrap no-padding">
                <q-btn dense no-caps no-wrap label="Modify" icon="far fa-plus-square" size="md"
                  @click="fnEdit(props.row)" flat class="text-light-blue"></q-btn>
              </div>
            </q-td>
            <template slot="top" slot-scope="props">
              <!--START: table title -->
              <!--END: table title -->
              <!--START: table filter,search -->
              <div class="col-md-6">
                <q-search clearable color="grey-9" v-model="filterSearch" placeholder="Type.." class="q-mr-lg" />
              </div>
              <div class="col-md-12" align="right">
                <q-btn no-caps class="text-weight-regular" @click="fnaddLeadSourceVasDevice()" label="Add New"
                  color="purple-9" size="md" />
              </div>
              <!--END: table filter,search -->
            </template>
          </q-table>
        </q-tab-pane>
      </q-tabs>

      <!--START: Show create Hierarchy -->
      <showAddLeadSOurceVasDevice 
      v-if="propShowAddLeadSOurceVasDevice" 
      :propShowAddLeadSOurceVasDevice="propShowAddLeadSOurceVasDevice"
        @emitAddLeadSOurceVasDevice="propShowAddLeadSOurceVasDevice" />
      <!--END: Show create Hierarchy -->

      <!--START: Show edit LeadSources -->
      <showEditLsVasDevice v-if="propShowEditLsVasDevice" :propShowEditLsVasDevice="propShowEditLsVasDevice"
        :propRowDetails="propRowDetails" @emitfnshowLsVasDevice="refreshLeadSourceList"></showEditLsVasDevice>
      <!--END: Show edit LeadSources -->
    </div>
  </q-page>
</template>
  
<script>
import showAddLeadSOurceVasDevice from "../../components/super_admin/AddLeadSOurceVasDevice.vue";
import showEditLsVasDevice from "../../components/super_admin/leadSourceVasDeviceModify.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "users",
  components: {
    showAddLeadSOurceVasDevice,
    showEditLsVasDevice,
  },
  data() {
    return {
      propShowAddLeadSOurceVasDevice: false,
      propShowEditLsVasDevice: false,
      propRowDetails: "",

      filter: "",
      filterSearch: "",
      filterSearch1: "",
      filter_values: "",
      selectedTab: "",
      multipleSelect: "",

      paginationControl: {
        rowsPerPage: 10,
      },
      paginationControl1: {
        rowsPerPage: 10,
      },

      //table information
      columns: [
        {
          name: "device",
          required: true,
          label: "Device Name",
          align: "left",
          field: row => {
            return row.leadSourceDeviceVasMapping.device.deviceName;
          },
          sortable: false,
        },
        {
          name: "leadSource",
          required: true,
          label: "LeadSource",
          align: "left",
          field: row => {
            return row.leadSourceDeviceVasMapping.leadSource.sourceName;
          },
          sortable: false,
        },
        {
          name: "vas",
          required: true,
          label: "Vas",
          align: "left",
          field: row => {
            return row.vasList;
          },
          sortable: false,
        },
        {
          name: "action",
          required: true,
          label: "",
          align: "left",
          field: "action",
          sortable: true
        }
      ],

      tableData: [],
      activeTableData: [],
      deActiveTableData: [],
      filterHierarchys: [],
    };
  },

  computed: {
    ...mapGetters("SuperAdminUsers", ["getAllHierarchiesData"]),
    ...mapGetters("leadSourceVasDeviceConfig", ["getLsVasDeviceDetails"])
  },
  // created(){

  // },
  //  beforeMount(){
  //    console.log("DISABLE DATAS------------->",JSON.stringify(this.getAllHierarchiesData))
  //  },

  methods: {
    ...mapActions("SuperAdminUsers", [
      "FETCH_ALL_HIERARCHIES_DATA",
      "DELETE_HIERARCHY_BY_HIERARCHY_ID_DATA",
    ]),
    ...mapActions("AddHierarchy", ["SAVE_HIERARCHY", "DELETE_HIERARCHY", "ACTIVE_HIERARCHY"]),
    ...mapActions("leadSourceVasDeviceConfig", ["GET_LS_VAS_DEVICE_CONFIG_DETAILS"]),

    fnaddLeadSourceVasDevice() {
      // this.$router.push({ name: "addLeadSourceVasDeviceConfig" })
      this.propShowAddLeadSOurceVasDevice =! this.propShowAddLeadSOurceVasDevice;
    },
    fnEdit(rowDetails) {
      this.propShowEditLsVasDevice = !this.propShowEditLsVasDevice;
      this.propRowDetails = rowDetails;
    },
    refreshLeadSourceList() {
      this.propShowEditLsVasDevice = !this.propShowEditLsVasDevice;
       this.changeTabs();
    },

    changeTabs(tab) {

      this.ajaxLoadData();

    },
    //  ajaxLoadDataForHierarchyTable() {
    //   this.tableAjaxLoading = true;
    //   this.$q.loading.show({
    //     delay: 100, // ms
    //     message: "Please Wait",
    //     spinnerColor: "purple-9",
    //     customClass: "shadow-none",
    //   });
    //   this.FETCH_ALL_HIERARCHIES_DATA()
    //     .then(response => {
    //        console.log("res ACTIVE TABLE  DATAS------------->",JSON.stringify(res))
    //       this.$q.loading.hide();
    //     })
    //     .catch(() => {
    //       this.$q.notify({
    //         color: "negative",
    //         position: "bottom",
    //         message: error.body.message == null ? "Please Try Again Later !" : error.body.message,
    //         icon: "thumb_down",
    //       });
    //     });
    // },
    // fnActiveHierarchy(){
    //    this.$q.loading.show({
    //     delay: 0, // ms
    //     spinnerColor: "purple-9",
    //     message: "Fetching data ..",
    //   });
    //   this.FETCH_ALL_HIERARCHIES_DATA().then((res) => {
    //      console.log("res ACTIVE TABLE  DATAS------------->",JSON.stringify(res))

    //     // then we update the rows with the fetched ones
    //     this.tableData =
    //       this.getAllHierarchiesData;
    //       console.log("ACTIVE TABLE  DATAS------------->",JSON.stringify(this.tableData))
    //     // finally we tell QTable to exit the "loading" state
    //     this.$q.loading.hide();
    //   })
    //     .catch(() => {
    //       this.$q.loading.hide();
    //     });
    // },
    // fnDisable(reqData) {
    //   console.log("DISABLE DATAS------------->", JSON.stringify(reqData))
    //   this.$q
    //     .dialog({
    //       title: "Confirm",
    //       message: "Are you sure want to delete hierarchy?",
    //       ok: "Continue",
    //       cancel: "Cancel"
    //     })
    //     .then(() => {
    //       this.$q.loading.show({
    //         delay: 100, // ms
    //         message: "Please Wait",
    //         spinnerColor: "purple-9",
    //         customClass: "shadow-none"
    //       });
    //       this.DELETE_HIERARCHY(reqData)
    //         .then(response => {
    //           this.$q.loading.hide();
    //           this.$q.notify({
    //             color: "negative",
    //             position: "bottom",
    //             message: "Successfully deactivated",
    //             icon: "thumb_up"
    //           });
    //           this.$router.push("/super/admin/hierarchy/");
    //           this.$q.loading.hide();
    //         })
    //         .catch(error => {
    //           this.$q.notify({
    //             color: "warning",
    //             position: "bottom",
    //             message: "Please try again!",
    //             icon: "thumb_down"
    //           });
    //           this.$q.loading.hide();
    //         });

    //     })
    // },
    fnactive(reqData) {
      console.log("DISABLE DATAS------------->", JSON.stringify(reqData))
      this.$q
        .dialog({
          title: "Confirm",
          message: "Are you sure want to Active hierarchy?",
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
          let param = {
            // active: !reqData.active,
            hierarchy: reqData.label,
            hierarchyCode: reqData.shortCode,
            id: reqData.value
          };
          this.ACTIVE_HIERARCHY(param)
            .then(response => {
              this.$q.loading.hide();
              this.$q.notify({
                color: "positive",
                position: "bottom",
                message: "Successfully activated",
                icon: "thumb_up"
              });
              this.$q.loading.hide();
            })
            .catch(error => {
              this.$q.notify({
                color: "warning",
                position: "bottom",
                message: "Please try again!",
                icon: "thumb_down"
              });
              this.$q.loading.hide();
            });

        })
    },


    fnshowCreateHierarchy() {
      this.propShowCreateHierarchy = !this.propShowCreateHierarchy;
    },

    fnShowEditHierarchy(rowDetails) {
      this.propShowEditHierarchy = !this.propShowEditHierarchy;
      this.propRowDetails = rowDetails;
    },

    fnDisableHierarchy(HierarchyId) {
      console.log("HierarchyId", HierarchyId);
      this.$q
        .dialog({
          title: "Confirm",
          message: "Are you sure want to delete Hierarchy?",
          ok: "Continue",
          cancel: "Cancel",
        })
        .then(() => {
          this.DELETE_HIERARCHY_BY_HIERARCHY_ID_DATA(HierarchyId)
            .then(response => {
              this.FETCH_ALL_HIERARCHIES_DATA();
              this.$q.notify({
                color: "positive",
                position: "bottom",
                message: "Successfully Deleted!",
                icon: "thumb_up",
              });
            })
            .catch(() => {
              this.$q.notify({
                color: "negative",
                position: "bottom",
                message: error.body.message == null ? "Please Try Again Later !" : error.body.message,
                icon: "thumb_down",
              });
            });
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

    //API for table filter using Hierarchy permissions
    ajaxLoadData() {
      this.tableAjaxLoading = true;
      this.$q.loading.show({
        delay: 100, // ms
        message: "Please Wait",
        spinnerColor: "purple-9",
        customClass: "shadow-none",
      });
      this.GET_LS_VAS_DEVICE_CONFIG_DETAILS()
        .then(response => {
          console.log("getLsVasDeviceDetails------->", JSON.stringify(this.getLsVasDeviceDetails))
          this.tableData = this.getLsVasDeviceDetails;
          // this.activeTableData = this.tableData.active == true ? this.tableData :
          this.activeTableData = this.getLsVasDeviceDetails;
          // this.deActiveTableData = this.getAllHierarchiesData.filter(service => service.active == false);
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message: error.body.message == null ? "Please Try Again Later !" : error.body.message,
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

  created() {
    /* START: Load user table data filter > Hierarchys */
    let flag = true;
    console.log("res ACTIVE TABLE  DATAS------------->", flag)
    console.log("res ACTIVE TABLE  DATAS------------->", !flag)
    /* End: Load user table data filter > Hierarchys */
  },
};
</script>
  
<style>

</style>