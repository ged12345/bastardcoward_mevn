<template>
  <div class="locations">
    <h1>Add Location</h1>
    <div class="form">
      <div>
        <input type="text" name="location_id" placeholder="LOCATION ID" v-model="location_id" />
      </div>
      <div>
        <input placeholder="TITLE" v-model="title" />
      </div>
      <div>
        <textarea rows="15" cols="15" placeholder="DESCRIPTION" v-model="description"></textarea>
      </div>
      <div>
        <button class="app_location_btn" @click="addLocation">Add</button>
      </div>
    </div>
  </div>
</template>

<script>
import LocationsService from '@/services/LocationsService'
export default {
  name: 'NewLocation',
  data () {
    return {
      location_id: '',
      title: '',
      description: ''
    }
  },
  mounted () {
    this.getHighestLocationID()
  },
  methods: {
    async getHighestLocationID () {
      const response = await LocationsService.getHighestLocationID()
      // Always returns at least one response?
      if (response.data.locations.length > 0) {
        this.location_id =
          parseInt(response.data.locations[0].location_id, 10) + 1
      }
    },
    async addLocation () {
      await LocationsService.addLocation({
        location_id: this.location_id,
        title: this.title,
        description: this.description
      })
      this.$router.push({ name: 'Locations' })
    }
  }
}
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
  background-color: #333333;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  width: 520px;
  border: none;
  cursor: pointer;
}
</style>
