<template>
  <q-page>
    <!-- content -->
    <div>

      <!--START: page title -->
      <div class="row">
        <div class="col-md-12 text-h6 q-px-lg q-py-md text-weight-regular bottom-border text-grey-9">Statement View</div>
      </div>
      <!--END: page title -->

      <div class="q-px-lg q-py-md gutter-y-sm">

        <div class="row ">
          <div class="col-md-6 text-grey-9">
            <q-input 
              color="grey-9"
              float-label="TID" 
              v-model="formData.statementDetails.tid" 
            />
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 text-grey-9">
            <q-input 
              color="grey-9"
              float-label="MID" 
              v-model="formData.statementDetails.mid" 
            />
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 text-grey-9">
              <q-field
                icon="date_range"
              >
                <q-input
                   v-model="formData.statementDetails.fromDate" 
                  :min="today"
                  float-label="From Date"
                   color="grey-9"
                />
              </q-field>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 text-grey-9">
              <q-field
                icon="date_range"
              >
                <q-input
                  v-model="formData.statementDetails.toDate" 
                  :min="today"
                  float-label="To Date"
                   color="grey-9"
                />
              </q-field>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 text-grey-9">
            <q-btn
              flat
              label="Retrigger"
              class="common-dark-blue"
            />
          </div>
        </div>

      </div>

    </div>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  data() {
    return {
      formData: {
        statementDetails: {
          tid: 122,
          mid: 190,
          fromDate: "22/10/2017",
          toDate: "22/5/2018"
        }
      }
    };
  }
};
</script>

<style>
</style>
