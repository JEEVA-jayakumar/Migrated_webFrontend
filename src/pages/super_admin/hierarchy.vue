<template>
  <q-page>
    <!-- content -->
    <div>

      <q-tabs v-model="selectedTab" class="shadow-1" color="grey-1" @select="changeTabs">
        <q-tab default color="dark" name="active" slot="title" label="Active Hierarchy" />
        <q-tab color="dark" name="deactive" slot="title" label="Deactive Hierarchy" />

        <q-tab-pane name="active">
          <!-- <div>
             {{getAllHierarchiesData}}
          </div> -->
          <q-table :data="activeTableData" table-class="customSATableClass" :columns="columns" :filter="filterSearch"
            :pagination.sync="paginationControl" :filter-method="myCustomSearchFilter" row-key="name" color="grey-9"
            @request="ajaxLoadDataForHierarchyTable">

            <q-td slot="body-cell-action" slot-scope="props" :props="props">
              <div class="row no-wrap no-padding">
                <q-btn dense no-caps no-wrap label="Disable" icon="far fa-plus-square" size="md"
                  @click="fnDisable(props.row)" flat class="text-light-blue">
                </q-btn>

                <!-- <q-btn dense no-caps no-wrap label="Disable Role" icon="far fa-minus-square" size="md" @click="fnDisableRole(props.row)" flat class="text-negative"> -->
                <!-- </q-btn> -->
              </div>
            </q-td>
            <template slot="top" slot-scope="props">
              <!--START: table title -->
              <!-- <div class="col-12 q-title q-my-lg text-weight-regular">Hierarchy</div> -->
              <!-- <div class="col-md-6 q-my-md" align="right">
            <q-btn no-caps no-wrap label="Add New Hierarchy" class="q-mt-lg text-weight-regular" color="purple-9"  icon="far fa-plus-square" size="md" @click="fnshowCreateHierarchy()"/>
          </div> -->
              <!--END: table title -->

              <!--START: table filter,search -->
              <div class="col-md-6">
                <q-search clearable color="grey-9" v-model="filterSearch" placeholder="Type.." class="q-mr-lg" />
              </div>
              <div class="col-md-12" align="right">
                <q-btn no-caps class="text-weight-regular" @click="$router.push('/super/admin/add/New/Hierarchy')"
                  label="Add New Hierarchy" color="purple-9" size="md" />
              </div>
              <!--END: table filter,search -->
            </template>
          </q-table>
        </q-tab-pane>

        <q-tab-pane name="deactive">
          <!-- <div>
             {{getAllHierarchiesData}}
          </div> -->
          <q-table :data="deActiveTableData" table-class="customSATableClass" :columns="columns1"
            :filter="filterSearch1" :pagination.sync="paginationControl1" :filter-method="myCustomSearchFilter"
            row-key="name" color="grey-9" @request="ajaxLoadDataForHierarchyTable">

            <q-td slot="body-cell-action" slot-scope="props" :props="props">
              <div class="row no-wrap no-padding">
                <q-btn dense no-caps no-wrap label="Active" icon="far fa-plus-square" size="md"
                  @click="fnactive(props.row)" flat class="text-light-blue">
                </q-btn>

                <!-- <q-btn dense no-caps no-wrap label="Disable Role" icon="far fa-minus-square" size="md" @click="fnDisableRole(props.row)" flat class="text-negative"> -->
                <!-- </q-btn> -->
              </div>
            </q-td>
            <template slot="top" slot-scope="props">
              <!--START: table title -->
              <!-- <div class="col-12 q-title q-my-lg text-weight-regular">Hierarchy</div> -->
              <!-- <div class="col-md-6 q-my-md" align="right">
            <q-btn no-caps no-wrap label="Add New Hierarchy" class="q-mt-lg text-weight-regular" color="purple-9"  icon="far fa-plus-square" size="md" @click="fnshowCreateHierarchy()"/>
          </div> -->
              <!--END: table title -->

              <!--START: table filter,search -->
              <div class="col-md-6">
                <q-search clearable color="grey-9" v-model="filterSearch1" placeholder="Type.." class="q-mr-lg" />
              </div>
              <!-- <div class="col-md-12" align="right">
            <q-btn
              no-caps
              class="text-weight-regular"
              @click="$router.push('/super/admin/add/New/Hierarchy')"
              label="Add New Hierarchy"
              color="purple-9"
              size="md"
            />
          </div> -->
              <!--END: table filter,search -->
            </template>
          </q-table>
        </q-tab-pane>


      </q-tabs>


      <!--START: Show create Hierarchy -->
      <showCreateHierarchy v-if="propShowCreateHierarchy" :propGetAllHierarchiesData="getAllHierarchiesData"
        :propShowCreateHierarchy="propShowCreateHierarchy" @emitCreateHierarchyDetails="fnshowCreateHierarchy" />
      <!--END: Show create Hierarchy -->

      <!--START: Show edit Hierarchy -->
      <showEditHierarchy v-if="propShowEditHierarchy" :propShowEditHierarchy="propShowEditHierarchy"
        :propRowDetails="propRowDetails" @emitEditHierarchyDetails="fnShowEditHierarchy" />
      <!--END: Show edit Hierarchy -->




    </div>
  </q-page>
