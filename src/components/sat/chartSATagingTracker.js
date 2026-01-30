import { Bar } from "vue-chartjs";
import { mapGetters, mapActions } from "vuex";
export default {
  extends: Bar,
  mounted() {
    this.loadAgingGraphData();
  },
  computed: {
    ...mapGetters("SAT_Dashboard", ["getSatDashboardAgingGraphData"]),
  },
  methods: {
    ...mapActions("SAT_Dashboard", ["FETCH_DASHBOARD_AGING_CHART_DATA"]),
    loadAgingGraphData() {
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data ..",
      });
      this.FETCH_DASHBOARD_AGING_CHART_DATA({
        region: JSON.parse(localStorage.getItem("u_i")).region.id,
      })
        .then(() => {
          let labels = this.getSatDashboardAgingGraphData.xAxis.categories;
          let datasets = this.getSatDashboardAgingGraphData.series;
          let yAxisLabel = this.getSatDashboardAgingGraphData.yAxis.title.text;
          // Overwriting base render method with actual data.
          this.renderChart(
            {
              labels: labels,
              datasets: datasets,
            },
            {
              scales: {
                yAxes: [
                  {
                    display: true,
                    scaleLabel: {
                      display: true,
                      labelString: yAxisLabel,
                      padding: 1,
                    },
                  },
                ],
              },
            }
          );
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },
  },
};
