<template>
  <Header />
  <slot />
</template>

<script>
import Header from '../components/Header.vue';
export default {
  name: 'LayoutDefault',
  components: {
    Header,
  }
}
</script>
