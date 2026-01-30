<template>
  <div>
    <div class="row items-center">
      <div
        class="col-12 bottom-border q-py-md"
        v-for="(key,index) in Object.keys(propLeadDeatils.leadDocuments)"
        :key="index"
      >
        <div class="row group items-center">
          <div class="col-auto">
            <span class="text-purple-9 text-weight-bold border-1 q-pa-sm">{{index+1}}</span>
          </div>
          <div
            class="col-10"
            v-for="(item,subIndex) in propLeadDeatils.leadDocuments[key]"
            :key="subIndex"
          >
            <div class="row">
              <div class="col-4 q-body-1">Document</div>
              <div
                class="col-8 q-body-1 text-weight-bold text-negative"
                v-if="item.documentType == ''"
              >NA</div>
              <div class="col-8 q-body-1" v-else>{{item.documentType}}</div>
            </div>
            <div class="row">
              <div class="col-4 q-body-1">Sub document</div>
              <div
                class="col-8 q-body-1 text-weight-bold text-negative"
                v-if="item.subDocumentType == ''"
              >NA</div>
              <div
                class="col-8 q-body-1 text-weight-bold text-positive"
                v-else
              >{{item.subDocumentType}}</div>
            </div>
            <div class="row">
              <div class="col-12" v-show="item.uploadedDocuments.length > 0">
                <div
                  class="q-caption"
                  v-for="(document, documentIndex) in item.uploadedDocuments"
                  :key="documentIndex"
                >{{document.fileName}}</div>
              </div>
              <div class="q-caption" v-show="item.uploadedDocuments.length == 0">
                <div class="text-weight-bold text-negative">No document available</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row group q-py-md items-center">
      <div class="col-6">
        <q-input
          color="grey-9"
          v-model="leadDataEntryRemarks"
          float-label="Remarks"
          placeholder="Remarks"
        />
      </div>
      <div class="col-6">
        <p class="q-ma-0">Hold payment?</p>
        <q-radio color="grey-9" v-model="holdPayment" :val="1" label="Yes"/>
        <q-radio color="grey-9" v-model="holdPayment" :val="0" label="No"/>
      </div>
    </div>
    <q-stepper-navigation>
      <q-btn color="primary" class="q-ma-xs" icon="check" @click="validate" label="Submit"/>
      <q-btn
        color="amber-10"
        class="q-ma-xs"
        icon="save"
        label="Save Partial"
        @click="$emit('saveData','kyc',merchant)"
      />
      <q-btn color="grey-7" class="q-ma-xs" icon="block" @click="$emit('goBack')" label="Back"/>
    </q-stepper-navigation>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  // name: 'ComponentName',
  props: ["propLeadDeatils", "kyc"],

  data() {
    return {
      holdPayment: "",
      leadDataEntryRemarks: "",
      merchant: {
        kyc: {
          documents: []
        }
      },
      merchant: {
        kyc: JSON.parse(JSON.stringify(this.kyc))
      }
    };
  },
  created() {
    this.structureDocumentsInArray();
  },
  computed: {
    ...mapGetters("GlobalVariables", ["GLOBAL_FILE_FETCH_URL"])
  },
  methods: {
    structureDocumentsInArray() {
      let self = this;
      self.merchant.kyc.documents.push({
        documentName: "Agreement",
        documentType: this.propLeadDeatils.merchantType.marsAgreementId,
        documentImage: [
          this.GLOBAL_FILE_FETCH_URL +
            "/" +
            this.propLeadDeatils.applicationFile
        ]
      });

      Object.keys(this.propLeadDeatils.leadDocuments).forEach(function(
        key,
        index
      ) {
        _.map(self.propLeadDeatils.leadDocuments[key], function(oo) {
          if (oo.uploadedDocuments.length > 0) {
            let assumeArr = [];
            _.map(oo.uploadedDocuments, function(doc) {
              assumeArr.push(self.GLOBAL_FILE_FETCH_URL + "/" + doc.fileName);
            });
            self.merchant.kyc.documents.push({
              documentName: oo.subDocumentType,
              documentType: oo.marsDocumentId,
              documentImage: assumeArr
            });
          }
        });
      });
    },
    validate() {
      this.$v.merchant.companyInformation.$touch();
      if (this.$v.merchant.companyInformation.$error) {
        this.$q.notify("Please review fields again.");
      } else {
        this.$emit("submit", "kyc", this.merchant);
      }
    }
  }
};
</script>

<style>
</style>
