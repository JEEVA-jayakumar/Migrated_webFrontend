<template>
  <q-modal
    minimized
    position="right"
    v-model="toggleModal"
    no-backdrop-dismiss
    @escape-key="emitModalClose"
    class="customModalOverlay"
    :content-css="{padding:'60px 25px',minWidth:'50vw',minHeight:'100vh'}"
  >
    <div class="row items-center bottom-border q-py-sm">
      <div class="col-8">
        <div class="row group">
          <div class="col-12">
            <div class="q-title text-weight-regular">Manage merchant document types</div>
          </div>
          <div class="col-12">
            <q-select
              color="grey-9"
              placeholder="Merchant type"
              :options="activeMerchantType"
              v-model="formData.merchantType"
              float-label="Select merchant type"
              @input="currentListTabulation == 'tab-1'?fetchMerchantDocumentTypeActivatedList():fetchMerchantDocumentTypeDeActivatedList()"
              @blur="$v.formData.merchantType.$touch"
              :error="$v.formData.merchantType.$error"
            />
          </div>
        </div>
      </div>
      <div class="col" align="right">
        <q-btn outline round color="dark" size="sm" icon="clear" @click="emitModalClose"/>
      </div>
    </div>
    <q-tabs color="grey-9" v-model="currentListTabulation">
      <!-- Tabs - notice slot="title" -->
      <q-tab
        @select="fetchMerchantDocumentTypeActivatedList"
        default
        slot="title"
        label="Active List"
        name="tab-1"
      />
      <q-tab
        @select="fetchMerchantDocumentTypeDeActivatedList"
        slot="title"
        label="De-Actived List"
        name="tab-2"
      />

      <!-- Targets -->
      <q-tab-pane name="tab-1">
        <q-table
          :data="merchantDocumentTypesList"
          table-class="customSATableClass"
          :columns="merchantActiveDocumentcolumns"
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
                @click="fnShowEditMerchantDocumentTypes(props.row)"
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
                @click="fnDeleteMerchantDocumentType(props.row)"
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
                @click="fnshowCreateMerchantDocumentType()"
              />
            </div>
            <!--END: table filter,search -->
          </template>
        </q-table>
      </q-tab-pane>
      <q-tab-pane name="tab-2">
        <q-table
          :data="merchantDocumentTypesDeactivatedList"
          table-class="customSATableClass"
          :columns="merchantDeactiveDocumentcolumns"
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
                @click="fnEnableMerchantDocumentType(props.row)"
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

    <!--START: Show create MerchantDocumentTypes -->
    <showCreateMerchantDocumentType
      v-if="propShowCreateMerchantDocumentTypes"
      :propShowCreateMerchantDocumentTypes="propShowCreateMerchantDocumentTypes"
      :propActiveMerchantTypes="activeMerchantType"
      @emitfnshowMerchantDocumentTypes="fnshowCreateMerchantDocumentType"
    ></showCreateMerchantDocumentType>
    <!--END: Show create MerchantDocumentTypes -->
    <!--START: Show edit MerchantDocumentTypes -->
    <showEditMerchantDocumentType
      v-if="showEditMerchantDocumentTypes"
      :propShowEditMerchantDocumentTypes="showEditMerchantDocumentTypes"
      :propActiveMerchantTypes="activeMerchantType"
      :propCurrentMerchantType="formData.merchantType"
      :propRowDetails="propRowDetails"
      @emitfnshowMerchantDocumentTypes="refreshMerchantDocumentTypeList"
    ></showEditMerchantDocumentType>
    <!--END: Show edit MerchantDocumentTypes -->
  </q-modal>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import showCreateMerchantDocumentType from "./createMerchantDocumentType.vue";
