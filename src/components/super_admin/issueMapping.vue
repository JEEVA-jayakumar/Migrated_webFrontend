<template>
  <q-page>
    <div>
      <q-tabs v-model="activeTab" class="shadow-1" color="grey-1">
        <q-tab
          @select="ajaxSpareData"
          default
          color="dark"
          name="tab-1"
          slot="title"
          label="Active Issue Mapping"
        />
        <q-tab
          color="dark"
          name="tab-2"
          slot="title"
          label="Deactive Issue Mapping"
        />
        <q-tab-pane name="tab-1">
          <q-table
            :data="tableData"
            table-class="customSATableClass"
            :columns="columns1"
            :filter="filterSearch"
            :pagination.sync="paginationControl"
            :filter-method="myCustomSearchFilter1"
            row-key="name"
            color="grey-9"
          >
            <q-td slot="body-cell-action" slot-scope="props" :props="props">
              <div class="row no-wrap no-padding">
                <q-btn
                  dense
                  no-caps
                  no-wrap
                  label="Modify"
                  icon="far fa-plus-square"
                  size="md"
                  @click="fnShowEditIssueMapping(props.row)"
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
                  @click="fnDeleteIssueMapping(props.row)"
                  flat
                  class="text-negative"
                ></q-btn>
              </div>
            </q-td>
            <!-- <q-td
              slot="body-cell-serviceReqIssueTypeSets"
              slot-scope="props"
              :props="props"
            >
              <div
                class="row no-wrap group"
                v-for="menu in props.row.serviceReqIssueTypeSets"
              >
                <q-chip color="light" class="text-dark">
                  {{ menu.serviceReqIssueType.name }}
                </q-chip>
              </div>
            </q-td> -->
            <!-- <q-td slot="body-cell-serviceRequestStatusSets" slot-scope="props" :props="props">
                <div class="row no-wrap group" v-for="menu in props.row.serviceRequestStatusSets" >
                  <q-chip color="light" class="text-dark">
                    {{ menu.serviceRequestStatus != null ? menu.serviceRequestStatus.name : "NA" }}
                  </q-chip>
                </div>
              </q-td> -->

            <template slot="top" slot-scope="props">
              <div class="col-3">
                  <q-search clearable color="grey-9" v-model="filterSearch" placeholder="Search by Issue Name" class="q-mr-lg" />
                </div>
              <div class="col-7" align="right">
                <q-btn
                  no-caps
                  class="text-weight-regular alignbtn1"
                  label="Add Issue Mapping"
                  @click="fnShowAddNewIssueMapping(props.row)"
                  color="purple-9"
                  size="md"
                />
              </div>
            </template>
          </q-table>
        </q-tab-pane>

        <q-tab-pane name="tab-2">
          <q-table
            :data="tableData1"
            table-class="customSATableClass"
            :columns="columns2"
            :filter="filterSearch1"
            :pagination.sync="paginationControl2"
            :filter-method="myCustomSearchFilter2"
            row-key="name"
            color="grey-9"
          >
            <!-- <q-td
              slot="body-cell-serviceReqIssueTypeSets"
              slot-scope="props"
              :props="props"
            >
              <div
                class="row no-wrap group"
                v-for="menu in props.row.serviceReqIssueTypeSets"
              >
                <q-chip color="light" class="text-dark">
                  {{ menu.serviceReqIssueType.name }}
                </q-chip>
              </div>
            </q-td> -->
            <!-- <q-td slot="body-cell-serviceRequestStatusSets" slot-scope="props" :props="props">
                <div class="row no-wrap group" v-for="menu in props.row.serviceRequestStatusSets" >
                  <q-chip color="light" class="text-dark">
                    {{ menu.serviceRequestStatus != null ? menu.serviceRequestStatus.name : "NA"}}
                  </q-chip>
                </div>
              </q-td> -->

            <q-td slot="body-cell-action1" slot-scope="props" :props="props">
              <div class="row no-wrap no-padding">
                <q-btn
                  dense
                  no-caps
                  no-wrap
                  label="Active"
                  icon="far fa-plus-square"
                  size="md"
                  @click="fnShowActiveIssueMapping(props.row)"
                  flat
                  class="text-light-blue"
                ></q-btn>
              </div>
            </q-td>

            <template slot="top" slot-scope="props">
              <div class="col-3">
                  <q-search clearable color="grey-9" v-model="filterSearch1" placeholder="Search by Issue Name" class="q-mr-lg" />
                </div>
            </template>
          </q-table>
        </q-tab-pane>
      </q-tabs>

      <!--START: Show edit  service Parts -->
      <ShowEditIssueMapping
        v-if="propShowEditIssueMapping"
        :propShowEditIssueMapping="propShowEditIssueMapping"
        :propRowDetails2="propRowDetails2"
        @emitfnshowEditIssueMapping="fnShowEditIssueMapping"
      />
      <!-- END: Show edit  Spare Parts -->
      <!--START: Show ServiceType -->
      <ShowAddIssueMapping
        v-if="propShowAddIssueMapping"
        :propShowAddIssueMapping="propShowAddIssueMapping"
        :propRowDetails="propRowDetails"
        @emitfnShowAddNewIssueMapping="fnShowAddNewIssueMapping"
      />
      <!--END: Show Add Spare Parts -->
    </div>
  </q-page>
