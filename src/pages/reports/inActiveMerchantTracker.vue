<template>
  <q-page>
    <div>
      <!--START: table title -->
      <div class="col-md-12 text-h6 q-px-md q-py-md text-weight-regular bottom-border text-grey-9">Inactive Merchant Tracker</div>
      <div class="row q-pa-md">
        <div class="col-6 group">
          <p>Choose one from the below or you can choose start and end date manually</p>
          <q-radio color="grey-9" v-model="formData.option" @input="calculateDate" :val="1" label="Past 6 months"/>
          <q-radio color="grey-9" v-model="formData.option" @input="calculateDate" :val="2" label="Past 3 months"/>
          <q-radio color="grey-9" v-model="formData.option" @input="calculateDate" :val="3" label="Past 1 month"/>
          <q-radio color="grey-9" v-model="formData.option" @input="calculateDate" :val="4" label="Past 4 weeks"/>
          <q-radio color="grey-9" v-model="formData.option" @input="calculateDate" :val="5" label="Past 3 weeks"/>
          <q-radio color="grey-9" v-model="formData.option" @input="calculateDate" :val="6" label="Past 2 weeks"/>
          <q-radio color="grey-9" v-model="formData.option" @input="calculateDate" :val="7" label="Past 1 week"/>
          <q-radio color="grey-9" v-model="formData.option" @input="calculateDate" :val="8" label="Today"/>
        </div>
      </div>
      <div class="row q-pa-md">
        <div class="col-6 group">
          <q-input type="date" modal v-model="formData.from" color="grey-9" float-label="Start date"/>
          <q-input type="date" modal v-model="formData.to" color="grey-9" float-label="End date"/>
        </div>
        <div class="col-12 group">
          <q-btn class="common-dark-blue" @click="downloadReport()" label="Download" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { or, and } from '@vuelidate/validators';
import { mapGetters, mapActions } from "vuex";
import { date } from "quasar";
export default {
  // name: 'PageName',
  data() {
    return {
      formData: {
        option: 8,
        from: new Date(),
        to: new Date(),
      },
    };
  },
  methods: {
    ...mapActions("reports", ["REPORT_INACTIVE_MERCHANT"]),
    calculateDate() {
      let now = new Date();
      let newDate = new Date();
      if (this.formData.option == 1) {
        newDate = date.subtractFromDate(now, {
          month: 6,
        });
      } else if (this.formData.option == 2) {
        newDate = date.subtractFromDate(now, {
          month: 3,
        });
      } else if (this.formData.option == 3) {
        newDate = date.subtractFromDate(now, {
          month: 1,
        });
      } else if (this.formData.option == 4) {
        newDate = date.subtractFromDate(now, {
          days: 28,
        });
      } else if (this.formData.option == 5) {
        newDate = date.subtractFromDate(now, {
          days: 21,
        });
      } else if (this.formData.option == 6) {
        newDate = date.subtractFromDate(now, {
          days: 14,
        });
      } else if (this.formData.option == 7) {
        newDate = date.subtractFromDate(now, {
          days: 7,
        });
      } else {
        newDate = new Date();
      }
      this.formData.from = newDate;
      this.formData.to = now;
    },
    downloadReport() {
      this.$q.loading.show({
        delay: 100, // ms
      });
      this.REPORT_INACTIVE_MERCHANT(this.formData)
        .then(() => {
          this.$q.loading.hide();
          this.$q.notify({
            color: "positive",
            position: "bottom",
            message: "Success, file has been downloaded",
            icon: "check",
          });
        })
        .catch(error => {
          this.$q.loading.hide();
          this.$q.notify({
            color: "negative",
            position: "bottom",
            message: "Please try again",
            icon: "thumb_down",
          });
        });
    },
  },
};
</script>

<style>
</style>
