<template>
  <div id="app">
    <Translator />
  </div>
</template>

<script>
import Translator from './components/Translator.vue';

export default {
  components: {
    Translator
  }
};
</script>

<style>
#app {
  background: #f9f9f9;
  min-height: 100vh;
  padding: 20px;
}
</style>
