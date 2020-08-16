<template>
  <div class="monsters">
    <h1>
      Monsters
      <router-link v-bind:to="{ name: 'NewMonsters' }" class>(Add)</router-link>
    </h1>
    <div v-if="monsters.length > 0" class="table-wrap">
      <table>
        <tr>
          <td>Name</td>
          <td width="250">Description</td>
          <td width="40">Health</td>
          <td width="40">Magic</td>
          <td width="400">Damage Type</td>
          <td width="100" align="center">Monster</td>
        </tr>
        <tr v-for="monster in monsters" v-bind:key="monster">
          <td>{{ monster.name }}</td>
          <td>{{ monster.description }}</td>
          <td>{{ monster.health }}</td>
          <td>{{ monster.magic }}</td>
          <td>{{ monster.damage_type }}</td>

          <td align="center">
            <router-link
              v-bind:to="{ name: 'EditMonster', params: { id: monster._id } }"
              >Edit</router-link
            >&nbsp;|
            <a href="#" @click="deleteMonster(monster._id)">Delete</a>
          </td>
        </tr>
      </table>
    </div>
    <div v-else>
      There are no monsters. Lets add one now.
      <br />
      <br />
      <router-link v-bind:to="{ name: 'NewMonster' }" class="add_monster_link"
        >Add Monster</router-link
      >
    </div>
  </div>
</template>

<script>
import MonstersService from '@/services/MonstersService'
export default {
  name: 'monsters',
  data () {
    return {
      monsters: []
    }
  },
  mounted () {
    this.getMonsters()
  },
  methods: {
    async getMonsters () {
      const response = await MonstersService.fetchMonsters()
      this.monsters = response.data.monsters
    },
    async deleteMonster (id) {
      await MonstersService.deleteMonster(id)
      this.$router.push({ name: 'Monsters' })
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
a.add_monster_link {
  background-color: #333333;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
}
</style>
