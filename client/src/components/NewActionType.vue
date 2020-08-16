<template>
  <div class="action_types">
    <h1>Add Action Type</h1>
    <div class="form">
      <div>
        <input placeholder="TYPE" v-model="type" />
      </div>
      <div>
        <textarea rows="15" cols="15" placeholder="DESCRIPTION" v-model="description"></textarea>
      </div>
      <div>
        <button class="app_action_type_btn" @click="addActionType">Add</button>
      </div>
    </div>
  </div>
</template>

<script>
import ActionsService from '@/services/ActionsService'
export default {
  name: 'NewActionType',
  data () {
    return {
      type: '',
      description: ''
    }
  },
  methods: {
    async addActionType () {
      await ActionsService.addActionType({
        type: this.type,
        description: this.description
      })
      this.$router.push({ name: 'ActionTypes' })
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
