<template>
  <q-page>
    <div class="row">
      <div class="col-12 text-h6 q-pa-md text-weight-regular bottom-border">Manage Document Types</div>
      <!-- START >> Setup MDR details -->
      <div class="col-md-12 col-sm-12 col-xs-12 q-pa-sm group">
        <div class="row gutter-x-xs">
          <div class="col-3">
            <q-select
              color="grey-9"
              v-model="formData.merchantType"
              :options="activeMerchantType"
              float-label="Select merchant type"
              placeholder="Merchant type"
              :error="$v.formData.merchantType.$error"
              @input="merchantDocumentTypeActiveList"
            />
          </div>
          <div class="col-auto">
            <q-btn
              round
              dense
              no-caps
              size="md"
              @click="fnManagemerchantTypes"
              color="purple-9"
              icon="add"
              class="no-margin"
            />
          </div>
          <div class="col-3">
            <q-select
              color="grey-9"
              v-model="formData.parentIDtemp"
              :options="activeDocumentMerchantType"
              @input="mapParentIdToSubDocument"
              float-label="Merchant Document Type"
              placeholder="Merchant Document Type"
            />
          </div>
          <div class="col-auto">
            <q-btn
              round
              dense
              no-caps
              size="md"
              @click="fnManagemerchanDocumentTypes"
              color="purple-9"
              icon="add"
              class="no-margin"
            />
          </div>
          <div class="col-3">
            <q-input
              color="grey-9"
              v-model="formData.subDocumentType"
              :error="$v.formData.subDocumentType.$error"
              float-label="Merchant Sub Document Type"
              placeholder="Merchant Sub Document Type"
            />
          </div>
          <div class="col-auto">
            <q-input
              type="number"
              color="grey-9"
              v-model="formData.marsDocumentId"
              float-label="Mars document Id"
              placeholder="Mars document Id"
            />
          </div>
        </div>
        <div class="row gutter-x-xs">
          <div class="col-3">
            <q-btn
              label="Submit"
              color="purple-9"
              @click="submitMerchantSubDocumentType(formData)"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <!-- START >> Setup fee and recurring fee -->
      <!-- START >> Table >> rental charge details -->
      <div class="col-md-12 col-sm-12 col-xs-12">
        <q-tabs color="grey-9">
          <!-- Tabs - notice slot="title" -->
          <q-tab
            @select="fetchActiveMerchantTypes"
            default
            slot="title"
            label="Active List"
            name="tab-1"
          />
          <q-tab
            @select="fetchDeActiveMerchantTypes"
            slot="title"
            label="De-Actived List"
            name="tab-2"
          />
          <q-tab-panel name="tab-1">
            <q-table
              table-class="customTableClass"
              :rows="activatedTableData"
              :columns="activatedColumns"
              :filter="filterSearch"
              :pagination="pagination"
              row-key="name"
              color="grey-9"
            >
              <q-td v-slot:body-cell-action="props" :props="props">
                <div class="row no-wrap no-padding">
                  <q-btn
                    dense
                    no-caps
                    no-wrap
                    label="Modify"
                    icon="far fa-plus-square"
                    size="md"
                    @click="editMerchantSubDocumentType(props.row)"
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
                    @click="fnDeleteDocumentType(props.row)"
                    flat
                    class="text-negative"
                  ></q-btn>
                </div>
              </q-td>
              <template v-slot:top="props" class="bottom-border">
                <!--START: table filter,search -->
                <div class="col-md-5">
                  <q-input
                    clearable
                    color="grey-9"
                    v-model="filterSearch"
                    placeholder="Type.."
                    float-label="Search by merchant type, document type, sub document type"
                    class="q-mr-lg q-py-sm"
                  />
                </div>
                <!--ENDv-model: table filter,search -->
              </template>
            </q-table>
          </q-tab-panel>
          <q-tab-panel name="tab-2">
            <q-table
              table-class="customTableClass"
              :rows="deActivatedTableData"
              :columns="deActivatedColumns"
              :filter="filterSearch"
              :pagination="pagination"
              row-key="name"
              color="grey-9"
            >
              <q-td v-slot:body-cell-action="props" :props="props">
                <div class="row no-wrap no-padding">
                  <q-btn
                    dense
                    no-caps
                    no-wrap
                    label="Modify"
                    icon="far fa-plus-square"
                    size="md"
                    @click="leadSourceEdit(props.row)"
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
                    @click="leadSourceDisable(props.row.id)"
                    flat
                    class="text-negative"
                  ></q-btn>
                </div>
              </q-td>
              <template v-slot:top="props" class="bottom-border">
                <!--START: table filter,search -->
                <div class="col-md-5">
                  <q-input
                    clearable
                    color="grey-9"
                    v-model="filterSearch"
                    placeholder="Type.."
                    float-label="Search by merchant type, document type, sub document type"
                    class="q-mr-lg q-py-sm"
                  />
                </div>
                <!--END: table filter,search -->
              </template>
            </q-table>
          </q-tab-panel>
        </q-tabs>
      </div>
      <!-- END >> Table >> MDR details -->
      <!--START: Show lead source -->
      <merchantTypes
        v-if="toggleMerchantTypes"
        :propToggleModal="toggleMerchantTypes"
        @emitToggleModal="fnManagemerchantTypes"
      ></merchantTypes>
      <merchanDocumentTypes
        v-if="toggleMerchantdocumentTypes"
        :propToggleModal="toggleMerchantdocumentTypes"
        :propMerchantType="formData.merchantType"
        @emitToggleModal="fnManagemerchanDocumentTypes"
      ></merchanDocumentTypes>
      <!--END: Show lead source -->
      <!--START: Show create MerchantSubDocumentTypes -->
      <showEditMerchantSubDocumentType
        v-if="toggleMerchantSubdocumentTypes"
        :propToggleMerchantSubdocumentTypes="toggleMerchantSubdocumentTypes"
        :propActiveMerchantTypes="activeMerchantType"
        :propActiveDocumentMerchantType="activeDocumentMerchantType"
        :propRowDetails="propRowDetails"
        @emitfnshowMerchantSubDocumentTypes="editMerchantSubDocumentType"
      ></showEditMerchantSubDocumentType>
      <!--END: Show create MerchantSubDocumentTypes -->
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { required } from "@vuelidate/validators";
/* START >> Modal components Merchant Document Type, device, merchant type */
import merchantTypes from "../../components/super_admin/merchantTypes.vue";
import merchanDocumentTypes from "../../components/super_admin/merchanDocumentTypes.vue";

