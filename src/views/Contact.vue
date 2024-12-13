<template>
  <div>
    <ContactFormComponent @formSubmitted="handleFormSubmitted" />
    <div v-if="resultMessage" class="result-message">
      {{ resultMessage }}
    </div>
  </div>
</template>

<script>
import ContactFormComponent from '../components/ContactFormComponent.vue';

export default {
  name: 'ContactPage',
  components: {
    ContactFormComponent,
  },
  data() {
    return {
      resultMessage: '',
    };
  },
  methods: {
    handleFormSubmitted(result) {
      if (result.success) {
        this.resultMessage = 'Message envoyé avec succès!';
      } else if (result.error) {
        this.resultMessage = `Erreur: ${result.error}`;
      } else {
        this.resultMessage = 'Résultat inattendu.';
      }
    },
  },
};
</script>

<style scoped>
.result-message {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #4caf50;
  background-color: #dff0d8;
  color: #3c763d;
  border-radius: 5px;
  text-align: center;
}
</style>
