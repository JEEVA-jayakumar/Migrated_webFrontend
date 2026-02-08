import { createStore } from 'vuex';
import Merchant from "./BankLeadDataEntry";
import commonLoader from "./commonLoader.js";
import SuperAdminUsers from "./SuperAdminUsers.js";
import SatLeadValidation from "./SatLeadValidation.js";
import aggregatorLeadValidation from "./aggregatorLeadValidation";
import ChangeManagementList from "./changemanagementlist";
import GetMarsData from "./getmarsdata";
import mAtmPlanDropdown from "./mAtmPlanDropdown";
import reassignReasonList from "./reassignReasonList";
import CMSList from "./CMSList";
import AddHierarchy from "./AddHierarchy";
import addRole from "./addRole";
import PhonepeDeviceRecovery from "./PhonepeDeviceRecovery";
import HitachiIndianBankOnboarding from "./HitachiIndianBankOnboarding";
import AggregatorDeviceRecovery from "./AggregatorDeviceRecovery";
import leadInformationVasMapping from "./leadInformationVasMapping";
import regionGroupDatas from "./regionGroupDatas";
import phonepeImplementationQueue from "./phonepeImplementationQueue";
import MarsApiSync from "./MarsApiSync";
import inventoryWithRegion from "./inventoryWithRegion";
import merchantTierMapping from "./merchantTierMapping";
import superAdminAggregators from "./superAdminAggregators";
import superAdminAggregatorsDevice from "./superAdminAggregatorsDevice";
import Host from "./Host";
import Prefix from "./Prefix";
import lsVasHostInstance from "./lsVasHostInstance";
import vasCreation from "./vasCreation";
import leadSourceVasDeviceConfig from "./leadSourceVasDeviceConfig";
import MarsInstance from "./MarsInstance";
import LeadSourceSAT from "./LeadSourceSAT";
import SAT_Dashboard from "./SAT_Dashboard";
import SatDeviceTrackerScanner from "./SatDeviceTrackerScanner.js";
import serviceRequestSat from "./serviceRequestSat";
import InventoryScanAddDevice from "./InventoryScanAddDevice.js";
import serviceRequestLat_Long from "./serviceRequestLat_Long";
import serviceRequestPhonepeSat from "./serviceRequestPhonepeSat";
import ExceptionQueue from "./ExceptionQueue.js";
import BankListUploadFile from "./bankListUploadFile"
import posInventoryFinance from "./posInventoryFinance";
import Finance from "./Finance.js";
import DownloadInventoryFSEReports from "./DownloadInventoryFSEReports.js";
import DownloadInventoryLostOrStolenData from "./DownloadInventoryLostOrStolenData.js";
import DownloadInventoryWithSoData from "./DownloadInventoryWithSoData.js";
import DownloadInventoryDeviceHistoryReports from "./DownloadInventoryDeviceHistoryReports.js";
import DownloadPhonepeCrmCallbackReport from "./DownloadPhonepeCrmCallbackReport.js";
import DownloadMasterTrackerData from "./DownloadMasterTrackerData.js";
import DownloadInventoryBPRegion from "./DownloadInventoryBPRegion.js";
import staticQrDownloads from './staticQrDownloas.js'
import DownloadPosInventoryReport from "./DownloadPosInventoryReport.js";
import DownloadInventoryMovedTOScrap from "./DownloadInventoryMovedTOScrap.js";
import DownloadInventorySendToRepair from "./DownloadInventorySendToRepair.js";
import DownloadLostOrStolenAllDatas from "./DownloadLostOrStolenAllDatas.js";
import DownloadInventoryReplacementRecoveryReports from "./DownloadInventoryReplacementRecoveryReports.js";
import DownloadImplementationIndianBankReport from "./DownloadImplementationIndianBankReport.js";
import DownloadInventoryResellerReports from "./DownloadInventoryResellerReports.js";
import DownloadInventoryMerchantReports from "./DownloadInventoryMerchantReports.js";
import DownloadPodAllDatas from "./DownloadPodAllDatas.js";
import LostFinance from "./LostFinance.js";
import globalSearchSerialNumber from "./globalSearchSerialNumber";
import crmGlobalSearchTicketId from "./crmGlobalSearchTicketId";
import crmAction from "./crmAction";
import SendToRepair from "./SendToRepair";
import deactiveMatmUser from "./deactiveMatmUser";
import regionalInventoryDetails from "./regionalInventoryDetails";
import activeMatmUser from "./activeMatmUser";
import hitachi from "./hitachi";
// import stolenInventory from "./stolenInventory";
import inventoryStolenData from "./inventoryStolenData"
import getInventoryUpdatedPodDetails from "./getInventoryUpdatedPodDetails";
// import inventoryStolenData from "./inventoryStolenData";
// import MoveScrap from "./MoveScrap";
import SendTORSMCMS from "./sendtoRSMCMS";
import sparePartsInventory from "./sparePartsInventory";
import sparePartsRegionalInventory from "./sparePartsRegionalInventory";
import sparePodUpdateDetails from "./sparePodUpdateDetails";
import sparePartsPodListInventoryDetails from "./sparePartsPodListInventoryDetails";
import sparePartsRegionalInventoryPodDetails from "./sparePartsRegionalInventoryPodDetails";
import soPodListDatas from "./soPodListDatas";
import singlePodData from "./singlePodData"
import serviceRequest from "./serviceRequest";
import updatePlanDetails from "./updatePlanDetails";
import deletePlanDetails from "./deletePlanDetails";
import AggregatorInventoryCentral from "./AggregatorInventoryCentral.js";
import InventoryCentral from "./InventoryCentral.js";
import staticQRDownload from "./staticQRDownload.js";
import ServiceRequestStatus from "./ServiceRequestStatus";
import serviceRequestCancelled from "./serviceRequestCancelled";
import Authentication from "./Authentication.js";
import OPSHead from "./OPSHead.js";
import GlobalVariables from "./GlobalVariables.js";
import OpenMerchantTracker from "./OpenMerchantTracker.js";
import FilePreview from "./FilePreview.js";
import mdrCharges from "./mdrCharges";
import mdrChargesDeactive from "./mdrChargesDeactive";
import rentalCharges from "./rentalCharges";
import AggregatorSendToRepair from "./AggregatorSendToRepair";
import SalesManagerException from "./SalesManagerException.js";
import InventoryBulkUploadDevice from "./inventoryBulkUploadDevice.js";
import UploadOnboardingMerchants from './UploadOnboardingMerchants.js'
import generateQR from './generateQR'
import iciciStaticQr from './iciciStaticQr'
import StaticQrSatValidate from './StaticQrSatValidate'
import PhonepeInventoryBulkUploadDevice from "./PhonepeInventoryBulkUploadDevice.js";
import IndianBankUpload from './IndianBankUpload.js'
import SatRegionalInventory from "./SatRegionalInventory.js";
import SAT_RegionalInventoryAllocation from "./SAT_RegionalInventoryAllocation.js";
import SA_Devices from "./SA_Devices.js";
import createQRCode from "./createQRCode"
import QRList from "./QRList"
import staticQrInventory from './staticQrInventory';
import qrFinance from './qrFinance'
import ACTIVE_DEACTIVE_LEAD_SOURCE from "./activeordeactive"
import SalesManager_LeadAllocation from "./SalesManager_LeadAllocation.js";
import RegionBasedSo from "./regionbasedso";
import PodList from "./podlist";
import AggregatorPodLists from "./AggregatorPodLists";
import InventoryWithSo from "./inventorywithso"
import Aggregatorinventorywithso from "./Aggregatorinventorywithso"
import InventoryWithResellar from "./inventorywithresellar"
import AxisBankPincode from "./axisBankPincode"
import PincodeBasedDistrict from "./pincodeBasedDistrict"
import StateBasedDistrict from "./statebasedistrict"
import CityBasedLocation from "./cityBasedLocation"
import equitasImplementedQueue from "./equitasImplementedQueue"
import DocumentApprove from "./documentApprove";
import mars_final_submit_internal from "./mars_final_submit_internal";
import sparePartsGetTypes from "./sparePartsGetTypes";
import applicationNumberFromAPI from "./tohandsapplicationno";

