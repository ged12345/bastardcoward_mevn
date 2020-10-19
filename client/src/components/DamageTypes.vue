<template>
  <div class="damage_types">
    <h1>
      Damage Types
      <router-link v-bind:to="{ name: 'NewDamageType' }" class
        >(Add)</router-link
      >
    </h1>
    <div v-if="damage_types.length > 0" class="table-wrap">
      <table>
        <tr>
          <td>Name</td>
          <td width="250">Description</td>
          <td width="40">Damage</td>
          <td width="40">Modifier</td>
          <td width="100" align="center">Damage Types</td>
        </tr>
        <tr v-for="damage_type in damage_types" v-bind:key="damage_type.name">
          <td>{{ damage_type.name }}</td>
          <td>{{ damage_type.description }}</td>
          <td>{{ damage_type.damage }}</td>
          <td>{{ damage_type.modifier }}</td>

          <td align="center">
            <router-link
              v-bind:to="{
                name: 'EditDamageType',
                params: { id: damage_type._id }
              }"
              >Edit</router-link
            >&nbsp;|
            <a href="#" @click="deleteDamageType(damage_type._id)">Delete</a>
          </td>
        </tr>
      </table>
    </div>
    <div v-else>
      There are no damage types. Lets add one now.
      <br />
      <br />
      <router-link
        v-bind:to="{ name: 'NewDamageType' }"
        class="add_damage_type_link"
        >Add Damage Type</router-link
      >
    </div>
  </div>
</template>

<script>
import DamageTypesService from '@/services/DamageTypesService'
export default {
  name: 'damage_types',
  data () {
    return {
      damage_types: []
    }
  },
  mounted () {
    this.getDamageTypes()
  },
  methods: {
    async getDamageTypes () {
      const response = await DamageTypesService.fetchDamageTypes()
      this.damage_types = response.data.game_data
    },
    async deleteDamageType (id) {
      await DamageTypesService.deleteDamageType(id)
      this.$router.push({ name: 'DamageType' })
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
a.add_damage_type_link {
  background-color: #333333;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
}
</style>
