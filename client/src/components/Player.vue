<template>
  <div class="players">
    <h1>
      Player
      <router-link v-bind:to="{ name: 'NewPlayer' }" class>(Add)</router-link>
    </h1>
    <div v-if="player !== null" class="table-wrap">
      <table>
        <tr>
          <td>Name</td>
          <td width="40">Health</td>
          <td width="40">Max. Health</td>
          <td width="40">Chaos</td>
          <td width="40">Max. Chaos</td>
          <td width="200" align="center">Chaos Spec.</td>
          <td width="40" align="center">Brawl</td>
          <td width="40" align="center">Assassinate</td>
          <td width="200" align="center">Fighting Spec.</td>
          <td width="40" align="center">Fate</td>
        </tr>
        <tr>
          <td>{{ player.name }}</td>
          <td>{{ player.health }}</td>
          <td>{{ player.max_health }}</td>
          <td>{{ player.chaos }}</td>
          <td>{{ player.max_chaos }}</td>
          <td>{{ player.chaos_spec }}</td>
          <td>{{ player.brawl }}</td>
          <td>{{ player.assassinate }}</td>
          <td>{{ player.fighting_spec }}</td>
          <td>{{ player.fate }}</td>

          <td align="center">
            <router-link
              v-bind:to="{ name: 'EditPlayer', params: { id: player._id } }"
              >Edit</router-link
            >
          </td>
        </tr>
      </table>
    </div>
    <div v-else>
      There is no player. Lets add one now.
      <br />
      <br />
      <router-link v-bind:to="{ name: 'NewPlayer' }" class="add_player_link"
        >Add Player</router-link
      >
    </div>
  </div>
</template>

<script>
import PlayerService from '@/services/PlayerService'
export default {
  name: 'player',
  data () {
    return {
      player: []
    }
  },
  mounted () {
    this.getPlayer()
  },
  methods: {
    async getPlayer () {
      const response = await PlayerService.getPlayer()
      console.log(response)
      this.player = response.data.game_data
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
a.add_player_link {
  background-color: #333333;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
}
</style>
