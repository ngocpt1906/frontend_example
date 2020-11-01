import ApiService from "../services/ApiService";

class AuthApi {

  constructor() {
    this.service = new ApiService("/auth");
  }

  login = (payload) => {
    return this.service.postRequest(payload,"/login");
  }
}

export default AuthApi;
