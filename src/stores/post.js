import { action, configure, observable } from "mobx";
import PostAPI from "../apis/posts";
import { makeAutoObservable } from "mobx";
configure({ enforceActions: "observed" });
class PostStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.api = new PostAPI();
    makeAutoObservable(this)
  }

  listItem = [];

  getAll = async () => {
    let response = await this.api.getAll();
    this.listItem = response.data;
  }

  deleteItem = async (id) => {
    let response = await this.api.deleteItem(id);
    this.listItem = response.data.data;
  }

  createItem = async (payload) => {
    let response = await this.api.createItem(payload);
    this.listItem = response.data.data;
  }

  updateItem = async (id, payload) => {
    let response = await this.api.updateItem(id, payload);
    this.listItem = response.data.data;
  }
}

export default PostStore;
