<template>
  <div class="accordion">
    <div class="accordion-item">
      <button @click="toggleSection(1)">Section 1</button>
      <div v-if="activeSection === 1">
        <SectionOne />
      </div>
    </div>
    <div class="accordion-item">
      <button @click="toggleSection(2)">Section 2</button>
      <div v-if="activeSection === 2">
        <SectionTwo />
      </div>
    </div>
  </div>
</template>

<script>
import SectionOne from './SectionOne.vue';
import SectionTwo from './SectionTwo.vue';

export default {
  components: {
    SectionOne,
    SectionTwo
  },
  data() {
    return {
      activeSection: null
    };
  },
  methods: {
    toggleSection(section) {
      this.activeSection = this.activeSection === section ? null : section;
    }
  }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap");
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css");

.accordion-item {
  margin-bottom: 30px;
  max-width: 600px;
  margin: 0 auto;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #35495e;
  color: white;
  border: none;
  border-radius: 5px;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  margin-bottom: 10px;
}

button:hover {
  background-color: #2c3e50;
  transform: scale(1.02);
}

.accordion-item div {
  padding: 15px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-top: 5px;
}
</style>