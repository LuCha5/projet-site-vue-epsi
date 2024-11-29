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
        embeds: [
          {
            title: `Nouveau message de ${this.name}`,
            description: "Vous avez reçu un nouveau message.",
            fields: [
              {
                name: "Nom",
                value: `\`\`\`${this.name}\`\`\``,
                inline: true
              },
              {
                name: "Email",
                value: `\`\`\`${this.email}\`\`\``,
                inline: true
              },
              {
                name: "Message",
                value: `\`\`\`${this.message}\`\`\``
              }
            ],
            color: 16747526,
            footer: {
              text: "Par Tom et Luonin",
              icon_url: "https://example.com/icon.png" // URL de l'icône du footer
            },
            timestamp: new Date()
          }
        ]
      };
      try {
        await fetch('https://discord.com/api/webhooks/1312048846678921227/8rBhPU8ZMT3ptIHvY-0HXfm-tjmplHIBCOJfT1wyFi48Fmg6CjWzC411XyPMzk90tKs9', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
      } catch (error) {
        console.error('Erreur lors de l\'envoi du formulaire:', error);
      }
    }
  }
};
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