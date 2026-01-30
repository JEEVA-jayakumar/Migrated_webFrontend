<template>
  <q-page>
    <!-- content -->
    <div>
      <internalServiceRequestPopup
        v-if="propToggleServiceRequest"
        :ServiceRequest="addtnServiceRequest"
        :propToggleServiceRequestPop="propToggleServiceRequest"
        @closeServiceRequest="toggleServiceRequest"
      />
    </div>
    <div>
      <!--END: table title -->
      <!--START: table Footer -->
      <q-card class="group q-pa-md" v-if="selectedTab == 'unAssigned'">
        <div class="row items-center gutter-y-sm" style="display: flex; justify-content: space-between; width: 100%;">
          <div
            class="col-md-3 col-sm-6 col-xs-6 text-grey-7 text-weight-medium"
            align="left"
          >
            <span class="q-display-2">{{
              formData.marsDeviceIdsCooked.length
            }}</span
            >/ selected
          </div>
          <!-- <div
            class="col-md-3 col-sm-6 col-xs-6 text-grey-7 text-weight-medium"
            align="auto"
          >
            <b>
              <label>Request Mode</label>
            </b>
            <div class="col-md-2 col-sm-6 col-xs-6">
              <q-radio
                v-for="(item, index) in requestOptions"
                :key="index"
                color="grey-9"
                v-model.trim="formData.serviceRequestMode"
                :val="item.value"
                :label="item.label"
              />
            </div>
          </div> -->
          <!-- <div v-if="formData.serviceRequestMode == 'Direct Dispatch'" class="col-md-3 col-sm-6 col-xs-6">
                        <q-select v-model="formData.assignTo.id" separator color="grey-9" :options="assignToOptions"
                            placeholder="Assign To" />

                    </div> -->
                    <!-- v-if="formData.serviceRequestMode == 'SO'" -->
          <div class="col-md-3 col-sm-6 col-xs-6" style="flex: 1;  max-width: 200px;" align="right">
            <q-select
              filter
              clearable
              v-model="formData.assignTo.id"
              separator
              color="grey-9"
              :disable="formData.marsDeviceIdsCooked.length == 0 ? true : false"
              :options="assignToOptions"
              placeholder="Assign To"
            />
          </div>
          <div class="col-md-3 col-sm-6 col-xs-6" style="flex: 1;  max-width: 200px;" align="right">
            <q-select
              filter
              clearable
              v-model="formData.assignTo.region"
              separator
              color="grey-9"
              :disable="formData.marsDeviceIdsCooked.length == 0 ? true : false"
              :options="assignToRegionOptions"
              placeholder="Assign To Region"
            />
          </div>
          <div class="col-md-3 col-sm-6 col-xs-6" align="right">
            <q-btn
              no-caps
               :disabled="((this.formData.assignTo.id == '' || this.formData.assignTo.id == null) && (this.formData.assignTo.region == '' || this.formData.assignTo.region == null))"
              label="Assign"
              class="common-dark-blue"
              @click="assignImplementationUser"
            />
          </div>
        </div>
      </q-card>
      <q-card class="group q-pa-md" v-if="selectedTab == 'assigned'">
        <div class="row items-center gutter-y-sm">
          <div class="col-md-9 col-sm-12 col-xs-12">
            <div class="row items-center">
              <div class="col-md-4 col-sm-6 col-xs-6 group"></div>
            </div>
          </div>
        </div>
      </q-card>
      <!--END: table Footer -->
      <q-tabs
        v-model="selectedTab"
        class="shadow-1"
        color="grey-1"
        @select="goToUnassignedTab"
      >
        <q-tab
          default
          color="dark"
          name="unAssigned"
          slot="title"
          label="Unassigned"
        />
        <q-tab color="dark" name="assigned" slot="title" label="Assigned" />
        <!--                 
                <q-tab color="dark" name="opened" slot="title" label="Opened" />
                <q-tab color="dark" name="closed" slot="title" label="Closed" /> -->
        <!-- 
                  <q-tab-pane name="opened">
              <opened/>
            </q-tab-pane> -->
        <q-tab-pane name="unAssigned">
          <q-table
            :data="tableData3"
            :columns="columnDataUnassigned"
            table-class="customTableClass"
            :filter="filterSearch1"
            selection="multiple"
            :selected.sync="formData.marsDeviceIdsCooked"
            :pagination.sync="paginationControl1"
            row-key="id"
            :loading="tableAjaxLoading1"
            :rows-per-page-options="[5, 10, 15, 20]"
            color="dark"
            @request="ajaxLoadAllLeadInfo1"
          >
            <q-td
              slot="body-cell-serviceReqTicketId"
              slot-scope="props"
              :props="props"
              class="cursor-pointer"
              @click.native="toggleServiceRequest(props.row)"
            >
              <span class="label text-primary"
                ># {{ props.row.serviceReqTicketId }}</span
              >
            </q-td>

            <q-td
              slot="body-cell-createdDate"
              slot-scope="props"
              :props="props"
              >{{ props.row.createdDate | moment("Do MMM Y") }}</q-td
            >
            <q-td
              slot="body-cell-updatedDate"
              slot-scope="props"
              :props="props"
              >{{ props.row.updatedDate | moment("Do MMM Y") }}</q-td
            >
            <!-- <q-td slot="body-cell-serviceRequestSubTicketStatus" slot-scope="props" :props="props">
                            <span class="label text-positive"
                                v-if="props.row.serviceRequestSubTicketStatus == 1">SR_TICKET_RAISED</span>
                            <span class="label text-positive"
                                v-else-if="props.row.serviceRequestSubTicketStatus == 2">SR_TICKET_ESCALATED_TO_SAT</span>
                            <span class="label text-positive"
                                v-else-if="props.row.serviceRequestSubTicketStatus == 3">SR_ASSIGNED_TO_ENGINEER</span>
                            <span class="label text-positive"
                                v-else-if="props.row.serviceRequestSubTicketStatus == 4">SR_ISSUE_RESOLVED_COURIERED</span>
                            <span class="label text-positive"
                                v-else-if="props.row.serviceRequestSubTicketStatus == 5">SR_DEVICE_COURIERED</span>
                            <span class="label text-positive"
                                v-else-if="props.row.serviceRequestSubTicketStatus == 6">SR_ISSUE_RESOLVED_REMOTELY</span>
                            <span class="label text-positive"
                                v-else-if="props.row.serviceRequestSubTicketStatus == 7">SR_SCHEDULED_ENGINEER_VISIT</span>
                            <span class="label text-positive"
                                v-else-if="props.row.serviceRequestSubTicketStatus == 8">SR_ISSUE_RESOLVED</span>
                            <span class="label text-positive"
                                v-else-if="props.row.serviceRequestSubTicketStatus == 9">SR_MERCHANT_NOT_REACHABLE</span>
                            <span class="label text-negative"
                                v-else-if="props.row.serviceRequestSubTicketStatus == 10">SR_CANCELLED</span>
                            <span class="label" v-else>NA</span>
                        </q-td> -->
            <q-td
              slot="body-cell-serviceRequestTicketStatus"
              slot-scope="props"
              :props="props"
            >
              <span
                class="label text-positive"
                v-if="props.row.serviceRequestTicketStatus == 1"
                >REQUEST_UNASSIGNED</span
              >
              <span
                class="label text-negative"
                v-else-if="props.row.serviceRequestTicketStatus == 2"
                >REQUEST_ASSIGNED</span
              >
              <span
                class="label text-negative"
                v-else-if="props.row.serviceRequestTicketStatus == 3"
                >REQUEST_CLOSED</span
              >
              <span class="label" v-else>NA</span>
            </q-td>
            <q-td
              slot="body-cell-kaptureDueDate"
              slot-scope="props"
              :props="props"
              >{{
                props.row.kaptureDueDate == null
                  ? "NA"
                  : props.row.kaptureDueDate | moment("Do MMM Y")
              }}</q-td
            >
            <q-td
              slot="body-cell-appointmentDate"
              slot-scope="props"
              :props="props"
              >{{
                props.row.appointmentDate == null
                  ? "NA"
                  : props.row.appointmentDate | moment("Do MMM Y")
              }}</q-td
            >
            <q-td
              slot="body-cell-courierDueDate"
              slot-scope="props"
              :props="props"
              >{{
                props.row.courierDueDate == null
                  ? "NA"
                  : props.row.courierDueDate | moment("Do MMM Y")
              }}</q-td
            >
            <q-td
              slot="body-cell-scheduleDate"
              slot-scope="props"
              :props="props"
              >{{
                props.row.scheduleDate == null
                  ? "NA"
                  : props.row.scheduleDate | moment("Do MMM Y")
              }}</q-td
            >
            <template slot="top">
              <div class="col-md-5">
                <q-search
                  clearable
                  color="grey-9"
                  v-model="filterSearch1"
                  placeholder="Type.."
                  float-label="Search By ServiceReqTicketId, TID .."
                  class="q-mr-lg q-py-sm"
                />
              </div>
            </template>
          </q-table>
        </q-tab-pane>
        <q-tab-pane name="assigned">
          <q-table
            :data="tableData1"
            :columns="columnDataAssigned"
            table-class="customTableClass"
            :filter="filterSearch"
            :pagination.sync="paginationControl"
            :selected.sync="formData.marsDeviceIdsCookedUnAssinged"
            row-key="id"
            :loading="tableAjaxLoading"
            :rows-per-page-options="[5, 10, 15, 20]"
            color="dark"
            @request="ajaxLoadAllLeadInfo"
          >
            <!--START: table header -->
            <!-- <q-tr slot="top-row" slot-scope="props">
              <q-th auto-width></q-th>
              <q-th
                v-for="col in props.columns"
                :key="col.name"
                :props="props"
                >{{ col.label }}</q-th
              >
            </q-tr> -->

            <!--END: table header -->
            <!--START: Table body -->
            <template slot="body" slot-scope="props">
              <!--START: table rows -->
              <q-tr :props="props" class="bottom-border">
                <q-td key="serviceReqTicketId">
                  <q-checkbox
                    checked-icon="fas fa-chevron-up"
                    unchecked-icon="fas fa-chevron-down"
                    color="grey-9"
                    v-model="props.row.expand"
                    class="q-mr-md"
                    @input="expandRowPlease(props.row)"
                  />
                  <span>{{ props.row.serviceReqTicketId }}</span>
                </q-td>
                <q-td key="tid" :props="props"> {{ props.row.tid }}</q-td>
                <q-td key="mid" :props="props">
                  <span v-if="props.row.mid != null">{{ props.row.mid }}</span>
                  <span v-else="props.row.mid == null">NA</span>
                </q-td>
                <q-td key="createdDate" :props="props">
                  {{ props.row.createdDate | moment("Do MMM Y") }}
                </q-td>
                <q-td key="updatedDate" :props="props">
                  {{ props.row.updatedDate | moment("Do MMM Y") }}
                </q-td>
                <q-td key="meName" :props="props"> {{ props.row.meName }}</q-td>
                <q-td key="address" :props="props"> {{ props.row.address }}</q-td>
                <q-td key="contactNumber" :props="props"> {{ props.row.contactNumber }}</q-td>
                <q-td key="pincode" :props="props"> {{ props.row.pincode }}</q-td>
                <q-td key="bpRegion" :props="props">
                  {{ props.row.bpRegion.regionAreaName }}
                </q-td>
                <q-td key="assignedTo" :props="props">
                  {{
                    props.row.assignedTo == null
                      ? "NA"
                      : props.row.assignedTo.name +
                        " | " +
                        props.row.assignedTo.employeeID
                  }}
                </q-td>
                <q-td key="crmRemark" :props="props">
                  <span
                    v-if="props.row.crmRemark != null"
                    v-html="props.row.crmRemark"
                  ></span>
                  <span v-else="props.row.crmRemark == null">NA</span>
                </q-td>

                <q-td key="deviceType" :props="props">
                  {{ props.row.deviceType }}</q-td
                >
                <q-td key="serviceRequestSubTicketStatus" :props="props">
                  {{
                    props.row.subTicketsList[0] == null
                      ? "NA"
                      : props.row.subTicketsList[0]
                          .serviceRequestSubTicketStatus.name
                  }}</q-td
                >
                <!-- <q-td key="serviceRequestSubTicketStatus" :props="props">
                                    <span class="label text-positive"
                                        v-if="props.row.serviceRequestSubTicketStatus == 1">SR_TICKET_RAISED</span>
                                    <span class="label text-positive"
                                        v-else-if="props.row.serviceRequestSubTicketStatus == 2">SR_TICKET_ESCALATED_TO_SAT</span>
                                    <span class="label text-positive"
                                        v-else-if="props.row.serviceRequestSubTicketStatus == 3">SR_ASSIGNED_TO_ENGINEER</span>
                                    <span class="label text-positive"
                                        v-else-if="props.row.serviceRequestSubTicketStatus == 4">SR_ISSUE_RESOLVED_COURIERED</span>
                                    <span class="label text-positive"
                                        v-else-if="props.row.serviceRequestSubTicketStatus == 5">SR_DEVICE_COURIERED</span>
                                    <span class="label text-positive"
                                        v-else-if="props.row.serviceRequestSubTicketStatus == 6">SR_ISSUE_RESOLVED_REMOTELY</span>
                                    <span class="label text-positive"
                                        v-else-if="props.row.serviceRequestSubTicketStatus == 7">SR_SCHEDULED_ENGINEER_VISIT</span>
                                    <span class="label text-positive"
                                        v-else-if="props.row.serviceRequestSubTicketStatus == 8">SR_ISSUE_RESOLVED</span>
                                    <span class="label text-positive"
                                        v-else-if="props.row.serviceRequestSubTicketStatus == 9">SR_MERCHANT_NOT_REACHABLE</span>
                                    <span class="label text-negative"
                                        v-else-if="props.row.serviceRequestSubTicketStatus == 10">SR_CANCELLED</span>
                                    <span class="label" v-else>NA</span>
                                </q-td> -->

                <q-td key="serviceRequestMode" :props="props">
                  {{ props.row.serviceRequestMode }}</q-td
                >

                <q-td key="serviceRequestTicketStatus" :props="props">
                  <span
                    class="label text-positive"
                    v-if="props.row.serviceRequestTicketStatus == 1"
                    >REQUEST_UNASSIGNED</span
                  >
                  <span
                    class="label text-negative"
                    v-else-if="props.row.serviceRequestTicketStatus == 2"
                    >REQUEST_ASSIGNED</span
                  >
                  <span
                    class="label text-negative"
                    v-else-if="props.row.serviceRequestTicketStatus == 3"
                    >REQUEST_CLOSED</span
                  >
                  <span class="label" v-else>NA</span>
                </q-td>
                <q-td key="remarks" :props="props">
                  <span
                    v-if="props.row.reAssignRemark != null"
                    v-html="props.row.reAssignRemark"
                  ></span>
                  <span v-else="props.row.reAssignRemark == null">NA</span>
                </q-td>
                <q-td key="action" :props="props">
                  <q-btn
                    highlight
                    push
                    class="q-mx-sm"
                    color="positive"
                    size="sm"
                    @click="fnReassignData(props.row)"
                    >Re-Assign</q-btn
                  >
                </q-td>
              </q-tr>
              <!-- START: table expand values -->

              <q-tr
                v-show="props.row.expand"
                :props="props"
                class="wordWrapCustom bottom-border"
              >
                <q-td>
                  <div
                    class="text-left q-caption text-grey-8 text-weight-medium"
                  >
                    Request Type
                  </div>
                  <div
                    class="text-left"
                    v-if="props.row.subTicketsList.length > 0"
                  >
                    <div
                      v-for="col in props.row.subTicketsList"
                      :key="col.serviceRequestType.id"
                      :props="props"
                    >
                      <span>
                        {{
                          col.serviceRequestType != null
                            ? col.serviceRequestType.name
                            : "NA"
                        }} </span
                      ><br />
                    </div>
                  </div>
                </q-td>
                <q-td>
                  <div
                    class="text-left q-caption text-grey-8 text-weight-medium"
                  >
                    IssueType
                  </div>
                  <div
                    class="text-left"
                    v-if="props.row.subTicketsList.length > 0"
                  >
                    <div
                      v-for="col in props.row.subTicketsList"
                      :key="col.serviceRequestType.id"
                      :props="props"
                    >
                      <span>{{
                        col.serviceRequestIssueType != null
                          ? col.serviceRequestIssueType.name
                          : "NA"
                      }}</span
                      ><br />
                    </div>
                  </div>
                </q-td>
                <q-td>
                  <div
                    class="text-left q-caption text-grey-8 text-weight-medium"
                  >
                    SubTicket Status
                  </div>
                  <div
                    class="text-left"
                    v-if="props.row.subTicketsList.length > 0"
                  >
                    <div
                      v-for="col in props.row.subTicketsList"
                      :key="col.serviceRequestType.id"
                      :props="props"
                    >
                      <span>
                        {{
                          col.serviceRequestSubTicketStatus != null
                            ? col.serviceRequestSubTicketStatus.name
                            : "NA"
                        }} </span
                      ><br />
                    </div>
                  </div>
                </q-td>
                <q-td>
                  <div
                    class="text-left q-caption text-grey-8 text-weight-medium"
                  >
                    Schedule Date
                  </div>
                  <div
                    class="text-left"
                    v-if="props.row.subTicketsList.length > 0"
                  >
                    <div
                      v-for="col in props.row.subTicketsList"
                      :key="col.serviceRequestType.id"
                      :props="props"
                    >
                      <span>{{
                        col.scheduleDate != null ? col.scheduleDate : "NA"
                      }}</span
                      ><br />
                    </div>
                  </div>
                </q-td>
                <q-td>
                  <div
                    class="text-left q-caption text-grey-8 text-weight-medium"
                  >
                    Pod Number
                  </div>
                  <div
                    class="text-left"
                    v-if="props.row.subTicketsList.length > 0"
                  >
                    <div
                      v-for="col in props.row.subTicketsList"
                      :key="col.serviceRequestType.id"
                      :props="props"
                    >
                      <span>{{
                        col.podNumber != null ? col.podNumber : "NA"
                      }}</span
                      ><br />
                    </div>
                  </div>
                </q-td>
                <q-td>
                  <div
                    class="text-left q-caption text-grey-8 text-weight-medium"
                  >
                    Service Remarks
                  </div>
                  <div
                    class="text-left"
                    v-if="props.row.subTicketsList.length > 0"
                  >
                    <div
                      v-for="col in props.row.subTicketsList"
                      :key="col.serviceRequestType.id"
                      :props="props"
                    >
                      <span>{{
                        col.serviceRemarks != null ? col.serviceRemarks : "NA"
                      }}</span
                      ><br />
                    </div>
                  </div>
                </q-td>
                <q-td>
                  <div
                    class="text-left q-caption text-grey-8 text-weight-medium"
                  >
                    Cancel Reason
                  </div>
                  <div
                    class="text-left"
                    v-if="props.row.subTicketsList.length > 0"
                  >
                    <div
                      v-for="col in props.row.subTicketsList"
                      :key="col.serviceRequestType.id"
                      :props="props"
                    >
                      <span>{{
                        col.cancelReason != null ? col.cancelReason : "NA"
                      }}</span
                      ><br />
                    </div>
                  </div>
                </q-td>
                <q-td>
                  <div
                    class="text-left q-caption text-grey-8 text-weight-medium"
                  >
                    Issue Remark
                  </div>
                  <div
                    class="text-left"
                    v-if="props.row.subTicketsList.length > 0"
                  >
                    <div
                      v-for="col in props.row.subTicketsList"
                      :key="col.serviceRequestType.id"
                      :props="props"
                    >
                      <span>{{
                        col.issueRemark != null ? col.issueRemark : "NA"
                      }}</span
                      ><br />
                    </div>
                  </div>
                </q-td>
                <q-td>
                  <div
                    class="text-left q-caption text-grey-8 text-weight-medium"
                  >
                    Remark
                  </div>
                  <div
                    class="text-left"
                    v-if="props.row.subTicketsList.length > 0"
                  >
                    <div
                      v-for="col in props.row.subTicketsList"
                      :key="col.serviceRequestType.id"
                      :props="props"
                    >
                      <span>{{ col.remark != null ? col.remark : "NA" }}</span
                      ><br />
                    </div>
                  </div>
                </q-td>
                <q-td>
                  <div
                    class="text-left q-caption text-grey-8 text-weight-medium"
                  >
                    Latitude
                  </div>
                  <div
                    class="text-left"
                    v-if="props.row.subTicketsList.length > 0"
                  >
                    <div
                      v-for="col in props.row.subTicketsList"
                      :key="col.serviceRequestType.id"
                      :props="props"
                    >
                      <span>{{
                        col.latitude != null ? col.latitude : "NA"
                      }}</span
                      ><br />
                    </div>
                  </div>
                </q-td>
                <q-td>
                  <div
                    class="text-left q-caption text-grey-8 text-weight-medium"
                  >
                    Longitude
                  </div>
                  <div
                    class="text-left"
                    v-if="props.row.subTicketsList.length > 0"
                  >
                    <div
                      v-for="col in props.row.subTicketsList"
                      :key="col.serviceRequestType.id"
                      :props="props"
                    >
                      <span>{{
                        col.longitude != null ? col.longitude : "NA"
                      }}</span
                      ><br />
                    </div>
                  </div>
                </q-td>
                <q-td>
                  <div
                    class="text-left q-caption text-grey-8 text-weight-medium"
                  >
                    Implementation Form
                  </div>
                  <div
                    class="text-left"
                    v-if="props.row.subTicketsList.length > 0"
                  >
                    <div
                      v-for="col in props.row.subTicketsList"
                      :key="col.serviceRequestType.id"
                      :props="props"
                    >
                      <span>{{
                        col.implementationForm != null
                          ? col.implementationForm
                          : "NA"
                      }}</span
                      ><br />
                    </div>
                  </div>
                </q-td>
                <q-td>
                  <div
                    class="text-left q-caption text-grey-8 text-weight-medium"
                  >
                    Picture Of Shop
                  </div>
                  <div
                    class="text-left"
                    v-if="props.row.subTicketsList.length > 0"
                  >
                    <div
                      v-for="col in props.row.subTicketsList"
                      :key="col.serviceRequestType.id"
                      :props="props"
                    >
                      <span>{{
                        col.pictureOfShop != null ? col.pictureOfShop : "NA"
                      }}</span
                      ><br />
                    </div>
                  </div>
                </q-td>
                <q-td>
                  <div
                    class="text-left q-caption text-grey-8 text-weight-medium"
                  >
                    Old Sim Number
                  </div>
                  <div
                    class="text-left"
                    v-if="props.row.subTicketsList.length > 0"
                  >
                    <div
                      v-for="col in props.row.subTicketsList"
                      :key="col.serviceRequestType.id"
                      :props="props"
                    >
                      <span>{{
                        col.oldSimNumber != null ? col.oldSimNumber : "NA"
                      }}</span
                      ><br />
                    </div>
                  </div>
                </q-td>
                <q-td>
                  <div
                    class="text-left q-caption text-grey-8 text-weight-medium"
                  >
                    Old Sim Network
                  </div>
                  <div
                    class="text-left"
                    v-if="props.row.subTicketsList.length > 0"
                  >
                    <div
                      v-for="col in props.row.subTicketsList"
                      :key="col.serviceRequestType.id"
                      :props="props"
                    >
                      <span>{{
                        col.oldSimNetwork != null ? col.oldSimNetwork : "NA"
                      }}</span
                      ><br />
                    </div>
                  </div>
                </q-td>
                <q-td>
                  <div
                    class="text-left q-caption text-grey-8 text-weight-medium"
                  >
                    New Sim Number
                  </div>
                  <div
                    class="text-left"
                    v-if="props.row.subTicketsList.length > 0"
                  >
                    <div
                      v-for="col in props.row.subTicketsList"
                      :key="col.serviceRequestType.id"
                      :props="props"
                    >
                      <span>{{
                        col.newSimNumber != null ? col.newSimNumber : "NA"
                      }}</span
                      ><br />
                    </div>
                  </div>
                </q-td>
                <q-td>
                  <div
                    class="text-left q-caption text-grey-8 text-weight-medium"
                  >
                    New Sim Network
                  </div>
                  <div
                    class="text-left"
                    v-if="props.row.subTicketsList.length > 0"
                  >
                    <div
                      v-for="col in props.row.subTicketsList"
                      :key="col.serviceRequestType.id"
                      :props="props"
                    >
                      <span>{{
                        col.newSimNetwork != null ? col.newSimNetwork : "NA"
                      }}</span
                      ><br />
                    </div>
                  </div>
                </q-td>
                <q-td>
                  <div
                    class="text-left q-caption text-grey-8 text-weight-medium"
                  >
                    Scan Sim Number
                  </div>
                  <div
                    class="text-left"
                    v-if="props.row.subTicketsList.length > 0"
                  >
                    <div
                      v-for="col in props.row.subTicketsList"
                      :key="col.serviceRequestType.id"
                      :props="props"
                    >
                      <span>{{
                        col.scanSimNumber != null ? col.scanSimNumber : "NA"
                      }}</span
                      ><br />
                    </div>
                  </div>
                </q-td>
                <q-td>
                  <div
                    class="text-left q-caption text-grey-8 text-weight-medium"
                  >
                    Scan Device
                  </div>
                  <div
                    class="text-left"
                    v-if="props.row.subTicketsList.length > 0"
                  >
                    <div
                      v-for="col in props.row.subTicketsList"
                      :key="col.serviceRequestType.id"
                      :props="props"
                    >
                      <span>{{
                        col.scanDeviceSerialNumber != null
                          ? col.scanDeviceSerialNumber
                          : "NA"
                      }}</span
                      ><br />
                    </div>
                  </div>
                </q-td>

                <q-td>
                  <div
                    class="text-left q-caption text-grey-8 text-weight-medium"
                  >
                    Part Type
                  </div>
                  <div
                    class="text-left"
                    v-if="props.row.subTicketsList.length > 0"
                  >
                    <div
                      v-for="col in props.row.subTicketsList"
                      :key="col.serviceRequestType.id"
                      :props="props"
                    >
                      <span>{{
                        col.partType != null ? col.partType : "NA"
                      }}</span
                      ><br />
                    </div>
                  </div>
                </q-td>
                <q-td>
                  <div
                    class="text-left q-caption text-grey-8 text-weight-medium"
                  >
                    Paper Roll Count
                  </div>
                  <div
                    class="text-left"
                    v-if="props.row.subTicketsList.length > 0"
                  >
                    <div
                      v-for="col in props.row.subTicketsList"
                      :key="col.serviceRequestType.id"
                      :props="props"
                    >
                      <span>{{
                        col.paperRollCount != null ? col.paperRollCount : "NA"
                      }}</span
                      ><br />
                    </div>
                  </div>
                </q-td>
              </q-tr>
            </template>
            <template slot="top">
              <div class="col-md-5">
                <q-search
                  clearable
                  color="grey-9"
                  v-model="filterSearch"
                  placeholder="Type.."
                  float-label="Search By ServiceReqTicketId, TID .."
                  class="q-mr-lg q-py-sm"
                />
              </div>
            </template>
          </q-table>
        </q-tab-pane>
      </q-tabs>
      <div class="row items-center gutter-y-sm">
        <div class="col-md-9 col-sm-12 col-xs-12">
          <div class="row items-center"></div>
        </div>
      </div>
      <UpdateOpenedExternal
        v-if="propShowUpdateOpenedExternal"
        :propShowUpdateOpenedExternal="propShowUpdateOpenedExternal"
        :propRowDetails="propRowDetails"
        @emitfnshowUpdateOpenedExternal="fnReassignData"
      ></UpdateOpenedExternal>
      <!-- </q-card> -->
      <!--END: table Footer -->
      <!-- START >> COMPONENT: Update device address  -->
      <!-- END >> COMPONENT: Update device address -->
    </div>
  </q-page>
