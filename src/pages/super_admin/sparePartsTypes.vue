<template>
  <q-page>
    <!-- content -->
    <div>
      <!-- <pre>{{getAllRegionsData}}</pre> -->
      <!-- <pre>{{getAllHierarchiesData}}</pre> -->
      <div class="col-12 q-title q-my-lg text-weight-regular">Spare Parts Types</div>
      <q-tabs class="shadow-1" color="grey-1" >
        <q-tab default color="dark" name="active" slot="title" label="Active " />
        <q-tab color="dark" name="deactive" slot="title" label="Deactive" />
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
    slot="body-cell-created_date"
    slot-scope="props"
    :props="props"
  >{{ props.row.created_date | moment("Do MMM Y") }}</q-td>
  <q-td
    slot="body-cell-updated_date"
    slot-scope="props"
    :props="props"
  >{{ props.row.updated_date | moment("Do MMM Y") }}</q-td>
<q-td slot="body-cell-action" slot-scope="props" :props="props">
  <div class="row no-wrap no-padding">
    <q-btn
      dense
      no-caps
      no-wrap
      label="Modify"
      icon="far fa-plus-square"
      size="md"
      @click="fnShowEditSpareParts(props.row)"
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
      @click="fnDeleteSpareParts(props.row)"
      flat
      class="text-negative"
    ></q-btn>
  </div>
</q-td>

<template slot="top" slot-scope="props">
  <!--START: table title -->
 
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
          label="Add Spare Type"
          @click="fnShowAddNewSpareParts(props.row)"
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
          :filter="filterSearch"
          :pagination.sync="paginationControl"
          :filter-method="myCustomSearchFilter"
          row-key="name"
          color="grey-9"
          @select="ajaxSpareData"
>
<q-td
    slot="body-cell-created_date"
    slot-scope="props"
    :props="props"
  >{{ props.row.created_date | moment("Do MMM Y") }}</q-td>
  <q-td
    slot="body-cell-updated_date"
    slot-scope="props"
    :props="props"
  >{{ props.row.updated_date | moment("Do MMM Y") }}</q-td>
<q-td slot="body-cell-action" slot-scope="props" :props="props">
  <div class="row no-wrap no-padding">
    <q-btn
      dense
      no-caps
      no-wrap
      label="Active"
      icon="far fa-minus-square"
      size="md"
      @click="fnShowActiveSpareparts(props.row)"
      flat
      class="text-positive"
    ></q-btn>
  </div>
</q-td>

<template slot="top" slot-scope="props">
  <!--START: table title -->
 
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
</template>
</q-table>
        </q-tab-pane>
      </q-tabs>
     

      <!--START: Show edit  Spare Parts -->
      <showEditSpareParts
        v-if="propShowEditSpareParts"
        :propShowEditSpareParts="propShowEditSpareParts"
        :propRowDetails="propRowDetails"
        @emitfnshowEditSpareParts ="fnShowEditSpareParts"
      />
      <!--END: Show edit  Spare Parts -->

       <!--START: Show Add Spare Parts -->
      <ShowAddSpareParts
        v-if="propShowAddSpareParts"
        :propShowAddSpareParts="propShowAddSpareParts"
        :propRowDetails="propRowDetails"
        @emitfnShowAddNewSpareParts="fnShowAddNewSpareParts"
      />
      <!--END: Show Add Spare Parts -->

     
    </div>
  </q-page>
</template>

