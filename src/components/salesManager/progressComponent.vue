<template>
  <div id="app">
    <p>
      A Vue.js component to draw animated circular progress bars!
    </p>
      <vue-circle
        :progress="50"
        :size="100"
        :reverse="false"
        line-cap="round"
        :fill="fill"
        empty-fill="rgba(0, 0, 0, .1)"
        :animation-start-value="0.0"
        :start-angle="0"
        insert-mode="append"
        :thickness="5"
        :show-percent="true"
        @vue-circle-progress="progress"
        @vue-circle-end="progress_end">
          <p>Slot!</p>
      </vue-circle>
  </div>
</template>
 
<script>
import VueCircle from "vue2-circle-progress";
export default {
  components: {
    VueCircle
  },
  data() {
    return {
      fill: { gradient: ["red", "green", "blue"] }
    };
  },
  methods: {
    progress(event, progress, stepValue) {
    },
    progress_end(event) {
    }
  }
};
</script>
