<template>
  <div>
    <input
      type="text"
      placeholder="DAMAGE_TYPE"
      v-model="query"
      v-on:keyup="autoComplete(); emitToParent();"
      class="form-control"
    />
    <div class="panel-footer" v-if="results.length">
      <ul class="list-group">
        <li class="list-group-item no-bullet" v-for="result in results" v-bind:key="result.name">
          <a href="#" @click="clickName(result.name)">{{ result.name }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import DamageTypesService from '@/services/DamageTypesService'
export default {
  name: 'acdamagetype',
  props: {
    initial_type: String
  },
  data () {
    return {
      query: '',
      lastQuery: '',
      results: []
    }
  },
  mounted () {
    this.query = this.initial_type
    // Takes more time due to retrieving info, I think - or could be usage of props
    setTimeout(() => (this.query = this.initial_type), 200)
  },
  methods: {
    clickName (name) {
      this.query = this.query.substring(0, this.query.length - this.lastQuery.length - 1).trim() + ' ' + name
      this.results = []
      this.emitToParent()
    },
    emitToParent (event) {
      this.$emit('childToParent', this.query)
    },
    async autoComplete () {
      this.results = []
      this.lastQuery = this.query.split(',')[this.query.split(',').length - 1].trim()
      console.log(this.lastQuery)
      const response = await DamageTypesService.findDamageType(this.lastQuery)
      console.log(response)
      this.results = response.data.game_data
      console.log(this.results)
    }
  }
}
</script>
<style type="text/css">
.no-bullet {
  list-style-type: none !important;
}
</style>
