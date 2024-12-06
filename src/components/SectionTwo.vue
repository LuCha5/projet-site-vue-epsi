<template>
  <div>
    <p>{{ joke }}</p>
    <button @click="fetchJoke">Actualiser</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      joke: ''
    };
  },
  created() {
    this.fetchJoke();
  },
  methods: {
    async fetchJoke() {
      try {
        const response = await fetch('https://api.chucknorris.io/jokes/random');
        const data = await response.json();
        this.joke = data.value;
      } catch (error) {
        console.error('Erreur lors de la récupération de la blague:', error);
      }
    }
  }
}
</script>

<style scoped>
button {
  margin-top: 10px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: var(--secondary-color);
}
</style>