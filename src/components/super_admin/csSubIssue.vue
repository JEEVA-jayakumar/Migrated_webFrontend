<template>
    <q-page>
      <div>
        <q-tabs v-model="activeTab" class="shadow-1" color="grey-1" >
           <q-tab @select="ajaxSpareData" default  color="dark" name="tab-3" slot="title" label="Active CS Sub Issue" />
            <q-tab  color="dark" name="tab-4" slot="title" label="Deactive CS Sub Issue" />
          <q-tab-panel name="tab-3">
            <q-table :rows="ActivetableData" table-class="customSATableClass" :columns="columns1" :filter="filterSearch1"
              :pagination="paginationControl" :filter-method="myCustomSearchFilter1" row-key="name" color="grey-9">
              <q-td v-slot:body-cell-createdAt="props" :props="props">{{
                  props.row.createdAt | moment("Do MMM Y")
              }}</q-td>
              <q-td v-slot:body-cell-updatedAt="props" :props="props">{{
                  props.row.updatedAt | moment("Do MMM Y")
              }}</q-td>
  
              <q-td v-slot:body-cell-action1="props" :props="props">
                <div class="row no-wrap no-padding">
                  <q-btn dense no-caps no-wrap label="Modify" icon="far fa-plus-square" size="md"
                    @click="fnShowEditCsSubIssue(props.row)" flat class="text-light-blue"></q-btn>
                  <q-btn dense no-caps no-wrap label="Disable" icon="far fa-minus-square" size="md"
                    @click="fnDeleteCsSubIssue(props.row)" flat class="text-negative"></q-btn>
                </div>
              </q-td>
               <template v-slot:top="props">
                <div class="col-3">
                  <q-input clearable color="grey-9" v-model="filterSearch1" placeholder="Search by Issue Name" class="q-mr-lg" />
                </div>
                <!--END: table filter,search -->
                <div class="col-3" align="right">
                  <q-btn no-caps class="text-weight-regular" label="Add Sub Task"
                    @click="fnShowAddNewCsSubIssue(props.row)" color="purple-9" size="md" />
                </div>
              </template>
            </q-table>
          </q-tab-panel>
          <q-tab-panel name="tab-4">
            <q-table 
            :rows="DeactivetableData"
            table-class="customSATableClass" 
            :columns="columns4" 
            :filter="filterSearch3"
            :pagination="paginationControl2"
            :filter-method="myCustomSearchFilter2" 
            row-key="name" 
            color="grey-9"
            >
              <q-td v-slot:body-cell-createdAt="props" :props="props">{{
                  props.row.createdAt | moment("Do MMM Y")
              }}</q-td>
              <q-td v-slot:body-cell-updatedAt="props" :props="props">{{
                  props.row.updatedAt | moment("Do MMM Y")
              }}</q-td>
  
              <q-td v-slot:body-cell-action2="props" :props="props">
                <div class="row no-wrap no-padding">
                  <q-btn dense no-caps no-wrap label="Active" icon="far fa-plus-square" size="md"
                    @click="fnShowActiveCsSubIssue(props.row)" flat class="text-light-blue"></q-btn>
                </div>
              </q-td>
  
              <template v-slot:top="props">
                <div class="col-3">
                  <q-input clearable color="grey-9" v-model="filterSearch3" placeholder="Search by Issue Name" class="q-mr-lg" />
                </div>
              </template>
            </q-table>
          </q-tab-panel>
        </q-tabs>

        <!--START: Show edit  Sub Task  -->
        <ShowEditCSSubIssue v-if="propShowEditCsSubIssue" :propShowEditCsSubIssue="propShowEditCsSubIssue"
          :propRowDetails1="propRowDetails1" @emitfnshowEditCsSubIssue="fnShowEditCsSubIssue" />
        <!-- END: Show edit  Spare Parts -->
  
        <!--START: Show SubTaskType -->
        <ShowAddCSSubIssue v-if="propShowAddCsSubIssue" :propShowAddCsSubIssue="propShowAddCsSubIssue"
          :propRowDetails2="propRowDetails2" @emitfnShowAddNewCsSubIssue="fnShowAddNewCsSubIssue" />
        <!--END: Show Add SubTaskType -->
      </div>
    </q-page>
  </template>
  <script>
