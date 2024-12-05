<template>
  <div class="contact-form-container">
    <form @submit.prevent="submitForm">
      <h1>Contactez-nous</h1>
      <div class="separation"></div>
      <div class="corps-formulaire">
        <div class="gauche">
          <div class="groupe">
            <label for="name">Votre Prénom</label>
            <input type="text" v-model="name" autocomplete="off" required />
            <i class="fas fa-user"></i>
          </div>
          <div class="groupe">
            <label for="email">Votre adresse e-mail</label>
            <input type="email" v-model="email" autocomplete="off" required />
            <i class="fas fa-envelope"></i>
          </div>
        </div>
        <div class="droite">
          <div class="groupe">
            <label for="message">Message</label>
            <textarea v-model="message" placeholder="Saisissez ici..." required></textarea>
          </div>
        </div>
      </div>
      <div class="pied-formulaire" align="center">
        <button type="submit">Envoyer le message</button>
      </div>
      <div v-if="notification" class="notification">{{ notification }}</div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'ContactFormComponent',
  data() {
    return {
      name: '',
      email: '',
      message: '',
      notification: '',
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
              { name: "Nom", value: this.name, inline: true },
              { name: "Email", value: this.email, inline: true },
              { name: "Message", value: this.message },
            ],
            color: 16747526,
            footer: {
              text: "Par Tom et Luonin",
            },
            timestamp: new Date(),
          },
        ],
      };

      try {
        const response = await fetch(
          'https://discord.com/api/webhooks/1312048846678921227/8rBhPU8ZMT3ptIHvY-0HXfm-tjmplHIBCOJfT1wyFi48Fmg6CjWzC411XyPMzk90tKs9',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          }
        );

        if (!response.ok) throw new Error(`Erreur : ${response.status} ${response.statusText}`);

        // Ne pas tenter de lire le JSON pour un code 204 (No Content)
        if (response.status === 204) {
          this.notification = 'Message envoyé avec succès!';
          this.$emit('formSubmitted', { success: true });
        } else {
          const result = await response.json();
          this.notification = 'Message envoyé avec succès!';
          this.$emit('formSubmitted', result);
        }
      } catch (error) {
        console.error('Erreur lors de l\'envoi du formulaire:', error);
        this.notification = 'Erreur lors de l\'envoi du message.';
        this.$emit('formSubmitted', { error: error.message });
      }
    },
    clearForm() {
      this.name = '';
      this.email = '';
      this.message = '';
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap");
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css');

body {
  margin: 0px;
  padding: 0px;
  background-color: #ffffff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: "Roboto", sans-serif;
  font-weight: bold;
}

.contact-form-container {
  width: 100vw;
  height: 85vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
}

form {
  padding: 30px;
  background-color: white;
  border-radius: 10px;
}

form h1 {
  font-size: 20px;
}

form .separation {
  width: 100%;
  height: 1px;
  background-color: #35495e;
}

form .corps-formulaire {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 30px;
}

form .corps-formulaire .groupe {
  position: relative;
  /* Pour mettre positionner l’élément dans le flux normal de la page */
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}

form .corps-formulaire .gauche .groupe input {
  margin-top: 5px;
  padding: 10px 5px 10px 30px;
  border: 1px solid #c9c9c9;
  outline-color: #35495e;
  border-radius: 5px;
}

form .corps-formulaire .gauche .groupe i {
  position: absolute;
  /* positionné par rapport à son parent le plus proche positionné */
  left: 0;
  top: 25px;
  padding: 9px 8px;
  color: #35495e;
}

form .corps-formulaire .droite {
  margin-left: 40px;
}

form .corps-formulaire .droite .groupe {
  height: 100%;
}

form .corps-formulaire .droite .groupe textarea {
  margin-top: 5px;
  padding: 10px;
  background-color: #f1f1f1;
  border: 2px solid #35495e;
  outline: none;
  border-radius: 5px;
  resize: none;
  height: 72%;
}

form .pied-formulaire button {
  margin-top: 10px;
  background-color: #35495e;
  color: white;
  font-size: 15px;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  transition: transform 0.5s;
}

form .pied-formulaire button:hover {
  transform: scale(1.05);
}

@media screen and (max-width: 920px) {
  form .corps-formulaire .droite {
    margin-left: 0px;
  }
}

.notification {
  margin-top: 10px;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border-radius: 5px;
  text-align: center;
}
</style>