<template>
  <component :is="layout" />
  <component :is="wrapper">
    <router-view v-model:layout.sync="wrapper" />
  </component>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    layout: 'div',
    wrapper: 'div'
  })
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
}
</style>
