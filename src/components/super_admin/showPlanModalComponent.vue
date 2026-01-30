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
    <div class="row items-center bottom-border q-py-sm">
      <div class="col">
        <div class="q-title text-weight-regular">Manage plan</div>
      </div>
      <div class="col" align="right">
        <q-btn outline round color="dark" size="sm" icon="clear" @click="emitModalClose"/>
      </div>
    </div>

    <q-card>
      <q-card-main class="q-pa-md">
        <div class="column group">
          <div>
            <q-input
              v-model="formData.planName"
              @blur="$v.formData.planName.$touch"
              :error="$v.formData.planName.$error"
              class="text-weight-regular text-grey-8"
              color="grey-9"
              float-label="Plan"
              placeholder="Plan"
            />
          </div>
          <div align="right">
            <q-btn
              align="right"
              v-if="makeUpdateElementActive"
              @click="fnFinalUpdate(formData)"
              color="purple-9"
            >Update</q-btn>
            <q-btn align="right" v-else @click="fnFinalCreate(formData)" color="purple-9">Save</q-btn>
          </div>
        </div>
      </q-card-main>
    </q-card>

    <div class="row">
      <div>
        <q-table
          :data="tableData"
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
                @click="fnFinalCreate()"
                flat
                class="text-light-blue"
              ></q-btn>
              <!-- <q-btn
                dense
                no-caps
                no-wrap
                label="Disable"
                icon="far fa-minus-square"
                size="md"
                @click="fnDisablePermission(props.row.id)"
                flat
                class="text-negative"
              ></q-btn>-->
            </div>
          </q-td>
          <template slot="top" slot-scope="props">
            <!--START: table filter,search-->
            <div class="col">
              <q-search
                clearable
                color="grey-9"
                v-model="filterSearch"
                placeholder="Type.."
                float-label="Search by name, short name"
                class="q-mr-lg"
              />-
            </div>
            <!--END: table filter,search -->
          </template>
        </q-table>
      </div>
    </div>
  </q-modal>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["propToggleModal"],
  // name: 'ComponentName',
  data() {
    return {
      toggleModal: this.propToggleModal,
      makeUpdateElementActive: false,
      formData: {
        planName: "",
        planCode: 1
      },

      /* START >>Table properties */
      filterSearch: "",
      paginationControl: {
        rowsPerPage: 5
      }
      /* END >>Table properties */

      /* START >>Table data */
      // columns: [
      //   {
      //     name: "plan",
      //     required: true,
      //     label: "Lead source",
      //     align: "left",
      //     field: "plan",
      //     sortable: true
      //   },
      //   {
      //     name: "device",
      //     required: true,
      //     label: "Device",
      //     align: "left",
      //     field: "device",
      //     sortable: true
      //   },
      //   {
      //     name: "merchant",
      //     required: true,
      //     label: "Merchant Type",
      //     align: "left",
      //     field: "merchant",
      //     sortable: true
      //   },
      //   {
      //     name: "action",
      //     required: true,
      //     label: "",
      //     align: "left",
      //     field: "action",
      //     sortable: true
      //   }
      // ],
      // tableData: [
      //   {
      //     plan: "AB",
      //     device: "mPOS",
      //     merchant: "Sandiwich Shop"
      //   },
      //   {
      //     plan: "IB",
      //     device: "mPOS",
      //     merchant: "Burger Shop"
      //   }
      // ]
      /* END >>Table data */
    };
  },

  validations: {
    formData: {
      planName: {
        required
      },
      planCode: {
        required
      }
    }
  },

  computed: {
    ...mapGetters("plan", ["getActivePlan"])
  },

  methods: {
    ...mapActions("plan", ["ADD_NEW_PLAN"]),
    ...mapActions("plan", ["PLAN_ACTIVE_LIST"]),
    getPlan() {
      this.PLAN_ACTIVE_LIST();
    },
    emitModalClose() {
      this.$emit("emitToggleModal");
    },

    /* START >> Function to toggle update button */
    fnToggleUpdateModal() {
      this.makeUpdateElementActive = !this.makeUpdateElementActive;
    },
    /* END >> Function to toggle update button */

    /* START >> Function to save, update or delete */
    fnFinalCreate() {
      this.ADD_NEW_PLAN(this.formData)
        .then(response => {
          this.$q.loading.hide();
          this.$q.notify({
            color: "positive",
            position: "bottom",
            message: "Device successfully added",
            icon: "thumb_up"
          });

          this.emitModalClose("emitToggleModal", "refresh");
          location.reload();
        })
        .getPlan.catch(error => {
          this.$q.loading.hide();
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message: error.data.message,
            icon: "thumb_down"
          });
        });
    },
    fnFinalUpdate() {},
    fnFinalDisable() {},
    /* END >> Function to save, update or delete */

    /* START >> Custom search */
    myCustomSearchFilter(rows, terms, cols, cellValue) {
      const lowerTerms = terms ? terms.toLowerCase() : "";
      return rows.filter(row =>
        cols.some(
          col =>
            (cellValue(col, row) + "").toLowerCase().indexOf(lowerTerms) !== -1
        )
      );
    },
    populatePlan() {
      this.PLAN_ACTIVE_LIST();
    }
    /* END >> Custom search */
  }
};
</script>

<style>
</style>
