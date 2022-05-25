import axios from "axios";
import { toast } from "react-toastify";
import userService from "./userService";

//sending the req with token header
axios.defaults.headers.common["x-auth-token"] = userService.getToken();

axios.interceptors.response.use(null, (error) => {
  console.log(error.response);
  const expectedError = error.response && error.response.status >= 403;
  if (expectedError) {
    toast("An unexpected error occurred.");
  }
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
};
