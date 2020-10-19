<template>
  <div class="overview-menu">
    <ul>
      <li class="nav-item" v-for="route in routes" v-bind:key="route.fullPath">
        <router-link :to="route.path" class="nav-link" active-class="active">{{ route.title }}</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'OverviewMenu',
  data () {
    return {}
  },
  methods: {},
  computed: {
    routes: function () {
      var routes = []
      routes.push({ path: '/', name: 'Game', title: 'Game' })
      for (var i in this.$router.options.routes) {
        if (!this.$router.options.routes.hasOwnProperty(i)) {
          continue
        }
        var route = this.$router.options.routes[i]

        if (route.hasOwnProperty('title')) {
          if (!route.path.includes('overview')) { route.path = '/overview' + route.path }
          routes.push(route)
        }
      }
      return routes
    }
  }
}
</script>
<style type="text/css">
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333333;
}

li {
  float: left;
  list-style-type: none;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 16px;
  text-decoration: none;
}

li a:hover {
  background-color: #111111;
}

.router-link-exact-active {
  background-color: #333333;
  border: white 1px solid;
}
</style>
