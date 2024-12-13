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
.accordion-item {
  margin-bottom: 10px;
}
button {
  width: 100%;
  padding: 10px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: var(--secondary-color);
}
</style>