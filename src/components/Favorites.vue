<template>
  <div class="container">
    <div class="main">
      <h1>Избранное</h1>
      <div class="favs-block">
        <div
          v-for="(item, idx) in this.$store.getters.favorites"
          :key="`${item.request}_${idx}`"
          class="favs-item"
        >
          <span>{{ item.request }}</span>
          <div class="fav-btns">
            <button @click="handleRunRequest(item)">Выполнить</button>
            <button @click="openEditForm(item)">Изменить</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LayoutDefault from '../layouts/LayoutDeafault.vue';
import Modal from './Modal.vue';
import { markRaw } from 'vue';
import '@/styles/favorites/favorites.css';
export default {
  name: 'Favorites',
  created() {
    !this.$store.getters.Token && this.$router.push('/');
    this.$emit('update:layout', LayoutDefault)
  },
  watch: {
    __token() {
      this.$router.push('/');
    }
  },
  methods: {
    handleRunRequest(request) {
      this.$store.commit('saveFavRequest', null);
      this.$router.push('/main');
      setTimeout(() => {
        this.$store.commit('saveFavRequest', request);
      }, 10)
    },
    openEditForm(item) {
      this.$store.commit('setInputType', false);
      this.$store.commit('saveRequest', item.request);
      this.$store.commit('setEditId', item.id);
      this.$root.layout = this.__Modal;
    },
  },
  computed: {
    __Modal() {
      return markRaw(Modal);
    },
    __token() {
      return this.$store.getters.Token;
    }
  }

}
</script>
