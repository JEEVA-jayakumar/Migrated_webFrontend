<template>
  <div class="q-py-xs group text-caption">
    <q-chip color="primary">value</q-chip>
    <span>{{error.value}}</span>
    <br>
    <q-chip color="amber-9">Issue</q-chip>
    <span>{{error.issue}}</span>
  </div>
</template>

<script>
export default {
  props: ["error"],
  filters: {
    sliceString(value) {
      if (!value) return "";
      return value.slice(0, 100);
    }
  }
};
</script>

<style>
</style>