<script>
import ShowAddSpareParts from "../../components/super_admin/ShowAddSpareParts.vue";
import showEditSpareParts from "../../components/super_admin/showEditSpareParts.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "getsparePartsGetTypes",
   components: {
    ShowAddSpareParts,
    showEditSpareParts,
  },

  data() {
    return {
     
      propShowAddSpareParts: false,
      propShowEditSpareParts: false,
      propRowDetails: "",
      // propRowDetails1:"",

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
          name: "id",
          required: true,
          label: "id",
          align: "left",
          field: row =>{
            return row.id;
          },
          sortable: true
        },
         {
          name: "spare_parts_types",
          required: true,
          label: "spare_parts_types",
          align: "left",
          field: "spare_parts_types",
          sortable: false
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
        },
       
        {
          name: "is_active",
          required: true,
          label: "is_active",
          align: "left",
          field: "is_active",
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
          name: "id",
          required: true,
          label: "id",
          align: "left",
          field: row =>{
            return row.id;
          },
          sortable: true
        },
         {
          name: "spare_parts_types",
          required: true,
          label: "spare_parts_types",
          align: "left",
          field: "spare_parts_types",
          sortable: false
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
        },
       
        {
          name: "is_active",
          required: true,
          label: "is_active",
          align: "left",
          field: "is_active",
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
      activeTableData: [],
      deActiveTableData: [],
    };
  },

  created() {
    /* START: Load user table data filter > Regions */
     this.ajaxSpareData();
    /* End: Load user table data filter > Regions */
  },

  computed: {
      ...mapGetters("sparePartsGetTypes", [
      "getsparePartsGetTypes",
    ]),
  },
  beforeMount(){
      console.log("TABLE DATA VALUES----------->",JSON.stringify(this.getsparePartsGetTypes))
  },

  methods: {

    ...mapActions("sparePartsGetTypes", ["FETCH_SPARE_PARTS_GET_TYPES","DELETE_SPARE_PARTS_TYPES","ACTIVE_SPARE_PARTS_TYPES"]),


     fnDeleteSpareParts(rowDetails) {
       console.log("ROW DETAILSss------------->",JSON.stringify(rowDetails))
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
          this.DELETE_SPARE_PARTS_TYPES(rowDetails)
            .then(response => {
              this.ajaxSpareData();
              this.$q.loading.hide();
              this.$q.notify({
                color: "positive",
                position: "bottom",
                message: "Successfully removed",
                icon: "thumb_up"
              });
            })
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


    fnShowActiveSpareparts(rowDetails) {
       console.log("ROW DETAILS-ACTIVE------------>",JSON.stringify(rowDetails))
      this.$q
        .dialog({
          title: "Confirm",
          message: "Are you sure want to Active?",
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
          let rowDetails1={
            id: rowDetails.id,
            spare_parts_types:rowDetails.spare_parts_types,
            is_active : true,
            created_date:rowDetails.created_date,
            updated_date:rowDetails.updated_date,
            __index:rowDetails.__index
       }
       console.log("ROW DETAILS-ACTIVE2------------>",JSON.stringify(rowDetails1))
          this.ACTIVE_SPARE_PARTS_TYPES(rowDetails1)
            .then(response => {
              this.ajaxSpareData();
              this.$q.loading.hide();
              this.$q.notify({
                color: "positive",
                position: "bottom",
                message: "Successfully Activated",
                icon: "thumb_up"
              });
            })
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
    ajaxSpareData(){
      this.FETCH_SPARE_PARTS_GET_TYPES()
      .then(res => {
          this.activeTableData = this.getsparePartsGetTypes.filter(service => service.is_active == true);
          this.deActiveTableData = this.getsparePartsGetTypes.filter(service => service.is_active == false);
      })
       .catch(() => {
          this.$q.loading.hide();
        });
    },
     fnShowAddNewSpareParts(rowDetails){
       this.propShowAddSpareParts = !this.propShowAddSpareParts;
      this.propRowDetails = rowDetails;
      if(this.propShowEditSpareParts == false){
        this.ajaxSpareData()
      }
    },
    fnShowEditSpareParts(rowDetails){
      this.propShowEditSpareParts = !this.propShowEditSpareParts;
      this.propRowDetails = rowDetails;
      if(this.propShowEditSpareParts == false){
        this.ajaxSpareData()
      }
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
