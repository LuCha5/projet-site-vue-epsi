<template>
    <div class="api-component">
        <div class="form-container">
            <h2>Test API</h2>
            <form @submit.prevent="callApi">
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

                <button type="submit">Appeler l'API</button>
            </form>
        </div>

        <div class="result-container">
            <h2>Résultat</h2>
            <div class="result">
                <pre>{{ result || 'Aucun résultat pour le moment.' }}</pre>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ApiComponent",
    data() {
        return {
            url: "",
            method: "GET",
            params: "",
            result: null,
            loading: false,
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
                const parsedParams = this.params && this.method !== "GET" 
                    ? JSON.parse(this.params)
                    : null;

                const urlWithParams = this.method === "GET" && parsedParams
                    ? `${this.url}?${new URLSearchParams(parsedParams)}`
                    : this.url;

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
  width: 100vw;
  height: 90vh;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
}

.form-container,
.result-container {
  flex: 1;
  margin: 10px;
}

h2 {
  text-align: center;
  font-size: 24px;
  color: #35495e;
}

.form-container form,
.result {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.result {
  border: 1px solid #ddd;
  overflow-y: auto;
  min-height: 200px;
}

button {
  background-color: #35495e;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #1f2e3e;
}

.error {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}
</style>
