<template>
  <div class="about">
    <AboutContent />
  </div>
</template>

<script>
import AboutContent from '../components/AboutContent.vue';

export default {
  name: 'AboutPage', // Renommez le composant pour qu'il soit multi-mots
  components: {
    AboutContent
  }
}
</script>

<style scoped>
.about {
  padding: 20px;
  text-align: center;
  margin-top: 60px; /* Ajoutez une marge en haut pour éviter que le contenu soit caché sous la navbar */
}
</style>