<template>
  <q-page>
    <q-dialog minimized no-backdrop-dismiss class="customModalOverlay" v-model="toggleModel"
      :content-css="{ padding: '10px', minWidth: '63vw' }">
      <div class="row">
        <!-- <div class="col-12 text-h6 q-pa-md text-weight-regular bottom-border">
                      Finance Details
                  </div> -->
        <!-- START >> Setup MDR details -->
        <div class="col-md-5 col-sm-4 col-xs-12 q-pa-sm">
          <q-card style="width:250%">
            <q-card-section>
              <q-list no-border>
                <div class="col-md-12">
                  <q-input type="textarea" float-label="Device Purchase Cost" placeholder="Device Purchase Cost"
                    class="q-my-md" color="grey-9" align="left" @blur="$v.formData.devicePurchaseCost.$touch"
                    :error="$v.formData.devicePurchaseCost.$error" v-model="formData.devicePurchaseCost" />
                </div>
                <div class="col-md-12">
                  <q-input type="textarea" float-label="Total Life of Device in Days"
                    placeholder="Total Life of Device in Days" class="q-my-md" color="grey-9" align="left"
                    @blur="$v.formData.deviceLife.$touch" :error="$v.formData.deviceLife.$error"
                    v-model="formData.deviceLife" />
                </div>
                <div class="col-md-12">
                  <q-input type="textarea" float-label="Invoice Number" placeholder="Invoice Number" class="q-my-md"
                    color="grey-9" align="left" @blur="$v.formData.invoiceNumbers.$touch"
                    :error="$v.formData.invoiceNumbers.$error" v-model="formData.invoiceNumbers" />
                </div>
                <div class="col">
                  <b>Placeholder Invoice Copy</b>
                </div>
                <div class="col-md-3 q-py-md" align="center">
                  <div v-if="formData.fileSelected.length === 0" :class="[
                        uploaderHovered
                          ? 'toggleBulkUploadDisable'
                          : 'toggleBulkUploadActive'
                      ]" class="drop display-inline align-center cursor-pointer"
                    @dragover.prevent="dragAndDropCustomAnimate(true)"
                    @dragleave.prevent="dragAndDropCustomAnimate(false)" @drop="onDrop">
                    <q-card class="q-pa-xs bg-green-3">
                      <label class="btn display-inline cursor-pointer">
                        Drag & Drop or click here to open a file
                        <input type="file" name="image" @change="onChange" ref="deviceBulkUpload"
                          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .pdf, image/png, image/jpeg, image/jpg"
                          multiple />
                      </label>
                    </q-card>
                  </div>
                  <div v-else align="left">
                    <q-card dense class="q-pa-xs">
                      <q-card-section class="q-pa-xs bg-green-3">
                        Uploaded Files
                      </q-card-section>
                      <q-separator />
                      <q-card-section>
                        <div v-for="(file, index) in formData.fileSelected" :key="index">
                          <q-item dense>
                            <q-item-section icon="attach_file" />
                            <q-item-section>{{ file.name }}</q-item-section>
                            <q-item-section>
                              <q-btn class="fa fa-close" size="sm" color="negative" @click="removeUploadedFiles(index)"
                                label="Remove" icon="clear" />
                            </q-item-section>
                          </q-item>
                        </div>
                      </q-card-section>
                    </q-card>
                  </div>
                </div>
              </q-list>
            </q-card-section>
            <q-card-actions align="end">
              <q-btn push label="Cancel" align="right" color="negative" @click="emitfnshowPosInventory()" />
              <q-btn push label="Submit" @click="PosFinanceSubmit(formData)" color="purple-9" />
            </q-card-actions>
          </q-card>
        </div>
        <!-- END >> Setup MDR details -->
      </div>
    </q-dialog>
  </q-page>
</template>

