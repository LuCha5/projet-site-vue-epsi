<template>
    <div class="api-component">
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
            required
          />
        </div>
  
        <!-- Sélection de la méthode HTTP -->
        <div class="form-group">
          <label for="method">Méthode :</label>
          <select id="method" v-model="method" required>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
        </div>
  
        <!-- Paramètres (JSON) -->
        <div class="form-group">
          <label for="params">Paramètres :</label>
          <textarea
            id="params"
            v-model="params"
            placeholder="Entrez des paramètres en JSON si nécessaire"
          ></textarea>
        </div>
  
        <!-- Bouton pour soumettre -->
        <button type="submit">Appeler l'API</button>
      </form>
  
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
      };
    },
    methods: {
      async callApi() {
        try {
          // Parse les paramètres si nécessaire
          let parsedParams = null;
          if (this.params && this.method !== "GET") {
            try {
              parsedParams = JSON.parse(this.params);
            } catch (error) {
              alert("Les paramètres doivent être en JSON valide.");
              return;
            }
          }
  
          // Appel API avec fetch
          const response = await fetch(this.url, {
            method: this.method,
            headers: {
              "Content-Type": "application/json",
            },
            body: this.method !== "GET" ? JSON.stringify(parsedParams) : null,
          });
  
          // Vérifie si la réponse est OK
          if (!response.ok) {
            throw new Error(`Erreur API : ${response.status}`);
          }
  
          // Récupération des données
          const data = await response.json();
          this.result = JSON.stringify(data, null, 2);
        } catch (error) {
          this.result = `Erreur : ${error.message}`;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .api-component {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #ffffff;
    border: 1px solid #ddd;
    border-radius: 10px;
    font-family: Arial, sans-serif;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    font-weight: bold;
    display: block;
    margin-bottom: 5px;
  }
  
  input,
  select,
  textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  textarea {
    resize: none;
  }
  
  button {
    padding: 10px 15px;
    background-color: #35495e;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #2c3e50;
  }
  
  .result {
    margin-top: 20px;
    padding: 15px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  </style>  