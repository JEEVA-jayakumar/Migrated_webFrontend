<template>
    <transition
        appear
        v-on:before-enter="beforeEnter"
        v-on:enter="enter"
        v-on:after-enter="afterEnter"
        :duration="{ enter: 200, leave: 100 }"
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        > 
      <router-view />
    </transition>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "LayoutDefault",
  data() {
    return {
      toggleAjaxLoadFilter: true
    };
  },
  computed: {
    ...mapGetters("commonLoader", ["getToggleCommonLoader"])
  },
  methods: {
    ...mapActions("commonLoader", ["TOGGLE_COMMON_LOADER"]),
    beforeEnter: function(el) {
      this.TOGGLE_COMMON_LOADER(true);
    },
    // the done callback is optional when
    // used in combination with CSS
    enter: function(el, done) {
      done();
    },

    afterEnter: function(el) {
      this.TOGGLE_COMMON_LOADER(false);
    }
  }
};
</script>
