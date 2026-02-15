import { url } from '@vuelidate/validators';
import api from "../api.js";

import moment from "moment";
// let variable = localStorage.getItem("aa_t")
// let v = variable.lastIndexOf('|')
// let res = variable.substring(v + 1)
// let headers = {
//     'NII': res
// };
function commonDateFormat(selectedDate) {
    if (
        selectedDate == "" ||
        selectedDate == null ||
        selectedDate == "Invalid date"
    ) {
        return null;
    } else {
        return moment(selectedDate).format("DD/MM/YYYY");
    }
}
export const CMS_EDIT_MDR = ({
    commit,
    rootState
}, request) => {
    let variable = localStorage.getItem("a_t")
    console.log("varialble", variable)
    let v = variable.lastIndexOf('|')
    let res = variable.substring(v + 1)
    let headers = {
        'NII': res
    };
    if(res == 104){
        return api.put(rootState.GlobalVariables.STATE_MARS_AXIS_ON_BOARD_API_URL +
            "merchant/" + request.url.id + "/updateMdr", request.params, {
            headers: headers
        })
    }else{
        return api.put(rootState.GlobalVariables.STATE_MARS_ON_BOARD_API_URL +
            "merchant/" + request.url.id + "/updateMdr", request.params, {
            headers: headers
        })
    }
   
    // .put("http://182.156.237.85:8080/api/manage/data/mdr-details/" + request.id, request)

}
export const CMS_EDIT_MERCHANT = ({
    commit,
    rootState
}, request) => {
    let variable = localStorage.getItem("a_t")
    console.log("varialble", variable)
    let v = variable.lastIndexOf('|')
    let res = variable.substring(v + 1)
    let headers = {
        'NII': res
    };

    if(res == 104){
        return api.put(rootState.GlobalVariables.STATE_MARS_AXIS_ON_BOARD_API_URL +
            "merchant/" + request.url.id + "/update", request.params, {
            headers: headers
        })
    }else{
        return api.put(rootState.GlobalVariables.STATE_MARS_ON_BOARD_API_URL +
            "merchant/" + request.url.id + "/update", request.params, {
            headers: headers
        })
    }
   

    // .put("http://182.156.237.85:8080/api/manage/data/mdr-details/" + request.id, request)

}
export const CMS_EDIT_TERMINAL = ({
    commit,
    rootState
}, request) => {
    request.terminalparams.merchant.paymentDetails.installationDate = commonDateFormat(
        request.terminalparams.merchant.paymentDetails.installationDate
    );
    request.terminalparams.merchant.paymentDetails.deinstallationDate = commonDateFormat(
        request.terminalparams.merchant.paymentDetails.deinstallationDate
    );
    console
        .log("device details", request.terminalparams)
    let variable = localStorage.getItem("a_t")
    console.log("varialble", variable)
    let v = variable.lastIndexOf('|')
    let res = variable.substring(v + 1)
    let headers = {
        'NII': res
    };

    if(res == 104){
        return api.put(rootState.GlobalVariables.STATE_MARS_AXIS_ON_BOARD_API_URL +
            "terminal/" + request.terminal.id + "/update", request.terminalparams,
            {
                headers: headers
            })
    }else{
        return api.put(rootState.GlobalVariables.STATE_MARS_ON_BOARD_API_URL +
            "terminal/" + request.terminal.id + "/update", request.terminalparams,
            {
                headers: headers
            })
    }

   
    // .put("http://182.156.237.85:8080/api/manage/data/mdr-details/" + request.id, request)

}
export const CMS_EDIT_TERMINAL_DEVICE = ({
    commit,
    rootState
}, request) => {
        if (request.data.leadInformation.leadCategory == 1 || request.data.leadInformation.leadCategory == 2 ) {
    request.terminalparams.merchant.paymentDetails.installationDate = commonDateFormat(
        request.terminalparams.merchant.paymentDetails.installationDate
    );
    request.terminalparams.merchant.paymentDetails.deinstallationDate = commonDateFormat(
        request.terminalparams.merchant.paymentDetails.deinstallationDate
    );
    console
        .log("device details", request.terminalparams)
    let variable = localStorage.getItem("a_t")
    console.log("varialble", variable)
    let v = variable.lastIndexOf('|')
    let res = variable.substring(v + 1)
    let headers = {
        'NII': res
    };

if(res == 104){
    return api.put(rootState.GlobalVariables.STATE_MARS_AXIS_ON_BOARD_API_URL +
        "terminal/" + request.terminal.id + "/installation", request.terminalparams,
        {
            headers: headers
        })
} else{
    return api.put(rootState.GlobalVariables.STATE_MARS_ON_BOARD_API_URL +
        "terminal/" + request.terminal.id + "/installation", request.terminalparams,
        {
            headers: headers
        })
}   
  
    }
    else{
        // console.log("Request Details EDC----------->>>",JSON.stringify(request))
    request.terminalparams.merchant.paymentDetails.installationDate = commonDateFormat(
        request.terminalparams.merchant.paymentDetails.installationDate
    );
    request.terminalparams.merchant.paymentDetails.deinstallationDate = commonDateFormat(
        request.terminalparams.merchant.paymentDetails.deinstallationDate
    );
    console
        .log("device details", request.terminalparams)
    let variable = localStorage.getItem("a_t")
    console.log("varialble", variable)
    let v = variable.lastIndexOf('|')
    let res = variable.substring(v + 1)
    let headers = {
        'NII': res
    };
    return api.put(rootState.GlobalVariables.STATE_MARS_EDC_ON_BOARD_API_URL +
        "terminal/" + request.terminal.id + "/installation", request.terminalparams,
        {
            headers: headers
        })
    // .put("http://182.156.237.85:8080/api/manage/data/mdr-details/" + request.id, request)
    }
}
export const CMS_STATUS_CHANGE = ({
    commit,
    rootState
}, request) => {
    return api
        .put(rootState.GlobalVariables.STATE_APP_API + 'submit-cms-data-to-mars/' + request)
        .then(response => {
            console.log(response);

        })
};

export const CMS_EDIT_KYC = ({
    commit,
    rootState
}, request) => {
    let variable = localStorage.getItem("a_t")
    console.log("varialble", variable)
    let v = variable.lastIndexOf('|')
    let res = variable.substring(v + 1)
    let headers = {
        'NII': res
    };

if(res == 104){
    return api.put(rootState.GlobalVariables.STATE_MARS_AXIS_ON_BOARD_API_URL +
        "merchant/" + request.url.id + "/updateKyc", request.params, {
        headers: headers
    })
} else {
    return api.put(rootState.GlobalVariables.STATE_MARS_ON_BOARD_API_URL +
        "merchant/" + request.url.id + "/updateKyc", request.params, {
        headers: headers
    })    
}
    // .put("http://182.156.237.85:8080/api/manage/data/mdr-details/" + request.id, request)

}