// Bank ops modules
import BankOpsShortLead from "./BankOpsShortLead.js";

import DeviceListBasedOnLeadSource from "./DeviceListBasedOnLeadSource";
import SM_LeadStatusInDetail from "./SM_LeadStatusInDetail";
import MasterTracker from "./MasterTracker";
import additionalTid from "./additionalTid";
import mars_additional_tid from "./mars_additional_tid";
import lostOrStolenDatas from "./lostOrStolenDatas";
import deMapping from "./deMapping";
import ImplementationQueue from "./ImplementationQueue";
import lat_long from "./lat_long";
import varaneekImplementationQueue from "./varaneekImplementationQueue";
import ImplementationExecutive from "./ImplementationExecutive";
import DeviceRecovery from "./DeviceRecovery";
import OnboardingExistingMerchants from './OnboardingExistingMerchants'
import SoUsersList from "./SoUsersList";
import VerifyDevice from "./VerifyDevice";
import AggregatorDeviceReplacement from "./AggregatorDeviceReplacement";
import DeviceReplacement from "./deviceReplacement";
import mars_additional_city from "./mars_additional_city";
import mars_additional_state from "./mars_additional_state";

// Mars store collection
import mars_regions from "./mars_region";
import mars_leadFrom from "./mars_leadFrom";
import AllZone from "./AllZone";
import District from "./district"
import BranchName from "./BranchName"
import sharingModeBasedOnSharingPartnerCode from "./sharingModeBasedOnSharingPartnerCode"
import StateName from "./statename"
import IA_LOCATION from "./ialocation"
import MPOS_CITY from "./mposCity"
import MPOS_STATE from "./mposState"
import MPOS_CATEGORY from "./mposcategory"
import MPOS_SUBCATEGORY from "./mpossubcategory"
import MPOST_FILLINGTYPES from "./mposFillingTypes"
import MccBasedLeadSource from "./mccbasedLeadsource"
import mars_salesPerson from "./mars_salesPerson";
import mars_sharingPartner from "./mars_sharingPartner";
import mars_city from "./mars_city";
import mars_state from "./mars_state";
import mars_mcc from "./mars_mcc";
import mars_ifsc from "./mars_ifsc";
import mars_deviceModel from "./mars_deviceModel";
import mars_rentalPlans from "./mars_rentalPlans";
import AssignDeleteLeads from './assignDeleteLeads'
import mars_mdrPlans from "./mars_mdrPlans";
import Bank_SO from "./bankso";
import mars_bankList from "./mars_bankList";
import mars_serviceProvider from "./mars_serviceProvider";
import mars_networkProvider from "./mars_networkProvider";
import mars_dataSubmit from "./mars_dataSubmit";
import CMS_EDIT_MDR from "./CMS_EDIT_MDR"
import InstitutionCode from "./institutionCodeOptions"
import VasCheck from "./VasCheck"
import LeadSourceBasedRental from "./leadSourceBasedRentalPlan";
// import activatePlan from "./activatePlan";
// import deactivatePlan from "./deactivatePlan";


