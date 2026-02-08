<template>
    <div>
      <q-dialog
        minimized
        v-model="toggleModel"
        @hide="emitfnshowEditCsSubIssue"
        @escape-key="emitfnshowEditCsSubIssue"
        class="customModalOverlay"
        :content-css="{ padding: '30px', minWidth: '30vw' }"
      >
        <form>
          <div class="row gutter-sm q-py-sm items-center">
            <div class="col-md-12">
              <div class="text-h6 text-weight-regular">
                Modify CS Sub Issue
              </div>
            </div>
            
          </div>
          <div class="row gutter-sm q-py-sm items-center">
            <div class="col-md-12">
              <q-input
                v-model="formData.name"
                :error="$v.formData.name.$error"
                class="text-weight-regular text-grey-8"
                color="grey-9"
                float-label="Enter CS Sub Issue"
                placeholder="Enter CS Sub Issue"
              />
            </div>
          </div>
          <div class="row gutter-sm q-py-sm items-center">
            <div class="col-md-12 group" align="right">
              <q-btn
                flat
                align="right"
                class="bg-white text-weight-regular text-grey-8"
                @click="emitfnshowEditCsSubIssue()"
                >Cancel</q-btn
              >
              <q-btn
                align="right"
                @click="fnfinalsubmitCsSubIssue(formData)"
                color="purple-9"
                >Save</q-btn
              >
            </div>
          </div>
        </form>
      </q-dialog>
       <!--START: Show Sub Task Details-->
       <showServiceSubTaskDetails
          v-if="propShowServiceSubTaskDetails"
          :propShowServiceSubTaskDetails="propShowServiceSubTaskDetails"
          :propRowDetails="propRowDetails"
          @emitfnshowServiceSubTaskDetails="fnShowSubTaskDetails"
        />
         <!-- END: Show Sub Task Details -->
    </div>
  </template>
  
  <script>
  import { required } from "@vuelidate/validators";
  import { mapGetters, mapActions } from "vuex";
  import showServiceSubTaskDetails from  "../../components/super_admin/showServiceSubTaskDetails.vue";
  
  export default {
       components: {
      showServiceSubTaskDetails,
    },
    props: ["propShowEditCsSubIssue", "propRowDetails1"],
    data() {
      return {
        toggleModel: this.propShowEditCsSubIssue,
        propShowServiceSubTaskDetails: false,
        // regionGroup: [],
        formData: {
          
          name: JSON.stringify(this.propRowDetails1.issueReason)
        }
      };
    },
  
    validations: {
      formData: {
        // id: {
        //   required
        // },
        name: {
          required
        }
      }
    },
    beforeMount() {
      console.log(
        "Getter propShowEditSpareParts 123456Name---------------->" +
          JSON.stringify(this.propRowDetails1)
      );
      // console.log("Prop details---------------->"+JSON.stringify(this.propShowEditRegions))
      //  console.log("Prop Row details---------------->"+JSON.stringify(this.propRowDetails1))
      // this.formData.id = this.propRowDetails1.id;
      this.formData.name = this.propRowDetails1.name;
      // //  AllRegionName( this.formData.regionGroupName = this.propRowDetails.regionGroup.regionName)
      // this.AllRegionName();
      //   console.log("Region Name---------------->"+JSON.stringify(this.formData.regionGroupName))
    },
    // computed: {
    //   ...mapGetters("SuperAdminUsers", ["getAllRegionsData"])
    // },
    methods: {
      ...mapActions("serviceRequest", ["EDIT_CS_SUB_ISSUE"]),
      emitfnshowEditCsSubIssue() {
        this.$emit("emitfnshowEditCsSubIssue");
      },
       fnShowSubTaskDetails(rowDetails){
        this.propShowServiceSubTaskDetails = !this.propShowServiceSubTaskDetails;
        this.propRowDetails = rowDetails;
      },
      fnfinalsubmitCsSubIssue(formData) {
        this.$v.formData.$touch();
        if (this.$v.formData.$error) {
          this.$q.notify("Please review fields again.");
        } else {
          this.$q.loading.show();
          let param = {
           id: JSON.stringify(this.propRowDetails1.id),
            request: this.formData
          };
          this.EDIT_CS_SUB_ISSUE(param)
            .then(() => {
              this.$q.loading.hide();
              this.$q.notify({
                color: "positive",
                position: "bottom",
                message: "Successfully updated!",
                icon: "thumb_up"
              });
              this.emitfnshowEditCsSubIssue();
            })
            .catch(error => {
              this.$q.loading.hide();
              this.$q.notify({
                color: "negative",
                position: "bottom",
                message:
                  error.body.message == null
                    ? "Please Try Again Later !"
                    : error.body.message,
                icon: "thumb_down"
              });
            });
        }
      }
    }
  };
  </script>
  