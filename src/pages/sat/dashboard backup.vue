<template>
  <q-page>
    <!--START: content -->
    <div class="q-pa-md">
      <!-- START: Dashboard wrapper -->
      <div class="row gutter-x-xs">
        <div class="col-lg-8">
          <div class="row gutter-x-xs">
            <div class="col-lg-4 col-md-6 col-sm-12">
              <div>
                <q-card class="border-radius-10 q-py-xs" color="purple-9">
                  <q-list>
                    <q-item>
                      <q-item-section>
                        <q-item-label color="white">
                          <div class="lg-q-display-1 sm-text-caption text-center">100</div>
                          <div class="text-caption text-weight-light text-center">Total</div>
                        </q-item-label>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>
                          <div
                            class="lg-text-h6 sm-text-caption text-weight-light text-center"
                          >Exception</div>
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card>
                <q-list>
                  <q-item>
                    <q-item-section>
                      <div class="row">
                        <div class="col-md-4 q-my-xs">
                          <div class="text-caption">KYC Exception</div>
                          <q-chip class="custom_chip_progress" color="purple-9">1</q-chip>
                        </div>
                        <div class="col-md-4 q-my-xs">
                          <div class="text-caption">Pricing Exception</div>
                          <q-chip class="custom_chip_progress" color="purple-9">1</q-chip>
                        </div>
                        <div class="col-md-4 q-my-xs">
                          <div class="text-caption">Bank Subvention</div>
                          <q-chip class="custom_chip_progress" color="purple-9">1</q-chip>
                        </div>
                      </div>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </div>

            <div class="col-lg-4 col-md-6 col-sm-12">
              <div>
                <q-card class="border-radius-10 q-py-xs" color="purple-9">
                  <q-list>
                    <q-item>
                      <q-item-section>
                        <q-item-label color="white">
                          <div class="lg-q-display-1 sm-text-caption text-center">100</div>
                          <div class="text-caption text-weight-light text-center">Total</div>
                        </q-item-label>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>
                          <div
                            class="lg-text-h6 sm-text-caption text-weight-light text-center"
                          >Inventory Allocation</div>
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card>
                <q-list>
                  <q-item>
                    <q-item-section>
                      <div class="row">
                        <div class="col-md-4 q-my-xs">
                          <div class="text-caption">KYC Exception</div>
                          <q-chip class="custom_chip_progress" color="purple-9">1</q-chip>
                        </div>
                        <div class="col-md-4 q-my-xs">
                          <div class="text-caption">Pricing Exception</div>
                          <q-chip class="custom_chip_progress" color="purple-9">1</q-chip>
                        </div>
                        <div class="col-md-4 q-my-xs">
                          <div class="text-caption">Bank Subvention</div>
                          <q-chip class="custom_chip_progress" color="purple-9">1</q-chip>
                        </div>
                      </div>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </div>

            <div class="col-lg-4 col-md-6 col-sm-12">
              <div>
                <q-card class="border-radius-10 q-py-xs" color="purple-9">
                  <q-list>
                    <q-item>
                      <q-item-section>
                        <q-item-label color="white">
                          <div class="lg-q-display-1 sm-text-caption text-center">100</div>
                          <div class="text-caption text-weight-light text-center">Total</div>
                        </q-item-label>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>
                          <div
                            class="lg-text-h6 sm-text-caption text-weight-light text-center"
                          >Implementation</div>
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card>
                <q-list>
                  <q-item>
                    <q-item-section>
                      <div class="row items-center">
                        <div class="col-md-6 q-my-xs">
                          <div class="text-caption">Allocated/80</div>
                        </div>
                        <div class="col-md-6 q-my-xs">
                          <div class="text-caption text-red">Unallocated/70</div>
                        </div>
                      </div>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </div>
          </div>
          <div class="row gutter-x-xs">
            <div class="col-lg-12">
              <q-card class="q-my-md q-px-md q-py-sm bg-grey-12 round-borders">
                <q-card-section>
                  <div class="text-subtitle1 text-bold">Daily volume graphs</div>
                  <div class="text-caption">01/01/18 to 01/12/18</div>
                </q-card-section>
                <chartDailyVolume
                  :options="{responsive: false, maintainAspectRatio: false}"
                  :height="150"
                  class="bg-white q-pa-md round-borders"
                ></chartDailyVolume>
              </q-card>

              <q-card class="q-my-md q-px-md q-py-sm bg-grey-12 round-borders">
                <q-card-section>
                  <div class="text-subtitle1 text-bold">Merchant Tracker</div>
                  <div class="text-caption">01/01/18 to 01/12/18</div>
                </q-card-section>
                <chartMerchantTracker
                  :borderWidth="1"
                  :height="150"
                  class="bg-white q-pa-md round-borders"
                ></chartMerchantTracker>
              </q-card>
            </div>
          </div>
        </div>

        <div class="col-lg-4">
          <div class="row gutter-sm">
            <div class="col-lg-5">
              <q-card class="q-pa-sm bg-orange border-radius-10" align="center">
                <q-card-section>
                  <div class="text-h6 text-white">150</div>
                  <div class="text-caption text-white">Total</div>
                </q-card-section>
                <q-separator style="width:75px" class="bg-white"/>
                <q-card-section class="q-py-md q-px-none">
                  <p
                    class="md-text-subtitle1 sm-text-caption text-faded text-white"
                    align="center"
                  >Application Pending</p>
                </q-card-section>
              </q-card>
            </div>
            <div class="col-lg-7">
              <div class="row lg-inline gutter-sm">
                <div class="col-lg-12 col-sm-6">
                  <q-card class="bg-green border-radius-10" align="center">
                    <q-card-section class="q-pa-md">
                      <div class="row items-center justify-around">
                        <div
                          class="q-pa-sm"
                          style="border-right: 1px solid rgba(255, 255, 255, 0.5);"
                        >
                          <div class="text-h6 text-white">150</div>
                          <div class="text-caption text-white">Total</div>
                        </div>
                        <div class="q-pa-sm">
                          <div class="md-text-subtitle1 sm-text-caption text-white">NEW</div>
                        </div>
                      </div>
                    </q-card-section>
                  </q-card>
                </div>
                <div class="col-lg-12 col-sm-6">
                  <q-card class="bg-blue-6 border-radius-10" align="center">
                    <q-card-section class="q-pa-md">
                      <div class="row items-center justify-around">
                        <div
                          class="q-pa-sm"
                          style="border-right: 1px solid rgba(255, 255, 255, 0.5);"
                        >
                          <div class="text-h6 text-white">150</div>
                          <div class="text-caption text-white">Total</div>
                        </div>
                        <div class="q-pa-sm">
                          <div class="md-text-subtitle1 sm-text-caption text-white">WIP</div>
                        </div>
                      </div>
                    </q-card-section>
                  </q-card>
                </div>
              </div>
            </div>
          </div>

          <div class="row gutter-sm items-center">
            <div class="col-md-12">
              <div class="text-subtitle1 q-pa-md">Aging Tracker
                <small class="text-warning">Pending</small>
              </div>

              <q-tabs
                v-model="agingTrackerPending.tabsModel"
                inverted
                color="white"
                no-pane-border
                class="relative-position"
              >
                <q-tab
                  class="q-pa-sm"
                  :name="tab.name"
                  slot="title"
                  v-for="tab in          agingTrackerPending.tabs"
                  :key="tab.tabTitle"
                >
                  <q-chip
                    detail
                    :class="[agingTrackerPending.tabsModel === tab.name ? 'customTabActive text-light shadow-3' : 'bg-blue-grey-2 text-dark']"
                    class="q-px-sm q-pa-sm text-caption text-weight-light capitalize"
                  >{{tab.tabTitle}}</q-chip>
                </q-tab>

                <q-tab-panel
                  :name="tabPaneItem.name"
                  v-for="tabPaneItem in agingTrackerPending.tabItems"
                  :key="tabPaneItem.name"
                  class="no-padding"
                >
                  <div class="row">
                    <div class="full-width">
                      <q-list no-border separator class="col-md-12">
                        <q-item
                          class="full-width no-padding q-py-md"
                          v-for="tabItemDetail in tabPaneItem.tabItemDetails"
                          :key="tabItemDetail.title"
                        >
                          <q-item-section left class="col-md-6 col-sm-12">
                            <q-item-label>
                              <div class="text-caption">{{tabItemDetail.title}}</div>
                            </q-item-label>
                            <q-item-label>
                              <div class="text-caption">Created on: {{tabItemDetail.created_date}}</div>
                            </q-item-label>
                            <q-item-label>
                              <div class="text-caption">SO Name: {{tabItemDetail.so_name}}</div>
                            </q-item-label>
                          </q-item-section>
                          <q-item-section></q-item-section>
                          <q-item-section right class="full-width float-right col-md-6 col-sm-12">
                            <q-item-label>
                              <div class="text-caption">
                                <span class="text-primary">
                                  <q-icon
                                    v-if="tabItemDetail.alert"
                                    color="purple-9"
                                    size="8px"
                                    name="fas fa-dot-circle"
                                  />
                                </span>
                              </div>
                            </q-item-label>
                            <q-item-label>
                              <div class="text-caption">
                                <span class="text-primary">#{{tabItemDetail.tid}}</span>
                              </div>
                            </q-item-label>
                            <q-item-label>
                              <div class="text-caption">
                                <span class="text-warning">{{tabItemDetail.status}}</span>
                              </div>
                            </q-item-label>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </div>
                  </div>
                </q-tab-panel>
              </q-tabs>
              <router-link to="/sat/aging/tracker/pending" class="text-grey-8">
                <p>View more</p>
              </router-link>
            </div>
            <div class="col-md-12">
              <div class="text-subtitle1 q-pa-md">Aging Tracker
                <small class="text-negative">Rejected</small>
              </div>
              <q-tabs
                v-model="agingTrackerPending.tabsModel"
                inverted
                color="white"
                no-pane-border
                class="relative-position"
              >
                <q-tab
                  class="q-pa-sm"
                  :name="tab.name"
                  slot="title"
                  v-for="tab in          agingTrackerPending.tabs"
                  :key="tab.tabTitle"
                >
                  <q-chip
                    detail
                    :class="[agingTrackerPending.tabsModel === tab.name ? 'customTabActive text-light shadow-3' : 'bg-blue-grey-2 text-dark']"
                    class="q-px-sm q-pa-sm text-caption text-weight-light capitalize"
                  >{{tab.tabTitle}}</q-chip>
                </q-tab>

                <q-tab-panel
                  :name="tabPaneItem.name"
                  v-for="tabPaneItem in agingTrackerPending.tabItems"
                  :key="tabPaneItem.name"
                  class="no-padding"
                >
                  <div class="row">
                    <div class="full-width">
                      <q-list no-border separator class="col-md-12">
                        <q-item
                          class="full-width no-padding q-py-md"
                          v-for="tabItemDetail in tabPaneItem.tabItemDetails"
                          :key="tabItemDetail.title"
                        >
                          <q-item-section left class="col-md-6 col-sm-12">
                            <q-item-label>
                              <div class="text-caption">{{tabItemDetail.title}}</div>
                            </q-item-label>
                            <q-item-label>
                              <div class="text-caption">Created on: {{tabItemDetail.created_date}}</div>
                            </q-item-label>
                            <q-item-label>
                              <div class="text-caption">SO Name: {{tabItemDetail.so_name}}</div>
                            </q-item-label>
                          </q-item-section>
                          <q-item-section></q-item-section>
                          <q-item-section right class="full-width float-right col-md-6 col-sm-12">
                            <q-item-label>
                              <div class="text-caption">
                                <span class="text-primary">
                                  <q-icon
                                    v-if="tabItemDetail.alert"
                                    color="purple-9"
                                    size="8px"
                                    name="fas fa-dot-circle"
                                  />
                                </span>
                              </div>
                            </q-item-label>
                            <q-item-label>
                              <div class="text-caption">
                                <span class="text-primary">#{{tabItemDetail.tid}}</span>
                              </div>
                            </q-item-label>
                            <q-item-label>
                              <div class="text-caption">
                                <span class="text-warning">{{tabItemDetail.status}}</span>
                              </div>
                            </q-item-label>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </div>
                  </div>
                </q-tab-panel>
              </q-tabs>
              <router-link to="/sat/aging/tracker/pending" class="text-grey-8">
                <p>View more</p>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <!-- END: Dashboard wrapper -->
    </div>
  </q-page>
  <!--END: content -->