//RSM
import rsmPricingExceptionVerification from "./rsmPricingExceptionVerification";


//Revenue tracker
import revenueTracker from "./RevenueTracker";
import pincodes from "./pincodes";
import reports from "./reports";

import SuperAdminUsersCRUD from "./SuperAdminUsersCRUD";
import merchantTypes from "./merchantTypes";
import merchantDocumentTypes from "./merchantDocumentType";
import merchantCategory from "./merchantCategory";
import plan from "./plan";
import leadSource from "./leadSource";
import RegionWiseUsers from './regionwiseUsers'
import MdrPlan from './mdrplan'
import CategoryBasedMdr from './CategoryBasedMdr'
import categoryBasedRental from './categoryBasedRental'
import RentalPlan from './rentalplan'
import mATMSubmitPlan from './mATMSubmitPlan'

// App Screen api
import shortLead from './shortLead'
import appDevice from './App_devices'
import Appvas from './Appvas'
import appLeadSource from './appLeadSource'
import shortLeadInfo from './getshortLead'
import convertToWip from './convertToWip'
import soTosat from './soTosat'
import appMerchantType from './appMerchantType'
import TID from './tid'
import AggregatorTid from './AggregatorTid'
import merchant from './merchant'
import replacement from './replacement'
import devicehistory from './devicehistory'
import region from './region'
import summary from './summary'
import unallocate from './unallocate'
import faulty from './faulty'
import reg from './reg'
import AllocatedDevices from './AllocatedDevices'
import UnallocatedDevices from './UnallocatedDevices'
import FaultyDevices from './FaultyDevices'
import FSE from './FSE'
import FSEDevice from './FSEDevice'
import RegionalSum from "./RegionalSum"
import Regional from "./Regional"
import getMatmDatas from "./getMatmDatas"


