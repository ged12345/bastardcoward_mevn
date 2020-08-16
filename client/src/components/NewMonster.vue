<template>
  <div class="monsters">
    <h1>Add Monster</h1>
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
      <div>
        <input type="text" name="damage_type" placeholder="DAMAGE_TYPE" v-model="damage_type" />
      </div>
      <div>
        <button class="app_monster_btn" @click="addMonster">Add</button>
      </div>
    </div>
  </div>
</template>

<script>
import MonstersService from '@/services/MonstersService'
export default {
  name: 'NewMonster',
  data () {
    return {
      name: '',
      description: '',
      damage_type: '',
      health: '',
      magic: ''
    }
  },
  methods: {
    async addMonster () {
      await MonstersService.addMonster({
        name: this.name,
        damage_type: this.damage_type,
        health: this.health,
        magic: this.magic,
        description: this.description
      })
      this.$router.push({ name: 'Monsters' })
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
