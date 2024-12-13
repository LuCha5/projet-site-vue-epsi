<template>
  <nav class="navbar">
    <div class="nav-left">
      <router-link to="/" class="nav-link">Accueil</router-link>
      <router-link to="/jokes" class="nav-link">Jokes</router-link>
    </div>
    <router-link to="/" class="nav-link">
    <img alt="Vue logo" src="@/assets/logo.png" class="logo">
    </router-link>
    <div class="nav-right">
      <router-link to="/api" class="nav-link">Api</router-link>
      <router-link to="/contact" class="nav-link">Contact</router-link>
      <router-link to="/accordion" class="nav-link">Accordion</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavigationComponent'
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap");

.navbar {
  display: flex;
  align-items: center;
  justify-content: center; /* Centrer la navbar */
  padding: 10px 20px;
  background-color: #333;
  margin-bottom: 20px; /* Ajoutez une marge en bas pour éviter que le contenu soit caché sous la navbar */
  font-family: "Roboto", sans-serif;
}

.nav-link {
  color: white;
  text-decoration: none;
  margin: 0 10px;
  font-size: 16px;
}

.nav-link:hover {
  text-decoration: underline;
}

.logo {
  height: 40px;
}

.nav-right, .nav-left {
  display: flex;
  align-items: center;
  justify-content: space-between; /* Espacer les éléments à gauche et à droite */
}
</style>