</template>
<script>
import ShowAddIssueMapping from "../../components/super_admin/ShowAddIssueMapping.vue";
import ShowEditIssueMapping from "../../components/super_admin/ShowEditIssueMapping.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "getactiveIssueMapping",
  components: {
    ShowAddIssueMapping,
    ShowEditIssueMapping
  },

  data() {
    return {
      activeTab: "tab-1",
      propShowAddIssueMapping: false,
      propShowEditIssueMapping: false,
      propShowEditSubTaskType: false,
      propShowActiveServiceType: false,
      propShowAddSubTaskType: false,
      propRowDetails: "",
      propRowDetails1: "",
      propRowDetails2: "",
      propRowDetails4: "",

      filter: "",
      filterSearch: "",
      filterSearch1: "",
      filter_values: "",
      multipleSelect: "",
      name: [],
      csSubIssue: [],
      // serviceRequestStatusSets: [],

      paginationControl: {
        rowsPerPage: 10
      },
      paginationControl2: {
        rowsPerPage: 10
      },

      //table information
      columns1: [
        {
          name: "name",
          required: true,
          label: "Issue Name",
          align: "left",
          field: "name",
          sortable: true
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
      columns2: [
        {
          name: "name",
          required: true,
          label: "Issue Name",
          align: "left",
          field: "name",
          sortable: true
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
      tableData1: [],
      ActivetableData: [],
      DeactivetableData: []
    };
  },

  created() {
    /* START: Load user table data filter > Regions */
    this.ajaxSpareData();
    //   this.ajaxSpareData1();
    /* End: Load user table data filter > Regions */
  },

  computed: {
    ...mapGetters("serviceRequest", [
      "getactiveIssueMapping",
      "getdeactiveIssueMapping"
    ])
  },
  //   beforeMount(){
  //       console.log("TABLE DATA VALUES----------->",JSON.stringify(this.getactiveIssueMapping))
  //   },

  methods: {
    ...mapActions("serviceRequest", [
      "FETCH_ACTIVE_ISSUE_MAPPING",
      "FETCH_DEACTIVE_ISSUE_MAPPING",
      "ACTIVE_ISSUE_MAPPING",
      "DELETE_ISSUE_MAPPING"
    ]),

    fnShowActiveIssueMapping(reqData) {
      console.log("REQEST DATA---------->", JSON.stringify(reqData));
      let param = {
        id: reqData.id,
        request: reqData
        // {
        //   // name: reqData.name,
        //   request: reqData
        // }
      };
      this.$q
        .dialog({
          title: "Confirm",
          message: "Are you sure want to active this issue?",
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
          this.ACTIVE_ISSUE_MAPPING(param)
          .then(() => {
            this.$q.loading.hide();
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Successfully Updated!",
              icon: "thumb_up"
            });
            this.$q.loading.hide();
            this.ajaxSpareData();
          })
        })
        .catch(error => {
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message:
              error.body.message == null
                ? "Please Try Again Later !"
                : error.body.message,
            icon: "thumb_down"
          });
          this.$q.loading.hide();
        });
    },

    fnDeleteIssueMapping(rowDetails) {
      console.log("ROW DETAILS------------->", JSON.stringify(rowDetails));
      this.$q
        .dialog({
          title: "Confirm",
          message: "Are you sure want to disable?",
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
          this.DELETE_ISSUE_MAPPING(rowDetails).then(response => {
            this.$q.loading.hide();
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Successfully Removed",
              icon: "thumb_up"
            });
            this.$q.loading.hide();
            this.ajaxSpareData();
          });
        })
        .catch(() => {
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message: "No changes made!",
            icon: "thumb_down"
          });
          this.$q.loading.hide();
        });
    },

    ajaxSpareData() {
      this.FETCH_ACTIVE_ISSUE_MAPPING()
        .then(res => {
          console.log(
            "getactiveIssueMapping------->",
            JSON.stringify(this.getactiveIssueMapping)
          );
          this.tableData = this.getactiveIssueMapping;
          console.log("tableDataActivetable------->", JSON.stringify(this.tableData));
          // this.DeactivetableData = this.getactiveIssueMapping.filter(service => service.active == false);
          //   console.log("DeactivetableData------->", JSON.stringify(this.DeactivetableData))
          // this.tableData = this.getactiveIssueMapping.filter(
          //   service => service.active == true
          // );
          console.log(
            "ActivetableData------->",
            JSON.stringify(this.tableData)
          );
        })
        .catch(() => {
          this.$q.loading.hide();
        });
        
      this.FETCH_DEACTIVE_ISSUE_MAPPING()
        .then(res => {
          console.log(
            "getdeactiveIssueMapping------->",
            JSON.stringify(this.getdeactiveIssueMapping)
          );
          this.tableData1 = this.getdeactiveIssueMapping;
          console.log("tableData------->", JSON.stringify(this.tableData1));
          // this.DeactivetableData = this.getdeactiveIssueMapping.filter(
          //   service => service.active == false
          // );
          console.log(
            "DeactivetableData------->",
            JSON.stringify(this.tableData1)
          );
          //  this.ActivetableData = this.getdeactiveIssueMapping.filter(service => service.active == true);
          //    console.log("ActivetableData------->", JSON.stringify(this.ActivetableData))
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },
    //   ajaxSpareData1() {
    //     this.FETCH_SUB_TASK_DATAS()
    //       .then(res => {
    //         this.tableData1 = this.getsubTaskDetails;
    //         console.log(
    //           "TABLE DATA 11111111111111 VALUES-RESPONSE---------->",
    //           JSON.stringify(this.tableData1)
    //         );
    //       })
    //       .catch(() => {
    //         this.$q.loading.hide();
    //       });
    //   },
    fnShowAddNewIssueMapping(token) {
      this.propShowAddIssueMapping = !this.propShowAddIssueMapping;
      // this.propRowDetails = rowDetails;
      if (token == "refresh") {
        this.ajaxSpareData();
      }
    },

    fnShowEditIssueMapping(rowDetails) {
      this.propShowEditIssueMapping = !this.propShowEditIssueMapping;
      this.propRowDetails2 = rowDetails;
      if (this.propShowEditIssueMapping == false) {
        this.ajaxSpareData();
      }
    },
    fnShowEditSubTaskType(rowDetails) {
      this.propShowEditSubTaskType = !this.propShowEditSubTaskType;
      this.propRowDetails1 = rowDetails;
    },

    myCustomSearchFilter1(rows, terms, cols, cellValue) {
      const lowerTerms = terms ? terms.toLowerCase() : "";
      return rows.filter(row =>
        cols.some(
          col =>
            (cellValue(col, row) + "").toLowerCase().indexOf(lowerTerms) !== -1
        )
      );
    },
    myCustomSearchFilter2(rows, terms, cols, cellValue) {
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
.alignbtn1{
  margin-right: 254px;
}
</style>
