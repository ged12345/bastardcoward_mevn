<template>
  <div class="locations">
    <h1>Locations</h1>
    <div v-if="locations.length > 0" class="table-wrap">
      <div>
        <router-link v-bind:to="{ name: 'NewLocation' }" class>Add Location</router-link>
      </div>
      <table>
        <tr>
          <td>Location ID</td>
          <td width="150">Title</td>
          <td width="450">Description</td>
          <td width="100" align="center">Location</td>
        </tr>
        <tr v-for="location in locations">
          <td>{{ location.location_id }}</td>
          <td>{{ location.title }}</td>
          <td>{{ location.description }}</td>

          <td align="center">
            <router-link v-bind:to="{ name: 'EditLocation', params: { id: location._id } }">Edit</router-link>&nbsp;|
            <a href="#" @click="deleteLocation(location._id)">Delete</a>
          </td>
        </tr>
      </table>
    </div>
    <div v-else>
      There are no locations. Lets add one now.
      <br />
      <br />
      <router-link v-bind:to="{ name: 'NewLocation' }" class="add_location_link">Add Location</router-link>
    </div>
  </div>
</template>

<script>
import LocationsService from "@/services/LocationsService";
export default {
  name: "locations",
  data() {
    return {
      locations: []
    };
  },
  mounted() {
    this.getLocations();
  },
  methods: {
    async getLocations() {
      const response = await LocationsService.fetchLocations();
      this.locations = response.data.locations;
      console.error(this.locations);
    },
    async deleteLocation(id) {
      await LocationsService.deleteLocation(id);
      this.$router.push({ name: "Locations" });
    }
  }
};
</script>
<style type="text/css">
.table-wrap {
  width: 60%;
  margin: 0 auto;
  text-align: center;
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
a {
  color: #4d7ef7;
  text-decoration: none;
}
a.add_location_link {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
}
</style>
