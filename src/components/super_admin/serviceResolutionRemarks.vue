<template>
    <q-page>
      <div>
        <q-tabs v-model="activeTab" class="shadow-1" color="grey-1" >
           <q-tab @select="ajaxSpareData" default  color="dark" name="tab-3" slot="title" label="Active Service Resolution Remarks" />
            <q-tab  color="dark" name="tab-4" slot="title" label="Deactive Service Resolution Remarks" />
          <q-tab-panel name="tab-3">
            <q-table 
            :rows="ActivetableData"
            table-class="customSATableClass" 
            :columns="columns1" 
            :filter="filterSearch1"
            :pagination="paginationControl"
            :filter-method="myCustomSearchFilter1" 
            row-key="name" 
            color="grey-9"
            >
              <q-td v-slot:body-cell-createdAt="props" :props="props">{{
                  props.row.createdAt | moment("Do MMM Y")
              }}</q-td>
              <q-td v-slot:body-cell-updatedAt="props" :props="props">{{
                  props.row.updatedAt | moment("Do MMM Y")
              }}</q-td>
  
              <q-td v-slot:body-cell-action1="props" :props="props">
                <div class="row no-wrap no-padding">
                  <q-btn dense no-caps no-wrap label="Modify" icon="far fa-plus-square" size="md"
                    @click="fnShowEditServiceResolutionRemarks(props.row)" flat class="text-light-blue"></q-btn>
                  <q-btn dense no-caps no-wrap label="Disable" icon="far fa-minus-square" size="md"
                    @click="fnDeleteServiceResolutionRemarks(props.row)" flat class="text-negative"></q-btn>
                </div>
              </q-td>
               <template v-slot:top="props">
                <div class="col-3">
                  <q-input clearable color="grey-9" v-model="filterSearch1" placeholder="Search by Issue Name" class="q-mr-lg" />
                </div>
                <!--END: table filter,search -->
                <div class="col-3" align="right">
                  <q-btn no-caps class="text-weight-regular" label="Add Remarks"
                    @click="fnShowAddServiceResolutionRemarks(props.row)" color="purple-9" size="md" />
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
                    @click="fnShowActiveServiceResolutionRemarks(props.row)" flat class="text-light-blue"></q-btn>
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
        <showEditServiceResolutionRemarks v-if="propShowEditServiceResolutionRemarks" :propShowEditServiceResolutionRemarks="propShowEditServiceResolutionRemarks"
          :propRowDetails1="propRowDetails1" @emitfnshowEditServiceResolutionRemarks="fnShowEditServiceResolutionRemarks" />
        <!-- END: Show edit  Spare Parts -->
  
        <!--START: Show SubTaskType -->
        <showAddServiceResolutionRemarks v-if="propShowAddServiceResolutionRemarks" :propShowAddServiceResolutionRemarks="propShowAddServiceResolutionRemarks"
          :propRowDetails2="propRowDetails2" @emitfnShowAddServiceResolutionRemarks="fnShowAddServiceResolutionRemarks" />
        <!--END: Show Add SubTaskType -->
      </div>
    </q-page>
  </template>
  <script>
