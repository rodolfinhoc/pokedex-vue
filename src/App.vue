<template>
  <pokemon-list/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import PokemonList from './views/PokemonList.vue';

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

::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-track {
  background: #adb5bd5d;
}
::-webkit-scrollbar-thumb {
  background-color: #41b883;
  border-radius: 20px;
  border: 3px black;
}

</style>