// CRM
import phonePeCrm from "./phonePeCrm";
import bijlipayCrm from "./bijlipayCrm";


export default createStore({
  modules: {
    commonLoader,
    Merchant,
    SuperAdminUsers,
    SatLeadValidation,
    aggregatorLeadValidation,
    SAT_Dashboard,
    serviceRequestSat,
    serviceRequestPhonepeSat,
    serviceRequestLat_Long,
    posInventoryFinance,
    SatDeviceTrackerScanner,
    SatRegionalInventory,
    SAT_RegionalInventoryAllocation,
    InventoryScanAddDevice,
    ExceptionQueue,
    Finance,
    DownloadInventoryWithSoData,
    DownloadInventoryDeviceHistoryReports,
    DownloadPhonepeCrmCallbackReport,
    DownloadPosInventoryReport,
    DownloadInventoryLostOrStolenData,
    DownloadInventoryFSEReports,
    DownloadMasterTrackerData,
    DownloadInventoryBPRegion,
    DownloadInventoryMovedTOScrap,
    staticQrDownloads,
    DownloadInventorySendToRepair,
    DownloadLostOrStolenAllDatas,
    DownloadInventoryReplacementRecoveryReports,
    DownloadInventoryResellerReports,
    DownloadInventoryMerchantReports,
    DownloadPodAllDatas,
    LostFinance,
    globalSearchSerialNumber,
    DownloadImplementationIndianBankReport,
    crmGlobalSearchTicketId,
    InventoryCentral,
    staticQRDownload,
    AggregatorInventoryCentral,
    ServiceRequestStatus,
    crmAction,
    serviceRequestCancelled,
    Authentication,
    VerifyDevice,
    OPSHead,
    qrFinance,
    GlobalVariables,
    OpenMerchantTracker,
    FilePreview,
    mdrCharges,
    mdrChargesDeactive,
    rentalCharges,
    AggregatorSendToRepair,
    SalesManagerException,
    InventoryBulkUploadDevice,
UploadOnboardingMerchants,
    PhonepeInventoryBulkUploadDevice,
    SA_Devices,
    createQRCode,
    QRList,
    staticQrInventory,
    ACTIVE_DEACTIVE_LEAD_SOURCE,
    SalesManager_LeadAllocation,
    BankOpsShortLead,
    IndianBankUpload,
    DeviceListBasedOnLeadSource,
    SM_LeadStatusInDetail,
    MasterTracker,
    deMapping,
    additionalTid,
    mars_additional_tid,
    lostOrStolenDatas,
    ImplementationQueue,
    varaneekImplementationQueue,
    ImplementationExecutive,
    DeviceRecovery,
    OnboardingExistingMerchants,
    pincodes,
    SoUsersList,
    merchantTypes,
    merchantCategory,
    mars_additional_city,
    mars_additional_state,
    plan,
    leadSource,
    merchantDocumentTypes,
    BankListUploadFile,

    // Mars api 
    mars_regions,
    mars_ifsc,
    mars_leadFrom,
    mars_salesPerson,
    mars_sharingPartner,
    mars_city,
    mars_state,
    mars_mcc,
    mars_deviceModel,
    mars_rentalPlans,
    AssignDeleteLeads,
    mars_mdrPlans,
    Bank_SO,
    mars_bankList,
    mars_dataSubmit,
    CMS_EDIT_MDR,
    InstitutionCode,
    // activatePlan,
    // deactivatePlan,
    VasCheck,
    SendToRepair,
    serviceRequest,
    deactiveMatmUser,
    hitachi,
    activeMatmUser,
    regionalInventoryDetails,
    
    sparePartsInventory,
    sparePartsRegionalInventory,
    sparePodUpdateDetails,
    sparePartsPodListInventoryDetails,
    sparePartsRegionalInventoryPodDetails,
    soPodListDatas,
    singlePodData,
    // sparePartsRegionalInventoryPodDetail,
    // stolenInventory,
    inventoryStolenData,
    getInventoryUpdatedPodDetails,
    LeadSourceBasedRental,
    mars_serviceProvider,
    mars_networkProvider,
    AllZone,
    District,
    BranchName,
    sharingModeBasedOnSharingPartnerCode,
    StateName,
    IA_LOCATION,
    MPOS_CITY,
    MPOS_STATE,
    MPOST_FILLINGTYPES,
    MPOS_CATEGORY,
    generateQR,
    iciciStaticQr,
    StaticQrSatValidate,
    MPOS_SUBCATEGORY,
    MccBasedLeadSource,
    CityBasedLocation,
    TID,
    AggregatorTid,
    merchant,
    replacement,
    devicehistory,
    region,
    summary,
    unallocate,
    faulty,
    reg,
    AllocatedDevices,
    UnallocatedDevices,
    FaultyDevices,
    FSE,
    FSEDevice,
    RegionalSum,
    Regional,
    getMatmDatas,
    // MoveScrap,



    //RSM
    rsmPricingExceptionVerification,
    revenueTracker,

    //Reports
    reports,

    SuperAdminUsersCRUD,
    RegionWiseUsers,
    MdrPlan,
    CategoryBasedMdr,
    categoryBasedRental,
    RentalPlan,
    mATMSubmitPlan,

    // App Data
    shortLead,
    appDevice,
    Appvas,
    appLeadSource,
    shortLeadInfo,
    convertToWip,
    soTosat,
    appMerchantType,
    RegionBasedSo,
    PodList,
    AggregatorPodLists,
    InventoryWithSo,
    Aggregatorinventorywithso,
    InventoryWithResellar,
    AxisBankPincode,
    PincodeBasedDistrict,
    StateBasedDistrict,
    equitasImplementedQueue,
    DocumentApprove,
    mars_final_submit_internal,
    sparePartsGetTypes,
    AggregatorDeviceReplacement,
    DeviceReplacement,
    ChangeManagementList,
    lat_long,
    LeadSourceSAT,
    AddHierarchy,
    addRole,
    PhonepeDeviceRecovery,
    AggregatorDeviceRecovery,
    HitachiIndianBankOnboarding,
    leadInformationVasMapping,
    regionGroupDatas,
    inventoryWithRegion,
    merchantTierMapping,
    phonepeImplementationQueue,
    MarsApiSync,
    superAdminAggregators,
    superAdminAggregatorsDevice,
    Host,
    Prefix,
    lsVasHostInstance,
    vasCreation,
    leadSourceVasDeviceConfig,
    MarsInstance,
    GetMarsData,
    mAtmPlanDropdown,
    CMSList,
    reassignReasonList,
    SendTORSMCMS,
    updatePlanDetails,
    deletePlanDetails,
    phonePeCrm,
    bijlipayCrm,
    applicationNumberFromAPI
  },
});

