<template>
  <q-page>
    <div>
      <q-tabs v-model="activeTab" class="shadow-1" color="grey-1" >
         <q-tab @select="ajaxSpareData" default  color="dark" name="tab-3" slot="title" label="Active Issue Types" />
          <q-tab  color="dark" name="tab-4" slot="title" label="Deactive Issue Types" />
        <!-- <q-tab-panel name="tab-1">
          <q-table 
          :rows="ActivetableData"
          table-class="customSATableClass" 
          :columns="columns" 
          :filter="filterSearch"
          :pagination="paginationControl"
          :filter-method="myCustomSearchFilter" 
          row-key="name" 
          color="grey-9"
          >
            <q-td v-slot:body-cell-serviceReqIssueTypeSets="props" :props="props">
              <div class="row no-wrap group" v-for="menu in props.row.serviceReqIssueTypeSets" :key="menu.id">
                <q-chip color="light" class="text-dark">
                  {{ menu.serviceReqIssueType.name}}
                </q-chip>
              </div>
            </q-td>

            <q-td v-slot:body-cell-serviceRequestStatusSets="props" :props="props">
              <div class="row no-wrap group" v-for="menu in props.row.serviceRequestStatusSets" :key="menu.id">
                <q-chip color="light" class="text-dark">
                  {{ menu.name}}
                </q-chip>
              </div>
            </q-td>

            <q-td v-slot:body-cell-action="props" :props="props">
              <div class="row no-wrap no-padding">
                <q-btn dense no-caps no-wrap label="Modify" icon="far fa-plus-square" size="md"
                  @click="fnShowEditServiceType(props.row)" flat class="text-light-blue"></q-btn>
                <q-btn dense no-caps no-wrap label="Disable" icon="far fa-minus-square" size="md"
                  @click="fnDeleteServiceType(props.row)" flat class="text-negative"></q-btn>
              </div>
            </q-td>

            <template v-slot:top="props">
              <div class="col-3">
                <q-input clearable color="grey-9" v-model="filterSearch" placeholder="Type.." class="q-mr-lg" />
              </div>
              <div class="col-3" align="right">
                <q-btn no-caps class="text-weight-regular" label="Add Service Type"
                  @click="fnShowAddNewServiceType(props.row)" color="purple-9" size="md" />
              </div>
            </template>
          </q-table>
        </q-tab-panel>
        <q-tab-panel name="tab-2">
          <q-table 
          :rows="DeactivetableData"
          table-class="customSATableClass" 
          :columns="columns" 
          :filter="filterSearch2"
          :pagination="paginationControl"
          :filter-method="myCustomSearchFilter" 
          row-key="name" 
          color="grey-9"
          >
            <q-td v-slot:body-cell-serviceReqIssueTypeSets="props" :props="props">
              <div class="row no-wrap group" v-for="menu in props.row.serviceReqIssueTypeSets" :key="menu.id">
                <q-chip color="light" class="text-dark">
                  {{ menu.serviceReqIssueType.name}}
                </q-chip>
              </div>
            </q-td>

            <q-td v-slot:body-cell-serviceRequestStatusSets="props" :props="props">
              <div class="row no-wrap group" v-for="menu in props.row.serviceRequestStatusSets" :key="menu.id">
                <q-chip color="light" class="text-dark">
                  {{ menu.name}}
                </q-chip>
              </div>
            </q-td>

            <q-td v-slot:body-cell-action="props" :props="props">
              <div class="row no-wrap no-padding">
                <q-btn dense no-caps no-wrap label="Active" icon="far fa-plus-square" size="md"
                  @click="fnShowActiveServiceType(props.row)" flat class="text-light-blue"></q-btn>
              </div>
            </q-td>

            <template v-slot:top="props">
              <div class="col-3">
                <q-input clearable color="grey-9" v-model="filterSearch2" placeholder="Type.." class="q-mr-lg" />
              </div>
            </template>
          </q-table>
        </q-tab-panel> -->

        <q-tab-panel name="tab-3">
          <q-table :rows="ActivetableData" table-class="customSATableClass" :columns="columns1" :filter="filterSearch1"
            :pagination="paginationControl" :filter-method="myCustomSearchFilter1" row-key="name" color="grey-9">
            <q-td v-slot:body-cell-createdDate="props" :props="props">{{
                props.row.createdDate | moment("Do MMM Y")
            }}</q-td>
            <q-td v-slot:body-cell-updatedDate="props" :props="props">{{
                props.row.updatedDate | moment("Do MMM Y")
            }}</q-td>

            <q-td v-slot:body-cell-action1="props" :props="props">
              <div class="row no-wrap no-padding">
                <q-btn dense no-caps no-wrap label="Modify" icon="far fa-plus-square" size="md"
                  @click="fnShowEditSubTaskType(props.row)" flat class="text-light-blue"></q-btn>
                <q-btn dense no-caps no-wrap label="Disable" icon="far fa-minus-square" size="md"
                  @click="fnDeleteSubTaskType(props.row)" flat class="text-negative"></q-btn>
              </div>
            </q-td>
             <template v-slot:top="props">
              <div class="col-3">
                <q-input clearable color="grey-9" v-model="filterSearch1" placeholder="Type.." class="q-mr-lg" />
              </div>
              <!--END: table filter,search -->
              <div class="col-3" align="right">
                <q-btn no-caps class="text-weight-regular" label="Add Sub Task"
                  @click="fnShowAddNewSubTaskType(props.row)" color="purple-9" size="md" />
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
            <q-td v-slot:body-cell-createdDate="props" :props="props">{{
                props.row.createdDate | moment("Do MMM Y")
            }}</q-td>
            <q-td v-slot:body-cell-updatedDate="props" :props="props">{{
                props.row.updatedDate | moment("Do MMM Y")
            }}</q-td>

            <q-td v-slot:body-cell-action2="props" :props="props">
              <div class="row no-wrap no-padding">
                <q-btn dense no-caps no-wrap label="Active" icon="far fa-plus-square" size="md"
                  @click="fnShowActiveIssueType(props.row)" flat class="text-light-blue"></q-btn>
              </div>
            </q-td>

            <template v-slot:top="props">
              <div class="col-3">
                <q-input clearable color="grey-9" v-model="filterSearch3" placeholder="Type.." class="q-mr-lg" />
              </div>
            </template>
          </q-table>
        </q-tab-panel>
      </q-tabs>
      <!--START: Show edit  service Parts -->
      <showEditServiceType v-if="propShowEditServiceType" :propShowEditServiceType="propShowEditServiceType"
        :propRowDetails="propRowDetails" @emitfnshowEditServiceType="fnShowEditServiceType" />
      <!-- END: Show edit  Spare Parts -->

      <!--START: Show edit  Sub Task  -->
      <showEditSubTaskType v-if="propShowEditSubTaskType" :propShowEditSubTaskType="propShowEditSubTaskType"
        :propRowDetails1="propRowDetails1" @emitfnshowEditSubTaskType="fnShowEditSubTaskType" />
      <!-- END: Show edit  Spare Parts -->
      
      <!--START: Show fnShowActiveServiceType Task  -->
      <!-- <showActiveServiceType v-if="propShowActiveServiceType" :propShowActiveServiceType="propShowActiveServiceType"
        :propRowDetails4="propRowDetails4" @emitfnshowActiveSubTaskType="fnShowActiveServiceType" /> -->
      <!-- END: Show fnShowActiveServiceType -->

      <!--START: Show ServiceType -->
      <ShowAddServiceType v-if="propShowAddServiceType" :propShowAddServiceType="propShowAddServiceType"
        :propRowDetails="propRowDetails" @emitfnShowAddNewServiceType="fnShowAddNewServiceType" />
      <!--END: Show Add Spare Parts -->

      <!--START: Show SubTaskType -->
      <ShowAddSubTaskType v-if="propShowAddSubTaskType" :propShowAddSubTaskType="propShowAddSubTaskType"
        :propRowDetails2="propRowDetails2" @emitfnShowAddNewSubTaskType="fnShowAddNewSubTaskType" />
      <!--END: Show Add SubTaskType -->
    </div>
  </q-page>
