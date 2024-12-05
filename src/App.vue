<template>
  <div id="app">
    <NavigationComponent />
    <router-view />
  </div>
</template>

<script>
import NavigationComponent from './components/NavigationComponent.vue'
import './App.css';

export default {
  name: 'App',
  components: {
    NavigationComponent
  }
}
</script>