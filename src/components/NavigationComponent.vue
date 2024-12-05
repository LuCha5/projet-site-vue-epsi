<template>
  <nav class="navbar">
    <div class="nav-left">
      <router-link to="/" class="nav-link">Accueil</router-link>
      <router-link to="/about" class="nav-link">À propos</router-link>
    </div>
    <img alt="Vue logo" src="@/assets/logo.png" class="logo">
    <div class="nav-right">
      <router-link to="/services" class="nav-link">Services</router-link>
      <router-link to="/contact" class="nav-link">Contact</router-link>
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
  justify-content: space-between; /* Assure que les divs sont de chaque côté du logo */
  align-items: center;
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
}
</style>