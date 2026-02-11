<template>
  <div>
    <q-dialog
      @hide="emitToggleRemarks"
      @escape-key="emitToggleRemarks"
      v-model="toggleModal"
      :content-css="{ padding: '10px', minWidth: '50vw', minHeight: '75vh' }"
    >
      <div class="row items-center q-py-sm bottom-border">
        <div class="col">Document Viewer</div>
        <div class="col" align="right">
          <q-btn
            outline
            round
            size="sm"
            color="dark"
            icon="clear"
            @click="emitToggleRemarks"
          />
        </div>
      </div>

      <!-- List of documents with view buttons -->
      <div class="q-pa-md">
        <q-list bordered>
          <q-item v-for="(item, index) in itemDetail" :key="index">
            <q-item-section>{{ item.invoiceName }}</q-item-section>
            <q-item-section side>
              <q-btn color="primary" @click="viewDocument(item)">View</q-btn>
            </q-item-section>
          </q-item>
        </q-list>
      </div>

      <!-- <div v-if="showOpenPaymentChequeDocumentInfo" class="q-pa-md">
                     <viewer
                        class="cursor-pointer"
                        :images="[GLOBAL_FILE_FETCH_URL+ '/'+itemDetail]"
                      >
                        <img
                          :src="GLOBAL_FILE_FETCH_URL+ '/'+itemDetail"
                          style="max-width: 100%; cursor: zoom-in;"
                        />
                      </viewer>
                    </div> -->
      <financePdfComponent
        v-if="toggleshowPDFModal"
        :propToggleshowPDFModalFinance="toggleshowPDFModal"
        :propPDFDetailsFinance="PDFDetails"
        @togglePDFModal="fnPDFViewModal"
      ></financePdfComponent>
    </q-dialog>
  </div>
</template>
<script>
import { between } from '@vuelidate/validators';
import vuePdfjs from "vue-pdfjs";
import { mapGetters, mapActions } from "vuex";
import financePdfComponent from "../../components/sat/financePdfComponent.vue";
export default {
  components: {
    vuePdfjs,
    financePdfComponent
  },
  props: ["propToggleshowPDFModal", "propPDFDetails"],
  data() {
    return {
      toggleModal: this.propToggleshowPDFModal,
      itemDetail: [],
      selectedDocument: null,
      showOpenPaymentChequeDocumentInfo: false,
      toggleshowPDFModal: false
      //   imageView: false
    };
  },
  beforeMount() {
    console.log(
      "propPDFDetails---------->>>>",
      JSON.stringify(this.propPDFDetails)
    );
  },
  created() {
    this.financeDocumentList();
  },
  computed: {
    ...mapGetters("posInventoryFinance", ["getfinanceDocumentList"]),
    getfinanceDocumentList() {
      return this.$store.state.financeDocumentList;
    }
  },
  methods: {
    ...mapGetters("GlobalVariables", ["GLOBAL_FILE_FETCH_FINANCE_URL"]),
    ...mapActions("posInventoryFinance", [
      "FETCH_FINANCE_DOCUMENT_LIST",
      "FETCH_DOCUMENT_LIST"
    ]),
    financeDocumentList() {
      this.FETCH_FINANCE_DOCUMENT_LIST(this.propPDFDetails.id)
        .then(responseData => {
          console.log(
            "Response Data responseData: ",
            JSON.stringify(responseData)
          );
          if (
            responseData &&
            responseData.data &&
            Array.isArray(responseData.data)
          ) {
            const invoiceNames = [];
            const dataArray = responseData.data;
            dataArray.forEach(item => {
              this.invoiceCopy = item.invoiceName;
              this.invoiceMimeType = item.invoiceMimeType;
              console.log("invoiceCopy:", this.invoiceCopy);
              console.log("invoiceMimeType:", this.invoiceMimeType);
              invoiceNames.push(this.invoiceCopy);
            });
            this.tableData = dataArray;
            this.itemDetail = this.tableData;
            console.log("itemDetail:", JSON.stringify(this.itemDetail));
          } else {
            console.error("Unexpected response format: ", responseData);
          }
          this.itemDetail.forEach(item => {
            this.FETCH_DOCUMENT_LIST(item)
              .then(() => {})
              .catch(error => {
                console.error("Error fetching document:", error);
              });
          });
        })
        .catch(error => {
          console.error("Error fetching finance document list: ", error);
        });
    },

    viewDocument(document) {
      this.selectedDocument = document;
      const documentUrl = document.invoiceName;

      const fileExtension = documentUrl
        .split(".")
        .pop()
        .toLowerCase();
      console.log("fileExtension:", fileExtension);
      if (
        fileExtension === "png" ||
        fileExtension === "jpeg" ||
        fileExtension === "jpg"
      ) {
        this.fnPDFViewModal(document);
        // this.fnPDFViewModal(document)
        // this.FETCH_DOCUMENT_LIST(documentUrl)
        //           .then(() => {})
        //           .catch(error => {
        //             console.error("Error fetching document:", error);
        //           });
      } else {
        this.fnPDFViewModal(document);
        // this.FETCH_DOCUMENT_LIST(documentUrl)
        //       .then(() => {})
        //       .catch(error => {
        //         console.error("Error fetching document:", error);
        //       });
        // console.error('Document URL is undefined.',fileExtension);
      }
    },
   
    fnPDFViewModal(documentUrl) {
      console.log("PDF URL", documentUrl);
      this.showOpenPaymentChequeDocumentInfo = !this
        .showOpenPaymentChequeDocumentInfo;
      this.PDFDetails = documentUrl;
      this.toggleshowPDFModal = !this.toggleshowPDFModal;
    },
   
    isPDF(documentUrl) {
      return documentUrl.toLowerCase().endsWith(".pdf");
    },
    
    emitToggleRemarks() {
      this.$emit("togglePDFModal");
    }
  }
};
</script>
<style>
.q-item {
  justify-content: space-between;
}
</style>
