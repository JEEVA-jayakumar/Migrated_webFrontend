<template>
  <q-page>
    <div>
      <div class="col-md-12 text-h6 q-px-lg q-py-md text-weight-regular bottom-border text-grey-9">
        DOC Viewer
      </div>
      <div class="row gutter-x-xs gutter-y-xs q-pt-md justify-around items-end">
        <div class="col-md-6">
          <q-input
            clearable
            @clear="fnClearing"
            color="grey-9"
            @blur="$v.formData.searchTerm.$touch"
            :error="$v.formData.searchTerm.$error"
            v-model="formData.searchTerm"
            placeholder="Type.."
            float-label="Search By Ticket ID / TID..."
            class="q-mr-lg q-py-sm"
          />
        </div>
        <div class="col-md-3">
          <div class="group">
            <q-radio v-for="(item, index) in flagOptions" :key="index" color="grey-9" v-model.trim="formData.flag" :val="item.value" :label="item.label"/>
          </div>
        </div>
        <div class="col-md-2">
          <q-btn class="auto" :disabled="formData.searchTerm == '' && formData.flag == ''" size="md" type="button" color="purple-9" @click="globalSubmit(formData)">Submit
          </q-btn>
        </div>
      </div>
    </div>
  
    <div v-if="tableData.length != 0">
      <q-table table-class="customTableClass" :rows="tableData" :columns="columns" :pagination="paginationControl" row-key="name" :loading="toggleAjaxLoadFilter" :rows-per-page-options="[5, 10, 15, 20]" @request="ajaxLoadAllLeadInfo">
        <q-td v-slot:body-cell-tid="props" :props="props">
          <span class="label text-primary"># {{ props.row.tid }}</span>
        </q-td>
        <q-td v-slot:body-cell-merchantName="props" :props="props">
          <span > {{ props.row.leadInformation.contactName == null ? "NA"  :  props.row.leadInformation.contactName }}</span>
        </q-td>
        <q-td v-slot:body-cell-regionAreaName="props" :props="props">
          <span > {{ props.row.aggregatorRegionalInventory.region.regionAreaName == null ? "NA"  :  props.row.aggregatorRegionalInventory.region.regionAreaName }}</span>
        </q-td>
        <q-td v-slot:body-cell-viewDocument="props" :props="props">
          <div v-if="props.row.implementationFormMimeType == null || props.row.implementationFormMimeType.includes('application/pdf')" class="cursor-pointer">
            <div @click="fnPDFViewModal(props.row.implementationForm)">
              <q-icon name="fas fa-file-pdf" color="primary" />
            </div>
          </div>
          <div v-else-if="props.row.implementationFormMimeType == null || props.row.implementationFormMimeType.includes('image/*')" class="cursor-pointer">
            <q-btn flat dense  color="green" @click="fnShowPopuop(props.row.implementationForm)">
               <q-icon name="fa fa-camera"/>
            </q-btn>
          </div>
          <div v-else>NA Document</div>
        </q-td>
         <q-td v-slot:body-cell-pictureOfShop="props" :props="props">
          <div
            v-if="
              props.row.pictureOfShopMimeType == null ||
              props.row.pictureOfShopMimeType.includes('application/pdf')
            "
            class="cursor-pointer"
          >
            <div @click="fnPDFViewModal(props.row.pictureOfShop)">
              <q-icon name="fas fa-file-pdf" color="primary" />
            </div>
          </div>
          <div v-else-if="props.row.pictureOfShopMimeType == null || props.row.pictureOfShopMimeType.includes('image/*')" class="cursor-pointer">
           <q-btn flat dense  color="green" @click="fnShowPopuop(props.row.pictureOfShop)">
               <q-icon name="fa fa-camera"/>
            </q-btn>
          </div>
          <div v-else>NA Document</div>
         </q-td>
         <q-td v-slot:body-cell-cpvForm="props" :props="props">
          <div
            v-if="
              props.row.cpvFormMimeType == null ||
              props.row.cpvFormMimeType.includes('application/pdf')
            "
            class="cursor-pointer"
          >
            <div @click="fnPDFViewModal(props.row.cpvForm)">
              <q-icon name="fas fa-file-pdf" color="primary" />
            </div>
          </div>
          <div v-else-if="props.row.cpvFormMimeType == null ||props.row.cpvFormMimeType.includes('image/*')" class="cursor-pointer">
            <q-btn flat dense  color="green" @click="fnShowPopuop(props.row.cpvForm)">
               <q-icon name="fa fa-camera"/>
            </q-btn>
          </div>
          <div v-else>NA Document</div>
        </q-td>
      </q-table>
    </div>
    <div v-else-if="tableData1.length != 0">
      <q-table table-class="customTableClass" :rows="tableData1" :columns="columns1" row-key="name" :pagination="paginationControlchange" :rows-per-page-options="[5,10,15,20]" :loading="toggleAjaxLoadFilter" @request="ajaxLoadAllLeadInfo1">
       <q-td v-slot:body-cell-tid="props" :props="props">
          <span class="label text-primary"># {{ props.row.serviceRequestData.tid }}</span>
        </q-td>
        <q-td v-slot:body-cell-merchantName="props" :props="props">
          <span > {{ props.row.serviceRequestData.meName == null ? "NA"  :  props.row.serviceRequestData.meName }}</span>
        </q-td>
        <q-td v-slot:body-cell-regionAreaName="props" :props="props">
          <span > {{ props.row.serviceRequestData.bpRegion.regionAreaName == null ? "NA"  :  props.row.serviceRequestData.bpRegion.regionAreaName }}</span>
        </q-td>
        <q-td v-slot:body-cell-ticket="props" :props="props">
          <span > {{ props.row.serviceRequestData.serviceReqTicketId == null ? "NA"  :  props.row.serviceRequestData.serviceReqTicketId }}</span>
        </q-td>
        <q-td v-slot:body-cell-pictureOfShop="props" :props="props">
          <div
            v-if="
              props.row.pictureOfShopMimeType == null ||
              props.row.pictureOfShopMimeType.includes('application/pdf')
            "
            class="cursor-pointer"
          >
            <div @click="fnPDFViewModal(props.row.pictureOfShop)">
              <q-icon name="fas fa-file-pdf" color="primary" />
            </div>
          </div>
          <div v-else-if="props.row.pictureOfShopMimeType == null || props.row.pictureOfShopMimeType.includes('image/*')" class="cursor-pointer">
              <q-btn flat dense  color="green" @click="fnShowPopuop(props.row.pictureOfShop)">
               <q-icon name="fa fa-camera"/></q-btn>
          </div>
          <div v-else>NA Document</div>
        </q-td>
        <q-td v-slot:body-cell-viewDocument="props" :props="props">
          <div
            v-if="
              props.row.implementationFormMimeType == null ||
              props.row.implementationFormMimeType.includes('application/pdf')
            "
            class="cursor-pointer"
          >
            <div @click="fnPDFViewModal(props.row.implementationForm)">
              <q-icon name="fas fa-file-pdf" color="primary" />
            </div>
          </div>
          <div v-else-if="props.row.implementationFormMimeType == null ||props.row.implementationFormMimeType.includes('image/*')" class="cursor-pointer">
            <q-btn flat dense  color="green" @click="fnShowPopuop(props.row.implementationForm)">
               <q-icon name="fa fa-camera"/>
            </q-btn>
          </div>
          <div v-else>NA Document</div>
        </q-td>

      </q-table>
    </div>
    <div v-else class="row gutter-x-xs gutter-y-xs justify-center q-pt-lg q-mr-lg q-ml-lg q-mt-lg q-mb-lg dFont" style="min-height: calc(80vh - 52px)">
      <div class="row" align="center">
        <q-icon name="warning" color="warning" size="4rem" />
        <div class="text-subtitle1 text-bold text-grey-9" style="align-self: center">
          No Data Available
        </div>
        </div>
    </div>
      <q-spinner-bars class="absolute-center" style="color: #61116a" :size="35" />
    <showPDF v-if="toggleshowPDFModal"
      :propToggleshowPDFModal="toggleshowPDFModal"
      :propPDFDetails="PDFDetails"
      @togglePDFModal="fnPDFViewModal"></showPDF>
    <popup v-if="propShowPopup"
      :propShowPopup="propShowPopup"
      :propRowDetails="propRowDetails"
      @emitfnshowservice="fnShowPopuop"></popup>
  </q-page>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { required, minLength, maxLength } from "@vuelidate/validators";
