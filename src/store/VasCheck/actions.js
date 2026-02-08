import { api } from '../../boot/axios';
import api from "../api.js";
import Vue from "vue";
export const FETCH_INSTANCE = ({
  commit,
  rootState
}, request) => {
  return api
    .get( "vas-mapping/get-vas-instance-mapping/"+ request.code +"/"+request.device   
    ) 
    .then(response => {
      console.log(response);
      commit("SET_INSTANCE", response.data.data);
      return response
    })
}