import showEditMerchantSubDocumentType from "../../components/super_admin/editMerchantSubDocumentType.vue";
/* END >> Modal components Merchant Document Type, device, plan */
export default {
  name: "deviceTypes",
  components: {
    /* START >> Modal components Merchant Document Type, device, plan */
    merchantTypes,
    merchanDocumentTypes,
    showEditMerchantSubDocumentType
    /* END >> Modal components Merchant Document Type, device, plan */
  },
  data() {
    return {
      activeMerchantType: [],
      activeDocumentMerchantType: [],
      toggleMerchantSubdocumentTypes: false,
      propRowDetails: "",

      activeMerchantDocumentTypeList: [],
      deActiveMerchantDocumentTypeList: [],

      formData: {
        merchantType: null,
        subDocumentType: null,
        parentIDtemp: null,
        viewType: 0,
        marsDocumentId: 0,
        required: true,
        params: {
          parentId: null
        }
      },
      /* START >> Modal props */
      activeFilterSearch: "",
      deActivatedFilterSearch: "",
      toggleMerchantTypes: false,
      toggleMerchantdocumentTypes: false,
      /* END >> Modal props */

      /* START >> Rental charges */
      merchantDocumentType: "",
      plan: "",
      /* END >>Table properties */

      /* START >>Table properties */
      filterSearch: "",
      /* END >>Table properties */

      /* START >>Table data */
      activatedColumns: [
        {
          name: "merchantTypeName",
          required: true,
          label: "Merchant Type",
          align: "left",
          field: "merchantTypeName",
          sortable: false
        },
        {
          name: "documentType",
          required: true,
          label: "Document Type",
          align: "left",
          field: "documentType",
          sortable: false
        },
        {
          name: "subDocumentType",
          required: true,
          label: "Sub Document Type",
          align: "left",
          field: row => {
            return row.subDocumentType || "NA";
          },
          sortable: false
        },
        {
          name: "marsDocumentId",
          required: true,
          label: "Mars Document Id",
          align: "left",
          field: "marsDocumentId",
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
      pagination: {
        sortBy: null, // String, column "name" property value
        descending: false,
        page: 1,
        rowsPerPage: 10 // current rows per page being displayed
      },
      activatedTableData: [],
      deActivatedColumns: [
        {
          name: "sourceName",
          required: true,
          label: "Merchant Document Type",
          align: "left",
          field: "sourceName",
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
      deActivatedTableData: []
      /* END >>Table data */
    };
  },
  validations: {
    formData: {
        merchantType: {required},
        subDocumentType: {required}
    }
  },

  created() {
    /* START: Load user table data filter > DeviceTypes */
    this.fetchActiveMerchantTypesOptions();
    /* End: Load user table data filter > DeviceTypes */
  },

  computed: {
    ...mapGetters("merchantTypes", [
      "getActiveMerchantTypes",
      "getDeActivatedMerchantTypes"
    ]),
    ...mapGetters("merchantDocumentTypes", [
      "getActiveMerchantDocumentTypes",
      "getDeActivatedMerchantDocumentTypes"
    ])
  },

  methods: {
    ...mapActions("merchantTypes", [
      "MERCHANT_TYPE_ACTIVE_LIST",
      "MERCHANT_TYPE_DEACTIVED_LIST"
    ]),
    ...mapActions("merchantDocumentTypes", [
      "MERCHANT_DOCUMENT_TYPE_ACTIVE_LIST",
      "MERCHANT_DOCUMENT_TYPE_DEACTIVED_LIST",
      "ADD_NEW_MERCHANT_DOCUMENT_TYPE",
      "UPDATE_MERCHANT_DOCUMENT_TYPE",
      "UPDATE_MERCHANT_DOCUMENT_TYPE_AND_SET_ACTIVE",
      "DELETE_MERCHANT_DOCUMENT_TYPE_AND_SET_ACTIVE"
    ]),

    fnDeleteDocumentType(rowDetails) {
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

    fetchActiveMerchantTypesOptions(value) {
      let self = this;
      this.activeMerchantType = [];
      if (value == undefined) {
        this.MERCHANT_TYPE_ACTIVE_LIST().then(() => {
          return _.map(this.getActiveMerchantTypes, item => {
            self.activeMerchantType.push({
              value: item.id,
              label: item.merchantTypeName
            });
          });
        });
      }
    },
    fetchActiveMerchantTypes(value) {
      let self = this;
      this.activatedTableData = [];
      this.MERCHANT_TYPE_ACTIVE_LIST(value).then(() => {
        return _.map(this.getActiveMerchantTypes, item => {
          _.map(item.merchantDocumentType, subItem => {
            subItem.merchantTypeName = item.merchantTypeName;
            subItem.merchantTypeId = item.id;
            // if(subItem.documentType != subItem.subDocumentType)
              self.activatedTableData.push(subItem);
                
              console.log("Sub item--------------->"+JSON.stringify(subItem))
              console.log("documentType--------------->"+JSON.stringify(subItem.documentType))
              console.log("subDocumentType--------------->"+JSON.stringify(subItem.subDocumentType))
          });
        });
      });
      
    },
    fetchDeActiveMerchantTypes(value) {
      let self = this;
      this.deActivatedTableData = [];
      this.MERCHANT_TYPE_DEACTIVED_LIST().then(() => {
        return _.map(this.getDeActivatedMerchantTypes, item => {
          _.map(item.merchantDocumentType, subItem => {
            subItem.merchantTypeName = item.merchantTypeName;
            self.deActivatedTableData.push(subItem);
          });
        });
      });
    },
    submitMerchantSubDocumentType(formData) {
      
      this.$v.formData.$touch();
      if (this.$v.formData.$error) {
      } else {
      formData.hasSubDoc = this.formData.viewType ;
      delete formData.parentIDtemp;
      let requestParams = {
        url: {
          id: formData.id,
          merchantType: formData.merchantType,
          hasSubDoc: formData.hasSubDoc
        },
        params: {
          documentType: formData.documentType,
          subDocumentType: formData.subDocumentType || "",
          parentID: formData.subDocumentType == "" ? 0 : formData.id,
          viewType: 0,
          marsDocumentId: formData.marsDocumentId,
          required: true
        }
      };
      this.$q.loading.show({
        delay: 100, // ms
        message: "Please Wait",
        spinnerColor: "purple-9",
        customClass: "shadow-none"
      });
      this.ADD_NEW_MERCHANT_DOCUMENT_TYPE(requestParams)
        .then(() => {
          this.formData.marsDocumentId = null;
          this.formData.subDocumentType = null;
          this.$q.loading.hide();
          this.$q.notify({
            color: "positive",
            position: "bottom",
            message: "Merchant sub document type successfully updated!",
            icon: "thumb_up"
          });
        })
        .catch(() => {
          this.$q.loading.hide();
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message: error.body.message == null ? "Please Try Again Later !" : error.body.message,
            icon: "thumb_down"
          });
        });
      }
    },
    
    /* START >> Manage merchant, mercahtn document type */
    fnManagemerchantTypes() {
      this.toggleMerchantTypes = !this.toggleMerchantTypes;
    },
    fnManagemerchanDocumentTypes() {
      this.toggleMerchantdocumentTypes = !this.toggleMerchantdocumentTypes;
    },
    editMerchantSubDocumentType(itemDetails) {
      this.toggleMerchantSubdocumentTypes = !this
        .toggleMerchantSubdocumentTypes;
      if (itemDetails != undefined) {
        this.propRowDetails = itemDetails;
      } else {
        this.fetchActiveMerchantTypes();
      }
    },
    /* END >> Manage merchant, mercahtn document type */

    /* START >> Manage MDR charges */
    /* START >> Function to save, update or delete */
    merchantDocumentTypeActiveList() {
      this.MERCHANT_DOCUMENT_TYPE_ACTIVE_LIST({
        merchantTypeId: this.formData.merchantType,
        parentId: 0 //for primary document
      })
        .then(() => {
          this.activeDocumentMerchantType = [];
          return _.map(this.getActiveMerchantDocumentTypes, value => {
            this.activeDocumentMerchantType.push({
              label: value.documentType,
              value: value
            });
          });
        })
        .then(() => {
          this.fetchActiveMerchantTypes(this.formData.merchantType);
        });
    },
    mapParentIdToSubDocument(value) {
      this.formData.params.parentId = value.parentID;
      this.formData.id = value.id;
      this.formData.documentType = value.documentType;
    }
    /* END >> Function to save, update or delete */
    /* END >> Manage MDR charges */
  }
};
</script>

<style>
</style>
