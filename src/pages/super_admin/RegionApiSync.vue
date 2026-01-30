<template>
    <q-page>
      <div class="row">
        <div class="col-12 q-title q-pa-md text-weight-regular bottom-border"></div>
        <div class="col-md-5 col-sm-4 col-xs-12 q-pa-sm">
          <div class="q-title q-px-lg q-py-md text-weight-regular bottom-border text-grey-9"><strong>MARS API SYNC - REGION</strong>
          </div>
          <q-card style="width:1047px">
            <q-card-main>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <q-list no-border>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <q-item>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <q-item-main>
                   <textarea 
                   disabled 
                   id="textboxid" 
                   name="textboxid" 
                   rows="5" 
                   cols="50" 
                   v-model="formData.tokenRegion"
                   class="text-weight-regular text-grey-8"
                   ></textarea>
                  </q-item-main>
                </q-item>
              </q-list>
            </q-card-main>
          <q-card-main>
                  <q-item-main align="center">
              <q-btn class="common-btn"
              color="purple-9" :disabled="this.formData.tokenRegion == ''" toggle-color="primary" size="15px" label="Submit"
                @click="fnFinalSubmit(formData)" />
              </q-item-main>
            </q-card-main>
          </q-card>
        </div>
      </div>
    </q-page>
  </template>
  <script>
  import { request } from "http";
  import Vue from "vue";
  import Vuelidate from "vuelidate";
  import {
    required,
    minLength,
    maxLength,
    maxValue,
    minValue,
    alphaNum,
    email
  } from "vuelidate/lib/validators";
  import { mapGetters, mapActions } from "vuex";
  Vue.use(Vuelidate)
  
  export default {
    props: ["info"],
    components: {
    },
    data() {
      return {
        formData: {
            tokenRegion: "Token " + localStorage.getItem("auth_token"),
        }
      };
    },
  
    validations: {
      formData: {
        tokenRegion: {
          required
        },
      }
    },
    beforeMount() {
    console.log(
      "REGION AUTH_TOKEN DETAILS--------->>>>",
      this.formData.tokenRegion
    );
  },
    computed: {
      ...mapGetters("MarsApiSync", ["getregionMars"]),
    },
  
    methods: {
      ...mapActions("MarsApiSync", ["REGION_MARS"]),
  
      fnFinalSubmit(request) {
        // console.log("fnFinalSubmit-------------->>>>",JSON.stringify(request.tokenRegion))
        this.$v.formData.$touch();
        if (this.$v.formData.$error) {
          this.$q.notify("Please review fields again.");
        } else {
          // let requestParams = {
          //   token : this.formData.tokenRegion,
          // };
          this.$q.loading.show({
            delay: 0, // ms
            spinnerColor: "purple-9",
            message: "Submitting data.."
          });
          this.REGION_MARS(this.formData.tokenRegion)
            .then(response => {
              this.$q.loading.hide();
              this.$q.notify({
                color: "positive",
                position: "bottom",
                message: "Successfully created!",
                icon: "thumb_up"
              });
            })
            .catch(() => {
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
  