<template>
  <q-page>
    <div>
      <q-tabs v-model="activeTab" class="shadow-1" color="grey-1" >
        <q-tab @select="ajaxSpareData" default color="dark" name="tab-1" slot="title" label="Active Service Request" />
        <q-tab  color="dark" name="tab-2" slot="title" label="Deactive Service Request" />
        <q-tab-pane name="tab-1">
          <q-table 
          :data="ActivetableData" 
          table-class="customSATableClass" 
          :columns="columns2" 
          :filter="filterSearch"
          :pagination.sync="paginationControl" 
          :filter-method="myCustomSearchFilter1" 
          row-key="name" 
          color="grey-9"
          >

          <q-td slot="body-cell-action" slot-scope="props" :props="props">
              <div class="row no-wrap no-padding">
                 <q-btn dense no-caps no-wrap label="Modify" icon="far fa-plus-square" size="md"
                  @click="fnShowEditServiceType(props.row)" flat class="text-light-blue"></q-btn>
                <q-btn dense no-caps no-wrap label="Disable" icon="far fa-minus-square" size="md"
                  @click="fnDeleteServiceType(props.row)" flat class="text-negative"></q-btn>
              </div>
            </q-td>

            <q-td slot="body-cell-serviceReqIssueTypeSets" slot-scope="props" :props="props">
              <div class="row no-wrap group" v-for="menu in props.row.serviceReqIssueTypeSets" >
                <q-chip color="light" class="text-dark">
                  {{ menu.serviceReqIssueType.name}}
                </q-chip>
              </div>
            </q-td>
            <q-td slot="body-cell-serviceRequestStatusSets" slot-scope="props" :props="props">
              <div class="row no-wrap group" v-for="menu in props.row.serviceRequestStatusSets" >
                <q-chip color="light" class="text-dark">
                  {{ menu.serviceRequestStatus != null ? menu.serviceRequestStatus.name : "NA" }}
                </q-chip>
              </div>
            </q-td>
            
            <template slot="top" slot-scope="props">
              <!-- <div class="col-3">
                <q-search clearable color="grey-9" v-model="filterSearch" placeholder="Type.." class="q-mr-lg" />
              </div> -->
              <div class="col-7" align="right">
                <q-btn no-caps class="text-weight-regular" label="Add Service Type"
                  @click="fnShowAddNewServiceType(props.row)" color="purple-9" size="md" />
              </div>
            </template>
          </q-table>
        </q-tab-pane>
        
        <q-tab-pane name="tab-2">
          <q-table 
          :data="DeactivetableData" 
          table-class="customSATableClass" 
          :columns="columns1" 
          :filter="filterSearch1"
          :pagination.sync="paginationControl2" 
          :filter-method="myCustomSearchFilter2" 
          row-key="name" 
          color="grey-9"
          >

            <q-td slot="body-cell-serviceReqIssueTypeSets" slot-scope="props" :props="props">
              <div class="row no-wrap group" v-for="menu in props.row.serviceReqIssueTypeSets" >
                <q-chip color="light" class="text-dark">
                  {{ menu.serviceReqIssueType.name}}
                </q-chip>
              </div>
            </q-td>
             <q-td slot="body-cell-serviceRequestStatusSets" slot-scope="props" :props="props">
              <div class="row no-wrap group" v-for="menu in props.row.serviceRequestStatusSets" >
                <q-chip color="light" class="text-dark">
                  {{ menu.serviceRequestStatus != null ? menu.serviceRequestStatus.name : "NA"}}
                </q-chip>
              </div>
            </q-td>


            <q-td slot="body-cell-action1" slot-scope="props" :props="props">
              <div class="row no-wrap no-padding">
                <q-btn dense no-caps no-wrap label="Active" icon="far fa-plus-square" size="md"
                  @click="fnShowActiveServiceType(props.row)" flat class="text-light-blue"></q-btn>
              </div>
            </q-td>

            <template slot="top" slot-scope="props"> 
              <!-- <div class="col-3">
                <q-search clearable color="grey-9" v-model="filterSearch1" placeholder="Type.." class="q-mr-lg" />
              </div> -->
            </template>
          </q-table>
        </q-tab-pane>
              </q-tabs>
              
      <!--START: Show edit  service Parts -->
      <showEditServiceType v-if="propShowEditServiceType" :propShowEditServiceType="propShowEditServiceType"
        :propRowDetails2="propRowDetails2" @emitfnshowEditServiceType="fnShowEditServiceType" />
      <!-- END: Show edit  Spare Parts -->

      <!--START: Show edit  Sub Task  -->
      <showEditSubTaskType v-if="propShowEditSubTaskType" :propShowEditSubTaskType="propShowEditSubTaskType"
        :propRowDetails1="propRowDetails1" @emitfnshowEditSubTaskType="fnShowEditSubTaskType" />
      <!-- END: Show edit  Spare Parts -->
      

      <!--START: Show ServiceType -->
      <ShowAddServiceType v-if="propShowAddServiceType" :propShowAddServiceType="propShowAddServiceType"
        :propRowDetails="propRowDetails" @emitfnShowAddNewServiceType="fnShowAddNewServiceType" />
      <!--END: Show Add Spare Parts -->

    </div>
  </q-page>
