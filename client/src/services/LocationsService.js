import Api from '@/services/Api'

export default {
  fetchLocations () {
    return Api().get('locations')
  },

  addLocation (params) {
    return Api().post('locations', params)
  },

  updateLocation (params) {
    return Api().put('locations/' + params.id, params)
  },

  getLocation (params) {
    return Api().get('location/' + params.id)
  },

  deleteLocation (id) {
    return Api().delete('locations/' + id)
  },

  getHighestLocationID () {
    return Api().get('locations/max_location_id')
  },

  findLocation (query) {
    return Api().get('locations/' + query)
  }
}
