<template>
    <q-page>
      <!-- content -->
  
      <div>
        <div class="row q-px-md q-py-md items-center">
          <!--START: table title -->
          <div class=" col-6 col-sm-4 col-md-8 text-h6 text-weight-regular text-grey-9 ">
          </div>
        </div>
  
        <div class=" row bottom-border group  q-px-md q-py-md items-center text-weight-regular text-grey-9 ">
          <div class="col-md-7">
            <p class="caption">Aggregator Spare Parts Types*</p>
            <div class="row">
              <div class="row items-center" v-for="menu in sparePartsTypes" :key="menu.value.id" :to="menu.to">
                <input style="width: 18px; height: 18px" type="checkbox" :id="menu.value.id + '_CB'"
                  :name="menu.value.spare_parts_types" @input="clearEvent($event)" @click="getSelectedDetails($event, sparePartsTypes, menu.value)" />
                <label>{{ menu.value.spare_parts_types }}</label>
              </div>
            </div>
            <div v-for="menu in sparePartsTypes" :key="menu.id" :to="menu.to">
              <div :id="menu.value.id + '_DV'" style="display: none" @click="finding(menu.value.id)">
                <label>{{ menu.value.spare_parts_types }}</label>
                <input :id="menu.value.id + '_IP'" type="number" min="1" max="5000" @blur="getAllCounts($event, menu)" />
                <q-btn type="button" align="center" size="sm" color="purple" :disabled="dis()" @click="fnSubmit(formData)">Submit</q-btn>
              </div>
            </div>
          </div>
        </div>
        <!-- onfocus="clearInput($event)"-->
        <div class="col-md-12 text-h6 q-px-lg q-py-md text-weight-regular bottom-border text-grey-9">
          <!--START: table title -->
          <div class="
              col-6 col-sm-4 col-md-8
              text-h6
              text-weight-regular text-grey-9
            ">
            Aggregator Stock List
          </div>
          <q-table :rows="tableData" table-class="customSATableClass" :columns="columns"
            :pagination="paginationControl" row-key="name" color="grey-9">
            <q-td v-slot:body-cell-created_date="props" :props="props">{{ props.row.created_date | moment("Do MMM Y") }}</q-td>
            <q-td v-slot:body-cell-updated_date="props" :props="props">{{ props.row.updated_date | moment("Do MMM Y") }}</q-td>
          </q-table>
        </div>
      </div>
    </q-page>
  </template>
  
  <script>
