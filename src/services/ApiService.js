import { get, put, post, delete as axiosDelete } from "axios";

class APIService {

  constructor(basePath = "") {
    this.fullPath = basePath;
  }

  getRequest = (params = {}, requestSubPath = "") => {
    return get(this.fullPath + requestSubPath, {
      params: params
    });
  };

  putRequest = (body = {}, requestSubPath = "") => {
    return put(
      this.fullPath + requestSubPath,
      body
    );
  };

  postRequest = (body = {}, requestSubPath = "") => {
    return post(
      this.fullPath + requestSubPath,
      body
    );
  };

  deleteRequest = (requestSubPath = "") => {
    return axiosDelete(
      this.fullPath + requestSubPath
    );
  };
}

export default APIService;
