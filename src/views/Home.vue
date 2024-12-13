<template>
  <div class="home">
    <TextImageComponent />
    <AccordionComponent />
  </div>
</template>

<script>
import TextImageComponent from '../components/TextImageComponent.vue'
import AccordionComponent from '../components/AccordionComponent.vue'

export default {
  name: 'HomePage',
  components: {
    TextImageComponent,
    AccordionComponent
  }
}
</script>