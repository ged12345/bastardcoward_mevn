import Api from "@/services/Api";

export default {
  fetchActions() {
    return Api().get("actions");
  },

  addAction(params) {
    return Api().post("actions", params);
  },

  updateAction(params) {
    return Api().put("actions/" + params.id, params);
  },

  getAction(params) {
    return Api().get("action/" + params.id);
  },

  deleteAction(id) {
    return Api().delete("actions/" + id);
  },

  getActionsForLocationID(params) {
    return Api().get("actions/" + params.location_id + "/location_id");
  },

  fetchActionTypes() {
    return Api().get("action_types");
  },

  findActionType(query) {
    return Api().get("action_types/" + query);
  },

  addActionType(params) {
    return Api().post("action_types", params);
  },

  updateActionType(params) {
    return Api().put("action_types/" + params.id, params);
  },

  getActionType(params) {
    return Api().get("action_type/" + params.id);
  },

  deleteActionType(id) {
    return Api().delete("action_types/" + id);
  }
};
