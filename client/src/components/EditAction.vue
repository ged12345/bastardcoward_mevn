<template>
  <div class="actions">
    <h1>Edit Action</h1>
    <div class="form">
      <div>
        <input
          type="text"
          name="location_id"
          placeholder="LOCATION_ID"
          v-model="location_id"
        />
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
        <acactiontype
          :initial_type="type"
          v-on:childToParent="onQueryUpdate"
        ></acactiontype>
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
        <button class="app_action_btn" @click="updateAction">Update</button>
      </div>
    </div>
  </div>
</template>

<script>
import ActionsService from "@/services/ActionsService";
import ActionTypeAutocomplete from "./ActionTypeAutocomplete";
export default {
  name: "EditAction",
  data() {
    return {
      location_id: "",
      location_num: "",
      type: "",
      metadata: "",
      description: ""
    };
  },
  mounted() {
    this.getAction();
  },
  methods: {
    async getAction() {
      const response = await ActionsService.getAction({
        id: this.$route.params.id
      });
      this.location_id = response.data.location_id;
      this.location_num = response.data.location_num;
      this.type = response.data.type;
      this.metadata = response.data.metadata;
      this.description = response.data.description;
    },
    async updateAction() {
      await ActionsService.updateAction({
        id: this.$route.params.id,
        location_id: this.location_id,
        location_num: this.location_num,
        type: this.type,
        metadata: this.metadata,
        description: this.description
      });
      this.$router.push({ name: "Actions" });
    },
    onQueryUpdate(value) {
      this.type = value;
    }
  },
  components: {
    acactiontype: ActionTypeAutocomplete
  }
};
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
  background: #4d7ef7;
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
