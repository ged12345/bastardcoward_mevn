/* eslint-disable */
import Api from "@/services/Api";

export default {
  fetchDamageTypes() {
    return Api().get("damage_types");
  },

  addDamageType(params) {
    return Api().post("damage_types", params);
  },

  updateDamageType(params) {
    return Api().put("damage_types/" + params.id, params);
  },

  getDamageType(params) {
    return Api().get("damage_type/" + params.id);
  },

  deleteDamageType(id) {
    return Api().delete("damage_type/" + id);
  },

  findDamageType(query) {
    return Api().get("damage_types/" + query);
  }
};
