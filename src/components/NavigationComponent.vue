<template>
  <nav class="navigation">
    <router-link to="/">Accueil</router-link>
    <router-link to="/contact">Contact</router-link>
  </nav>
</template>

<script>
export default {
  name: 'NavigationComponent'
}
</script>

<style scoped>
.navigation {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 20px 0;
}
router-link {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
}
</style>