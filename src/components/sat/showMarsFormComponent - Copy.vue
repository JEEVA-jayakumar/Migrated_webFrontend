<template>
    <div>
        <!-- Documents -->
        <div class="row">
            <!-- Documents proof -->
            <div class="col-md-5 q-pa-xs" v-if="showDocumentPreview">
                <q-list no-border class="no-padding">
                    <q-item v-if="formData.shortLead.applicationFileMimeType != null" separator class="q-body-1">
                        <div class="full-width">
                            <div class="cursor-pointer" v-if="formData.shortLead.applicationFileMimeType.includes('pdf')">
                                <div @click="fnPDFViewModal(formData.shortLead.applicationFile)">
                                    <q-btn round size="sm" icon="fas fa-file-pdf" color="primary" />
                                    &nbsp;{{formData.shortLead.applicationFile}}
                                </div>
                            </div>
                            <div class="cursor-pointer" v-else-if="formData.shortLead.applicationFileMimeType.includes('image')">
                            <viewer :images="[GLOBAL_FILE_FETCH_URL+ '/'+formData.shortLead.applicationFile]" class="hidden">
                                <img :src="[GLOBAL_FILE_FETCH_URL+ '/'+formData.shortLead.applicationFile]" ref="handedOverImageViewer" style="max-width:100%">
                            </viewer>
                            <div @click="fnViewHandedOverFileImage()">
                                <q-btn round size="sm" icon="fas fa-image" color="amber-9" />
                                &nbsp;{{formData.shortLead.applicationFile}}
                            </div>
                            </div>
                            <div v-else>
                                No default document attached
                            </div>
                        </div>
                    </q-item>
                    <q-item separator class="no-padding">
                        <q-item-main class="q-caption">
                            <div v-for="(documents,index) in formData.shortLead.leadDocuments" :key="index" >
                                <div class="row items-center full-width"
                                v-if="index.toString()==documents[0].subDocumentType">
                                    <div class="col-md-12 q-body-1">
                                        <q-collapsible separator indent opened group="closeOnOpen" multiline class="full-width">
                                            <template slot="header">
                                                <q-item-side icon="attach_file" />
                                                <q-item-main class="q-body-1" :label="index" />
                                            </template>
                                            <div v-for="(item,subIndex) in documents[0].uploadedDocuments" :key="subIndex" class="q-py-sm">
                                                <div v-if="item.mimeType.includes('application')">
                                                        <div @click="fnDocumentUrl(item.fileName)" class="cursor-pointer no-underline">
                                                        <q-btn round size="sm" icon="fas fa-file-pdf" color="primary" />
                                                        &nbsp;{{item.fileNameOriginal}}
                                                    </div>
                                                </div>
                                                <div v-else-if="item.mimeType.includes('image')">
                                                    <div class="no-underline cursor-pointer">
                                                        <v-zoom :img="GLOBAL_FILE_FETCH_URL+ '/'+item.fileName" :width="'100%'" :magnify="1.25"></v-zoom>
                                                    </div>
                                                </div>
                                                <div v-else>No documents attached</div>
                                            </div>
                                        </q-collapsible>
                                    </div>
                                </div>
                                
                                    <div class="row items-center full-width" v-else>
                                    <div class="col-md-12 q-body-1">
                                        <q-collapsible separator opened group="closeOnOpen"  class="full-width">
                                            <template slot="header">
                                                <q-item-side  icon="apps" />
                                                <q-item-main class="q-body-1" :label="index" />
                                            </template>
                                            <div class="row items-center full-width" v-for="(subDocument,subIndex) in documents" :key="subIndex">
                                                <div class="col-md-12 q-body-1">
                                                    <q-collapsible separator opened group="closeOnOpenSubDocument" multiline class="full-width">
                                                        <template slot="header">
                                                            <q-item-side icon="attach_file" />
                                                            <q-item-main class="q-body-1" :label="subDocument.subDocumentType" />
                                                        </template>
                                                        <div v-for="(item,subIndex) in subDocument.uploadedDocuments" :key="subIndex" class="q-py-sm">
                                                            <div v-if="item.mimeType.includes('application')">
                                                                <div @click="fnDocumentUrl(item.fileName)" class="cursor-pointer no-underline">
                                                                    <q-btn round size="sm" icon="fas fa-file-pdf" color="primary" />
                                                                    &nbsp;{{item.fileNameOriginal}}
                                                                </div>
                                                            </div>
                                                            <div v-else-if="item.mimeType.includes('image')">
                                                                <div class="no-underline cursor-pointer">
                                                                    <v-zoom :img="GLOBAL_FILE_FETCH_URL+ '/'+item.fileName" :width="'100%'" :magnify="1.25"></v-zoom>
                                                                </div>
                                                            </div>
                                                            <div v-else>
                                                                No document attached
                                                            </div>
                                                        </div>
                                                    </q-collapsible>
                                                </div>
                                            </div>
                                        </q-collapsible>
                                    </div>
                                </div>
                            </div>
                        </q-item-main>
                    </q-item>
                </q-list>
            </div>

            <div class="col-md-5 q-pa-xs group" v-if="!showDocumentPreview">
                <div>
                    <vuePdfjs :url="GLOBAL_FILE_FETCH_URL+'/'+populatedDocumentUrl" :type="0" :height="'500px'"></vuePdfjs>
                </div>
                <div>
                    <q-btn
                        label="Close Preview"
                        icon="clear"
                        class="common-dark-blue"
                        @click="fnCloseDocumentPreview"
                    />
                </div>
            </div>

            <!-- Document related form -->
            <div class="col-md-7 q-pa-xs">
                <q-stepper color="light-blue" ref="stepper" contractable text alternative-labels>
                    <q-step default name="first" title="Sales" subtitle="Info">
                        <div class="row gutter-sm">
                            <div class="col-md-6 col-sm-12">
                                <q-select
                                color="grey-9"
                                v-model="onBoardDetails.merchant.salesInfo.institutionCode"
                                float-label="Application Type"
                                radio
                                :options="institutionCodeOptions"
                                />
                            </div>
                            <div class="col-md-6 col-sm-12">
                                <q-select
                                color="grey-9"
                                v-model="onBoardDetails.merchant.salesInfo.applicationType"
                                float-label="Application Type"
                                radio
                                :options="applicationTypeOptions"
                                />
                            </div>
                            <div class="col-md-6 col-sm-12">
                                <q-input color="grey-9" v-model="text" type="number" float-label="Application Number" placeholder="Application Number" />
                            </div>
                            <div class="col-md-6">
                                <q-datetime minimal color="grey-9" v-model="onBoardDetails.merchant.salesInfo.applicationDate" type="date" float-label="Application Date" placeholder="Application Date" />
                            </div>
                            <div class="col-md-6">
                                <q-select
                                color="grey-9"
                                v-model="select"
                                float-label="Merchant Type"
                                radio
                                :options="selectOptions"
                                />
                            </div>
                            <div class="col-md-6">
                                <q-select
                                color="grey-9"
                                v-model="select"
                                float-label="Sales Person"
                                radio
                                :options="selectOptions"
                                />
                            </div>
                            <div class="col-md-6">
                                <q-select
                                color="grey-9"
                                v-model="select"
                                float-label="Region"
                                radio
                                :options="selectOptions"
                                />
                            </div>
                            <div class="col-md-6">
                                <q-select
                                color="grey-9"
                                v-model="select"
                                float-label="Lead From"
                                radio
                                :options="selectOptions"
                                />
                            </div>
                            <div class="col-md-6">
                                <p class="q-caption">Subvention Type</p>
                                <q-checkbox color="grey-9" v-model="checked" label="Bank MDR" />
                                <q-checkbox color="grey-9" v-model="checked" label="Bijlipay MDR" />
                            </div>
                            <div class="col-md-6">
                                <p class="q-caption">Sharing Model</p>
                                <q-radio color="grey-9" v-model="option" val="opt2" label="No Sharing" />
                                <q-radio color="grey-9" v-model="option" val="opt2" label="Transaction Value Model" />
                                <q-radio color="grey-9" v-model="option" val="opt3" label="MDR and/or Rent" />
                            </div>
                        </div>
                        <!-- Navigation for this step at the end of QStep-->
                        <q-stepper-navigation>
                            <q-btn color="primary" class="q-ma-xs" @click="$refs.stepper.next()" label="Continue" />
                            <q-btn color="warning" class="q-ma-xs" label="Save Partial" />
                        </q-stepper-navigation>
                    </q-step>
                    <q-step name="second" title="Company" subtitle="Info">
                        <div class="row gutter-sm">
                            <div class="col-md-6 col-sm-12">
                                <q-input color="grey-9" v-model="onBoardDetails.companyInfo.legalName" float-label="Legal name" placeholder="Legal name" />
                            </div>
                            <div class="col-md-6 col-sm-12">
                                <q-input color="grey-9" v-model="onBoardDetails.companyInfo.dbaName" float-label="DBA name" placeholder="DBA name" />
                            </div>
                            <div class="col-md-12">
                                <q-input
                                color="grey-9"
                                v-model="onBoardDetails.companyInfo.registeredAddress"
                                type="textarea"
                                float-label="Registered Address"
                                placeholder="Registered Address"
                                :max-height="100"
                                rows="1"
                                />
                            </div>
                            <div class="col-md-6">
                                <q-input color="grey-9" type="number" v-model="onBoardDetails.companyInfo.registeredPin" float-label="PIN" placeholder="PIN" />
                            </div>
                            <div class="col-md-6">
                                <q-select
                                color="grey-9"
                                v-model="onBoardDetails.companyInfo.registeredCityRefCode"
                                float-label="City"
                                placeholder="City"
                                radio
                                :options="selectCityOptions"
                                />
                            </div>
                            <div class="col-md-6">
                                <q-select
                                color="grey-9"
                                v-model="onBoardDetails.companyInfo.registeredStateRefCode"
                                float-label="State"
                                placeholder="State"
                                radio
                                :options="selectStateOptions"
                                />
                            </div>
                            <div class="col-md-6">
                                <q-select
                                color="grey-9"
                                v-model="select"
                                float-label="Type of Business Entity"
                                radio
                                :options="selectOptions"
                                />
                            </div>
                            <div class="col-md-6">
                                <q-select
                                color="grey-9"
                                v-model="select"
                                float-label="Year of Establishment"
                                radio
                                :options="selectOptions"
                                />
                            </div>
                            <div class="col-md-6">
                                <q-input color="grey-9" type="number" v-model="onBoardDetails.companyInfo.registerNumber" float-label="Establish Number" placeholder="Establish Number" />
                            </div>
                            <div class="col-md-6">
                                <q-input color="grey-9" type="number" v-model="onBoardDetails.companyInfo.tin" float-label="TIN" placeholder="TIN" />
                            </div>

                            <div class="col-md-6">
                                <q-input color="grey-9" type="number" v-model="onBoardDetails.companyInfo.pan" float-label="Company PAN" placeholder="Company PAN" />
                            </div>
                            <div class="col-md-6">
                                <q-input color="grey-9" type="number" v-model="onBoardDetails.companyInfo.tan" float-label="TAN" placeholder="TAN" />
                            </div>
                            <div class="col-md-12">
                                <q-input color="grey-9" type="number" v-model="onBoardDetails.companyInfo.businessNature" float-label="Name of Business" placeholder="Name of Business" />
                            </div>
                            <div class="col-md-6">
                                <p class="q-caption">Type of Business</p>
                                <q-radio color="grey-9" v-model="onBoardDetails.companyInfo.businessType" val="R" label="Rented" />
                                <q-radio color="grey-9" v-model="onBoardDetails.companyInfo.businessType" val="O" label="Owned" />
                                <q-radio color="grey-9" v-model="onBoardDetails.companyInfo.businessType" val="L" label="Leased" />
                            </div>
                            <div class="col-md-6">
                                <q-input color="grey-9" type="number" v-model="text" float-label="MCC" placeholder="MCC" />
                            </div>
                            <div class="col-md-6">
                                <q-input color="grey-9" type="number" v-model="text" float-label="TCC" placeholder="TCC" />
                            </div>
                            <div class="col-md-12">
                                <q-input
                                color="grey-9"
                                v-model="text"
                                type="textarea"
                                float-label="Residential Address"
                                placeholder="Residential Address"
                                :max-height="100"
                                rows="1"
                                />
                            </div>
                            <div class="col-md-6">
                                <q-input color="grey-9" type="number" v-model="text" float-label="PIN" placeholder="PIN" />
                            </div>
                            <div class="col-md-6">
                                <q-select
                                color="grey-9"
                                v-model="select"
                                float-label="City"
                                radio
                                :options="selectOptions"
                                />
                            </div>
                            <div class="col-md-6">
                                <q-select
                                color="grey-9"
                                v-model="select"
                                float-label="State"
                                radio
                                :options="selectOptions"
                                />
                            </div>
                            <div class="col-md-6">
                                <q-input color="grey-9" v-model="text" float-label="Contact Name" placeholder="Contact Name" />
                            </div>
                            <div class="col-md-6">
                                <q-input color="grey-9" type="number" v-model="text" float-label="Mobile" placeholder="Mobile" />
                            </div>
                            <div class="col-md-6">
                                <q-input color="grey-9" type="tel" v-model="text" float-label="Alt Mobile" placeholder="Alt Mobile" />
                            </div>
                            <div class="col-md-6">
                                <q-input color="grey-9" type="tel" v-model="text" float-label="Alt Mobile" placeholder="Alt Mobile" />
                            </div>
                            <div class="col-md-6">
                                <q-input color="grey-9" type="tel" v-model="text" float-label="Telephone" placeholder="Telephone" />
                            </div>
                            <div class="col-md-6">
                                <q-input color="grey-9" type="email" v-model="text" float-label="Email" placeholder="Email" />
                            </div>
                            <div class="col-md-6">
                                <p class="q-caption">Statement Type</p>
                                <q-radio color="grey-9" v-model="option" val="opt2" label="E-Statement" />
                                <q-radio color="grey-9" v-model="option" val="opt2" label="Paper Statement" />
                            </div>
                            <div class="col-md-6">
                                <p class="q-caption">Paper Statement</p>
                                <q-radio color="grey-9" v-model="option" val="opt2" label="Daily" />
                                <q-radio color="grey-9" v-model="option" val="opt2" label="Monthly" />
                                <q-radio color="grey-9" v-model="option" val="opt3" label="Quaterly" />
                                <q-radio color="grey-9" v-model="option" val="opt3" label="Half Yearly" />
                                <q-radio color="grey-9" v-model="option" val="opt3" label="None" />
                            </div>
                        </div>
                        <q-stepper-navigation>
                        <q-btn color="primary" class="q-ma-xs" @click="$refs.stepper.next()" label="Continue" />
                        <q-btn color="warning" class="q-ma-xs" label="Save Partial" />
                        <q-btn color="secondary" class="q-ma-xs" flat @click="$refs.stepper.previous()" label="Back" />
                        </q-stepper-navigation>
                    </q-step>
                    <q-step name="third" title="Partners">
                        <div class="row gutter-sm">
                            <div class="col-md-6 col-sm-12">
                                <q-input color="grey-9" v-model="text" float-label="Name" placeholder="Name" />
                            </div>
                            <div class="col-md-12">
                                <q-input color="grey-9" type="textarea" v-model="text" float-label="Address" placeholder="Address" />
                            </div>
                            <div class="col-md-6 col-sm-12">
                                <q-input color="grey-9" v-model="text" float-label="PAN" placeholder="PAN" />
                            </div>
                            <div class="col-md-6 col-sm-12">
                                <q-input color="grey-9" type="number" v-model="text" float-label="PIN" placeholder="PIN" />
                            </div>
                            <div class="col-md-6">
                                <q-select
                                color="grey-9"
                                v-model="select"
                                float-label="City"
                                radio
                                :options="selectOptions"
                                />
                            </div>
                            <div class="col-md-6">
                                <q-select
                                color="grey-9"
                                v-model="select"
                                float-label="State"
                                radio
                                :options="selectOptions"
                                />
                            </div>
                            <div class="col-md-6 col-sm-12">
                                <q-input color="grey-9" type="tel" v-model="text" float-label="Mobile" placeholder="Mobile" />
                            </div>
                            <div class="col-md-6 col-sm-12">
                                <q-input color="grey-9" type="email" v-model="text" float-label="Email" placeholder="Email" />
                            </div>
                        </div>
                        <q-stepper-navigation>
                        <q-btn color="primary" class="q-ma-xs" @click="$refs.stepper.next()" label="Continue" />
                        <q-btn color="warning" class="q-ma-xs" label="Save Partial" />
                        <q-btn color="secondary" class="q-ma-xs" flat @click="$refs.stepper.previous()" label="Back" />
                        </q-stepper-navigation>
                    </q-step>
                    <q-step name="fourth" title="Business" subtitle="Info">
                        <div class="row gutter-sm">
                            <div class="col-md-6 col-sm-12">
                                <p class="q-caption">Business Hours(Week Days)</p>
                                <q-datetime color="grey-9" format-model="number"	v-model="date2" type="time" format24h float-label="From" />
                            </div>
                            <div class="col-md-6 col-sm-12">
                                <p class="q-caption">Business Hours(Week Days)</p>
                                <q-datetime color="grey-9" format-model="number"	v-model="date2" type="time" format24h float-label="To" />
                            </div>
                            <div class="col-md-6 col-sm-12">
                                <p class="q-caption">Business Hours(Weekends)</p>
                                <q-datetime color="grey-9" format-model="number"	v-model="date2" type="time" format24h float-label="From" />
                            </div>
                            <div class="col-md-6 col-sm-12">
                                <p class="q-caption">Business Hours(Weekends)</p>
                                <q-datetime color="grey-9" format-model="number"	v-model="date2" type="time" format24h float-label="To" />
                            </div>
                            <div class="col-md-6 col-sm-12">
                                <q-input color="grey-9" type="number" v-model="text" float-label="Business Income" placeholder="Business Income" />
                            </div>
                            <div class="col-md-6">
                                <q-datetime color="grey-9" v-model="text" type="date" float-label="Turning During Later Year" placeholder="Application Date" />
                            </div>
                            <div class="col-md-6 col-sm-12">
                                <q-input color="grey-9" type="number" v-model="text" float-label="Amount" placeholder="Amount" />
                            </div>
                            <div class="col-md-6 col-sm-12">
                                <q-input color="grey-9" type="number" v-model="text" float-label="Expected Card Business" placeholder="Expected Card Business" />
                            </div>
                            <div class="col-md-6 col-sm-12">
                                <q-input color="grey-9" type="number" v-model="text" float-label="Average Bill Amount" placeholder="Average Bill Amount" />
                            </div>
                            <div class="col-md-6 col-sm-12">
                                <q-input color="grey-9" v-model="text" float-label="GST ID" placeholder="GST ID" />
                            </div>
                            <div class="col-md-6 col-sm-12">
                                <q-input color="grey-9" v-model="text" float-label="Name of the other POS Currentlly Used" placeholder="Name of the other POS Currentlly Used" />
                            </div>
                            <div class="col-md-6 col-sm-12">
                                <q-input color="grey-9" type="number" v-model="text" float-label="Debit Card" placeholder="Debit Card" />
                            </div>
                            <div class="col-md-6 col-sm-12">
                                <q-input color="grey-9" type="number" v-model="text" float-label="Credit Card" placeholder="Credit Card" />
                            </div>
                            <div class="col-md-6 col-sm-12">
                                <q-datetime color="grey-9" format-model="number"	v-model="date2" type="date" format24h float-label="Member Since" />
                            </div>
                        </div>
                        <q-stepper-navigation>
                            <q-btn color="primary" class="q-ma-xs" @click="$refs.stepper.next()" label="Continue" />
                            <q-btn color="warning" class="q-ma-xs" label="Save Partial" />
                            <q-btn color="secondary" class="q-ma-xs" flat @click="$refs.stepper.previous()" label="Back" />
                        </q-stepper-navigation>
                    </q-step>
                    <q-step name="fifth" title="Payment" subtitle="Details">
                            <div class="row gutter-sm">
                            <div class="col-md-6">
                                <p class="q-caption">Device Owned By</p>
                                <q-radio color="grey-9" v-model="option" val="opt2" label="Bijlipay" />
                                <q-radio color="grey-9" v-model="option" val="opt2" label="Merchant" />
                            </div>
                            <div class="col-md-6 col-sm-12">
                                <q-input color="grey-9" type="number" v-model="text" float-label="Installation Fee" placeholder="Installation Fee" />
                            </div>
                            <div class="col-md-6">
                                <q-select
                                color="grey-9"
                                v-model="select"
                                float-label="Terminal Model"
                                radio
                                :options="selectOptions"
                                />
                            </div>
                            <div class="col-md-6 col-sm-12">
                                <q-input color="grey-9" type="number" v-model="text" float-label="No of Terminals" placeholder="No of Terminals" />
                            </div>
                            <div class="col-md-6">
                                <p class="q-caption">Cash @POS Enabled?</p>
                                <q-radio color="grey-9" v-model="option" val="opt2" label="Yes" />
                                <q-radio color="grey-9" v-model="option" val="opt2" label="No" />
                            </div>
                            <div class="col-md-6">
                                <q-select
                                color="grey-9"
                                v-model="select"
                                float-label="Rental Plan"
                                radio
                                :options="selectOptions"
                                />
                            </div>
                            <div class="col-md-6">
                                <q-select
                                color="grey-9"
                                v-model="select"
                                float-label="Rental Mode"
                                radio
                                :options="selectOptions"
                                />
                            </div>
                            <div class="col-md-6">
                                <p class="q-caption">Rental Type</p>
                                <q-radio color="grey-9" v-model="option" val="opt2" label="Advanced" />
                                <q-radio color="grey-9" v-model="option" val="opt2" label="Regular" />
                            </div>
                            <div class="col-md-6 col-sm-12">
                                <q-input color="grey-9" type="number" v-model="text" float-label="Device Price" placeholder="Device Price" />
                            </div>
                            <div class="col-md-6 col-sm-12">
                                <q-input color="grey-9" type="number" v-model="text" float-label="Other Charges" placeholder="Other Charges" />
                            </div>
                            <div class="col-md-6 col-sm-12">
                                <q-input color="grey-9" type="number" v-model="text" float-label="Total Amount Paid" placeholder="Total Amount Paid" />
                            </div>
                        </div>
                        <q-stepper-navigation>
                            <q-btn color="primary" class="q-ma-xs" @click="$refs.stepper.next()" label="Continue" />
                            <q-btn color="warning" class="q-ma-xs" label="Save Partial" />
                            <q-btn color="secondary" class="q-ma-xs" flat @click="$refs.stepper.previous()" label="Back" />
                        </q-stepper-navigation>
                    </q-step>
                    <q-step name="seventh" title="Bank & Collection" subtitle="Details">
                        <div class="row gutter-sm items-center">
                            <div class="col-md-12">
                                <p class="q-caption">Merchant Bank Details</p>
                            </div>
                            <div class="col-md-6">
                                <q-input color="grey-9" v-model="text" float-label="IFSC Code" placeholder="IFSC Code" />
                            </div> 
                            <div class="col-md-6">
                                <q-input color="grey-9" type="number" v-model="text" float-label="MICR" placeholder="MICR" />
                            </div>
                            <div class="col-md-6">
                                <q-input color="grey-9" v-model="text" float-label="Bank Name" placeholder="Bank Name" />
                            </div>
                            <div class="col-md-6">
                                <q-input color="grey-9" v-model="text" float-label="Branch Name" placeholder="Branch Name" />
                            </div>
                            <div class="col-md-6">
                                <q-select
                                color="grey-9"
                                v-model="select"
                                float-label="City"
                                radio
                                :options="selectOptions"
                                />
                            </div>
                            <div class="col-md-6">
                                <q-select
                                color="grey-9"
                                v-model="select"
                                float-label="State"
                                radio
                                :options="selectOptions"
                                />
                            </div>
                            <div class="col-md-6">
                                <q-select
                                color="grey-9"
                                v-model="select"
                                float-label="Account Type"
                                radio
                                :options="selectOptions"
                                />
                            </div>
                            <div class="col-md-6">
                                <q-input color="grey-9" v-model="text" type="number" float-label="Bank A/c Number" placeholder="Bank A/c Number" />
                            </div>
                            <div class="col-md-6">
                                <q-checkbox color="grey-9" v-model="checked" label="Bank Statement Attached" />
                                <q-checkbox color="grey-9" v-model="checked" label="Cancelled Cheque Lead Attached" />
                            </div>
                                <div class="col-md-12">
                                <p class="q-caption">Payment Collection Details</p>
                            </div>
                            <div class="col-md-6">
                                <q-input color="grey-9" v-model="text" float-label="Swipe Amount" placeholder="Swipe Amount" />
                            </div> 
                            <div class="col-md-6 col-sm-12">
                                <q-datetime color="grey-9" format-model="number"	v-model="date2" type="time" format24h float-label="Swipe Date" />
                            </div>
                            <div class="col-md-6">
                                <q-input color="grey-9" v-model="text" float-label="Swiped on the terminal of" placeholder="Swiped on the terminal of" />
                            </div>
                            <div class="col-md-6">
                                <q-input color="grey-9" v-model="text" float-label="Cheque Amount" placeholder="Cheque Amount" />
                            </div>
                            <div class="col-md-6 col-sm-12">
                                <q-datetime color="grey-9" format-model="number"	v-model="date2" type="time" format24h float-label="Cheque Date" />
                            </div>
                            <div class="col-md-6">
                                <q-datetime color="grey-9" format-model="number"	v-model="date2" type="time" format24h float-label="Cheque Deposited Date" />
                            </div>
                            <div class="col-md-6">
                                <q-input color="grey-9" v-model="text" float-label="Cheque/UTR No" placeholder="Cheque/UTR No" />
                            </div>
                            <div class="col-md-6">
                                <q-select
                                color="grey-9"
                                v-model="select"
                                float-label="Bank Name"
                                radio
                                :options="selectOptions"
                                />
                            </div>
                        </div> 
                        <q-stepper-navigation>
                            <q-btn color="primary" class="q-ma-xs" @click="$refs.stepper.next()" label="Continue" />
                            <q-btn color="warning" class="q-ma-xs" label="Save Partial" />
                            <q-btn color="secondary" class="q-ma-xs" flat @click="$refs.stepper.previous()" label="Back" />
                        </q-stepper-navigation>
                    </q-step>
                    <q-step name="eight" title="KYC">
                        <div>Please verify all the above information provided before submiting. Thanks.</div>
                        <q-stepper-navigation>
                        <q-btn color="positive" label="Submit" />
                        <q-btn color="secondary" flat @click="$refs.stepper.previous()" label="Back" />
                        </q-stepper-navigation>
                    </q-step>
                </q-stepper>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import vuePdfjs from "vue-pdfjs";

