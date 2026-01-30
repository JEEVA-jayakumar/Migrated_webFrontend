import api from "../api.js";
import Vue from "vue";



export const FETCH_APPLICATION_NUMBER = ({
    commit,
    rootState
  }, request) => {
    return api.get(`application/${request}`)
    .then(response => {
      // const applicationnumber = response.data.applicationNumber;
       commit('SET_APPLICATION_NUMBER', response.data.data);
      })
  
  }