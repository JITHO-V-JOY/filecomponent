<template>
  <div id="app">
    <Header />
    <Home/>
  </div>
</template>

<script>
import Header from './components/header/Header.vue';
import Home from './components/home/Home.vue'
export default {
  name: 'App',
  components:{
    Header,
    Home
  }
}
</script>

<style>

</style>
