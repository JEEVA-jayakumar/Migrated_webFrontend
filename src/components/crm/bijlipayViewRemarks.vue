<template>
    <div>
      <q-dialog v-model="opened" class="q-mt-lg capitalize" @hide="emitToggleViewRemarks" @escape-key="emitToggleViewRemarks"
        :content-css="{minWidth:'30vw',padding:'20px'}">
        <div class="row items-center bottom-border q-py-sm">
          <div class="col">Add Remarks</div>
          <div class="col-auto">
            <q-btn round size="sm" @click="emitToggleViewRemarks" outline color="dark" icon="clear" />
          </div>
  
        </div>
  
        <!-- START >> Lead information -->
        <div>
          <div>
            <q-scroll-area style="width: 300px; height: 150px;">
              <q-input class="row" v-model="area"  type="textarea" float-label="Add remarks" />
              <div class="row">
                <!-- <div class="col-md-4"></div> -->
                <div class="col-md-4"/>
                <div class="col-md-4 offset-md-4">
                  <div class="column" style="height: 25px">
                    <div class="col">
                    </div>
                  </div>
                    <q-btn color="purple" label="Submit" />
                  </div>
                </div>
  
            </q-scroll-area>
          </div>
        </div>
        <!-- END >> Lead information -->
      </q-dialog>
    </div>
  </template>
    
  <script>
  import { mapGetters, mapActions } from "vuex";
  export default {
    props: ["viewRemarksInfo", "propToggleViewRemarksPop"],
    data() {
      return {
        opened: this.propToggleViewRemarksPop,
        request: {
          comment: ""
        },
      };
  
    },
    // created() {
    //   this.ajaxLoadShortLeadInfo();
    // },
    // computed: {
    //   ...mapGetters("SatLeadValidation", ["getShortLeadInfo"])
    // },
  
    methods: {
      //   ...mapActions("SatLeadValidation", ["FETCH_SHORT_LEAD_DATA"]),
      //   //Function to load all lead details
      //   ajaxLoadShortLeadInfo() {
      //     this.$q.loading.show({
      //       delay: 0, // ms
      //       spinnerColor: "purple-9",
      //       message: "Fetching data .."
      //     });
      //     this.FETCH_SHORT_LEAD_DATA(
      //       this.leadInformation.leadId || this.leadInformation.id
      //     )
      //       .then(response => {
      //         this.propLeadInformation = this.getShortLeadInfo;
      //         this.$q.loading.hide();
      //       })
      //       .catch(() => {
      //         this.$q.loading.hide();
      //       });
      //   },
      emitToggleViewRemarks() {
        this.$emit("closeViewRemarksInfo");
      }
    }
  };
  </script>
    
  <style>
  
  </style>
    