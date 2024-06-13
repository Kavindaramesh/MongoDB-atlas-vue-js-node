<template>
  <header>
  
    
    <div id="app">
      <EmployeeForm @submitSuccess="handleFormSuccess" />
    </div>
  </header>

  <main>
    <TheWelcome />
    
  </main>
</template>

<script setup>

import TheWelcome from './components/TheWelcome.vue';
import EmployeeForm from './components/EmployeeForm.vue';

function handleFormSuccess() {
  console.log('Form submitted successfully');
  
}
</script>

<style scoped>
.app{
  display: flex;
    place-items: flex-start;
    flex-wrap: wrap;

}
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
