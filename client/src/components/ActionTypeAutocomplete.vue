<template>
  <div>
    <input
      type="text"
      placeholder="ACTION TYPE"
      v-model="query"
      v-on:keyup="autoComplete(); emitToParent();"
      class="form-control"
    />
    <div class="panel-footer" v-if="results.length">
      <ul class="list-group">
        <li class="list-group-item no-bullet" v-for="result in results" v-bind:key="result">
          <a href="#" @click="clickType(result.type)">{{ result.type }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import ActionsService from '@/services/ActionsService'
export default {
  name: 'acactiontype',
  props: {
    initial_type: String
  },
  data () {
    return {
      query: '',
      results: []
    }
  },
  mounted () {
    this.query = this.initial_type
    // Takes more time due to retrieving info, I think - or could be usage of props
    setTimeout(() => (this.query = this.initial_type), 200)
  },
  methods: {
    clickType (type) {
      this.query = type
      this.results = []
      this.emitToParent()
    },
    emitToParent (event) {
      this.$emit('childToParent', this.query)
    },
    async autoComplete () {
      this.results = []
      const response = await ActionsService.findActionType(this.query)
      this.results = response.data
    }
  }
}
</script>
<style type="text/css">
.no-bullet {
  list-style-type: none !important;
}
</style>
