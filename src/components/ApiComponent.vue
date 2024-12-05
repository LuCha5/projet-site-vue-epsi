<template>
    <div class="api-component">
        <h2>Test API</h2>
        <form @submit.prevent="callApi">
            <!-- Champ pour l'URL de l'API -->
            <div class="form-group">
                <label for="url">URL API :</label>
                <input type="text" id="url" v-model="url" placeholder="https://api.example.com"
                    @input="clearError('url')" required />
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
                <textarea id="params" v-model="params" placeholder="Entrez des paramètres en JSON si nécessaire"
                    @input="clearError('params')"></textarea>
                <span v-if="errors.params" class="error">{{ errors.params }}</span>
            </div>

            <!-- Bouton pour soumettre -->
            <button type="submit">Appeler l'API</button>
        </form>

        <!-- Indicateur de chargement -->
        <div v-if="loading" class="spinner"></div>

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

.spinner {
    width: 50px;
    height: 50px;
    border: 5px solid #f3f3f3;
    border-top: 5px solid #35495e;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 20px auto;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.error {
    color: red;
    font-size: 14px;
    margin-top: 5px;
}
</style>