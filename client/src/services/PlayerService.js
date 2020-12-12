/* eslint-disable */

import Api from "@/services/Api";

export default {
  addPlayer(params) {
    return Api().post("player", params);
  },

  getPlayer() {
    return Api().get("player");
  },

  updatePlayer(params) {
    return Api().put("player", params);
  }
};
