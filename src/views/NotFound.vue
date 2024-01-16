<template>
  <main>
    <div class="container">
      <h1>Falsch abgebogen :/</h1>
      <p>Diese Seite konnte nicht geladen werden.</p>
      <div class="links">
        <div class="button">
          <a class="btn2" href="/#app" target="" aria-label="Zurück">Zurück</a>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
h1 {
  font-size: var(--h1-desktop);
  font-weight: bold;
  text-align: center;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin: 2rem 0 1rem 0;
}

p {
  font-size: 20px;
  text-align: center;
}

a {
  color: var(--color-orange);
}

.container {
  min-height: 100vh;
  margin: 0 auto;
  padding: 0 10px;
  max-width: 1400px;
  display: flex;
  align-items: center;
  place-content: center;
  flex-direction: column;
  text-align: justify;
}

.button {
  padding: 5px 10px;
  margin: 0 auto;
}

.btn1,
.btn2 {
  width: 200px;
  border: 2px solid;
  border-color: var(--color-orange);
  border-radius: 0;
}

.links {
  display: flex;
  flex-direction: row;
  padding: 20px;
  text-align: center;
}

@media (max-width: 1200px) {

  h1 {
    font-size: var(--h2-mobile);
    letter-spacing: 1px;
  }

  h2 {
    font-size: var(--h2-mobile);
    letter-spacing: 1px;
  }

  p {
    font-size: var(--p-mobile);
  }
}
</style>