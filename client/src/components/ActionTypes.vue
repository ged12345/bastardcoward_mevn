<template>
  <div class="action_types">
    <h1>
      Action Types
      <router-link v-bind:to="{ name: 'NewActionType' }" class>(Add)</router-link>
    </h1>
    <div v-if="action_types.length > 0" class="table-wrap">
      <table>
        <tr>
          <td>Type</td>
          <td width="450">Description</td>
          <td width="100" align="center">Action</td>
        </tr>
        <tr v-for="action_type in action_types" v-bind:key="action_type.type">
          <td>{{ action_type.type }}</td>
          <td>{{ action_type.description }}</td>

          <td align="center">
            <router-link
              v-bind:to="{ name: 'EditActionType', params: { id: action_type._id } }"
            >Edit</router-link>&nbsp;|
            <a href="#" @click="deleteActionType(action_type._id)">Delete</a>
          </td>
        </tr>
      </table>
    </div>
    <div v-else>
      There are no action types. Lets add one now.
      <br />
      <br />
      <router-link
        v-bind:to="{ name: 'NewActionType' }"
        class="add_action_type_link"
      >Add Action Type</router-link>
    </div>
  </div>
</template>

<script>
import ActionsService from '@/services/ActionsService'
export default {
  name: 'action_types',
  data () {
    return {
      action_types: []
    }
  },
  mounted () {
    this.getActionTypes()
  },
  methods: {
    async getActionTypes () {
      const response = await ActionsService.fetchActionTypes()
      this.action_types = response.data.game_data
    },
    async deleteActionType (id) {
      await ActionsService.deleteActionType(id)
      this.$router.push({ name: 'ActionTypes' })
    }
  }
}
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
  background-color: #333333;
  color: #fff;
}
a {
  color: #333333;
  text-decoration: none;
}
a.add_action_type_link {
  background-color: #333333;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
}
</style>
