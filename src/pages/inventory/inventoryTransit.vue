<template>
    <q-page>
        <!-- content -->
        <div>
            <div class="row bottom-border q-px-md q-py-md items-center">
                <!--START: table title -->  
                <div class="col-md-12 text-h6 text-weight-regular text-grey-9">Inventory in Transit</div>
                <!--END: table title -->
            </div>
            <div class="row">
              <!--START: table title -->  
              <div class="col-md-4 text-h6 text-weight-regular text-grey-9">
                <div class="row">
                   <div class="col-md-12">
                    <q-list class="no-padding" no-border	separator>
                      <q-item-label header style="border-bottom: 1px solid #ccc;">Device Info</q-item-label header>
                    </q-list>
                   </div>
                   <div class="col-md-12" style="border-right:1px solid #ccc">
                      <q-scroll-area
                        style="height:430px;"
                        :thumb-style="{
                        right: '0px',
                        width: '5px',
                        background:'rgba(0,0,0,0.15)',
                        opacity: 1
                        }"
                        :delay="100"
                      > 
                        <div v-for="i in n=4" :key="i" class="q-pa-md bottom-border cursor-pointer">
                          <div class="row q-my-sm">
                            <div class="col-md-8">
                              <div class="text-caption">
                              POD
                              </div>
                              <div class="text-body1">
                                6354654321231
                              </div>
                            </div>
                            <div class="col-md-4">
                                <div class="text-caption">
                              Region
                              </div>
                              <div class="text-body1">
                                Madurai
                              </div>
                            </div>
                          </div>
                          <div class="row q-my-sm">
                            <div class="col-md-8">
                              <div class="text-caption">
                              mPOS-iob: 25
                              </div>
                              <div class="text-caption">
                              mGPRS-iob: 25
                              </div>
                            </div>
                            <div class="col-md-4">
                                <div class="text-caption">
                              dGPRS-iob: 25
                              </div>
                              <div class="text-caption">
                              mPOS-ab: 25
                              </div>
                            </div>
                          </div>
                        </div>
                     </q-scroll-area>
                   </div>
                </div>
              </div>
              <div class="col-md-8 text-h6 text-weight-regular text-grey-9">
                <div class="row items-center">
                  <div class="col-md-3">
                      <q-list class="no-padding" no-border separator>
                          <q-item-label header style="border-bottom: 1px solid #ccc;">mPOS ({{scannedItems.mpos.length}})</q-item-label header>
                          <q-item v-for="(item,index) in scannedItems.mpos" :key="index">
                              <q-item-section class="text-caption" :label="item" />
                          </q-item>
                      </q-list>
                  </div>
                  <div class="col-md-3">
                      <q-list class="no-padding" no-border	separator>
                          <q-item-label header style="border-bottom: 1px solid #ccc;">GPRS ({{scannedItems.gprs.length}})</q-item-label header>
                          <q-item v-for="(item,index) in scannedItems.gprs" :key="index">
                              <q-item-section class="text-caption" :label="item" />
                          </q-item>
                      </q-list>
                  </div>
                  <div class="col-md-3">
                      <q-list class="no-padding" no-border	separator>
                          <q-item-label header style="border-bottom: 1px solid #ccc;">mGPRS ({{scannedItems.mgprs.length}})</q-item-label header>
                          <q-item v-for="(item,index) in scannedItems.mgprs" :key="index">
                              <q-item-section class="text-caption" :label="item" />
                          </q-item>
                      </q-list>
                  </div>
                  <div class="col-md-3">
                      <q-list class="no-padding" no-border	separator>
                          <q-item-label header style="border-bottom: 1px solid #ccc;">dGPRS ({{scannedItems.dgprs.length}})</q-item-label header>
                          <q-item v-for="(item,index) in scannedItems.dgprs" :key="index">
                              <q-item-section class="text-caption" :label="item" />
                          </q-item>
                      </q-list>
                  </div>
                </div>
              </div>
            </div>
        </div>
	</q-page>
</template>

<script>
export default {
  name: "allocateDevice",
  data() {
    return {
      //Defining columns for table unassigned
      scannedItems: {
        mpos: [
          45645,
          654654,
          65465,
          465465,
          46465,
          654654,
          6464,
          6465,
          464654,
          64654,
          6546546
        ],
        gprs: [
          45645,
          654654,
          65465,
          465465,
          46465,
          654654,
          6464,
          6465,
          464654,
          64654,
          6546546
        ],
        mgprs: [
          45645,
          654654,
          65465,
          465465,
          46465,
          654654,
          6464,
          6465,
          464654,
          64654,
          6546546
        ],
        dgprs: [
          45645,
          654654,
          65465,
          465465,
          46465,
          654654,
          6464,
          6465,
          464654,
          64654,
          6546546
        ]
      }
    };
  },

  methods: {}
};
</script>