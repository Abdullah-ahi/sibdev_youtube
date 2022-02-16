<template>
  <div class="modal-mask"></div>
  <div class="modal">
    <div>Сохранить запрос</div>
    <span>Запрос</span>
    <div class="modal-input-wrapper">
      <input
        type="text"
        v-model="request"
        :readonly="readOnly ? true : false"
      >
    </div>
    <span>* Название</span>
    <div class="modal-input-wrapper">
      <input type="text" placeholder="Укажите название" v-model="requestName">
    </div>
    <span>Сортировать по</span>
    <div class="modal-input-wrapper">
      <select name="#" id="#" v-model="sortType">
        <option value="date">date</option>
        <option value="rating">rating</option>
        <option value="relevance">relevance</option>
        <option value="title">title</option>
        <option value="videoCount">videoCount</option>
        <option value="viewCount">viewCount</option>
      </select>
    </div>
    <span>Максимальное количество</span>
    <div class="max-count-block">
      <input type="range" name="max-count" id="max-count" min="0" max="50" step="1" v-model="maxCount">
      <span>{{ maxCount }}</span>
    </div>
    <div class="form-control-btns">
      <button @click="closeForm">{{ readOnly ? 'Не сохранять' : 'Не изменять' }}</button>
      <button @click="handleSaveRequest">{{ readOnly ? 'Сохранить' : 'Изменить' }}</button>
    </div>
  </div>
</template>

<script>
import '@/styles/modal/modal.css';
export default {
  name: 'Modal',
  data: () => ({
    maxCount: 0,
    request: '',
    requestName: '',
    sortType: null,
    readOnly: null,
  }),
  mounted() {
    this.request = this.$store.getters.request;
    this.readOnly = this.$store.getters.readOnly;
  },
  methods: {
    closeForm() {
      this.$root.layout = 'div';
    },
    handleSaveRequest() {
      const favorite = 
      {
        maxCount: this.maxCount,
        request: this.request,
        requestName: this.requestName,
        sortType: this.sortType 
      }
      const validData = /[a-zA-Zа-яА-Я]{1,30}/.test(this.requestName);
      if (validData) {
        if (this.readOnly) {
          this.addFavorite(favorite)
        } else {
          this.editFavorite(favorite);
        }
        this.$root.layout = 'div';
      } else {
        console.log('Error');
      }
    },
    addFavorite(favorite) {
      this.$store.commit('addFavorite', favorite);
    },
    editFavorite(favorite) {
      const id = this.$store.getters.editId;
      this.$store.commit('editFavorite', {id, favorite})
    },
  }
}
</script>
