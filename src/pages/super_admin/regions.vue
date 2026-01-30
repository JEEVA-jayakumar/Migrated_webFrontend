<template>
  <q-page>
    <!-- content -->
    <div>

      <q-tabs class="shadow-1" color="grey-1" >
        <q-tab default color="dark" name="active" slot="title" label="Active Regions" />
        <q-tab color="dark" name="deactive" slot="title" label="Deactive Regions" />
        
        <q-tab-pane name="active">
        <q-table
        :data="activeTableData"
        table-class="customSATableClass"
        :columns="columns"
        :filter="filterSearch"
        :pagination.sync="paginationControl"
        :filter-method="myCustomSearchFilter"
        row-key="name"
        color="grey-9"
      >
        <q-td
          slot="body-cell-regionGroup"
          slot-scope="props"
          :props="props"
        >{{props.row.regionGroup ==null ? "NA" : props.row.regionGroup.regionName}}</q-td>
        <q-td slot="body-cell-action" slot-scope="props" :props="props">
          <div class="row no-wrap no-padding">
            <q-btn
              dense
              no-caps
              no-wrap
              label="Modify"
              icon="far fa-plus-square"
              size="md"
              @click="fnShowEditRegions(props.row)"
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
              @click="fnDeleteRegion(props.row)"
              flat
              class="text-negative"
            ></q-btn>
          </div>
        </q-td>

        <template slot="top" slot-scope="props">
          <!-- <div class="col-md-6 q-my-md" align="right">
            <q-btn no-caps no-wrap label="Add New Regions" class="q-mt-lg text-weight-regular" color="purple-9"  icon="far fa-plus-square" size="md" @click="fnshowCreateRegions()"/>
          </div>-->
          <!--END: table title -->
          <!--START: table filter,search -->
          <div class="col-6">
            <q-search
              clearable
              color="grey-9"
              v-model="filterSearch"
              placeholder="Type.."
              class="q-mr-lg"
            />
          </div>
          <!--END: table filter,search -->
           <div class="col-6" align="right">
                <q-btn
                  no-caps
                  class="text-weight-regular"
                  label="Add New Region"
                  @click="fnShowAddNewRegions(props.row)"
                  color="purple-9"
                  size="md"
                />
              </div>
        </template>
      </q-table>
        </q-tab-pane>
        <q-tab-pane name="deactive">
        <q-table
        :data="deActiveTableData"
        table-class="customSATableClass"
        :columns="columns1"
        :filter="filterSearch1"
        :pagination.sync="paginationControl1"
        :filter-method="myCustomSearchFilter"
        row-key="name"
        color="grey-9"
      >
        <q-td
          slot="body-cell-regionGroup"
          slot-scope="props"
          :props="props"
        >{{props.row.regionGroup ==null ? "NA" : props.row.regionGroup.regionName}}</q-td>
        <q-td slot="body-cell-action1" slot-scope="props" :props="props">
          <div class="row no-wrap no-padding">
            <!-- <q-btn
              dense
              no-caps
              no-wrap
              label="Modify"
              icon="far fa-plus-square"
              size="md"
              @click="fnShowEditRegions(props.row)"
              flat
              class="text-light-blue"
            ></q-btn> -->
            <q-btn
              dense
              no-caps
              no-wrap
              label="Active"
              icon="far fa-minus-square"
              size="md"
              @click="fnActiveRegion(props.row)"
              flat
              class="text-positive"
            ></q-btn>
          </div>
        </q-td>

        <template slot="top" slot-scope="props">
         
          <!-- <div class="col-md-6 q-my-md" align="right">
            <q-btn no-caps no-wrap label="Add New Regions" class="q-mt-lg text-weight-regular" color="purple-9"  icon="far fa-plus-square" size="md" @click="fnshowCreateRegions()"/>
          </div>-->
          <!--END: table title -->
          <!--START: table filter,search -->
          <div class="col-6">
            <q-search
              clearable
              color="grey-9"
              v-model="filterSearch1"
              placeholder="Type.."
              class="q-mr-lg"
            />
          </div>
        </template>
      </q-table>
        </q-tab-pane>



      </q-tabs>

     <!--START: Show create Regions -->
      <showCreateRegion
        v-if="propShowCreateRegions"
        :propShowCreateRegions="propShowCreateRegions"
        @emitfnshowRegions="fnshowCreateRegions"
        @emitfnForRegionTable="ajaxLoadDataForRegionTable"
      />
      <!--END: Show create Regions -->
      <!--START: Show edit Regions -->
      <showEditRegion
        v-if="propShowEditRegions"
        :propShowEditRegions="propShowEditRegions"
        :propRowDetails="propRowDetails"
        @emitfnshowRegions="fnShowEditRegions"
      />
      <!--END: Show edit Regions -->
       <!--START: Show edit Regions -->
      <ShowAddNewRegions
        v-if="propShowAddNewRegions"
        :propShowAddNewRegions="propShowAddNewRegions"
        :propRowDetails="propRowDetails"
        @emitfnShowAddNewRegions="fnShowAddNewRegions"
      />
      <!--END: Show edit Regions -->



    </div>
  </q-page>
</template>

