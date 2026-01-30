import {
  Bar
} from "vue-chartjs";

export default {
  extends: Bar,
  mounted() {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      datasets: [{
        label: false,
        backgroundColor: "rgb(156, 156, 156)",
        data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
      }],
      options: [{
        responsive: true
      }]
    }, {
      legend: {
        //hides the legend
        display: false
      },
    });
  }
};
