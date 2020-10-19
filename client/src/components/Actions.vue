<template>
  <div class="actions">
    <h1>
      Actions
      <router-link v-bind:to="{ name: 'NewAction' }" class>(Add)</router-link>
    </h1>
    <div v-if="actions.length > 0" class="table-wrap">
      <table>
        <tr>
          <td>Location ID</td>
          <td width="50">Location Num</td>
          <td width="50">Type</td>
          <td width="250">Metadata</td>
          <td width="250">Description</td>
          <td width="100" align="center">Action</td>
        </tr>
        <tr v-for="action in actions" v-bind:key="action.location_num">
          <td>{{ action.location_id }}</td>
          <td>{{ action.location_num }}</td>
          <td>{{ action.type }}</td>
          <td>{{ action.metadata }}</td>
          <td>{{ action.description }}</td>

          <td align="center">
            <router-link v-bind:to="{ name: 'EditAction', params: { id: action._id } }">Edit</router-link>&nbsp;|
            <a href="#" @click="deleteAction(action._id)">Delete</a>
          </td>
        </tr>
      </table>
    </div>
    <div v-else>
      There are no actions. Lets add one now.
      <br />
      <br />
      <router-link v-bind:to="{ name: 'NewAction' }" class="add_action_link">Add Action</router-link>
    </div>
  </div>
</template>

<script>
import ActionsService from '@/services/ActionsService'
export default {
  name: 'actions',
  data () {
    return {
      actions: []
    }
  },
  mounted () {
    this.getActions()
  },
  methods: {
    async getActions () {
      const response = await ActionsService.fetchActions()
      this.actions = response.data.game_data
    },
    async deleteAction (id) {
      await ActionsService.deleteAction(id)
      this.$router.push({ name: 'Actions' })
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
  lor: #333333;
  text-decoration: none;
}
a.add_action_link {
  background-color: #333333;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
}
</style>