<script>
import showCreateRegion from "../../components/super_admin/showCreateRegions.vue";
import showEditRegion from "../../components/super_admin/showEditRegions.vue";
import ShowAddNewRegions from "../../components/super_admin/ShowAddNewRegions.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "regions",
  components: {
    showCreateRegion,
    showEditRegion,
    ShowAddNewRegions
  },
  data() {
    return {
      propShowCreateRegions: false,
      propShowEditRegions: false,
      propShowAddNewRegions: false,
      propRowDetails: "",
      // propRowDetails1:"",

      filter: "",
      filterSearch: "",
      filterSearch1: "",
      filter_values: "",
      multipleSelect: "",

      paginationControl: {
        rowsPerPage: 10
      },
      paginationControl1: {
        rowsPerPage: 10
      },
      //table information
      columns: [
        {
          name: "regionGroup",
          required: true,
          label: "Region group",
          align: "left",
          field: row => {
            return row.regionGroup.regionName;
          },
          sortable: false
        },
        {
          name: "label",
          required: true,
          label: "Region",
          align: "left",
          field: "regionAreaName",
          sortable: false
        },
        {
          name: "action",
          required: true,
          label: "",
          align: "left",
          field: "action",
          sortable: false
        }
      ],
       columns1: [
        {
          name: "regionGroup",
          required: true,
          label: "Region group",
          align: "left",
          field: row => {
            return row.regionGroup.regionName;
          },
          sortable: false
        },
        {
          name: "label",
          required: true,
          label: "Region",
          align: "left",
          field: "regionAreaName",
          sortable: false
        },
        {
          name: "action1",
          required: true,
          label: "",
          align: "left",
          field: "action1",
          sortable: false
        }
      ],
      tableData: [],
      activeTableData: [],
      deActiveTableData: [],

    };
  },

  created() {
    /* START: Load user table data filter > Regions */
    this.ajaxLoadDataForRegionTable();
    /* End: Load user table data filter > Regions */
  },

  computed: {
    ...mapGetters("SuperAdminUsers", [
      "getAllRegionsData",
      "getAllRegionsData1"
    ])
  },

  methods: {
    ...mapActions("SuperAdminUsers", [
      "FETCH_ALL_REGIONS_DATA",
      "FETCH_ALL_REGIONS_DATA1",
      "DELETE_REGIONS_BY_REGIONS_ID_DATA"
    ]),
    ajaxLoadDataForRegionTable() {
      this.FETCH_ALL_REGIONS_DATA1()
      .then(response =>{
        console.log("HIERARCHY 123 DATA-------->", JSON.stringify(this.getAllRegionsData1))
          this.tableData = this.getAllHierarchiesData;
          // this.activeTableData = this.tableData.active == true ? this.tableData :
          this.activeTableData = this.getAllRegionsData1.filter(service => service.active == true);
          this.deActiveTableData = this.getAllRegionsData1.filter(service => service.active == false);
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
      this.FETCH_ALL_REGIONS_DATA();
    },
    fnActiveRegion(reqData){
      console.log("DISABLE DATAS------------->", JSON.stringify(reqData))
      // this.$q
      //   .dialog({
      //     title: "Confirm",
      //     message: "Are you sure want to Active Region?",
      //     ok: "Continue",
      //     cancel: "Cancel"
      //   })
        // .then(() => {
        //   this.$q.loading.show({
        //     delay: 100, // ms
        //     message: "Please Wait",
        //     spinnerColor: "purple-9",
        //     customClass: "shadow-none"
        //   });
        //   let param = {
        //     // active: !reqData.active,
        //     hierarchy: reqData.label,
        //     hierarchyCode: reqData.shortCode,
        //     id: reqData.value
        //   };
        //   this.ACTIVE_HIERARCHY(param)
        //     .then(response => {
        //       this.$q.loading.hide();
        //       this.$q.notify({
        //         color: "positive",
        //         position: "bottom",
        //         message: "Successfully activated",
        //         icon: "thumb_up"
        //       });
        //       this.$q.loading.hide();
        //     })
        //     .catch(error => {
        //       this.$q.notify({
        //         color: "warning",
        //         position: "bottom",
        //         message: "Please try again!",
        //         icon: "thumb_down"
        //       });
        //       this.$q.loading.hide();
        //     });

        // })

    },
    fnshowCreateRegions() {
      this.propShowCreateRegions = !this.propShowCreateRegions;
    },

    fnShowEditRegions(rowDetails) {
      this.propShowEditRegions = !this.propShowEditRegions;
      this.propRowDetails = rowDetails;
    },
    fnShowAddNewRegions(rowDetails){
       this.propShowAddNewRegions = !this.propShowAddNewRegions;
      this.propRowDetails = rowDetails;
    },

    fnDeleteRegion(rowDetails) {
      console.log("DELETED VALUES-------->",JSON.stringify(rowDetails))
      this.$q
        .dialog({
          title: "Confirm",
          message: "Are you sure want to delete region?",
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
          this.DELETE_REGIONS_BY_REGIONS_ID_DATA(rowDetails)
            .then(response => {
              this.FETCH_ALL_REGIONS_DATA();
              this.$q.notify({
                color: "positive",
                position: "bottom",
                message: "Successfully removed",
                icon: "thumb_up"
              });
              this.ajaxLoadDataForRegionTable();
              this.$router.push({name:"regions"});
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
