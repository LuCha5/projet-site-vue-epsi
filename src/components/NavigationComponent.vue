
<template>
  <nav class="navigation">
    <button>Accueil</button>
    <button>À propos</button>
    <button>Services</button>
    <button>Contact</button>
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
button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>