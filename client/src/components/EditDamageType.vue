<template>
  <div class="damage_types">
    <h1>Edit Damage Type</h1>
    <div class="form">
      <div>
        <input type="text" name="name" placeholder="NAME" v-model="name" />
      </div>
      <div>
        <textarea rows="15" cols="15" placeholder="DESCRIPTION" v-model="description"></textarea>
      </div>
      <div>
        <input type="text" name="damage" placeholder="DAMAGE" v-model="damage" />
      </div>
      <div>
        <input type="text" name="modifier" placeholder="MODIFIER" v-model="modifier" />
      </div>

      <div>
        <button class="app_damage_type_btn" @click="updateDamageType">Update</button>
      </div>
    </div>
  </div>
</template>

<script>
import DamageTypesService from '@/services/DamageTypesService'
export default {
  name: 'EditDamageType',
  data () {
    return {
      name: '',
      description: '',
      damage: '',
      modifier: ''
    }
  },
  mounted () {
    this.getDamageType()
  },
  methods: {
    async getDamageType () {
      const response = await DamageTypesService.getDamageType({
        id: this.$route.params.id
      })
      this.name = response.data.name
      this.damage = response.data.damage
      this.modifier = response.data.modifier
      this.description = response.data.description
    },
    async updateDamageType () {
      await DamageTypesService.updateDamageType({
        id: this.$route.params.id,
        name: this.name,
        damage: this.damage,
        modifier: this.modifier,
        description: this.description
      })
      this.$router.push({ name: 'DamageTypes' })
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
.app_damage_type_btn {
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
