<template>
  <div class="monsters">
    <overviewmenu></overviewmenu>
    <h1>Edit Monster</h1>
    <div class="form">
      <div>
        <input type="text" name="name" placeholder="NAME" v-model="name" />
      </div>
      <div>
        <textarea rows="15" cols="15" placeholder="DESCRIPTION" v-model="description"></textarea>
      </div>
      <div>
        <input type="text" name="health" placeholder="HEALTH" v-model="health" />
      </div>
      <div>
        <input type="text" name="magic" placeholder="MAGIC" v-model="magic" />
      </div>
      <div class="panel-body">
        <acdamagetype :initial_type="damage_types.toString()" v-on:childToParent="onQueryUpdate"></acdamagetype>
      </div>
      <div>
        <button class="app_monster_btn" @click="updateMonster">Update</button>
      </div>
    </div>
  </div>
</template>

<script>
import OverviewMenu from '@/components/OverviewMenu'
import MonstersService from '@/services/MonstersService'
import DamageTypeAutocomplete from '@/components/DamageTypeAutocomplete'
export default {
  name: 'EditMonster',
  data () {
    return {
      name: '',
      description: '',
      damage_types: '',
      health: '',
      magic: ''
    }
  },
  mounted () {
    this.getMonster()
  },
  methods: {
    async getMonster () {
      const response = await MonstersService.getMonster({
        id: this.$route.params.id
      })
      this.name = response.data.game_data.name
      this.damage_types = response.data.game_data.damage_types
      this.health = response.data.game_data.health
      this.magic = response.data.game_data.magic
      this.description = response.data.game_data.description
    },
    async updateMonster () {
      await MonstersService.updateMonster({
        id: this.$route.params.id,
        name: this.name,
        damage_types: this.damage_types,
        health: this.health,
        magic: this.magic,
        description: this.description
      })
      this.$router.push({ name: 'Monsters' })
    },
    onQueryUpdate (value) {
      this.damage_types = value
    }
  },
  components: {
    overviewmenu: OverviewMenu,
    acdamagetype: DamageTypeAutocomplete
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
.app_monster_btn {
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
