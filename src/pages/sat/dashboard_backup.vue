<template>
  <q-page>
    <!-- content -->
    <div>
      <div class="row items-stretch">
        <div class="col-md-8">
          <div class="row">
            <div class="col-md-4">
              <q-card flat class="q-ma-sm">
                <q-list>
                  <q-item class="bg-purple-9 q-pa-md border-radius-10">
                    <q-item-section>
                      <q-item-label
                        color="white"
                        class="text-weight-medium q-display-1 text-center"
                      >28</q-item-label>
                      <q-item-label color="white" class="text-weight-light text-center">
                        <small>Total</small>
                      </q-item-label>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label color="white" class="q-mx-lg">
                        <div class="text-weight-light">Exception</div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item class="q-pa-xs">
                    <q-item-section class="shadow-1 q-pa-md">
                      <div class="row">
                        <div class="col-4">
                          <p class="text-caption">KYC Exception</p>
                        </div>
                        <div class="col-4">
                          <p class="text-caption">Pricing Exception</p>
                        </div>
                        <div class="col-4">
                          <p class="text-caption">Bank Subvention</p>
                        </div>
                      </div>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card>
            </div>
            <div class="col-md-4">
              <q-card flat class="q-ma-sm">
                <q-list>
                  <q-item class="bg-purple-9 q-pa-md border-radius-10">
                    <q-item-section>
                      <q-item-label
                        color="white"
                        class="text-weight-medium q-display-1 text-center"
                      >100</q-item-label>
                      <q-item-label color="white" class="text-weight-light text-center">
                        <small>Total</small>
                      </q-item-label>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label
                        color="white"
                        class="q-mx-lg text-weight-light"
                      >Inventory Allocation</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item class="q-pa-xs">
                    <q-item-section class="shadow-1 q-pa-md">
                      <div class="row">
                        <div class="col-4">
                          <p class="text-caption">Allocated Devices</p>
                        </div>
                        <div class="col-4">
                          <p class="text-caption">Pending Devices</p>
                        </div>
                        <div class="col-4">
                          <p class="text-caption">Damaged Devices</p>
                        </div>
                      </div>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card>
            </div>
            <div class="col-md-4">
              <q-card flat class="q-ma-sm">
                <q-list>
                  <q-item class="bg-purple-9 q-pa-md border-radius-10">
                    <q-item-section>
                      <q-item-label
                        color="white"
                        class="text-center text-weight-medium q-display-1"
                      >28</q-item-label>
                      <q-item-label color="white" class="text-weight-light text-center">
                        <small>Total</small>
                      </q-item-label>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label color="white" class="q-mx-lg text-weight-light">Implementation</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item class="q-pa-xs">
                    <q-item-section class="shadow-1 q-pa-md">
                      <div class="row">
                        <div class="col-6">
                          <p class="text-caption q-ma-none">Allocated/80</p>
                        </div>
                        <div class="col-6">
                          <p class="text-caption q-ma-none">Unallocated/70
                            <q-icon name="fa fa-bell" color="yellow-10"/>
                          </p>
                        </div>
                      </div>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card>
            </div>
          </div>
        </div>

        <div class="col-md-2">
          <q-card flat class="q-ma-sm">
            <q-list class="bg-amber-7 q-pa-md border-radius-10">
              <q-item>
                <q-item-section>
                  <q-item-label color="white" class="text-weight-medium q-display-1 text-center">
                    <div class="q-display-1">150</div>
                    <div class="text-caption">Total</div>
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label color="white" class="text-center">
                    <div class="text-weight-light text-subtitle1">Application Pending</div>
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "dashoboard"
};
</script>

<style scoped>
.border-radius-10 {
  border-radius: 8px !important;
}
.q-item-main.q-item-section.shadow-1.q-pa-md {
  min-height: 80px;
}
</style>