</template>

<script>
import showCreateHierarchy from "../../components/super_admin/showCreateHierarchy.vue";
import showEditHierarchy from "../../components/super_admin/ShowEditHierarchy.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "users",
  components: {
    showCreateHierarchy,
    showEditHierarchy,
  },
  data() {
    return {
      propShowCreateHierarchy: false,
      propShowEditHierarchy: false,
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
          name: "label",
          required: true,
          label: "Hierarchy",
          align: "left",
          field: "label",
          sortable: false,
        },
        {
          name: "shortCode",
          required: true,
          label: "Hierarchy Code",
          align: "left",
          field: "shortCode",
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
      columns1: [
        {
          name: "label",
          required: true,
          label: "Hierarchy",
          align: "left",
          field: "label",
          sortable: false,
        },
        {
          name: "shortCode",
          required: true,
          label: "Hierarchy Code",
          align: "left",
          field: "shortCode",
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


    changeTabs(tab) {
      if (tab == "deactive") {
        this.ajaxLoadDataForHierarchyTable();
      } else {
        this.ajaxLoadDataForHierarchyTable();
      }
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
    fnDisable(reqData) {
      console.log("DISABLE DATAS------------->", JSON.stringify(reqData))
      this.$q
        .dialog({
          title: "Confirm",
          message: "Are you sure want to delete hierarchy?",
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
          this.DELETE_HIERARCHY(reqData)
            .then(response => {
              this.$q.loading.hide();
              this.$q.notify({
                color: "negative",
                position: "bottom",
                message: "Successfully deactivated",
                icon: "thumb_up"
              });
              this.ajaxLoadDataForHierarchyTable();
              this.$router.push("/super/admin/hierarchy/");
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
              this.ajaxLoadDataForHierarchyTable();
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
    ajaxLoadDataForHierarchyTable() {
      this.tableAjaxLoading = true;
      this.$q.loading.show({
        delay: 100, // ms
        message: "Please Wait",
        spinnerColor: "purple-9",
        customClass: "shadow-none",
      });
      this.FETCH_ALL_HIERARCHIES_DATA()
        .then(response => {
          console.log("HIERARCHY 123 DATA-------->", JSON.stringify(this.getAllHierarchiesData))
          this.tableData = this.getAllHierarchiesData;
          // this.activeTableData = this.tableData.active == true ? this.tableData :
          this.activeTableData = this.getAllHierarchiesData.filter(service => service.active == true);
          this.deActiveTableData = this.getAllHierarchiesData.filter(service => service.active == false);
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
    this.ajaxLoadDataForHierarchyTable();
    let flag = true;
    console.log("res ACTIVE TABLE  DATAS------------->", flag)
    console.log("res ACTIVE TABLE  DATAS------------->", !flag)
    /* End: Load user table data filter > Hierarchys */
  },
};
</script>

<style>
</style>
