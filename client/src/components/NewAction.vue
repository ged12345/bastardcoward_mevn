<template>
  <div class="actions">
    <overviewmenu></overviewmenu>
    <h1>Add Action</h1>
    <strong>Note: Location Num is actually the order events run in that location.</strong>
    <div class="form">
      <div class="panel-body">
        <aclocationid
          :initial_location_id="location_id"
          v-on:childToParent="onQueryUpdate2"
        ></aclocationid>
      </div>
      <div>
        <input
          type="text"
          name="location_num"
          placeholder="LOCATION_NUM"
          v-model="location_num"
        />
      </div>
      <div class="panel-body">
        <acactiontype v-on:childToParent="onQueryUpdate"></acactiontype>
      </div>
      <div>
        <textarea
          rows="15"
          cols="15"
          placeholder="METADATA"
          v-model="metadata"
        ></textarea>
      </div>
      <div>
        <textarea
          rows="15"
          cols="15"
          placeholder="DESCRIPTION"
          v-model="description"
        ></textarea>
      </div>
      <div>
        <button class="app_action_btn" @click="addAction">Add</button>
      </div>
    </div>
  </div>
</template>

<script>
import OverviewMenu from '@/components/OverviewMenu'
import ActionsService from '@/services/ActionsService'
import ActionTypeAutocomplete from './ActionTypeAutocomplete'
import LocationIDAutocomplete from './LocationIDAutocomplete'

export default {
  name: 'NewAction',
  data () {
    return {
      location_id: '',
      location_num: '',
      type: '',
      metadata: '',
      description: ''
    }
  },
  methods: {
    async addAction () {
      await ActionsService.addAction({
        location_id: this.location_id,
        location_num: this.location_num,
        type: this.type,
        metadata: this.metadata,
        description: this.description
      })
      this.$router.push({ name: 'Actions' })
    },
    onQueryUpdate (value) {
      this.type = value
    },
    onQueryUpdate2 (value) {
      this.location_id = value
    }
  },
  components: {
    acactiontype: ActionTypeAutocomplete,
    aclocationid: LocationIDAutocomplete,
    overviewmenu: OverviewMenu
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
.app_action_btn {
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
</style>
