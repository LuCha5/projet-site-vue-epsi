<template>
  <div class="contact-form-container">
    <form @submit.prevent="submitForm">
      <h1>Contactez-nous</h1>
      <div class="separation"></div>
      <div class="corps-formulaire">
        <div class="gauche">
          <div class="groupe">
            <label for="name">Votre Prénom</label>
            <input
              type="text"
              v-model="name"
              autocomplete="off"
              @input="clearError('name')"
              required
            />
            <span v-if="errors.name" class="error">{{ errors.name }}</span>
            <i class="fas fa-user"></i>
          </div>
          <div class="groupe">
            <label for="email">Votre adresse e-mail</label>
            <input
              type="email"
              v-model="email"
              autocomplete="off"
              @input="clearError('email')"
              required
            />
            <span v-if="errors.email" class="error">{{ errors.email }}</span>
            <i class="fas fa-envelope"></i>
          </div>
        </div>
        <div class="droite">
          <div class="groupe">
            <label for="message">Message</label>
            <textarea
              v-model="message"
              @input="clearError('message')"
              placeholder="Saisissez ici..."
              required
            ></textarea>
            <span v-if="errors.message" class="error">{{ errors.message }}</span>
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
  name: "ContactFormComponent",
  data() {
    return {
      name: "",
      email: "",
      message: "",
      notification: "",
      errors: {
        name: null,
        email: null,
        message: null,
      },
    };
  },
  methods: {
    validateForm() {
      let valid = true;
      if (!this.name.trim()) {
        this.errors.name = "Le prénom est requis.";
        valid = false;
      }
      if (
        !this.email.trim() ||
        !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.email)
      ) {
        this.errors.email = "Une adresse e-mail valide est requise.";
        valid = false;
      }
      if (!this.message.trim()) {
        this.errors.message = "Le message ne peut pas être vide.";
        valid = false;
      }
      return valid;
    },
    clearError(field) {
      this.errors[field] = null;
    },
    async submitForm() {
      if (!this.validateForm()) return;

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
          "https://discord.com/api/webhooks/1309485318969495572/IHGFgyq3BCa0c4heSp4vTMNnAgrJFsqkomH3xjoG_WcZo7ip8MztNOPuHyljpna8nMsb",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );

        if (!response.ok) throw new Error(`Erreur : ${response.status} ${response.statusText}`);

        this.notification = "Message envoyé avec succès!";
        this.clearForm();
      } catch (error) {
        console.error("Erreur lors de l'envoi du formulaire:", error);
        this.notification = "Erreur lors de l'envoi du message.";
      }
    },
    clearForm() {
      this.name = "";
      this.email = "";
      this.message = "";
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap");
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css");

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
  border: 2px solid #35495e;
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
  left: 0;
  top: 25px;
  padding: 9px 8px;
  color: #35495e;
}

form .corps-formulaire .droite {
  margin-left: 40px;
}

form .corps-formulaire .droite .groupe textarea {
  margin-top: 5px;
  padding: 10px;
  background-color: #f1f1f1;
  border: 2px solid #35495e;
  outline: none;
  border-radius: 5px;
  resize: none;
  height: 6rem;
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

.notification {
  margin-top: 10px;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border-radius: 5px;
  text-align: center;
}

.error {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}
</style>