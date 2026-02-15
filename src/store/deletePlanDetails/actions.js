
import api from "../api.js";
export const DELETE_PLAN_DETAILS_DATAS = ({
    commit
}, request) => {
    return api
        .delete("delete-m-atm-plan/"+ request.Id)
        .then(response => {
            console.log(response)

        })
}