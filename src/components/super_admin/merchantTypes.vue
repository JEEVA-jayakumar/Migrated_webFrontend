<template>
  <q-modal
    minimized
    position="right"
    v-model="toggleModal"
    no-backdrop-dismiss
    @escape-key="emitModalClose"
    class="customModalOverlay"
    :content-css="{padding:'60px 25px',minWidth:'40vw',minHeight:'100vh'}"
  >
    <div class="row items-center bottom-border q-py-sm">
      <div class="col">
        <div class="q-title text-weight-regular">Manage merchant types</div>
      </div>
      <div class="col" align="right">
        <q-btn outline round color="dark" size="sm" icon="clear" @click="emitModalClose"/>
      </div>
    </div>
    <q-tabs color="grey-9">
      <!-- Tabs - notice slot="title" -->
      <q-tab @select="fetchMerchantTypeList" default slot="title" label="Active List" name="tab-1"/>
      <q-tab
        @select="fetchMerchantTypeDeActivatedList"
        slot="title"
        label="De-Actived List"
        name="tab-2"
      />

      <!-- Targets -->
      <q-tab-pane name="tab-1">
        <q-table
          :data="merchantTypesList"
          table-class="customSATableClass"
          :columns="columns"
          :filter="filterSearch"
          :pagination.sync="paginationControl"
          :filter-method="myCustomSearchFilter"
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
                @click="fnShowEditMerchantTypes(props.row)"
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
                @click="fnDeleteMerchantType(props.row)"
                flat
                class="text-negative"
              ></q-btn>
            </div>
          </q-td>

          <template slot="top" slot-scope="props">
            <!--START: table filter,search -->
            <div class="col-8">
              <q-search
                clearable
                color="grey-9"
                v-model="filterSearch"
                placeholder="Type.."
                float-label="Search merchant type"
              />
            </div>
            <div class="col-4" align="right">
              <q-btn
                no-caps
                no-wrap
                label="Add New"
                class="text-weight-regular"
                color="purple-9"
                icon="far fa-plus-square"
                @click="fnshowCreateMerchantType()"
              />
            </div>
            <!--END: table filter,search -->
          </template>
        </q-table>
      </q-tab-pane>
      <q-tab-pane name="tab-2">
        <q-table
          :data="merchantTypesDeactivatedList"
          table-class="customSATableClass"
          :columns="columns"
          :filter="deActivatedSearch"
          :pagination.sync="paginationControl"
          :filter-method="myCustomSearchFilter"
          row-key="name"
          color="grey-9"
        >
          <q-td slot="body-cell-action" slot-scope="props" :props="props">
            <div class="row no-wrap no-padding">
              <q-btn
                dense
                no-caps
                no-wrap
                label="Enable"
                icon="far fa-check-square"
                size="md"
                @click="fnEnableMerchantType(props.row)"
                flat
                class="text-positive"
              />
            </div>
          </q-td>

          <template slot="top" slot-scope="props">
            <!--START: table filter,search -->
            <div class="col-8">
              <q-search
                clearable
                color="grey-9"
                v-model="deActivatedSearch"
                placeholder="Type.."
                float-label="Search merchant type"
              />
            </div>
            <!--END: table filter,search -->
          </template>
        </q-table>
      </q-tab-pane>
    </q-tabs>

    <!--START: Show create MerchantTypes -->
    <showCreateMerchantType
      v-if="propShowCreateMerchantTypes"
      :propShowCreateMerchantTypes="propShowCreateMerchantTypes"
      @emitfnshowMerchantTypes="fnshowCreateMerchantType"
    ></showCreateMerchantType>
    <!--END: Show create MerchantTypes -->
    <!--START: Show edit MerchantTypes -->
    <showEditMerchantType
      v-if="showEditMerchantTypes"
      :propShowEditMerchantTypes="showEditMerchantTypes"
      :propRowDetails="propRowDetails"
      @emitfnshowMerchantTypes="refreshMerchantTypeList"
    ></showEditMerchantType>
    <!--END: Show edit MerchantTypes -->
  </q-modal>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import showCreateMerchantType from "./createMerchantTypes.vue";
