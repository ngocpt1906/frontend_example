import PostStore from "./post";
import AuthStore from "./auth";

class RootStore {
  constructor() {
    this.authStore = new AuthStore(this);
    this.postStore = new PostStore(this);
  }
}

export default RootStore;
