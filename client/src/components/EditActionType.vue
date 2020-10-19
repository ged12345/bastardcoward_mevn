<template>
  <div class="action_types">
    <h1>Edit Action Type</h1>
    <div class="form">
      <!--<div>
        <textarea rows="15" cols="15" placeholder="TYPE" v-model="type"></textarea>
      </div>-->
      <div class="panel-body">
        <acactiontype :initial_type="type" v-on:childToParent="onQueryUpdate"></acactiontype>
      </div>
      <div>
        <textarea rows="15" cols="15" placeholder="DESCRIPTION" v-model="description"></textarea>
      </div>
      <div>
        <button class="app_action_type_btn" @click="updateActionType">Update</button>
      </div>
    </div>
  </div>
</template>

<script>
import ActionsService from '@/services/ActionsService'
import ActionTypeAutocomplete from './ActionTypeAutocomplete'
export default {
  name: 'EditActionType',
  data () {
    return {
      type: '',
      description: ''
    }
  },
  mounted () {
    this.getActionType()
  },
  methods: {
    async getActionType () {
      const response = await ActionsService.getActionType({
        id: this.$route.params.id
      })
      this.type = response.data.game_data.type
      this.description = response.data.game_data.description
    },
    async updateActionType () {
      await ActionsService.updateActionType({
        id: this.$route.params.id,
        type: this.type,
        description: this.description
      })
      this.$router.push({ name: 'ActionTypes' })
    },
    onQueryUpdate (value) {
      this.type = value
    }
  },
  components: {
    acactiontype: ActionTypeAutocomplete
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
.app_action_type_btn {
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
