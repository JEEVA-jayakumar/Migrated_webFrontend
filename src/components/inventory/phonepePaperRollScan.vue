<template>
    <div>
      <q-modal v-model="toggleModal" class="q-mt-lg capitalize" @hide="emitToggleRemarks" @escape-key="emitToggleRemarks"
        :content-css="{minWidth:'30vw',padding:'20px'}">
        <div class="row items-center bottom-border q-py-sm">
          <div class="col">Scan POD Number</div>
          <div class="col-auto">
           
            <q-btn round size="sm" @click="emitToggleRemarks" outline color="dark" icon="clear" />
          </div>

        </div>
  
        <form>
          <div class="column group">
            <div class="q-title"></div>
          </div> 
          <!-- <q-item-main class="q-body-1">{{this.formData.podNumber.podNumber}}</q-item-main> -->
          <!-- <p>{{ formData.podNumber.podNumber }}</p> -->
          <q-input v-model="formData.podNumber.podNumber" readonly  float-label="POD Number"/>
          <div class="group" >
            <q-btn @click="fnsubmit(formData)"  icon="check" label="Save" style="float:inline-end; color: white; background-color: #61116a;" />
            <q-btn @click="openScannerComp" v-if="scannerToggleOption"  color="blue" outline class="q-py-xs " label="Start scan" style="float: inline-end;"/>
          </div>
        </form>
      </q-modal>
    </div>
  </template>
      
  <script>
   import Vue from "vue";
    import VueBarcodeScanner from "vue-barcode-scanner";
  Vue.use(VueBarcodeScanner);
  import { mapGetters, mapActions } from "vuex";
  import { required } from "vuelidate/lib/validators";
  
  export default {
    name: "phonepePaperRoll",
    props: ["scanInfo", "propToggleScannerPop", "propToggleScan"],
    data() {
      return {
        toggleModal: this.propToggleScannerPop,
        scannerToggleOption: true,
        barcodeValue:[],
        // podNum:null,
        formData: {
          ticketId:this.scanInfo.data.serviceReqTicketId,
          podNumber:{
            podNumber:null
          },
          action:this.scanInfo.action
        },
      };
    },
  beforeMount(){
    console.log("ScanINFO",JSON.stringify(this.scanInfo)); 
  },
    validations: {
      formData: {
        podNumber:{
          podNumber:{ required },
        } 
      }
    },
    computed: {
      ...mapGetters("phonePeCrm", ["getupdatePodNumber"])
    },
  
    methods: {
      ...mapActions("phonePeCrm", ["UPDATE_PHONEPE_PAPERROLL_PODNUMBER"]),
      // emitToggleRelod(propToggleRemarks) {
      //   this.$emit("closeRemarksInfo", "reloadPhonepePendingDetails")
      // },
      // closeModal() {
      //   this.$emit("toggleModal");
  
      // },
      fnsubmit(formData) {
        console.log("FORM DATA",JSON.stringify(formData));
        this.$v.formData.$touch();
        if (this.$v.formData.$error) {
          this.$q.notify("Please review fields again.");
        } else {      
          this.UPDATE_PHONEPE_PAPERROLL_PODNUMBER(formData)
            .then(() => {
              this.$q.notify({
                color: "positive",
                position: "bottom",
                message: "PodNumber updated successfully",
                icon: "thumb_up"
              });
              this.emitToggleRemarks()
              this.$emit("reloadPhonepePendingDetails", this.formData.action);
            })
            .catch(error => {
              this.$q.notify({
                color: "negative",
                position: "bottom",
                message: error.body.message == null ? "Please Try Again Later !" : error.body.message,
                icon: "thumb_down"
              });
            });
        }
      },
      openScannerComp(){
        this.$q.notify({
          color: "positive",
          position: "bottom",
          message: "Start scanning ", 
          icon: "list"
        });
        this.formData.podNumber.podNumber=''
        this.scannerToggleOption = false;
        if (!this.$barcodeScanner.hasListener()) {
          this.$barcodeScanner.init(this.onBarcodeScanned);
        }
      },
      onBarcodeScanned(barcode){
        console.log("BARCODE",barcode);
        // this.$delete(this.formData.podNumber.podNumber);
        // this.formData.podNumber.podNumber=''
        this.scannerToggleOption = false;
        this.formData.podNumber.podNumber = barcode
      console.log("FORMDATA",this.formData.podNumber.podNumber);
      this.$barcodeScanner.destroy();
      },
    //   handleBarcodeScan(event) {
    //   // Extract scanned barcode from the event
    //   const scannedBarcode = event.target.value.trim();
    //   console.log("BAR CODE",scannedBarcode);
    //   // Update the input field with the scanned value
    //   this.formData.podNumber.podNumber = scannedBarcode;
    // },
      emitToggleRemarks() {
        this.$barcodeScanner.destroy();
        this.$emit("closeScannerInfo");
      }
    }
  };
  </script>
      
  <style>
  
  </style>
      