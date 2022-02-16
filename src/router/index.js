import { createRouter, createWebHashHistory } from 'vue-router';
import Login from '../components/Login';
import Main from '../components/Main';
import Favorites from '../components/Favorites';

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'login', 
      component: Login
    },
    {
      path: '/main',
      name: 'main', 
      component: Main,
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: Favorites,
    }
  ]
})