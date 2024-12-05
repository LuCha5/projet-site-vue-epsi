<template>
  <div class="about-content">
    <h1>À propos</h1>
    <p>Ceci est la page à propos.</p>
    <section>
      <h2>Notre Mission</h2>
      <p>Notre mission est de fournir des solutions innovantes et de qualité pour nos clients.</p>
    </section>
    <section>
      <h2>Notre Équipe</h2>
      <p>Nous avons une équipe de professionnels dévoués et expérimentés.</p>
    </section>
    <section>
      <h2>Nos Valeurs</h2>
      <ul>
        <li>Intégrité</li>
        <li>Innovation</li>
        <li>Excellence</li>
        <li>Collaboration</li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  name: 'AboutContent'
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap");

.about-content {
  padding: 20px;
  text-align: center;
  font-family: "Roboto", sans-serif;
  background-color: #ffffff;
  border-radius: 10px;
}

.about-content h1 {
  font-size: 24px;
  color: #333;
}

.about-content p {
  font-size: 16px;
  color: #666;
}

.about-content section {
  margin-top: 20px;
}

.about-content h2 {
  font-size: 20px;
  color: #333;
}

.about-content ul {
  list-style-type: none;
  padding: 0;
}

.about-content li {
  font-size: 16px;
  color: #666;
  margin-top: 10px;
}
</style>