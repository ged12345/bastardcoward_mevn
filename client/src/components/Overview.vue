<template>
  <div class="overview">
    <overviewmenu></overviewmenu>
    <router-view />
  </div>
</template>
<script>
import OverviewMenu from '@/components/OverviewMenu'
export default {
  name: 'Overview',
  data () {
    return {}
  },
  methods: {},
  components: {
    overviewmenu: OverviewMenu
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

#logo {
  height: 5%;
  width: 5%;
  margin-top: -50px;
}
</style>
