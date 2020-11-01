import ApiService from "../services/ApiService";


class PostApi {

  constructor() {
    this.service = new ApiService("/posts");
  }

  getAll = (payload) => {
    return this.service.getRequest(payload, "");
  }

  updateItem = (id, payload) => {
    return this.service.postRequest(payload, "/" + id);
  }

  createItem = (payload) => {
    return this.service.putRequest(payload, "");
  }

  deleteItem = (id) => {
    return this.service.deleteRequest("/" + id);
  }
}

export default PostApi;
