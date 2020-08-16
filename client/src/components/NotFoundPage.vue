<template>
  <div class="not-found-page">
    <h1>
      <br />404
    </h1>
    <h2>Page Not Found</h2>
    <h3>
      <br />"Fuck-fuck-fuck 'em all and take what you can."
      <br />— 'The General Electric', Shihad
    </h3>
  </div>
</template>
<script>
// import PostsService from '@/services/PostsService'
export default {
  name: 'NotFoundPage',
  data () {
    return {}
  },
  methods: {}
}
</script>
<style type="text/css">
.not-found-page {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
}

.not-found-page h1 {
  font-size: 70px;
  margin-bottom: -30px;
}

.not-found-page h2 {
  font-size: 34px;
}
</style>
