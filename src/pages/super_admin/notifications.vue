<template>
  <div>
    <div class="col-12 text-h6 q-my-lg text-weight-regular"><strong>Notifications</strong></div>
    <form>
      <div class="q-px-md">
        <div class="q-pa-md">
          <div class="row gutter-sm q-py-sm">
            <div class="col-md-6">
              <q-select
                v-model.trim="formData.categoryType"
                @blur="$v.formData.categoryType.$touch"
                :error="$v.formData.categoryType.$error"
                class="text-weight-regular text-grey-8"
                :options="leadSourceOptions"
                float-label="*Notification Category"
                placeholder="Notification Category"
              />
            </div>
            <div class="col-md-6">
              <q-chips-input  @blur="$v.formData.tids.$touch" :error="$v.formData.tids.$error"
                            clearable
                            color="grey-9"
                            v-model.trim="formData.tids"
                            float-label="TID"
                            placeholder="Search TID"
                          >
                            <q-autocomplete
                              @search="tidsearch"
                              :debounce="500"
                              :min-characters="1"
                             
                            />
                          </q-chips-input>
            </div>

            <div class="col-md-7">
              <q-input
                v-model.trim="formData.notificationText"
                @blur="$v.formData.notificationText.$touch"
                :error="$v.formData.notificationText.$error"
                class="text-weight-regular text-grey-8"
                color="grey-9"
                float-label="*Notification Text"
              />
            </div>
            <div class="col-md-5">
                    <q-btn
          size="md"
          type="button"
          color="purple-9"
          @click="fnSaveMerchant(formData)"
        >Submit</q-btn>
        </div>
          </div>
        </div>
      </div>
    </form>

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
      
      leadSourceOptions: [
        {
         label:"Offers",
         value:3
        },
        {
         label:"Risk Hold",
         value:1

        },
        {

         label:"Paper Roll",
         value:2
        }
      ],

      formData: {
       
        categoryType: "",
        tids:[],
        notificationText:"",
      }
    };
  },

  validations: {
    formData: {
      categoryType: {
        required
      },
      tids:{
        required
      },
      notificationText: {
        required
      },
      
    }
  },
  computed: {
    ...mapGetters("leadSource", ["getActiveLeadSource"]),
      ...mapGetters("Merchant", [
      "getMerchantTid"
    ]),
  },
  methods: {
    ...mapActions("leadSource", ["LEAD_SOURCE_ACTIVE_LIST"]),
     ...mapActions("Merchant", ["FETCH_ALL_MERCHANTTID","SAVE_MERCHANT"]),
    fnSaveMerchant(formData) {
      this.$v.formData.$touch();
      if (this.$v.formData.$error) {
        this.$q.notify("Please review fields again.");
        return;
      } else {
        this.SAVE_MERCHANT(formData)
          .then(response => {
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: response.data.message,
              icon: "thumb_up"
            });
           this.formData.categoryType="",
           this.formData.tids="",
           this.formData.notificationText=""
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
    tidsearch(terms, done) {
      this.FETCH_ALL_MERCHANTTID(terms)
        .then(() => {
          done(this.getMerchantTid, terms);
        })
        .catch(() => {
          done([]);
        });
    },

    // bankcitySelected(){

    // },

    COMMON_FILTER_FUNCTION(arraySet, terms) {
      return _.filter(arraySet, function(oo) {
        return oo.label.toString().includes(terms.toLowerCase());
      });
    },

  }
};
</script>
