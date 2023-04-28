<template>
  <pokemon-list/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import PokemonList from './components/PokemonList.vue';

@Options({
  components: {
    PokemonList,
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  background-color: #3f51b51f !important;
}

</style>
