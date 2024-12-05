<template>
  <div class="home">
    <div>Contenu de la page d'accueil</div>
    <TextImageComponent />
  </div>
</template>

<script>
import TextImageComponent from '../components/TextImageComponent.vue'

export default {
  name: 'HomePage',
  components: {
    TextImageComponent
  }
}
</script>