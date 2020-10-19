<template>
  <div>
    <input
      type="text"
      placeholder="LOCATION ID"
      v-model="query"
      v-on:keyup="autoComplete(); emitToParent();"
      class="form-control"
    />
    <div class="panel-footer" v-if="results.length">
      <ul class="list-group">
        <li class="list-group-item no-bullet" v-for="result in results" v-bind:key="result">
          <a href="#" @click="clickType(result.location_id)">{{ result.location_id }}</a>
          Title: {{ result.title }}
          <br />
          <br />Description:
          <template v-if="result.description.length < 100">{{ result.description }}</template>
          <template v-else>{{ result.description.substring(0,100) + "..." }}</template>
          <br />
          <br />
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import LocationsService from '@/services/LocationsService'
export default {
  name: 'aclocationid',
  props: {
    initial_location_id: String
  },
  data () {
    return {
      query: '',
      results: []
    }
  },
  mounted () {
    this.query = this.initial_location_id
    // Takes more time due to retrieving info, I think - or could be usage of props
    setTimeout(() => (this.query = this.initial_location_id), 200)
  },
  methods: {
    clickType (locationId) {
      this.query = locationId
      this.results = []
      this.emitToParent()
    },
    emitToParent (event) {
      this.$emit('childToParent', this.query)
    },
    async autoComplete () {
      this.results = []
      const response = await LocationsService.findLocation(this.query)
      this.results = response.data.game_data
    }
  }
}
</script>
<style type="text/css">
li {
  color: white;
}

.no-bullet {
  list-style-type: none !important;
}
</style>
