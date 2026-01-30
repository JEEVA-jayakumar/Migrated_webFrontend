import { Bar } from "vue-chartjs";
import { mapGetters, mapActions } from "vuex";
export default {
  extends: Bar,
  props: ["merchantTrackerData"],
  mounted() {
    this.loadAgingGraphData();
  },
  methods: {
    loadAgingGraphData() {
      let labels = this.merchantTrackerData.xAxis.categories;
      let datasets = this.merchantTrackerData.series;
      let yAxisLabel = this.merchantTrackerData.yAxis.title.text;
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
    },
  },
};