</template>
<script>
import ShowAddServiceType from "../../components/super_admin/ShowAddServiceType.vue";
import showEditServiceType from "../../components/super_admin/showEditServiceType.vue";
import showEditSubTaskType from "../../components/super_admin/showEditSubTaskType.vue";
import ShowAddSubTaskType from "../../components/super_admin/ShowAddSubTaskType.vue";
import showActiveServiceType from "../../components/super_admin/showActiveServiceType.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "getserviceRequestGetTypes",
  components: {
    ShowAddServiceType,
    showEditServiceType,
    showEditSubTaskType,
    ShowAddSubTaskType,
    showActiveServiceType,
  },

  data() {
    return {
      activeTab: "tab-1",
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
      filter_values: "",
      multipleSelect: "",
      service_req_data: [],
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
          sortable: true
        },

        {
          name: "serviceReqIssueTypeSets",
          required: true,
          label: "Service Req Issue TypeSets",
          align: "left",
          field: row => {
            return row.serviceReqIssueTypeSets != null ? row.serviceReqIssueTypeSets.serviceReqIssueType.name : "NA";
          },
          sortable: true
        },

        {
          name: "serviceRequestStatusSets",
          required: true,
          label: "Service Status",
          align: "left",
          field: row => {
            return row.serviceRequestStatusSets != null ? row.serviceRequestStatusSets.serviceRequestStatus.name : "NA";
          },
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
      columns2: [
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
          sortable: true
        },

        {
          name: "serviceReqIssueTypeSets",
          required: true,
          label: "Service Req Issue TypeSets",
          align: "left",
          field: row => {
            return row.serviceReqIssueTypeSets != null ? row.serviceReqIssueTypeSets.serviceReqIssueType.name : "NA";
          },
          sortable: true
        },

        {
          name: "serviceRequestStatusSets",
          required: true,
          label: "Service Status",
          align: "left",
          field: row => {
            return row.serviceRequestStatusSets != null ? row.serviceRequestStatusSets.serviceRequestStatus.name : "NA";
          },
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
      tableData: [],
      tableData1: [],
      ActivetableData: [],
      DeactivetableData: [],
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
  //   beforeMount(){
  //       console.log("TABLE DATA VALUES----------->",JSON.stringify(this.getserviceRequestGetTypes))
  //   },

  methods: {
    ...mapActions("serviceRequest", [
      "FETCH_ALL_SERVICE_REQUEST_GET_TYPES",
      "DELETE_SERVICE_REQUEST_TYPES",
      "FETCH_SUB_TASK_DATAS",
      "DELETE_SUB_TASK_TYPES"
    ]),
    ...mapActions("serviceRequest", ["EDIT_SERVICE_REQUEST_TYPES"]),

    fnShowActiveServiceType(reqData){
         console.log("REQEST DATA---------->",JSON.stringify(reqData))
         let param={
          id: reqData.serviceReqType.id,
          request: reqData,
           };
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
        this.EDIT_SERVICE_REQUEST_TYPES(param)
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
            });
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
            this.emitfnshowEditServiceType();
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
      this.FETCH_ALL_SERVICE_REQUEST_GET_TYPES()
        .then(res => {
          console.log("getserviceRequestGetTypes------->", JSON.stringify(this.getserviceRequestGetTypes))
           this.tableData = this.getserviceRequestGetTypes;
          console.log("tableData------->", JSON.stringify(this.tableData))
          this.DeactivetableData = this.getserviceRequestGetTypes.filter(service => service.serviceReqType.active == false);
            console.log("DeactivetableData------->", JSON.stringify(this.DeactivetableData))
           this.ActivetableData = this.getserviceRequestGetTypes.filter(service => service.serviceReqType.active == true);
             console.log("ActivetableData------->", JSON.stringify(this.ActivetableData))
             
          })
        .catch(() => {
          this.$q.loading.hide();
        });
    },
    ajaxSpareData1() {
      this.FETCH_SUB_TASK_DATAS()
        .then(res => {
          this.tableData1 = this.getsubTaskDetails;
          console.log(
            "TABLE DATA 11111111111111 VALUES-RESPONSE---------->",
            JSON.stringify(this.tableData1)
          );
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },
    fnShowAddNewServiceType(token) {
      this.propShowAddServiceType = !this.propShowAddServiceType;
      // this.propRowDetails = rowDetails;
      if(token == "refresh") {
        this.ajaxSpareData();
      }
    },
    
    fnShowEditServiceType(rowDetails) {
      this.propShowEditServiceType = !this.propShowEditServiceType;
      this.propRowDetails2 = rowDetails;
      if( this.propShowEditServiceType== false){
         this.ajaxSpareData()
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
</style>
