<template>
  <div class="text-image-component">
    <img :src="require('@/assets/default2.jpg')" alt="Default Image" />
    <h2>Bienvenue sur notre site - Partie 2</h2>
    <p>Voici un autre exemple de texte avec une image.</p>
  </div>
</template>

<script>
export default {
  name: 'TextImageComponent2'
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap");

.text-image {
  text-align: center;
  font-family: "Roboto", sans-serif;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
}

.text-image img {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  margin-top: 20px;
}

.text-image h2 {
  font-size: 24px;
  color: #333;
}

.text-image p {
  font-size: 16px;
  color: #666;
}
</style>