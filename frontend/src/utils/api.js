import config from "@/config/config";
import axios from "axios";
import { toast } from "sonner";

export default class ApiClass {
  static nodeUrl = config.baseUrl;

  static config(isToken = true, headers = null, parameters = null) {
    var defaultHeaders = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    var merge = {};
    if (isToken) {
      var token = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      merge = Object.assign(defaultHeaders, token);
    }
    merge = Object.assign(defaultHeaders, headers);
    return {
      headers: merge,
      params: parameters,
      withCredentials: true,
    };
  }

  static unauthenticateRedirect() {
    localStorage.removeItem("user_info");
    localStorage.removeItem("user_token");
    location.replace("/");
  }
  static blockRedirect() {
    if (window.location.pathname !== "/blocked") {
      toast.error("You have been blocked by admin");
      localStorage.removeItem("user_info");
      localStorage.removeItem("user_token");
      window.location.replace("/blocked");
    }
  }

  static maintainanceRedirect() {
    if (window.location.pathname !== "/maintenance") {
      toast.error("Server is under maintenance");
      localStorage.removeItem("user_info");
      localStorage.removeItem("user_token");
      window.location.replace("/maintenance");
    }
  }

  static getRequest(apiUrl, isToken = true, headers = null, params = null) {
    return axios
      .get(this.nodeUrl + apiUrl, this.config(isToken, headers, params))
      .then((result) => {
        return result.data;
      })
      .catch((error) => {
        if (error.response.status === 503) {
          this.maintainanceRedirect();
        }
        if (error.response.status === 401) {
          this.unauthenticateRedirect();
        }
        if (error.response.status === 403) {
          this.blockRedirect();
        }
      });
  }

  static deleteRequest(apiUrl, isToken = true, headers = null, params = null) {
    return axios
      .delete(this.nodeUrl + apiUrl, this.config(isToken, headers, params))
      .then((result) => {
        return result.data;
      })
      .catch((error) => {
        if (error.response.status === 401) {
          this.unauthenticateRedirect();
        }
        if (error.response.status === 403) {
          this.blockRedirect();
        }
        if (error.response.status === 503) {
          this.maintainanceRedirect();
        }
      });
  }

  static postRequest(
    apiUrl,
    isToken = true,
    formData = null,
    headers = null,
    params = null
  ) {
    return axios
      .post(
        this.nodeUrl + apiUrl,
        formData,
        this.config(isToken, headers, params)
      )
      .then((result) => {
        return result.data;
      })
      .catch((error) => {
        if (error.response.status === 401) {
          this.unauthenticateRedirect();
        }
        if (error.response.status === 403) {
          this.blockRedirect();
        }
        if (error.response.status === 429) {
          toast.error("Too many requests, please try again later.");
        }
        if (error.response.status === 503) {
          this.maintainanceRedirect();
        }
      });
  }

  static putRequest(
    apiUrl,
    isToken = true,
    formData = null,
    headers = null,
    params = null
  ) {
    return axios
      .put(
        this.nodeUrl + apiUrl,
        formData,
        this.config(isToken, headers, params)
      )
      .then((result) => {
        return result.data;
      })
      .catch((error) => {
        if (error.response.status === 401) {
          this.unauthenticateRedirect();
        }
        if (error.response.status === 403) {
          this.blockRedirect();
        }
        if (error.response.status === 503) {
          this.maintainanceRedirect();
        }
      });
  }
}
