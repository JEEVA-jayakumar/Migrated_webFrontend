<template>
  <div>
    <q-select
      placeholder="Choose from the below*"
      color="grey-9"
      @blur="$v.merchant.salesInformation.salesPersonCode.$touch"
      :error="$v.merchant.salesInformation.salesPersonCode.$error"
      v-model="merchant.salesInformation.salesPersonCode"
      float-label="Sales Person*"
      :options="salesPersonOptions"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>

