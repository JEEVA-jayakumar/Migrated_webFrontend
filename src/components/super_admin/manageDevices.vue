<template>
  <q-dialog v-model="opened">
    <h4>Basic Modal</h4>
    <q-btn
      color="primary"
      @click="opened = false"
      label="Close"
    />
  </q-dialog>
</template>

<script>
export default {
  name: "Manage Devices",
  data() {
    return {};
  },
};
</script>

<style>
</style>
