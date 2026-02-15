<template>
  <div>
      <q-dialog maximized
        @hide= "emitToggleMerchantTransactionLevelDetails()" 
        @escape-key= "emitToggleMerchantTransactionLevelDetails()"  
        transition
        enter-class="animated fadeIn"
        leave-class="animated fadeOut"
        :model-value="valueToggleMerchantTransaction"
        :content-css= "{maxWidth: '50vw', minHeight: '100vh',padding:'50px'}"
        position= "right"
        >

        <div class="row items-center border-bottom">
          <div class="col-md-8 q-pa-xs">
            <div class="text-h6 q-my-md">Bombay Fires</div>
            <p class="text-light-blue"># 554855</p>
          </div>
          <div class="col-md-4 q-pa-xs" align="right">
            <q-btn
              round
              outline
              size="sm"
              color=grey-8
              icon="fas fa-times"
              @click="emitToggleMerchantTransactionLevelDetails"
            />
          </div>
        </div>

        <div class="row group">
          <div class="col">
            <div class="text-body1 font-weight-medium q-py-sm"><q-icon color="light-blue" name="phone" size="20px"/> Contact</div>
            <p class="no-margin">+91 9874563210</p>
            <p>+91 9856214700</p>
          </div>

          <div class="col">
            <div class="text-body1 font-weight-medium q-py-sm"><q-icon color="light-blue" name="location_on" size="20px"/> Address</div>
            <p>13A, Haddows Road, Nungambakkam, Chennai, Tamilnadu</p>
          </div>

          <div class="col">
            <div class="text-body1 font-weight-medium q-py-sm"><q-icon color="light-blue" name="map" size="20px"/> State</div>
            <p>Tamilnadu</p>
          </div>

          <div class="col">
            <div class="text-body1 font-weight-medium q-py-sm"><q-icon color="light-blue" name="date_range" size="20px"/> Date of onboarding</div>
            <p>20 Oct, 2017</p>
          </div>
        </div>
       
       <q-table
          flat
          dense
          class="shadow-none"
          :rows="tableData"
          :columns="columns"
          :filter="filter"
          row-key="name"
        >
          <template v-slot:top="props">
            
            <!--START: table title -->
            <!-- <div class="col-md-12 text-h6 q-mt-lg  text-weight-regular">FINANCE APPROVED TRACKER </div> -->
            <!--END: table title -->

            <!--START: table search -->
            <div class="col-md-12">
              <q-input
                clearable
                color="grey-9"
                v-model="filter"
                placeholder="Type.."
                float-label= "Search"
                class="q-mt-lg q-mr-lg"
              />
            </div>
            <!--END: table search -->

          </template>
        </q-table>
</q-dialog>
  </div>
</template>

<script>
import { required, and } from '@vuelidate/validators';
export default {
  name: "showMerchantTransactionLevelDetails",
  props: ["valueToggleMerchantTransaction"],
  data() {
    return {
      filter: "",
      searchFilter: "",
      columns: [
        {
          name: "tid",
          required: true,
          label: "TID",
          align: "left",
          field: "tid",
          sortable: true,
        },
        {
          name: "deviceAddress",
          required: true,
          label: "Address",
          align: "left",
          field: "deviceAddress",
          sortable: true,
        },
      ],
      loading: true,
      tableData: [
        {
          tid: 554845,
          deviceAddress:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        },
        {
          tid: 554845,
          deviceAddress:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        },
        {
          tid: 554845,
          deviceAddress:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        },
        {
          tid: 554845,
          deviceAddress:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        },
        {
          tid: 554845,
          deviceAddress:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        },
        {
          tid: 554845,
          deviceAddress:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        },
        {
          tid: 554845,
          deviceAddress:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        },
        {
          tid: 554845,
          deviceAddress:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        },
        {
          tid: 554845,
          deviceAddress:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        },
      ],
    };
  },
  methods: {
    emitToggleMerchantTransactionLevelDetails() {
      this.$emit("revertRowClick");
    },
  },
};
</script>

<style>
</style>
