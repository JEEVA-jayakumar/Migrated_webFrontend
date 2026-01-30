<template>
  <q-modal
    minimized
    position="right"
    v-model="toggleModal"
    no-backdrop-dismiss
    @escape-key="emitModalClose"
    class="customModalOverlay"
    :content-css="{padding:'75px 25px',minWidth:'40vw',minHeight:'100vh'}"
  >
    <div class="row items-center bottom-border q-py-sm fit">
      <div class="col">
        <div class="q-title text-weight-regular">Manage merchant type</div>
      </div>
      <div class="col" align="right">
        <q-btn outline round color="dark" size="sm" icon="clear" @click="emitModalClose"/>
      </div>
    </div>
    <q-tabs color="grey-9">
      <!-- Tabs - notice slot="title" -->
      <q-tab
        @select="merchantTypeActiveList"
        default
        slot="title"
        label="Active List"
        name="tab-1"
      />
      <q-tab @select="merchantTypeDeActiveList" slot="title" label="De-Actived List" name="tab-2"/>
      <q-tab-pane name="tab-1">
        <q-table
          :data="activeMerchantTypeList"
          table-class="customSATableClass"
          :columns="activatedColumns"
          :filter="activeFilterSearch"
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
                @click="fnToggleUpdateModal(props.row)"
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
                @click="fnDisablePermission(props.row.id)"
                flat
                class="text-negative"
              ></q-btn>
            </div>
          </q-td>
          <template slot="top" slot-scope="props">
            <!--START: table filter,search -->
            <div class="col">
              <q-search
                clearable
                color="grey-9"
                v-model="activeFilterSearch"
                placeholder="Type.."
                float-label="Search by name, short name"
                class="q-mr-lg"
              />
            </div>
            <!--END: table filter,search -->
          </template>
        </q-table>
      </q-tab-pane>
      <q-tab-pane name="tab-2">
        <q-table
          :data="deActiveMerchantTypeList"
          table-class="customSATableClass"
          :columns="deActivatedColumns"
          :filter="deActivatedFilterSearch"
          :pagination.sync="paginationControl"
          row-key="id"
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
              ></q-btn>
            </div>
          </q-td>
          <template slot="top" slot-scope="props">
            <!--START: table filter,search -->
            <div class="col">
              <q-search
                clearable
                color="grey-9"
                v-model="deActivatedFilterSearch"
                placeholder="Type.."
                float-label="Search by name"
                class="q-mr-lg"
              />
            </div>
            <!--END: table filter,search -->
          </template>
        </q-table>
      </q-tab-pane>
    </q-tabs>
    <!--START: Show create MerchantTypes -->
    <showCreateMerchantType
      v-if="propShowCreateMerchantType"
      :propShowCreateMerchantType="propShowCreateMerchantType"
      @emitfnshowMerchantTypes="MerchantTypeCreate"
    ></showCreateMerchantType>
    <!--END: Show create MerchantTypes -->
    <!--START: Show edit MerchantTypes -->
    <showEditMerchantType
      v-if="propShowEditMerchantType"
      :propShowEditMerchantTypes="propShowEditMerchantType"
      :propRowDetails="propRowDetails"
      @emitfnshowMerchantTypes="refreshMerchantTypeList"
    ></showEditMerchantType>
    <!--END: Show edit MerchantTypes -->
  </q-modal>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { required } from "vuelidate/lib/validators";
import showCreateMerchantType from "./createMerchantType.vue";
import showEditMerchantType from "./editMerchantType.vue";
export default {
  props: ["propToggleModal"],
  // name: 'ComponentName',
  components: {
    showCreateMerchantType,
    showEditMerchantType
  },
  data() {
    return {
      toggleModal: this.propToggleModal,
      makeUpdateElementActive: false,

      propShowCreateMerchantType: false,
      propShowEditMerchantType: false,
      propRowDetails: "",

      activeMerchantTypeList: [],
      deActiveMerchantTypeList: [],

      formData: {
        merchant: ""
      },

      /* START >>Table properties */
      activeFilterSearch: "",
      deActivatedFilterSearch: "",
      paginationControl: {
        rowsPerPage: 5
      },
      /* END >>Table properties */

      /* START >>Table data */
      activatedColumns: [
        {
          name: "merchantTypeName",
          required: true,
          label: "Merchant type",
          align: "left",
          field: "merchantTypeName",
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
      deActivatedColumns: [
        {
          name: "merchantTypeName",
          required: true,
          label: "Merchant type",
          align: "left",
          field: "merchantTypeName",
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
      ]
      /* END >>Table data */
    };
  },
  created() {
    this.merchantTypeActiveList();
  },
  computed: {
    ...mapGetters("merchantTypes", [
      "getActiveMerchantTypes",
      "getDeActivatedMerchantTypes"
    ])
  },

  methods: {
    emitModalClose() {
      this.$emit("emitToggleModal");
    },
    ...mapActions("merchantTypes", [
      "MERCHANT_TYPE_ACTIVE_LIST",
      "MERCHANT_TYPE_DEACTIVED_LIST",
      "UPDATE_MERCHANT_TYPE_AND_SET_ACTIVE",
      "DELETE_MERCHANT_TYPE_AND_SET_ACTIVE"
    ]),
    /* START >> Function to save, update or delete */
    merchantTypeActiveList() {
      this.MERCHANT_TYPE_ACTIVE_LIST().then(() => {
        this.activeMerchantTypeList = this.getActiveMerchantType;
      });
    },
    merchantTypeDeActiveList() {
      this.MERCHANT_TYPE_DEACTIVED_LIST().then(() => {
        this.deActiveMerchantTypeList = this.getDeActivatedMerchantType;
      });
    },
    merchantTypeCreate(token) {
      this.propShowCreateMerchantType = !this.propShowCreateMerchantType;
      if (token == "refresh") {
        this.merchantTypeActiveList();
      }
    },

    merchantTypeEdit(rowDetails) {
      this.propShowEditMerchantType = !this.propShowEditMerchantType;
      this.propRowDetails = rowDetails;
    },

    refreshMerchantTypeList() {
      this.propShowEditMerchantType = !this.propShowEditMerchantType;
      this.merchantTypeActiveList();
    },
    merchantTypeDisable(rowDetails) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Are you sure want to disable Merchant type?",
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
          this.DELETE_MERCHANT_TYPE_AND_SET_ACTIVE(rowDetails)
            .then(response => {
              this.merchantTypeActiveList();
              this.$q.notify({
                color: "negative",
                position: "bottom",
                message: "Merchant type deactivated",
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
          message: "Are you sure want to disable Merchant type?",
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
              this.merchantTypeDeActiveList();
              this.$q.notify({
                color: "positive",
                position: "bottom",
                message: `Merchant type: ${
                  rowDetails.merchantTypeName
                } has been enabled`,
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
    }
    /* END >> Function to save, update or delete */
  }
};
</script>

<style>
</style>
