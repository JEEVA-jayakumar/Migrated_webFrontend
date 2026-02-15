<template>
    <q-page>
      <div class="row">
        <div class="col-12 text-h6 q-pa-md text-weight-regular bottom-border"></div>
        <div class="col-md-5 col-sm-4 col-xs-12 q-pa-sm">
          <div class="text-h6 q-px-lg q-py-md text-weight-regular bottom-border text-grey-9"><strong>MARS API SYNC - RENTAL PLAN</strong>
          </div>
          <q-card style="width:1047px">
            <q-card-section>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <q-list no-border>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <q-item>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <q-item-section>
                   <textarea 
                   disabled 
                   id="textboxid" 
                   name="textboxid" 
                   rows="5" 
                   cols="50" 
                   v-model="formData.tokenRentalPlan"
                   class="text-weight-regular text-grey-8"
                   ></textarea>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          <q-card-section>
                  <q-item-section align="center">
                    <q-btn class="common-btn"
              color="purple-9" toggle-color="primary" size="15px" label="Submit"
                @click="fnFinalSubmit(formData)" />
              </q-item-section>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </q-page>
  </template>
  
  <script>


  import {
    required,
    minLength,
    maxLength,
    maxValue,
    minValue,
    alphaNum,
    email
  } from "@vuelidate/validators";
  import { mapGetters, mapActions } from "vuex";

  
  export default {
    props: ["info"],
    components: {
    },
    data() {
      return {
        formData: {
            tokenRentalPlan: "101",
        }
      };
    },
    beforeMount() {
    console.log(
      "RENTAL PLAN NII DETAILS--------->>>>",
      this.formData.tokenRentalPlan
    );
  },
    computed: {
      ...mapGetters("MarsApiSync", ["getdeviceMars"]),
    },
    methods: {
      ...mapActions("MarsApiSync", ["RENTAL_PLAN_MARS"]),
  
      fnFinalSubmit(request) {
        console.log("fnFinalSubmit-------------->>>>",JSON.stringify(request.tokenRentalPlan))
          this.$q.loading.show({
            delay: 0, // ms
            spinnerColor: "purple-9",
            message: "Submitting data.."
          });
          this.RENTAL_PLAN_MARS (this.formData.tokenRentalPlan)
            .then(response => {
              this.$q.loading.hide();
              this.$q.notify({
                color: "positive",
                position: "bottom",
                message: "Successfully created!",
                icon: "thumb_up"
              });
            })
            .catch(error => {
              this.$q.loading.hide();
              this.$q.notify({
                color: "negative",
                position: "bottom",
                message: "Please try again later!",
                icon: "thumb_down"
              });
            });
      }
    }
  };
  </script>
  
  <style>
  p {
    text-indent: 30px;
  }
  
  label{
          margin-right: 20px;
      }
      
  #textboxid
  {
    height:119px;
    width: 97%;
    font-size:14pt;
  }
  
  .center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  border: 3px solid green; 
  }
  </style>
  