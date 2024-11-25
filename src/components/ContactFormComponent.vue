
<template>
  <form @submit.prevent="submitForm">
    <div>
      <label for="name">Nom:</label>
      <input type="text" v-model="name" required>
    </div>
    <div>
      <label for="email">Email:</label>
      <input type="email" v-model="email" required>
    </div>
    <div>
      <label for="message">Message:</label>
      <textarea v-model="message" required></textarea>
    </div>
    <button type="submit">Envoyer</button>
  </form>
</template>

<script>
export default {
  name: 'ContactFormComponent',
  data() {
    return {
      name: '',
      email: '',
      message: ''
    };
  },
  methods: {
    async submitForm() {
      const payload = {
        content: `Nom: ${this.name}\nEmail: ${this.email}\nMessage: ${this.message}`
      };
      try {
        await fetch('https://discord.com/api/webhooks/1309485318969495572/IHGFgyq3BCa0c4heSp4vTMNnAgrJFsqkomH3xjoG_WcZo7ip8MztNOPuHyljpna8nMsb', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
        alert('Message envoyé avec succès!');
      } catch (error) {
        alert('Erreur lors de l\'envoi du message.');
      }
    }
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
  margin: 0 auto;
}
label {
  font-weight: bold;
}
input, textarea {
  padding: 10px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
}
button {
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
}
</style>