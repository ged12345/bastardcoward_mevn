<template>
  <div class="locations">
    <h1>Edit Location</h1>
    <div class="form">
      <div class="panel-body">
        <aclocationid :initial_location_id="location_id" v-on:childToParent="onQueryUpdate"></aclocationid>
      </div>
      <div>
        <input placeholder="TITLE" v-model="title" />
      </div>
      <div>
        <textarea rows="15" cols="15" placeholder="DESCRIPTION" v-model="description"></textarea>
      </div>
      <div>
        <button class="app_location_btn" @click="updateLocation">Update</button>
      </div>
      <br />
      <br />
      <br />
      <div>
        <h3>Associated Actions</h3>
        <table class="center_table">
          <tr>
            <td>Location ID</td>
            <td width="150">Type</td>
            <td width="450">Metadata</td>
            <td width="100" align="center">Action</td>
          </tr>
          <tr v-for="action in actions">
            <td>{{ action.location_id }}</td>
            <td>{{ action.type }}</td>
            <td>{{ action.metadata }}</td>
            <td align="center">
              <router-link v-bind:to="{ name: 'EditAction', params: { id: action._id } }">Edit</router-link>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import LocationsService from "@/services/LocationsService";
import LocationIDAutocomplete from "./LocationIDAutocomplete";
import ActionsService from "@/services/ActionsService";
export default {
  name: "EditLocation",
  data() {
    return {
      location_id: "",
      description: "",
      title: "",
      actions: []
    };
  },
  mounted() {
    this.getLocation();
  },
  methods: {
    async getLocation() {
      const response = await LocationsService.getLocation({
        id: this.$route.params.id
      });
      this.location_id = response.data.location_id;
      this.description = response.data.description;
      this.title = response.data.title;

      this.getActionsForLocationID(this.location_id);
    },
    async getActionsForLocationID(location_id) {
      const response = await ActionsService.getActionsForLocationID({
        location_id: location_id
      });
      this.actions = response.data.actions;
    },
    async updateLocation() {
      await LocationsService.updateLocation({
        id: this.$route.params.id,
        location_id: this.location_id,
        description: this.description,
        title: this.title
      });
      this.$router.push({ name: "Locations" });
    },
    onQueryUpdate(value) {
      this.location_id = value;
    }
  },
  components: {
    aclocationid: LocationIDAutocomplete
  }
};
</script>
<style type="text/css">
.form input,
.form textarea {
  width: 500px;
  padding: 10px;
  border: 1px solid #e0dede;
  outline: none;
  font-size: 12px;
}
.form div {
  margin: 20px;
}
.app_location_btn {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  width: 520px;
  border: none;
  cursor: pointer;
}
.center_table {
  margin-left: auto;
  margin-right: auto;
}
table th,
table tr {
  text-align: left;
}
table thead {
  background: #f2f2f2;
}
table tr td {
  padding: 10px;
}
table tr:nth-child(odd) {
  background: #f2f2f2;
}
table tr:nth-child(1) {
  background: #4d7ef7;
  color: #fff;
}
</style>
