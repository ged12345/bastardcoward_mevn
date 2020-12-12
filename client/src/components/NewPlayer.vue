<template>
  <div class="player">
    <overviewmenu></overviewmenu>
    <h1>Add Player</h1>
    <div class="form">
      <div>
        <input type="text" name="name" placeholder="NAME" v-model="name" />
      </div>
      <div>
        <input type="text" name="health" placeholder="SEE MAX. HEALTH" v-model="health" />
      </div>
      <div>
        <input type="text" name="max_health" placeholder="HEALTH (0-100, start 30-50)" v-model="max_health" />
      </div>
      <div>
        <input type="text" name="brawl" placeholder="BRAWL (0-20, start 5-10)" v-model="brawl" />
      </div>
      <div>
        <input type="text" name="assassinate" placeholder="ASSASSINATE (0-20, start 2-5)" v-model="assassinate" />
      </div>
      <div>
        <input type="text" name="fighting_spec" placeholder="FIGHTING SPECIALITY" v-model="fighting_spec" />
      </div>
      <div>
        <input type="text" name="chaos" placeholder="SEE MAX. CHAOS" v-model="chaos" />
      </div>
      <div>
        <input type="text" name="max_chaos" placeholder="MAX. CHAOS (0-50, start 10-20)" v-model="max_chaos" />
      </div>
      <div>
        <input type="text" name="chaos_spec" placeholder="CHAOS SPECIALITY" v-model="chaos_spec" />
      </div>
      <div>
        <input type="text" name="fate" placeholder="FATE (0-5, start 0-1)" v-model="fate" />
      </div>
      <div>
        <button class="app_player_btn" @click="addPlayer">Add</button>
      </div>
    </div>
  </div>
</template>

<script>
import OverviewMenu from '@/components/OverviewMenu'
import PlayerService from '@/services/PlayerService'
export default {
  name: 'NewPlayer',
  data () {
    return {
      name: '',
      health: '',
      max_health: '',
      chaos: '',
      max_chaos: '',
      chaos_spec: '',
      brawl: '',
      assassinate: '',
      fighting_spec: '',
      fate: ''
    }
  },
  methods: {
    async addPlayer () {
      await PlayerService.addPlayer({
        name: this.name,
        health: this.health,
        max_health: this.max_health,
        chaos: this.chaos,
        max_chaos: this.max_chaos,
        chaos_spec: this.chaos_spec,
        brawl: this.brawl,
        assassinate: this.assassinate,
        fighting_spec: this.fighting_spec,
        fate: this.fate
      })
      this.$router.push({ name: 'Player' })
    }
  },
  components: {
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
.app_player_btn {
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