import vZoom from "vue-zoom";

import showPdfModalComponent from "./showPdfModalComponent.vue";

export default {
  components: {
    vuePdfjs
  },
  props: ["propLeadDeatils"],
  data() {
    return {
      PDFDetails: null,
      toggleshowPDFModal: false,
      showImage: true,
      showDocumentPreview: true,
      populatedDocumentUrl: "",
      PDFDetails: null,
      toggleshowPDFModal: false,
      showImage: true,
      showDocumentPreview: true,
      populatedDocumentUrl: "",
      formData: {
        shortLead: this.propLeadDeatils
      },

      //=======================<< START >> MARS api select box, radio=====================//
      institutionCodeOptions: [
        {
          label: "IOB",
          value: 1
        },
        {
          label: "Andhra Bank",
          value: 2
        }
      ],
      applicationTypeOptions: [
        {
          label: "Digital",
          value: "D"
        },
        {
          label: "Non Digital",
          value: "N"
        }
      ],
      selectCityOptions:[
          {
              label:'Chennai',
              value: 1
          }
      ],
      //=======================<< END >> MARS api select box, radio=====================//

      // -=-=-=-=-=-=-=-=-=+++++++++++++++++++=-=-=-=-=-=-=-=-=-+++++++++++++++++++++++++

      //=======================<< START >> MARS api json values=====================//
      onBoardDetails: {
        merchant: {
          salesInfo: {
            institutionCode: "1",
            applicationType: "D",
            applicationNumber: "QWERTY12333",
            applicationDate: "20/04/2018",
            aggreementDate: "20/04/2018",
            merchantType: "M",
            region: 1,
            salesPersonCode: 1,
            leadFrom: "test",
            sharingModelCode: "N",
            sharingPartnerCode: 1,
            dailyFixedAmount: "500",
            loanDisbursementPercentage: "2",
            loanDisbursementAmount: "100000",
            loanDisbursementDate: "20/04/2018",
            tenureMonth: 12,
            tenureDay: 356,
            tenureStartDate: "20/04/2018",
            rentPercentage: "2",
            rentFixed: "500"
          },
          companyInfo: {
            legalName: "test",
            dbaName: "test",
            registeredAddress: "address",
            registeredPin: "123456",
            registeredCityRefCode: 1,
            registeredStateRefCode: 1,
            constitution: "PL",
            constitutionDescription: "test",
            establishYear: "20/04/2018",
            registerNumber: "A12456",
            pan: "ABGPD265P",
            tin: "XXXXXX",
            tan: "XXXXXX",
            businessNature: "test",
            businessType: "R",
            mcc: "5733",
            residentialAddress: "address",
            residentialPin: "123456",
            residentialCityRefCode: 1,
            residentialStateRefCode: 1,
            contactMobile: "1234567790",
            contactAlternateMobile: "0123456789",
            contactPhone: "1234567890",
            contactEmail: "test@gmail.com",
            statementType: "P",
            statementFrequency: "D",
            statementEmail: "test@gmail.com;test@test.com"
          },
          businessInfo: {
            weekdayStartHour: "9",
            weekdayEndHour: "6",
            weekendStartHour: "9",
            weekendEndHour: "2",
            lastTurnoverYear: "2010",
            lastTurnoverAmount: "500000",
            expectedCardBusiness: "500000",
            averageBillAmount: "5000",
            gstId: "ABC45678",
            currentPosName: "INGINICO",
            debitCardMdr: "2",
            creditCardMdr: "2",
            memberSince: "2010"
          },
          partners: [
            {
              name: "test",
              address: "address",
              pan: "ASDEF234G",
              pin: "123456",
              stateRefCode: "1",
              cityRefCode: "1",
              contactMobile: "9747144821",
              contactEmail: "sulu@gmail.com"
            },
            {
              partnerFirstName: "jis",
              address: "address",
              pan: "ASDEF234G",
              pin: "686563",
              stateRefCode: "1",
              cityRefCode: "1",
              contactMobile: "1234567890",
              contactEmail: "jis@gmail.com"
            }
          ],
          paymentdetails: {
            deviceOwnedBy: "B",
            installationFee: "1000",
            terminalModeCode: 1,
            numberOfTerminals: 1,
            cashAtPosEnabled: "Y",
            rentalPlanCode: 1,
            rentalModeCode: 1,
            rentalType: "A",
            devicePrice: "2500",
            otherCharges: "500",
            totalAmountPaid: "3000"
          },
          bankInfo: {
            bankDetails: {
              ifsc: "XYZ00000123",
              micr: "XYZ00000123211",
              bankName: "XXX Bank",
              bankCityRefCode: 1,
              bankStateRefCode: 1,
              payment_mode: "D",
              accountType: "SB",
              accountNumber: "123456789",
              bankStatementAttached: "Y",
              cancelChequeAttached: "Y"
            },
            collectionDetails: {
              collectedDate: "20/04/2018",
              swipeAmount: "10000",
              swipeTerminal: "INGINICO",
              chequeAmount: "10000",
              chequeDate: "20/04/2018",
              chequeNumber: "123456",
              acquirerBank: "testBank"
            }
          }
        }
      }
      //=======================<< END >> MARS api json values=====================//
    };
  },
  computed: {
    ...mapGetters("GlobalVariables", ["GLOBAL_FILE_FETCH_URL"])
  },
  methods: {
    emitToggleRemarks() {
      this.$emit("togglePDFModal");
    },
    fnDocumentUrl(documentUrl) {
      this.populatedDocumentUrl = documentUrl;
      this.showDocumentPreview = !this.showDocumentPreview;
    },
    fnCloseDocumentPreview() {
      this.showDocumentPreview = !this.showDocumentPreview;
    },
    fnOpenPaymentChequeInfo() {
      this.showOpenPaymentChequeInfo = !this.showOpenPaymentChequeInfo;
    },

    // Function to show PDF
    fnPDFViewModal(documentUrl, viewChequeFlag) {
      if (viewChequeFlag == "CHEQUE") {
        this.showOpenPaymentChequeDocumentInfo = !this
          .showOpenPaymentChequeDocumentInfo;
        this.PDFDetails = documentUrl;
        this.toggleshowPDFModal = !this.toggleshowPDFModal;
      } else {
        this.PDFDetails = documentUrl;
        //this.PDFDetails = "http://www.africau.edu/images/default/sample.pdf";
        this.toggleshowPDFModal = !this.toggleshowPDFModal;
      }
    },
    // Function to open handed over image upload
    fnViewHandedOverFileImage() {
      this.$refs.handedOverImageViewer.click();
    }
  }
};
</script>
<style>
.no-underline {
  text-decoration: none;
}
</style>
 