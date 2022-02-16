<template>
  <div class="login-container">
    <img src="../assets/sibdev-logo.svg" alt="logo">
    <span>Вход</span>
    <div class="login-block">
      <small>Логин</small>
      <div class="login-wrapper">
        <input
          type="text"
          name="login"
          id="login"
          v-model="login"
        >
      </div>
      <small>Пароль</small>
      <div class="password-wrapper">
        <input
          type="password"
          name="password"
          id="password"
          v-model="password"
        >
      </div>
      <small
        class="error"
        :class="{'visible-error': error}"
      >
        {{invalidForm ? 'Длина пароля не менее 5 символов' : 'Неверный пароль'}}
      </small>
      <button @click="handleLogin">Войти</button>
    </div>
  </div>
</template>

<script>
  import crypto from 'crypto';
  import '@/styles/global/global.css';
  export default {
    name: 'Login',
    data: () => ({
      login: '',
      password: '',
      invalidPassword: false,
      invalidLogin: false,
      error: false,
      invalidForm: false,
    }),
    watch: {
      __token(){
        this.$router.push('/main')
      }
    },
    mounted() {
      this.$emit('update:layout', 'div')
    },
    methods: {
      validForm(){
        const validPassword = /[a-zA-Z0-9@]{5,20}/gi.test(this.password);
        const validLogin = /[a-zA-Z0-9]{2,15}/gi.test(this.login);
        this.invalidPassword = validPassword ? false : true;
        this.invalidLogin = validLogin ? false : true;
        return validLogin && validPassword;
      },
      handleLogin() {
        if (this.validForm()) {
          this.handleAuthUser()
        } else {
          this.showErrors();
        }
      },
      showErrors() {
        this.invalidForm = true;
        this.error = true;
      },
      handleAuthUser() {
        const users = this.$store.getters.users;
        let authUser = false;
        this.clearErrors();
        users.forEach(user => {
          if (user.login === this.login){
            if (user.password === this.password){
              this.$store.commit('logIn', user)
            } else {
              this.error = true;
            }
            authUser = true;
            return;
          }
        })
        if(!authUser) {
          this.generateToken(this.login, this.password)
        }
      },
      generateToken(login, password) {
        const current_date = (new Date()).valueOf().toString();
        const random = Math.random().toString();
        const token = crypto.createHash('sha1').update(current_date + random).digest('hex');
        const userData = {login, password, token}
        this.$store.commit('saveUserData', userData);
      },
      clearErrors() {
        this.error = false;
        this.invalidForm = false;
      },
    },
    computed: {
      __token() {
        return this.$store.getters.Token;
      }
    }
  }
</script>