</template>

<script>
import {
  required,
  requiredIf,
  email,
  minLength,
  maxLength,
  alpha,
  alphaNum,
  numeric
} from "vuelidate/lib/validators";
import { mapGetters, mapActions } from "vuex";

import openedExternal from "../../components/sat/openedExternal.vue";
import internalServiceRequestPopup from "../../components/sat/internalServiceRequestPopup.vue";
import reOpenExternal from "../../components/sat/reOpenExternal.vue";
import UpdateOpenedExternal from "../../components/sat/UpdateOpenedExternal.vue";
import { nullableTypeAnnotation } from "babel-types";

export default {
  name: "implementationQueue",
  components: {
    openedExternal,
    //   generalLeadInformation,
    internalServiceRequestPopup,
    reOpenExternal,
    UpdateOpenedExternal
  },
  data() {
    return {
      propToggleLeadInformation: false,
      propToggleServiceRequest: false,
      propShowUpdateOpenedExternal: false,
      addtnLeadInformation: null,
      addtnServiceRequest: null,

      filterSearch: "",
      filterSearch1: "",
      filterSearch2: "",
      selectedTab: "assigned",
      assignTo: "",
      assignToOptions: [],
      assignToRegionOptions: [],
      tableData1: [],
      tableData3: [],
      externalUnAssignedTableData: [],
      externalAssignedTableData: [],
      // externalClosedTableData: [],
      // externalAssignedTableData
      // tableData2: [],
      //   formData: {
      //       serviceRequestMode:"",
      //       podNumber:"",
      //   },
      // requestOptions: [
      //   {
      //       label: "Direct Dispatch",
      //       value: "Direct Dispatch",
      //   },
      //   {
      //     label: "SO",
      //     value: "SO"
      //   }
      // ],
      //Defining columns for table
      columnDataAssigned: [
        {
          name: "serviceReqTicketId",
          required: true,
          label: "ServiceReqTicketId",
          align: "left",
          field: row => {
            return row.serviceReqTicketId == null
              ? "NA"
              : row.serviceReqTicketId;
          },
          sortable: false
        },
        {
          name: "tid",
          required: true,
          label: "TID",
          align: "left",
          field: row => {
            return row.tid == null ? "NA" : row.tid;
          },
          sortable: false
        },
        {
          name: "mid",
          required: true,
          label: "MID",
          align: "left",
          field: row => {
            return row.mid == null ? "NA" : row.mid;
          },
          sortable: false
        },
        {
          name: "createdDate",
          required: true,
          label: "CreatedDate",
          align: "left",
          field: row => {
            return row.createdDate;
          },
          sortable: true
        },
        {
          name: "updatedDate",
          required: true,
          label: "UpdatedDate",
          align: "left",
          field: row => {
            return row.updatedDate;
          },
          sortable: false
        },

        {
          name: "meName",
          required: true,
          label: "Merchant Name",
          align: "left",
          field: row => {
            return row.meName == null ? "NA" : row.meName;
          },
          sortable: false
        },
        {
          name: "address",
          required: true,
          label: "Address",
          align: "left",
          field: row => {
            return row.address == null ? "NA" : row.address;
          },
          sortable: false
        },
        {
          name: "contactNumber",
          required: true,
          label: "Contact Number",
          align: "left",
          field: row => {
            return row.contactNumber == null ? "NA" : row.contactNumber;
          },
          sortable: false
        },
        {
          name: "pincode",
          required: true,
          label: "Pincode",
          align: "left",
          field: row => {
            return row.pincode == null ? "NA" : row.pincode;
          },
          sortable: false
        },
        {
          name: "bpRegion",
          required: true,
          label: "BpRegion",
          align: "left",
          field: row => {
            return row.bpRegion == null ? "NA" : row.bpRegion.regionAreaName;
          },
          sortable: false
        },
        {
          name: "assignedTo",
          required: true,
          label: "AssignedTo",
          align: "left",
          field: row => {
            return row.assignedTo == null
              ? "NA"
              : row.assignedTo.name + " | " + row.assignedTo.employeeID;
          },
          sortable: false
        },
        {
          name: "crmRemark",
          required: true,
          label: "CRM Remark",
          align: "left",
          field: row => {
            return row.crmRemark == null ? "NA" : row.crmRemark;
          },
          sortable: false
        },
        {
          name: "deviceType",
          required: true,
          label: "DeviceType",
          align: "left",
          field: row => {
            return row.deviceType == null ? "NA" : row.deviceType;
          },
          sortable: false
        },
        {
          name: "serviceRequestSubTicketStatus",
          required: true,
          label: "ServiceReqIssueStatus",
          align: "left",
          field: row => {
            let issues = [];
            if (row.subTicketsList.length > 0) {
              row.subTicketsList.forEach((element, index) => {
                if (element.serviceRequestSubTicketStatus != null) {
                  issues.push(
                    index +
                      1 +
                      "." +
                      element.serviceRequestSubTicketStatus.name +
                      "   "
                  );
                }
              });
            }
            return issues;
          },
          sortable: false
        },

        {
          name: "serviceRequestMode",
          required: true,
          label: "RequestMode",
          align: "left",
          field: row => {
            return row.serviceRequestMode == null
              ? "NA"
              : row.serviceRequestMode;
          },
          sortable: false
        },
        {
          name: "serviceRequestTicketStatus",
          required: true,
          label: "TicketStatus",
          align: "left",
          field: row => {
            return row.serviceRequestTicketStatus;
          },
          sortable: false
        },
        {
          name: "remarks",
          required: true,
          label: "Re-Assign Remarks",
          align: "left",
          field: row => {
            return row.reAssignRemark;
          },
          sortable: false
        },
        {
          name: "action",
          required: true,
          label: "Re-Assign",
          align: "center",
          field: "action",
          sortable: true
        }
      ],

      columnDataUnassigned: [
        {
          name: "serviceReqTicketId",
          required: true,
          label: "ServiceReqTicketId",
          align: "left",
          field: row => {
            return row.serviceReqTicketId;
          },
          sortable: false
        },
        //     field: (row) => {
        //         return row.serviceReqTicketId == null
        //             ? "NA"
        //             : row.serviceReqTicketId;
        //     },
        //     sortable: false,
        // },

        {
          name: "tid",
          required: true,
          label: "TID",
          align: "left",
          field: row => {
            return row.tid == null ? "NA" : row.tid;
          },
          sortable: false
        },
        {
          name: "mid",
          required: true,
          label: "MID",
          align: "left",
          field: row => {
            return row.mid == null ? "NA" : row.mid;
          },
          sortable: false
        },
        {
          name: "createdDate",
          required: true,
          label: "CreatedDate",
          align: "left",
          field: row => {
            return row.createdDate;
          },
          sortable: true
        },
        {
          name: "updatedDate",
          required: true,
          label: "UpdatedDate",
          align: "left",
          field: row => {
            return row.updatedDate;
          },
          sortable: false
        },

        {
          name: "meName",
          required: true,
          label: "Merchant Name",
          align: "left",
          field: row => {
            return row.meName == null ? "NA" : row.meName;
          },
          sortable: false
        },
        {
          name: "address",
          required: true,
          label: "Address",
          align: "left",
          field: row => {
            return row.address == null ? "NA" : row.address;
          },
          sortable: false
        },
        {
          name: "contactNumber",
          required: true,
          label: "Contact Number",
          align: "left",
          field: row => {
            return row.contactNumber == null ? "NA" : row.contactNumber;
          },
          sortable: false
        },
        {
          name: "pincode",
          required: true,
          label: "Pincode",
          align: "left",
          field: row => {
            return row.pincode == null ? "NA" : row.pincode;
          },
          sortable: false
        },
        {
          name: "bpRegion",
          required: true,
          label: "BpRegion",
          align: "left",
          field: row => {
            return row.bpRegion == null ? "NA" : row.bpRegion.regionAreaName;
          },
          sortable: false
        },
        {
          name: "assignedTo",
          required: true,
          label: "AssignedTo",
          align: "left",
          field: row => {
            return row.assignedTo == null
              ? "NA"
              : row.assignedTo.name + " | " + row.assignedTo.employeeID;
          },
          sortable: false
        },
        {
          name: "crmRemark",
          required: true,
          label: "CRM Remark",
          align: "left",
          field: row => {
            return row.crmRemark == null ? "NA" : row.crmRemark;
          },
          sortable: false
        },
        {
          name: "deviceType",
          required: true,
          label: "DeviceType",
          align: "left",
          field: row => {
            return row.deviceType == null ? "NA" : row.deviceType;
          },
          sortable: false
        },
        {
          name: "serviceRequestSubTicketStatus",
          required: true,
          label: "ServiceReqIssueStatus",
          align: "left",
          field: row => {
            return row.subTicketsList[0] == null
              ? "NA"
              : row.subTicketsList[0].serviceRequestSubTicketStatus.name;
          },
          sortable: false
        },
        //         field: row => {
        //         let issues = [];
        //         if (row.subTicketsList.length > 0) {
        //             row.subTicketsList.forEach((element, index) => {
        //                 if (element.serviceRequestSubTicketStatus != null) {
        //                     issues.push((index + 1) + "." + element.serviceRequestSubTicketStatus.name + "   ");
        //                 }
        //             });
        //         }
        //         return issues;
        //     },
        //     sortable: false
        // },
        {
          name: "serviceRequestMode",
          required: true,
          label: "RequestMode",
          align: "left",
          field: row => {
            return row.serviceRequestMode == null
              ? "NA"
              : row.serviceRequestMode;
          },
          sortable: false
        },
        {
          name: "serviceRequestTicketStatus",
          required: true,
          label: "TicketStatus",
          align: "left",
          field: row => {
            return row.serviceRequestTicketStatus;
          },
          sortable: false
        }
      ],
      currentDeviceInfo: {},
      showDeviceAddressModal: false,
      //   formData: {
      //       serviceRequestMode:"",
      //       podNumber:"",
      //   },
      formData: {
        marsDeviceIdsCooked: [],
        marsDeviceIdsCookedUnAssinged: [],
        triggerWelcomeMail: false,
        assignTo: {
          id: ""
        },
        region:"",
        podNumber: ""
      },
      paginationControl: {
        sortBy: "createdDate", // String, column "name" property value
        descending: false,
        page: 1,
        rowsPerPage: 10 // current rows per page being displayed
      },
      paginationControl1: {
        sortBy: "createdDate", // String, column "name" property valuecreated_date
        descending: false,
        page: 1,
        rowsPerPage: 10 // current rows per page being displayed
      },
      paginationControl2: {
        sortBy: "createdDate", // String, column "name" property valuecreated_date
        descending: false,
        page: 1,
        rowsPerPage: 10 // current rows per page being displayed
      },
      tableAjaxLoading: false,
      tableAjaxLoading1: false
    };
  },

  //   validation:{
  //       formData:{
  //           serviceRequestMode:{
  //               required
  //           },
  //       }
  //   },

  computed: {
    ...mapGetters("DeviceReplacement", [
      "getDeviceReplacementQueueAssignedList",
      "getDeviceReplacementQueueUnassignedList"
    ]),
    ...mapGetters("ImplementationExecutive", [
      "getImplementationExecutiveList","getRegionList"
    ]),
    ...mapGetters("serviceRequestPhonepeSat", [
      "getserviceRequestPhonepeUnassignedDatas",
      "getserviceRequestPhonepeAssignedDatas",
      "getPhonepeAssignRegion"
    ]),
    ...mapGetters("SuperAdminUsers", ["getAllStatesData"])
  },
  created() {
    this.ajaxLoadAllLeadInfo({
      pagination: this.paginationControl,
      filter: this.filterSearch
    });
    this.ajaxLoadAllLeadInfo1({
      pagination: this.paginationControl1,
      filter: this.filterSearch1
    });
    this.getPincodeInformations();
  },

  methods: {
    ...mapActions("DeviceReplacement", [
      "DEVICE_REPLACEMENT_QUEUE_ASSIGNED_LIST",
      "DEVICE_REPLACEMENT_QUEUE_UNASSIGNED_LIST",
      "DEVICE_REPLACEMENT_QUEUE_SUBMIT"
    ]),
    ...mapActions("serviceRequestPhonepeSat", [
      "FETCH_PHONEPE_UNASSIGNED_SERVICE_REQUEST_DATAS1",
      "PHONEPE_SERVICE_REQUEST_UNASSIGED_TO_ASSIGNED_STATE",
      "PHONEPE_SERVICE_REQUEST_TO_ASSIGNED_REGION",
      "FETCH_PHONEPE_ASSIGNED_SERVICE_REQUEST_DATAS"
    ]),
    ...mapActions("ImplementationExecutive", ["IMPLEMENTATION_EXECUTIVE_LIST","REGION_LIST"]),
    ...mapActions("SuperAdminUsers", ["FETCH_ALL_STATES_DATA"]),

    fnInputData(request) {},

    getPincodeInformations() {
      this.FETCH_ALL_STATES_DATA();
    },

    fnReassignData(rowDetails) {
      this.propShowUpdateOpenedExternal = !this.propShowUpdateOpenedExternal;
      this.ajaxLoadAllLeadInfo({pagination: this.paginationControl, filter: this.filterSearch});
      // eslint-disable-next-line eqeqeq
      if (rowDetails != undefined) {
        this.propRowDetails = rowDetails;
      }
    },
    ajaxLoadAllLeadInfo1({ pagination, filter }) {
      // we set QTable to "loading" state
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data .."
      });
      this.FETCH_PHONEPE_UNASSIGNED_SERVICE_REQUEST_DATAS1({
        pagination,
        filter
      })
        .then(res => {
          this.IMPLEMENTATION_EXECUTIVE_LIST().then(response => {
            let assumeArr = [];
            this.getImplementationExecutiveList.map(function(value) {
              assumeArr.push({
                label:
                  value.name + " | " + value.employeeID + " | " + value.email,
                value: value.id
              });
            });
            this.assignToOptions = assumeArr;
          });
          this.REGION_LIST().then(response => {
            let assumeArrData = [];
            this.getRegionList.map(function(value) {
              assumeArrData.push({
                label:
                  value.regionAreaName,
                  value: value.regionAreaName
              });
            });
          
            this.assignToRegionOptions = assumeArrData;
          });
          // updating pagination to reflect in the UI
          this.paginationControl1 = pagination;

          // we also set (or update) rowsNumber
          this.paginationControl1.rowsNumber = this.getserviceRequestPhonepeUnassignedDatas.totalElements;
          this.paginationControl1.page =
            this.getserviceRequestPhonepeUnassignedDatas.number + 1;

          // then we update the rows with the fetched ones source
          this.tableData3 = this.getserviceRequestPhonepeUnassignedDatas.content;
          this.externalUnAssignedTableData = this.tableData3.filter(
            service => service.source == true
          );
          if (this.getserviceRequestPhonepeUnassignedDatas.sort != null) {
            this.paginationControl1.sortBy = this.getserviceRequestPhonepeUnassignedDatas.sort[0].property;
            this.paginationControl1.descending = this.getserviceRequestPhonepeUnassignedDatas.sort[0].ascending;
          }

          // finally we tell QTable to exit the "loading" state
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },
    ajaxLoadAllLeadInfo({ pagination, filter }) {
      this.$q.loading.show({
        delay: 0, // ms
        spinnerColor: "purple-9",
        message: "Fetching data .."
      });
      this.FETCH_PHONEPE_ASSIGNED_SERVICE_REQUEST_DATAS({ pagination, filter })
        .then(res => {
          // updating pagination to reflect in the UI
          this.paginationControl = pagination;

          // we also set (or update) rowsNumber
          this.paginationControl.rowsNumber = this.getserviceRequestPhonepeAssignedDatas.totalElements;
          this.paginationControl.page =
            this.getserviceRequestPhonepeAssignedDatas.number + 1;

          // then we update the rows with the fetched ones externalAssignedTableData

          this.tableData1 = this.getserviceRequestPhonepeAssignedDatas.content;

          this.externalAssignedTableData = this.tableData1.filter(
            service => service.source == true
          );
          if (this.getserviceRequestPhonepeAssignedDatas.sort != null) {
            this.paginationControl.sortBy = this.getserviceRequestPhonepeAssignedDatas.sort[0].property;
            this.paginationControl.descending = this.getserviceRequestPhonepeAssignedDatas.sort[0].ascending;
          }

          // finally we tell QTable to exit the "loading" state
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },

    //Load all short lead info while page loading
    goToUnassignedTab(tab) {
      if (tab == "unAssigned") {
        this.ajaxLoadAllLeadInfo1({
          pagination: this.paginationControl1,
          filter: this.filterSearch1
        });
      } else {
        this.ajaxLoadAllLeadInfo({
          pagination: this.paginationControl,
          filter: this.filterSearch
        });
      }
    },
    // goToUnassignedTab(tab) {
    //     if (tab == "unAssigned") {
    //         let request = {
    //             pagination: this.paginationControl1,
    //             filter: this.filterSearch1,
    //         };
    //         this.toggleAjaxLoadFilter = true;
    //         this.FETCH_PHONEPE_UNASSIGNED_SERVICE_REQUEST_DATAS1(request)
    //             .then((response) => {
    //                 this.toggleAjaxLoadFilter = false;
    //             })
    //             .catch((error) => {
    //                 this.toggleAjaxLoadFilter = false;
    //             });
    //     } else {
    //         this.ajaxLoadAllLeadInfo({
    //             pagination: this.paginationControl,
    //             filter: this.filterSearch,
    //         });
    //     }
    // },

    // Function to open device address pop up
    UpdateDeviceAddress(currentDeviceInfo) {
      this.currentDeviceInfo = [];
      this.showDeviceAddressModal = !this.showDeviceAddressModal;
      if (this.formData.marsDeviceIdsCooked.length == 0) {
        let assumeObj = {
          id: [currentDeviceInfo.id],
          marsDeviceAddress: {
            deviceAddress: currentDeviceInfo.deviceAddress,
            latitude: 0,
            longitude: 0,
            pincode: currentDeviceInfo.pincode,
            city: currentDeviceInfo.city,
            state: currentDeviceInfo.state
          }
        };
        this.currentDeviceInfo = assumeObj;
      } else {
        let marsDeviceIdsCooked = [];
        this.formData.marsDeviceIdsCooked.map(function(value) {
          marsDeviceIdsCooked.push(value.id);
        });
        let assumeObj = {
          id: marsDeviceIdsCooked,
          marsDeviceAddress: {
            deviceAddress: currentDeviceInfo.deviceAddress,
            latitude: 0,
            longitude: 0,
            pincode: currentDeviceInfo.pincode,
            city: currentDeviceInfo.city,
            state: currentDeviceInfo.state
          }
        };
        this.currentDeviceInfo = assumeObj;
      }
    },
    // Function to open device address pop up
    UpdateDeviceAddressAfterEmit(pagination) {
      this.showDeviceAddressModal = !this.showDeviceAddressModal;
      this.paginationControl = pagination;
    },

    // Function to assign implementation manager in implementation queue
    assignImplementationUser() {
      let self = this;
      if (self.formData.marsDeviceIdsCooked.length == 0) {
        self.$q.notify({
          color: "negative",
          position: "bottom",
          message: "Select atleast one item to assign",
          icon: "thumb_down"
        });
      } 
      else if (self.formData.assignTo == "") {
        self.$q.notify({
          color: "negative",
          position: "bottom",
          message: "Request Mode cannot be empty!",
          icon: "thumb_down"
        });
      } 
      // else if (
      //   self.formData.serviceRequestMode == "Direct Dispatch" &&
      //   self.formData.podNumber == null
      // ) {
      //   self.$q.notify({
      //     color: "negative",
      //     position: "bottom",
      //     message: "Pod Number cannot be empty!",
      //     icon: "thumb_down"
      //   });
      // } 
      else if(self.formData.assignTo.id != null && (self.formData.assignTo.region == null || self.formData.assignTo.region == '')){
           this.$q.loading.show({
          delay: 100, // ms
          spinnerColor: "purple-9",
          message: "Please wait.."
        });
        let marsDeviceIdsCooked = [];
        self.formData.marsDeviceIdsCooked.map(function(value) {
          value.podNumber = self.formData.podNumber;
          value.serviceRequestMode = self.formData.serviceRequestMode;
          // value.assignedTo = self.formData.assignTo.id;
          marsDeviceIdsCooked.push(value);
        });
        let postValues = {
          // action: this.$MARS_DEVICE_STATUS_SAT_ASSIGNED,
          request: marsDeviceIdsCooked,
          // triggerWelcomeMail: self.formData.triggerWelcomeMail,
          userId: self.formData.assignTo.id
           };
           self
          .PHONEPE_SERVICE_REQUEST_UNASSIGED_TO_ASSIGNED_STATE(postValues)
          .then(res => {
            if (res.status == 200 && res.data.data.serviceRequest != null) {
              this.formData.marsDeviceIdsCooked = [];
              this.formData.assignTo = "";
              this.$q.notify({
                color: "positive",
                position: "bottom",
                message: "Successfully assigned!",
                icon: "thumb_up"
              });
              this.$q.loading.hide();
              this.ajaxLoadAllLeadInfo1({
                pagination: this.paginationControl,
                filter: this.filterSearch
              });
            } else if (res.status == 200 && res.data.data.Success != null) {
              this.formData.marsDeviceIdsCooked = [];
              this.formData.assignTo = "";
              this.$q.notify({
                color: "positive",
                position: "bottom",
                message: "Successfully assigned!",
                icon: "thumb_up"
              });
              this.$q.loading.hide();
              this.ajaxLoadAllLeadInfo1({
                pagination: this.paginationControl,
                filter: this.filterSearch
              });
            } else if (res.status == 200 && res.data.data.Failed != null) {
              this.$router.push({
                name: "externalServiceAddressFetch",
                params: { data: res }
              });
            } else {
              self.$q.notify({
                color: "negative",
                position: "bottom",
                message: "INTERNAL SERVER ERROR !!",
                icon: "thumb_down"
              });
              this.$q.loading.hide();
            }
          })
          .catch(() => {
            self.$q.notify({
              color: "negative",
              position: "bottom",
              message: "Please try again",
              icon: "thumb_down"
            });
            this.$q.loading.hide();
          });
      }
      else if(self.formData.assignTo.region != null && (self.formData.assignTo.id == null || self.formData.assignTo.id == '')){
           this.$q.loading.show({
          delay: 100, // ms
          spinnerColor: "purple-9",
          message: "Please wait.."
        });
        let marsDeviceIdsCooked = [];
        self.formData.marsDeviceIdsCooked.map(function(value, index) {
          marsDeviceIdsCooked.push({
            serviceReqTicketId: value.serviceReqTicketId,
            bpRegion: {
              regionAreaName: self.formData.assignTo.region
            }
          })
        });
        self
          .PHONEPE_SERVICE_REQUEST_TO_ASSIGNED_REGION(marsDeviceIdsCooked)
          .then(res => {
            if (res.status == 200) {
              this.formData.marsDeviceIdsCooked = [];
              this.formData.assignTo = "";
              this.$q.notify({
                color: "positive",
                position: "bottom",
                message: res.body.data,
                icon: "thumb_up"
              });
              this.$q.loading.hide();
              this.ajaxLoadAllLeadInfo1({
                pagination: this.paginationControl,
                filter: this.filterSearch
              });
            } 
            else {
              self.$q.notify({
                color: "negative",
                position: "bottom",
                message: res.body.data,
                icon: "thumb_down"
              });
              this.$q.loading.hide();
            }
          })

          .catch((error) => {
            self.$q.notify({
              color: "negative",
              position: "bottom",
              message: error.body.data,
              icon: "thumb_down"
            });
            this.$q.loading.hide();
          });

      }
      else if (self.formData.assignTo.id != null && self.formData.region != null) {
        self.$q.notify({
          color: "negative",
          position: "bottom",
          message: "Select Only One Request mode",
          icon: "thumb_down"
        });
      } 
      else{
         self.$q.notify({
          color: "negative",
          position: "bottom",
          message: "Select Any One Request mode",
          icon: "thumb_down"
        });
      }
        // else {
        // this.$q.loading.show({
        //   delay: 100, // ms
        //   spinnerColor: "purple-9",
        //   message: "Please wait.."
        // });
        // let marsDeviceIdsCooked = [];
        // self.formData.marsDeviceIdsCooked.map(function(value) {
        //   value.podNumber = self.formData.podNumber;
        //   value.serviceRequestMode = self.formData.serviceRequestMode;
        //   // value.assignedTo = self.formData.assignTo.id;
        //   marsDeviceIdsCooked.push(value);
        // });
        // let postValues = {
        //   // action: this.$MARS_DEVICE_STATUS_SAT_ASSIGNED,
        //   request: marsDeviceIdsCooked,
        //   // triggerWelcomeMail: self.formData.triggerWelcomeMail,
        //   userId: self.formData.assignTo.id
        // };
        // self
        //   .PHONEPE_SERVICE_REQUEST_UNASSIGED_TO_ASSIGNED_STATE(postValues)
        //   .then(res => {
        //     if (res.status == 200 && res.data.data.serviceRequest != null) {
        //       this.formData.marsDeviceIdsCooked = [];
        //       this.formData.assignTo = "";
        //       this.$q.notify({
        //         color: "positive",
        //         position: "bottom",
        //         message: "Successfully assigned!",
        //         icon: "thumb_up"
        //       });
        //       this.$q.loading.hide();
        //       this.ajaxLoadAllLeadInfo1({
        //         pagination: this.paginationControl,
        //         filter: this.filterSearch
        //       });
        //     } else if (res.status == 200 && res.data.data.Success != null) {
        //       this.formData.marsDeviceIdsCooked = [];
        //       this.formData.assignTo = "";
        //       this.$q.notify({
        //         color: "positive",
        //         position: "bottom",
        //         message: "Successfully assigned!",
        //         icon: "thumb_up"
        //       });
        //       this.$q.loading.hide();
        //       this.ajaxLoadAllLeadInfo1({
        //         pagination: this.paginationControl,
        //         filter: this.filterSearch
        //       });
        //     } else if (res.status == 200 && res.data.data.Failed != null) {
        //       this.$router.push({
        //         name: "externalServiceAddressFetch",
        //         params: { data: res }
        //       });
        //     } else {
        //       self.$q.notify({
        //         color: "negative",
        //         position: "bottom",
        //         message: "INTERNAL SERVER ERROR !!",
        //         icon: "thumb_down"
        //       });
        //       this.$q.loading.hide();
        //     }
        //   })

        //   .catch(() => {
        //     self.$q.notify({
        //       color: "negative",
        //       position: "bottom",
        //       message: "Please try again",
        //       icon: "thumb_down"
        //     });
        //     this.$q.loading.hide();
        //   });
      // }
    },
    // Function to unAssignImplementationUser in implementation queue
    unAssignImplementationUser() {
      let self = this;
      if (self.formData.marsDeviceIdsCookedUnAssinged.length == 0) {
        self.$q.notify({
          color: "negative",
          position: "bottom",
          message: "Select atleast one item to Unassign",
          icon: "thumb_down"
        });
      } else {
        let marsDeviceIdsCookedUnAssinged = [];
        self.formData.marsDeviceIdsCookedUnAssinged.map(function(value) {
          marsDeviceIdsCookedUnAssinged.push(value.id);
        });

        let postValues = {
          action: this.$MARS_DEVICE_STATUS_TID_GENERATED,
          marsDeviceIds: marsDeviceIdsCookedUnAssinged,
          userId: this.$SEND_ZERO_FOR_UNASSIGING
        };
        self
          .DEVICE_REPLACEMENT_QUEUE_SUBMIT(postValues)
          .then(() => {
            this.ajaxLoadAllLeadInfo({
              pagination: this.paginationControl,
              filter: this.filterSearch
            });
            this.ajaxLoadAllLeadInfo1({
              pagination: this.paginationControl1,
              filter: this.filterSearch1
            });
            self.formData.marsDeviceIdsCookedUnAssinged = [];
            self.formData.assignTo = "";
            self.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Successfully Unassigned!",
              icon: "thumb_up"
            });
          })
          .catch(() => {
            self.$q.notify({
              color: "negative",
              position: "bottom",
              message: "Please try again",
              icon: "thumb_down"
            });
          });
      }
    },

    // Function to unAssignImplementationUser in implementation queue
    reAssignImplementationUser() {
      let self = this;
      if (self.formData.marsDeviceIdsCookedUnAssinged.length == 0) {
        self.$q.notify({
          color: "negative",
          position: "bottom",
          message: "Select atleast one item to assign",
          icon: "thumb_down"
        });
      } else if (self.formData.assignTo == "") {
        self.$q.notify({
          color: "negative",
          position: "bottom",
          message: "Implementation officer cannot be empty!",
          icon: "thumb_down"
        });
      } else {
        let marsDeviceIdsCookedUnAssinged = [];
        self.formData.marsDeviceIdsCookedUnAssinged.map(function(value) {
          marsDeviceIdsCookedUnAssinged.push(value.id);
        });

        let postValues = {
          action: this.$MARS_DEVICE_STATUS_SAT_ASSIGNED,
          marsDeviceIds: marsDeviceIdsCookedUnAssinged,
          triggerWelcomeMail: self.formData.triggerWelcomeMail,
          userId: self.formData.assignTo
        };
        self
          .DEVICE_REPLACEMENT_QUEUE_SUBMIT(postValues)
          .then(() => {
            self.DEVICE_REPLACEMENT_QUEUE_UNASSIGNED_LIST();
            self.ajaxLoadAllLeadInfo();
            self.formData.marsDeviceIdsCookedUnAssinged = [];
            self.formData.assignTo = "";
            self.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Successfully re assigned !",
              icon: "thumb_up"
            });
          })
          .catch(() => {
            self.$q.notify({
              color: "negative",
              position: "bottom",
              message: "Please try again",
              icon: "thumb_down"
            });
          });
      }
    },
    expandRowPlease(value) {},
    onRowClick(evt, row) {},

    // Function to show PDF
    fnPDFViewModal(documentUrl) {
      this.PDFDetails = documentUrl;
      this.toggleshowPDFModal = !this.toggleshowPDFModal;
    },

    // Function to toggle lead information pop up screen
    toggleLeadInformation(leadDetails) {
      this.propToggleLeadInformation = !this.propToggleLeadInformation;
      if (leadDetails != undefined) {
        this.addtnLeadInformation = leadDetails;
      }
    },

    // Function to toggle Service Request pop up screen
    toggleServiceRequest(leadDetails) {
      this.propToggleServiceRequest = !this.propToggleServiceRequest;
      if (leadDetails != undefined) {
        this.addtnServiceRequest = leadDetails;
      }
    }
  }
};
</script>

<style scoped>
.customTd {
  text-align: left !important;
  word-wrap: break-word;
  white-space: normal;
}

.customTd.customCellLength {
  min-width: 300px !important;
  overflow-x: auto;
}
</style>