import { required } from '@vuelidate/validators';

  // import VueBarcodeScanner from "vue-barcode-scanner";
  // Vue.use(VueBarcodeScanner);
  import { mapGetters, mapActions } from "vuex";
  
  export default {
    name: "allocateDevice",
    data() {
      return {
        scannerToggleOption: true,
        regionOptions: [],
        deviceOptions: [],
        regionBasedSo: [],
        resellarOptions: [],
        sparePartsTypes: [],
        spareMapping: [],
        menu: [],
        selectedSpareValue: "",
        tempTableData: [],
        tableData: [],
        storedItems: [],
        requestData: [],
        eventAction: "",
        // spareCount: {
        //   id: 0,
        //    is_active: true,
        // },
        formData: {
          count: "",
  
          spare_inventory_data: {
            id: "",
            is_active: true
          },
          // spare_inventory_data: []
        },
  
        paginationControl: {
          rowsPerPage: 10
        },
  
        columns: [
          {
            name: "spare_parts_types",
            required: true,
            label: "Spare Parts Types",
            align: "left",
            field: row => {
              return row.spare_inventory_data.spare_parts_types;
            },
            sortable: true
          },
          {
            name: "count",
            required: true,
            label: "Count",
            align: "left",
            field: "count",
            sortable: false
          },
          {
            name: "created_by",
            required: true,
            label: "Spare Created",
            align: "left",
            field: row => {
              return row.created_by.name;
            },
            sortable: true
          },
          {
            name: "created_date",
            required: true,
            label: "Created Date",
            align: "left",
            field: "created_date",
            sortable: true
          },
          {
            name: "updated_date",
            required: true,
            label: "Updated Date",
            align: "left",
            field: "updated_date",
            sortable: true
          }
        ],
        // dropDown: {
        //   sparePartsTypes: []
        // },
        flagOptions: [
          {
            label: "Region",
            value: 0
          },
          {
            label: "SO",
            value: 1
          },
          {
            label: "Reseller",
            value: 2
          }
        ],
        tableAjaxLoading: false
      };
    },
  
    computed: {
      ...mapGetters("sparePartsGetTypes", [
        "getsparePartsGetTypes",
        "getallInventorySparePartsGetTypes", "getallPhonepeInventorySparePartsGetTypes"
      ]),
      ...mapGetters("commonLoader", ["getToggleCommonLoader"])
    },
    created() {
      this.fnSparePartsTypes();
      this.fngetAllInventoryDatas();
      // this. resetForm() ;
      // this.FETCH_REGION_BASED_SO();
    },
  
    methods: {
      ...mapActions("sparePartsGetTypes", [
        "FETCH_SPARE_PARTS_GET_TYPES",
        "FETCH_ALL_SPARE_PARTS_INVENTORY_DATAS","FETCH_ALL_PHONEPE_SPARE_PARTS_INVENTORY_DATAS",
        "SPARE_PARTS_ADD_STOCKS", "PHONEPE_SPARE_PARTS_ADD_STOCKS"
      ]),
      ...mapActions("commonLoader", ["TOGGLE_COMMON_LOADER"]),
  
      // clearInput(event){
      //   if(event.target.value == "clear input")
      //   event.target.value="";
      // },
  
      clearEvent(event){
        console.log("EVENT-------------------->>>>",event.target.id.split('_')[0])
         this.eventAction = event.target.id.split('_')[0];
    },

      dis(){
        console.log("VALUES ID-------------------->>>>",this.formData.spare_inventory_data.id)
        console.log("VALUES EVENT----------------------->>>>",this.eventAction)
        if(this.formData.spare_inventory_data.id == this.eventAction){
                return false;
        }
        else{
          return true;
        }
      },

      fngetAllInventoryDatas() {
        this.FETCH_ALL_PHONEPE_SPARE_PARTS_INVENTORY_DATAS()
          .then(res => {
            this.tableData = this.getallPhonepeInventorySparePartsGetTypes;
            console.log(
              "TABLE DATA fngetAllInventoryDatas VALUES-RESPONSE---------->",
              JSON.stringify(this.tableData)
            );
          })
          .catch(() => {
            this.$q.loading.hide();
          });
      },
      getAllCounts(event, menu) {
  
        this.formData.count = parseInt(event.target.value);
  
      },
      // reset(){
  
      // },
      finding(request) {
        console.log("SELCETED CHECK BOX VALUES------->", JSON.stringify(request));
        this.formData.spare_inventory_data.id = request;
        console.log("SELCETED spare_inventory_data Id------->", JSON.stringify(this.formData.spare_inventory_data.id))
      },
      getSelectedDetails(event, sparePartsTypes, request) {
        this.requestData = request;
        this.selectedSpareValue = this.requestData;
        let chFlag = event.target.checked;
        if (chFlag) {
          document.getElementById(request.id + "_DV").style.display = "block";
          sparePartsTypes.forEach((value, index) => {
              if(value.value.id != request.id){
              document.getElementById(value.value.id + "_CB").checked = false
              document.getElementById(value.value.id + "_DV").style.display = "none";
              }
          });
        } else {
          document.getElementById(request.id + "_DV").style.display = "none";
        }
      },
      fnSubmit(request) {
        let self = this;
        self.$q.loading.show({
          delay: 0, // ms
          spinnerColor: "purple-9",
          message: "Validating ..",
        });
        self.PHONEPE_SPARE_PARTS_ADD_STOCKS(request)
          .then(() => {
            self.$q.loading.hide();
            self.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Stocks Added Successfully",
              icon: "thumb_up"
            });
            self.fngetAllInventoryDatas();
            self.formData= "";
            self.$router.go();
            
            
  
          })
          .catch(error => {
            self.$q.notify({
              color: "negative",
              position: "bottom",
              message: "Please try again",
              icon: "thumb_down"
            });
          });
      },
      fnSparePartsTypes() {
        let self = this;
        self.FETCH_SPARE_PARTS_GET_TYPES().then(() => {
          return _.map(self.getsparePartsGetTypes, item => {
            self.sparePartsTypes.push({
              value: item,
              label: item.spare_parts_types
            });
          });
        });
      }
    }
  };
  </script>
  <style scoped>
  .activeDeviceTab .q-list-header {
    border-bottom: 1px solid rgb(204, 204, 204);
    background: #61116a;
    color: #fff;
  }
  </style>
  