</template>
<script>
import { required } from '@vuelidate/validators';
import ShowAddServiceType from "../../components/super_admin/ShowAddServiceType.vue";
import showEditServiceType from "../../components/super_admin/showEditServiceType.vue";
import showEditSubTaskType from "../../components/super_admin/showEditSubTaskType.vue";
import ShowAddSubTaskType from "../../components/super_admin/ShowAddSubTaskType.vue";
import showActiveServiceType from "../../components/super_admin/showActiveServiceType.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "getsubTaskDetails",
  components: {
    ShowAddServiceType,
    showEditServiceType,
    showEditSubTaskType,
    ShowAddSubTaskType,
    showActiveServiceType,
  },

  data() {
    return {
      activeTab: "tab-3",
      propShowAddServiceType: false,
      propShowEditServiceType: false,
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
      filterSearch2: "",
      filterSearch3: "",
      filter_values: "",
      multipleSelect: "",
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
          field: "name",
          sortable: true
        },
        {
          name: "createdDate",
          required: true,
          label: "Created Date",
          align: "left",
          field: "createdDate",
          sortable: true
        },
        {
          name: "updatedDate",
          required: true,
          label: "Updated Date",
          align: "left",
          field: "updatedDate",
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
          field: "name",
          sortable: true
        },
        {
          name: "createdDate",
          required: true,
          label: "Created Date",
          align: "left",
          field: "createdDate",
          sortable: true
        },
        {
          name: "updatedDate",
          required: true,
          label: "Updated Date",
          align: "left",
          field: "updatedDate",
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
      DeactiveissueTypes: [],
      ActiveissueTypes: [],
    };
  },

  created() {
    /* START: Load user table data filter > Regions */
    this.ajaxSpareData();
    this.ajaxSpareData1();
    /* End: Load user table data filter > Regions */
  },

  computed: {
    ...mapGetters("serviceRequest", [
      "getserviceRequestGetTypes",
      "getsubTaskDetails"
    ])
  },
  
  methods: {
    ...mapActions("serviceRequest", [
      "FETCH_ALL_SERVICE_REQUEST_GET_TYPES",
      "DELETE_SERVICE_REQUEST_TYPES",
      "FETCH_SUB_TASK_DATAS",
      "DELETE_SUB_TASK_TYPES"
    ]),
    ...mapActions("serviceRequest", ["EDIT_SERVICE_REQUEST_TYPES", "ACTIVE_SERVICE_ISSUE_TYPES"]),

    fnShowActiveServiceType(reqData){
         console.log("REQEST DATA---------->",JSON.stringify(reqData))
         let param={
          id: reqData.serviceReqType.id,
          request: reqData,
           };
           this.$q.loading.show();
        this.EDIT_SERVICE_REQUEST_TYPES(param)
          .then(() => {
            this.$q.loading.hide();
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Successfully updated!",
              icon: "thumb_up"
            });
            this.emitfnshowEditServiceType();
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
    fnShowActiveIssueType(reqData){
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
           this.ACTIVE_SERVICE_ISSUE_TYPES(param)
          .then(() => {
            this.$q.loading.hide();
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Successfully updated!",
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
    //  fnfinalsubmitEditedSpareParts(formData) {
    //     // this.formData.serviceReqIssueTypeSets = this.serviceReqIssueTypeSets;
    //   console.log("FINAL SUBMITTED VALUES----------->",JSON.stringify(formData))
    //   let param={
    //     id:this.propRowDetails.serviceReqType.id,
    //      request: formData,

    //   };
    //   console.log("FINAL PARAM SUBMIT--------->",JSON.stringify(param))
    //     this.$q.loading.show();
    //     this.EDIT_SERVICE_REQUEST_TYPES(param)
    //       .then(() => {
    //         this.$q.loading.hide();
    //         this.$q.notify({
    //           color: "positive",
    //           position: "bottom",
    //           message: "Successfully updated!",
    //           icon: "thumb_up"
    //         });
    //         this.emitfnshowEditServiceType();
    //       })
    //       .catch(error => {
    //         this.$q.loading.hide();
    //         this.$q.notify({
    //           color: "negative",
    //           position: "bottom",
    //           message:
    //             error.body.message == null
    //               ? "Please Try Again Later !"
    //               : error.body.message,
    //           icon: "thumb_down"
    //         });
    //       });
    
    // }

    // changeTabs(tab){
    //   if (tab == "tab-2") {
    //     this.FETCH_ALL_SERVICE_REQUEST_GET_TYPES()
    //     .then(res => {
    //       this.DeactivetableData = this..filter(service => service.serviceReqType.active == false);
    //      })
    //     .catch(() => {
    //       this.$q.loading.hide();
    //     });
    //   } else if(tab == "tab-3"){
    //     this.FETCH_SUB_TASK_DATAS()
    //     .then(res => {
    //       this.tableData1 = this.getsubTaskDetails;
    //       console.log(
    //         "TABLE DATA 11111111111111 VALUES-RESPONSE---------->",
    //         JSON.stringify(this.tableData1)
    //       );
    //     })
    //     .catch(() => {
    //       this.$q.loading.hide();
    //     });
    //   }else{
    //     this.FETCH_ALL_SERVICE_REQUEST_GET_TYPES()
    //     .then(res => {
    //        this.ActivetableData = this..filter(service => service.serviceReqType.active == true);
    //      })
    //     .catch(() => {
    //       this.$q.loading.hide();
    //     });
    //   }

    // },

    fnDeleteServiceType(rowDetails) {
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
          this.DELETE_SERVICE_REQUEST_TYPES(rowDetails)
            .then(response => {
               this.$q.loading.hide();
              this.$q.notify({
                color: "positive",
                position: "bottom",
                message: "Successfully removed",
                icon: "thumb_up"
              });
               this.$q.loading.hide();
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
    fnDeleteSubTaskType(rowDetails) {
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
          this.DELETE_SUB_TASK_TYPES(rowDetails)
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
        });
    },

    ajaxSpareData() {
      this.FETCH_SUB_TASK_DATAS()
        .then(res => {
          console.log("getsubTaskDetails------->", JSON.stringify(this.getsubTaskDetails))
           this.tableData = this.getsubTaskDetails;
          console.log("tableData------->", JSON.stringify(this.tableData))
          this.DeactivetableData = this.getsubTaskDetails.filter(service => service.active == false);
            console.log("DeactivetableData------->", JSON.stringify(this.DeactivetableData))
           this.ActivetableData = this.getsubTaskDetails.filter(service => service.active == true);
             console.log("ActivetableData------->", JSON.stringify(this.ActivetableData))
             })
        .catch(() => {
          this.$q.loading.hide();
        });
    },
    ajaxSpareData1() {
      this.FETCH_ALL_SERVICE_REQUEST_GET_TYPES()
        .then(res => {
        //   this.tableData1 = this.getsubTaskDetails;
          console.log(
            "TABLE DATA 11111111111111 VALUES-RESPONSE---------->",
            JSON.stringify(this.tableData1)
          );
           this.DeactiveissueTypes = this.getsubTaskDetails.filter(service => service.active == false);
             this.ActiveissueTypes = this.getsubTaskDetails.filter(service => service.active == true);
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },
    fnShowAddNewServiceType(rowDetails) {
      this.propShowAddServiceType = !this.propShowAddServiceType;
      this.propRowDetails = rowDetails;
    },
    fnShowAddNewSubTaskType(token) {
      this.propShowAddSubTaskType = !this.propShowAddSubTaskType;
      // this.propRowDetails2 = rowDetails;
      if(token == "refresh") {
        this.ajaxSpareData();
      }
    },

    fnShowEditServiceType(rowDetails) {
      this.propShowEditServiceType = !this.propShowEditServiceType;
      this.propRowDetails = rowDetails;
    },
    fnShowEditSubTaskType(rowDetails) {
      this.propShowEditSubTaskType = !this.propShowEditSubTaskType;
      this.propRowDetails1 = rowDetails;
      if( this.propShowEditSubTaskType== false){
         this.ajaxSpareData()
      }
    },
    // fnShowActiveServiceType(rowDetails){
    //  this.propShowActiveServiceType = !this.propShowActiveServiceType;
    //   this.propRowDetails4 = rowDetails;
    // },
    

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
