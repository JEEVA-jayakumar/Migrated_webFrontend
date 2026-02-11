import { url } from '@vuelidate/validators';
import { api } from '../boot/axios';
import Vue from "vue";

export default {
  get(url, request) {
    return api
      .get(url, {
        params: request
      })
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  post(url, request) {
    return api
      .post(url, request)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  put(url, request) {
    return api
      .put(url, request)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  patch(url, request) {
    return api
      .patch(url, request)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  delete(url, request) {
    return api
      .delete(url, {
        body: request
      })
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }
};