import { required } from '@vuelidate/validators';
  import ShowEditCSSubIssue from "../../components/super_admin/ShowEditCSSubIssue.vue";
  import ShowAddCSSubIssue from "../../components/super_admin/ShowAddCSSubIssue.vue";
  import { mapGetters, mapActions } from "vuex";
  export default {
    name: "getcsActiveSubIssueDetails",
    components: {
      ShowEditCSSubIssue,
      ShowAddCSSubIssue,
    },
  
    data() {
      return {
        activeTab: "tab-3",
        propShowEditCsSubIssue: false,
        propShowAddCsSubIssue: false,
        propRowDetails1: "",
        propRowDetails2: "",
  
        filter: "",
        filterSearch1: "",
        filterSearch3: "",
        serviceReqIssueTypeSets: [],
        serviceRequestStatusSets: [],
  
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
            field: row => {
            return row.name;
          },
          sortable: true
          },
          {
            name: "createdAt",
            required: true,
            label: "Created Date",
            align: "left",
            field: "createdAt",
            sortable: true
          },
          {
            name: "updatedAt",
            required: true,
            label: "Updated Date",
            align: "left",
            field: "updatedAt",
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
         columns4: [
        
         {
            name: "name",
            required: true,
            label: "Issue Name",
            align: "left",
            field: row => {
            return row.name;
          },
          sortable: true
          },
          {
            name: "createdAt",
            required: true,
            label: "Created Date",
            align: "left",
            field: "createdAt",
            sortable: true
          },
          {
            name: "updatedAt",
            required: true,
            label: "Updated Date",
            align: "left",
            field: "updatedAt",
            sortable: true
          },
          {
            name: "action2",
            required: true,
            label: "",
            align: "left",
            field: "action1",
            sortable: false
          }
        ],
        columns: [
          // {
          //   name: "id",
          //   required: true,
          //   label: "id",
          //   align: "left",
          //   field: row => {
          //     return row.id;
          //   },
          //   sortable: true
          // },
          {
            name: "service_req_data",
            required: true,
            label: "Service Req Data",
            align: "left",
            // disable: row => {
            //   return row.serviceReqType.active == false;
            // },
            field: row => {
              return row.serviceReqType.name;
            },
            sortable: false
          },
  
          {
            name: "serviceReqIssueTypeSets",
            required: true,
            label: "Service Req Issue TypeSets",
            align: "left",
            field: row => {
              return row.serviceReqIssueTypeSets.serviceReqIssueType.name;
            },
            sortable: true
          },
  
          {
            name: "serviceRequestStatusSets",
            required: true,
            label: "Service Status",
            align: "left",
            field: row => {
              return row.name;
            },
            sortable: true
          },
          // {
          //   name: "updated_date",
          //   required: true,
          //   label: "Updated Date",
          //   align: "left",
          //   field: "updated_date",
          //   sortable: true
          // },
  
          // {
          //   name: "is_active",
          //   required: true,
          //   label: "is_active",
          //   align: "left",
          //   field: "is_active",
          //   sortable: false
          // },
          {
            name: "action",
            required: true,
            label: "",
            align: "left",
            field: "action",
            sortable: false
          }
        ],
        tableData: [],
        tableData1: [],
        ActivetableData: [],
        DeactivetableData: [],
        DeactiveCsSubIssue: [],
        ActiveCsSubIssue: [],
      };
    },
  
    created() {
      /* START: Load user table data filter > Regions */
      this.ajaxSpareData();
      // this.ajaxSpareData1();
      /* End: Load user table data filter > Regions */
    },
  
    computed: {
      ...mapGetters("serviceRequest", ["getcsActiveSubIssueDetails", "getcsDeactiveSubIssueDetails"])
    },
    
    methods: {
      ...mapActions("serviceRequest", ["FETCH_ACTIVE_CS_SUB_ISSUE_DATAS", "FETCH_DEACTIVE_CS_SUB_ISSUE_DATAS", "DELETE_CS_SUB_ISSUE"]),
      ...mapActions("serviceRequest", ["ACTIVE_CS_SUB_ISSUE"]),
  
      fnShowActiveCsSubIssue(reqData){
        console.log("REQEST DATA---------->",JSON.stringify(reqData))
           let param={
            id: reqData.id,
            request: reqData,
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
             this.ACTIVE_CS_SUB_ISSUE(param)
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
      fnDeleteCsSubIssue(rowDetails) {
        console.log("ROW DETAILS------------->", JSON.stringify(rowDetails));
        this.$q
          .dialog({
            title: "Confirm",
            message: "Are you sure want to delete?",
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
            this.DELETE_CS_SUB_ISSUE(rowDetails)
              .then(response => {
                this.$q.loading.hide();
                this.$q.notify({
                  color: "positive",
                  position: "bottom",
                  message: "Successfully removed",
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
        this.FETCH_ACTIVE_CS_SUB_ISSUE_DATAS()
          .then(res => {
            console.log("getcsActiveSubIssueDetails------->", JSON.stringify(this.getcsActiveSubIssueDetails))
             this.tableData = this.getcsActiveSubIssueDetails;
            // console.log("tableData------->", JSON.stringify(this.tableData))
            // this.DeactivetableData = this.getcsActiveSubIssueDetails.filter(service => service.active == false);
            //   console.log("DeactivetableData------->", JSON.stringify(this.DeactivetableData))
             this.ActivetableData = this.getcsActiveSubIssueDetails.filter(service => service.active == true);
               console.log("ActivetableData------->", JSON.stringify(this.ActivetableData))
               })
          .catch(() => {
            this.$q.loading.hide();
          });

          this.FETCH_DEACTIVE_CS_SUB_ISSUE_DATAS()
          .then(res => {
            console.log("getcsDeactiveSubIssueDetails------->", JSON.stringify(this.getcsDeactiveSubIssueDetails))
             this.tableData = this.getcsDeactiveSubIssueDetails;
            console.log("tableData------->", JSON.stringify(this.tableData))
            this.DeactivetableData = this.getcsDeactiveSubIssueDetails.filter(service => service.active == false);
              console.log("DeactivetableData------->", JSON.stringify(this.DeactivetableData))
            //  this.ActivetableData = this.getcsDeactiveSubIssueDetails.filter(service => service.active == true);
            //    console.log("ActivetableData------->", JSON.stringify(this.ActivetableData))
               })
          .catch(() => {
            this.$q.loading.hide();
          });
      },
      // ajaxSpareData1() {
      //   this.FETCH_ALL_CS_SUB_ISSUE()
      //     .then(res => {
      //     //   this.tableData1 = this.getcsDeactiveSubIssueDetails;
      //       console.log(
      //         "TABLE DATA 11111111111111 VALUES-RESPONSE---------->",
      //         JSON.stringify(this.tableData1)
      //       );
      //        this.DeactiveCsSubIssue = this.getcsDeactiveSubIssueDetails.filter(service => service.active == false);
      //          this.ActiveCsSubIssue = this.getcsDeactiveSubIssueDetails.filter(service => service.active == true);
      //     })
      //     .catch(() => {
      //       this.$q.loading.hide();
      //     });
      // },
      fnShowAddNewCsSubIssue(token) {
        this.propShowAddCsSubIssue = !this.propShowAddCsSubIssue;
        // this.propRowDetails2 = rowDetails;
        if(token == "refresh") {
          this.ajaxSpareData();
        }
      },
  
      fnShowEditCsSubIssue(rowDetails) {
        this.propShowEditCsSubIssue = !this.propShowEditCsSubIssue;
        this.propRowDetails1 = rowDetails;
        if( this.propShowEditCsSubIssue== false){
           this.ajaxSpareData()
        }
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
  </style>
  