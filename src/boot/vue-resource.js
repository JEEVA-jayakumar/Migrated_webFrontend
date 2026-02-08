import { api } from './axios';
// import something here

import vueResource from "vue-resource";

// leave the export, even if you don't use it
export default ({
  app,
  router,
  Vue
}) => {
  // something to do
  Vue.use(vueResource);

  // const apiHost = "http://192.168.10.84:8081/api/";
  // const apiHost = "http://192.168.10.163:8080/api/";
  // const apiHost = "http://192.168.10.180:8080/api/";
  // const apiHost = "http://180.151.69.138:2036/api/";
  // const apiHost = "http://182.156.237.85:8080/api/";

  // const apiHost = "https://api.bijlipay.co.in/api/";
  // Final stagging url so far smart.bijlipay.co.in:8050
  // const apiHost = "http://13.232.119.156:8080/api/";
  //   const apiHost = "https://f67ae02dcc0b.ngrok.io/api/";
     const apiHost = "https://qaapp.bijlipay.co.in:8085/api/";
  // const apiHost = "https://192.168.4.210:8050/api/";
  //const apiHost = "http://192.168.4.204:8080/api/";
  // const apiHost = "http://182.156.237.85:8080/api/";
  // const apiHost = "http://192.168.4.205:8080/api/";
  // Final production url so far
  // const apiHost = "http://182.156.237.85:9081/api/";
  // const apiHost = "http://13.232.119.156:8080/api/";
  api.options.root = apiHost;
  api.headers.common["Access-Control-Allow-Origin"] = "*";
  api.headers.common["Content-Type"] = "application/json";
  api.headers.common["X-Frame-Options"] = "SAMEORIGIN";


  // api.headers.common["NII"] = localStorage.getItem("aa_t") || "";
  // console.log('vlaue', localStorage.getItem("aa_t"))
  // console.log('NIL', localStorage.getItem("aa_t"))
  // api.headers.common["NII"] = localStorage.getItem("aaa_t")


  // api.options.emulateJSON = true;
  // api.options.emulateHTTP = true;
  
  // window.localStorage.clear();
  api.interceptors.push(function (request, next) {
    if (
      !request.url.includes("authorization/login") &&
      !request.url.includes("authorization/password")
    ) {
      api.headers.common["Authorization"] =
        "Token " + localStorage.getItem("auth_token");
      api.headers.common["NII"] =
        localStorage.getItem("aa_t")
      // console.log("axis" + localStorage.getItem("aa_t"))

    } else {
      request.headers.delete("Authorization");
    }
    next(function (response) {
      if (
        response.status == 401 ||
        localStorage.getItem("auth_token") == undefined
      ) {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("u_i");
   
        router.push({
          name: "login",
        });
      }
      // if (response.status == 0) {
      //   localStorage.removeItem("auth_token");
      //   localStorage.removeItem("u_i");
      //   router.push({
      //     name: "500"
      //   });
      //   console.log("Something went wrong");
      // }
    });
  });
};
