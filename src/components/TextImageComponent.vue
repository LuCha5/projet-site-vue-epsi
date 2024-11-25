<template>
  <div class="text-image">
    <img src="@/assets/sample-image.jpg" alt="Sample Image">
    <p>Ceci est un exemple de texte affiché avec une image.</p>
  </div>
</template>

<script>
export default {
  name: 'TextImageComponent'
}
</script>

<style scoped>
.text-image {
  text-align: center;
}
.text-image img {
  max-width: 100%;
  height: auto;
}
</style>