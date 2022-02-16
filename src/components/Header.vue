<template>
  <header class="main-header">
    <div class="header-left">
      <img src="../assets/sibdev-logo.svg" alt="logo">
      <router-link :to="{name: 'main'}">Поиск</router-link>
      <router-link :to="{name: 'favorites'}">Избранное</router-link>
    </div>
    <div class="header-right">
      <span @click="logOut">Выйти</span>
    </div>
  </header>
</template>

<script>

export default {
  name: 'Header',
  methods: {
    logOut() {
      this.$store.commit('logOut')
      this.$store.commit('clearVideos');
    }
  }
}
</script>
