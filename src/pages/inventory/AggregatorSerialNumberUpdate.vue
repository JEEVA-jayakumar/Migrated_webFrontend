<template>
    <div>
      <div class="col-md-6 q-my-md" align="right">
        <div class="col group">
          <!-- <q-btn no-caps no-wrap label="Bank List" class="q-mt-lg text-weight-regular" color="purple-9" size="md" @click="fnshowBankList()"/> -->
         <!-- <q-btn
            icon="cloud_upload"
            class="q-ma-sm"
            color="positive"
            label="Upload Bank List"
            @click="fnUploadDocumentAndSubmit"
          />-->
        </div>
      </div>
      <div
          class="col-md-6 text-h6 q-px-lg q-py-md text-weight-regular bottom-border text-grey-9"
        >Aggregator Serial Number Update</div>
      
      <form>
        <div class="q-px-md">
          <div class="q-pa-md">
            <div class="row gutter-sm q-py-sm">
              <div class="col-md-6">
                  <q-input :error="$v.formData.tid.$error"
                              clearable
                              color="grey-9"
                              v-model.trim="formData.tid"
                              float-label="TID"
                              placeholder="TID"
                            >
                              <q-autocomplete
                                @search="tidSearch"
                                :debounce="500"
                                :min-characters="3"
                                @selected="tidSelected"
                              />
                            </q-input>
              </div>
                          <div class="col-md-6">
                  <q-input disable :error="$v.formData.serialNumber.$error"
                              clearable
                              color="grey-9"
                              v-model.trim="formData.serialNumber"
                              float-label="serialNumber"
                              placeholder="serialNumber"
                            >
                            </q-input>
              </div>
                                      <div class="col-md-6">
                  <q-input :error="$v.formData.newSerialNumber.$error"
                              clearable
                              color="grey-9"
                              v-model.trim="formData.newSerialNumber"
                              float-label="New Serial Number"
                              placeholder="New Serial Number"
                            >
                            </q-input>
              </div>
            </div>
          </div>
        </div>
        <div class="full-width group" align="center">
          <q-btn
            size="md"
            type="button"
            color="purple-9"
            @click="fnSubmitBankDetails(formData)"
          >Submit</q-btn>
        </div>
      </form>
      
      <uploadFile
        v-if="propShowCreateUploadFile"
        :propShowUploadFile="propShowCreateUploadFile"
        @emitfnshowUploadFile="propShowCreateUploadFile"
      ></uploadFile>
    </div>
  </template>
  
  <script>
  
  import {
    required,
    email,
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
  
    data() {
      return {
  
  
  
        formData: {
         tid:'',
         serialNumber:'',
         newSerialNumber:''
          }
      };
    },
  
    validations: {
      formData: {
        tid: {
          required
        },
            serialNumber: {
          required
        },
                  newSerialNumber: {
          required
        },
  
      }
    },
    computed: {
      ...mapGetters("AggregatorTid", ["getAllAggregatorTids"])
    },
  
    methods: {
      ...mapActions("AggregatorTid", ["FETCH_AGGREGATOR_TID","FETCH_AGGREGATOR_TID_SERIAL_NUMBER","UPDATE_AGGREGATOR_SERIAL_NUMBER"]),
   
      fnSubmitBankDetails(formData) {
        this.$v.formData.$touch();
        if (this.$v.formData.$error) {
          this.$q.notify("Please review fields again.");
          return;
        } else {
           
        
        let serialNumberUpdate = {
            url: {
              tid: this.formData.tid,
              newSerialNumber : this.formData.newSerialNumber
             
            },
        }
        
  
          this.UPDATE_AGGREGATOR_SERIAL_NUMBER(serialNumberUpdate)
            .then(response => {
              this.$q.notify({
                color: "positive",
                position: "bottom",
                message: response.data.message,
                icon: "thumb_up"
              });
            
            })
            .catch(error => {
              this.$q.loading.hide();
              this.$q.notify({
                type: "warning",
                color: "amber-9",
                position: "bottom",
                message: error.data.message
              });
            });
        }
      },
       tidSearch(terms, done) {
  
        this.FETCH_AGGREGATOR_TID(terms)
          .then(() => {
            done(this.getAllAggregatorTids, terms);
          })
          .catch(() => {
            done([]);
          });
      },
      tidSelected(request){
        
        let tidSerialNumber = {
            url: {
              tid: this.formData.tid,
             
            },
        }
         this.FETCH_AGGREGATOR_TID_SERIAL_NUMBER(tidSerialNumber).then(response=>{
           console.log(response.data.data.serial_no)
           this.formData.serialNumber=response.data.data.serial_no;
         })
  
      
      
      //  COMMON_FILTER_FUNCTION(arraySet, terms) {
      //   return _.filter(arraySet, function(oo) {
      //     return oo.label.toString().includes(terms.toLowerCase());
      //   });
      // },
  
  
    }
  }
  }
  </script>
  