import Api from '@/services/Api'

export default {
  fetchMonsters () {
    return Api().get('monsters')
  },

  addMonster (params) {
    return Api().post('monsters', params)
  },

  updateMonster (params) {
    return Api().put('monsters/' + params.id, params)
  },

  getMonster (params) {
    return Api().get('monster/' + params.id)
  },

  deleteMonster (id) {
    return Api().delete('monsters/' + id)
  }
}
