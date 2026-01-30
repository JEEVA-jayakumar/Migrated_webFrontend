<template>
    <q-page>
      <!-- content -->
      <div>
        <div class="col-md-12 q-title q-px-lg q-py-md text-weight-regular bottom-border text-grey-9">
       Aggregator Global Serial Number/TID Search
        </div>
        <div class="row gutter-x-xs gutter-y-xs q-pt-md justify-around items-end">
          <div class="col-md-6">
            <q-search clearable color="grey-9" v-model="formData.searchTerm" placeholder="Type.." float-label="Search .."
              class="q-mr-lg q-py-sm" />
          </div>
          <div class="col-md-3">
            <div class="group">
              <q-radio v-for="(item, index) in flagOptions" :key="index" color="grey-9" v-model.trim="formData.flag"
                :val="item.value" :label="item.label" />
            </div>
          </div>
          <div class="col-md-2">
            <q-btn class="auto" size="md" type="button" color="purple-9" @click="globalSearchSubmit(formData)">Submit
            </q-btn>
          </div>
        </div>
      </div>
      <div v-if="tableData.length ==0"
        class="row gutter-x-xs gutter-y-xs justify-center q-pt-lg q-mr-lg q-ml-lg q-mt-lg q-mb-lg dFont"
        style="min-height: calc(80vh - 52px);">
        <div class="row" align="center">
          <q-icon name="warning" color="warning" size="4rem" />
          <div class="q-subheading text-bold text-grey-9" style="align-self: center;">No Data Available</div>
        </div>
      </div>
      <div v-for="tdata in tableData" :key="tdata.id" :to="tdata.to"
        class="row gutter-x-xs gutter-y-xs justify-center q-pt-lg q-mr-lg q-ml-lg q-mt-lg q-mb-lg dFont">
  
        <div class="col-lg-4 col-md-6 col-sm-12">
          <q-card class="q-card q-py-md items-center round-borders q-pa-sm">
            <q-card-title>
              <div class="q-subheading text-bold text-grey-9">Lead Status</div>
            </q-card-title>
            <q-card-separator></q-card-separator>
            <q-card-main>
              <div v-if="tableData.length > 0">
                <div class="row gutter-x-xs gutter-y-xs q-pa-sm text-grey-9">
                  <span class="col-md-4 text-weight-medium">{{
                  filedKeys.leadStatus.leadNumber.label
                  }}</span>
                  <span class="col-md-8 text-wrap text-primary">{{
                  "# " + tdata.leadNumber
                  }}</span>
                </div>
                <div class="row gutter-x-xs gutter-y-xs q-pa-sm text-grey-9">
                  <span class="col-md-4 text-weight-medium">{{
                  filedKeys.leadStatus.leadName.label
                  }}</span>
                  <span class="col-md-8 text-wrap content-center text-weight-regular text-blue-grey-10">{{ tdata.leadName
                  }}</span>
                </div>
                <div class="row gutter-x-xs gutter-y-xs q-pa-sm text-grey-9">
                  <span class="col-md-4 text-weight-medium">{{
                  filedKeys.leadStatus.leadAddress.label
                  }}</span>
                  <span class="col-md-8 text-wrap content-center text-weight-regular text-blue-grey-10">{{
                  tdata.leadAddress }}</span>
                </div>
                <div class="row gutter-x-xs gutter-y-xs q-pa-sm text-grey-9">
                  <span class="col-md-4 text-weight-medium">{{
                  filedKeys.leadStatus.leadDevice.label
                  }}</span>
                  <span class="col-md-8 text-wrap content-center text-weight-regular text-blue-grey-10">{{
                  tdata.leadDevice }}</span>
                </div>
                <div class="row gutter-x-xs gutter-y-xs q-pa-sm text-grey-9">
                  <span class="col-md-4 text-weight-medium">{{
                  filedKeys.leadStatus.leadDeviceCount.label
                  }}</span>
                  <span class="col-md-4">{{ tdata.ledDeviceCount }}</span>
                </div>
                <div class="row gutter-x-xs gutter-y-xs q-pa-sm text-grey-9">
                  <span class="col-md-4 text-weight-medium">{{
                  filedKeys.leadStatus.leadRegionName.label
                  }}</span>
                  <span class="col-md-8 text-wrap content-center text-weight-regular text-blue-grey-10">{{
                  tdata.leadRegionName }}</span>
                </div>
                <div class="row gutter-x-xs gutter-y-xs q-pa-sm text-grey-9">
                  <span class="col-md-4 text-weight-medium">{{
                  filedKeys.leadStatus.leadStatus.label
                  }}</span>
                  <span class="col-md-8 text-wrap content-center text-weight-regular text-blue-grey-10" :style="
                    `background-color:${funcValidate(tdata.leadStatus, 'LS')}; 
                                  border: solid 1px ${funcValidate(tdata.leadStatus, 'LS')}; 
                                  padding: 2px; border-radius: 5px; text-align: center`
                  ">
                    {{ processStatus(tdata.leadStatus, "LS") }}
                  </span>
                </div>
              </div>
            </q-card-main>
          </q-card>
        </div>
        <div class="col-lg-4 col-md-6 col-sm-12">
          <q-card class="q-card q-py-md round-borders q-pa-sm">
            <q-card-title>
              <div class="q-subheading text-bold text-grey-9">Tid Status</div>
            </q-card-title>
            <q-card-separator></q-card-separator>
            <q-card-main>
              <div v-if="tableData.length > 0">
                <div v-if="tdata.tidStatus == 6" class="row gutter-x-xs gutter-y-xs q-pa-sm text-grey-9">
                  <span class="col-md-4 text-weight-medium">{{
                  filedKeys.tidStatus.tid.label
                  }}</span>
                  <span  class="col-md-8 text-wrap text-primary">{{
                  "# " + tdata.tid
                  }}</span>
                </div>
                <div class="row gutter-x-xs gutter-y-xs q-pa-sm text-grey-9">
                  <span class="col-md-4 text-weight-medium">{{
                  filedKeys.tidStatus.tidStatus.label
                  }}</span>
                  <span class="col-md-8 text-wrap content-center text-weight-regular text-blue-grey-10" :style="
                    `background-color:${funcValidate(tdata.tidStatus, 'TS')}; 
                                  border: solid 2px ${funcValidate(tdata.tidStatus, 'TS')}; 
                                  padding: 2px; border-radius: 5px; text-align: center`
                  ">
                    {{ processStatus(tdata.tidStatus, "TS") }}
                  </span>
                </div>
                <div class="row gutter-x-xs gutter-y-xs q-pa-sm text-grey-9">
                  <span class="col-md-4 text-weight-medium">{{
                  filedKeys.tidStatus.tidAssignedTo.label
                  }}</span>
                  <span class="col-md-8 text-wrap content-center text-weight-regular text-blue-grey-10" :style="
                    `background-color:${
                      tdata.tidAssignedTo == 'NA' ? 'springgreen' : 'tomato'
                    }; 
                                  padding: 2px; border-radius: 5px; text-align: center`
                  ">{{ tdata.tidAssignedTo }}</span>
                </div>
                <div class="row gutter-x-xs gutter-y-xs q-pa-sm text-grey-9">
                  <span class="col-md-4 text-weight-medium">{{
                  filedKeys.tidStatus.tidImplementedDate.label
                  }}</span>
                  <span class="col-md-8 text-wrap content-center text-weight-regular text-blue-grey-10">{{
                  tdata.tidImplementedDate }}</span>
                </div>
                <div class="row gutter-x-xs gutter-y-xs q-pa-sm text-grey-9">
                  <span class="col-md-4 text-weight-medium">{{
                  filedKeys.tidStatus.deviceRecoveryStatus.label
                  }}</span>
                  <span class="col-md-8 text-wrap content-center text-weight-regular text-blue-grey-10" :style="
                    `background-color:${funcValidate(
                      tdata.deviceRecoveryStatus,
                      'TRCS'
                    )}; 
                                  border: solid 2px ${funcValidate(
                  tdata.deviceRecoveryStatus,
                  'TRCS'
                                  )}; 
                                  padding: 2px; border-radius: 5px; text-align: center`
                  ">
                    {{ processStatus(tdata.deviceRecoveryStatus, "TRCS") }}
                  </span>
                </div>
                <div class="row gutter-x-xs gutter-y-xs q-pa-sm text-grey-9">
                  <span class="col-md-4 text-weight-medium">{{
                  filedKeys.tidStatus.recoveredBy.label
                  }}</span>
                  <span class="col-md-8 text-wrap content-center text-weight-regular text-blue-grey-10" :style="
                    `background-color:${
                      tdata.recoveredBy == 'NA' ? 'springgreen' : 'tomato'
                    }; 
                                  padding: 2px; border-radius: 5px; text-align: center`
                  ">{{ tdata.recoveredBy }}</span>
                </div>
                <div class="row gutter-x-xs gutter-y-xs q-pa-sm text-grey-9">
                  <span class="col-md-4 text-weight-medium">{{
                  filedKeys.tidStatus.deviceReplacementStatus.label
                  }}</span>
                  <span class="col-md-8 text-wrap content-center text-weight-regular text-blue-grey-10" :style="
                    `background-color:${funcValidate(
                      tdata.deviceReplacementStatus,
                      'TRPS'
                    )}; 
                                  border: solid 2px ${funcValidate(
                  tdata.deviceReplacementStatus,
                  'TRPS'
                                  )}; 
                                  padding: 2px; border-radius: 5px; text-align: center`
                  ">
                    {{ processStatus(tdata.deviceReplacementStatus, "TRPS") }}
                  </span>
                </div>
                <div class="row gutter-x-xs gutter-y-xs q-pa-sm text-grey-9">
                  <span class="col-md-4 text-weight-medium">{{
                  filedKeys.tidStatus.replacedBy.label
                  }}</span>
                  <span class="col-md-8 text-wrap content-center text-weight-regular text-blue-grey-10" :style="
                    `background-color:${
                      tdata.replacedBy == 'NA' ? 'springgreen' : 'tomato'
                    }; 
                                  padding: 2px; border-radius: 5px; text-align: center;`
                  ">{{ tdata.replacedBy }}</span>
                </div>
              </div>
            </q-card-main>
          </q-card>
        </div>
        <div class="col-lg-4 col-md-6 col-sm-12 no-wrap	">
          <q-card class="q-card q-py-md round-borders q-pa-sm">
            <q-card-title>
              <div class="q-subheading text-bold text-grey-9">
                Serial Number Status
              </div>
            </q-card-title>
            <q-card-separator></q-card-separator>
            <q-card-main>
              <div v-if="tableData.length > 0">
                <div class="row gutter-x-xs gutter-y-xs q-pa-sm text-grey-9">
                  <span class="col-md-4 text-weight-medium">{{
                  filedKeys.serialNumberStatus.serialNumber.label
                  }}</span>
                  <span class="col-md-8 text-wrap text-primary">{{
                  "# " + tdata.serialNumber
                  }}</span>
                </div>
                <div class="row gutter-x-xs gutter-y-xs q-pa-sm text-grey-9">
                  <span class="col-md-4 text-weight-medium">{{
                  filedKeys.serialNumberStatus.ciDeviceType.label
                  }}</span>
                  <span class="col-md-4 text-wrap content-center text-weight-regular text-blue-grey-10">{{
                  tdata.ciDeviceType }}</span>
                        
                  <span class="col-md-4 text-wrap content-center text-weight-regular text-blue-grey-10" :style="
                  `background-color:${
                   tdata.deviceCategoryType == null ? 'tomato': 'springgreen'
                  }; 
                                padding: 2px; border-radius: 5px; text-align: center;`">{{
                    tdata.deviceCategoryType == null ? "NA" : tdata.deviceCategoryType}}</span>
                </div>
                <div class="row gutter-x-xs gutter-y-xs q-pa-sm text-grey-9">
                  <span class="col-md-4 text-weight-medium">{{
                  filedKeys.serialNumberStatus.ciDeviceStauts.label
                  }}</span>
                  <span class="col-md-8 text-wrap content-center text-weight-regular text-blue-grey-10" :style="
                    `background-color:${funcValidate(
                      tdata.ciDeviceStauts,
                      'CIDS'
                    )}; 
                                  border: solid 2px ${funcValidate(
                  tdata.ciDeviceStauts,
                  'CIDS'
                                  )}; 
                                  padding: 2px; border-radius: 5px; text-align: center`
                  ">
                    {{ processStatus(tdata.ciDeviceStauts, "CIDS") }}
                  </span>
                </div>
                <div class="row gutter-x-xs gutter-y-xs q-pa-sm text-grey-9">
                  <span class="col-md-4 text-weight-medium">{{
                  filedKeys.serialNumberStatus.deviceAllocatedtoRegion.label
                  }}</span>
                  <span class="col-md-8 text-wrap content-center text-weight-regular text-blue-grey-10" :style="
                    `background-color:${
                      tdata.deviceAllocatedtoRegion ? 'springgreen' : 'tomato'
                    }; 
                                  padding: 2px; border-radius: 5px; text-align: center`
                  ">
                    {{
                    tdata.deviceAllocatedtoRegion
                    ? "Allocated"
                    : "Not Allocated"
                    }}</span>
                </div>
                <div class="row gutter-x-xs gutter-y-xs q-pa-sm text-grey-9">
                  <span class="col-md-4 text-weight-medium">{{
                  filedKeys.serialNumberStatus.riDeviceStatus.label
                  }}</span>
                  <span class="col-md-8 text-wrap content-center text-weight-regular text-blue-grey-10" :style="
                    `background-color:${funcValidate(
                      tdata.riDeviceStatus,
                      'RIDS'
                    )}; 
                                  border: solid 2px ${funcValidate(
                  tdata.riDeviceStatus,
                  'RIDS'
                                  )}; 
                                  padding: 2px; border-radius: 5px; text-align: center`
                  ">
                    {{ processStatus(tdata.riDeviceStatus, "RIDS") }}
                  </span>
                </div>
                <div class="row gutter-x-xs gutter-y-xs q-pa-sm text-grey-9">
                  <span class="col-md-4 text-weight-medium">{{
                  filedKeys.serialNumberStatus.riDeviceAllocatedOrImplemented
                  .label
                  }}</span>
                  <span class="col-md-8 text-wrap content-center text-weight-regular text-blue-grey-10" :style="
                    `background-color:${
                      tdata.riDeviceAllocatedOrImplemented
                        ? 'springgreen'
                        : 'tomato'
                    }; 
                                  padding: 2px; border-radius: 5px; text-align: center`
                  ">
                    {{
                    tdata.riDeviceAllocatedOrImplemented
                    ? "Allocated / Implemented"
                    : "Not Allocated / Implemented"
                    }}</span>
                </div>
                <div class="row gutter-x-xs gutter-y-xs q-pa-sm text-grey-9">
                  <span class="col-md-4 text-weight-medium">{{
                  filedKeys.serialNumberStatus.isDeviceReceivedInRi.label
                  }}</span>
                  <span class="col-md-8 text-wrap content-center text-weight-regular text-blue-grey-10" :style="
                    `background-color:${
                      tdata.isDeviceReceivedInRi == 1 ? 'springgreen' : 'tomato'
                    }; 
                                  padding: 2px; border-radius: 5px; text-align: center`
                  ">
                    {{
                    tdata.isDeviceReceivedInRi == 1
                    ? "Received"
                    : "Not Received"
                    }}</span>
                </div>
                <div class="row gutter-x-xs gutter-y-xs q-pa-sm text-grey-9">
                  <span class="col-md-4 text-weight-medium">{{
                  filedKeys.serialNumberStatus.riAssignedSO.label
                  }}</span>
                  <span class="col-md-8 text-wrap content-center text-weight-regular text-blue-grey-10" :style="
                    `background-color:${
                      tdata.isDeviceReceivedInRi == 1 ? 'springgreen' : 'tomato'
                    }; 
                                  padding: 2px; border-radius: 5px; text-align: center`
                  ">{{ tdata.riAssignedSO }}</span>
                </div>
                <div class="row gutter-x-xs gutter-y-xs q-pa-sm text-grey-9">
                  <span class="col-md-4 text-weight-medium">{{
                  filedKeys.serialNumberStatus.riStatusUpdatedDate.label
                  }}</span>
                  <span class="col-md-8 text-wrap content-center text-weight-regular text-blue-grey-10">{{
                  tdata.riStatusUpdatedDate }}</span>
                </div>
                <div class="row gutter-x-xs gutter-y-xs q-pa-sm text-grey-9">
                  <span class="col-md-4 text-weight-medium">{{
                  filedKeys.serialNumberStatus.riPodNumber.label
                  }}</span>
                  <span class="col-md-8 text-wrap content-center text-weight-regular text-blue-grey-10">{{
                  tdata.riPodNumber }}</span>
                </div>
                <div class="row gutter-x-xs gutter-y-xs q-pa-sm text-grey-9">
                  <span class="col-md-4 text-weight-medium">{{
                  filedKeys.serialNumberStatus.regionInventoryName.label
                  }}</span>
                  <span class="col-md-8 text-wrap content-center text-weight-regular text-blue-grey-10">{{
                  tdata.regionInventoryName }}</span>
                </div>
              </div>
            </q-card-main>
          </q-card>
        </div>
      </div>
      <!--START >> Show Ajax Spinner -->
      <div v-if="toggleAjaxLoadFilter" class="fullscreen spinner-overlay">
        <q-spinner-bars class="absolute-center" style="color:#61116a" :size="35" />
      </div>
      <!--END >> Show Ajax Spinner -->
    </q-page>
  </template>
  <script>
  import { mapGetters, mapActions } from "vuex";
  const deCapitalizeFirstLetter = ([first, ...rest], locale = navigator.language) =>
    first === undefined ? '' : first.toLocaleLowerCase(locale) + rest.join('')
  export default {
    name: "globalSearchFilterValues",
  
    data() {
      return {
        toggleAjaxLoadFilter: false,
        filterSearch: "",
        json_fields: {
          SerialNumber: "serialNumber",
          LeadNumber: "leadNumber"
        },
        tableData: [],
        filedKeys: {
          leadStatus: {
            leadNumber: { label: "Lead Number" },
            leadName: { label: "Lead Name" },
            leadAddress: { label: "Address" },
            leadDevice: { label: "Device Type" },
            leadDeviceCount: { label: "Device Count" },
            leadRegionName: { label: "Region Name" },
            leadStatus: { label: "Lead Status" }
          },
          tidStatus: {
            tid: { label: "TID" },
            tidStatus: { label: "Status" },
            tidAssignedTo: { label: "Assigned To" },
            tidImplementedDate: { label: "Status Date" },
            deviceRecoveryStatus: { label: "Recovery Status" },
            recoveredBy: { label: "Recovered By" },
            deviceReplacementStatus: { label: "Replacement Status" },
            replacedBy: { label: "Replaced By" }
          },
          serialNumberStatus: {
            serialNumber: { label: "Serial Number" },
            ciDeviceType: { label: "CI Device Type" },
            ciDeviceStauts: { label: "CI Device Status" },
            deviceAllocatedtoRegion: { label: "IS Device Allocated To Region" },
            riDeviceStatus: { label: "RI Device Status" },
            riDeviceAllocatedOrImplemented: {
              label: "RI Device Allocated Or Implemented"
            },
            isDeviceReceivedInRi: { label: "Device Received In RI" },
            riAssignedSO: { label: "RI Assigned SO" },
            riStatusUpdatedDate: { label: "RI Status Updated Date" },
            riPodNumber: { label: "RI POD Number" },
            regionInventoryName: { label: "Regional Inventory Name" }
          }
        },
        formData: {
          flag: "",
          searchTerm: ""
        },
        flagOptions: [
          {
            label: "Tid",
            value: 1
          },
          {
            label: "Serial Number",
            value: 2
          },
          {
            label: "Mid",
            value: 3
          },
          {
            label: "Lead Number",
            value: 4
          },
          {
            label: "Application Number",
            value: 5
          },
        ],
  
        // table pagination control
        paginationControl: {
          rowsNumber: 10,
          page: 1,
          sortBy: "leadNumber",
          descending: false,
          rowsPerPage: 25
        },
        // table column data
        columns: [
          {
            name: "leadNumber",
            required: true,
            label: "Lead Number",
            align: "left",
            field: "leadNumber",
            sortable: true
          },
          {
            name: "leadName",
            required: true,
            label: "Lead Name",
            align: "left",
            field: "leadName",
            sortable: true
          },
          {
            name: "leadAddress",
            required: true,
            label: "Lead Address",
            align: "left",
            field: "leadAddress",
            sortable: false
          },
          {
            name: "leadDevice",
            required: true,
            label: "Lead Device",
            align: "left",
            field: "leadDevice",
            sortable: false
          },
          {
            name: "leadDeviceCount",
            required: true,
            label: "Lead Device Count",
            align: "left",
            field: "leadDeviceCount",
            sortable: false
          },
          {
            name: "leadRegionName",
            required: true,
            label: "Lead Region Name",
            align: "left",
            field: "leadRegionName",
            sortable: false
          },
          {
            name: "leadStatus",
            required: true,
            label: "Lead Status",
            align: "left",
            field: "leadStatus",
            sortable: false,
            classes: "bg-accent"
          },
          {
            name: "tid",
            required: true,
            label: "TID",
            align: "left",
            field: "tid",
            sortable: true
          },
          {
            name: "tidStatus",
            required: true,
            label: "TID Status",
            align: "left",
            field: "tidStatus",
            sortable: false
          },
          {
            name: "tidAssignedTo",
            required: true,
            label: "TID Assigned To",
            align: "left",
            field: "tidAssignedTo",
            sortable: false
          },
          {
            name: "tidImplementedDate",
            required: true,
            label: "TID Implementation Date",
            align: "left",
            field: "tidImplementedDate",
            sortable: false
          },
          {
            name: "deviceRecoveryStatus",
            required: true,
            label: "Device Recovery Status",
            align: "left",
            field: "deviceRecoveryStatus",
            sortable: false
          },
          {
            name: "recoveredBy",
            required: true,
            label: "Recovered By",
            align: "left",
            field: "recoveredBy",
            sortable: false
          },
          {
            name: "deviceReplacementStatus",
            required: true,
            label: "Device Replacement Status",
            align: "left",
            field: "deviceReplacementStatus",
            sortable: false
          },
          {
            name: "replacedBy",
            required: true,
            label: "Replaced By",
            align: "left",
            field: "replacedBy",
            sortable: false
          },
  
          {
            name: "serialNumber",
            required: true,
            label: "Serial Number",
            align: "left",
            field: "serialNumber",
            sortable: true
          },
          {
            name: "ciDeviceType",
            required: true,
            label: "CI Device Type",
            align: "left",
            field: "ciDeviceType",
            sortable: false
          },
          {
            name: "ciDeviceStauts",
            required: true,
            label: "CI Device Status",
            align: "left",
            field: "ciDeviceStauts",
            sortable: false
          },
          {
            name: "deviceAllocatedtoRegion",
            required: true,
            label: "IS Device Allocated To Region",
            align: "left",
            field: "deviceAllocatedtoRegion",
            sortable: false
          },
          {
            name: "riDeviceStatus",
            required: true,
            label: "RI Device Status",
            align: "left",
            field: "riDeviceStatus",
            sortable: false
          },
          {
            name: "riDeviceAllocatedOrImplemented",
            required: true,
            label: "RI Device Allocated Or Implemented",
            align: "left",
            field: "riDeviceAllocatedOrImplemented",
            sortable: false
          },
          {
            name: "isDeviceReceivedInRi",
            required: true,
            label: "Device Received In RI",
            align: "left",
            field: "isDeviceReceivedInRi",
            sortable: false
          },
          {
            name: "riAssignedSO",
            required: true,
            label: "RI Assigned SO",
            align: "left",
            field: "riAssignedSO",
            sortable: false
          },
          {
            name: "riStatusUpdatedDate",
            required: true,
            label: "RI Status Updated Date",
            align: "left",
            field: "riStatusUpdatedDate",
            sortable: false
          },
          {
            name: "riPodNumber",
            required: true,
            label: "RI POD Number",
            align: "left",
            field: "riPodNumber",
            sortable: false
          },
          {
            name: "regionInventoryName",
            required: true,
            label: "Regional Inventory Name",
            align: "left",
            field: "regionInventoryName",
            sortable: false
          }
        ]
      };
    },
  
    computed: {
      ...mapGetters("globalSearchSerialNumber", ["getGlobalSearchSerialNumber", "getAggregatorsGlobalSearchSerialNumber"]),
      ...mapGetters("GlobalVariables", [
        "GLOBAL_STATUS_FETCH",
        "REGIONAL_INVENTORY_DEVICE_STATUS",
        "CENTRAL_INVENTORY_DEVICE_STATUS",
        "TID_STATUS",
        "TID_RECOVERY_STATUS",
        "TID_REPLACEMENT_STATUS"
      ])
    },
  
    methods: {
      ...mapActions("globalSearchSerialNumber", ["FETCH_GLOBAL_SEARCH_DATAS", "FETCH_PHONE_PE_GLOBAL_SEARCH_DATAS"]),
      getFlagKeyByValue(object, value) {
        if (object.value === value) {
          return object.label;
        }
      },
      globalSearchSubmit({ pagination }) {
        let sort = this.flagOptions.filter(sFlag => this.getFlagKeyByValue(sFlag, this.formData.flag));
        console.log("Flags 2222222222222221111111111 : ---------- : ", this.formData.flag);
        this.paginationControl.sortBy = this.formData.flag != 2 ? deCapitalizeFirstLetter(sort[0].label.replaceAll(/\s/g, '')) : "c.serialNumber";
        let params = {
          flag: this.formData.flag,
          searchTerm: this.formData.searchTerm,
          pagination: this.paginationControl
        };
        this.FETCH_PHONE_PE_GLOBAL_SEARCH_DATAS(params)
          .then(res => {
            // updating pagination to reflect in the UI
            this.paginationControl = params.pagination;
            let sort = this.flagOptions.filter(sFlag => this.getFlagKeyByValue(sFlag, this.formData.flag));
            this.paginationControl.sortBy = this.formData.flag != 2 ? deCapitalizeFirstLetter(sort[0].label.replaceAll(/\s/g, '')) : "c.serialNumber";
  
            // // we also set (or update) rowsNumber
            this.paginationControl.rowsNumber = this.getAggregatorsGlobalSearchSerialNumber.totalElements;
            this.paginationControl.page =
              this.getAggregatorsGlobalSearchSerialNumber.number + 1;
  
            // // then we update the rows with the fetched ones
            this.tableData = this.getAggregatorsGlobalSearchSerialNumber.content;
            if (this.getAggregatorsGlobalSearchSerialNumber.sort != null) {
              this.paginationControl.sortBy = this.getAggregatorsGlobalSearchSerialNumber.sort[0].property;
              this.paginationControl.descending = this.getAggregatorsGlobalSearchSerialNumber.sort[0].ascending;
            }
            // finally we tell QTable to exit the "loading" state
            this.$q.loading.hide();
          })
          .catch(() => {
            this.$q.loading.hide();
          });
      },
      processStatus(obj, key) {
        let value = "";
        switch (key) {
          case "LS":
            value = this.GLOBAL_STATUS_FETCH.LEAD_STATUS[obj];
            break;
          case "TS":
            value = this.GLOBAL_STATUS_FETCH.TID_STATUS[obj];
            break;
          case "TRPS":
            value = this.GLOBAL_STATUS_FETCH.TID_REPLACEMENT_STATUS[obj];
            break;
          case "TRCS":
            value = this.GLOBAL_STATUS_FETCH.TID_RECOVERY_STATUS[obj];
            break;
          case "CIDS":
            value = this.GLOBAL_STATUS_FETCH.CENTRAL_INVENTORY_DEVICE_STATUS[obj];
            break;
          case "RIDS":
            value = this.GLOBAL_STATUS_FETCH.REGIONAL_INVENTORY_DEVICE_STATUS[
              obj
            ];
            break;
          default:
            value = "NA";
        }
        return value == undefined ? "NA" : value;
      },
      funcValidate(obj, key) {
        let value = "";
        let colors = [
          "tomato",
          "pink",
          "purple",
          "indigo",
          "blue",
          "lightblue",
          "lightsalmon",
          "teal",
          "wheat",
          "lightgreen",
          "lightcoral",
          "springgreen",
          "lightseagreen",
          "amber",
          "orange",
          "deep-orange",
          "brown",
          "grey",
          "blue-grey",
          "tomato"
        ];
        let tColors = [
          "lightcoral",
          "lightgreen",
          "orange",
          "red",
          "lightblue",
          "blue",
          "springgreen",
          "lightsalmon"
        ];
        let riColors = [
          "tomato",
          "lightgreen",
          "orange",
          "indigo",
          "blue",
          "lightblue",
          "wheat",
          "lightsalmon",
          "lightcoral",
          "springgreen",
          "tomato"
        ];
        let ciColors = [
          "tomato",
          "springgreen",
          "tomato",
          "lightsalmon",
          "lightcoral",
          "amber"
        ];
        let trpsColors = [
          "tomato",
          "lightcoral",
          "lightsalmon",
          "springgreen",
          "lightgreen"
        ];
        let trcsColors = ["tomato", "lightcoral", "lightgreen", "springgreen"];
        switch (key) {
          case "LS":
            if (obj == "101") return colors[19];
            else if (obj == "102") return colors[16];
            else return colors[obj];
          case "TS":
            return tColors[obj];
          case "TRPS":
            return trpsColors[obj];
          case "TRCS":
            return trcsColors[obj];
          case "CIDS":
            return ciColors[obj];
          case "RIDS":
            return riColors[obj];
          default:
            value = "NA";
            return value;
        }
      },
      // Function pull to refresh
      PullToRefresh(done) {
        this.ajaxLoadAllLeadInfo({
          pagination: this.paginationControl,
          filter: this.filter
        });
      }
    }
  };
  </script>
  
  <style>
  .text-wrap {
    overflow-wrap: anywhere;
    color: #242225;
  }
  </style>
  