import showEditMerchantType from "./editMerchantTypes.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["propToggleModal", "propactiveMerchantTypes"],
  components: {
    showCreateMerchantType,
    showEditMerchantType
  },
  // name: 'ComponentName',
  data() {
    return {
      merchantTypesList: [],
      merchantTypesDeactivatedList: [],
      toggleModal: this.propToggleModal,
      merchantTypes: this.propactiveMerchantTypes,
      makeUpdateElementActive: false,
      formData: {
        device: ""
      },

      propShowCreateMerchantTypes: false,
      showEditMerchantTypes: false,
      propRowDetails: "",

      filter: "",
      filterSearch: "",
      deActivatedSearch: "",
      filter_values: "",
      multipleSelect: "",

      paginationControl: {
        rowsPerPage: 10
      },

      //table information
      columns: [
        {
          name: "merchantTypeName",
          required: true,
          label: "Merchant Type",
          align: "left",
          field: "merchantTypeName",
          sortable: true
        },
        {
          name: "action",
          required: true,
          label: "",
          align: "right",
          field: "",
          sortable: true
        }
      ],

      /* START >>Table properties */
      paginationControl: {
        rowsPerPage: 5
      }
      /* END >>Table properties */
    };
  },

  computed: {
    ...mapGetters("merchantTypes", [
      "getActiveMerchantTypes",
      "getDeActivatedMerchantTypes"
    ])
  },
  created() {
    this.fetchMerchantTypeList();
  },

  methods: {
    ...mapActions("merchantTypes", ["DELETE_MERCHANT_TYPE_AND_SET_ACTIVE"]),
    ...mapActions("merchantTypes", [
      "MERCHANT_TYPE_ACTIVE_LIST",
      "MERCHANT_TYPE_DEACTIVED_LIST",
      "UPDATE_MERCHANT_TYPE_AND_SET_ACTIVE",
      "UPDATE_MERCHANT_TYPE"
    ]),
    emitModalClose() {
      this.$emit("emitToggleModal");
    },
    fetchMerchantTypeList() {
      this.merchantTypesList = [];
      this.MERCHANT_TYPE_ACTIVE_LIST().then(() => {
        this.merchantTypesList = this.getActiveMerchantTypes;
      });
    },
    fetchMerchantTypeDeActivatedList() {
      this.merchantTypesDeactivatedList = [];
      this.MERCHANT_TYPE_DEACTIVED_LIST().then(() => {
        this.merchantTypesDeactivatedList = this.getDeActivatedMerchantTypes;
      });
    },
    fnshowCreateMerchantType(token) {
      this.propShowCreateMerchantTypes = !this.propShowCreateMerchantTypes;
      if (token == "refresh") {
        this.fetchMerchantTypeList();
      }
    },

    fnShowEditMerchantTypes(rowDetails) {
      this.showEditMerchantTypes = !this.showEditMerchantTypes;
      this.propRowDetails = rowDetails;
    },

    refreshMerchantTypeList() {
      this.showEditMerchantTypes = !this.showEditMerchantTypes;
      this.fetchMerchantTypeList();
    },

    fnDeleteMerchantType(rowDetails) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Are you sure want to delete merchant type?",
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
          this.DELETE_MERCHANT_TYPE_AND_SET_ACTIVE(rowDetails.id)
            .then(response => {
              this.fetchMerchantTypeList();
              this.$q.notify({
                color: "negative",
                position: "bottom",
                message: `Merchant type: ${
                  rowDetails.merchantTypeName
                } has been deactivated`,
                icon: "thumb_up"
              });
            })
            .catch(error => {
              this.$q.notify({
                color: "warning",
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
    fnEnableMerchantType(rowDetails) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Are you sure want to enable merchant type?",
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
          this.UPDATE_MERCHANT_TYPE_AND_SET_ACTIVE(rowDetails)
            .then(response => {
              this.fetchMerchantTypeDeActivatedList();
              this.$q.notify({
                color: "positive",
                position: "bottom",
                message: `Merchant type:${
                  rowDetails.merchantTypeName
                } has been activated`,
                icon: "thumb_up"
              });
            })
            .catch(error => {
              this.$q.notify({
                color: "warning",
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
