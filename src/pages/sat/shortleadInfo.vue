 <template>
  <q-page>
    <div>
      <!-- <q-pull-to-refresh :distance="30" :handler="PullToRefresh" inline> -->
      <q-table
        class="my-sticky-header-table"
        title="Short Lead Information"
        :rows="getShortLead"
        :columns="columns"
        row-key="name"
      >
        <q-td v-slot:body-cell-action="props" :props="props">
          <div class="row no-wrap no-padding">
            <q-btn
              dense
              no-caps
              no-wrap
              label="Convert Wip Lead"
              icon="far fa-plus-square"
              size="md"
              @click="fnShowEditShortLead(props.row)"
              flat
              class="text-light-blue"
            ></q-btn>
            <!-- <q-btn  dense no-caps no-wrap label="Disable" icon="far fa-minus-square" size="md" @click="fnDisablePermission(props.row.id)" flat class="text-negative">
            </q-btn>-->
          </div>
        </q-td>
        <q-td v-slot:body-cell-update="props" :props="props">
          <div class="row no-wrap no-padding">
            <q-btn
              dense
              no-caps
              no-wrap
              label="update"
              icon="far fa-plus-square"
              size="md"
              @click="fnShowConvertToSat(props.row)"
              flat
              class="text-light-blue"
            ></q-btn>
            <!-- <q-btn  dense no-caps no-wrap label="Disable" icon="far fa-minus-square" size="md" @click="fnDisablePermission(props.row.id)" flat class="text-negative">
            </q-btn>-->
          </div>
        </q-td>
        <!-- <q-td v-slot:body-cell-status="props" :props="props">
            <span class="label text-negative" v-if="props.row.status == $TRANSACTION_STATUS">Pending</span>
            <span class="label text-positive" v-else-if="props.row.status">Success</span>
            <span class="label text-amber" v-else>NA</span>
        </q-td>-->
      </q-table>
    </div>
  </q-page>
</template>

<script>
import editShortLead from "../../components/sat/editShortLead.vue";
import convertToSat from "../../components/sat/convertToSat.vue";
import {
  required,
  requiredIf,
  branch_code,
  minLength,
  maxLength,
  alpha,
  alphaNum,
  numeric
} from "@vuelidate/validators";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "inventoryAllocation",
  components: {
    editShortLead,
    convertToSat
  },
  data() {
    return {
      propShowEditShortLead: false,
      propShowConvertToSat: false,
      propRowDetails: "",
      shortlead: "shortlead",
      propShowCreateUploadFile: false,
      leadSourceOptions: [],
      dropDown: {
        leadSourceOptions: []
      },
      selectBankEnableOptions: [
        {
          label: "Yes",
          value: "True"
        },
        {
          label: "No",
          value: "False"
        }
      ],
      formData: {
        leadName: "",
        contactName: "",
        contactNumber: "",
        alternateContactNumber: "",
        email: "",
        leadAddress: "",
        pincode: "",
        state: "",
        city: "",
        leadSource: "",
        device: "",
        deviceCount: ""
      },
      columns: [
        {
          name: "contactNumber",
          label: "contactNumber",
          field: "contactNumber",
          align: "center",
          sortable: true
        },
        {
          name: "id",
          label: "id",
          field: "id",
          align: "center",
          sortable: true
        },
        {
          name: "shortleadDate",
          label: "shortleadDate",
          field: "shortleadDate",
          align: "center",
          sortable: true
        },

        {
          name: "leadName",
          label: "leadName",
          field: "leadName",
          align: "center",
          sortable: true
        },
        {
          name: "leadNumber",
          label: "leadNumber",
          field: "leadNumber",
          align: "center",
          sortable: true
        },
        {
          name: "action",
          required: true,
          label: "Convert Wip Lead",
          align: "left",
          field: "action",
          sortable: false
        },
        {
          name: "update",
          required: true,
          label: "update",
          align: "left",
          field: "action",
          sortable: false
        }
      ],
      dropDown: {
        deviceOptions: [],
        leadSourceOptions: []
      }
    };
  },
  validations: {
    formData: {
      leadName: {
        required
      },
      contactName: {
        required
      },
      contactNumber: {
        required
      },
      alternateContactNumber: {
        required
      },
      email: {
        required
      },
      leadAddress: {
        required
      },
      pincode: {
        required
      },
      state: {
        required
      },
      city: {
        required
      },
      leadSource: {
        required
      },
      device: {
        required
      },
      deviceCount: {
        required
      }
    }
  },

  computed: {
    ...mapGetters("appDevice", ["getAllAppDevicesInfo"]),
    ...mapGetters("appLeadSource", ["getAllAppLeadSource"]),
    ...mapGetters("shortLeadInfo", ["getShortLead"])
  },

  created() {
    /* START: Load user table data filter > DeviceTypes */
    this.appLoadData();
    this.fetchappData();
    /* End: Load user table data filter > DeviceTypes */
  },

  methods: {
    ...mapActions("appDevice", ["FETCH_APP_DEVICES_DATA"]),
    ...mapActions("appLeadSource", ["FETCH_APP_LEADSOURCE_DATA"]),
    ...mapActions("shortLead", ["STATE_SHORT_LEAD"]),
    ...mapActions("shortLeadInfo", ["FETCH_SHORT_LEAD"]),
    fnSubmitBankDetails(formData) {
      this.STATE_SHORT_LEAD(formData);
      this.shortlead = "wiplead";
      this.formData = "";
    },
    fnShowEditShortLead(rowDetails) {
      this.propShowEditShortLead = !this.propShowEditShortLead;
      if (rowDetails != undefined) {
        this.propRowDetails = rowDetails;
      }
    },
    fnShowConvertToSat(rowDetails) {
      this.propShowConvertToSat = !this.propShowConvertToSat;
      if (rowDetails != undefined) {
        this.propRowDetails = rowDetails;
      }
    },
    appLoadData() {
      let self = this;
      self
        .FETCH_APP_DEVICES_DATA()
        .then(() => {
          return _.map(self.getAllAppDevicesInfo, item => {
            self.dropDown.deviceOptions.push({
              value: item,
              label: item.deviceName
            });
          });
        })
        .then(() => {
          self.FETCH_APP_LEADSOURCE_DATA().then(() => {
            return _.map(self.getAllAppLeadSource, item => {
              self.dropDown.leadSourceOptions.push({
                value: item,
                label: item.sourceName
              });
            });
          });
        });
    },
    fetchappData() {
      this.FETCH_SHORT_LEAD();
    }
  }
};
</script>

<style>
.border-1 {
  border: 1px solid rgba(0, 0, 0, 0.1);
}
.border-2 {
  border: 3px solid rgba(48, 48, 48, 0.5);
}
</style>
