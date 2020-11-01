import { action, configure } from "mobx";
import AuthAPI from "../apis/auth";
configure({ enforceActions: "observed" });
class AuthStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.api = new AuthAPI();
  }

  login = async (credential) => {
    let response = await this.api.login(credential);
    if (response.data) {
      window.localStorage.setItem("token", "admin");
      document.location.href = "/";
    }
  };

  @action logout = () => {
    window.localStorage.removeItem("token");
    document.location.href = "/";
  }

  getToken = ()=>{
    return window.localStorage.getItem("token");
  }
}

export default AuthStore;