import { required } from '@vuelidate/validators';
  import showEditServiceResolutionRemarks from "../../components/super_admin/showEditServiceResolutionRemarks.vue";
  import showAddServiceResolutionRemarks from "../../components/super_admin/showAddServiceResolutionRemarks.vue";
  import { mapGetters, mapActions } from "vuex";
  export default {
    name: "getserviceActiveResolutionDeatils",
    components: {
        showEditServiceResolutionRemarks,
        showAddServiceResolutionRemarks,
    },
  
    data() {
      return {
        activeTab: "tab-3",
        propShowEditServiceResolutionRemarks: false,
        propShowAddServiceResolutionRemarks: false,
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
        DeactiveServiceResolutionRemarks: [],
        ActiveServiceResolutionRemarks: [],
      };
    },
  
    created() {
      /* START: Load user table data filter > Regions */
      this.ajaxSpareData();
      // this.ajaxSpareData1();
      /* End: Load user table data filter > Regions */
    },
  
    computed: {
      ...mapGetters("serviceRequest", ["getserviceActiveResolutionDeatils", "getserviceDeactiveResolutionDeatils"])
    },
    
    methods: {
      ...mapActions("serviceRequest", ["FETCH_ACTIVE_SERVICE_RESOLUTION_DATAS", "FETCH_DEACTIVE_SERVICE_RESOLUTION_DATAS", "DELETE_SERVICE_RESOLUTION_REMARKS"]),
      ...mapActions("serviceRequest", ["ACTIVE_SERVICE_RESOLUTION_REMARKS"]),
  
      fnShowActiveServiceResolutionRemarks(reqData){
        console.log("REQEST DATA---------->",JSON.stringify(reqData))
           let param={
            id: reqData.id,
            request: reqData,
             };
          this.$q
          .dialog({
            title: "Confirm",
            message: "Are you sure want to active this Remarks?",
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
             this.ACTIVE_SERVICE_RESOLUTION_REMARKS(param)
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
              this.$q.loading.hide();
              this.$q.notify({
                color: "negative",
                position: "bottom",
                message:
                  error.body.message == null
                    ? "Please Try Again Later !"
                    : error.body.message,
                icon: "thumb_down"
              });
            });
      },

      fnDeleteServiceResolutionRemarks(rowDetails) {
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
            this.DELETE_SERVICE_RESOLUTION_REMARKS(rowDetails)
              .then(response => {
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
          });
      },
  
      ajaxSpareData() {
        this.FETCH_ACTIVE_SERVICE_RESOLUTION_DATAS()
          .then(res => {
            console.log("getACTIVE------->", JSON.stringify(this.getserviceActiveResolutionDeatils))
             this.tableData = this.getserviceActiveResolutionDeatils;
            // console.log("tableData------->", JSON.stringify(this.tableData))
            // this.DeactivetableData = this.getserviceActiveResolutionDeatils.filter(service => service.active == false);
            //   console.log("DeactivetableData------->", JSON.stringify(this.DeactivetableData))
             this.ActivetableData = this.getserviceActiveResolutionDeatils.filter(service => service.active == true);
               console.log("ActivetableData------->", JSON.stringify(this.ActivetableData))
               })
          .catch(() => {
            this.$q.loading.hide();
          });

          this.FETCH_DEACTIVE_SERVICE_RESOLUTION_DATAS()
          .then(res => {
            console.log("getDEACTIVE------->", JSON.stringify(this.getserviceDeactiveResolutionDeatils))
             this.tableData = this.getserviceDeactiveResolutionDeatils;
            console.log("tableData------->", JSON.stringify(this.tableData))
            this.DeactivetableData = this.getserviceDeactiveResolutionDeatils.filter(service => service.active == false);
              console.log("DeactivetableData------->", JSON.stringify(this.DeactivetableData))
            //  this.ActivetableData = this.getserviceDeactiveResolutionDeatils.filter(service => service.active == true);
            //    console.log("ActivetableData------->", JSON.stringify(this.ActivetableData))
               })
          .catch(() => {
            this.$q.loading.hide();
          });
      },
      // ajaxSpareData1() {
      //   this.FETCH_ALL_SERVICE_RESOLUTION_REMARKS()
      //     .then(res => {
      //     //   this.tableData1 = this.getserviceDeactiveResolutionDeatils;
      //       console.log(
      //         "TABLE DATA 11111111111111 VALUES-RESPONSE---------->",
      //         JSON.stringify(this.tableData1)
      //       );
      //        this.DeactiveServiceResolutionRemarks = this.getserviceDeactiveResolutionDeatils.filter(service => service.active == false);
      //          this.ActiveServiceResolutionRemarks= this.getserviceDeactiveResolutionDeatils.filter(service => service.active == true);
      //     })
      //     .catch(() => {
      //       this.$q.loading.hide();
      //     });
      // },

      fnShowAddServiceResolutionRemarks(token) {
        this.propShowAddServiceResolutionRemarks = !this.propShowAddServiceResolutionRemarks;
        // this.propRowDetails2 = rowDetails;
        if(token == "refresh") {
          this.ajaxSpareData();
        }
      },
  
      fnShowEditServiceResolutionRemarks(rowDetails) {
        this.propShowEditServiceResolutionRemarks = !this.propShowEditServiceResolutionRemarks;
        this.propRowDetails1 = rowDetails;
        if( this.propShowEditServiceResolutionRemarks== false){
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
  