</template>

<script>
import chartDailyVolume from "../../components/sat/chartDailyVolume.js";
import chartMerchantTracker from "../../components/sat/chartMerchantTracker.js";

export default {
  name: "dashoboard",
  components: {
    chartDailyVolume,
    chartMerchantTracker
  },
  data() {
    return {
      agingTrackerPending: {
        tabsModel: "tab1",
        tabs: [
          {
            name: "tab1",
            tabTitle: "Finance Approval"
          },
          {
            name: "tab2",
            tabTitle: "Finance Rejection"
          },
          {
            name: "tab3",
            tabTitle: "Finance Pending"
          },
          {
            name: "tab4",
            tabTitle: "Finance Implemented"
          }
        ],
        tabItems: [
          {
            name: "tab1",
            tabItemDetails: [
              {
                alert: false,
                title: "Dominos",
                created_date: "20 Apr, 2018",
                so_name: "Ashokan",
                tid: 554845,
                status: 1
              },
              {
                alert: false,
                title: "Bombay fries",
                created_date: "20 Apr, 2018",
                so_name: "Arun Kumar",
                tid: 554845,
                status: 1
              },
              {
                alert: true,
                title: "Dominos",
                created_date: "20 Apr, 2018",
                so_name: "Ashokan",
                tid: 554845,
                status: 1
              }
            ]
          },
          {
            name: "tab2",
            tabItemDetails: [
              {
                alert: true,
                title: "Bombay fries",
                created_date: "20 Apr, 2018",
                so_name: "Ashokan",
                tid: 554845,
                status: "Implementation Pending"
              },
              {
                alert: false,
                title: "Bombay fries",
                created_date: "20 Apr, 2018",
                so_name: "Arun Kumar",
                tid: 554845,
                status: "Approved"
              },
              {
                alert: false,
                title: "Dominos",
                created_date: "20 Apr, 2018",
                so_name: "Ashokan",
                tid: 554845,
                status: "Rejected"
              }
            ]
          },
          {
            name: "tab3",
            tabItemDetails: [
              {
                alert: true,
                title: "Bombay fries",
                created_date: "20 Apr, 2018",
                so_name: "Ashokan",
                tid: 554845,
                status: "Implementation Pending"
              },
              {
                alert: false,
                title: "Bombay fries",
                created_date: "20 Apr, 2018",
                so_name: "Arun Kumar",
                tid: 554845,
                status: "Approved"
              },
              {
                alert: false,
                title: "Dominos",
                created_date: "20 Apr, 2018",
                so_name: "Ashokan",
                tid: 554845,
                status: "Rejected"
              }
            ]
          },
          {
            name: "tab4",
            tabItemDetails: [
              {
                alert: true,
                title: "Bombay fries",
                created_date: "20 Apr, 2018",
                so_name: "Ashokan",
                tid: 554845,
                status: "Implementation Pending"
              },
              {
                alert: false,
                title: "Bombay fries",
                created_date: "20 Apr, 2018",
                so_name: "Arun Kumar",
                tid: 554845,
                status: "Approved"
              },
              {
                alert: false,
                title: "Dominos",
                created_date: "20 Apr, 2018",
                so_name: "Ashokan",
                tid: 554845,
                status: "Rejected"
              }
            ]
          }
        ]
      }
    };
  }
};
</script>

<style scoped>
.border-radius-10 {
  border-radius: 8px !important;
}
.q-item-main.q-item-section.shadow-1.q-pa-md {
  min-height: 80px;
}
.q-chip.row.no-wrap.inline.items-center.custom_chip_progress.bg-purple-9.text-white {
  height: 35px;
  background: #fff !important;
  color: #333 !important;
  border: 3px solid #691b9a;
  border-radius: 30px;
  width: 35px;
  text-align: center;
}
.customTabActive {
  background: #212c3f;
  color: #fff;
}
</style>
