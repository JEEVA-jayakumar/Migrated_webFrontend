<template>
  <div>
    <q-dialog minimized no-backdrop-dismiss v-model="toggleModel" :content-css="{ padding: '30px', minWidth: '40vw' }">
      <form>
        <div class="column group">
          <div class="col-md-12">
            <div class="text-h6 text-weight-regular">
              <p align="center">
                <strong>POS INVENTORY REPORT</strong>
              </p>
            </div>
          </div>
          <div class="col-md-12">
            <q-input hide-underline class="q-mr-lg q-py-sm" v-model="formData.selectedFromYear" :min="yesterday"
              :max="tomorrow" type="date" float-label="Choose Date Range" Format="YYYY-MM-DD" />
          </div>
          <!-- <div class="col-md-12">
            <q-input hide-underline class="q-mr-lg q-py-sm" v-model="formData.selectedToYear" :min="yesterday"
              :max="tomorrow" type="date" float-label="To Date" Format="YYYY-MM-DD" />
          </div> -->
          <div class="col-md-12 group" align="right">
            <q-btn flat align="right" class="bg-white text-weight-regular text-grey-8"
              @click="emitfnshowDeviceHistory()">
              Cancel
            </q-btn>
            <q-btn align="right" @click="downloadHistory(formData)" :disabled="submitDisabled" color="purple-9">
              Download
            </q-btn>
          </div>
        </div>
      </form>
    </q-dialog>
  </div>
</template>

<script>


  import { date } from "quasar";
  import { mapActions } from "vuex";



  const today = new Date();
  const { startOfDate, addToDate, subtractFromDate } = date;

  export default {
    props: ["propDeviceHistoryReport"],
    data() {
      return {
        toggleModel: this.propDeviceHistoryReport,
        tomorrow: addToDate(today, { days: 0 }),
        yesterday: subtractFromDate(today, { days: 1440 }),
        state: new Date(),
        defaultValue: startOfDate(today, "year"),
        yearOptions: this.generateYearOptions(),
        yearOptionsTo: [],
        formData: {
          selectedFromYear: "",
          // selectedToYear: ""
        }
      };
    },
    watch: {
      // 'formData.selectedFromYear': function (newValue) {
      //   // Update the options for the 'To Year' select
      //   this.updateToYearOptions(newValue);
      // }
    },
    computed: {
      submitDisabled() {
        return (this.formData.selectedFromYear != 0) ;
        // return (this.formData.selectedFromYear != 0 && this.formData.selectedToYear != 0) ;
      }
    },
    methods: {
      ...mapActions("DownloadPosInventoryReport", [
        "FETCH_POS_INVENTORY_REPORTS"
      ]),
      emitfnshowDeviceHistory() {
        this.$emit("emitfnshowDeviceHistory");
      },
      // updateToYearOptions(selectedFromYear) {
      //   this.yearOptionsTo = this.yearOptions.filter(year => year.value >= selectedFromYear);
      //   if (this.formData.selectedToYear < selectedFromYear) {
      //     this.formData.selectedToYear = '';
      //   }
      // },
      downloadHistory(request) {
        console.log("request --->", request)

        function formatToYYYYMMDD(dateString) {
          const date = new Date(dateString);
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
          const day = String(date.getDate()).padStart(2, '0');
          return `${year}-${month}-${day}`;
        }

        const formattedFromYear = formatToYYYYMMDD(request.selectedFromYear);
        // const formattedToYear = formatToYYYYMMDD(request.selectedToYear);

        console.log("Formatted From Year:", formattedFromYear);
        // console.log("Formatted To Year:", formattedToYear);
        let params = {
          from: formattedFromYear,
          // to: formattedToYear,
        };
        this.$q.loading.show({
          delay: 100,
          spinnerColor: "purple-9",
          message: "Please wait..",
        });
        this.FETCH_POS_INVENTORY_REPORTS(params)
          .then((response) => {

            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Successfully Downloaded",
              icon: "thumb_up",
            });
            this.$emit("emitfnshowDeviceHistory");
            this.$q.loading.hide();
            this.formData.selectedFromYear = "";
            // this.formData.selectedToYear = "";
          })
          .catch((error) => {
            this.$q.loading.hide();
            let errorMessage = "Please select the field";
            if (error.status === 400) {
              errorMessage = "Output file size is high, select a smaller date range";
            } else if (error.status === 500) {
              errorMessage = "INTERNAL_SERVER_ERROR";
            } else if (error.status === 403) {
              errorMessage = "Please choose another date";
            }
            this.$q.notify({
              color: "amber",
              position: "bottom",
              message: errorMessage,
              icon: "thumb_down",
            });
            this.formData.selectedFromYear = "";
            // this.formData.selectedToYear = "";
          });
      },
      generateYearOptions() {
        const currentYear = new Date().getFullYear();
        const startYear = 2000;
        const years = [];
        for (let year = startYear; year <= currentYear; year++) {
          years.push({ label: year.toString(), value: year });
        }
        return years;
      }
    }
  };
</script>

<style scoped>
  .error {
    color: red;
    font-size: 12px;
    position: absolute;
    text-transform: lowercase;
  }
</style>