import showEditMerchantDocumentType from "./editMerchantDocumentType.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  props: [
    "propToggleModal",
    "propactiveMerchantDocumentTypes",
    "propMerchantType"
  ],
  components: {
    showCreateMerchantDocumentType,
    showEditMerchantDocumentType
  },
  // name: 'ComponentName',
  data() {
    return {
      currentListTabulation: "tab-1",
      activeMerchantType: [],

      toggleModal: this.propToggleModal,
      merchantDocumentTypes: this.propactiveMerchantDocumentTypes,
      makeUpdateElementActive: false,

      propShowCreateMerchantDocumentTypes: false,
      showEditMerchantDocumentTypes: false,
      propRowDetails: "",
      formData: {
        merchantType: this.propMerchantType
      },
      filterSearch: "",
      deActivatedSearch: "",
      paginationControl: {
        rowsPerPage: 10
      },

      //table information
      merchantActiveDocumentcolumns: [
        {
          name: "documentType",
          required: true,
          label: "Merchant Document Type",
          align: "left",
          field: "documentType",
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
      merchantDeactiveDocumentcolumns: [
        {
          name: "documentType",
          required: true,
          label: "Merchant Document Type",
          align: "left",
          field: "documentType",
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
      merchantDocumentTypesList: [],
      merchantDocumentTypesDeactivatedList: [],

      /* START >>Table properties */
      paginationControl: {
        rowsPerPage: 5
      }
      /* END >>Table properties */
    };
  },
  validations: {
    formData: {
      merchantType: {
        required
      }
    }
  },
  computed: {
    ...mapGetters("merchantTypes", ["getActiveMerchantTypes"]),
    ...mapGetters("merchantDocumentTypes", [
      "getActiveMerchantDocumentTypes",
      "getDeActivatedMerchantDocumentTypes"
    ])
  },
  created() {
    this.fetchMerchantDocumentTypeList();
  },

  methods: {
    ...mapActions("merchantTypes", ["MERCHANT_TYPE_ACTIVE_LIST"]),
    ...mapActions("merchantDocumentTypes", [
      "MERCHANT_DOCUMENT_TYPE_ACTIVE_LIST",
      "MERCHANT_DOCUMENT_TYPE_DEACTIVED_LIST",
      "UPDATE_MERCHANT_DOCUMENT_TYPE_AND_SET_ACTIVE",
      "DELETE_MERCHANT_DOCUMENT_TYPE_AND_SET_ACTIVE"
    ]),
    emitModalClose() {
      this.$emit("emitToggleModal");
    },
    fetchMerchantDocumentTypeList() {
      this.MERCHANT_TYPE_ACTIVE_LIST()
        .then(() => {
          return _.map(this.getActiveMerchantTypes, item => {
            this.activeMerchantType.push({
              value: item.id,
              label: item.merchantTypeName
            });
          });
        })
        .then(() => {
          this.fetchMerchantDocumentTypeActivatedList();
        });
    },
    fetchMerchantDocumentTypeActivatedList() {
      this.$v.formData.$touch();
      if (this.$v.formData.$error) {
      } else {
        this.$q.loading.show({
          delay: 100, // ms
          message: "Please Wait",
          spinnerColor: "purple-9",
          customClass: "shadow-none"
        });
        this.merchantDocumentTypesList = [];
        return this.MERCHANT_DOCUMENT_TYPE_ACTIVE_LIST({
          merchantTypeId: this.formData.merchantType,
          parentId: 0 //for primary document
        }).then(() => {
          this.merchantDocumentTypesList = _.uniqBy(
            this.getActiveMerchantDocumentTypes,
            "documentType"
          );
          this.$q.loading.hide();
        });
      }
    },

    fetchMerchantDocumentTypeDeActivatedList() {
      this.$v.formData.$touch();
      if (this.$v.formData.$error) {
      } else {
        this.$q.loading.show({
          delay: 100, // ms
          message: "Please Wait",
          spinnerColor: "purple-9",
          customClass: "shadow-none"
        });
        this.merchantDocumentTypesDeactivatedList = [];
        this.MERCHANT_DOCUMENT_TYPE_DEACTIVED_LIST({
          merchantTypeId: this.formData.merchantType,
          parentId: 0 //for primary document
        }).then(() => {
          this.merchantDocumentTypesDeactivatedList = this.getDeActivatedMerchantDocumentTypes;
          this.$q.loading.hide();
        });
      }
    },
    fnshowCreateMerchantDocumentType(token) {
      this.propShowCreateMerchantDocumentTypes = !this
        .propShowCreateMerchantDocumentTypes;
      if (token == "refresh") {
        this.fetchMerchantDocumentTypeActivatedList();
      }
    },

    fnShowEditMerchantDocumentTypes(rowDetails) {
      this.showEditMerchantDocumentTypes = !this.showEditMerchantDocumentTypes;
      this.propRowDetails = rowDetails;
    },

    refreshMerchantDocumentTypeList() {
      this.showEditMerchantDocumentTypes = !this.showEditMerchantDocumentTypes;
      this.fetchMerchantDocumentTypeActivatedList();
    },

    fnDeleteMerchantDocumentType(rowDetails) {
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
          this.DELETE_MERCHANT_DOCUMENT_TYPE_AND_SET_ACTIVE(rowDetails.id)
            .then(response => {
              this.fetchMerchantDocumentTypeActivatedList();
              this.$q.notify({
                color: "negative",
                position: "bottom",
                message: `Merchant type: ${
                  rowDetails.documentType
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
    fnEnableMerchantDocumentType(rowDetails) {
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
          console.log("rowDetails", rowDetails);
          this.UPDATE_MERCHANT_DOCUMENT_TYPE_AND_SET_ACTIVE({
            merchantType: this.formData.merchantType,
            hasSubDoc: rowDetails.viewType ? false : true,
            id: rowDetails.id,
            params: rowDetails,
            parentId: rowDetails.parentID
          })
            .then(response => {
              this.fetchMerchantDocumentTypeDeActivatedList();
              this.$q.notify({
                color: "positive",
                position: "bottom",
                message: `Merchant type:${
                  rowDetails.merchantDocumentTypeName
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
