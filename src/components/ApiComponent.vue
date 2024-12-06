<template>
    <div class="api-component">
        <!-- Conteneur du formulaire -->
        <div class="form-container">
            <h2>Test API</h2>
            <form @submit.prevent="callApi">
                <!-- Champ pour l'URL de l'API -->
                <div class="form-group">
                    <label for="url">URL API :</label>
                    <input
                        type="text"
                        id="url"
                        v-model="url"
                        placeholder="https://api.example.com"
                        @input="clearError('url')"
                        required
                    />
                    <span v-if="errors.url" class="error">{{ errors.url }}</span>
                </div>

                <!-- Sélection de la méthode HTTP -->
                <div class="form-group">
                    <label for="method">Méthode :</label>
                    <select id="method" v-model="method" @change="clearError('method')" required>
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                        <option value="PUT">PUT</option>
                        <option value="DELETE">DELETE</option>
                    </select>
                    <span v-if="errors.method" class="error">{{ errors.method }}</span>
                </div>

                <!-- Paramètres (JSON) -->
                <div class="form-group">
                    <label for="params">Paramètres :</label>
                    <textarea
                        id="params"
                        v-model="params"
                        placeholder="Entrez des paramètres en JSON si nécessaire"
                        @input="clearError('params')"
                    ></textarea>
                    <span v-if="errors.params" class="error">{{ errors.params }}</span>
                </div>

                <!-- Bouton pour soumettre -->
                <button type="submit">Appeler l'API</button>
            </form>
        </div>

        <!-- Bloc pour afficher le résultat -->
        <div v-if="result" class="result">
            <h3>Résultat :</h3>
            <pre>{{ result }}</pre>
        </div>
    </div>
</template>

<script>
export default {
    name: "ApiComponent",
    data() {
        return {
            url: "", // URL de l'API
            method: "GET", // Méthode HTTP par défaut
            params: "", // Paramètres à envoyer
            result: null, // Résultat de l'API
            loading: false, // Indicateur de chargement
            errors: {
                url: null,
                method: null,
                params: null,
            },
        };
    },
    methods: {
        validateForm() {
            let valid = true;
            if (!this.url.trim()) {
                this.errors.url = "L'URL est requise.";
                valid = false;
            } else if (!/^https?:\/\/.+/.test(this.url)) {
                this.errors.url = "L'URL doit être valide.";
                valid = false;
            }
            if (!this.method) {
                this.errors.method = "La méthode HTTP est requise.";
                valid = false;
            }
            if (this.params && this.method !== "GET") {
                try {
                    JSON.parse(this.params);
                } catch (error) {
                    this.errors.params = "Les paramètres doivent être en JSON valide.";
                    valid = false;
                }
            }
            return valid;
        },
        clearError(field) {
            this.errors[field] = null;
        },
        async callApi() {
            if (!this.validateForm()) return;

            this.loading = true;
            this.result = null;

            try {
                // Parse les paramètres s'ils sont définis et la méthode n'est pas GET
                const parsedParams = this.params && this.method !== "GET" 
                    ? JSON.parse(this.params)
                    : null;

                // Construit l'URL pour les requêtes GET avec paramètres
                const urlWithParams = this.method === "GET" && parsedParams
                    ? `${this.url}?${new URLSearchParams(parsedParams)}`
                    : this.url;

                // Effectue la requête API
                const response = await fetch(urlWithParams, {
                    method: this.method,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: this.method !== "GET" ? JSON.stringify(parsedParams) : null,
                });

                if (!response.ok) {
                    throw new Error(`Erreur API : ${response.status}`);
                }

                // Traite la réponse
                const data = await response.json();
                this.result = JSON.stringify(data, null, 2);
            } catch (error) {
                this.result = `Erreur : ${error.message}`;
            } finally {
                this.loading = false;
            }
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

.api-component {
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

form h2 {
  font-size: 20px;
}

form .form-group {
  position: relative;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}

form .form-group input,
form .form-group select,
form .form-group textarea {
  margin-top: 5px;
  padding: 10px;
  border: 1px solid #c9c9c9;
  outline-color: #35495e;
  border-radius: 5px;
}

form .form-group textarea {
  background-color: #f1f1f1;
  border: 2px solid #35495e;
  resize: none;
  height: 6rem;
}

button {
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

button:hover {
  transform: scale(1.05);
}

.result {
  margin-top: 20px;
  padding: 15px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow-x: auto;
  box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.05);
}

.result h3 {
  margin-top: 0;
  font-size: 18px;
  font-weight: bold;
  color: #35495e;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}

.error {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}

@media (max-width: 768px) {
  .api-component {
    flex-direction: column;
    align-items: stretch;
  }

  .form-container,
  .result {
    max-width: 100%;
    margin: 0;
  }

  .result {
    margin-top: 20px;
  }
}
</style>