<script>
  /* START >> Modal components Lead source, device, merchant type */
    import {
    required,
    requiredIf,
    email,
    minLength,
    maxLength,
    alpha,
    alphaNum,
    numeric
  } from "@vuelidate/validators";
  import { mapGetters, mapActions } from "vuex";
  // import financeInvoiceCopy from "../../components/inventory/financeInvoiceCopy.vue";
  export default {
    props: ["propShowPosInventory", "propRowDetails"],
    name: "MDRdetails",
    components: {
      // financeInvoiceCopy
    },
    data() {
      return {
        toggleModel: this.propShowPosInventory,
        //   openBulkModal: false,
        formData: {
          id: JSON.stringify(this.propRowDetails.id),
          devicePurchaseCost: "",
          deviceLife: "1460",
          invoiceNumbers: "",
          fileSelected: []
        },
        uploaderHovered: false
      };
    },
    validations: {
      formData: {
        devicePurchaseCost: {
          required
        },
        deviceLife: {
          required
        },
        invoiceNumbers: {
          required
        },
      }
    },

    //   created() {

    //   },
    created() {
    this.getInvoiceNumber(JSON.stringify(this.propRowDetails.id));
  },
    beforeMount() {
      console.log("propRowDetails ------->", JSON.stringify(this.propRowDetails));
    },
    mounted() {
      console.log("FormData:", assumeFormDataValue);
    },

    computed: {
      // ...mapGetters("posInventoryFinance", ["getreassignReasonList"])
    },

    methods: {
      ...mapActions("posInventoryFinance", ["FETCH_POS_FINANCE_SUBMIT"]),
      ...mapActions("VerifyDevice", [
      "GET_INVOICE_NUMBER_FROM_INVENTORY"
    ]),
      emitfnshowPosInventory() {
        this.$emit("emitfnshowPosInventory");
      },
      getInvoiceNumber(res){
        this.GET_INVOICE_NUMBER_FROM_INVENTORY(res)
          .then((response) => {
           // Safe extraction without optional chaining
      const invoiceNumber = response.body && response.body.InvoiceNumber ? response.body.InvoiceNumber : "";

this.formData.invoiceNumbers = invoiceNumber;
          })
          .catch(() => {
            this.$q.notify({
              color: "primary",
              position: "bottom",
              message: barcode + " is invalid",
              icon: "info"
            });
          });
      },
      //     fnOpenBulkModal() {
      //   this.openBulkModal = !this.openBulkModal;
      // },
      // removeUploadedFiles() {
      //   this.formData.fileSelected = [];
      // },
      dragAndDropCustomAnimate(action) {
        this.uploaderHovered = action;
      },
      onDrop: function (e) {
        e.stopPropagation();
        e.preventDefault();
        this.formData.fileSelected = Array.from(e.dataTransfer.files);
        this.fileCheckSum(this.formData.fileSelected);
        console.log("fileCheckSum", this.fileCheckSum);
      },

      fileCheckSum(file) {
        let re = /(\.csv|\.xlsx|\.xls|\.pdf|\.png|\.jpg|\.jpeg)$/i;
        if (!re.exec(file[0].name)) {
          this.formData.fileSelected = [];
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message: "File format not supported",
            icon: "clear"
          });
          return false;
        }
      },
      onChange(e) {
        this.formData.fileSelected = Array.from(e.target.files); // Convert FileList to array
        console.log("onChange--------->>>>", this.formData.fileSelected);
      },
      removeUploadedFiles(index) {
        this.formData.fileSelected.splice(index, 1); // Remove file at given index
      },

      PosFinanceSubmit(request) {
        console.log("REQUEST LIST DETAILS DATA----------->>>>", JSON.stringify(request));
        this.$q.loading.show({
          delay: 0, // ms
          spinnerColor: "purple-9",
          message: "Validating .."
        });
        this.$v.formData.$touch();
        if (this.$v.formData.$error || this.formData.fileSelected.length == 0) {
          this.$q.notify({
            color: "amber-9",
            position: "bottom",
            message: "Please fill all mandatory fields",
            icon: "warning"
          });
          this.$q.loading.hide();
        } else {
          // this.$q.loading.show();
          let assumeFormData = new FormData();
          // Append all selected files to FormData
          for (let i = 0; i < this.formData.fileSelected.length; i++) {
            assumeFormData.append("file", this.formData.fileSelected[i]);
            console.log("File appended:", this.formData.fileSelected[i]);
          }

          let assumeFormDataValue = {
            file: assumeFormData,
            id: this.formData.id,
            devicePurchaseCost: request.devicePurchaseCost,
            deviceLife: request.deviceLife,
            invoiceNumbers: request.invoiceNumbers
          };

          this.FETCH_POS_FINANCE_SUBMIT(assumeFormDataValue)
            // console.log("FormData:", assumeFormDataValue)
            .then(response => {
              this.$q.notify({
                color: "positive",
                position: "bottom",
                message: "Devices Successfully added!",
                icon: "thumb_up"
              });
              this.$emit("emitfnshowPosInventory");
              this.$q.loading.hide();
              this.formData.fileSelected = [];
            })
            .catch(error => {
              this.$q.notify({
                color: "negative",
                position: "bottom",
                message: `${error.data.message}`,
                icon: "thumb_down"
              });
              this.$q.loading.hide();
            });
        }
      },

      // fnEDITREOPEN(request) {
      //   console.log("fnEDITREOPEN ------>", JSON.stringify(request));

      //   this.$q
      //     .dialog({
      //       title: "Confirm",
      //       message: "Are you sure want to Submit the lead?",
      //       ok: "Continue",
      //       cancel: "Cancel"
      //     })
      //     .then(() => {
      //       this.$q.loading.show({
      //         delay: 0, // ms
      //         spinnerColor: "purple-9",
      //         message: "Processing .."
      //       });
      //       let param = {
      //         // userId: request.so,
      //         devicePurchaseCost: request.devicePurchaseCost,
      //         deviceLife: request.deviceLife,
      //         invoiceNumbers: request.invoiceNumbers

      //         // request: {
      //         //     reAssignReason: request.Reassign,
      //         //     reAssignRemark: request.reason
      //         // }
      //         // request: [{
      //         //     id: this.propRowDetails.id,
      //         //     tid: this.propRowDetails.tid,
      //         //     mid: this.propRowDetails.mid,
      //         //     leadId: this.propRowDetails.leadId,
      //         //     meName: this.propRowDetails.meName,
      //         //     address: this.propRowDetails.address,
      //         //     state: this.propRowDetails.state,
      //         //     city: this.propRowDetails.city,
      //         //     pincode: this.propRowDetails.pincode,
      //         //     contactNumber: this.propRowDetails.contactNumber,
      //         //     emailId: this.propRowDetails.emailId,
      //         //     deviceType: this.propRowDetails.deviceType,
      //         //     serviceReqTicketId: this.propRowDetails.serviceReqTicketId,
      //         //     serviceRequestTicketStatus: this.propRowDetails.serviceRequestTicketStatus,
      //         //     source: this.propRowDetails.source,
      //         //     serviceRequestMode: this.propRowDetails.serviceRequestMode,
      //         //     bpRegion: this.propRowDetails.bpRegion,
      //         //     assignedTo: this.propRowDetails.assignedTo,
      //         //     createdBy: this.propRowDetails.createdBy,
      //         //     crmRemark: this.propRowDetails.crmRemark,
      //         //     reAssignReason: request.Reassign,
      //         //     reAssignRemark: request.reason,
      //         //     createdDate: this.propRowDetails.createdDate,
      //         //     updatedDate: this.propRowDetails.updatedDate,
      //         //     subTicketsList: null
      //         // }]
      //       };
      //       console.log("param ------>", JSON.stringify(param));

      //       this.REASSIGNED_REASON_TYPE_DETAILS(param)
      //         .then(() => {
      //           this.$emit("emitfnshowPosInventory");
      //           this.$q.loading.hide();
      //           this.$q.notify({
      //             color: "positive",
      //             position: "bottom",
      //             message: "Updated Successfully",
      //             icon: "thumb_up"
      //           });
      //         })
      //         .catch(error => {
      //           this.$q.loading.hide();
      //           this.$q.notify({
      //             color: "negative",
      //             position: "bottom",
      //             message:
      //               error.body.message == null
      //                 ? "Please Try Again Later !"
      //                 : error.body.message,
      //             icon: "thumb_down"
      //           });
      //         });
      //     })
      //     .catch(() => {
      //       this.$q.notify({
      //         color: "negative",
      //         position: "bottom",
      //         message: "No changes made!",
      //         icon: "thumb_down"
      //       });
      //     });
      // }
    }
  };
</script>

<style></style>