import popup from 'src/components/crm/popup.vue'
import showPDF from 'src/components/crm/showPDF.vue'
export default {
  name: "globalSearchFilterValues",
 components: {
    popup,
    showPDF
  },
  data() {
    return {
      propShowPopup: false,
      toggleshowPDFModal: false,
      toggleAjaxLoadFilter: false,
      tableData: [],
      tableData1: [],
      formData: {
        flag: "",
        searchTerm: "",
      },
      flagOptions: [
        {
          label: "Tid",
          value: 1,
        },
        {
          label: "Ticket ID",
          value: 2,
        },],
      paginationControl: {
        rowsNumber: 5,
        page: 1,
        sortBy: "createdDate",
        descending: false,
        rowsPerPage: 5,
      },
      paginationControlchange: {
        rowsNumber: 5,
        page: 1,
        sortBy: "createdDate",
        descending: false,
        rowsPerPage: 5,
      },
      columns: [
        {
          name: "tid",
          required: true,
          label: "TID",
          align: "left",
          field: "tid",
          sortable: false,
        },
        {
          name: "merchantName",
          required: true,
          label: "Merchant Name",
          align: "left",
          field: "merchantName",
          sortable: false,
        },
        {
          name: "regionAreaName",
          required: true,
          label: "Region",
          align: "left",
          field: "regionAreaName",
          sortable: false,
        },
        {
          name: "viewDocument",
          required: true,
          label: "Imp Form",
          align: "left",
          field: (row) => {
            return row.implementationForm == null ? "NA" : row.implementationForm;
          },
          sortable: false,
        },
        {
          name: "pictureOfShop",
          required: true,
          label: "Pic of Shop",
          align: "left",
          field: "pictureOfShop",
          sortable: false,
        },
        {
          name: "cpvForm",
          required: true,
          label: "CPV form",
          align: "left",
          field: "cpvForm",
          sortable: false,
        },
      ],
      columns1: [
        {
          name: "tid",
          required: true,
          label: "TID",
          align: "left",
          field: "tid",
          sortable: false,
        },
        {
          name: "merchantName",
          required: true,
          label: "Merchant Name",
          align: "left",
          field: "merchantName",
          sortable: false,
        },
        {
          name: "regionAreaName",
          required: true,
          label: "Region",
          align: "left",
          field: "regionAreaName",
          sortable: false,
        },
        {
          name: "ticket",
          required: true,
          label: "Ticket ID",
          align: "left",
          field: "ticket",
          sortable: false,
        },
        {
          name: "pictureOfShop",
          required: true,
          label: "Pic of Shop",
          align: "left",
          field: "pictureOfShop",
          sortable: false,
        },
        {
          name: "viewDocument",
          required: true,
          label: "Imp Form",
          align: "left",
          field: (row) => {
            return row.implementationForm == null ? "NA" : row.implementationForm;
          },
          sortable: false,
        },
      ],
    };
  },
  validations: {
    formData: {
      searchTerm: {
        required,
      },
       flag: {
        required,
      }
    }
  },

  computed: {
    ...mapGetters("globalSearchSerialNumber", ["getdocview","getdocticket"]),
    ...mapGetters("GlobalVariables", [
      "GLOBAL_STATUS_FETCH",
      "REGIONAL_INVENTORY_DEVICE_STATUS",
      "CENTRAL_INVENTORY_DEVICE_STATUS",
      "TID_STATUS",
      "TID_RECOVERY_STATUS",
      "TID_REPLACEMENT_STATUS",
    ]),
        ...mapGetters("GlobalVariables", ["GLOBAL_FILE_FETCH_URL"]),

  },

  methods: {
    ...mapActions("globalSearchSerialNumber", ["FETCH_DOC_VIEW","FETCH_DOC_VIEW_TICKET"]),
    globalSubmit(request) {
      this.$v.formData.$touch();
      if (this.$v.formData.$error) {
        this.$q.notify("Please review fields again.");
      } 
      else {
        if(request.flag == 1){
              this.$q.loading.show({
              delay: 0,
              spinnerColor: "purple-9",
              message: "Fetching data ..",
              });
              this.FETCH_DOC_VIEW(request).then((res) => {
                this.tableData = this.getdocview;
                this.$q.loading.hide();
            })
              .catch(error => {
                 this.$q.loading.hide();
                  this.$q.notify({
                    color: "negative",
                    position: "bottom",
                    message: error.body.message == null ? "Please Try Again Later !" : error.body.message,
                    icon: "thumb_down"
                  });
              });
        }
        else{
                this.$q.loading.show({
                delay: 0,
                spinnerColor: "purple-9",
                message: "Fetching data ..",
                });
                this.FETCH_DOC_VIEW_TICKET(request).then((res) => {
                  this.tableData1 = this.getdocticket;
                  this.$q.loading.hide();
                })
                .catch(error => {
                   this.$q.loading.hide();
                    this.$q.notify({
                      color: "negative",
                      position: "bottom",
                      message: error.body.message == null ? "Please Try Again Later !" : error.body.message,
                      icon: "thumb_down"
                    });
                  });


        }
      }
    
    
    },
    ajaxLoadAllLeadInfo() {
      this.toggleAjaxLoadFilter = true;
      this.FETCH_DOC_VIEW()
        .then((response) => {
          this.tableData = this.getaggImplementedverificationqueue;
          this.toggleAjaxLoadFilter = false;
        })
        .catch((error) => {
          this.$q.notify({
          color: "negative",
          position: "bottom",
          message: error.body.message == null ? "Please Try Again Later !" : error.body.message,
          icon: "thumb_down"
          });
          this.toggleAjaxLoadFilter = false;
        });
    },
    ajaxLoadAllLeadInfo({ pagination, filter }) {
      this.$q.loading.show({
        delay: 0,
        spinnerColor: "purple-9",
        message: "Fetching data ..",
      });
      this.FETCH_DOC_VIEW({ pagination, filter })
        .then((res) => {
          this.paginationControl = pagination;
          this.paginationControl.rowsNumber = this.getaggImplementedverificationqueue.totalElements;
          this.paginationControl.page =
            this.getaggImplementedverificationqueue.number + 1;

          this.tableData = this.getaggImplementedverificationqueue.content;
          if (this.getaggImplementedverificationqueue.sort != null) {
            this.paginationControl.sortBy = this.getaggImplementedverificationqueue.sort[0].property;
            this.paginationControl.descending = this.getaggImplementedverificationqueue.sort[0].ascending;
          }

          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.notify({
          color: "negative",
          position: "bottom",
          message: error.body.message == null ? "Please Try Again Later !" : error.body.message,
          icon: "thumb_down"
          });
          this.$q.loading.hide();
        });
    },
    ajaxLoadAllLeadInfo1({ pagination, filter }) {
      this.$q.loading.show({
        delay: 0,
        spinnerColor: "purple-9",
        message: "Fetching data ..",
      });
      this.FETCH_DOC_VIEW({ pagination, filter })
        .then((res) => {
          this.paginationControl = pagination;
          this.paginationControl.rowsNumber = this.getaggImplementedverificationqueue.totalElements;
          this.paginationControl.page =
            this.getaggImplementedverificationqueue.number + 1;

          this.tableData = this.getaggImplementedverificationqueue.content;
          if (this.getaggImplementedverificationqueue.sort != null) {
            this.paginationControl.sortBy = this.getaggImplementedverificationqueue.sort[0].property;
            this.paginationControl.descending = this.getaggImplementedverificationqueue.sort[0].ascending;
          }
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.notify({
          color: "negative",
          position: "bottom",
          message: error.body.message == null ? "Please Try Again Later !" : error.body.message,
          icon: "thumb_down"
          });
          this.$q.loading.hide();
        });
    },
    fnViewMultiAttachedFileImageUploadedBySat(attachedImageIndex) {
      this.$refs.multiAttachedImageViewerUploadedBySAT;
    },
    fnViewMultiAttachedFileImageUploadedByPictureShop(attachedImageIndex) {
      this.$refs.multiAttachedImageViewerUploadedByPictureShop.click();
    },
    fnViewMultiAttachedFileImageUploadedByCpvForm(attachedImageIndex) {
      this.$refs.multiAttachedImageViewerUploadedByCpvForm.click();
    },
    fnPDFViewModal(documentUrl) {
      this.PDFDetails = documentUrl;
      this.toggleshowPDFModal = !this.toggleshowPDFModal;
    },
    fnShowPopuop(rowDetails) {
      this.propShowPopup = !this.propShowPopup;
      if (rowDetails != undefined) {
        this.propRowDetails = rowDetails;
      }
    },
    fnClearing() {
      this.tableData = [];
      this.tableData1 = [];
      this.formData.flag="";
    },
  },
};
</script>

<style>
.text-wrap {
  overflow-wrap: anywhere;
  color: #242225;
}
</style>
