<template>
  <div class="container">
    <main class="main">
      <h1 :class="{'searched-type-h1': visibleControls}">Поиск видео</h1>
      <SearchInput
        :visibleControls="visibleControls"
        @openForm="openForm"
        @handleGetVideos="handleGetVideos"
        @setText="setRequestText"
        @keyDown="handleKeyDown"
      />
      <div
        class="appearance-control"
        :class="{'visible-controls': visibleControls}"
      >
        <span>Видео по запросу 
          «<span>{{ searchText }}</span>»
          <small>{{videosCount}}</small>
        </span>
        <div>
          <img src="../assets/list.svg" alt="list" @click="onListType">
          <img src="../assets/grid.svg" alt="grid" @click="onGridType">
        </div>
      </div>
      <div
        class="videos-block"
        :class="{'list-videos': listType}"
      >
        <VideoItem
          v-for="video in this.$store.getters.videos"
          :key="video.etag"
          :class="{'list-video-item': listType}"
          :video="video"
          :sliceRules="sliceRules"
        />
      </div>
    </main>
  </div>
</template>

<script>
import '../styles/main/mainHeader.css';
import '../styles/main/main.css';
import LayoutDefault from '../layouts/LayoutDeafault.vue';
import VideoItem from './videoItem.vue';
import SearchInput from './SearchInput.vue';
import { markRaw } from 'vue';
import Modal from './Modal.vue';

  export default {
    name: 'Main',
    components: { VideoItem, SearchInput },
    data: () => ({
      api: 'https://www.googleapis.com/youtube/v3/search?part=snippet',
      apiKey: 'AIzaSyAv6P1h4-eKlp2cW0XvVFZKFBkaZ76OTBY',
      requestText: '',
      visibleControls: false,
      searchText: '',
      listType: false,
      sliceRules: [0, 40], 
      videosCount: 0,
    }),
    created() {
      !this.$store.getters.Token && this.$router.push('/');
      this.$emit('update:layout', this.__LayoutDefault);
    },
    watch: {
      listType() {
        this.sliceRules = this.listType === true
        ? [0, 200]
        : [0, 40]
      },
      __favsRequest() {
        const request = this.$store.getters.favsRequest;
        this.requestText = request.request;
        this.videosCount = request.maxCount;
        this.api = request.sortType
          ? `${this.api}&order=${request.sortType}`
          : this.api;
        this.getVideo();
      },
      __token() {
        this.$router.push('/');
      }
    },
    methods: {
      handleGetVideos() {
        const validRequest = /[a-zA-Zа-яА-Я]{1,100}/.test(this.requestText);
        if (validRequest) {
          this.$store.commit('saveRequest', this.requestText);
          this.videosCount = 12;
          this.getVideo()
        }
      },
      setRequestText(text) {
        this.requestText = text;
      },
      async getVideo() {
        try {
          const res = await this.$http.get(`${this.api}&maxResults=${this.videosCount}&q=${this.requestText}&key=${this.apiKey}`);
          const data = await res.data.items;
          const videos = data.reduce((acc, video) => {
            let actualId = video.id.videoId || video.id.playlistId || video.id.channelId;
            acc.push({actualId, ...video })
            return acc
          }, []);
          this.saveVideos(videos);
        } catch(e){
          console.log('Error', e);
        }
      },
      saveVideos(videos) {
        this.$store.commit('saveVideos', videos);
        this.visibleControls = true;
        this.searchText = this.requestText;
      },
      onListType() {
        this.listType = true;
      },
      onGridType() {
        this.listType = false;
      },
      openForm() {
        this.$store.commit('setInputType', true);
        this.$root.layout = this.__Modal;
      },
      handleKeyDown(e) {
        if (e.keyCode === 13) {
          this.requestText = e.target.value;
          this.handleGetVideos();
        }
      }
    },
    computed: {
      __Modal() {
        return markRaw(Modal);
      },
      __LayoutDefault() {
        return markRaw(LayoutDefault);
      },
      __favsRequest() {
        return this.$store.getters.favsRequest;
      },
      __token() {
        return this.$store.getters.Token;
      }
    },
  }
</script>
