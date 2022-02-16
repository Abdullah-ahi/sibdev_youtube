import { createStore } from 'vuex';

export default createStore({
  state: {
    user: {},
    users: [],
    videos: [],
    request: '',
    favsRequest: null,
    readOnly: true,
    editId: null,
  },
  getters: {
    Token(state) {
      return state.user.token;
    },
    userData(state) {
      return state.user;
    },
    users(state) {
      return state.users;
    },
    videos(state) {
      return state.videos;
    },
    request(state) {
      return state.request;
    },
    favorites(state) {
      return state.user.favorites;
    },
    favsRequest(state) {
      return state.favsRequest
    },
    readOnly(state) {
      return state.readOnly;
    },
    editId(state) {
      return state.editId;
    }
  },
  mutations: {
    saveUserData(state, userData) {
      state.user = {...userData, favorites: {}}
      state.users.push(state.user);
    },
    logOut(state) {
      state.user = {};
    },
    logIn(state, user) {
      state.user = user;
    },
    saveVideos(state, videos) {
      state.videos = videos;
    },
    saveRequest(state, request) {
      state.request = request;
    },
    addFavorite(state, request) {
      const favs = Object.keys(state.user.favorites);
      const id = !favs.length ? 0 : +favs[favs.length-1]+1;
      state.user.favorites[id] = {id, ...request}
    },
    saveFavRequest(state, request) {
      state.favsRequest = request;
    },
    setInputType(state, type) {
      state.readOnly = type;
    },
    setEditId(state, id) {
      state.editId = id;
    },
    editFavorite(state, { id, favorite }){
      state.user.favorites[id] = {id, ...favorite}
    },
    clearVideos(state) {
      state.videos = [];
    }
  }

})